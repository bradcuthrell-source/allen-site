// Generates the rest of the unique, per-city content: a per-service H2/H3
// breakdown, a short "why us" paragraph, and a city-flavored FAQ set — all
// derived from ../data/cityStats and the page's own nearby-cities list so nothing
// here is copy-pasted city to city. Pairs with cityHousingCopy in ./cityCopy.ts,
// which covers the intro "Home & Yard Upkeep" section.

import type { City } from "../data/cities";
import type { CityStats } from "../data/cityStats";
import { eraBand, eraPhrase, possessive } from "./cityCopy";

export type ServiceBlock = { slug: string; name: string; paragraph: string };

/** Per-service H3 copy. Each service is keyed to a different stat so the four
 * blocks don't all lean on the same fact. */
export function cityServiceBlocks(cityName: string, stats: CityStats): ServiceBlock[] {
  const { medianYearBuilt, singleFamilyPct, ownerOccupiedPct, medianRooms } = stats;
  const band = eraBand(medianYearBuilt);
  const era = eraPhrase(medianYearBuilt);

  const maintenanceByBand: Record<typeof band, string> = {
    older: `Homes in ${cityName} tend to be older builds (${era}), so original systems, trim, and fixtures are due — or overdue — for attention. From small repairs to bigger punch-list items, we keep these houses in good working order.`,
    established: `With most ${cityName} homes dating to ${era}, this is prime maintenance territory: roofs, gutters, decks, and exterior trim all reach the age where regular upkeep pays off. We handle the repair list so small issues don't become big ones.`,
    newer: `${possessive(cityName)} housing stock is relatively young (built ${era}), but even newer homes need gutter cleaning, pressure washing, caulking, and the steady list of small fixes that keep a house tight. We handle the maintenance a builder's warranty doesn't cover.`,
    newest: `As one of the area's newest-built communities (homes here mostly went up ${era}), ${cityName} still has plenty of punch-list work — trim, drainage, fixtures, and the small fixes that come with a house settling in.`,
  };

  const landscaping =
    singleFamilyPct >= 70
      ? `With ${singleFamilyPct}% of homes in ${cityName} being single-family houses, lawns, beds, and trees are a weekly or seasonal commitment for most homeowners here. We handle mowing, trimming, mulching, and cleanups on whatever schedule your yard needs.`
      : singleFamilyPct >= 50
        ? `About ${singleFamilyPct}% of ${cityName} properties are single-family homes with real yards to maintain — lawn care, seasonal cleanup, and trimming that most owners would rather hand off than do themselves.`
        : `${possessive(cityName)} mix of houses, townhomes, and apartments means landscaping needs vary — from full-yard care for single-family homes to smaller cleanups for townhomes and rentals. We handle both.`;

  const hauling =
    ownerOccupiedPct >= 70
      ? `${ownerOccupiedPct}% of ${cityName} homes are owner-occupied, and long-term homeowners are usually hauling out renovation debris, old furniture, or years of accumulated stuff rather than moving boxes. We load it, haul it, and dispose of it responsibly.`
      : ownerOccupiedPct <= 55
        ? `With only about ${ownerOccupiedPct}% of ${cityName} homes owner-occupied, move-in/move-out hauling is a regular job for us — old furniture, appliances, and leftover belongings cleared out fast between tenants.`
        : `Whether it's a renovation, a move, or just years of accumulation, ${cityName} residents call us to haul furniture, appliances, and debris out in a single trip.`;

  const junkRemoval =
    medianRooms >= 7
      ? `${possessive(cityName)} larger homes mean larger cleanouts — garages, attics, and whole-property junk removal after a move, a renovation, or settling an estate.`
      : medianRooms <= 5
        ? `Many ${cityName} homes and townhomes run smaller, so junk removal here is often quick single-item pickups or an apartment cleanout rather than a whole-property job — either way, we handle it.`
        : `From a single old couch to a full garage cleanout, we clear junk out of ${cityName} homes and businesses quickly and dispose of it responsibly.`;

  return [
    { slug: "general-maintenance", name: "General Maintenance", paragraph: maintenanceByBand[band] },
    { slug: "landscaping", name: "Landscaping", paragraph: landscaping },
    { slug: "hauling", name: "Hauling", paragraph: hauling },
    { slug: "junk-removal", name: "Junk Removal", paragraph: junkRemoval },
  ];
}

