import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ListingCard } from "@/components/ListingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { listings } from "@/data/listings";

const values = [
  ["Buyer Guidance", "A clear path for search strategy, offer preparation, inspections, and closing decisions."],
  ["Seller Strategy", "Thoughtful pricing, preparation, positioning, and negotiation guidance for your next move."],
  ["Local Market Insight", "Editable market-area expertise with practical context for timing, value, and opportunity."]
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
            Manually managed featured properties for buyers and sellers to review.
          </SectionHeading>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
            {listings.slice(0, 3).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <p className="mt-8 rounded-[14px] border border-hairline bg-white p-5 text-sm leading-6 text-muted">
            Listings shown here are selected featured properties and may not represent all available homes. Contact Lilian for a
            current, personalized search.
          </p>
        </div>
      </section>
      <CTASection
        title="Get Market Updates"
        text="Sign up for practical notes about featured listings, buyer tips, seller strategy, and local neighborhood insights."
        primaryHref="/newsletter"
        primaryLabel="Join the Newsletter"
        secondaryHref="/contact"
        secondaryLabel="Ask a Question"
      />
      <CTASection
        title="Ready for a Clear Next Step?"
        text="Tell Lilian what you are planning, and she will follow up with guidance tailored to your timeline."
        primaryHref="/contact"
        primaryLabel="Contact Lilian"
        secondaryHref="/profile"
        secondaryLabel="Learn About Lilian"
      />
    </>
  );
}
