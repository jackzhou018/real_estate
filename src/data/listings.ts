export type ListingStatus = "For Sale" | "For Rent" | "Sold";
export type ListingGroup = "active" | "rental" | "sold";

export type Listing = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  priceLabel: string;
  priceValue: number;
  beds: number;
  baths: number;
  sqft: number | null;
  status: ListingStatus;
  group: ListingGroup;
  community?: string;
  description: string;
  features: string[];
  sourceLabel: string;
  imageUrl: string;
  propertyType: "House" | "Townhome" | "Condo" | "Rental";
  contactCta: string;
  createdAt: string;
  soldDate?: string;
  daysOnMarket?: number;
  pricePerSqft?: string;
};

export const listings: Listing[] = [
  {
    id: "6006-anise-dr",
    title: "Spacious Palmer Ranch Home Near Sarasota Conveniences",
    address: "6006 Anise Dr",
    city: "Sarasota",
    state: "FL",
    zip: "34238",
    priceLabel: "$998,000",
    priceValue: 998000,
    beds: 5,
    baths: 5,
    sqft: 4761,
    status: "For Sale",
    group: "active",
    community: "Arbor Lakes at Palmer Ranch",
    description:
      "Located in Arbor Lakes at Palmer Ranch, close to Siesta Key Beach, downtown Sarasota, top-rated schools, shopping, restaurants, parks, Legacy Trail, and I-75. A spacious 5-bedroom, 5-bath home with 4,761 square feet and maintained designer features.",
    features: ["Arbor Lakes at Palmer Ranch", "Near Siesta Key Beach", "Close to Legacy Trail", "Spacious 5-bedroom layout"],
    sourceLabel: "Listed by Lilian Yang, Florida Morning Realty LLC",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-1.svg",
    propertyType: "House",
    contactCta: "Ask Lilian for current details, showing availability, and Sarasota-area market context.",
    createdAt: "2026-05-01"
  },
  {
    id: "6759-hickory-hammock-cir",
    title: "Comfortable Bradenton Rental With Flexible Living Space",
    address: "6759 Hickory Hammock Cir",
    city: "Bradenton",
    state: "FL",
    zip: "34202",
    priceLabel: "$2,300/month",
    priceValue: 2300,
    beds: 2,
    baths: 2,
    sqft: 1817,
    status: "For Rent",
    group: "rental",
    description:
      "A beautifully maintained home offering comfort, functionality, peaceful views, a welcoming foyer, spacious living room, soaring ceilings, sliding glass doors, and a flexible den suitable for an office, creative space, or reading area.",
    features: ["Peaceful views", "Flexible den", "Spacious living room", "Soaring ceilings"],
    sourceLabel: "Listed by Lilian Yang, Florida Morning Realty LLC",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-2.svg",
    propertyType: "Rental",
    contactCta: "Contact Lilian for rental availability, application details, and local leasing guidance.",
    createdAt: "2026-04-25"
  },
  {
    id: "17535-jadestone-ct",
    title: "Wellen Park Rental With Golf-Course Views",
    address: "17535 Jadestone Ct",
    city: "Venice",
    state: "FL",
    zip: "34293",
    priceLabel: "$4,500/month",
    priceValue: 4500,
    beds: 4,
    baths: 3,
    sqft: 2247,
    status: "For Rent",
    group: "rental",
    community: "Wellen Park Golf and Country Club",
    description:
      "A rental opportunity in Wellen Park Golf and Country Club with golf-course views, community amenities, and a blend of sophistication, comfort, and natural beauty.",
    features: ["Wellen Park Golf and Country Club", "Golf-course views", "Community amenities", "4-bedroom layout"],
    sourceLabel: "Listed by Lilian Yang, Florida Morning Realty LLC",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-3.svg",
    propertyType: "Rental",
    contactCta: "Ask Lilian about lease terms, community amenities, and Venice-area rental options.",
    createdAt: "2026-04-20"
  },
  {
    id: "4749-antrim-dr",
    title: "Sarasota Rental Represented on Lilian Yang's Public Profile",
    address: "4749 Antrim Dr",
    city: "Sarasota",
    state: "FL",
    zip: "34240",
    priceLabel: "$3,900/month",
    priceValue: 3900,
    beds: 3,
    baths: 3,
    sqft: null,
    status: "For Rent",
    group: "rental",
    description: "Sarasota rental represented on Lilian Yang's Zillow profile.",
    features: ["Sarasota rental", "Public Zillow profile listing", "3 bedrooms", "Contact for current details"],
    sourceLabel: "Public Zillow profile listing",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-1.svg",
    propertyType: "Rental",
    contactCta: "Contact Lilian to confirm current rental availability and details.",
    createdAt: "2026-04-10"
  },
  {
    id: "5514-46th-ct-w-unit-701",
    title: "Recently Sold Bradenton Condo",
    address: "5514 46th Ct W Unit 701",
    city: "Bradenton",
    state: "FL",
    zip: "34210",
    priceLabel: "$922,000",
    priceValue: 922000,
    beds: 3,
    baths: 3,
    sqft: 2039,
    status: "Sold",
    group: "sold",
    description: "Sold Jan 15, 2025 after 5 days on market at $452/sq ft.",
    features: ["Sold Jan 15, 2025", "5 days on market", "$452/sq ft", "Bradenton condo"],
    sourceLabel: "Public profile sold history",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-2.svg",
    propertyType: "Condo",
    contactCta: "Ask Lilian about comparable sold properties and current Bradenton market conditions.",
    createdAt: "2025-01-15",
    soldDate: "Jan 15, 2025",
    daysOnMarket: 5,
    pricePerSqft: "$452/sq ft"
  },
  {
    id: "16314-little-garden-dr",
    title: "Recently Sold Wimauma Home",
    address: "16314 Little Garden Dr",
    city: "Wimauma",
    state: "FL",
    zip: "33598",
    priceLabel: "$348,000",
    priceValue: 348000,
    beds: 4,
    baths: 2,
    sqft: 1846,
    status: "Sold",
    group: "sold",
    description: "Sold Feb 8, 2024 after 118 days on market at $189/sq ft.",
    features: ["Sold Feb 8, 2024", "118 days on market", "$189/sq ft", "4-bedroom home"],
    sourceLabel: "Public profile sold history",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-3.svg",
    propertyType: "House",
    contactCta: "Ask Lilian about Wimauma sales history and nearby Tampa Bay market activity.",
    createdAt: "2024-02-08",
    soldDate: "Feb 8, 2024",
    daysOnMarket: 118,
    pricePerSqft: "$189/sq ft"
  },
  {
    id: "12821-buffalo-run-dr",
    title: "Recently Sold Gibsonton Home",
    address: "12821 Buffalo Run Dr",
    city: "Gibsonton",
    state: "FL",
    zip: "33534",
    priceLabel: "$310,500",
    priceValue: 310500,
    beds: 3,
    baths: 2.5,
    sqft: 1684,
    status: "Sold",
    group: "sold",
    description: "Sold Apr 20, 2022 after 5 days on market at $184/sq ft.",
    features: ["Sold Apr 20, 2022", "5 days on market", "$184/sq ft", "3-bedroom home"],
    sourceLabel: "Public profile sold history",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-1.svg",
    propertyType: "House",
    contactCta: "Contact Lilian to compare similar sold homes and current buyer demand.",
    createdAt: "2022-04-20",
    soldDate: "Apr 20, 2022",
    daysOnMarket: 5,
    pricePerSqft: "$184/sq ft"
  },
  {
    id: "3725-calamity-terrace",
    title: "Recently Sold Bradenton Home",
    address: "3725 Calamity Terrace",
    city: "Bradenton",
    state: "FL",
    zip: "34208",
    priceLabel: "$410,500",
    priceValue: 410500,
    beds: 5,
    baths: 3,
    sqft: 2455,
    status: "Sold",
    group: "sold",
    description: "Sold Jan 5, 2022 after 6 days on market at $167/sq ft.",
    features: ["Sold Jan 5, 2022", "6 days on market", "$167/sq ft", "5-bedroom home"],
    sourceLabel: "Public profile sold history",
    // Replace this placeholder with an approved listing image later. Do not hotlink Zillow or Homes.com images.
    imageUrl: "/images/listing-placeholder-2.svg",
    propertyType: "House",
    contactCta: "Ask Lilian for Bradenton-area selling strategy and pricing context.",
    createdAt: "2022-01-05",
    soldDate: "Jan 5, 2022",
    daysOnMarket: 6,
    pricePerSqft: "$167/sq ft"
  }
];

export const activeListings = listings.filter((listing) => listing.group === "active");
export const rentalListings = listings.filter((listing) => listing.group === "rental");
export const soldListings = listings.filter((listing) => listing.group === "sold");
export const availableListings = listings.filter((listing) => listing.group !== "sold");

export function getListingById(id: string) {
  return listings.find((listing) => listing.id === id);
}
