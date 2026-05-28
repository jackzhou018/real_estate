import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Lilian Yang's real estate website."
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-[34px] font-semibold leading-tight text-ink">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-body">
          <p>Users may submit contact information through the contact and newsletter forms on this website.</p>
          <p>Information submitted through the contact form is used to respond to inquiries about buying, selling, investing, listings, or related real estate questions.</p>
          <p>Newsletter signup information is used to send market updates, listing highlights, and real estate tips to users who provide explicit consent.</p>
          <p>You may request removal from communications by contacting Lilian Yang at USHouses@yahoo.com.</p>
          <p>This simple policy is editable and should be reviewed for your final business practices before launch.</p>
        </div>
      </div>
    </section>
  );
}
