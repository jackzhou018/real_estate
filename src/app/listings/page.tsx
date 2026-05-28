import type { Metadata } from "next";
import { ListingFilters } from "@/components/ListingFilters";
import { ListingCard } from "@/components/ListingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { availableListings, soldListings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Featured Listings",
  description: "Selected featured real estate listings manually managed by Lilian Yang."
};

export default function ListingsPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Listings" title="Featured Properties">
          Browse Sarasota-area sale and rental listings, then contact Lilian for current details.
        </SectionHeading>
        <ListingFilters listings={availableListings} />
        <p className="mt-8 rounded-[14px] border border-hairline bg-soft p-5 text-sm leading-6 text-muted">
          Listings shown here are selected featured properties and may not represent all available homes. Contact Lilian for a
          current, personalized search.
        </p>
        <div className="mt-16 border-t border-hairline pt-16">
          <SectionHeading eyebrow="Recently Sold" title="Recent Public Sales History">
            {"A selection of sold entries from Lilian's public profile history."}
          </SectionHeading>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {soldListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
