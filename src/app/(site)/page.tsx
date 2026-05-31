import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ListingCard } from "@/components/ListingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getAvailableListings } from "@/lib/data/listings";
import { getSiteContent } from "@/lib/data/content";

const values: [string, string, React.ReactNode][] = [
  [
    "Buyer Guidance",
    "Local help comparing Sarasota-area homes, neighborhoods, tradeoffs, and offer strategy.",
    <path
      key="i"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
    />
  ],
  [
    "Seller Strategy",
    "Thoughtful pricing, positioning, and preparation guidance for Gulf Coast sellers.",
    <path
      key="i"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
    />
  ],
  [
    "Rentals & Management",
    "Support for rental searches, tenant placement, and property management needs.",
    <path
      key="i"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"
    />
  ]
];

export default async function HomePage() {
  const [availableListings, { clientHighlights, newsletterContent, siteConfig }] = await Promise.all([
    getAvailableListings(),
    getSiteContent()
  ]);
  return (
    <>
      <Hero />

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How I Help" title="Guidance for every step">
            From first showing to final closing, you get clear, local advice tailored to your goals.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(([title, text, icon]) => (
              <Card key={title} className="transition-shadow duration-200 hover:shadow-lift">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    {icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-body">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-soft py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured Listings" title="Selected Properties">
            {"Current sale and rental opportunities I represent on my public profiles."}
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {availableListings.slice(0, 3).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-hairline bg-white p-5 text-sm leading-6 text-muted">
            Listings shown here are selected featured properties and may not represent all available homes. Contact me for a
            current, personalized search.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Client Highlights" title="What my clients appreciate">
            {"Short, paraphrased highlights from my clients' public feedback."}
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {clientHighlights.map((highlight) => (
              <Card key={highlight} className="flex flex-col">
                <svg className="h-8 w-8 text-accent/50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="mt-4 font-serif text-lg leading-8 text-ink">{highlight}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="dark"
        title="Get Sarasota Market Updates"
        text={newsletterContent.intro}
        primaryHref="/newsletter"
        primaryLabel="Join the Newsletter"
        secondaryHref="/contact"
        secondaryLabel="Ask a Question"
      />

      <CTASection
        title="Ready for a Clear Next Step?"
        text={`Tell me what you're planning in ${siteConfig.market}, and I'll follow up with guidance tailored to your timeline.`}
        primaryHref="/contact"
        primaryLabel="Contact Me"
        secondaryHref="/profile"
        secondaryLabel="About Me"
      />
    </>
  );
}
