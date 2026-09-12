// Per-city housing datapoints used to generate unique, non-boilerplate copy on
// the /service-area/[city] pages.
//
// Source: U.S. Census Bureau, American Community Survey 2024 5-year estimates
// (data vintage 2020-2024) via the Census Reporter API, tables:
//   B01003 total population
//   B25035 median year structure built
//   B25018 median number of rooms
//   B25003 tenure (owner-occupied share)
//   B25024 units in structure (1-unit detached share)
// `densityPerSqMi` = population / land area, and `milesFromRaleigh` = great-circle
// distance from the town centroid to business.serviceAreaCenter — both from the
// 2024 Census gazetteer (place centroids).
//
// Pulled 2026-09-10/11. Refresh when the next ACS 5-year release lands (annually,
// each December). Values are rounded on purpose — the page copy says "about" /
// "around" and never quotes these as exact.
//
// Cities without an incorporated Census "place" (e.g. Willow Spring) have no
// entry here; the template simply omits the data-driven sections for them.

export type CityStats = {
  /** Total population, ACS 2024 5-year. */
  population: number;
  /** Median year the housing stock was built. */
  medianYearBuilt: number;
  /** Median number of rooms per housing unit (rough proxy for home size). */
  medianRooms: number;
  /** Share of occupied homes that are owner-occupied, %. */
  ownerOccupiedPct: number;
  /** Share of homes that are single-family detached houses, %. */
  singleFamilyPct: number;
  /** Residents per square mile of land area. */
  densityPerSqMi: number;
  /** Straight-line distance from this town's centroid to Raleigh, in miles. */
  milesFromRaleigh: number;
  /** True for Raleigh itself — the "X miles from Raleigh" framing doesn't make sense there. */
  isHubCity?: boolean;
  /**
   * Optional hand-written sentence(s) about something the generated copy can't
   * infer from the numbers (a university, a downtown, a landmark industry).
   * Rendered as its own paragraph.
   */
  localNote?: string;
};

export const cityStats: Record<string, CityStats> = {
  raleigh: { population: 481031, medianYearBuilt: 1997, medianRooms: 5.1, ownerOccupiedPct: 51, singleFamilyPct: 44, densityPerSqMi: 3187, milesFromRaleigh: 0, isHubCity: true },
  cary: { population: 179306, medianYearBuilt: 1999, medianRooms: 6.6, ownerOccupiedPct: 67, singleFamilyPct: 59, densityPerSqMi: 2941, milesFromRaleigh: 10 },
  apex: { population: 70630, medianYearBuilt: 2008, medianRooms: 6.8, ownerOccupiedPct: 77, singleFamilyPct: 67, densityPerSqMi: 2624, milesFromRaleigh: 14 },
  "wake-forest": { population: 52844, medianYearBuilt: 2009, medianRooms: 6.8, ownerOccupiedPct: 74, singleFamilyPct: 69, densityPerSqMi: 2659, milesFromRaleigh: 15 },
  garner: { population: 34473, medianYearBuilt: 2001, medianRooms: 5.6, ownerOccupiedPct: 63, singleFamilyPct: 65, densityPerSqMi: 1747, milesFromRaleigh: 6 },
  "holly-springs": { population: 45248, medianYearBuilt: 2008, medianRooms: 7.3, ownerOccupiedPct: 81, singleFamilyPct: 79, densityPerSqMi: 2327, milesFromRaleigh: 14 },
  "fuquay-varina": { population: 40485, medianYearBuilt: 2011, medianRooms: 6.3, ownerOccupiedPct: 74, singleFamilyPct: 81, densityPerSqMi: 2085, milesFromRaleigh: 15 },
  morrisville: { population: 31422, medianYearBuilt: 2007, medianRooms: 5.0, ownerOccupiedPct: 45, singleFamilyPct: 33, densityPerSqMi: 3425, milesFromRaleigh: 12 },
  knightdale: { population: 20214, medianYearBuilt: 2008, medianRooms: 5.7, ownerOccupiedPct: 65, singleFamilyPct: 64, densityPerSqMi: 2100, milesFromRaleigh: 8 },
  wendell: { population: 13064, medianYearBuilt: 2010, medianRooms: 6.0, ownerOccupiedPct: 78, singleFamilyPct: 85, densityPerSqMi: 1387, milesFromRaleigh: 16 },
  zebulon: { population: 8711, medianYearBuilt: 2000, medianRooms: 5.4, ownerOccupiedPct: 63, singleFamilyPct: 73, densityPerSqMi: 1314, milesFromRaleigh: 18 },
  rolesville: { population: 10766, medianYearBuilt: 2013, medianRooms: 8.1, ownerOccupiedPct: 93, singleFamilyPct: 87, densityPerSqMi: 1535, milesFromRaleigh: 14 },
  angier: { population: 6241, medianYearBuilt: 1998, medianRooms: 5.4, ownerOccupiedPct: 70, singleFamilyPct: 74, densityPerSqMi: 1357, milesFromRaleigh: 19 },
  clayton: { population: 29320, medianYearBuilt: 2006, medianRooms: 5.8, ownerOccupiedPct: 63, singleFamilyPct: 74, densityPerSqMi: 1746, milesFromRaleigh: 14 },
  durham: { population: 291467, medianYearBuilt: 1995, medianRooms: 5.2, ownerOccupiedPct: 52, singleFamilyPct: 51, densityPerSqMi: 2453, milesFromRaleigh: 20 },
  "chapel-hill": {
    population: 61607,
    medianYearBuilt: 1988,
    medianRooms: 5.0,
    ownerOccupiedPct: 47,
    singleFamilyPct: 41,
    densityPerSqMi: 2840,
    milesFromRaleigh: 25,
    localNote:
      "Chapel Hill is built around UNC, and the university shapes the work here: a large share of homes are student and faculty rentals, so on top of regular homeowner maintenance we handle a steady stream of end-of-lease cleanouts, furniture and junk hauling, and quick turnarounds between tenants — plus upkeep on the older homes in the neighborhoods closest to campus.",
  },
  carrboro: { population: 21204, medianYearBuilt: 1988, medianRooms: 4.6, ownerOccupiedPct: 44, singleFamilyPct: 42, densityPerSqMi: 3271, milesFromRaleigh: 27 },
};
