"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/ListingCard";
import { Field, Input, Select } from "@/components/fields";
import type { Listing } from "@/data/listings";

type Sort = "newest" | "price-asc" | "price-desc";

export function ListingFilters({ listings }: { listings: Listing[] }) {
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("");
  const [group, setGroup] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const cities = Array.from(new Set(listings.map((listing) => listing.city)));
  const propertyTypes = Array.from(new Set(listings.map((listing) => listing.propertyType)));
  const statuses = Array.from(new Set(listings.map((listing) => listing.status)));
  const groups = Array.from(new Set(listings.map((listing) => listing.group)));

  const filteredListings = useMemo(() => {
    return listings
      .filter((listing) => (city ? listing.city === city : true))
      .filter((listing) => (propertyType ? listing.propertyType === propertyType : true))
      .filter((listing) => (status ? listing.status === status : true))
      .filter((listing) => (group ? listing.group === group : true))
      .filter((listing) => (minPrice ? listing.priceValue >= Number(minPrice) : true))
      .filter((listing) => (maxPrice ? listing.priceValue <= Number(maxPrice) : true))
      .sort((a, b) => {
        if (sort === "price-asc") return a.priceValue - b.priceValue;
        if (sort === "price-desc") return b.priceValue - a.priceValue;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [city, group, listings, maxPrice, minPrice, propertyType, sort, status]);

  return (
    <div>
      <div className="mb-6 grid gap-4 rounded-2xl border border-hairline bg-white p-5 shadow-soft sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
        <Field label="City">
          <Select value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="">All cities</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Min price">
          <Input inputMode="numeric" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="500000" />
        </Field>
        <Field label="Max price">
          <Input inputMode="numeric" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="900000" />
        </Field>
        <Field label="Property type">
          <Select value={propertyType} onChange={(event) => setPropertyType(event.target.value)}>
            <option value="">All types</option>
            {propertyTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Group">
          <Select value={group} onChange={(event) => setGroup(event.target.value)}>
            <option value="">All groups</option>
            {groups.map((item) => (
              <option key={item} value={item}>
                {item === "active" ? "Active sale" : item === "rental" ? "Rentals" : "Recently sold"}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Sort">
          <Select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </Select>
        </Field>
      </div>

      <p className="mb-6 text-sm font-medium text-muted">
        {filteredListings.length} {filteredListings.length === 1 ? "property" : "properties"}
      </p>

      {filteredListings.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-hairline bg-white p-12 text-center text-muted">
          No featured listings match those filters. Try widening your search or{" "}
          <a href="/contact" className="font-semibold text-primary underline underline-offset-4 hover:text-primaryActive">
            contact me
          </a>{" "}
          for a personalized search.
        </div>
      )}
    </div>
  );
}
