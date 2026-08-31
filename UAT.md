# UAT / Bug Tracker

Working checklist for bug-squashing and user acceptance testing. Check items off in
the same commit that fixes them. Add your own findings under "Client / owner review".

Priority: **P1** = broken or blocks launch · **P2** = SEO/UX, fix before real launch ·
**P3** = polish, can ship without.

Legend: `[ ]` open · `[x]` done · _(quick)_ = Claude can batch-fix fast.

---

## P1 — broken / blocks launch

- [ ] **Placeholder contact info sitewide.** `src/data/business.ts` still has `(919) 000-0000`,
  `tel:+19190000000`, `info@allensproservices.com`, and guessed hours. These render in the
  header, footer, contact page, every city page CTA, the thank-you page, **and the
  LocalBusiness JSON-LD on every page**. Nothing ships until these are real.
- [x] **No mobile navigation.** ~~The header `<nav>` is `hidden md:flex`~~ Added a hamburger
  toggle (`Header.astro`) that reveals a stacked nav below 768px; `aria-expanded` /
  `aria-label` toggle, icon swaps open/close. Verified in-browser.
- [x] **Literal `&amp;` on the home page.** Fixed — `index.astro` now passes `label="Owner &
  Crew Photo"` as plain text. No `&amp;amp;` anywhere in the build.
- [x] **No custom 404 page.** Added `src/pages/404.astro` using the site Layout — branded,
  `noindex`, with links to the main pages and a call CTA.

## P2 — SEO / UX, fix before real launch

- [x] **`og:image` missing on every page.** Generated `public/og-image.png` (1200×630, logo
  on off-white with a brand-red rule). `Layout.astro` now emits `og:image` (+ width/height),
  `og:site_name`, and `twitter:card`/`title`/`description`/`image`. _Follow-up: a
  photo-based OG image would convert better than the logo card._
- [x] **City page `<title>` tags are ~90 characters.** Now
  _"Handyman & Landscaping in {City}, NC | Allen's Pro Services"_ (~60–66 chars) in
  `[city].astro`. All 18 pages.
- [x] **Inter font is referenced but never loaded.** `Layout.astro` now loads Inter from
  Google Fonts (preconnect + `display=swap`). Verified the face actually loads.
  _Follow-up option: self-host via `@fontsource-variable/inter` to drop the third-party
  request._
- [ ] **Hero right column is empty on desktop.** The home hero is a `lg:grid-cols-2` grid with
  only one column of content, leaving a large empty black area to the right on wide screens.
  Fill it (photo, callout card, form) or drop the two-column grid. _(needs a design/content
  decision — left for review)_
- [x] **Thank-you page is indexable and in the sitemap.** `thank-you.astro` passes `noindex`
  (new `Layout` prop → `<meta name="robots" content="noindex, nofollow">`); sitemap
  integration now filters out `/thank-you`.
- [x] **Trailing-slash mismatch.** Set `trailingSlash: 'never'` + `build.format: 'file'` in
  `astro.config.mjs`; `Layout` normalizes the canonical (strips `.html`/`index`/trailing
  slash). Canonical, `og:url`, and sitemap all agree now (slash-free).
- [ ] **City pages are thin and near-duplicate.** All 18 share the same paragraph with only
  the city/county name swapped — a real local-SEO risk the plan already flagged. Wire in
  the Census ACS data points (`stats` field on each city) and a unique sentence per page,
  or at least vary the intro copy. _(bigger task — left for its own pass)_

## P3 — polish

- [x] **`package.json` name** was `technological-telescope` → now `allens-pro-services`.
- [x] **Services grid orphan card.** `lg:grid-cols-3` → `lg:grid-cols-4` — all four in one
  row, no orphan. Verified in-browser.
- [x] **Footer "Services" links** now deep-link to `/services#<slug>`.
- [x] **Home `<title>`** trimmed to _"Allen's Pro Services | Maintenance, Landscaping &
  Hauling in Raleigh, NC"_ (~69 chars).
- [x] **Skip-to-content link** added in `Layout.astro` (`sr-only` until focused); `<main>` now
  has `id="main"`.
- [x] **Response-time copy.** FAQ + thank-you now both say "within one business day". (Owner
  should still confirm the real SLA — see client review.)
- [x] **JSON-LD** `telephone` is now E.164 (`+19190000000`, derived from `phoneHref`); added
  `serviceAreaCenterLat/Lng` to `business.ts` so `geoMidpoint` has real coordinates.
- [ ] **Copyright year** is baked in at build time — updates only on redeploy. Fine for a
  static site; noted for the record. _(no change)_
- [ ] **Footer logo** — a reversed **white** logo variant is needed if we ever want the mark
  in the dark footer (current logo is dark red + black). _(needs an asset)_
- [ ] **Emoji icons** (📞 🚧 ✓) used throughout. Fine, but inline SVG would render more
  consistently. _(deferred)_
- [ ] **Form: `email` is optional** (only name + phone required). Confirm that's intended.
  _(client question)_

---

## Client / owner review (Allen)

_Add wording, design, and content notes here — one line each, page/section + what to change._

- [ ]

---

## QA pass log

- **2026-08-30** — Claude automated pass: code review of all pages/components + rendered-DOM
  checks (SEO meta, headings, landmarks, links, alt text, form structure, 404, fonts).
  Responsive checks were code-only (couldn't drive a true mobile viewport in this session);
  the mobile-nav finding is from the CSS and is certain. Findings above.
- **2026-08-30** — Batch-fixed the mechanical items: P1 #2–4, P2 #1–3 + #5–6, all of P3
  except the four that need an asset / owner decision / are intentionally no-change.
  Build passes (24 pages), mobile menu + Inter load + canonical/sitemap agreement verified
  in-browser. Remaining open: real contact info (blocker), empty hero column, thin city
  pages, footer white-logo asset, emoji→SVG, form-email-optional question.
