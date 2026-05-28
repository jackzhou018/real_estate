import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ListingCard } from "@/components/ListingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { availableListings } from "@/data/listings";
import { clientHighlights, newsletterContent, siteConfig } from "@/lib/site";

const values = [
  ["Buyer Guidance", "Local help comparing Sarasota-area homes, neighborhoods, tradeoffs, and offer strategy."],
  ["Seller Strategy", "Thoughtful pricing, positioning, and preparation guidance for Gulf Coast sellers."],
  ["Rentals & Management", "Support for rental searches, tenant placement, and property management needs."]
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-t border-hairline py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(([title, text]) => (
              <Card key={title} className="transition hover:shadow-soft">
                <h2 className="text-xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-body">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-soft py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured Listings" title="Selected Properties">
            {"Current sale and rental opportunities represented on Lilian's public profiles."}
          </SectionHeading>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
            {availableListings.slice(0, 3).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <p className="mt-8 rounded-[14px] border border-hairline bg-white p-5 text-sm leading-6 text-muted">
            Listings shown here are selected featured properties and may not represent all available homes. Contact Lilian for a
            current, personalized search.
          </p>
        </div>
      </section>
      <section className="border-t border-hairline bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Client Highlights" title="What clients appreciate">
            {"Short paraphrased highlights from Lilian's public client feedback."}
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {clientHighlights.map((highlight) => (
              <Card key={highlight} className="transition hover:shadow-soft">
                <p className="leading-7 text-body">{highlight}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Get Market Updates"
        text={newsletterContent.intro}
        primaryHref="/newsletter"
        primaryLabel="Join the Newsletter"
        secondaryHref="/contact"
        secondaryLabel="Ask a Question"
      />
      <CTASection
        title="Ready for a Clear Next Step?"
        text={`Tell Lilian what you are planning in ${siteConfig.market}, and she will follow up with guidance tailored to your timeline.`}
        primaryHref="/contact"
        primaryLabel="Contact Lilian"
        secondaryHref="/profile"
        secondaryLabel="Learn About Lilian"
      />
    </>
  );
}
