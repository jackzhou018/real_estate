import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { getListingById } from "@/lib/data/listings";
import { formatNumber } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  return {
    title: listing ? listing.title : "Listing",
    description: listing ? `${listing.address}, ${listing.city}. Contact me for details.` : "Featured listing details."
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const contactHref = `/contact?listing=${listing.id}&reason=Listing%20question`;

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/listings"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6 6m-6-6 6-6" />
          </svg>
          Back to listings
        </Link>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-soft">
          <Image src={listing.imageUrl} alt={`${listing.title} property image`} fill sizes="100vw" className="object-cover" priority />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-soft">
            {listing.status}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent">{listing.propertyType}</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {listing.title}
            </h1>
            <p className="mt-3 text-lg text-muted">
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
            <p className="mt-6 font-serif text-3xl font-semibold text-ink">{listing.priceLabel}</p>
            <p className="mt-2 text-sm font-medium text-muted">{listing.sourceLabel}</p>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-4">
              {[
                ["Beds", `${listing.beds}`],
                ["Baths", `${listing.baths}`],
                ["Sqft", listing.sqft === null ? "On request" : formatNumber(listing.sqft)],
                ["Type", listing.propertyType]
              ].map(([label, value]) => (
                <div key={label} className="bg-white px-4 py-4 text-center">
                  <p className="font-serif text-xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
                </div>
              ))}
            </div>

            {listing.community || listing.soldDate || listing.daysOnMarket || listing.pricePerSqft ? (
              <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
                {listing.community ? <span>Community: {listing.community}</span> : null}
                {listing.soldDate ? <span>Sold: {listing.soldDate}</span> : null}
                {listing.daysOnMarket ? <span>{listing.daysOnMarket} days on market</span> : null}
                {listing.pricePerSqft ? <span>{listing.pricePerSqft}</span> : null}
              </div>
            ) : null}

            <p className="mt-8 leading-8 text-body">{listing.description}</p>

            <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {listing.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-xl border border-hairline bg-white px-4 py-3 text-body">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Card className="h-fit lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl font-semibold text-ink">Interested in this property?</h2>
            <p className="mt-3 leading-7 text-muted">{listing.contactCta}</p>
            <div className="mt-6 grid gap-3">
              <Button href={contactHref}>Ask About This Property</Button>
              <Button href={`/contact?listing=${listing.id}&reason=Schedule%20a%20showing`} variant="secondary">
                Schedule a Showing
              </Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
