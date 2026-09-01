# docs/sections.md — the classification contract

Reference section → our route, with a class and a reason. **This file is the source of
truth for everything downstream.** `harness/sections.json` is its machine twin; the two
must not drift. `refIndex` is the 0-based index into the reference page's outermost band
list (`harness/bands.mjs`), which is stable post-hydration.

Classes: **FIDELITY** pixel diff `< 2%` · **ADAPTED** structural deviation `< 5%` ·
**NOVEL** token violations `= 0` · **DELETED** not built.

> **Draft status.** This is the Prompt 1 draft. Prompt 3 reclassifies any section whose
> *information content* changes and names the reordering there. It does not get to
> reclassify to dodge a hard fix.

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
| 2 | `services.list` | 2 | ADAPTED | The eight services, in-page anchors, each linking `tel:` and `/contact`. No per-service routes (D-01), no prices (D-12). |
| 3 | `services.cta-band` | 3 | ADAPTED | Closing CTA. |
| 4 | `shell.footer` | 4 | ADAPTED | shared shell |
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
| `/services` | 5 | 1 | 0 | 6 |
| `/contact` | 5 | 0 | 0 | 5 |
| `/privacy` | 2 | 1 | 0 | 3 |
| **total** | **32** | **4** | **5** | **36** |

`shell.header` and `shell.footer` appear on all five routes; they are one lead-owned
implementation measured five times.
