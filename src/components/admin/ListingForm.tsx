"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/data/listings";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Mode = { kind: "create" } | { kind: "edit"; id: string };

const statuses: Listing["status"][] = ["For Sale", "For Rent", "Sold"];
const groups: Listing["group"][] = ["active", "rental", "sold"];
const propertyTypes: Listing["propertyType"][] = ["House", "Townhome", "Condo", "Rental"];

// Form state mirrors the listing, but numeric/optional fields are kept as
// strings so inputs stay controlled; we coerce them on submit.
type FormState = {
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  priceLabel: string;
  priceValue: string;
  beds: string;
  baths: string;
  sqft: string;
  status: Listing["status"];
  group: Listing["group"];
  community: string;
  description: string;
  features: string;
  sourceLabel: string;
  imageUrl: string;
  zillowUrl: string;
  redfinUrl: string;
  propertyType: Listing["propertyType"];
  contactCta: string;
  createdAt: string;
  soldDate: string;
  daysOnMarket: string;
  pricePerSqft: string;
};

function toFormState(listing?: Listing): FormState {
  return {
    title: listing?.title ?? "",
    address: listing?.address ?? "",
    city: listing?.city ?? "",
    state: listing?.state ?? "FL",
    zip: listing?.zip ?? "",
    priceLabel: listing?.priceLabel ?? "",
    priceValue: listing?.priceValue != null ? String(listing.priceValue) : "",
    beds: listing?.beds != null ? String(listing.beds) : "",
    baths: listing?.baths != null ? String(listing.baths) : "",
    sqft: listing?.sqft != null ? String(listing.sqft) : "",
    status: listing?.status ?? "For Sale",
    group: listing?.group ?? "active",
    community: listing?.community ?? "",
    description: listing?.description ?? "",
    features: (listing?.features ?? []).join("\n"),
    sourceLabel: listing?.sourceLabel ?? "Listed by Lilian Yang, Florida Morning Realty LLC",
    imageUrl: listing?.imageUrl ?? "",
    zillowUrl: listing?.zillowUrl ?? "",
    redfinUrl: listing?.redfinUrl ?? "",
    propertyType: listing?.propertyType ?? "House",
    contactCta: listing?.contactCta ?? "",
    createdAt: listing?.createdAt ?? new Date().toISOString().slice(0, 10),
    soldDate: listing?.soldDate ?? "",
    daysOnMarket: listing?.daysOnMarket != null ? String(listing.daysOnMarket) : "",
    pricePerSqft: listing?.pricePerSqft ?? ""
  };
}

function buildPayload(form: FormState) {
  const trimmedOrUndefined = (value: string) => {
    const v = value.trim();
    return v === "" ? undefined : v;
  };
  const intOrNull = (value: string) => {
    const v = value.trim();
    return v === "" ? null : Number(v);
  };

  return {
    title: form.title,
    address: form.address,
    city: form.city,
    state: form.state,
    zip: form.zip,
    priceLabel: form.priceLabel,
    priceValue: form.priceValue.trim() === "" ? 0 : Number(form.priceValue),
    beds: form.beds.trim() === "" ? 0 : Number(form.beds),
    baths: form.baths.trim() === "" ? 0 : Number(form.baths),
    sqft: intOrNull(form.sqft),
    status: form.status,
    group: form.group,
    community: trimmedOrUndefined(form.community),
    description: form.description,
    features: form.features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    sourceLabel: form.sourceLabel,
    imageUrl: form.imageUrl,
    zillowUrl: trimmedOrUndefined(form.zillowUrl),
    redfinUrl: trimmedOrUndefined(form.redfinUrl),
    propertyType: form.propertyType,
    contactCta: form.contactCta,
    createdAt: form.createdAt,
    soldDate: trimmedOrUndefined(form.soldDate),
    daysOnMarket: intOrNull(form.daysOnMarket),
    pricePerSqft: trimmedOrUndefined(form.pricePerSqft)
  };
}

const inputClass =
  "mt-1 w-full rounded-xl border border-hairline bg-cream px-3 py-2 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";
const labelClass = "block text-sm font-medium text-ink";

