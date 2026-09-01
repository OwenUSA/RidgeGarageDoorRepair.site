# docs/known-divergence.md — permanent floors

Check this file before starting any fix. Nothing listed here is a defect, and no iteration
is ever spent trying to close one.

## F-01 — No font-substitution floor exists (checked, not assumed)

D-11 fires only if the reference self-hosts a *licensed* face. It does not. Mulish, Inter
and Poppins are served from `wp-content/uploads/elementor/google-fonts/` — Elementor's
local Google Fonts cache — with real font files present and 244 `@font-face` rules.
All three are SIL OFL.

**We use Mulish and Inter directly via `next/font/google`.** Heading metrics are expected
to converge and must not be excused. A bogus font floor here would permanently excuse the
h1 (Mulish 800, −2px tracking), which is the single most visually load-bearing element on
the site.

Only the two **icon** fonts are replaced: `elementskit` and `ElegantIcons` → `lucide-react`,
matching stroke width and size rather than exact glyph. Icon glyph shape is a floor;
icon box and stroke weight are not.

## F-02 — Every photographic slot is a placeholder until the terminal step

Per D-09 the reference's photos, logo, staff and vehicle shots do not enter this repo, not
even temporarily. Prompt 2 generates neutral SVG placeholders at the correct rendered
dimensions and dominant color. Sections whose divergence is dominated by a placeholder are
reported with the placeholder area excluded, and are re-diffed only once at asset drop-in
(OVERRIDE 3).

## F-03 — Mobile drawer mechanism diverges deliberately

The reference animates `max-height` + `scaleY`, applies no body scroll lock, and does not
close on `Escape`. `process.md` Prompt 4 names animating `max-height` as the failure mode
by name. Ours uses compositor properties only, a real `position: fixed` scroll lock, and
closes on Escape / backdrop / route change with a focus trap.

This is an intentional behavioral improvement, measured on geometry only. It is not a
divergence to close.

## F-04 — Focus visibility diverges deliberately

The reference's CTA and form inputs have no focus style beyond the browser default outline.
D-19 requires WCAG 2.2 AA with visible focus everywhere and 3:1 focus rings. Ours will not
match theirs, by design.

## F-05 — No sticky header; yes to a mobile call bar

The reference header is `position: static` at rest and after scroll, at every breakpoint.
Ours is static too. The reference has **no** fixed or sticky element anywhere; ours adds a
mobile sticky call bar per D-04. Its area is an addition, not a divergence.

## F-06 — Zero FIDELITY sections on this build

Every retained section carries our business facts or our copy, so none satisfies
"structurally equivalent content". Pixel diff gates nothing; it is computed for ranking
only. Reasoning in `docs/sections.md`. Declaring FIDELITY sections to give the pixel metric
customers would manufacture the exact failure mode `CLAUDE.md` warns about.


## F-07 — COLOR IS TERMINAL, and it is terminal from the start (A-8)

The palette is randomized at token-write time (A-7), not after convergence, so the site is
built in its final palette from the first component onward.

**Color divergence from the reference is intentional and permanently excluded from every
diff, every threshold, and every future iteration.** Stripped from the structural
comparator: resolved color, background-color, border-color, gradient stops, shadow color.
Retained: every geometric and typographic field, and the non-color parts of borders and
shadows — widths, offsets, blur, spread, radii. `harness/diff.mjs --with-color` re-enables
the color fields for debugging only; it never gates.

This has no FIDELITY consequence on this build, because there are no FIDELITY sections
(F-06). No solid-color band needs excluding from a pixel gate that does not exist.

## F-08 — NOVEL sections are measured once, not per breakpoint (A-9)

Token conformance has no breakpoint dimension. NOVEL rows are measured once at 1440.
`BP_SET` is unchanged: all three breakpoints stay measured for everything geometric,
including 768, where the primary restack resolves.

## F-10 — the reference is now behind a bot wall; its capture is FROZEN

Between Prompt 1 and the merged Prompt 2+3+4 turn, `costarroofinginc.com` acquired a
JavaScript interstitial: `<title>One moment, please…</title>`, 51 characters of body text, a
5-second self-reload. Prompt 1 recorded HTTP 200 headless on the first try for every page;
that is no longer true.

