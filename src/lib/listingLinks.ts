import type { Listing } from "@/data/listings";

type ListingLink = {
  label: string;
  href: string;
};

function listingAddressQuery(listing: Listing) {
  return `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`;
}

export function getListingPhotoLinks(listing: Listing): ListingLink[] {
  const query = encodeURIComponent(listingAddressQuery(listing));
  const links: ListingLink[] = [];

  if (listing.zillowUrl) {
    links.push({ label: "View Zillow photos", href: listing.zillowUrl });
  } else {
    links.push({ label: "Search Zillow photos", href: `https://www.zillow.com/homes/${query}_rb/` });
  }

  if (listing.redfinUrl) {
    links.push({ label: "View Redfin photos", href: listing.redfinUrl });
  }

  links.push({ label: "Search Realtor.com photos", href: `https://www.realtor.com/realestateandhomes-search/${query}` });

  return links;
}
