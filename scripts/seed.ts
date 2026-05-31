/**
 * One-time seed: loads the current listings and page content into Supabase.
 *
 *   npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (this script loads that file automatically). Safe to re-run — it upserts.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { listings } from "../src/data/listings";
import {
  clientHighlights,
  contactContent,
  heroContent,
  newsletterContent,
  profileContent,
  siteConfig
} from "../src/lib/site";

// --- Load .env.local into process.env (minimal parser, no dependency) ---
function loadEnv(file: string) {
  let raw: string;
  try {
    raw = readFileSync(resolve(process.cwd(), file), "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function listingToRow(listing: (typeof listings)[number]) {
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

async function main() {
  console.log(`Seeding ${listings.length} listings...`);
  const { error: listingsError } = await supabase
    .from("listings")
    .upsert(listings.map(listingToRow), { onConflict: "id" });
  if (listingsError) {
    console.error("Failed to seed listings:", listingsError.message);
    process.exit(1);
  }

  console.log("Seeding site content...");
  const content = {
    siteConfig,
    heroContent,
    profileContent,
    clientHighlights,
    newsletterContent,
    contactContent
  };
  const { error: contentError } = await supabase
    .from("site_content")
    .upsert({ id: "default", content, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (contentError) {
    console.error("Failed to seed site content:", contentError.message);
    process.exit(1);
  }

  console.log("Done. Listings and content are in Supabase.");
}

main();