**What was tried, in the order `CLAUDE.md` specifies:** headless via
`_shared/harness/src/refcopy.mjs` (returned 2 sections / 51 chars for all five pages), then
one headed retry with a real Chrome UA at 1440, polled eight times at 6-second intervals.
The wall never cleared. The contract's third branch — *fall back to profiling a local saved
copy* — is therefore the operating mode from here.

**The local saved copy is the Prompt 1 capture**, taken while the site was still open:

- `.harness/text/*.json` — headings, paragraphs and character counts per band
- `.harness/assets/*.json` — every asset slot's rendered geometry per breakpoint
- `.harness/ref/<route>/<bp>/*.png` — reference section screenshots, all three breakpoints
- `.harness/profile/*.json` — computed styles, font faces, media queries, motion probes

`.harness/refcopy.json` is **reconstructed** from `.harness/text/*.json` by
`scripts/refcopy-from-capture.mjs`, in the shape `similarity.mjs` expects. One honest
caveat: its `text` field is `headings + paragraphs`, so `chars` counts body and heading text
and excludes button labels and stray nodes that the live extractor's `el.textContent` would
have included. Every length target in `docs/content-divergence.md` is against that
reconstruction, and the reconstruction cannot now be checked against the live page.

**Consequences, all of them permanent:**

1. **No reference number in this repo can be re-measured.** Treat the captures as the
   specification. Prompt 11's structural comparator runs against them, not against the live
   site, and it must not be "refreshed".
2. **`--side ref` capture is dead.** Any harness pass that would re-fetch the reference will
   return the wall. If a gate reports a reference height of ~104px or a section count of 2,
   that is the wall, not a regression in our build.
3. **This is not a defect and no iteration is ever spent on it.**

## F-11 — no font floor, and the phantom face is named

The Prompt 2 enumeration confirmed F-01 rather than overturning it, and it also found the
trap another site in this programme fell into.

`.harness/profile/_.json → fontFaces` is the live `document.fonts` set post-hydration. A
`FontFace` reaches `status: "loaded"` only once its `src` has been fetched and parsed, so
`loaded` is proof a real file is served:

| family | declared | loaded | verdict |
|---|---:|---:|---|
| Inter | 135 | 4 | real — body face |
| Mulish | 88 | 4 | real — display face |
| Poppins | 39 | 3 | real, but a few widget nodes only |
| **Outfit** | 27 | **0** | **phantom — declared, never loaded, never rendered** |
| `elementskit` / `ElegantIcons` | 5 | 2 | real — icon fonts |

- **Mulish and Inter get NO floor.** Both are SIL OFL, served from Elementor's local
  Google Fonts cache, and both are imported directly via `next/font/google`. Heading metrics
  are expected to **converge** and must never be excused. The h1 (Mulish 800, −2px tracking)
  is the most visually load-bearing element on the site.
- **Outfit gets NO floor either, and no import.** Zero loaded faces and it appears in no
  computed `font-family` on any node at any breakpoint. It is dead plugin CSS. Booking a
  substitution floor for it would permanently excuse nothing at all while looking like
  diligence — which is precisely the failure the other site shipped.
- Icon fonts remain the only genuine replacement, → `lucide-react`. **Glyph shape is a
  floor; box and stroke weight are not** (F-01).

Full table and reasoning: `assets/INVENTORY.md` → "Fonts".

## F-12 — placeholder fills sampled from a section average are weak, and are labelled

`scripts/inventory.mjs` prefers the Prompt 1 per-slot colour crop. Where that recorded
`null` (the image had not decoded when the probe ran) it falls back to the average of the
whole reference section, which on a mostly-white band returns near-white — so those
placeholders read faintly. Seven of the eighteen REPLACE slots are on that path and every
one is tagged `section-average` rather than `slot-crop` in `assets/INVENTORY.md`.

Not worth an iteration: the hairline border and the slot-ID label keep the box visible, and
every one of these is replaced outright at the terminal asset drop-in (OVERRIDE 3). Recorded
so nobody reads a pale hero placeholder as a token bug.

## F-09 — ITERATION_CAP is 1 (A-2)

One fix attempt per section. On the first miss the residual and a hypothesis are written
here and the section is floored — never a second attempt. Sections floored this way are
floored by policy, not by measurement, and that distinction is recorded per entry.

## Palette seeds - APPLIED at the merged Prompt 5+9 turn

