import { NextResponse } from "next/server";
import { sendWebsiteEmail } from "@/lib/email";
import { newsletterSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Anti-spam: max 5 submissions per IP per hour (each sends real email).
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${clientIp(request)}`, LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid newsletter signup." }, { status: 400 });
    }

    const data = parsed.data;
    const text = [
      "New newsletter signup",
      "",
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Areas of interest: ${data.areasOfInterest}`,
      `Interest type: ${data.interestType}`,
      `Email consent: ${data.emailConsent ? "Yes" : "No"}`
    ].join("\n");

    await sendWebsiteEmail({ subject: "New Newsletter Signup", text, replyTo: data.email });
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the real error server-side; return a generic message to the client.
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Unable to complete your signup right now. Please try again later." }, { status: 500 });
  }
}
