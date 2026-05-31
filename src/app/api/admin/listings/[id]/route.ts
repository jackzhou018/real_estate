import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getListingById, listingToRow, type Listing } from "@/lib/data/listings";
import { listingSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  return NextResponse.json({ listing });
}

export async function PUT(request: Request, { params }: Params) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 500 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid listing." }, { status: 400 });
  }

  const listing: Listing = { id, ...parsed.data };
  const { error } = await supabase.from("listings").update(listingToRow(listing)).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ listing });
}

export async function DELETE(_request: Request, { params }: Params) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 500 });

  const { id } = await params;
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
