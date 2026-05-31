import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me about buying, selling, renting, or property management in the Sarasota area."
};

const icons: Record<string, React.ReactNode> = {
  Phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />,
  Email: <><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" /></>,
  "Public Zillow email": <><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" /></>,
  Brokerage: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />,
  License: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
};

export default async function ContactPage() {
  const { contactContent, siteConfig } = await getSiteContent();
  const items: [string, string][] = [
    ["Phone", siteConfig.phone],
    ["Email", siteConfig.email],
    ["Public Zillow email", siteConfig.publicEmail],
    ["Brokerage", siteConfig.brokerage],
    ["License", siteConfig.license]
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Tell me what you're looking for.">
          {contactContent.intro}
        </SectionHeading>

        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {items.map(([label, value]) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-hairline bg-white p-5 shadow-soft">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    {icons[label]}
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent">{label}</p>
                  <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <Suspense fallback={<div className="rounded-2xl border border-hairline bg-white p-6 shadow-soft">Loading contact form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
