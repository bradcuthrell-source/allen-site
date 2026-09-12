# UAT / Bug Tracker

Working checklist for bug-squashing and user acceptance testing. Check items off in
the same commit that fixes them. Add your own findings under "Client / owner review".

Priority: **P1** = broken or blocks launch · **P2** = SEO/UX, fix before real launch ·
**P3** = polish, can ship without.

Legend: `[ ]` open · `[x]` done · `[~]` partially done / open follow-up · _(quick)_ = Claude
can batch-fix fast.

---

## P1 — broken / blocks launch

- [x] **Placeholder contact info sitewide.** ~~`src/data/business.ts` still has
  `(919) 000-0000`, `tel:+19190000000`, `info@allensproservices.com`, and guessed hours.~~
  Real phone `(919) 622-8643`, email `allensproservices1@gmail.com`, and Mon–Fri 8–5 / Sat–Sun
  closed hours are in now, plus `openingHoursSpecification` in the JSON-LD.
- [x] **Quote form text is unreadable (white-on-white).** _(Allen, UAT CSV)_ ~~`LeadForm.astro`
  never sets its own text color, so its fields inherited white from the dark `#quote`
  section.~~ Added `text-black` on the form root; verified in-browser (typed text now renders
  black).
- [x] **Footer hours note.** _(Allen, UAT CSV)_ Confirmed with Allen: hours stay
  **8:00 AM–5:00 PM** (the CSV's "9-5" was shorthand, not a change). Added
  "Call anytime — we'll get back to you." under the hours in `Footer.astro`.
- [x] **Hero call CTA shows the phone number.** _(Allen, UAT CSV)_ ~~Home hero button read
  "📞 Call Now — {phone}".~~ Now just "📞 Call Now" (`index.astro`); city-page CTAs still show
  the number — Allen's note was scoped to the home hero only.
- [x] **Remove "Meet the Team" section.** _(Allen, UAT CSV)_ Removed from `index.astro`.
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
- [x] **Hero right column is empty on desktop.** ~~The home hero is a `lg:grid-cols-2` grid
  with only one column of content, leaving a large empty black area to the right on wide
  screens.~~ Hero redesigned around the new brand illustration + slogan (see session notes);
  right column no longer empty.
- [x] **Services section blends into the white hero.** _(Allen, UAT CSV)_ Added a `tinted`
  prop to `ServicesGrid.astro` (`bg-black/5` when set) and passed it on the home page; had to
  re-balance every alternating band down the page to keep the white/gray rhythm intact
  (About, Recent Work, Reviews, Cities, FAQ all flipped). Verified the full page in-browser —
  clean alternation, black quote band unchanged at the bottom.
- [x] **Thank-you page is indexable and in the sitemap.** `thank-you.astro` passes `noindex`
  (new `Layout` prop → `<meta name="robots" content="noindex, nofollow">`); sitemap
  integration now filters out `/thank-you`.
- [x] **Trailing-slash mismatch.** Set `trailingSlash: 'never'` + `build.format: 'file'` in
  `astro.config.mjs`; `Layout` normalizes the canonical (strips `.html`/`index`/trailing
  slash). Canonical, `og:url`, and sitemap all agree now (slash-free).
- [x] **City pages are thin and near-duplicate.** Census-driven "Home & Yard Upkeep in
  {city}" copy landed first (`src/data/cityStats.ts` + `src/lib/cityCopy.ts`). Then, per
  Allen's UAT CSV (combo of his two options): added a **"Services in {city}"** H2 with one H3
  + paragraph per service (`src/lib/cityServiceCopy.ts`, each service keyed to a different
  stat — era/single-family%/owner-occupied%/rooms — so the four blocks don't repeat the same
  fact), a **"Why {brand} for {city}"** paragraph (distance from Raleigh + nearby towns, pulled
  from a new `milesFromRaleigh` in `cityStats.ts` sourced from the Census gazetteer
  centroids), and a **5-question FAQ** adapting the homepage's questions with city-specific
  answers. ~350-450 words of new content per page. Special-cased Raleigh itself (`isHubCity`)
  so it doesn't say "4 miles from Raleigh, Raleigh…". `npx astro build` passes clean across
  all 18 city pages + rest of the site.

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
- [x] **JSON-LD** `telephone` is now E.164 (derived from `phoneHref`, now the real
  `+19196228643`); added `serviceAreaCenterLat/Lng` to `business.ts` so `geoMidpoint` has real
  coordinates.
- [ ] **Copyright year** is baked in at build time — updates only on redeploy. Fine for a
  static site; noted for the record. _(no change)_
- [ ] **Footer logo** — a reversed **white** logo variant is needed if we ever want the mark
  in the dark footer (current logo is dark red + black). _(needs an asset)_
- [x] **"Learn More" links misaligned in the services grid.** _(Allen, UAT CSV)_ Made each
  card `flex flex-col`, description `flex-1` — all four "Learn More" links now share the same
  bottom edge regardless of description length.
- [x] **Phone emoji (📞) on every call CTA → phone icon.** _(Allen, UAT CSV — supersedes the
  general "emoji icons" note below)_ Built `src/components/icons/PhoneIcon.astro` (inline SVG,
  no asset needed) and swapped it in everywhere: header, home hero, city-page CTAs,
  thank-you, 404. Verified in-browser.
- [ ] **Other emoji** (🚧 on `ComingSoon`, ✓ in the quote-section checklist) — lower priority
  than the phone icon above; inline SVG would render more consistently. _(deferred)_
- [ ] **Form: `email` is optional** (only name + phone required). Confirm that's intended.
  _(client question)_

---

## Client / owner review (Allen)

_Add wording, design, and content notes here — one line each, page/section + what to change._

Allen's first UAT pass (2026-09-11, submitted as a CSV) is merged into the P1/P2/P3 lists
above, tagged _(Allen, UAT CSV)_ — that keeps everything in one prioritized backlog instead of
splitting client notes from the rest. Add new rounds the same way, or drop items here first if
you'd rather keep them separate before triage.

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
- **2026-09-09/10** — Real contact info landed; home hero redesigned around the new brand
  illustration (closes the empty-column item); Recent Work gallery and a first testimonial
  added; city pages got Census-driven "Home & Yard Upkeep" copy (first pass at the
  thin-content item, not the full fix Allen's asking for below).
- **2026-09-11** — Converted Allen's first UAT round (`UAT and QA notes/allen-site UAT -
  Specific UAT.csv`) into this tracker, merged into P1/P2/P3 above and tagged
  _(Allen, UAT CSV)_. Confirmed the footer-hours question with Allen (keep 8–5, add a
  call-anytime note) and fixed all four P1 items from this round: quote-form contrast,
  footer hours note, hero CTA phone number, Meet-the-Team removal.
- **2026-09-11** — Finished the rest of the round: rebalanced every alternating band on the
  home page (services section now visibly separated from the hero), fixed "Learn More"
  alignment, replaced the 📞 emoji with an inline SVG `PhoneIcon` everywhere, and built the
  city-page content expansion (services H2/H3 breakdown, why-us paragraph, city FAQ — see the
  P2 entry above). Full `astro build` verified clean.
