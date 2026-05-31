import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please include a short message"),
  reason: z.string().trim().optional(),
  sourcePage: z.string().trim().optional(),
  listingId: z.string().trim().optional()
});

export const newsletterSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  areasOfInterest: z.string().trim().min(2, "Please add an area of interest"),
  interestType: z.enum(["Buyer", "Seller", "Investor", "General market updates"]),
  emailConsent: z.boolean().refine(Boolean, "Newsletter consent is required")
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// --- Admin: listings ---
const optionalText = z.string().trim().optional();

export const listingSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  zip: z.string().trim().min(1, "ZIP is required"),
  priceLabel: z.string().trim().min(1, "Price label is required"),
  priceValue: z.coerce.number().nonnegative("Price must be 0 or more"),
  beds: z.coerce.number().nonnegative(),
  baths: z.coerce.number().nonnegative(),
  sqft: z.coerce.number().int().nonnegative().nullable().default(null),
  status: z.enum(["For Sale", "For Rent", "Sold"]),
  group: z.enum(["active", "rental", "sold"]),
  community: optionalText,
  description: z.string().trim().default(""),
  features: z.array(z.string().trim().min(1)).default([]),
  sourceLabel: z.string().trim().default(""),
  imageUrl: z.string().trim().default(""),
  zillowUrl: optionalText,
  redfinUrl: optionalText,
  propertyType: z.enum(["House", "Townhome", "Condo", "Rental"]),
  contactCta: z.string().trim().default(""),
  createdAt: z.string().trim().min(1, "Date is required"),
  soldDate: optionalText,
  daysOnMarket: z.coerce.number().int().nonnegative().nullable().default(null).transform((v) => v ?? undefined),
  pricePerSqft: optionalText
});

export type ListingInput = z.infer<typeof listingSchema>;

// --- Admin: editable site content ---
const statPair = z.tuple([z.string(), z.string()]);

export const siteContentSchema = z.object({
  siteConfig: z.object({
    name: z.string(),
    role: z.string(),
    brokerage: z.string(),
    market: z.string(),
    email: z.string(),
    publicEmail: z.string(),
    phone: z.string(),
    office: z.string(),
    serviceArea: z.string(),
    license: z.string(),
    url: z.string()
  }),
  heroContent: z.object({
    headline: z.string(),
    subheading: z.string()
  }),
  profileContent: z.object({
    title: z.string(),
    subtitle: z.string(),
    location: z.string(),
    bio: z.string(),
    stats: z.array(statPair),
    specialties: z.array(z.string())
  }),
  clientHighlights: z.array(z.string()),
  newsletterContent: z.object({ intro: z.string() }),
  contactContent: z.object({ intro: z.string() })
});

export type SiteContentInput = z.infer<typeof siteContentSchema>;
