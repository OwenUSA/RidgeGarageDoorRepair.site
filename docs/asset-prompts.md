# docs/asset-prompts.md — image generation prompts (Prompt 10, OVERRIDE 2)

**Text only.** Nothing here was generated, sourced or downloaded. The operator runs these
through **Nano Banana Pro** and hands the files back; the terminal drop-in step (OVERRIDE 3)
mounts them and re-runs both render-truth gates on every affected band.

---

## 0. How to read an entry, and the four rules that apply to every one

**Dimensions are stated as plain text, per breakpoint.** Nano Banana Pro is told the exact
output pixel size in words — no aspect-ratio flag is used, because a flag rounds and the
slot boxes here do not.

**One prompt per slot. A second crop exists only where the slot changes aspect between
breakpoints** (the `aspect Δ` column in `assets/INVENTORY.md`). Where a slot holds its
aspect across all three widths there is one image and the browser scales it.

**The palette is named in every prompt.** Seed 79039, applied at token-write time, read
verbatim out of `app/globals.css`:

| role | token | hex | name to use in the prompt |
|---|---|---|---|
| primary | `--color-primary` | `#41434b` | **violet-slate** |
| primary deep | `--color-primary-deep` | `#0c0d0e` | near-black, violet-cast |
| accent | `--color-accent` | `#672b22` | **deep rust** |
| accent deep | `--color-accent-deep` | `#2a2727` | dark rust-brown |
| surface | `--color-surface` | `#ffffff` | white |
| neutral 200 | `--color-neutral-200` | `#f2f5ff` | palest lavender-tinted off-white |
| neutral 400 | `--color-neutral-400` | `#cbd4ee` | pale lavender-grey |
| neutral 600 | `--color-neutral-600` | `#61697f` | mid lavender-grey |
| neutral 900 | `--color-neutral-900` | `#21273b` | deep lavender-ink |

Neutrals carry a 3.7% chroma tint of the primary hue — they are **not** pure grey, and a
prompt that says "grey" gets back a colder image than the site. Say *lavender-tinted*.
If the hues are not named, images come back art-directed to a palette this site does not
use, and the whole point of seeding the palette is lost.

**Content bans, non-negotiable and repeated inside every prompt:** no readable text or
signage of any kind, no brand marks or logos, no vehicle license plates, no identifiable
faces, no company names on trucks, uniforms or equipment, no certification or association
badges, no star ratings, no price tags. Subject matter is **ours** — generic residential
and commercial garage doors, torsion springs, openers, cables, rollers, tracks, panels, and
an anonymous technician at work.

### Art direction, and where it comes from

The reference is behind a bot wall (A-15) and **not one byte of its imagery ever entered
this repo** (D-09), so the art direction below is reconstructed from what the Prompt 1
capture recorded rather than from looking at their photographs: the per-slot dominant
colours sampled from our own screenshots (`#505352`, `#67777f`, `#7d8d9a`, `#7f7c7e`,
`#84898a`, `#84898d`, `#95999e`, `#a9a59e` — a tight band of desaturated mid-greys around
L 55%, several with a faint blue cast), the `object-fit` and radius per slot, and the box
geometry. What that evidence supports, and what every prompt below therefore asks for:

- **Overcast or open-shade daylight.** No hard sun, no golden hour, no flash. Key tone
  lands mid-grey, roughly 50–60% luminance, which is what the sampled dominants show.
- **Documentary framing, eye level or slightly below.** Working distance, not editorial
  hero angles. No drone, no fisheye, no dutch tilt.
- **Shallow-to-moderate depth of field** on detail shots (spring, opener, roller, hands at
  work) — subject sharp, background falling off softly. Wide shots stay largely in focus.
- **Fine natural grain, minimal.** Photographic, not filmic; no added texture overlays, no
  vignette, no HDR halo, no oversharpening.
- **Desaturated, cool-neutral colour.** Let the site's deep rust be the only saturated thing
  on the page — the call CTA must stay the highest-chroma element (A-7). **An image with a
  saturated warm or red subject can break `cta-primacy` at drop-in.**

### Naming and delivery

Deliver as `<slot ID>-<W>x<H>.<ext>`, matching the placeholder filenames already in
`public/placeholders/` (e.g. `home.hero.art.svg` → `home.hero.art-577x607.webp`). WebP or
high-quality JPEG. sRGB. No embedded EXIF location.

---

## 1. `home.hero.art` — the one slot with no aspect change

