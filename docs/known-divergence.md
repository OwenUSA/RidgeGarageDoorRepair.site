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

---

## F-16 — the build wave's two render-truth defects, and why the fix went where it did

Found by `rendertruth.mjs` on the first full run after the 27 section components landed,
fixed in the same turn, both green afterwards. Recorded because both are recurring classes
rather than one-off slips. **Neither was subject to `ITERATION_CAP`** — A-13 exempts
render-truth failures, because they are defects in our own build rather than divergences
from a reference.

### F-16a — `cta-primacy` on `/services` at 768

    tel: CTA ranks 52% down the page among INTERACTIVE elements by painted contrast

The call CTA is white on the accent fill at **17.75:1**. Two other interactive element
classes beat it, both by construction rather than by design intent:

- `.u-btn--ghost`, whose label was `--color-primary-deep` on white — **19.5:1**. Every
  `.actions` row on this site places a ghost button immediately beside the call CTA, so the
  secondary action was out-contrasting the primary one on every route.
- `.acc__btn`, the seven FAQ togglers on `/services`, same colour, same 19.5:1. That is why
  the finding surfaced on `/services` specifically: it is the only route carrying seven
  extra near-black interactive elements.

**Fix: both were lowered to `--color-neutral-900` (#21273b), 14.8:1 on white.** Still far
above the 4.5 AA floor, still the already-gated `body-on-surface` pair, and now below the
CTA where the conversion path belongs. `harness.config.mjs` `pairsInUse`
`ghost-label-on-surface` was updated in the same edit to keep the declared pair list in step
with the CSS by hand, as that block's comment requires.

**The direction of this fix is the load-bearing part.** `cta-primacy` scores **interactive
elements only** — never body copy, never headings. An earlier version of the gate ranked the
tel: CTA against every text box on the page, which near-black-on-white wins by construction;
a sibling site responded by washing its headings from neutral-950 to neutral-700 and the
regression had to be reverted. Dimming prose cannot satisfy this gate and costs real
legibility. **If `cta-primacy` fails, fix the CTA or fix the other buttons. Never the
headings.**

### F-16b — `text-legibility` on `/` at 768: "Fixed Right, Once" at 1.52

The home CTA strip's `<h2>` is white on the `primary → primaryDeep` gradient, which it
contrasts with at better than 13:1 — and it measured **1.52**, at 768 only, passing at both
390 and 1440.

It was not a colour bug. `rendertruth.mjs` samples the two dominant painted tones inside a
text element's **own box**. At 768 that h2 was the default 18px inside a 60ch centred block:
a short heading in a wide box, so the ink ratio fell low enough that *both* dominant tones
sampled were gradient rather than one being ink. At 390 the box is narrow enough that the
text fills it; at 1025+ the h2 steps up to 24px and the glyphs carry enough area. 768 was the
one width where neither rescued it.

**Fix: `.statement h2` is now a real display size — `--text-4xl`, stepping to `--text-5xl`
at 1025 — and `.statement--center h2` is capped to `24ch` and centred**, so a statement
band's heading box hugs its own text. That is what the reference's statement bands do
anyway, so the fix is a design correction rather than a measurement workaround.

**The general lesson:** a low painted-separation number on text whose *declared* contrast is
demonstrably fine is a geometry finding, not a colour finding. Recolouring it would have
been the wrong repair and would have moved a gated pair for no reason. Check the ink-to-box
ratio before touching a token.

---

## F-17 — three placeholder background slots are deliberately NOT applied

`about.page-hero.bg`, `services.page-hero.bg`, `contact.page-hero.bg`, `home.why-choose.bg`
and `home.cta-band.bg` are all recorded in `assets/INVENTORY.md` with a `section-average`
dominant colour, which per **F-12** means the Prompt 1 probe never saw the image decode and
the fill fell back to the average of a mostly-white band. All five are therefore near-white.

Applying a near-white background image beneath body text makes the band's painted contrast
**UNMEASURABLE** — `contrast.mjs` reports `url()` backgrounds as unmeasurable rather than
assuming white, by design, and `rendertruth.mjs` would then be scoring text against a tone
nobody chose. The bands are rendered on their real token surfaces instead
(`data-surface="alt"` or the plain surface).

This is a deliberate, permanent divergence from the reference's band treatment and it is
**not** a fixable residual. When the terminal asset drop-in supplies real artwork with a
known tone, these five slots can be reconsidered one at a time, each re-running both gates.
`about.values.img` is also unused: its reference slot is a single image beside a four-card
row, and dropping it into a four-up grid would fight the card heights.

---

## F-18 — colour, restated now that sections exist

A-8 excluded colour from measurement from the start, and the build wave changes nothing
about that. **Colour divergence from the reference is intentional and is permanently
excluded from every diff, every threshold and every future iteration.** The palette is
seed 79039 (violet-slate `#41434b` + deep rust `#672b22`), applied at token-write time, and
the site was built in its final palette from the first component onward. There is no
recolour pass and therefore nothing for a geometry/typography regression table to prove
innocent.

The one palette-adjacent change made during the build wave is F-16a's ghost-label move from
`primaryDeep` to `neutral900`. It is a role reassignment within the existing token set, not
a new token and not a hue change: both values were already in the ramp and already gated.

---

# FINAL — merged Prompt 10 + 11 (asset prompts + trimmed acceptance sweep)

This is the last entry in the chain for this site. Everything below is a **floor** — a
permanent, explained absence or divergence — not a defect and not a residual anyone should
reopen.

## F-19 — A-15: THERE IS NO REFERENCE SIDE, PERMANENTLY

`costarroofinginc.com` answers every request — headless, headed, normal desktop UA — with a
bot-challenge interstitial. This site kept **no complete local copy** of the reference pages,
so no reference-side capture can ever be produced again.

Re-confirmed this turn, not assumed: `diff.mjs` was run and returned
`missing capture (run capture.mjs first)` for **all 15** route × breakpoint passes, and
wrote `docs/divergence.md` with **0 rows**. `.harness/cap/ref/` contains one directory
(`privacy-1440`) holding two PNGs and **no `meta.json`**, which is why even that route
cannot be paired.

- **Every structural row reports `BLOCKED/no-reference`. Never a number, never a PASS.**
  A BLOCKED row is an absence and must read as one in every report. `0 rows` in
  `docs/divergence.md` means *fifteen blocked passes*, not *fifteen clean passes*.
- **No converter was written and none may be.** Back-filling the shared probe's metric
  vector from the Prompt 1 legacy capture would produce numbers that look like measurements
  and are not, and the next reader could not tell the difference. This was decided once and
  is not revisited.
- **What is still genuinely reference-derived**, because it was extracted while the
  reference was reachable and is committed: the token set, type scale, spacing scale and
  container widths; the section contract and its classifications; all copy and both
  similarity gates, which score against the saved corpus; and the applied palette's exact
  L and C structure. Only the *verification* of fidelity is lost, not the derivation.

## F-20 — token conformance was BLOCKED THROUGH THE NORMAL ENTRY POINT, and how it was recovered

Worth recording because it looked like a passing gate and was not reachable.

`diff.mjs` computes NOVEL token conformance inside `diffOne()`, which returns early with
`missing capture` when the reference-side `meta.json` is absent. Under F-19 that file can
never exist here — so a check that **needs no reference side at all** (only our own capture
and the Prompt 5 token set) was silently unrunnable, and a "0 violations" figure quoted from
an earlier turn could not be reproduced.

`scripts/token-conformance.mjs` calls the harness's own exported `loadTokens()` and
`tokenViolations()` directly against our capture. It fabricates nothing and reads nothing
from the reference; it removes a coupling, it does not invent a side. Result this turn:

| section | route | violations | threshold | status |
|---|---|---:|---:|---|
| `home-transparency` | `/` | 0 | 0 | PASS |
| `home-process` | `/` | 0 | 0 | PASS |
| `services-symptoms` | `/services` | 0 | 0 | PASS |
| `services-faq` | `/services` | 0 | 0 | PASS |
| `privacy-body` | `/privacy` | — | 0 | **UNSEGMENTED — not scored, not passed** |

**`privacy-body` is a genuine instrument floor.** `segmentSections()` accepts a candidate
selector only when it yields **at least two** outer bands. `/privacy` is a one-band route —
`main > section` and `section` each resolve to exactly one outer band — so no candidate wins
and the capture holds only the header and footer. No selector can fix this: the page really
does have one band. It is reported as an absence rather than a pass.

Static substitute, stated as a sweep and not as the gate: every declared value in the
`.legal*` rules in `app/sections.css` resolves to a Prompt 5 token
(`--spacing-*`, `--text-sm`, `--text-xl`, `--font-weight-*`, `--lh-heading`,
`--color-neutral-200`, `--color-neutral-900`, `--color-warning`), and
`components/sections/PrivacyBody.tsx` declares no raw colour, size or inline style at all.

## F-21 — one raw colour value survives outside the token file, deliberately

`app/sections.css:104` — `box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0)`. Fully
transparent: it carries **no hue**, and it exists to hold the reference's shadow *geometry*
(offset, blur, spread), which A-8 explicitly keeps while excluding shadow colour. It is the
only hex/rgb/hsl/oklch literal anywhere in `app/` or `components/` outside `app/globals.css`.
Recorded so a later sweep does not read it as a palette leak.

## F-22 — two acceptance-gate defects found and fixed this turn (not ITERATION_CAP work)

Both are failures of our own build against a written contract, not divergences from the
reference, so A-13's logic applies: fix them.

1. **No `robots.txt` and no `sitemap.xml` existed.** Gate 13 found both returning 404.
   Added `app/robots.ts` and `app/sitemap.ts`; the sitemap is generated from
   `lib/business.ts` `routes`, the same five-entry list the header and footer render, so a
   sitemap entry cannot drift from a real route and a sixth route cannot appear here without
   appearing in the nav first.
2. **No custom 404.** `/nope-404` served Next's default `404: This page could not be found.`
   outside the shell. Added `app/not-found.tsx`, which renders inside the root layout — so
   header, footer and call bar are the same shell every route uses — built from the existing
   `.statement` / `.u-btn` / `.actions` primitives, no new token and no raw colour.
   It is NOVEL and has no reference counterpart; it is `noindex, follow`.

## F-23 — the map bypass was specified and had never been built

`docs/behavior/07-map-lazy-mount.md` requires "a skip link immediately before the iframe
that jumps past it, because an embedded map is a keyboard trap in some browsers once focus
enters it." `<BusinessMap>` had the lazy load, the title, the aspect wrapper and the
directions link — and no bypass. Gate 8, verifying the keyboard path **against the specs
rather than against itself**, is what caught it.

Fixed in the lead-owned shell: a `.u-skip` bypass link before the frame targeting a
`tabIndex={-1}` anchor on the address block, with a per-instance `id` prop so the home map
(`home-map`) and the contact map (`contact-map`) have distinct targets. `contrast.mjs` went
from 1031 to 1037 scored pairs — the six new links, all passing — and `rendertruth.mjs`
stayed at 0 findings, because visually-hidden skip links are now excluded from
`cta-primacy`.

This is the value of spec-verification even without the hand-tested pass: the gap was in the
gap between two documents, which is exactly where a programmatic gate cannot look.

## F-24 — the harness changed after the build wave; the earlier numbers were superseded, not carried forward

Three instrument changes landed between the build wave and this turn, and **every number in
this report is from a re-run, not quoted from `docs/shell-status.md`**:

- `dominantPair()` in `rendertruth.mjs` only compared the 12 most frequent tone buckets, so a
  gradient's dozens of buckets could push a small heading's glyph core out of the window.
  It now considers every tone above a pixel-share floor. **F-16b's diagnosis stands and its
  fix stands**: that finding was geometry (ink-to-box ratio at 768), not colour, and the
  repair was type size, never recolouring.
- `cta-primacy` was rewritten twice more and **no longer ranks by painted contrast at all**.
  It now measures **chroma dominance**: no other action may be more saturated than the call
  CTA. F-16a's ghost-button fix was correct under the old rule and remains correct design;
  the check itself was wrong three times over — unsatisfiable, then vacuous, then beaten by
  bordered nav links at 21:1.
- A visually-hidden skip link was being scored as a competing action and is now excluded.

## F-25 — fonts: there is NO font-substitution floor on this site

Restated at the end of the chain because it is the floor most likely to be invented later.

**Mulish and Inter are real, loaded, SIL OFL faces**, imported directly through
`next/font/google` (4 loaded weights each in the Prompt 1 capture). D-11 does not fire.
**A heading that will not converge here is a real bug, not an excused one** — and there is
nothing to converge against anyway under F-19, which makes an invented font floor doubly
worthless.

**Outfit is a phantom**: 27 `@font-face` rules declared on the reference, **0 loaded**, and
it appears in no computed `font-family` on any node at any breakpoint. It is dead plugin
CSS. **It is never imported and a floor must never be booked for it.** Booking one would
permanently excuse nothing while looking like diligence — the exact mistake another site in
this programme shipped.

Only the two icon fonts are genuinely replaced (`elementskit` / `ElegantIcons` →
`lucide-react`): **glyph shape is a floor, box and stroke weight are not.**

## F-26 — colour, restated and closed (A-8)

**Colour divergence from the reference is intentional and is permanently excluded from every
diff, every threshold and every future iteration.** Seed **79039**, violet-slate `#41434b` +
deep rust `#672b22`, applied at token-write time; the site was built in its final palette
from the first component onward. Stripped from the structural comparator: resolved colour,
background-colour, border-colour, gradient stops, shadow colour. Retained: every geometric
and typographic field, and the non-colour parts of borders and shadows.

Winning seed **79039**; all five candidate seeds **79039, 26330, 644461, 267192, 70262**;
master seed **7104**. The full derivation, the ramp role mapping and the 28 in-use AA pairs
are in the "Palette seeds" section above and are unchanged.

## F-27 — F-12 / F-17: the near-white placeholder fills, and the five unapplied backgrounds

Seven of the eighteen REPLACE slots carry a `section-average` dominant colour rather than a
`slot-crop`: the Prompt 1 probe ran before the image decoded and the fill fell back to the
average of a mostly-white band, so those placeholders are near-white (**F-12**).

Five of them are background slots — `about.page-hero.bg`, `services.page-hero.bg`,
`contact.page-hero.bg`, `home.why-choose.bg`, `home.cta-band.bg` — and are **deliberately
not applied** (**F-17**). A near-white background image beneath body text makes the band's
painted contrast **UNMEASURABLE**: `contrast.mjs` reports a `url()` background as
unmeasurable by design rather than assuming white, and `rendertruth.mjs` would then be
scoring text against a tone nobody chose. The bands render on their real token surfaces
instead.

`docs/asset-prompts.md` section 3 writes all five prompts with an explicit luminance
constraint — dark or high-contrast enough to carry body text — and requires each to be
**re-gated individually at drop-in**, never as a batch. `about.values.img` is also written
but not mounted: its reference slot is a single image beside a four-card row and dropping it
into a four-up grid would fight the card heights.

## Final gate results — merged Prompt 10 + 11, all re-run this turn

Server: `pnpm build` + `pnpm start` on port 3104, never `next dev`. Port holder killed and
the server restarted after every rebuild; page title and referenced stylesheet (HTTP 200)
verified before each gate run.

| gate | command | result |
|---|---|---|
| build | `pnpm build` | **clean** — 8 static routes, 0 type errors, 0 lint errors |
| console errors | `capture.mjs --side ours` | **0 errors on all 15 route × breakpoint passes** |
| contrast (declared CSS, gradient-aware AA) | `contrast.mjs` | **1037 scored, 0 FAIL, 0 UNMEASURABLE** |
| render-truth (painted, CTA chroma primacy, tap targets) | `rendertruth.mjs` | **0 findings** |
| NOVEL token conformance | `scripts/token-conformance.mjs` | **0 violations, 4/5 sections scored** — `privacy-body` UNSEGMENTED (F-20) |
| structural deviation vs reference | `diff.mjs` | **BLOCKED/no-reference — 15/15 passes, 0 rows (F-19)** |
| email sweep | `rg` per CLAUDE.md | **EMAIL SWEEP CLEAN** |
| locations sweep | `rg -ni "locations\|areaServed\|cities\|neighborhood"` | 2 hits, both comments recording the *absence*; the footer `SERVICE_AREA` sentence is the only survivor |
| NAP consistency | source trace | every phone / address / hours string resolves to `content/copy.ts` `site` via `lib/business.ts` |
| hours | rendered + JSON-LD | `07:00`–`19:00`, all seven days, one block |
| maps | rendered HTML | home `z=13`, contact `z=15`, both keyless-by-coordinate, `loading="lazy"`, titled, aspect-wrapped, directions link resolves |
| internal link crawl | curl over all hrefs | 5 routes 200, `robots.txt` 200, `sitemap.xml` 200, custom 404 in the shell, 0 orphans, 0 dead anchors |
| keyboard path | verified against `docs/behavior/` | skip link, drawer trap + Escape + focus restore, accordion `aria-expanded`/`aria-controls`, form focus-first-invalid + `aria-invalid` + `aria-live`, map bypass (added, F-23) |
| reduced motion | source | `prefers-reduced-motion` honoured in `globals.css`, `shell.css` (x2) and `sections.css` (x3) |
| palette conformance | `rg` for raw colour | 1 literal outside the token file, fully transparent (F-21) |
| copy similarity | `similarity.mjs` | 42 sections · 5-gram **42/42** · trigram **42/42** · length **22/22 measured**, 11 rows **EXEMPT** |
| metadata / canonical / robots / sitemap | rendered | all five routes carry a unique title, description and canonical; the sitemap lists exactly the five |
| `TODO(fact)` count | `rg` + register | **15 open facts** (FACT-01…FACT-15), **12 inline `TODO(fact):` markers** across 5 files. Counted, never removed. |
| Lighthouse | — | **DROPPED (A-4)** — pre-public blocker, "performance never measured" |
| hand-tested keyboard pass | — | **DROPPED (A-4)** — pre-public blocker, "keyboard access is spec-verified only, never hand-tested" |

Two numbers that must be read carefully rather than skimmed: `diff.mjs` **0 rows** is fifteen
BLOCKED passes, not fifteen clean ones; and the similarity length gate's 11 exempt rows are
**EXEMPT**, which is not a pass — each names a contractual reason the +/-10% rule cannot
apply (the header's 19-link nav under D-01/D-02, the footer's deleted email address and
licence number under D-03/D-14, and the contact map's zero-character reference denominator).

---

## F-24 — layout re-alignment to the reference's band shapes

Owner-requested pass, after a side-by-side read of the reference home page against ours.
The finding was that the copy and the token set had converged but the **band shapes** had
not: every band was a left-aligned head over a uniform card grid, where the reference
alternates a bleed hero, an icon-card trio, split feature rows, a dark photographic band
and a two-column FAQ.

**Colour was explicitly held.** The owner chose "structure only" when asked, so the
Prompt 5 seed-79039 ramp is untouched and A-7/A-8 stand: nothing below introduces a
literal colour except the `whyband` scrim, which is a black wash at 74% and not a hue.

| band | was | now |
|---|---|---|
| `home.hero` | contained 577px art column on the white surface | alt surface, art bleeds past the container's right gutter, `position: absolute` inside its own column so the placeholder's 577x607 no longer drives band height |
| `home.transparency` | left head, plain cards on the alt fill | centred head, three centred lucide-icon cards on white |
| `home.services-grid` | four cards in a 2-col grid, media inside two of them | centred head, the two media-bearing cards become alternating feature rows with their own call CTA, the rest fall through to a centred grid |
| `home.process` | left head, left cards | centred head, centred cards on the alt fill |
| `home.why-choose` | checklist on the alt fill | `band--art` over the `home.why-choose.bg` placeholder with a 74% scrim, `data-surface="deep"`, reasons as a 2x2 grid of hairline panes |
| `home.commitment` | head, full-width image, card grid, trailing prose | two columns — a staggered stack of check-led panes beside the head, its closing paragraph and the photograph |
| `home.performance-band` | media first | copy first, media right |
| `services.faq` | full-width accordion, chevron | 1.9fr/1fr split with a contact rail; open row takes the brand fill and a minus, closed rows the alt fill and a plus |
| `shell.footer` | brand / NAP / unlabelled nav | brand / headed Quick Links / headed Get in touch, centred copyright |

Band heads also moved off the h2 default. The extracted h2 (18px / 24px at 1025) is the
reference's **card-title and legal-body** size, not its band-head size; every band head on
the reference is set at the display end of the same extracted ramp. `.sec-head h2` and its
siblings now resolve to `--text-4xl/5xl/6xl` extrabold on `--lh-tight`. `.legal h2` and
`.card__title` are deliberately outside that selector list and are unchanged.

Four new copy strings, all in NOVEL or length-exempt sections so no measured length moved:
`shell.footer.subheading` ("Quick Links", exempt) and `services.faq.subheading` + two
`ctas` (NOVEL, no paired slot). Re-run after the change: **similarity 42/42 · 42/42 ·
22/22 measured**, **contrast 1170 scored, 0 FAIL**. The 18 new UNMEASURABLE contrast rows
are the `whyband` type over a `background-image`, which the static sampler cannot resolve —
the same category the reference's own dark band falls into.

---

## CORRECTION (2026-09-02) — the reference was NOT permanently lost

Earlier entries in this file state that the reference is bot-walled, that no local copy
exists, and that structural comparison is therefore impossible forever. **That is wrong,
and it was wrong when written.**

The Prompt-1 harness captures survived in this repo's `.harness/` directory the entire
time: **~114 reference PNGs and ~18 structural JSON files**, covering all five routes at
all three breakpoints, full-page and per-section. They were captured before the wall went
up and were never wired back in.

`.harness/` is gitignored and had zero files tracked, so this irreplaceable data was one
`git clean -xdf` away from being gone. A copy is now archived outside every git repo at
`../_reference-archive/` — see its README.

**What this changes:** visual comparison against the reference is possible again, using
those screenshots. Run the shared harness's `sidebyside.mjs`, or open the captures directly.

**What this does NOT change:** whether to backfill structural metric fields from these
captures remains a judgment call, and this file already records it as considered and
declined. Deriving a metric the original capture never measured is fabrication, not
recovery. That decision stands on its own merits — it simply was not, as claimed, forced by
the absence of data.

**General lesson:** "no `reference/raw/` means permanently lost" is a false equation.
`reference/raw/` is the convenient form of the reference, not the only one. Check
`.harness/` before declaring a reference unrecoverable.