Reproduce any row exactly with:

    MSYS_NO_PATHCONV=1 node ../_shared/harness/src/palette.mjs --seed <n> [--emit]

| | |
|---|---|
| master seed | `7104` |
| **winning seed** | **`79039`** |
| all five candidate seeds | `79039`, `26330`, `644461`, `267192`, `70262` |
| rolls / rejected | 5 rolls, 0 rejected, 5 survivors |
| applied scheme | triadic, accent at +120 degrees |
| applied primary hue | 270 (violet-slate) |
| applied accent hue | 30 (deep rust) |
| neutral chroma tint | 0.037 |

| seed | scheme | primary hue | accent hue | neutral C | CTA contrast | CTA chroma | outcome |
|---|---|---:|---:|---:|---:|---:|---|
| **79039** | **triadic** | **270** | **30** | **0.037** | **10.79:1** | **0.0886** | **WINNER** |
| 26330 | analogous | 116 | 146 | 0.037 | 10.00:1 | 0.0889 | candidate |
| 644461 | split-complementary | 59 | 269 | 0.060 | 10.59:1 | 0.0881 | candidate |
| 267192 | analogous | 75 | 105 | 0.031 | 10.29:1 | 0.0784 | candidate |
| 70262 | triadic | 247 | 127 | 0.048 | 10.14:1 | 0.0889 | candidate |

Selection rule, per OVERRIDE 1: the surviving candidate whose call-now CTA has the
highest contrast against its own background; ties break to the lowest seed. No tie
occurred. Every L and every C from the extracted reference ramp is preserved exactly;
only H moved. Neutrals carry a 3.7% chroma tint of the primary hue rather than being
pure grey.

**Sibling collision check.** Atlas is plum/crimson at primary hue 332; Forge is a green
ramp at primary hue 150.6; Titan is at 216.7. The winner sits at 270, which is 62 degrees
from Atlas, 119 from Forge and 53 from Titan. Three master seeds were discarded before
7104 for landing inside a 30-degree arc of Atlas or Forge (3104 -> hue 124, 31040 -> 173,
10431 -> 335, 20260901 -> 332, 5104 -> 194); the discard was on hue distance only, never
on how the candidate scored.

### The ramp role mapping, and the trap it avoids

`referenceRamp` in `harness.config.mjs` is the reference's own set, and the role mapping
is deliberately not the obvious one:

| token | reference hex | L | C | role |
|---|---|---:|---:|---|
| accent | `#064d2a` | 0.3705 | 0.0884 | the call CTA fill - the reference's ACTUAL CTA colour |
| accentDeep | `#27282a` | 0.2766 | 0.0039 | its ACTUAL hover |
| primary | `#3f444b` | 0.3603 | 0.0117 | structural dark furniture |
| primaryDeep | `#0c0d0e` | 0.1583 | 0.0027 | deepest surface, the footer band |

The reference's bright green `#03a143` (L 0.6190, C 0.1758) is **deliberately absent**
from the ramp. At that lightness neither white (4.06:1) nor ink (4.28:1) reaches AA on
it - it fails AA in the reference's own palette - and because the technique holds L
exactly, no hue rotation can rescue it. Adopting the highest-chroma colour on the page as
the CTA fill because it is the highest-chroma colour is precisely how a build ships a CTA
nobody can read.

### AA on the pairs actually in use

28 foreground/background pairs are declared in `harness.config.mjs -> pairsInUse` and all
28 pass. The full table is printed by `node ../_shared/harness/src/palette.mjs`. Three
things about that list are load-bearing:

1. **The CTA band is declared as ONE gradient entry**, `{ fg: neutral0, bg: { gradient:
   ['primary', 'primaryDeep'] } }`, sampled at five points in OKLCH and scored on the
   worst sample. It is never modelled as two flat rows at the stops. Flat-modelling a ramp
   is how a sibling site shipped an invisible CTA that passed its own AA gate.
2. **There is deliberately no muted-grey-on-alt-band pair.** `neutral600` on `neutral200`
   is 4.28:1 in the reference's own ramp, so a rotation cannot rescue it either. On the
   alt band secondary text is `neutral900` at normal weight, never grey, and
   `app/globals.css` enforces that with a per-band `.u-muted` rule.
