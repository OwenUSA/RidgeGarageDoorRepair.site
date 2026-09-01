# docs/sections.md — the classification contract

Reference section → our route, with a class and a reason. **This file is the source of
truth for everything downstream.** `harness/sections.json` is its machine twin; the two
must not drift. `refIndex` is the 0-based index into the reference page's outermost band
list (`harness/bands.mjs`), which is stable post-hydration.

Classes: **FIDELITY** pixel diff `< 2%` · **ADAPTED** structural deviation `< 5%` ·
**NOVEL** token violations `= 0` · **DELETED** not built.

> **Status: reconciled at Prompt 3 (merged 2+3+4 turn).** The copy exists, the lexical and
> length gates pass, and every section below has been checked against the content that will
> fill it. The reordering, the two drops, the two additions and the symptom regrouping are
> named in `docs/content-divergence.md`; this file carries the classes.
>
> **No section changed class in that pass, because there were no FIDELITY sections to
> migrate** — see the headline finding immediately below, which was already true at
> Prompt 1. What *did* change is recorded in "Prompt 3 amendments" at the foot of this file.

---

## The headline finding: there are zero FIDELITY sections

Not one section on this site qualifies, and this is a conclusion from the contract, not a
shortcut. FIDELITY requires "content is structurally equivalent". Every band we keep
carries at least one of: our business name, our phone, our address, our hours, our service
list, our copy, or a placeholder where their photo was. `D-09` and `D-10` make that
unavoidable — the copy is written fresh by construction.

`CLAUDE.md` names misclassifying an ADAPTED section as FIDELITY the single most expensive
failure mode in the run. Declaring FIDELITY sections here so the pixel metric has customers
would manufacture exactly that failure, thirteen sections wide, and every one of them would
burn its full iteration budget before being reclassified back.

So: **pixel diff gates nothing on this build.** It is still computed for every section that
has a shot on both sides (`harness/diff.mjs --pixel`) because STEP C ranks the table by
divergent pixel area, and a pixel number that moves the wrong way is still a useful smoke
signal. It just is not a threshold.

---

## `/` — home (reference `/`, 18 bands)

| # | our section | ref band | ref heading | class | why |
|---|---|---|---|---|---|
| 0 | `shell.header` | 0 | — | ADAPTED | Our logo, five nav items instead of 19, our phone CTA. Geometry and the 104/85px bar are the target. |
| 1 | `home.hero` | 1 | "Los Angeles Roofing Experts…" | ADAPTED | Our proposition (transparency), our copy at ±10% length, placeholder for their hero art. |
| 2 | `home.trust-strip` | 2 | — (3 cards) | ADAPTED | Their badge row. Per D-14 every badge becomes a `TODO(fact):` chip at the same dimensions. |
| 3 | `home.about-teaser` | 3 | "About Us" | ADAPTED | Two-column text + image. Placeholder image, our copy. |
| 4 | `home.testimonials-head` | 4 | "Customer Reviews & Testimonials" | ADAPTED | Heading band above the review cards. |
| 5 | `home.services-grid` | 5 | "Our Roofing Services…" | ADAPTED | Their 12-card services block. Ours carries the eight garage-door services, **regrouped by symptom** per Prompt 3 item 4. |
| 6 | `home.expertise-band` | 6 | "Our Expertise: Your Roof, Our Priority" | ADAPTED | Full-bleed statement band. |
| 7 | `home.commitment` | 7 | "Our Commitment to Excellence!" | ADAPTED | 3-card block with an image. |
| 8 | `home.performance-band` | 8 | "Superior Roofing Performance…" | ADAPTED | Statement band with an image. |
| 9 | `home.components-grid` | 9 | "Roofing Materials We Install…" | ADAPTED | Their materials grid becomes our door-components grid (springs, openers, cables, panels, tracks). Same 5-card geometry. |
| 10 | — | 10 | "Blog & Roofing Tips" | **DELETED** | D-01: no blog. One of Prompt 3's two required drops. |
| 11 | `home.why-choose` | 11 | "Why LA Homeowners Choose…" | ADAPTED | 4-card reasons block. No invented credentials — D-14. |
| 12 | — | 12 | "Our Recent Roofing Projects…" | **DELETED** | Heading for band 13; goes with it. |
| 13 | — | 13 | 12 project cards, city-named | **DELETED** | D-09 (their photos) **and** D-02 (every card is a city). Prompt 3's second required drop. |
| 14 | — | 14 | "Frequently Asked Questions…" | **MOVED** | FAQ lives on `/services` only, in-page, per the pre-answered constants. Not built on `/`. |
| 15 | `home.cta-band` | 15 | "Weatherproof Roofing, Worry-Free Living!" | ADAPTED | Thin CTA strip. Ours: call + request a callback. Never "instant quote". |
| 16 | `home.map` | 16 | "Roofing Services Across LA" + "Our Location" | ADAPTED | **The city-grid half is deleted per D-02.** The "Our Location" half survives as our required home map section, zoom ~13, coords-only per D-07/D-08. |
| 17 | `shell.footer` | 17 | — | ADAPTED | NAP, hours, `SERVICE_AREA` sentence, route links. **No city column, no email column.** |
| — | `home.process` | — | — | **NOVEL** | "What happens when you call" — the transparency proposition made concrete. One of Prompt 3's two required additions. |
| — | `home.transparency` | — | — | **NOVEL** | "You see the broken part" — diagnosis-before-quote band. Second required addition. |

