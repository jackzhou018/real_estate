import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/data/listings";
import { cn, formatOptionalNumber } from "@/lib/utils";

const statusStyles: Record<Listing["status"], string> = {
  "For Sale": "bg-primary text-white",
  "For Rent": "bg-accent text-white",
  Sold: "bg-ink/85 text-white"
};

function Stat({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <span className="text-accent" aria-hidden="true">
        {icon}
      </span>
      {children}
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft transition-shadow duration-200 hover:shadow-lift">
      <Link href={`/listings/${listing.id}`} className="relative block aspect-[4/3] overflow-hidden bg-soft">
        <Image
          src={listing.imageUrl}
          alt={`${listing.title} — ${listing.address}, ${listing.city}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-soft",
            statusStyles[listing.status]
          )}
        >
          {listing.status}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-serif text-xl font-semibold leading-tight text-ink">{listing.priceLabel}</p>
          <span className="shrink-0 rounded-full border border-hairline bg-soft px-2.5 py-1 text-[11px] font-medium text-muted">
            {listing.propertyType}
          </span>
        </div>

        <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
          <Link href={`/listings/${listing.id}`} className="transition-colors hover:text-primary">
            {listing.address}
          </Link>
        </h3>
        <p className="mt-1 text-sm leading-5 text-muted">
          {listing.city}, {listing.state} {listing.zip}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline pt-4">
          <Stat
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75V12M3 12h18M3 12v6m18-6v6M6 12V9.5A1.5 1.5 0 0 1 7.5 8h3A1.5 1.5 0 0 1 12 9.5V12m0 0V9.5A1.5 1.5 0 0 1 13.5 8h3A1.5 1.5 0 0 1 18 9.5V12" />
              </svg>
            }
          >
            {listing.beds} beds
          </Stat>
          <Stat
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M5 12V6.5A2.5 2.5 0 0 1 7.5 4c1 0 1.7.5 2 1M6 19l-1 2m13-2 1 2M5 12v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" />
              </svg>
            }
          >
            {listing.baths} baths
          </Stat>
          <Stat
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zM4 9h16M9 4v5M4 14h11M9 14v6" />
              </svg>
            }
          >
            {listing.sqft === null ? "Sqft on request" : `${formatOptionalNumber(listing.sqft)} sqft`}
          </Stat>
        </div>

        {listing.community ? <p className="mt-3 text-sm leading-5 text-muted">{listing.community}</p> : null}
        <p className="mt-3 text-xs font-medium text-muted">{listing.sourceLabel}</p>

        <div className="mt-auto pt-5">
          <Link
            href={`/listings/${listing.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primaryActive"
          >
            View details
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