| | |
|---|---|
| slot ID | `home.hero.art` |
| route | `/` |
| section | `home.hero` |
| dimensions | **1440: 1154 × 1214 px** (deliver at 2× the 577 × 607 CSS box) · **768: not rendered** · **390: not rendered** |
| aspect | 0.951 — portrait, very nearly square |
| object-fit | `auto` (the art column is dropped entirely below 1025px, see `app/sections.css`) |
| aspect Δ | **no** — one image, no second crop |

> A photograph of a modern two-car residential garage door on a suburban house, shot in
> flat overcast daylight, three-quarter view from the driveway at eye level. The door is a
> plain long-panel steel door in a **violet-slate `#41434b`** finish with slim frosted top
> lights; the surrounding trim and siding are **palest lavender-tinted off-white `#f2f5ff`**
> and **pale lavender-grey `#cbd4ee`**. A single small **deep rust `#672b22`** accent — a
> planter, a door mat, a stripe on a toolbag set on the driveway — and nothing else in the
> frame is saturated. Documentary photography, moderate depth of field, the door sharp and
> the street behind it softly out of focus. Fine natural grain, desaturated cool-neutral
> colour grading, no vignette. Portrait orientation, output exactly 1154 × 1214 pixels.
> The door is centred with generous headroom so the top third can be overlapped by text.
> Absolutely no text, no signage, no house numbers, no brand marks, no logos, no vehicles,
> no license plates, no people, no faces.

---

## 2. Photographic content slots

### 2.1 `home.services-grid.img1`

| | |
|---|---|
| route / section | `/` · `home.services-grid` |
| dimensions | **390: 338 × 360** · **768: 348 × 360** · **1440: 620 × 360** (deliver 2×: 1240 × 720) |
| aspect | 1.722 @1440 |
| object-fit | `fill` |
| radius | 0px |
| aspect Δ | **yes** — second crop below |

> A close documentary photograph of a garage door **torsion spring assembly** above a
> residential door: the wound spring on its shaft, centre bearing plate and cable drum,
> seen from below at a working angle. Overcast daylight through the open door, cool and
> even. The steel reads **mid lavender-grey `#61697f`** with darker **violet-slate
> `#41434b`** shadows; a faint **deep rust `#672b22`** oxidation on the older spring coil is
> the only warm note in the frame. Shallow depth of field, the spring's near coils sharp
> and the garage interior falling away softly. Fine natural grain, desaturated cool-neutral
> grade. Landscape, output exactly 1240 × 720 pixels. No text, no labels, no stickers with
> writing, no brand marks, no people, no faces.

**Second crop — 390 and 768 (aspect 0.939 / 0.967, near square):** same scene, same spring
assembly, same lighting and grade, recomposed tighter and more vertical so the shaft runs
corner to corner. Output exactly **676 × 720 pixels**.

### 2.2 `home.services-grid.img2`

| | |
|---|---|
| route / section | `/` · `home.services-grid` |
| dimensions | **390: 318 × 360** · **768: 328 × 360** · **1440: 600 × 360** (deliver 2×: 1200 × 720) |
| aspect | 1.667 @1440 · object-fit `fill` · radius 0px |
| aspect Δ | **yes** |

> A documentary photograph of a **belt-drive garage door opener** mounted to the ceiling
> joists of a residential garage — the motor housing, rail, trolley and the hanging
> emergency release cord — photographed from below and slightly to the side in cool, even
> open-shade light. The housing is **violet-slate `#41434b`**, the ceiling and joists
> **palest lavender-tinted off-white `#f2f5ff`**, shadows falling to **deep lavender-ink
> `#21273b`**. One **deep rust `#672b22`** element only: the release handle. Moderate depth
> of field, the motor sharp and the rail receding softly. Fine natural grain, desaturated
> cool-neutral grade, no flash. Landscape, output exactly 1200 × 720 pixels. No text on the
> housing, no model numbers, no warning labels with readable words, no brand marks, no
> people.

**Second crop — 390 and 768 (aspect 0.883 / 0.911):** the same opener, recomposed vertically
so the rail runs from the top of the frame down toward the door. Output exactly
**636 × 720 pixels**.

### 2.3 `home.services-grid.img3`

| | |
|---|---|
| route / section | `/` · `home.services-grid` |
| dimensions | **390: 318 × 186** · **768: 328 × 191** · **1440: 600 × 350** (deliver 2×: 1200 × 700) |
| aspect | 1.714, held at every width · object-fit `fill` · radius 0px |
| aspect Δ | **no** — one image |

