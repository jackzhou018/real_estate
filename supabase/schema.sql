-- Schema for the Lilian Yang real estate admin.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL -> New query).

-- 1) Listings table -------------------------------------------------------
create table if not exists public.listings (
  id             text primary key,
  title          text not null,
  address        text not null,
  city           text not null,
  state          text not null,
  zip            text not null,
  price_label    text not null,
  price_value    bigint not null default 0,
  beds           integer not null default 0,
  baths          numeric not null default 0,
  sqft           integer,
  status         text not null,            -- 'For Sale' | 'For Rent' | 'Sold'
  "group"        text not null,            -- 'active' | 'rental' | 'sold'
  community      text,
  description    text not null default '',
  features       jsonb not null default '[]'::jsonb,
  source_label   text not null default '',
  image_url      text not null default '',
  zillow_url     text,
  redfin_url     text,
  property_type  text not null,            -- 'House' | 'Townhome' | 'Condo' | 'Rental'
  contact_cta    text not null default '',
  created_at     text not null,            -- ISO date string, e.g. '2026-05-01'
  sold_date      text,
  days_on_market integer,
  price_per_sqft text
);

-- 2) Editable page content (single row) -----------------------------------
create table if not exists public.site_content (
  id         text primary key,
  content    jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3) Row Level Security ---------------------------------------------------
-- The app talks to the database with the service-role key, which BYPASSES RLS.
-- We enable RLS with no public policies so the anon/public key cannot read or
-- write these tables directly.
alter table public.listings    enable row level security;
alter table public.site_content enable row level security;

-- 4) Storage bucket for images (public read) ------------------------------
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;
