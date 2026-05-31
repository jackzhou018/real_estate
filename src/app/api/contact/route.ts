import { NextResponse } from "next/server";
import { sendWebsiteEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Anti-spam: max 5 submissions per IP per hour (each sends real email).
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientIp(request)}`, LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid contact form submission." }, { status: 400 });
    }

    const data = parsed.data;
    const subject = data.reason === "Listing question" ? "New Listing Question from Website" : "New Website Contact Form Submission";
    const text = [
      "New website contact form submission",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Reason: ${data.reason || "Not provided"}`,
      `Source page: ${data.sourcePage || "Not provided"}`,
      `Listing ID: ${data.listingId || "Not provided"}`,
      "",
      "Message:",
      data.message
    ].join("\n");

    await sendWebsiteEmail({ subject, text, replyTo: data.email });
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the real error server-side; return a generic message to the client.
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Unable to send your message right now. Please try again later." }, { status: 500 });
  }
}