> A close documentary photograph of a **garage door roller and track** at the point where
> the track curves toward horizontal: the nylon roller in its stem, the hinge, and the
> galvanised track, with a gloved hand steadying the panel edge at the edge of frame.
> Overcast daylight from the open bay, cool and diffuse. Galvanised metal reads **pale
> lavender-grey `#cbd4ee`** with **violet-slate `#41434b`** shadow; the glove is neutral,
> and a **deep rust `#672b22`** streak on the older track section is the only warm accent.
> Shallow depth of field on the roller, the track receding out of focus. Fine natural grain,
> desaturated cool-neutral grade. Landscape, output exactly 1200 × 700 pixels. Hand only —
> **no face, no head, no full body**, no text, no brand marks, no logos.

### 2.4 `home.services-grid.img4`

| | |
|---|---|
| route / section | `/` · `home.services-grid` |
| dimensions | **390: 318 × 186** · **768: 328 × 191** · **1440: 600 × 350** (deliver 2×: 1200 × 700) |
| aspect | 1.714, held at every width · object-fit `fill` · radius 0px |
| aspect Δ | **no** — one image |

> A documentary photograph of a **commercial roll-up door** on a small light-industrial
> unit, half raised, seen straight on from a few metres back in flat overcast daylight. The
> slat curtain is **violet-slate `#41434b`**, the surrounding wall **mid lavender-grey
> `#61697f`**, the concrete apron **pale lavender-grey `#cbd4ee`**. A single **deep rust
> `#672b22`** note on a bollard cap. Wide, largely in focus, slight fall-off at the edges.
> Fine natural grain, desaturated cool-neutral grade, no sun flare. Landscape, output
> exactly 1200 × 700 pixels. No unit numbers, no signage, no company names, no text of any
> kind, no vehicles, no license plates, no people.

### 2.5 `home.about-teaser.img`

| | |
|---|---|
| route / section | `/` · `home.about-teaser` |
| dimensions | **390: 342 × 175** · **768: 330 × 450** · **1440: 556 × 500** (deliver 2×: 1112 × 1000) |
| aspect | 1.112 @1440 · object-fit `cover` · radius 3px |
| aspect Δ | **yes** |

> A documentary photograph of an anonymous garage door technician **kneeling beside an open
> door track with a torsion bar and hand tools laid out on a canvas roll** on the driveway.
> Shot from behind and to the side at working height so **no face is visible at any point**.
> Plain dark work clothes, no logo, no name patch, no printed hi-vis lettering. Overcast
> daylight. Clothing and tools sit in **violet-slate `#41434b`** and **mid lavender-grey
> `#61697f`**; the door and house behind are **palest lavender-tinted off-white `#f2f5ff`**;
> a **deep rust `#672b22`** tool handle is the one warm accent. Moderate depth of field,
> technician and tools sharp, background soft. Fine natural grain, desaturated cool-neutral
> grade. Near-square landscape, output exactly 1112 × 1000 pixels. No face, no readable
> text, no brand marks, no vehicles, no license plates.

**Second crop — 390 (aspect 1.954, wide letterbox):** the same scene recomposed as a wide
horizontal band across the tools and the track, technician's hands only. Output exactly
**684 × 350 pixels**.

### 2.6 `home.commitment.img`

| | |
|---|---|
| route / section | `/` · `home.commitment` |
| dimensions | **390: 314 × 370** · **768: 688 × 370** · **1440: 566 × 370** (deliver 2×: 1132 × 740) |
| aspect | 1.53 @1440 · object-fit `fill` · radius 3px |
| aspect Δ | **yes** |

> A documentary photograph of **a garage door panel being replaced**: a single steel panel
> held upright in gloved hands against the partly-disassembled door, hinges visible along
> its edge. Open-shade daylight, cool and even. The panel is **violet-slate `#41434b`**, the
> garage interior **deep lavender-ink `#21273b`** in shadow and **pale lavender-grey
> `#cbd4ee`** where the light reaches; a **deep rust `#672b22`** mark on the panel being
> removed. Moderate depth of field. Fine natural grain, desaturated cool-neutral grade.
> Landscape, output exactly 1132 × 740 pixels. Gloved hands only — no face, no head — no
> text, no brand marks, no logos.

**Second crop — 390 (aspect 0.849, portrait):** the same panel and hinges recomposed
vertically, the panel edge running top to bottom. Output exactly **628 × 740 pixels**.

### 2.7 `home.performance-band.img`

