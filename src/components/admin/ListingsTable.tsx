"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/data/listings";

const groupLabels: Record<Listing["group"], string> = {
  active: "For sale",
  rental: "Rental",
  sold: "Sold"
};

export function ListingsTable({ initialListings }: { initialListings: Listing[] }) {
  const router = useRouter();
  const [listings, setListings] = useState(initialListings);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(listing: Listing) {
    if (!window.confirm(`Delete "${listing.title}"? This cannot be undone.`)) return;
    setDeletingId(listing.id);
    setError("");

    const response = await fetch(`/api/admin/listings/${listing.id}`, { method: "DELETE" });
    if (response.ok) {
      setListings((current) => current.filter((item) => item.id !== listing.id));
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not delete this listing.");
    }
    setDeletingId(null);
  }

  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-white p-10 text-center text-sm text-muted">
        No listings yet. Create your first one.
      </div>
    );
  }

  return (
    <div>
      {error ? <p className="mb-3 text-sm font-medium text-red-700">{error}</p> : null}
      <div className="overflow-hidden rounded-xl border border-hairline bg-white">
        <ul className="divide-y divide-hairline">
          {listings.map((listing) => (
            <li key={listing.id} className="flex items-center gap-4 p-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-hairline bg-soft">
                {listing.imageUrl ? (
                  <Image
                    src={listing.imageUrl}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-[10px] text-muted">No image</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{listing.title}</p>
                <p className="truncate text-sm text-muted">
                  {listing.address}, {listing.city} · {listing.priceLabel}
                </p>
                <span className="mt-1 inline-block rounded-full bg-soft px-2 py-0.5 text-xs font-medium text-body">
                  {groupLabels[listing.group]}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/listings/${listing.id}`}
                  className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-soft"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(listing)}
                  disabled={deletingId === listing.id}
                  className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
                >
                  {deletingId === listing.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
