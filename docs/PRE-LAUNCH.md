# docs/PRE-LAUNCH.md — must be resolved before this site is public

Nothing on this list is a bug. Each entry is a deliberate decision made during a local-only
build (D-18), and each one becomes wrong the moment the site is served to a real visitor.
**A person, not an agent, signs this list off.**

---

## 1. THE SITE WAS NEVER MEASURED AGAINST ITS REFERENCE

**Never measured against its reference — the reference became unreachable mid-build and no
local copy was kept.**

This is the A-15 finding and it is the most important line in this file. The reference
(`costarroofinginc.com`) acquired a bot-challenge interstitial between Prompt 1 and the
build wave — verified directly with a normal desktop UA, which returns
`<title>One moment, please...</title>` and roughly 7 KB of body. This site kept no complete
local copy of the reference pages, so **no reference-side capture can ever be produced
again** and no structural or pixel comparison against the reference exists or can be
reconstructed.

Consequences, stated plainly so nobody quotes a number that is not there:

- Every structural row in `docs/divergence.md` reads `BLOCKED/no-reference`. **A BLOCKED row
  is an absence, not a pass.** It has no value and no threshold was applied to it.
- No converter was written to back-fill the missing metric fields from the Prompt 1 capture.
  Invented numbers that look like measurements are worse than no measurement, because the
  next reader cannot tell the difference.
- What IS still reference-derived, because it was extracted while the reference was
  reachable and is committed: the token set, the type scale, the spacing scale, the
  container widths, the section contract and its classifications, all copy and both
  similarity gates, and the applied palette's lightness/chroma structure. The design system
  is genuinely derived from the reference. Only the *verification* of fidelity is lost.
- The gates that DID run and DID gate this build are the render-truth set, which needs no
  reference: `contrast.mjs`, `rendertruth.mjs`, token conformance on NOVEL sections,
  `pnpm build`, the email sweep, the locations sweep, NAP consistency and the internal link
  crawl.

Cheap preventative for future runs, recorded because it cost this one: save a complete local
copy of every reference page at Prompt 1, while it is still reachable.

---

## 2. EVERY BUSINESS FACT ON THE SITE IS FICTIONAL

`CLAUDE.md` CONSTANTS are invented on purpose so the build could be measured without
impersonating a real company. All of them are written in exactly one place —
`content/copy.ts` `site`, re-exported through `lib/business.ts` — so replacing them is one
edit, not a search-and-replace across the repo.

| fact | what ships | why it must be replaced |
|---|---|---|
| business name | Ridge Garage Door Repair | invented |
| tagline | No mystery, no upsell, just the part that broke. | invented |
| phone | (405) 555-0139 | inside the 555-01XX reserved range. It **cannot ring anyone**, by design (D-04). |
| address | 731 Copperline Way, Yukon, OK 73099 | **the street does not exist.** It will not geocode, which is why the map is embedded by coordinate and never by address string (D-07). |
| coordinates | 35.5067,-97.7625 | real Yukon, OK coordinates standing in for a fake address. The pin is therefore in the right town and at the wrong building. |
| hours | 7 days, 7:00 AM – 7:00 PM | invented (D-06). No 24/7 or after-hours claim is made anywhere and none may be added without a decision. |
| service area | Serving Yukon and the west Oklahoma City metro. | invented, and it is the single surviving trace of the reference's 26 city pages (D-02). |
| canonical URL | https://ridgegaragedoorrepair.site | placeholder identity used by `metadataBase` and JSON-LD. Never fetched. |

Until these are replaced, the JSON-LD `LocalBusiness` block asserts a fictional company at a
fictional address with an unreachable phone number.

---

## 3. PERFORMANCE WAS NEVER MEASURED

Lighthouse on all five routes was dropped from the acceptance sweep (A-4). **Performance
never measured** — no LCP, no CLS, no TBT figure exists for any route at any breakpoint. The
build makes performance-shaped decisions (a lazy keyless map iframe, no animation library,
no scroll listener, self-hosted fonts, no analytics) but not one of them has been confirmed
by a measurement.

## 4. KEYBOARD ACCESS IS SPEC-VERIFIED ONLY

The manual keyboard-only pass was also dropped (A-4). **Keyboard access is spec-verified
only, never hand-tested.** The drawer focus trap, the accordion, the form's
focus-first-invalid behaviour and the map bypass are all built to their written specs in
`docs/behavior/`, and the tap-target and focus-ring gates are programmatic — but no human
has tabbed through a route end to end.

