export type Listing = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: "Available" | "Pending" | "Recently Sold";
  description: string;
  features: string[];
  imageUrl: string;
  propertyType: "Single Family" | "Condo" | "Townhome" | "Multi-Family";
  contactCta: string;
  createdAt: string;
};

export const listings: Listing[] = [
  {
    id: "willow-glen-residence",
    title: "Bright Residence With Flexible Living Space",
    address: "123 Willow Glen Drive",
    city: "[Your City]",
    state: "[State]",
    zip: "00000",
    price: 825000,
    beds: 4,
    baths: 3,
    sqft: 2450,
    status: "Available",
    description:
      "A polished featured home placeholder with generous living areas, natural light, and room for everyday comfort. Replace this copy with property-specific details when you are ready to feature an active listing.",
    features: ["Open living and dining area", "Updated kitchen placeholder", "Private primary suite", "Outdoor entertaining space"],
    imageUrl: "/images/listing-placeholder-1.svg",
    propertyType: "Single Family",
    contactCta: "Ask Lilian for current details and showing availability.",
    createdAt: "2026-05-01"
  },
  {
    id: "central-park-condo",
    title: "Low-Maintenance Condo Near Everyday Conveniences",
    address: "456 Central Park Avenue",
    city: "[Your City]",
    state: "[State]",
    zip: "00000",
    price: 515000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    status: "Pending",
    description:
      "A refined condo placeholder for buyers seeking convenience, efficient space, and a simpler ownership experience. Update price, status, and details as manually managed listings change.",
    features: ["Efficient floor plan", "Dedicated parking placeholder", "Close to shopping and dining", "Private balcony placeholder"],
    imageUrl: "/images/listing-placeholder-2.svg",
    propertyType: "Condo",
    contactCta: "Contact Lilian to discuss similar available options.",
    createdAt: "2026-04-18"
  },
  {
    id: "ridgeview-townhome",
    title: "Modern Townhome With Comfortable Everyday Flow",
    address: "789 Ridgeview Lane",
    city: "[Nearby City]",
    state: "[State]",
    zip: "00000",
    price: 649000,
    beds: 3,
    baths: 2.5,
    sqft: 1765,
    status: "Available",
    description:
      "A townhome listing placeholder designed to show how featured properties will appear on the site. Use this space for accurate, current remarks before publishing a real listing.",
    features: ["Attached garage", "Flexible work-from-home space", "Modern finishes placeholder", "Low-maintenance exterior"],
    imageUrl: "/images/listing-placeholder-3.svg",
    propertyType: "Townhome",
    contactCta: "Schedule a consultation to compare this home with your search criteria.",
    createdAt: "2026-05-12"
  }
];

export function getListingById(id: string) {
  return listings.find((listing) => listing.id === id);
}