| | |
|---|---|
| route / section | `/` · `home.performance-band` |
| dimensions | **390: 342 × 175** · **768: 330 × 450** · **1440: 620 × 550** (deliver 2×: 1240 × 1100) |
| aspect | 1.127 @1440 · object-fit `cover` · radius 3px |
| aspect Δ | **yes** |

> A documentary photograph of a **finished residential garage door seen closed from the
> driveway in flat overcast light**, three-quarter view, the driveway leading out of frame
> at the bottom. A quiet, resolved image — nothing in progress, no tools. Door in
> **violet-slate `#41434b`**, house trim in **palest lavender-tinted off-white `#f2f5ff`**,
> path and kerb in **pale lavender-grey `#cbd4ee`**, deepest shadows to **near-black
> `#0c0d0e`**. One **deep rust `#672b22`** accent in a planted border. Largely in focus,
> slight edge fall-off. Fine natural grain, desaturated cool-neutral grade. Near-square
> landscape, output exactly 1240 × 1100 pixels. No house numbers, no signage, no text, no
> brand marks, no vehicles, no license plates, no people.

**Second crop — 390 (aspect 1.954, wide letterbox):** the same door recomposed as a wide
horizontal band across the door face only. Output exactly **684 × 350 pixels**.

### 2.8 `home.components-grid.img1` — springs

| | |
|---|---|
| route / section | `/` · `home.components-grid` |
| dimensions | **390: 318 × 260** · **768: 205 × 260** · **1440: 387 × 260** (deliver 2×: 774 × 520) |
| aspect | 1.488 @1440 · object-fit `cover` · radius 0px |
| aspect Δ | **yes** |

> A tight product-documentary photograph of **two garage door torsion springs** resting on a
> clean workbench, one new and one fatigued with a visible gap in its coils. Soft overcast
> window light from the left, cool and even. Steel in **mid lavender-grey `#61697f`**,
> bench surface **pale lavender-grey `#cbd4ee`**, background falling to **violet-slate
> `#41434b`**; light **deep rust `#672b22`** oxidation on the older spring. Shallow depth of
> field along the coil. Fine natural grain, desaturated cool-neutral grade. Landscape,
> output exactly 774 × 520 pixels. No text, no printed labels, no colour-code paint stripes
> that read as branding, no brand marks, no people.

**Second crop — 768 (aspect 0.788, portrait):** the same two springs recomposed vertically,
coils running top to bottom. Output exactly **410 × 520 pixels**.

### 2.9 `home.components-grid.img2` — cables and drums

| | |
|---|---|
| route / section | `/` · `home.components-grid` |
| dimensions | **390: 318 × 260** · **768: 205 × 260** · **1440: 387 × 260** (deliver 2×: 774 × 520) |
| aspect | 1.488 @1440 · object-fit `cover` · radius 0px |
| aspect Δ | **yes** |

> A tight documentary photograph of a **garage door lift cable wound on its drum**, the
> braided steel cable running down out of frame, photographed close in soft overcast light.
> Cable and drum in **mid lavender-grey `#61697f`** and **violet-slate `#41434b`**, the wall
> behind in **palest lavender-tinted off-white `#f2f5ff`**; a **deep rust `#672b22`** flake
> on the drum's set screw. Very shallow depth of field on the cable strands. Fine natural
> grain, desaturated cool-neutral grade. Landscape, output exactly 774 × 520 pixels. No
> text, no labels, no brand marks, no people.

**Second crop — 768 (aspect 0.788, portrait):** the same cable and drum recomposed with the
cable running vertically through the frame. Output exactly **410 × 520 pixels**.

### 2.10 `home.components-grid.img3` — panels and tracks

| | |
|---|---|
| route / section | `/` · `home.components-grid` |
| dimensions | **390: 318 × 260** · **768: 205 × 260** · **1440: 387 × 260** (deliver 2×: 774 × 520) |
| aspect | 1.488 @1440 · object-fit `cover` · radius 0px |
| aspect Δ | **yes** |

> A tight documentary photograph of the **hinge and track junction between two garage door
> panels**, the seam running diagonally through the frame, in soft overcast light. Steel
> panel faces in **violet-slate `#41434b`**, galvanised hinge and track in **pale
> lavender-grey `#cbd4ee`**, the gap between panels falling to **near-black `#0c0d0e`**; one
> **deep rust `#672b22`** spot of wear at the hinge pin. Shallow depth of field. Fine natural
> grain, desaturated cool-neutral grade. Landscape, output exactly 774 × 520 pixels. No
> text, no stamped part numbers that read as words, no brand marks, no people.