Six reference bands deleted or moved, two novel sections added.

## `/about` (reference `/about-us/`, 6 bands)

| # | our section | ref band | class | why |
|---|---|---|---|---|
| 0 | `shell.header` | 0 | ADAPTED | shared shell |
| 1 | `about.page-hero` | 1 | ADAPTED | Page-title band. |
| 2 | `about.story` | 2 | ADAPTED | Two-column story + image. **No founding year, no headcount, no credentials** — every one is a `TODO(fact):` at the right length (D-14, D-17). |
| 3 | `about.values` | 3 | ADAPTED | 4-card values block. |
| 4 | `about.cta-band` | 4 | ADAPTED | Closing CTA. |
| 5 | `shell.footer` | 5 | ADAPTED | shared shell |

## `/services` (reference `/services/`, 5 bands)

| # | our section | ref band | class | why |
|---|---|---|---|---|
| 0 | `shell.header` | 0 | ADAPTED | shared shell |
| 1 | `services.page-hero` | 1 | ADAPTED | Page-title band. |
| 2 | `services.list` | 2 | ADAPTED | **Heading and intro paragraph only** — that is all the reference band is (one h2 of 53 chars plus one 164-char paragraph; their services live on their home page). Paired slot, measured at ±10%, currently −6.4%. |
| 3 | `services.cta-band` | 3 | ADAPTED | Closing CTA. |
| 4 | `shell.footer` | 4 | ADAPTED | shared shell |
| — | `services.symptoms` | — | **NOVEL** | The eight services in the four symptom groups, in-page anchors, each linking `tel:` and `/contact`. No per-service routes (D-01), no prices (D-12). **Split out of `services.list` at Prompt 3** — see the amendments below. No reference counterpart at any position, so token conformance, not pixels. |
| — | `services.faq` | — | **NOVEL** | The FAQ moved off the home page. Generic garage-door technical content only — nothing about response time, pricing, warranty or credentials. No reference counterpart at this position, so token conformance, not pixels. |

## `/contact` (reference `/contact-us/`, 5 bands)

| # | our section | ref band | class | why |
|---|---|---|---|---|
| 0 | `shell.header` | 0 | ADAPTED | shared shell |
| 1 | `contact.page-hero` | 1 | ADAPTED | Page-title band. |
| 2 | `contact.form-block` | 2 | ADAPTED | Their 3-field form (name / **email required** / message) becomes ours per D-05: name, phone, service select, callback window, message. **No email field, no `mailto:`.** Measured on input geometry, not on field identity. |
| 3 | `contact.map` | 3 | ADAPTED | Their map iframe. Ours coords-only at zoom ~15 with a directions link. |
| 4 | `shell.footer` | 4 | ADAPTED | shared shell |

## `/privacy` (reference `/privacy-policy/`, 3 bands)

| # | our section | ref band | class | why |
|---|---|---|---|---|
| 0 | `shell.header` | 0 | ADAPTED | shared shell |
| 1 | `privacy.body` | 1 | **NOVEL** | D-16: the policy describes what *our* site does — a phone-callback form, no email, no analytics, no cookies beyond framework defaults. Nothing about their policy survives, so there is nothing to pixel-diff. Long-form type must resolve to the extracted scale, not browser defaults. |
| 2 | `shell.footer` | 2 | ADAPTED | shared shell |

---

## Deleted, and everywhere it has to be scrubbed (D-02)

The reference carries **26 city/neighborhood pages** plus a service-area block. Deleting
the section is not enough. All of the following must come out and stay out:

