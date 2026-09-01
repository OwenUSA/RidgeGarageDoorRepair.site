---

## Fonts — enumerated, and the "phantom face" trap checked explicitly

Another site in this programme booked a permanent font-substitution floor for a heading
face that turned out to have **no font file at all**: its `@font-face` existed only under
`#wpadminbar .godaddy-styles`, hosting control-panel chrome that never renders publicly. A
bogus floor there permanently excused a heading that should have converged. So this was
verified rather than assumed.

**Evidence used:** `.harness/profile/_.json → fontFaces`, which is the page's live
`document.fonts` set after hydration. A `FontFace` reaches `status: "loaded"` only once its
`src` has actually been fetched and parsed — so `loaded` is direct proof that a real file is
served and rendering, and `unloaded` on every face of a family is the signature of the
phantom.

| family | `@font-face` rules declared | faces reaching `status: loaded` | verdict |
|---|---:|---:|---|
| **Inter** | 135 | **4** (400, 500, 600, 700) | real file served — body face |
| **Mulish** | 88 | **4** (500, 600, 700, 800) | real file served — display face |
| Poppins | 39 | **3** (600, 700, 800) | real file served — a few widget nodes only |
| **Outfit** | 27 | **0** | **declared and never loaded — phantom** |
| `elementskit` | 3 | 1 | icon font, real file |
| `ElegantIcons` | 2 | 1 | icon font, real file |

Three findings, in order of how much damage each would have done:

1. **No font-substitution floor exists, and F-01 stands.** Mulish and Inter are both
   SIL OFL, served from `wp-content/uploads/elementor/google-fonts/` — Elementor's local
   Google Fonts cache, not a licensed self-hosted face. `D-11` does not fire. We import
   both through `next/font/google` and **heading metrics are expected to converge.** The
   h1 (Mulish 800, −2px tracking) is the most visually load-bearing element on the site and
   must never be excused by a floor.
2. **Outfit is the phantom here, and it gets nothing.** 27 `@font-face` rules, zero loaded
   faces, and it appears in no computed `font-family` on any rendered node at any of the
   three breakpoints. It is dead plugin CSS. **We do not import it, we do not substitute
   it, and it gets no floor** — booking one would be exactly the mistake this section
   exists to prevent.
3. **Poppins is real but marginal.** Three loaded weights on a handful of widget nodes.
   Not part of the extracted type scale (Prompt 1 §7 puts h1–h4 and body on Mulish/Inter),
   so it is not imported. If a Prompt 5 token turns out to need it, that is a token
   decision, not an asset one.

Icon fonts are the only fonts genuinely replaced: `elementskit` and `ElegantIcons` →
`lucide-react`, matching stroke width and box rather than exact glyph. **Icon glyph shape is
a floor; icon box and stroke weight are not** (F-01).

## Video

**None.** Zero `<video>` elements, zero `<source>` elements, zero poster stills across all
five pages at all three breakpoints. The "poster still only" rule has nothing to apply to.

## Icons

Five slots, all redrawn in `lucide-react`:

- three `home.trust-strip` badge illustrations, which under **D-14** become `TODO(fact):`
  chips at the same 100px box (FACT-01/02/03) — the glyph is a lucide icon, the words are
  a fact we do not have;
- two of the three Twemoji glyphs in the privacy policy body (phone, globe) at their exact
  14/15/16px boxes. **The third, the envelope, is deleted with the email address beside it
  under D-03** — it is in the DELETED table, not the ICON table.

## Logo

No logo file exists. Both slots ship a **wordmark set in the display font (Mulish 800)** at
the reference's rendered box — 164×55 / 470×157 / 221×74 in the header, 209×65 in the
footer — until a real asset is handed over. `TODO(fact): logo asset` is FACT-09 in
`docs/facts-needed.md`, and the logo gets its own entry in `docs/asset-prompts.md` at the
merged Prompt 10+11 turn (A-10), as a wordmark-plus-icon lockup with the applied palette
named.

One oddity worth recording rather than 'fixing': the header logo renders **470×157 at 768**
against 164×55 at 390 and 221×74 at 1440. That is the reference's own tablet-band scaling,
not a capture error — the same three numbers came back on two consecutive Prompt 1 runs.
Our header reproduces the box, not the anomaly's cause.
