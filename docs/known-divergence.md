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

## Palette seeds

Recorded when the palette is generated. Not yet run.

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
