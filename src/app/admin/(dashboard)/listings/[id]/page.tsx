import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/data/listings";
import { ListingForm } from "@/components/admin/ListingForm";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  return (
    <div>
      <Link href="/admin" className="text-sm font-medium text-muted hover:text-ink">
        ← Back to listings
      </Link>
      <h1 className="mt-2 font-serif text-2xl font-semibold text-ink">Edit listing</h1>
      <p className="mt-1 text-sm text-muted">{listing.address}</p>
      <div className="mt-6">
        <ListingForm listing={listing} mode={{ kind: "edit", id }} />
      </div>
    </div>
  );
}
