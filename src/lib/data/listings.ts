import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabase";
import { listings as seedListings, type Listing, type ListingGroup, type ListingStatus } from "@/data/listings";

export type { Listing, ListingGroup, ListingStatus };

type ListingRow = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price_label: string;
  price_value: number;
  beds: number;
  baths: number;
  sqft: number | null;
  status: ListingStatus;
  group: ListingGroup;
  community: string | null;
  description: string;
  features: string[] | null;
  source_label: string;
  image_url: string;
  zillow_url: string | null;
  redfin_url: string | null;
  property_type: Listing["propertyType"];
  contact_cta: string;
  created_at: string;
  sold_date: string | null;
  days_on_market: number | null;
  price_per_sqft: string | null;
};

function rowToListing(row: ListingRow): Listing {
  return {
    id: row.id,
    title: row.title,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    priceLabel: row.price_label,
    priceValue: row.price_value,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    status: row.status,
    group: row.group,
    community: row.community ?? undefined,
    description: row.description,
    features: row.features ?? [],
    sourceLabel: row.source_label,
    imageUrl: row.image_url,
    zillowUrl: row.zillow_url ?? undefined,
    redfinUrl: row.redfin_url ?? undefined,
    propertyType: row.property_type,
    contactCta: row.contact_cta,
    createdAt: row.created_at,
    soldDate: row.sold_date ?? undefined,
    daysOnMarket: row.days_on_market ?? undefined,
    pricePerSqft: row.price_per_sqft ?? undefined
  };
}

/** Map a `Listing` (camelCase) to a DB row (snake_case) for insert/update. */
export function listingToRow(listing: Listing): ListingRow {
  return {
    id: listing.id,
    title: listing.title,
    address: listing.address,
    city: listing.city,
    state: listing.state,
    zip: listing.zip,
    price_label: listing.priceLabel,
    price_value: listing.priceValue,
    beds: listing.beds,
    baths: listing.baths,
    sqft: listing.sqft,
    status: listing.status,
    group: listing.group,
    community: listing.community ?? null,
    description: listing.description,
    features: listing.features ?? [],
    source_label: listing.sourceLabel,
    image_url: listing.imageUrl,
    zillow_url: listing.zillowUrl ?? null,
    redfin_url: listing.redfinUrl ?? null,
    property_type: listing.propertyType,
    contact_cta: listing.contactCta,
    created_at: listing.createdAt,
    sold_date: listing.soldDate ?? null,
    days_on_market: listing.daysOnMarket ?? null,
    price_per_sqft: listing.pricePerSqft ?? null
  };
}

/**
 * All listings, newest first. Cached per request so multiple server components
 * share one query. Falls back to the seed data when Supabase is not configured
 * (e.g. local dev without env vars) and to an empty list on query error.
 */
export const getListings = cache(async (): Promise<Listing[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [...seedListings];

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load listings from Supabase:", error.message);
    return [];
  }
  return (data as ListingRow[]).map(rowToListing);
});

export async function getAvailableListings(): Promise<Listing[]> {
  return (await getListings()).filter((listing) => listing.group !== "sold");
}

export async function getSoldListings(): Promise<Listing[]> {
  return (await getListings()).filter((listing) => listing.group === "sold");
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  return (await getListings()).find((listing) => listing.id === id);
}
