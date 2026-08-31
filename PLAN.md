> **Status:** Astro + Tailwind project scaffolded, home/services/contact/thank-you pages built, 18 city pages generated from `src/data/cities.ts`, logo + palette wired in, Netlify lead form in place. Verified locally with `npm run dev`. Not yet pushed to GitHub or deployed. See "Still needed" below for what's blocking a real launch.

# Allen's Pro Services — Site Plan

Marketing site for a Raleigh, NC-area general maintenance, landscaping, hauling, and junk removal business.

**Legal name:** Allen Enterprises, LLC
**Brand/DBA name (assumed, matches domain):** Allen's Pro Services — confirm this is the intended public-facing name
**Domain:** allensproservices.com (purchased)
**Logo:** in `assets/logo/`. In use on the site:
- `allen-logo-horizontal-bg-removed.png` — transparent horizontal wordmark ("ALLEN" + tagline), the site header logo (copied to `src/assets/logo/logo-horizontal.png`, imported by `Header.astro`).
- `allen-logo-favicon.png` — the "A" mark; source for the favicons in `public/` (`favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`, `favicon.ico` — all generated from it, background keyed out to transparent and squared).

Reference only / superseded: `allen-logo-final-removebg-preview.svg` + `.png` (old vertical lockup, still at `src/assets/logo/logo.svg|png` but unused), `allen-logo-final.png` (opaque original), `allen-logo-horizontal.png` (opaque-background horizontal).
**Starting color palette (from the logo — refine once more of the site is built):** primary red `#7a1116`, near-black `#1c1b1c`, white/light-gray backgrounds.
**Service area:** 50-mile radius around Raleigh's center point
**Phone / email / physical address:** not yet available — placeholders until provided; blocks final launch but not scaffolding

## Decisions

- **City pages:** one page per city (not per city+service combo) — lower duplicate-content risk, easier unique copy, can split into service-specific pages later if a city needs it.
- **Hosting/forms:** Netlify + Netlify Forms. No backend code — submissions land in the Netlify dashboard, then a free Zapier/Make automation ("New Netlify Forms Submission" → "Create Google Sheets Row") pushes each one into a Google Sheet.

## Site structure

- **Home** — hero with phone number + "Call Now" CTA, services grid (maintenance, landscaping, hauling, junk removal), short trust section, lead form, footer with NAP (name/address/phone) info and service-area links.
- **Services** — one combined page covering all four to start; split into individual service pages later only if search demand justifies it.
- **City pages** (`/service-area/[city]`) — ~20–30 to start (Wake County towns), expandable toward a 50–100 cap by pulling in bordering-county towns later.
- **Contact/lead form page** — same form as home, plus a dedicated URL for ads/Google Business Profile links.
- **Thank-you page** — Netlify Forms redirects here on submit; good spot for a "we'll call you within X hours" message.

## Tech stack

**Astro**, static output, near-zero JS, styled with **Tailwind CSS**. This is a content-and-speed site (many near-identical local pages, one small form), not an app — Astro's build-time page generation is a natural fit for looping over a city data file to stamp out pages, and minimal JS is a real ranking/UX advantage for local search (Core Web Vitals matter for local pack visibility).

Data-driven pages: one `src/data/cities.json` (or `.ts`) with `{ slug, name, county, population, medianHomeValue, ... }`, and a single dynamic route (`src/pages/service-area/[city].astro`) using `getStaticPaths()` to generate all of them from that file. Add/remove a city by editing one JSON entry — no new files.

## Lead form → Google Sheet

Plain HTML form with `data-netlify="true"` and a hidden honeypot field for spam — no backend code. Then a free Zapier (or Make.com, more generous free tier) automation wires submissions into a Google Sheet. ~10 minutes to set up once the form exists; can layer on email/SMS notification the same way later.

## City pages — data & SEO structure

- **City list:** all of Wake County, plus a short list of high-population surrounding areas — Durham, Chapel Hill, Carrboro, and a couple more (e.g. Cary/Morrisville overlap towns, Clayton) — rather than exhaustively filling the 50-mile radius. All cities get the **same templated treatment** to start; no special-cased content for the bigger metro pages yet. Revisit as an optimization later (e.g. more content depth for Durham/Chapel Hill) once there's data on what's actually driving traffic/leads.
- **Data points:** pull from the **Census Bureau's free ACS API** (population, median household income, median home value, owner-occupied housing %) rather than scraping — no rate-limit/ToS risk, one free API key, stable schema. Fetch once at build time / cache in the data file rather than live per-request.
- **Per-page content:** H1 "{Services} in {City}, NC," a couple sentences using the city's data point ("Serving {City}'s {X} households..."), the same services grid as home, phone CTA + form, and a "nearby areas we serve" internal-link block to neighboring city pages — a key local-SEO lever.
- `LocalBusiness` JSON-LD schema (name, phone, service area, address if applicable) site-wide, plus an auto-generated `sitemap.xml` (Astro plugin) submitted to Google Search Console.
- Outside the codebase: claim a **Google Business Profile** listing — local pack rankings lean on that more than the website itself.

## Getting it live

1. ~~Buy a domain~~ — done: allensproservices.com
2. Push the repo to GitHub.
3. Connect the repo to Netlify (free tier) — auto-deploys on every push to `main`.
4. Point allensproservices.com's DNS at Netlify; Netlify issues free HTTPS automatically.
5. Wire up Netlify Forms → Zapier/Make → Google Sheets.
6. Verify the site in Google Search Console, submit the sitemap.
7. Set up/claim the Google Business Profile.

## Still needed

- Confirm "Allen's Pro Services" as the public-facing brand name (vs. legal name Allen Enterprises, LLC).
- Exact wording for the four services.
- Phone number, email, and whether there's a physical address to list (vs. service-area-only) — placeholders will be used until these arrive.
- Business hours.
- Color palette — logo is expected in `assets/logo/`; once it's there, colors can be pulled from it, otherwise a simple palette will be proposed.