- home band 16's city-link grid, home band 13's city-named project cards
- the nav's 16-item services mega-menu (ours is five flat routes)
- any footer city column
- `/locations/*` and every `roofing-<neighborhood>-los-angeles` URL
- internal anchors to any of the above
- any `areaServed` city array in JSON-LD

**The single surviving trace is the `SERVICE_AREA` sentence in the footer.** Gate 3 of the
acceptance sweep re-checks this line by line.

Also deleted and not replaced: the blog (`/what-to-do-after…`, `/winter-roofing-tips…`,
`/best-roofing-materials…`), and the reference's terms-and-conditions route.

---

## Section count summary

| route | ADAPTED | NOVEL | DELETED/MOVED | built |
|---|---:|---:|---:|---:|
| `/` | 14 | 2 | 5 | 16 |
| `/about` | 6 | 0 | 0 | 6 |
| `/services` | 5 | 2 | 0 | 7 |
| `/contact` | 5 | 0 | 0 | 5 |
| `/privacy` | 2 | 1 | 0 | 3 |
| **total** | **32** | **5** | **5** | **37** |

`shell.header` and `shell.footer` appear on all five routes; they are one lead-owned
implementation measured five times.

---

## Prompt 3 amendments — what moved, and what did not

Full reasoning in `docs/content-divergence.md`. Recorded here because this file is the
source of truth downstream.

**Classification changes: none.** There were no FIDELITY sections at Prompt 1 and there are
none now. The FIDELITY → ADAPTED migration this prompt exists to force had already happened.

**Structure changes, three:**

1. **`services.list` narrowed to heading + intro.** The reference `/services` band 2 is 218
   characters total. Loading eight services and four symptom headings into it would have
   missed the ±10% length gate by roughly 600%, and the only ways out would have been a
   fourth length exemption or a class change — both of which are the failure mode
   `CLAUDE.md` names by name. The band keeps its honest paired measurement instead.
2. **`services.symptoms` added as NOVEL.** The eight services live here. It is measured on
   token conformance at zero violations, once, at 1440 (F-08 / A-9).
3. **Two structures confirmed against the reference's own heading and paragraph counts,
   with no class change:** `home.commitment` is h2 + three h4 cards + a closing paragraph;
   `home.why-choose` is one h2 + an intro paragraph + four reason paragraphs (**not** four
   headed cards — the Prompt 1 draft called it a "4-card reasons block").

**Render order is NOT reference order.** Five home sections move by more than one position
(`home.services-grid`, `home.about-teaser`, `home.components-grid`, `home.trust-strip`,
`home.testimonials-head`), and two NOVEL bands are interleaved at positions 2 and 4. The
`refSection` column above is the pairing identity and is unaffected by render order.

This is safe to measure because **A-12 makes `position` ADVISORY** — it is computed and
reported per row but never contributes to the deviation percentage. Reordering cannot
inflate a structural residual.

**Copy pairing.** `content/copy.ts` carries a `refSection` of the form `sNN-slug` on every
section, where `NN` is the reference band index in the tables above. That string is what
`similarity.mjs` pairs on. **If a row in this file changes its `ref band`, the matching
`refSection` in `content/copy.ts` must change with it** — the two are a machine twin pair
and are the one place this file can silently drift.

---

## MACHINE-READABLE CONTRACT - read by the shared harness

**EDIT THIS TABLE AND THE HUMAN TABLES ABOVE TOGETHER.** They are a machine twin
pair and this one is the only half `diff.mjs` can read. The human tables above are
kept because they are more useful to a person; the parser cannot read them, because
it expects one fixed column order and every site in this programme wrote its own.

Column order is FIXED and is:

    | /route | ref-section-id | our-section-id | CLASS | reason |

Rules the parser enforces, and the reasons they exist:

- The **ref column carries the reference SECTION ID**, never an ordinal. Ordinals
  shift between breakpoints when a band splits, so an ordinal pairs our services
  block against their CTA band at mobile. The ids here are the `refSection` values
  already carried by `content/copy.ts` and they must stay identical in both files.
- The ref column may be **EMPTY**, and is, for the four sections this build ADDS.
  A section with no reference band has no counterpart and reports UNPAIRED forever.
  That is a correct result, not a gap to fill, and it must not be invented away.
- `s14-faq` is DELETED **on `/`** and reappears nowhere as a paired row: the FAQ was
  relocated to `/services`, and a band moved to another route has no same-route
  counterpart. `services-faq` is therefore NOVEL with an empty ref column, not a
  cross-route pairing.