/** Short "why us" paragraph — distance, neighboring towns, and the one-crew pitch. */
export function cityWhyUsCopy(
  cityName: string,
  countyName: string,
  serviceAreaRadiusMiles: number,
  stats: CityStats,
  nearbyCities: City[],
): string {
  const [n1, n2] = nearbyCities;
  const nearbyPhrase = n1 && n2 ? `${n1.name} and ${n2.name}` : n1 ? n1.name : `the rest of ${countyName} County`;

  if (stats.isHubCity) {
    return `${cityName} is our home base — every job here is a short drive, and we're just as often out in ${nearbyPhrase}. We're locally owned and operated, not a national franchise, so when you call, you're talking to the people who actually show up and do the work. From the first estimate to hauling off the last load, one crew handles the whole job.`;
  }

  return stats.milesFromRaleigh % 2 === 0
    ? `Located about ${stats.milesFromRaleigh} miles from Raleigh, ${cityName} sits well within our ${serviceAreaRadiusMiles}-mile service area — right alongside ${nearbyPhrase}. We're locally owned and operated, not a national franchise, so when you call, you're talking to the people who actually show up and do the work. From the first estimate to hauling off the last load, one crew handles the whole job.`
    : `${cityName}, NC sits about ${stats.milesFromRaleigh} miles from Raleigh — well inside our ${serviceAreaRadiusMiles}-mile radius, along with ${nearbyPhrase} and the rest of ${countyName} County. We're a small, locally owned crew rather than a call center: the same team that gives your estimate is the one that shows up to do the work.`;
}

export type Faq = { question: string; answer: string };

/** City-flavored versions of the same 5 questions used on the home page. */
export function cityFaqs(
  cityName: string,
  countyName: string,
  serviceAreaRadiusMiles: number,
  stats: CityStats,
  nearbyCities: City[],
): Faq[] {
  const [n1, n2] = nearbyCities;
  const nearbyPhrase = n1 && n2 ? `${n1.name} and ${n2.name}` : n1 ? n1.name : `${countyName} County`;
  const farOut = stats.milesFromRaleigh >= 20;

  return [
    {
      question: `Do you serve ${cityName}, NC?`,
      answer: stats.isHubCity
        ? `Yes — ${cityName} is our home base. We cover the whole metro within our ${serviceAreaRadiusMiles}-mile radius, including nearby ${nearbyPhrase}.`
        : `Yes — ${cityName} is about ${stats.milesFromRaleigh} miles from Raleigh, well within our ${serviceAreaRadiusMiles}-mile service area. We also cover nearby ${nearbyPhrase}.`,
    },
    {
      question: `What services do you offer in ${cityName}?`,
      answer: `General maintenance, landscaping, hauling, and junk removal — one call covers all four for ${cityName} homes and businesses.`,
    },
    {
      question: `Do you offer free quotes in ${cityName}?`,
      answer: `Yes. Call us or fill out the form on this page and we'll follow up with pricing for your ${cityName} property.`,
    },
    {
      question: `How quickly can you respond in ${cityName}?`,
      answer: farOut
        ? `Even out in ${cityName}, we follow up on quote requests within one business day. For the fastest response, call us directly.`
        : `We follow up on ${cityName} quote requests within one business day. For the fastest response, call us directly.`,
    },
    {
      question: `Do I need to be home for an estimate in ${cityName}?`,
      answer:
        stats.medianRooms >= 7
          ? `Given how large homes tend to run in ${cityName}, an in-person walkthrough often gets you a more accurate price — though smaller jobs can still be estimated over the phone.`
          : `For many ${cityName} jobs we can put together an estimate over the phone. Larger projects may benefit from an in-person walkthrough.`,
    },
  ];
}