**Second crop — 768 (aspect 0.788, portrait):** the same seam recomposed so it runs top to
bottom. Output exactly **410 × 520 pixels**.

### 2.11 `about.story.img`

| | |
|---|---|
| route / section | `/about` · `about.story` |
| dimensions | **390: 370 × 200** · **768: 364 × 450** · **1440: 620 × 450** (deliver 2×: 1240 × 900) |
| aspect | 1.378 @1440 · object-fit `cover` · radius 3px |
| aspect Δ | **yes** |

> A documentary photograph of **a tidy garage door service van interior with the rear doors
> open** — spring stock racked, cable spools, a track section, hand tools in labelled-free
> bins — photographed from outside in flat overcast daylight. The van interior is
> **violet-slate `#41434b`** and **deep lavender-ink `#21273b`**, the daylight edge **palest
> lavender-tinted off-white `#f2f5ff`**, the parts **mid lavender-grey `#61697f`**; one
> **deep rust `#672b22`** toolbox. Moderate depth of field. Fine natural grain, desaturated
> cool-neutral grade. Landscape, output exactly 1240 × 900 pixels. **No company name, no
> livery, no lettering of any kind on the van, no license plate, no people, no faces.**

**Second crop — 390 (aspect 1.85, wide letterbox):** the same racked stock recomposed as a
wide horizontal band. Output exactly **740 × 400 pixels**.

### 2.12 `about.values.img` — written, **not currently mounted**

| | |
|---|---|
| route / section | `/about` · `about.values` |
| dimensions | **390: 334 × 370** · **768: 324 × 370** · **1440: 544 × 370** (deliver 2×: 1088 × 740) |
| aspect | 1.47 @1440 · object-fit `fill` · radius 3px |
| aspect Δ | **yes** |
| status | **F-17** — the reference slot is a single image beside a four-card row; our four-up grid has no place for it without fighting the card heights. The prompt is written so the slot is not lost; **do not mount it without re-deciding the section's grid.** |

> A documentary photograph of **a technician's hands writing on a clipboard beside a
> partly-open garage door**, the door track and a removed roller visible in the background.
> Overcast daylight, cool and even. Clipboard and paper in **palest lavender-tinted
> off-white `#f2f5ff`**, clothing and door in **violet-slate `#41434b`**, background falling
> to **mid lavender-grey `#61697f`**; a **deep rust `#672b22`** pen barrel. Shallow depth of
> field on the hands. Fine natural grain, desaturated cool-neutral grade. Landscape, output
> exactly 1088 × 740 pixels. **Hands only — no face, no head.** The paper must be blank or
> illegible: **no readable writing, no forms, no prices, no figures, no brand marks.**

**Second crop — 390 and 768 (aspect 0.903 / 0.876, portrait):** the same hands and clipboard
recomposed vertically. Output exactly **668 × 740 pixels**.

---

## 3. The five deliberately-unapplied background slots — **F-17, special handling**

These five are recorded in `assets/INVENTORY.md` with a `section-average` dominant colour,
which per **F-12** means the Prompt 1 probe never saw the image decode and the fill fell back
to the average of a mostly-white band. All five placeholder fills are therefore near-white,
and a near-white background image beneath body text makes the band's painted contrast
**UNMEASURABLE**: `contrast.mjs` reports a `url()` background as unmeasurable by design
rather than assuming white, and `rendertruth.mjs` would then be scoring text against a tone
nobody chose. So all five bands currently render on their real token surfaces instead.

> **THE CONSTRAINT ON ALL FIVE PROMPTS BELOW, STATED TO THE GENERATOR AND CHECKED AT
> DROP-IN:** the delivered image must be **dark or high-contrast enough to carry body text
> laid over it**. Target a mean luminance of **L 20–35%** across the whole frame with no
> bright region above L 55% in the middle 60% of the width, where the copy sits. Deep,
> even, low-key. A pale or blown-out sky anywhere behind the text column is a rejection.
> **Each of these five is re-gated INDIVIDUALLY at drop-in** — mount one, run
> `contrast.mjs` and `rendertruth.mjs`, and keep it only if both stay at 0 FAIL / 0
> findings. Never mount all five and gate once: a single UNMEASURABLE band then hides
> behind four that happened to pass.

The bands already carry a token surface underneath (`data-surface`), so the image is an
overlay, not the only thing between text and white.

### 3.1 `about.page-hero.bg`