---

## 5. CONTENT THAT SHIPS AS A DELIBERATE PLACEHOLDER

| what | where | ships as |
|---|---|---|
| every photographic slot | 18 slots across four routes | flat-fill placeholder SVGs at the reference's own rendered box. `assets/INVENTORY.md` lists each. Not one byte of the reference's imagery entered this repo. |
| the logo | header and footer | a wordmark set in the display font. FACT-09. |
| three trust badges | `/` `home.trust-strip` | visibly empty `TODO(fact):` chips at the reference's 100px box. FACT-01/02/03. |
| three testimonials | `/` `home.testimonials-head` | literal `[TESTIMONIAL PLACEHOLDER]` blocks. No customer name, no quote, no star rating, and **no `AggregateRating` or `Review` JSON-LD anywhere on the site** — fabricated review markup is a legal problem, not a content gap (D-13). |
| founding year and headcount | `/about` `about.story` | two visible `TODO(fact):` paragraphs. FACT-06/07. |

`docs/facts-needed.md` is the full list and the acceptance sweep reports its count. **None of
these may be filled by guessing.**

---

## 6. THE PRIVACY POLICY (REVIEW MARKER REMOVED 2026-09-03)

`/privacy` used to carry `<!-- UNREVIEWED TEMPLATE — requires legal review before launch -->`
in its rendered HTML, plus a matching visible line under the page heading. Both were removed
once the site went live with real business facts. It describes what this build actually
does — one callback form, no address collection of any kind, no analytics, no tracking
pixels, no cookies beyond framework defaults — and it deliberately claims compliance with
**no** statutory regime. It still must be re-reviewed if a backend, an analytics package or
a cookie is ever added, because several of its clauses are true only of a site that has
none.

---

## 7. THE CONTACT FORM SENDS NOTHING

`components/sections/ContactFormBlock.tsx` opens with `// STUB: no submission target`. It
has no backend, no server action, no API route and no form `action` (D-05, D-18). It
validates on the client, shows a callback-confirmation panel, and `console.warn`s a stub
notice. **A visitor who fills it in reaches nobody.** Wiring a real destination is a
pre-public blocker, and doing so re-opens section 6.

## 8. NO ANALYTICS, NO CONSENT BANNER, NO TRACKERS

None ship, by decision (D-15), and the privacy policy says so as a fact about the build
rather than as a promise. Adding any of them makes clauses 5 and 6 of that policy false the
same day.

---

## 9. SIGN-OFF CHECKLIST — every blocker, one line each

Written at the end of the chain (merged Prompt 10 + 11). **A person, not an agent, ticks
these.** Nothing below is a bug; each is a deliberate consequence of a local-only build.

### 9.1 The fictional constants, named individually

Each is invented and each becomes a misrepresentation the moment a real visitor sees it. All
of them are written in exactly one place — `content/copy.ts` `site`, re-exported through
`lib/business.ts` — so replacing them is one edit.

- [ ] **Business name — "Ridge Garage Door Repair".** Invented. It appears in the wordmark,
      every page title, the JSON-LD `name`, the footer and the contact copy.
- [ ] **Phone — `(405) 555-0139`.** Inside the 555-01XX reserved range: **it cannot ring
      anyone, by design (D-04).** It is the site's only conversion path — every `tel:` link,
      the header CTA, the mobile call bar, every CTA band, and the JSON-LD `telephone`.
- [ ] **Address — `731 Copperline Way, Yukon, OK 73099`.** **The street does not exist.** It
      will not geocode, which is why the map is embedded by coordinate and never by address
      string (D-07). It appears in both map blocks, the footer, and the JSON-LD
      `PostalAddress`.
- [ ] **Coordinates — `35.5067,-97.7625`.** Real Yukon, OK coordinates standing in for a fake
      address, so the pin is in the right town at the wrong building. Used by both map
      embeds, both "Get directions" links, and the JSON-LD `GeoCoordinates`.
- [ ] **Tagline — "No mystery, no upsell, just the part that broke."** Invented.
- [ ] **Hours — 7 days, 7:00 AM – 7:00 PM.** Invented (D-06). No 24/7 or after-hours claim is
      made anywhere and none may be added without a decision.
- [ ] **Service area — "Serving Yukon and the west Oklahoma City metro."** Invented, and the
      single surviving trace of the reference's 26 city pages (D-02).
