# docs/profile.md — reference profile and measurement axes

`REFERENCE = https://costarroofinginc.com/`
Captured 2026-09-01 with Playwright/Chromium 151, three breakpoints, post-hydration.
Raw traces: `.harness/profile/*.json`, `.harness/state/*.json`. Do not `cat` them.

---

## 1. What the reference is

WordPress 7.1 + **Elementor** (hello-elementor theme) with the **ElementsKit** widget pack.
Top-level bands are `.elementor-top-section` (v2) and `.e-con.e-parent` (v3 flex
containers) — the harness segments on exactly those, which is why section indices are
stable across runs.

**Access:** HTTP 200 headless on the first try, every page, every breakpoint. No bot wall,
no Cloudflare challenge, no auth, no geo gate. The headed-retry and local-copy fallbacks
decided up front in `CLAUDE.md` were never needed.

**Static or fetched:** fully static server-rendered HTML. No client fetch populates
content. Nothing is behind auth.

### One hydration trap, and it is load-bearing

The ElementsKit FAQ accordion ships **every panel expanded in the HTML** and collapses them
once its JS runs. Measuring before that lands reads a page height of **33,382px**; after it
lands, **16,571px** — the same page, off by 2×. `harness/lib.mjs → settle()` now waits for
`networkidle` + 600ms *before* the reveal scroll for this reason. Every number in this file
is post-hydration, and two consecutive runs produced byte-identical band heights.

---

## 2. Page height and section count, per page, per breakpoint

Every page listed is one we draw from. `sections` = outermost bands.

| reference page | our route | sections | h @390 | h @768 | h @1440 |
|---|---|---:|---:|---:|---:|
| `/` | `/` | 18 | 22379 | 17031 | 16571 |
| `/about-us/` | `/about` | 6 | 4737 | 4145 | 3008 |
| `/services/` | `/services` | 5 | 3841 | 2369 | 1848 |
| `/contact-us/` | `/contact` | 5 | 3253 | 2737 | 2313 |
| `/privacy-policy/` | `/privacy` | 3 | 3888 | 3414 | 3194 |

**All five of our routes have a real reference counterpart.** The Appendix A "the reference
is a one-pager, where do the subpages come from" branch does not apply here — subpages are
not composed from a section vocabulary, they are cloned from their own pages. They are
still ADAPTED, because the copy and the business facts change, not because there is nothing
to measure against.

The home page is a 16.5k-pixel-tall one-page funnel: 18 bands, 45 images, an FAQ wall, a
blog teaser, a project grid and a city-link block. Six of those bands do not survive our
decision register (§4).

---

## 3. Breakpoints in the CSS

33 distinct width media queries across the five pages, most of them Elementor/plugin
boilerplate (including malformed `(min-width:-1)` and `(max-width:-1)` rules that never
match anything). The **load-bearing** set is small:

| query | what changes |
|---|---|
| `max-width: 767px` / `min-width: 768px` | primary restack; desktop nav → hamburger |
| `max-width: 1024px` / `min-width: 1025px` | tablet column collapse |
| `min-width: 1200px` | container settles at its 1280px max |

Also present and deliberately **not** captured, per the cost-discipline rule:
`479/480/575/576/766/820/991/992/1536/1537`.

**`BP_SET = 390, 768, 1440` is unchanged and sufficient.** 390 is below the 767 restack,
768 sits exactly on the tablet edge where the restack resolves, 1440 is past 1200 where the
container is at max width. Recording the others here and moving on.

Container: **1280px max**, full-bleed below that (390→390, 768→768, 1440→1280).

---

## 4. Motion — measured, and the answer is "there is none"

This is the part where a clone harness usually over-invests. It should not here.

| probe | result |
|---|---|
| animation libraries on `window` | gsap ✗ ScrollTrigger ✗ Lenis ✗ Locomotive ✗ Framer ✗ AOS ✗ Swiper ✗ Slick ✗ WOW ✗ |
| elements with a CSS `animation-name` | **0** |
| elements with a non-zero `transition-duration` | 152 |
| `will-change` declarations | 0 |
| rAF sample during a slow 3px/frame scroll of the whole page | 25 candidate elements tracked over 901 frames — **0 moved** |
| same 25 elements sampled at rest for 500ms | **0 moved** |

**Nothing on this site is scroll-linked and nothing is time-driven.** The 152 transitions
are all hover/open/close state changes. There are no staggers, no reveals, no parallax, no
split-text headings, no carousels, no video.

**Consequence, stated explicitly as the allowlist requires: `framer-motion` is NOT
justified and will NOT be installed.** CSS transitions cover 100% of what the reference
does. No rAF traces will be produced for the rest of this run — there is nothing to trace.

---

## 5. Measurement axes — what is captured and what is skipped

**Captured**, because this is a density / responsive / state site:

- **Geometry** — section box, absolute Y, padding, inner container box, gap, computed
  `display` and `grid-template-columns`, child count, rows, items-per-row.
- **Static appearance** — resolved color and background-color, font family / size / weight
  / line-height / letter-spacing / text-transform per heading level and body, border
  widths, shadows, radii, `object-fit`, image box vs natural size.
- **Responsive** — the entire pass repeated at all three of `BP_SET`.
- **Interactive state** — each state captured as its own reference (§6).
- **Content volume** — heading and body character counts per section, so Prompt 3's ±10%
  length rule is measurable rather than asserted.

**Skipped, deliberately:**

- **rAF motion traces.** §4. Nothing moves. This is the single largest artifact the
  harness can produce and it would be 100% noise.