3. **The focus ring is two layers** - a surface-coloured inner halo then the dark ring -
   because that is the only construction holding 3:1 against both a white page and a
   saturated accent fill from one token. Both layers are gated, on the page, on the alt
   band, on the CTA fill and on the deep band.

Semantic colours (error, success, warning) are EXEMPT from the rotation and keep
conventional hues; the gate asserts the hue arc, not just the contrast, so a randomly
green error state cannot survive.

### F-13 - dark bands are keyed on a data attribute, and it is verified in the BUILT page

One convention, `data-surface="alt" | "dark" | "deep" | "gradient"`, and the CSS keys on
the same data attribute. The sibling defect this exists to prevent: dark-surface rules
keyed on a CLASS while the markup used a DATA ATTRIBUTE, so the two never met and every
dark band silently painted light-band foregrounds, shipping a 1.16:1 secondary CTA on all
five routes.

Verified, not asserted: `contrast.mjs` scored 374 painted pairs across all five routes and
three breakpoints, and the footer rows read `#cbd4ee` on `#0c0d0e` at 13.15:1. If the deep
rule had not applied, the footer would have been white-on-white and failed.

### F-14 - the two halves of docs/sections.md must be edited TOGETHER

`docs/sections.md` now carries a human table per route AND a machine-readable table at the
foot in the shared parser's fixed column order:

    | /route | ref-section-id | our-section-id | CLASS | reason |

**They are a machine twin pair. An edit to one is an edit to both.** Before this turn the
file parsed to ZERO rows, and a contract that parses to nothing is indistinguishable from
a contract that classifies nothing: every section silently defaulted to FIDELITY and
adapted content would have been pixel-diffed against the reference - the single most
expensive failure mode this process names. Two of the five sites on this harness had the
same defect and a third parsed 5 of 88. `diff.mjs` now throws if the file mentions class
names and matches no rows.

Three rules the machine table obeys:

- The ref column carries the reference SECTION ID (`s05-services`), never an ordinal.
  Ordinals shift between breakpoints when a band splits.
- The ref column is EMPTY for the four sections this build ADDS. They have no counterpart
  and report UNPAIRED forever, which is a correct result and must not be invented away.
  `services-faq` is one of them: a band relocated from the reference's home page onto
  another route has no same-route counterpart.
- Our components declare `data-section="<our-section-id>"` in dash form, exactly as
  spelled in that table. Dots are not legal in the parser's id columns, so `home.hero` in
  the human table is `home-hero` in the machine table and in the markup.

`content/copy.ts` carries the same ref ids in its `refSection` fields. That is a third
copy of the same mapping and it must move with the other two.

### F-15 - the shared harness has NO reference capture, and cannot get one

`diff.mjs` reads `.harness/cap/ref/<route>-<bp>/meta.json`. That directory does not exist
and cannot be created: one attempt at `capture.mjs --side ref` this turn returned
`Execution context was destroyed, most likely because of a navigation` - the F-10 bot wall
reloading itself under the probe. No further attempt will be made.

The Prompt 1 reference capture survives, but in the LEGACY layout (`.harness/ref/<route>/
<bp>/metrics.json`) with a different metric vector: it records `box/pad/inner/gridCols/
childCount/rows/perRow/h1/h2/h3/p/eyebrow/button/card/image/chars/absY`, whereas the
shared probe records `id/tag/cls/box/appearance/innerGrid/headingText/textChars`. The two
overlap on box geometry and on most type fields but not on all of them, and the legacy
file carries no section `id` in the shared probe's `sNN-slug` form.

**Consequence, and it is the honest one: the structural and pixel columns of the
divergence table cannot be produced by the shared harness as it stands.** `diff.mjs`
reports `missing capture` for all fifteen route/breakpoint passes. Writing a converter
that fabricates the missing fields would produce numbers that look like measurements and
are not, which is the failure this whole document exists to prevent. This is flagged to
the programme lead rather than papered over; it blocks the build wave's per-section
numbers, not this turn's palette or render-truth results.

What DOES measure cleanly today, and did: the two render-truth gates (`contrast.mjs`,
`rendertruth.mjs`), which score the built page directly and need no reference, and the
NOVEL token set, which `loadTokens()` reads from `app/globals.css` (13 colours, 16 sizes,
5 weights, 7 radii, 4 shadows, 12 spacing steps).
