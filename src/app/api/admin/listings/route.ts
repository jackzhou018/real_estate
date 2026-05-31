import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getListings, listingToRow, type Listing } from "@/lib/data/listings";
import { listingSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json({ listings: await getListings() });
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "listing"
  );
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 500 });

  const body = await request.json().catch(() => null);
  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid listing." }, { status: 400 });
  }

  // Generate a unique slug id from the address.
  let id = slugify(parsed.data.address);
  const { data: existing } = await supabase.from("listings").select("id").eq("id", id).maybeSingle();
  if (existing) id = `${id}-${Date.now().toString(36).slice(-4)}`;

  const listing: Listing = { id, ...parsed.data };
  const { error } = await supabase.from("listings").insert(listingToRow(listing));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ listing }, { status: 201 });
}