- **Our section components declare `data-section="<our-section-id>"`, dash-form,
  exactly as spelled here.** Without it identity pairing never fires and every band
  falls through to the page-progress join, which mispairs precisely where this build
  deliberately reorders or drops a reference band - which Prompt 3 required it to do.
  Dots are not legal in either id column; `home.hero` in the human tables is
  `home-hero` here and in the markup.

| /route | ref-section-id | our-section-id | CLASS | reason |
|---|---|---|---|---|
| / | s00-header | shell-header | ADAPTED | shared shell; five flat routes, our phone CTA |
| / | s01-hero | home-hero | ADAPTED | our proposition and copy, placeholder for their hero art |
| / | s02-trust | home-trust-strip | ADAPTED | D-14 TODO(fact) chips at the reference badge dimensions |
| / | s03-about | home-about-teaser | ADAPTED | two-column text + placeholder image |
| / | s04-testimonials | home-testimonials-head | ADAPTED | heading band above D-13 placeholder cards |
| / | s05-services | home-services-grid | ADAPTED | eight garage-door services regrouped by symptom |
| / | s06-expertise | home-expertise-band | ADAPTED | full-bleed statement band |
| / | s07-commitment | home-commitment | ADAPTED | h2 + three h4 cards + closing paragraph |
| / | s08-performance | home-performance-band | ADAPTED | statement band with an image |
| / | s09-components | home-components-grid | ADAPTED | their materials grid becomes our door-components grid |
| / | s10-blog | ref-band10-blog | DELETED | D-01 no blog; not built, no counterpart of ours exists |
| / | s11-why-choose | home-why-choose | ADAPTED | h2 + intro + four reason paragraphs, no invented credentials |
| / | s12-projects-head | ref-band12-projects-head | DELETED | heading for band 13, goes with it |
| / | s13-projects | ref-band13-projects | DELETED | D-09 their photos and D-02 every card is a city page |
| / | s14-faq | ref-band14-faq | DELETED | MOVED to /services in-page; no same-route counterpart, UNPAIRED is correct |
| / | s15-cta | home-cta-band | ADAPTED | thin CTA strip: call + request a callback |
| / | s16-map | home-map | ADAPTED | city-grid half deleted per D-02; Our Location half survives, zoom ~13 |
| / | s17-footer | shell-footer | ADAPTED | NAP, hours, SERVICE_AREA; no city column, no email column |
| / |  | home-process | NOVEL | what happens when you call; no reference band exists |
| / |  | home-transparency | NOVEL | you see the broken part; no reference band exists |
| /about | s00-header | shell-header | ADAPTED | shared shell |
| /about | s01-about-hero | about-page-hero | ADAPTED | page-title band |
| /about | s02-story | about-story | ADAPTED | no founding year, headcount or credentials (D-14, D-17) |
| /about | s03-values | about-values | ADAPTED | 4-card values block |
| /about | s04-about-cta | about-cta-band | ADAPTED | closing CTA |
| /about | s05-footer | shell-footer | ADAPTED | shared shell |
| /services | s00-header | shell-header | ADAPTED | shared shell |
| /services | s01-services-hero | services-page-hero | ADAPTED | page-title band |
| /services | s02-services-list | services-list | ADAPTED | heading + intro only; that is all the reference band is |
| /services | s03-services-cta | services-cta-band | ADAPTED | closing CTA |
| /services | s04-footer | shell-footer | ADAPTED | shared shell |
| /services |  | services-symptoms | NOVEL | the eight services in four symptom groups; split out at Prompt 3 |
| /services |  | services-faq | NOVEL | FAQ moved off the home page; no counterpart at this position |
| /contact | s00-header | shell-header | ADAPTED | shared shell |
| /contact | s01-contact-hero | contact-page-hero | ADAPTED | page-title band |
| /contact | s02-form | contact-form-block | ADAPTED | D-05 fields; no email field, measured on input geometry |
| /contact | s03-contact-map | contact-map | ADAPTED | coords-only zoom ~15 with a directions link; LENGTH EXEMPT |
| /contact | s04-footer | shell-footer | ADAPTED | shared shell |
| /privacy | s00-header | shell-header | ADAPTED | shared shell |
| /privacy | s01-privacy | privacy-body | NOVEL | D-16; describes what OUR site does, nothing of theirs survives |
| /privacy | s02-footer | shell-footer | ADAPTED | shared shell |

41 rows: 32 ADAPTED, 5 NOVEL, 4 DELETED. `shell-header` and `shell-footer` are one
lead-owned implementation measured five times.
