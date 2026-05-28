import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { getListingById, listings } from "@/data/listings";
import { formatNumber, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const listing = getListingById(params.id);
  return {
    title: listing ? listing.title : "Listing",
    description: listing ? `${listing.address}, ${listing.city}. Contact Lilian Yang for details.` : "Featured listing details."
  };
}

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  const contactHref = `/contact?listing=${listing.id}&reason=Listing%20question`;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-soft">
          <Image src={listing.imageUrl} alt={`${listing.title} property image`} fill className="object-cover" priority />
          <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink shadow-soft">
            {listing.status}
          </span>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-medium text-muted">{listing.propertyType}</p>
            <h1 className="mt-3 text-[32px] font-semibold leading-tight text-ink">{listing.title}</h1>
            <p className="mt-3 text-lg text-muted">
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
            <p className="mt-6 text-3xl font-semibold text-ink">{formatPrice(listing.price)}</p>
            <div className="mt-6 grid gap-4 rounded-[14px] border border-hairline bg-soft p-5 text-sm font-semibold text-ink sm:grid-cols-4">
              <span>{listing.beds} beds</span>
              <span>{listing.baths} baths</span>
              <span>{formatNumber(listing.sqft)} sqft</span>
              <span>{listing.propertyType}</span>
            </div>
            <p className="mt-8 leading-8 text-body">{listing.description}</p>
            <h2 className="mt-10 text-2xl font-semibold text-ink">Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {listing.features.map((feature) => (
                <li key={feature} className="rounded-[14px] bg-soft px-4 py-3 text-body">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Card className="h-fit shadow-soft lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold text-ink">Interested in this property?</h2>
            <p className="mt-3 leading-7 text-muted">{listing.contactCta}</p>
            <div className="mt-6 grid gap-3">
              <Button href={contactHref}>Ask About This Property</Button>
              <Button href={`/contact?listing=${listing.id}&reason=Schedule%20a%20showing`} variant="secondary">
                Schedule a Showing
              </Button>
              <Button href="/contact" variant="outline">
                Contact Lilian
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
