import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { newsletterContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Sign up for Lilian Yang's real estate market updates."
};

const topics = ["Sarasota market updates", "Rental insights", "Featured listings", "Buyer tips", "Seller tips"];

export default function NewsletterPage() {
  return (
    <section className="bg-soft py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Newsletter" title="Real Estate Updates in Your Inbox">
          {newsletterContent.intro}
        </SectionHeading>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {topics.map((topic) => (
              <Card key={topic} className="transition hover:shadow-soft">
                <h2 className="text-lg font-semibold text-ink">{topic}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">Practical notes for clients interested in {topic.toLowerCase()}.</p>
              </Card>
            ))}
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