| | |
|---|---|
| route / section | `/about` · `about.page-hero` |
| dimensions | **390: 390 × 414** · **768: 768 × 387** · **1440: 1440 × 438** (deliver 2×: 2880 × 876) |
| aspect | 3.288 @1440 · object-fit `cover` · radius 0px · aspect Δ **yes** |

> A **low-key, dark** wide photograph of a residential garage interior at dusk with the door
> half open, looking out toward a dim driveway. Deep shadow dominates: **near-black
> `#0c0d0e`** and **deep lavender-ink `#21273b`** across most of the frame, with
> **violet-slate `#41434b`** on the door slats and only a restrained **mid lavender-grey
> `#61697f`** band of daylight low in the composition, kept to the outer thirds. A single
> small **deep rust `#672b22`** highlight. Overall mean luminance around 25%, nothing
> brighter than 55% luminance across the central 60% of the width, where headline and body
> text will sit. Even, calm, no hotspots, no lens flare, no bright sky. Fine natural grain,
> desaturated cool-neutral grade. Wide banner, output exactly 2880 × 876 pixels. No text, no
> signage, no house numbers, no brand marks, no vehicles, no license plates, no people.

**Second crop — 390 (aspect 0.942, near square):** the same dark interior recomposed
vertically, holding the same luminance ceiling. Output exactly **780 × 828 pixels**.

### 3.2 `services.page-hero.bg`

| | |
|---|---|
| route / section | `/services` · `services.page-hero` |
| dimensions | **390: 390 × 330** · **768: 768 × 365** · **1440: 1440 × 390** (deliver 2×: 2880 × 780) |
| aspect | 3.692 @1440 · object-fit `cover` · radius 0px · aspect Δ **yes** |

> A **low-key, dark** wide photograph of a wall of garage door hardware in a dim workshop —
> racked springs, coiled cable, stacked track — shot straight on with soft directional light
> from one side only. **Near-black `#0c0d0e`** background, **deep lavender-ink `#21273b`**
> mid-tones, **violet-slate `#41434b`** on the nearest steel, one **deep rust `#672b22`**
> accent. Mean luminance around 25–30%, nothing above 55% luminance in the central 60% of
> the frame. No windows, no bright sky, no hotspots. Fine natural grain, desaturated
> cool-neutral grade. Wide banner, output exactly 2880 × 780 pixels. No text, no labels, no
> part numbers, no brand marks, no people.

**Second crop — 390 (aspect 1.182):** the same hardware wall recomposed to a near-square
crop at the same luminance. Output exactly **780 × 660 pixels**.

### 3.3 `contact.page-hero.bg`

| | |
|---|---|
| route / section | `/contact` · `contact.page-hero` |
| dimensions | **390: 390 × 309** · **768: 768 × 342** · **1440: 1440 × 366** (deliver 2×: 2880 × 732) |
| aspect | 3.934 @1440 · object-fit `cover` · radius 0px · aspect Δ **yes** |

> A **low-key, dark** wide photograph of a suburban street of garages in the blue hour, seen
> from across the road, doors closed. **Near-black `#0c0d0e`** at the edges, **deep
> lavender-ink `#21273b`** through the frame, **violet-slate `#41434b`** on the door faces,
> a narrow **mid lavender-grey `#61697f`** band of remaining sky compressed into the top
> eighth only. One **deep rust `#672b22`** porch light. Mean luminance around 22–30%, nothing
> above 55% luminance across the central 60% of the width. No streetlight flare, no bright
> windows. Fine natural grain, desaturated cool-neutral grade. Wide banner, output exactly
> 2880 × 732 pixels. No text, no house numbers, no signage, no brand marks, no vehicles, no
> license plates, no people.

**Second crop — 390 (aspect 1.262):** the same street recomposed tighter on two garage
fronts, same luminance ceiling. Output exactly **780 × 618 pixels**.

### 3.4 `home.why-choose.bg`

| | |
|---|---|
| route / section | `/` · `home.why-choose` |
| dimensions | **390: 390 × 1143** · **768: 768 × 847** · **1440: 1440 × 1092** (deliver 2×: 2880 × 2184) |
| aspect | 1.319 @1440 · object-fit `cover` · radius 0px · aspect Δ **yes** |
| note | This band is **tall** — 1092px at 1440 and 1143px at 390. It sits behind a four-card reasons block, so the image must stay quiet across a large area and must not compete with the cards. |

