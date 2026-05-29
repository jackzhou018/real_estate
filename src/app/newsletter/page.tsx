import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { newsletterContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Sign up for my real estate market updates."
};

const topics = ["Sarasota market updates", "Rental insights", "Featured listings", "Buyer tips", "Seller tips"];

export default function NewsletterPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Newsletter" title="Real Estate Updates in Your Inbox">
          {newsletterContent.intro}
        </SectionHeading>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">What you&rsquo;ll receive</h2>
            <ul className="mt-5 grid gap-3">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 rounded-2xl border border-hairline bg-white p-4 shadow-soft"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-primary">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{topic}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">Practical notes for clients interested in {topic.toLowerCase()}.</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