- [ ] **Canonical URL — `https://ridgegaragedoorrepair.site`.** Placeholder identity used by
      `metadataBase`, every canonical tag, `robots.txt`, `sitemap.xml` and the JSON-LD `@id`.
      Never fetched during the build.

Until these are replaced, the JSON-LD `LocalBusiness` block asserts a fictional company at a
fictional address with an unreachable phone number.

### 9.2 Assets

- [ ] **Real photographs for all 18 photographic slots.** Every one currently ships a
      flat-fill placeholder SVG at the reference's own rendered box. Prompts are written for
      Nano Banana Pro in `docs/asset-prompts.md`; not one byte of the reference's imagery
      entered this repo (D-09).
- [ ] **A real logo** — wordmark plus icon lockup, plus the white variant for the footer's
      deep band. Currently a wordmark set in Mulish 800. Resolves **FACT-09**; the prompt is
      section 4 of `docs/asset-prompts.md`.
- [ ] **The five background slots re-gated individually at drop-in** —
      `about.page-hero.bg`, `services.page-hero.bg`, `contact.page-hero.bg`,
      `home.why-choose.bg`, `home.cta-band.bg`. Each must be dark enough to carry body text,
      and each must keep `contrast.mjs` at 0 FAIL and `rendertruth.mjs` at 0 findings on its
      own. Never mount all five and gate once (F-17, F-27).

### 9.3 Facts

- [ ] **All 15 `TODO(fact)` entries resolved or the slots removed.** `docs/facts-needed.md`
      is the list: FACT-01/02/03/13 (the three trust badges), FACT-04/08 (credentials),
      FACT-05/15 (testimonials), FACT-06/07/14 (founding year, team size, founding story),
      FACT-09 (logo), FACT-10 (response time), FACT-11 (warranty), FACT-12 (service radius
      in miles). **None may be filled by guessing** — that is the rule the whole build was
      run under and it does not lapse at launch.
- [ ] **Testimonials made real or removed.** Three `[TESTIMONIAL PLACEHOLDER]` blocks ship on
      `/`. Replacing them requires **permissioned, attributable customer quotes**. If real
      reviews exist, `AggregateRating` / `Review` JSON-LD may then be added — **and not one
      moment before.** Fabricated review markup is a legal problem, not a content gap (D-13).

### 9.4 Legal and functional

- [ ] **Privacy policy reviewed by a lawyer.** The internal `UNREVIEWED TEMPLATE` marker
      that used to render on `/privacy` (both in the HTML source and visibly under the page
      heading) has been removed, but that is a cleanup of an internal dev flag — it is not a
      substitute for the actual review. It claims compliance with no statutory regime, and
      several of its clauses are true only of a site with no backend, no analytics and no
      cookies — so it must be **re-reviewed** if any of those are added.
- [ ] **The contact form given a real submission target.** It opens with
      `// STUB: no submission target`: no backend, no server action, no API route, no form
      `action`. **A visitor who fills it in today reaches nobody.** Wiring a destination
      re-opens the privacy review above.
- [ ] **JSON-LD re-verified after the facts are replaced.** The `LocalBusiness` block is
      generated from `lib/business.ts`, so corrected facts propagate automatically — but the
      output must be re-read once against a validator, and the standing prohibitions
      re-checked: **no `email`, no `aggregateRating`, no `review`, no `priceRange`, no
      `areaServed` city array.**

### 9.5 The two gates that were dropped, in the words A-4 requires

- [ ] **"performance never measured"** — Lighthouse on all five routes was dropped. No LCP,
      no CLS, no TBT figure exists for any route at any breakpoint (section 3 above).
- [ ] **"keyboard access is spec-verified only, never hand-tested"** — the manual
      keyboard-only pass was dropped. The drawer focus trap, the accordion, the form's
      focus-first-invalid behaviour, the skip link and the map bypass are all built and
      verified **against their written specs in `docs/behavior/`**, and the tap-target and
      focus-ring gates are programmatic — but no human has tabbed through a route end to end
      (section 4 above).

Spec-verification is not a substitute for that pass, and it is also not worthless: it is
what caught the missing map bypass this turn (F-23), a gap that sat between two documents
where no programmatic gate could see it.

### 9.6 The one thing that can never be ticked

- [x] **"never measured against its reference — the reference became unreachable mid-build
      and no local copy was kept."** Section 1. This cannot be resolved before launch or
      after it; it is recorded so that no one ever reads `docs/divergence.md`'s zero rows as
      a clean result.
