import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().optional(),
  reason: z.enum([
    "Buying",
    "Selling",
    "Investing",
    "Listing question",
    "Schedule a showing",
    "General question"
  ]),
  preferredContactMethod: z.enum(["Email", "Phone", "Text"]),
  message: z.string().trim().min(10, "Please include a short message"),
  emailConsent: z.boolean().refine(Boolean, "Email follow-up consent is required"),
  smsConsent: z.boolean(),
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
