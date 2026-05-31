import Link from "next/link";
import { getListings } from "@/lib/data/listings";
import { getSupabaseAdmin } from "@/lib/supabase";
import { ListingsTable } from "@/components/admin/ListingsTable";

export default async function AdminListingsPage() {
  const listings = await getListings();
  const configured = getSupabaseAdmin() !== null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">Listings</h1>
          <p className="mt-1 text-sm text-muted">{listings.length} total. Edits go live immediately.</p>
        </div>
        <Link
          href="/admin/listings/new"
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primaryActive"
        >
          + New listing
        </Link>
      </div>

      {!configured ? (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Supabase is not configured yet, so you are seeing the built-in seed listings and changes cannot be saved.
          Add your Supabase keys to <code className="font-mono">.env.local</code> and restart to enable editing.
        </div>
      ) : null}

      <div className="mt-6">
        <ListingsTable initialListings={listings} />
      </div>
    </div>
  );
}