> A **very low-key, near-abstract** photograph of a garage door's slat surface raking away
> from the camera in dim side light — texture, shadow line and repetition, no recognisable
> whole object. Almost entirely **near-black `#0c0d0e`** and **deep lavender-ink `#21273b`**,
> with **violet-slate `#41434b`** catching the slat edges and a single restrained **deep
> rust `#672b22`** glint. Mean luminance around 18–25%, flat and even, no bright region
> anywhere in the frame above 45% luminance. Deliberately uneventful — this is a textured
> ground for four cards of text, not a subject. Fine natural grain, desaturated cool-neutral
> grade. Output exactly 2880 × 2184 pixels. No text, no brand marks, no people, no objects
> that read as a logo.

**Second crop — 390 (aspect 0.341, tall portrait):** the same slat texture recomposed as a
tall vertical, same luminance ceiling. Output exactly **780 × 2286 pixels**.

### 3.5 `home.cta-band.bg`

| | |
|---|---|
| route / section | `/` · `home.cta-band` |
| dimensions | **390: 390 × 202** · **768: 768 × 229** · **1440: 1440 × 394** (deliver 2×: 2880 × 788) |
| aspect | 3.655 @1440 · object-fit `cover` · radius 0px · aspect Δ **yes** |
| note | **The highest-risk slot on the site.** This band already carries the `data-surface="gradient"` treatment (`--color-primary` → `--color-primary-deep`) and the call CTA sits on it. `cta-primacy` requires that **no other action on the page be more saturated than the call CTA** — so this image must be essentially colourless. If it comes back with any saturated area, reject it rather than adjusting the CTA. |

> A **very dark, near-monochrome** wide photograph of a closed garage door lit from one side
> at night, filling the frame edge to edge — a graphic band of horizontal slat lines and
> shadow. **Near-black `#0c0d0e`** through most of the frame with **deep lavender-ink
> `#21273b`** and **violet-slate `#41434b`** picking out the slat edges. **No saturated
> colour anywhere in the frame — no rust accent in this one**, deliberately, so that nothing
> competes with the deep rust `#672b22` call button that sits on top of it. Mean luminance
> around 15–22%, nothing above 40% luminance anywhere. Perfectly even left to right, no
> hotspot, no flare, no gradient toward a bright edge. Fine natural grain, fully desaturated
> cool-neutral grade. Wide banner, output exactly 2880 × 788 pixels. No text, no signage, no
> brand marks, no vehicles, no license plates, no people.

**Second crop — 390 (aspect 1.931):** the same slat band recomposed to a shorter, tighter
horizontal at the same luminance. Output exactly **780 × 404 pixels**.

---

## 4. The logo — wordmark plus icon lockup (resolves **FACT-09**)

| | |
|---|---|
| slot IDs | `shell.header.logo`, `shell.footer.logo` |
| routes | all five |
| section | shell header and shell footer (lead-owned, frozen — A-6) |
| dimensions | header **390: 164 × 55** · **768: 470 × 157** · **1440: 221 × 74**; footer **209 × 65 at every width**. Deliver 4× the largest box as a master: **1880 × 628 px** on transparent background, plus a **square icon-only lockup at 512 × 512 px**. |
| aspect | 2.99 (header 1440) · 3.21 (footer) · the 768 header box is the reference's own tablet-band scaling, reproduced as a box, not as a separate asset |
| object-fit | `contain` — it must never be cropped |
| display font | **Mulish 800 (ExtraBold)**, the site's display face, loaded via `next/font/google` and SIL OFL. Body face is Inter. |

> A flat vector wordmark-plus-icon lockup for a garage door repair company, on a fully
> transparent background. The icon sits left of the wordmark, vertically centred, separated
> by a clear space equal to the cap height.
>
> **Icon:** a minimal geometric mark reading as a garage door — a rounded-corner square
> arch, open at the bottom, crossed by three evenly-spaced horizontal slat lines, with the
> topmost line shortened to suggest a partly-raised door. Strokes are uniform weight,
> roughly 8% of the icon's height, with rounded caps, matching the stroke weight of
> `lucide-react` icons used elsewhere on the site. Icon fill **deep rust `#672b22`**;
> optionally the single topmost slat line in **violet-slate `#41434b`**. No gradient, no
> bevel, no drop shadow, no 3D, no glow.
>
> **Wordmark:** the two words **"Ridge"** and **"Garage Door Repair"** stacked — "Ridge" set
> large in a **geometric humanist sans, ExtraBold weight (Mulish 800 or an exact match for
> it)**, tight tracking of about −2%, in **near-black violet-cast `#0c0d0e`**; beneath it
> "GARAGE DOOR REPAIR" set small in the same family at Semibold, letterspaced about +8%, in
> **mid lavender-grey `#61697f`**. Both lines left-aligned to each other and optically
> aligned to the icon.
>
> Flat vector, crisp edges, no texture, no photographic element, no badge or shield
> surround, no ribbon, no est.-date, **no tagline, no phone number, no address, and no
> certification or association marks of any kind.** Output exactly 1880 × 628 pixels on
> transparent background.
>
> **Second deliverable — icon only, 512 × 512 pixels**, transparent background, the same
> mark centred with 12% padding on all sides. Used as the favicon and as the header mark
> below 768px.

