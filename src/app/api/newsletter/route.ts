import { NextResponse } from "next/server";
import { sendWebsiteEmail } from "@/lib/email";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
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
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send newsletter signup." }, { status: 500 });
  }
}
