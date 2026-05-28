import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Profile",
  description: "Meet Lilian Yang, Real Estate Broker serving [Your City / Region]."
};

const sections = [
  ["About Lilian", "Lilian Yang helps clients make informed real estate decisions with steady communication, organized preparation, and a practical understanding of each client's goals."],
  ["How I Help Buyers", "From search priorities to offer strategy, Lilian helps buyers compare options, understand tradeoffs, and move through each milestone with confidence."],
  ["How I Help Sellers", "Lilian helps sellers prepare, price, and position their home with a clear plan designed around timing, presentation, and market conditions."],
  ["My Approach", "Every client deserves straightforward guidance, prompt follow-up, and a process that makes the next step easy to understand."],
  ["Local Expertise", "Use this section to describe Lilian's experience in [Your City / Region], including neighborhoods, property types, and local market patterns."]
];

export default function ProfilePage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Profile" title="Lilian Yang, Real Estate Broker">
          Professional guidance for buyers, sellers, and investors in [Your City / Region].
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-[20px] bg-soft p-3">
            <Image
              src="/images/profile-placeholder.svg"
              alt="Lilian Yang profile placeholder"
              width={900}
              height={1100}
              className="rounded-[14px]"
            />
          </div>
          <div className="grid gap-5">
            {sections.map(([title, text]) => (
              <Card key={title} className="transition hover:shadow-soft">
                <h2 className="text-xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-body">{text}</p>
              </Card>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button href="/contact?reason=General%20question">Schedule a Consultation</Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
