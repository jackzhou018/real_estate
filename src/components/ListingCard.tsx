import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/data/listings";
import { getListingPhotoLinks } from "@/lib/listingLinks";
import { formatOptionalNumber } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  const [photoLink] = getListingPhotoLinks(listing);

  return (
    <article className="group h-full">
      <div className="relative aspect-square overflow-hidden rounded-[14px] bg-soft">
        <Image
          src={listing.imageUrl}
          alt={`${listing.title} property image`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink shadow-soft">
          {listing.status}
        </span>
        <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </span>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-5 text-ink">{listing.address}</h3>
          <p className="shrink-0 text-sm font-semibold text-ink">{listing.priceLabel}</p>
        </div>
        <p className="mt-1 text-sm leading-5 text-muted">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <p className="mt-1 text-sm leading-5 text-muted">
          {listing.beds} beds · {listing.baths} baths ·{" "}
          {listing.sqft === null ? "sqft available on request" : `${formatOptionalNumber(listing.sqft)} sqft`}
        </p>
        {listing.community ? <p className="mt-1 text-sm leading-5 text-muted">{listing.community}</p> : null}
        <p className="mt-2 text-xs font-medium text-muted">{listing.sourceLabel}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <Link href={`/listings/${listing.id}`} className="text-sm font-medium text-ink underline underline-offset-4">
            View details
          </Link>
          <a
            href={photoLink.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-ink underline underline-offset-4"
          >
            {photoLink.label}
          </a>
        </div>
      </div>
    </article>
  );
}