- **Hover states below 768px.** Per Appendix A.
- **The 30 non-load-bearing media queries.** §3.
- **430px.** `process.md` STEP B suggests adding it beside 390; `CLAUDE.md` fixes `BP_SET`
  at three and says each extra breakpoint multiplies every capture, diff and report for the
  rest of the run. The contract wins. 390 and 430 are on the same side of every media query
  this site has, so 430 would measure the same layout twice.

---

## 6. State — this is where the difficulty actually is

From `.harness/state/ref-390.json` and `ref-1440.json`.

**Header: NOT sticky.** `position: static` at rest *and* after scrolling 900px; no class
swap, no shadow change, no transform. Height 104px desktop / 85px mobile, white background,
no shadow. Per Appendix A ("should the header shrink on scroll? Only if the reference
does") — **ours is static too**.

**Mobile nav drawer** (`.elementor-menu-toggle` → `nav.elementor-nav-menu--dropdown`):
absolute, `z-index: 9997`, animated on **`max-height` + `scaleY`**, `0.3s ease`. No body
scroll lock (`overflow: visible`, `position: static` while open). **Does not close on
`Escape`.** 19 links.

This is the one place the reference is a worked example of what `process.md` Prompt 4
explicitly forbids — animating `max-height` and killing the exit transition. Our drawer is a
deliberate behavioral divergence: compositor properties only, real body-scroll lock, Escape
and backdrop and route-change close, focus trap. Five links, not 19. Recorded in
`docs/known-divergence.md` as intentional, not as a miss.

**FAQ accordion**: ElementsKit, Bootstrap-collapse pattern
(`a.ekit-accordion--toggler` / `.elementskit-card-body`), `aria-expanded` present, first
item open by default. 7 items.

**Primary CTA**: 200×46, radius 3px, padding 15/30, 16px/400, `#064D2A` → hover `#27282A`,
`all 0.3s ease`. Focus state is the **browser default outline only** — a WCAG 2.2 AA gap we
do not reproduce (D-19).

**Form** (reference `/contact-us/`): three fields — name, **email (required)**, message.
Input 47px tall, radius 3px, bg `#F2F6F9`, 1px border in the same color, 16px text, 16px
left padding, no visible focus style beyond the UA outline. Our form replaces this
wholesale per D-05 — name, phone, service, callback window, message, **no email field** —
so it is ADAPTED on geometry only.

**No fixed or sticky elements anywhere**, at any breakpoint. The reference has **no mobile
sticky call bar**. Ours does (D-04). That is an addition, not a divergence to close.

**Maps**: one `maps.google.com` iframe. Confirms D-08's shape is native to the category.

**Data-driven lists**: none. Every list is authored, no empty or loading state exists.

---

## 7. Type and color, as observed

Fonts are **Mulish** (display/headings) and **Inter** (body), plus Poppins and Outfit on a
handful of widget nodes. All are served from
`wp-content/uploads/elementor/google-fonts/…` — Elementor's local Google Fonts cache, with
real font files present.

**No licensed self-hosted face is in use, so there is NO font-substitution floor.** We use
Mulish and Inter directly via `next/font/google` (both SIL OFL) and headings are expected to
converge on metrics rather than being excused. `D-11` does not fire. The only fonts we do
replace are the two icon fonts, `elementskit` and `ElegantIcons` → `lucide-react`, matching
stroke weight and size rather than glyph.

Type scale, `390 / 768 / 1440`:

| role | family | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| h1 | Mulish | 28 / 36 / 48 | 800 | 1.10 | −2px |
| h2 | Mulish | 18 / 18 / 24 | 700 | 1.30 | normal |
| eyebrow | Mulish | 14 / 16 / 16–17 | 700 | 1.25 | 0.5px, often uppercase |
| body | Inter | 14 / 15 / 16 | 400 | 1.50 | normal |

Observed color ramp: body `#696969`, ink `#27282A`, white, primary green `#064D2A`,
accent green `#03A143`, surface `#F2F6F9`, muted `#CCD6DF`.
Radii: 3px, 5px. Shadows: `0 30px 60px rgba(0,0,0,.1)` and `0 10px 30px 10px rgba(0,0,0,.05)`.

Machine-readable set: `harness/tokens.json` (via `node harness/tokens.mjs`). Prompt 5
curates it into CSS custom properties + the Tailwind `@theme` block. **The color ramp above
is the reference's and is replaced wholesale by the randomized palette.**

---

## 8. The instrument

| file | does |
|---|---|
| `harness/lib.mjs` | browser/context/settle/freeze plumbing |
| `harness/bands.mjs` | section segmentation + the structural metric vector |
| `harness/profile.mjs` | STEP A, this document's numbers |
| `harness/capture.mjs` | STEP B, `--side --route --bp [--section]` |
| `harness/state.mjs` | STEP B interactive state, per breakpoint |
| `harness/tokens.mjs` | extracts `harness/tokens.json` |
| `harness/diff.mjs` | STEP C, all three metrics, `--route --bp [--section] [--pixel]` |
| `harness/sections.json` | machine twin of `docs/sections.md` |

`--route` takes `root` as the shell-safe alias for `/` (Git Bash rewrites a bare `/`
argument into a Windows path). Every pass writes to `.harness/` and prints one summary
line. Screenshots are never opened to evaluate a number.

**Proof all three modes run** (empty scaffold vs reference, `/privacy` @1440):

```
route     | section      | bp   | class   | metric      | value | th | status
/privacy  | shell.footer | 1440 | ADAPTED | struct-dev% | 49.24 | 5  | FAIL  [pixel 98.55%]
/privacy  | shell.header | 1440 | ADAPTED | struct-dev% | 83.90 | 5  | FAIL  [pixel 12.13%]
/privacy  | privacy.body | 1440 | NOVEL   | token-viol  | 1     | 0  | FAIL  [pixel 7.22%]
```

Pixel, structural and token modes all return real numbers against a real scaffold.