**A one-colour variant is also needed**, same geometry, entire lockup in **white `#ffffff`**,
for the footer, which renders on `data-surface="deep"` (`#0c0d0e`). Deliver as
`shell.logo-white-1880x628.png`. Do **not** deliver a version in a colour outside the table
in section 0 — the applied palette is what every gated pair on this site was scored against.

---

## 5. Slots for which **no prompt was written**, and why

Refusing these is the point, not an omission. Every one of them is a slot a generator would
happily fill and a fabricated fact is what would come back.

| slot ID | route / section | why no prompt exists |
|---|---|---|
| `home.trust-strip.img1` | `/` · `home.trust-strip` | **D-14.** The reference's badge is a credential illustration. A plausible "licensed" badge is a **fabricated credential**, and it is fabricated the moment it is drawn, whatever the caption says. The slot stays a visible `TODO(fact):` chip at the reference's own 100px box. FACT-01. |
| `home.trust-strip.img2` | `/` · `home.trust-strip` | **D-14.** Same — insurance. FACT-02. |
| `home.trust-strip.img3` | `/` · `home.trust-strip` | **D-14.** Same — association or manufacturer affiliation. This is the one a sibling site nearly generated. FACT-03. |
| — | `/` · `home.testimonials-head` | **D-13.** No customer portraits, no headshots, no star-rating graphics, no review screenshots. The three cards ship literal `[TESTIMONIAL PLACEHOLDER]` blocks. A generated "happy customer" photograph is an invented person attached to an invented quote. FACT-05/15. |
| — | any | **No certification, award, BBB, warranty-seal or "years in business" graphic**, in any slot, in any style, including as an incidental element inside a photograph. This is why every prompt above bans badges in the frame as well as in the subject. |
| `privacy.body.phone-icon` | `/privacy` | Not a generated asset. Ships as a `lucide-react` glyph at the reference's exact 14 / 15 / 16px box. |
| `privacy.body.web-icon` | `/privacy` | Same — `lucide-react` at the same box. |
| `privacy.body.img2` | `/privacy` | **D-03.** Envelope glyph beside an email address. Both are deleted; there is nothing to fill. |
| `ref.band10.img1–3` | `/` | **D-01.** The blog teaser band is not built. |
| `ref.band13.img1–12` | `/` | **D-02 + D-09.** Every card is a city page and every image is theirs. The band is not built. |

Also deliberately absent from every prompt above, and worth stating because a generator
adds them unasked: **identifiable faces** (hands and backs of heads only), **license
plates**, **company livery or uniforms with lettering**, **readable paperwork**, **price
tags or figures**, and **any signage at all**.

---

## 6. Drop-in checklist (OVERRIDE 3, the terminal step)

1. Place files in `public/assets/` under the slot-ID filenames; leave
   `public/placeholders/` in place until each slot is switched, one at a time.
2. Mount **one** slot, rebuild (`pnpm build`), kill the port holder, `pnpm start`, and
   verify BOTH the page title and that the referenced stylesheet returns 200 before
   believing any gate — see `docs/shell-status.md`.
3. Re-run `contrast.mjs` and `rendertruth.mjs`. Both must read **0 FAIL / 0 findings**.
   Section 3's five background slots are gated **individually**, never as a batch.
4. If a background slot pushes a band to `UNMEASURABLE`, or if any image makes another
   action out-chroma the call CTA, **reject the image** — do not adjust the palette, the
   CTA, or the headings. F-16a records why that direction of fix is the wrong one.
5. Structural rows stay `BLOCKED/no-reference` throughout (**A-15**). Dropping in real
   artwork does not create a reference side and must not be reported as if it had.
6. Update `assets/INVENTORY.md` (acquired vs placeholder), close FACT-09 when the logo
   lands, and record the final gate numbers in `docs/known-divergence.md`.