function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function ListingForm({ listing, mode }: { listing?: Listing; mode: Mode }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(listing));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = buildPayload(form);
    const url = mode.kind === "create" ? "/api/admin/listings" : `/api/admin/listings/${mode.id}`;
    const method = mode.kind === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await response.json().catch(() => ({}));
    setError(data.error || "Could not save this listing.");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <section className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Photo</h2>
        <p className="mb-4 mt-1 text-sm text-muted">Upload the main listing image.</p>
        <ImageUpload value={form.imageUrl} onChange={(url) => update("imageUrl", url)} />
      </section>

      <section className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Title">
              <input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} required />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={(e) => update("address", e.target.value)} required />
            </Field>
          </div>
          <Field label="City">
            <input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="State">
              <input className={inputClass} value={form.state} onChange={(e) => update("state", e.target.value)} required />
            </Field>
            <Field label="ZIP">
              <input className={inputClass} value={form.zip} onChange={(e) => update("zip", e.target.value)} required />
            </Field>
          </div>
          <Field label="Community" hint="Optional (e.g. Palmer Ranch)">
            <input className={inputClass} value={form.community} onChange={(e) => update("community", e.target.value)} />
          </Field>
          <Field label="Property type">
            <select className={inputClass} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value as Listing["propertyType"])}>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Price &amp; specs</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Price label" hint='As shown on the site, e.g. "$998,000" or "$2,300/month"'>
            <input className={inputClass} value={form.priceLabel} onChange={(e) => update("priceLabel", e.target.value)} required />
          </Field>
          <Field label="Price value" hint="Number only, used for sorting/filtering (e.g. 998000)">
            <input type="number" min="0" className={inputClass} value={form.priceValue} onChange={(e) => update("priceValue", e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-4 sm:col-span-2">
            <Field label="Beds">
              <input type="number" min="0" className={inputClass} value={form.beds} onChange={(e) => update("beds", e.target.value)} />
            </Field>
            <Field label="Baths">
              <input type="number" min="0" step="0.5" className={inputClass} value={form.baths} onChange={(e) => update("baths", e.target.value)} />
            </Field>
            <Field label="Sqft" hint="Blank = N/A">
              <input type="number" min="0" className={inputClass} value={form.sqft} onChange={(e) => update("sqft", e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Status</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Status badge">
            <select className={inputClass} value={form.status} onChange={(e) => update("status", e.target.value as Listing["status"])}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Group" hint="Where it appears: active = For Sale, rental = Rentals, sold = Sold">
            <select className={inputClass} value={form.group} onChange={(e) => update("group", e.target.value as Listing["group"])}>
              {groups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Listed date" hint="YYYY-MM-DD">
            <input type="date" className={inputClass} value={form.createdAt} onChange={(e) => update("createdAt", e.target.value)} required />
          </Field>
          <Field label="Sold date" hint="Optional, for sold listings (YYYY-MM-DD)">
            <input type="date" className={inputClass} value={form.soldDate} onChange={(e) => update("soldDate", e.target.value)} />
          </Field>
          <Field label="Days on market" hint="Optional">
            <input type="number" min="0" className={inputClass} value={form.daysOnMarket} onChange={(e) => update("daysOnMarket", e.target.value)} />
          </Field>
          <Field label="Price per sqft" hint="Optional display string, e.g. $210/sqft">
            <input className={inputClass} value={form.pricePerSqft} onChange={(e) => update("pricePerSqft", e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-hairline bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Description &amp; links</h2>
        <div className="mt-4 space-y-4">
          <Field label="Description">
            <textarea rows={5} className={inputClass} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="Features" hint="One per line">
            <textarea rows={4} className={inputClass} value={form.features} onChange={(e) => update("features", e.target.value)} />
          </Field>
          <Field label="Contact call-to-action" hint="Short line shown on the listing page">
            <input className={inputClass} value={form.contactCta} onChange={(e) => update("contactCta", e.target.value)} />
          </Field>
          <Field label="Source label">
            <input className={inputClass} value={form.sourceLabel} onChange={(e) => update("sourceLabel", e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Zillow URL" hint="Optional">
              <input className={inputClass} value={form.zillowUrl} onChange={(e) => update("zillowUrl", e.target.value)} />
            </Field>
            <Field label="Redfin URL" hint="Optional">
              <input className={inputClass} value={form.redfinUrl} onChange={(e) => update("redfinUrl", e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primaryActive disabled:opacity-60"
        >
          {saving ? "Saving..." : mode.kind === "create" ? "Create listing" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-soft"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
