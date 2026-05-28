import type { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Lilian Yang for buying, selling, investing, listing questions, or showings."
};

export default function ContactPage() {
  return (
    <section className="bg-soft py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Tell me what you're looking for, and I'll follow up with a clear next step." />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {[
              ["Email", siteConfig.email],
              ["Phone", siteConfig.phone],
              ["Office location", siteConfig.office],
              ["Service area", siteConfig.serviceArea]
            ].map(([label, value]) => (
              <Card key={label} className="transition hover:shadow-soft">
                <h2 className="text-xs font-bold uppercase tracking-[0.04em] text-primary">{label}</h2>
                <p className="mt-3 text-lg font-semibold text-ink">{value}</p>
              </Card>
            ))}
          </div>
          <Suspense fallback={<div className="rounded-[14px] bg-white p-6">Loading contact form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
