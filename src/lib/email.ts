import { Resend } from "resend";

type SendEmailInput = {
  subject: string;
  text: string;
  replyTo: string;
};

export async function sendWebsiteEmail({ subject, text, replyTo }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL || "USHouses@yahoo.com";

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    text
  });
}
