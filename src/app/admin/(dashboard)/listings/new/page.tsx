import Link from "next/link";
import { ListingForm } from "@/components/admin/ListingForm";

export default function NewListingPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm font-medium text-muted hover:text-ink">
        ← Back to listings
      </Link>
      <h1 className="mt-2 font-serif text-2xl font-semibold text-ink">New listing</h1>
      <div className="mt-6">
        <ListingForm mode={{ kind: "create" }} />
      </div>
    </div>
  );
}
