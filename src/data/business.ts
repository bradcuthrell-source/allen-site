// Single source of truth for business info used across the site.
// Fields marked TODO are placeholders — update here once real info is available
// and it will flow through everywhere it's used (header, footer, JSON-LD, forms).

export const business = {
  legalName: "Allen Enterprises, LLC",
  brandName: "Allen's Pro Services",

  phoneDisplay: "(919) 622-8643",
  phoneHref: "tel:+19196228643",

  email: "allensproservices1@gmail.com",

  domain: "allensproservices.com",
  siteUrl: "https://allensproservices.com",

  // No physical storefront — service-area business.
  serviceAreaCenter: "Raleigh, NC",
  serviceAreaCenterLat: 35.7796,
  serviceAreaCenterLng: -78.6382,
  serviceAreaRadiusMiles: 50,

  hours: [
    { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
    { days: "Saturday – Sunday", hours: "Closed" },
  ],

  tagline: "General Maintenance & Landscaping — Hauling & Removal",
} as const;

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
};

// TODO: refine wording with the business owner
export const services: Service[] = [
  {
    slug: "general-maintenance",
    name: "General Maintenance",
    shortDescription: "Repairs, upkeep, and handyman work for your home or property.",
    description:
      "From routine upkeep to one-off repairs, we handle the maintenance jobs that keep your property in good shape — inside and out.",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    shortDescription: "Lawn care, yard cleanup, and landscape maintenance.",
    description:
      "Mowing, trimming, mulching, and seasonal cleanups to keep your lawn and landscaping looking sharp year-round.",
  },
  {
    slug: "hauling",
    name: "Hauling",
    shortDescription: "Fast, reliable hauling for bulky items and debris.",
    description:
      "Need something big moved out? We haul furniture, appliances, yard debris, and construction materials — you point, we haul.",
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    shortDescription: "Clear out clutter, old furniture, and unwanted junk.",
    description:
      "From a single item to a full property cleanout, we remove junk quickly and dispose of it responsibly.",
  },
];
