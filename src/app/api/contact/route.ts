import { NextResponse } from "next/server";
import { sendWebsiteEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
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
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Reason: ${data.reason}`,
      `Preferred contact method: ${data.preferredContactMethod}`,
      `Source page: ${data.sourcePage || "Not provided"}`,
      `Listing ID: ${data.listingId || "Not provided"}`,
      `Email consent: ${data.emailConsent ? "Yes" : "No"}`,
      `SMS consent: ${data.smsConsent ? "Yes" : "No"}`,
      "",
      "Message:",
      data.message
    ].join("\n");

    await sendWebsiteEmail({ subject, text, replyTo: data.email });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send contact form." }, { status: 500 });
  }
}
