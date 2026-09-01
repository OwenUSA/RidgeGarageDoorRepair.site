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

## F-09 — ITERATION_CAP is 1 (A-2)

One fix attempt per section. On the first miss the residual and a hypothesis are written
here and the section is floored — never a second attempt. Sections floored this way are
floored by policy, not by measurement, and that distinction is recorded per entry.
