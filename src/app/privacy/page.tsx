import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for my real estate website."
};

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">Legal</p>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-body">
          <p>Users may submit contact information through the contact and newsletter forms on this website.</p>
          <p>I use information submitted through the contact form to respond to inquiries about buying, selling, investing, listings, or related real estate questions.</p>
          <p>I use newsletter signup information to send market updates, listing highlights, and real estate tips to users who provide explicit consent.</p>
          <p>You may request removal from communications by contacting me at USHouses@yahoo.com.</p>
          <p>This simple policy is editable and should be reviewed for your final business practices before launch.</p>
        </div>
      </div>
    </section>
  );
}
