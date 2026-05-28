import type { Metadata } from "next";
import { ListingFilters } from "@/components/ListingFilters";
import { SectionHeading } from "@/components/SectionHeading";
import { listings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Featured Listings",
  description: "Selected featured real estate listings manually managed by Lilian Yang."
};

export default function ListingsPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Listings" title="Featured Properties">
          Browse selected featured properties and contact Lilian for current details.
        </SectionHeading>
        <ListingFilters listings={listings} />
        <p className="mt-8 rounded-[14px] border border-hairline bg-soft p-5 text-sm leading-6 text-muted">
          Listings shown here are selected featured properties and may not represent all available homes. Contact Lilian for a
          current, personalized search.
        </p>
      </div>
    </section>
  );
}
