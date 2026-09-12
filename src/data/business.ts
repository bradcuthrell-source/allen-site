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

// Short trust badges shown near the top of the home page and reused sitewide
// (city-page heroes, footer). Keep each one short — these render in a single
// row on desktop and wrap on mobile.
export const valueProps = [
  "Same-Day Service Available",
  "Free Estimates",
  "Veteran- & Family-Owned",
  "Serving NC for 20+ Years",
] as const;

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Concrete examples of the job, shown as a bullet list on the services page. */
  details: string[];
};

// TODO: refine wording with the business owner
export const services: Service[] = [
  {
    slug: "general-maintenance",
    name: "General Maintenance",
    shortDescription: "Repairs, upkeep, and handyman work for your home or property.",
    description:
      "From routine upkeep to one-off repairs, we handle the maintenance jobs that keep your property in good shape — inside and out. If it's on your to-do list and you haven't gotten to it, there's a good chance we can.",
    details: [
      "Drywall patching, trim, and small carpentry repairs",
      "Door and window adjustments",
      "Gutter cleaning and minor gutter repair",
      "Pressure washing for siding, driveways, and walkways",
      "Fixture and hardware replacement (faucets, light fixtures, cabinet hardware)",
      "Deck, fence, and railing repair",
      "Punch-list items after a move-in or renovation",
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    shortDescription: "Lawn care, yard cleanup, and landscape maintenance.",
    description:
      "Mowing, trimming, mulching, and seasonal cleanups to keep your lawn and landscaping looking sharp year-round — whether it's a standing weekly visit or a one-time overhaul.",
    details: [
      "Mowing, edging, and trimming on a recurring schedule",
      "Mulching and flower-bed maintenance",
      "Shrub and small tree trimming",
      "Spring and fall cleanups, leaf removal",
      "Storm debris and fallen-limb cleanup",
      "One-time yard overhauls for overgrown or neglected properties",
    ],
  },
  {
    slug: "hauling",
    name: "Hauling",
    shortDescription: "Fast, reliable hauling for bulky items and debris.",
    description:
      "Need something big moved out? We haul furniture, appliances, yard debris, and construction materials — you point, we haul, and we handle the loading.",
    details: [
      "Furniture and appliance hauling",
      "Yard debris, brush, and storm cleanup hauling",
      "Renovation and construction debris",
      "Move-out and estate hauling",
      "One-item pickups or full trailer loads",
    ],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    shortDescription: "Clear out clutter, old furniture, and unwanted junk.",
    description:
      "From a single item to a full property cleanout, we remove junk quickly and dispose of it responsibly — donating or recycling what we can along the way.",
    details: [
      "Garage, attic, and basement cleanouts",
      "Old furniture and appliance removal",
      "Rental and property-turnover cleanouts",
      "Light demolition debris",
      "Estate and downsizing cleanouts",
    ],
  },
];

export type ProcessStep = {
  title: string;
  description: string;
};

// The site-wide "how it works" steps, used on the services page.
export const processSteps: ProcessStep[] = [
  {
    title: "Call or Text Us",
    description: "Reach out with what you need — a quick call or text is all it takes to get started.",
  },
  {
    title: "We Hear You Out",
    description:
      "We'll talk through the job, and come take a look at the property in person if it's the kind of work that needs it.",
  },
  {
    title: "You Get an Estimate",
    description: "Clear, upfront pricing before we start — no surprises once the work is done.",
  },
  {
    title: "We Get It Done",
    description:
      "We work efficiently to get the job done right, on time, and within your budget.",
  },
];
