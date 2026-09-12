// Generates unique, data-driven prose for each /service-area/[city] page from
// the Census figures in ../data/cityStats. The goal is that no two city pages
// read the same: phrasing branches on the housing era, home size, single-family
// share, ownership rate, and density, so Raleigh and Rolesville describe
// genuinely different places.

import type { CityStats } from "../data/cityStats";

/** "Apex's" / "Holly Springs'" — correct possessive for a name that may already end in "s". */
export function possessive(name: string): string {
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

/** "the late 1990s", "the early 2000s", "around 2013", etc. */
export function eraPhrase(year: number): string {
  if (year <= 1985) return "the early 1980s and before";
  if (year <= 1990) return "the 1980s";
  const decadeStart = Math.floor(year / 10) * 10;
  const pos = year - decadeStart; // 0-9
  const decadeLabel =
    decadeStart === 2000 ? "2000s" : decadeStart === 2010 ? "2010s" : `${decadeStart}s`;
  if (year >= 2013) return `around ${year}`;
  if (pos <= 3) return `the early ${decadeLabel}`;
  if (pos <= 6) return `the mid-${decadeLabel}`;
  return `the late ${decadeLabel}`;
}

export type EraBand = "older" | "established" | "newer" | "newest";
type Band = EraBand;

export function eraBand(year: number): Band {
  if (year <= 1992) return "older";
  if (year <= 2004) return "established";
  if (year <= 2012) return "newer";
  return "newest";
}

/**
 * Two short paragraphs of city-specific copy, plus a source line. Returns an
 * empty array when we have no stats for the city (caller omits the section).
 */
export function cityHousingCopy(
  cityName: string,
  countyName: string,
  stats: CityStats | undefined,
): { paragraphs: string[]; source: string } | null {
  if (!stats) return null;

  const { medianYearBuilt, medianRooms, ownerOccupiedPct, singleFamilyPct, densityPerSqMi, localNote } =
    stats;
  const band = eraBand(medianYearBuilt);
  const era = eraPhrase(medianYearBuilt);
  // Deterministic per-city coin flip, so cities in the same bucket don't all
  // get word-for-word the same sentence frame.
  const alt = medianYearBuilt % 2 === 0;

  // --- Paragraph 1: housing stock + maintenance angle ---
  const openerVariants: Record<Band, [string, string]> = {
    older: [
      `Much of ${possessive(cityName)} housing stock goes back to ${era}`,
      `A good share of ${cityName} homes were built in ${era} or earlier`,
    ],
    established: [
      `Most ${cityName} homes were built in ${era}`,
      `The bulk of ${possessive(cityName)} homes went up in ${era}`,
    ],
    newer: [
      `Most homes in ${cityName} are newer builds from ${era}`,
      `${cityName} did most of its growing in ${era}, so the housing stock is fairly new`,
    ],
    newest: [
      `${cityName} is one of the Triangle's fastest-growing communities, with most homes built ${era}`,
      `Building in ${cityName} has boomed lately — the typical home dates to ${era}`,
    ],
  };
  const openers: Record<Band, string> = {
    older: openerVariants.older[alt ? 1 : 0],
    established: openerVariants.established[alt ? 1 : 0],
    newer: openerVariants.newer[alt ? 1 : 0],
    newest: openerVariants.newest[alt ? 1 : 0],
  };
  const maintenancePoint: Record<Band, string> = {
    older: `, so decks, siding, trim, and original fixtures are well past the point where steady upkeep and repairs pay off`,
    established: `, which puts a lot of them right at the age where roofs, decks, fences, and exterior trim start needing real attention`,
    newer: `, though even a house this age needs gutter cleaning, pressure washing, deck sealing, and a running list of small repairs to stay tight`,
    newest: `, where new construction still means punch-list fixes, drainage tweaks, sod and shrub establishment, and finishing what the builder left behind`,
  };

  let sizeNote = "";
  if (medianRooms >= 7) {
    sizeNote = ` Homes here run large — around ${Math.round(medianRooms)} rooms on average — so there's a lot of house and property to stay on top of.`;
  } else if (medianRooms <= 5) {
    sizeNote = ` Many are compact houses and townhomes where a small repair left alone quickly turns into a bigger one.`;
  }

  const paragraph1 = `${openers[band]}${maintenancePoint[band]}.${sizeNote}`;

  // --- Paragraph 2: yard / landscaping / hauling angle ---
  const roomy = densityPerSqMi < 1800;
  const tight = densityPerSqMi >= 2800;
  // Lot-character phrase, softened by how low the density actually is.
  const lotPhrase =
    densityPerSqMi < 1450
      ? "many on big lots that back up to woods"
      : densityPerSqMi < 1800
        ? "a lot of them on roomy suburban lots"
        : "most with a real yard front and back";

  let yardSentence: string;
  if (singleFamilyPct >= 65 && roomy) {
    yardSentence = `With ${singleFamilyPct}% of ${cityName} homes being single-family houses — ${lotPhrase} — lawn care, leaf cleanup, storm limbs, and brush pile up fast.`;
  } else if (singleFamilyPct >= 55 && tight) {
    yardSentence = `${singleFamilyPct}% of homes are single-family, but lots tend to be compact and close to town, so hedge trimming, yard cleanups, and hauling clippings out through a tight side yard are the everyday jobs.`;
  } else if (singleFamilyPct < 50) {
    yardSentence = `${cityName} runs to a real mix of houses, townhomes, and apartments (about ${singleFamilyPct}% single-family), so we do everything from full-yard maintenance to fast cleanouts and single-item hauling.`;
  } else if (medianRooms >= 6) {
    yardSentence = `About ${singleFamilyPct}% of ${cityName} homes are single-family, and with houses this size the yards are big enough that mowing, trimming, mulching, and seasonal cleanups add up.`;
  } else {
    yardSentence = `Roughly ${singleFamilyPct}% of ${cityName} homes are single-family, which keeps us busy with mowing, trimming, mulching, seasonal cleanups, and hauling the debris away.`;
  }

  let ownerSentence = "";
  if (ownerOccupiedPct >= 75) {
    ownerSentence = ` With ${ownerOccupiedPct}% of homes owner-occupied, most of our ${cityName} work is recurring maintenance for long-term homeowners.`;
  } else if (ownerOccupiedPct <= 52) {
    ownerSentence = ` Only about ${ownerOccupiedPct}% of homes are owner-occupied, so there's steady demand for make-ready cleanouts, junk removal, and property-manager work too.`;
  }

  const paragraph2 = `${yardSentence}${ownerSentence}`;

  const closing =
    `One call covers the maintenance, the landscaping, and hauling it all off — ` +
    `anywhere in ${cityName} or the rest of ${countyName} County.`;

  return {
    paragraphs: [paragraph1, paragraph2, ...(localNote ? [localNote] : []), closing],
    source: "Housing figures: U.S. Census Bureau, American Community Survey (2020–2024).",
  };
}
