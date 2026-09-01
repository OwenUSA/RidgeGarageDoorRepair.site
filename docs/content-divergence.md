# docs/content-divergence.md — Prompt 3, the content gates

Written before any component consumes a word. All copy lives in `content/copy.ts`; this
file is the record of what was changed, by how much, and why.

Re-run the numbers with:

```bash
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs
```

Last run: **42/42 sections pass the 5-gram gate, 42/42 pass the trigram gate, 22/22
measured sections are inside ±10%, 11 sections are declared EXEMPT.** Raw output is
`.harness/similarity.txt`.

---

## ⚠ One conflict the owner has to settle — the proposition category

The turn instruction for this prompt said the proposition category is **workmanship — "the
repair holds up"**. `CLAUDE.md` §0 for *this* site says **transparency — "you are told what
is wrong and why"**, and adds "Held across all five routes."

They cannot both be held, so this was decided rather than stalled on, and the decision is
cheap to reverse because it is copy only. **Transparency was chosen**, on three pieces of
evidence internal to this repo:

1. `CONSTANTS → TAGLINE` is *"No mystery, no upsell, just the part that broke."* That is a
   transparency line, not a durability line, and it is the one string that appears on every
   route.
2. The already-committed `docs/sections.md` names the two required NOVEL additions
   `home.process` and `home.transparency`, and describes the second as a
   "diagnosis-before-quote band". A workmanship proposition would not need either.
3. "Workmanship — the repair holds up" is the verbatim proposition of the **Atlas** site in
   this programme. The most likely explanation is that the line was carried across when
   this turn's instruction was drafted, not that this site's own contract is wrong.

**If that is backwards, say so and it is one pass over `content/copy.ts`** — the section
count, the section order, the length targets and every structural decision below are
unaffected, because none of them depends on which of the two propositions is held.

Whichever wins: **neither leads on speed.** No response time, no arrival window, no "fast",
no "same day" appears anywhere in the copy. FACT-10 stays open.

---

## The four structural changes, named

### 1 — Reorder: five sections move, three would have sufficed

Reference home band order vs ours. Only the *relative* order matters; `home.hero` staying
first is not a failure to reorder, it is where a hero goes.

| our order | section | ref band | moved |
|---:|---|---:|---|
| 1 | `home.hero` | 1 | — |
| 2 | `home.transparency` | — | **added** |
| 3 | `home.services-grid` | 5 | **up**, 5th content band → 2nd |
| 4 | `home.process` | — | **added** |
| 5 | `home.about-teaser` | 3 | **down**, 2nd → 5th |
| 6 | `home.components-grid` | 9 | **up**, 8th → 6th |
| 7 | `home.expertise-band` | 6 | down one |
| 8 | `home.why-choose` | 11 | up |
| 9 | `home.commitment` | 7 | down |
| 10 | `home.performance-band` | 8 | down |
| 11 | `home.trust-strip` | 2 | **down**, 1st → 10th |
| 12 | `home.testimonials-head` | 4 | **down**, 3rd → 11th |
| 13 | `home.cta-band` | 15 | — |
| 14 | `home.map` | 16 | — |

**Five sections move by more than one position:** services-grid, about-teaser,
components-grid, trust-strip, testimonials-head. The gate asks for three.

Two of those moves carry an argument rather than being shuffling for its own sake:

- **`home.trust-strip` drops from band 2 to position 10.** On the reference it is the first
  thing under the hero, which is where you put badges when badges are the proposition. Under
  D-14 ours are three `TODO(fact):` chips with nothing in them. Leaving an empty
  credential row in the second screen position would be the single most conspicuous hole on
  the site, and it would also be arguing for the *reference's* proposition in our layout.
- **`home.services-grid` climbs to position 3.** With services regrouped by symptom (change
  4), the grid stops being a catalogue and becomes the fastest route from "my door is doing
  X" to "here is who to call about X". That belongs immediately under the hero.

**This is measurement-safe under A-12.** `position` is an ADVISORY comparator field — it is
computed and reported per row but never contributes to the deviation percentage. Reordering
therefore cannot inflate a structural residual, which is exactly why A-12 matters here.

### 2 — Two reference sections dropped, two of our own added

**Dropped:**

| ref band | what it was | why |
|---:|---|---|
| 10 | "Blog & Roofing Tips" — a three-card blog teaser | **D-01.** There is no blog and no sixth route. Nothing replaces it in place. |
| 12 + 13 | "Our Recent Projects" heading + 12 project cards | **D-09 and D-02 together.** Every card is one of their photographs, and every card is titled with a neighbourhood — it is the city grid wearing a portfolio costume. Deleting the row is not enough; the scrub list in `docs/sections.md` covers the rest. |

Band 14 (their home-page FAQ) is **MOVED**, not dropped — it becomes `services.faq`,
in-page on `/services` only, per the pre-answered constants. It is not counted toward the
two required drops.

**Added:**

| our section | what it is | why it earns the space |
|---|---|---|
| `home.transparency` | "You get to see the part that failed" — three short cards: the old part stays with you, the reason precedes the quote, a repair we would skip we say so | The proposition dies if the diagnosis stays inside the van. It gets its own band early rather than a sentence buried in a services paragraph. |
| `home.process` | "What actually happens after you call" — four numbered steps from symptom to consent | Turns the claim into a sequence a customer can hold us to. A stated value nobody can catch you breaking is decoration. |

Both are **NOVEL**: no reference counterpart, no pixel diff, no length target — measured on
token conformance at zero violations, once, at 1440 (F-08 / A-9).

### 3 — Proposition: transparency, on all five routes

Not a tagline in a hero, a constraint on every block. Where it shows up per route:

| route | how it is carried |
|---|---|
| `/` | hero leads on seeing the failed part; `home.transparency` and `home.process` are built around it; `home.why-choose` opens by *refusing* to print a job count |
| `/about` | `about.story` ships `TODO(fact):` markers for founding year and team size rather than a plausible story; `about.values` is four checkable rules, not four abstract nouns |
| `/services` | symptom grouping is itself the proposition — the customer's words first, the part name second |
| `/contact` | "a description of the sound your door is making is worth more than any form field" |
| `/privacy` | the policy describes what the site does *not* run, in specifics, rather than describing cookies we did not ship (D-15/D-16) |

### 4 — Services regrouped by symptom

The reference groups by system and material: Residential / Commercial, then Asphalt / Tile /
Metal. Ours groups by what made you go and look at the door. All eight contracted services
are present; none is dropped, none is invented.

| symptom group | services underneath |
|---|---|
| **"The door will not close, or it reverses partway down"** | off-track and misaligned door correction; cable / roller / track repair |
| **"It came down hard, and now the door will not lift at all"** | spring repair and replacement |
| **"The opener runs but nothing moves, or the door is loud"** | opener repair and installation; annual maintenance and tune-up |
| **"The door itself is damaged, dented, or simply finished"** | panel replacement; new residential door installation; commercial and roll-up doors |

Four groups, and that is not arbitrary: the reference's `home.services-grid` renders exactly
four image slots (`img1`–`img4`, two at 360px tall and two at 186/191/350px). One group per
slot means the grid geometry the diff measures is unchanged while the information inside it
is completely different — which is the whole point of the exercise.

The same four groups carry `/services`, expanded, with an in-page anchor each.

---

## Per-section overlap and length

Every row: shared 5-grams against the **entire** reference corpus (target 0) and trigram
Jaccard against the **paired** reference section after stopwords and the industry allowlist
(target ≤ 0.15). `Δ%` is character count against the paired reference slot (target ±10%).

| route | section | ref band | our chars | ref chars | Δ% | 5-grams | trigram | status |
|---|---|---|---:|---:|---:|---:|---:|---|
| / | `shell.header` | s00 | 107 | 2109 | −94.9 | 0 | 0.000 | **EXEMPT** |
| / | `home.hero` | s01 | 400 | 376 | +6.4 | 0 | 0.000 | PASS |
| / | `home.transparency` | — | 777 | — | — | 0 | 0.000 | PASS (NOVEL) |
| / | `home.services-grid` | s05 | 2499 | 2550 | −2.0 | 0 | 0.000 | PASS |
| / | `home.process` | — | 649 | — | — | 0 | 0.000 | PASS (NOVEL) |
| / | `home.about-teaser` | s03 | 754 | 805 | −6.3 | 0 | 0.000 | PASS |
| / | `home.components-grid` | s09 | 1589 | 1735 | −8.4 | 0 | 0.000 | PASS |
| / | `home.expertise-band` | s06 | 402 | 366 | +9.8 | 0 | 0.000 | PASS |
| / | `home.why-choose` | s11 | 847 | 935 | −9.4 | 0 | 0.000 | PASS |
| / | `home.commitment` | s07 | 1080 | 1079 | +0.1 | 0 | 0.000 | PASS |
| / | `home.performance-band` | s08 | 382 | 392 | −2.6 | 0 | 0.000 | PASS |
| / | `home.trust-strip` | s02 | 563 | 516 | +9.1 | 0 | 0.000 | PASS |
| / | `home.testimonials-head` | s04 | 197 | 200 | −1.5 | 0 | 0.000 | PASS |
| / | `home.cta-band` | s15 | 42 | 40 | +5.0 | 0 | 0.000 | PASS |
| / | `home.map` | s16 | 598 | 613 | −2.4 | 0 | 0.000 | PASS |
| / | `shell.footer` | s17 | 250 | 330 | −24.2 | 0 | 0.000 | **EXEMPT** |
| / | (metadata) | — | 227 | — | — | 0 | 0.000 | PASS |
| /about | `about.page-hero` | s01 | 552 | 566 | −2.5 | 0 | 0.000 | PASS |
| /about | `about.story` | s02 | 632 | 632 | 0.0 | 0 | 0.000 | PASS |
| /about | `about.values` | s03 | 838 | 811 | +3.3 | 0 | 0.000 | PASS |
| /about | `about.cta-band` | s04 | 453 | 435 | +4.1 | 0 | 0.000 | PASS |
| /about | (metadata) | — | 210 | — | — | 0 | 0.000 | PASS |
| /services | `services.page-hero` | s01 | 408 | 427 | −4.4 | 0 | 0.000 | PASS |
| /services | `services.list` | s02 | 204 | 218 | −6.4 | 0 | 0.000 | PASS |
| /services | `services.symptoms` | — | 1488 | — | — | 0 | 0.000 | PASS (NOVEL) |
| /services | `services.faq` | — | 2319 | — | — | 0 | 0.000 | PASS (NOVEL) |
| /services | `services.cta-band` | s03 | 310 | 318 | −2.5 | 0 | 0.000 | PASS |
| /services | (metadata) | — | 231 | — | — | 0 | 0.000 | PASS |
| /contact | `contact.page-hero` | s01 | 386 | 353 | +9.3 | 0 | 0.000 | PASS |
| /contact | `contact.form-block` | s02 | 387 | 399 | −3.0 | 0 | 0.000 | PASS |
| /contact | `contact.map` | s03 | 189 | 0 | +∞ | 0 | 0.000 | **EXEMPT** |
| /contact | (metadata) | — | 203 | — | — | 0 | 0.000 | PASS |
| /privacy | `privacy.body` | s01 | 3780 | 3450 | +9.6 | 0 | 0.002 | PASS |
| /privacy | (metadata) | — | 212 | — | — | 0 | 0.002 | PASS |

`shell.header` and `shell.footer` appear on all five routes and report identically; the
four repeats are omitted above and are in `.harness/similarity.txt`.

**Every trigram figure is ≤ 0.002.** That is not a near miss on 0.15, it is the signature of
two texts about different trades — roofing nouns and garage-door nouns share almost no
content trigrams once stopwords go. The gate that did real work here was the **5-gram** one,
which caught exactly one lift on the first run: `"we are not responsible for"`, in the
privacy policy's third-party-links clause. That is the boilerplate phrase every privacy
policy on the internet shares, which is precisely why it is worth catching — it reached the
draft because it is the obvious way to write that sentence, not because anything was copied,
and it is now reworded.

---

## Length exemptions — three, each with a reason the rule cannot apply

Declared in `harness.config.mjs → lengthExempt` so Prompt 11 reports them as **EXEMPT**,
never as PASS. Nothing is exempt for being hard to hit.

### `*::shell.header` — −94.9% (107 vs 2109)

The reference nav is 19 links, including a 16-item services mega-menu and a path into 26
city pages. **2,072 of its 2,109 characters are that tree.** D-02 deletes the city pages and
D-01 fixes us at five flat routes, so there is no version of our header that is 2,109
characters without re-inventing the thing the decision register deleted. The header is
measured on the 104/85px bar geometry (`02-header.md`), not on its character count.

### `*::shell.footer` — −24.2% (250 vs 330)

Their footer's 330 characters include an email address (banned outright, D-03), the string
`"License Number: 1122135"` (a fact we do not have, D-14 / FACT-01), a Terms and Conditions
route (not one of our five, D-01), and a four-item column naming their own services. Strip
those and what remains is our NAP, hours, service-area sentence and five route links.
Padding it back to 330 would mean inventing one of the four things that were removed.

### `/contact::contact.map` — +∞ (189 vs 0)

The reference band is a bare Google Maps iframe with **zero text nodes**. A percentage
against a zero denominator does not exist. D-07 and D-08 require our map to carry the
address as real text beside the frame, plus a labelled directions link, because the iframe
is opaque to assistive tech (`07-map-lazy-mount.md`). The reference's own accessibility gap
is not a length target.

### Considered and deliberately NOT exempted

- **`/contact::contact.form-block`.** Their block carries SMS-consent copy tied to a form we
  are not building, which looked like a legitimate exemption. It was not needed — our five
  labelled fields, helper text and confirmation state land at 387 against 399, **−3.0%**.
  An exemption that is not needed is an exemption that hides a future regression.
- **`/privacy::privacy.body`.** Their policy has SMS, cookie and email sections we cannot
  reproduce, so a shortfall looked inevitable. In the end ours came in +9.6% — *long*, not
  short — because a policy that describes what a site does **not** run has to be specific to
  be worth anything. It is measured, not excused.

---

## Reclassification — FIDELITY → ADAPTED

**No section changed class in this pass, and the reason is that there was nothing to
change.** `docs/sections.md` already recorded, at Prompt 1, that **this build has zero
FIDELITY sections**: every retained band carries our business name, phone, hours, copy, or a
placeholder where their photograph was, so none satisfies "content is structurally
equivalent". The FIDELITY → ADAPTED migration this prompt exists to force had already
happened, before the copy was written.

What this pass *did* change in `docs/sections.md` is a different thing and is recorded there
in full:

| section | was | now | why |
|---|---|---|---|
| `services.list` | ADAPTED, "the eight services with in-page anchors" | ADAPTED, **heading and intro only** | Measurement, not classification. The reference `/services` page is thin: five bands, and band 2 is a heading plus one 164-character paragraph. Its actual services live on its home page. Loading eight services into a 218-character slot would have blown the length gate by ~600%. |
| `services.symptoms` | did not exist | **NOVEL** | The eight services in four symptom groups. It has no reference counterpart at any position, so it is token-conformance measured, like the two home-page additions. |
| `home.commitment` | "3-card block with an image" | unchanged class, structure recorded | Confirmed as h2 + three h4 cards + a closing paragraph, from the reference band's own heading/paragraph counts. |
| `home.why-choose` | "4-card reasons block" | unchanged class, structure recorded | Reference band is one h2 + an intro paragraph + four reason paragraphs, not four headed cards. Ours matches that shape. |

Splitting `services.list` is the one decision here a reviewer should push back on if they
are going to push back on anything. The alternative was to keep the eight services inside
`services.list` and declare a fourth length exemption — and that is the failure mode
`CLAUDE.md` names: using a classification to dodge a measurement. Making the extra content
NOVEL leaves the paired slot honestly measurable at ±10% *and* still measures the new block,
just against tokens instead of against a band that does not exist.

---

## SEO metadata — same pass, same gates

| route | title | chars | description chars |
|---|---|---:|---:|
| `/` | Garage Door Repair in Yukon, OK \| Ridge Garage Door Repair | 58 | 166 |
| `/about` | About Ridge Garage Door Repair \| Yukon, OK | 42 | 163 |
| `/services` | Garage Door Services in Yukon, OK \| Ridge Garage Door Repair | 60 | 166 |
| `/contact` | Contact Ridge Garage Door Repair \| Yukon, OK | 44 | 158 |
| `/privacy` | Privacy Policy \| Ridge Garage Door Repair | 41 | 168 |

All five pass the 5-gram gate against the whole corpus and score ≤ 0.002 trigram against
their page's joined reference text. Metadata rows carry no length target — the reference's
own titles run 29–78 characters and its `/privacy` description is 19 characters, which is a
defect rather than a target.

No description contains a price, a credential, a review count, a response time or an `@`.

---

## What copy is deliberately not real

- **`home.trust-strip`** — three `TODO(fact):` chips at the reference's own 100px box.
  FACT-01/02/03. Licence, insurance, affiliation. None invented.
- **`home.testimonials-head`** — the heading band is real copy; the cards below it ship
  literal `[TESTIMONIAL PLACEHOLDER]` blocks from the component, not from `copy.ts`, so the
  marker is not counted as prose. FACT-05. **No `AggregateRating` or `Review` JSON-LD at
  all** (D-13).
- **`about.story`** — two of its three paragraphs are `TODO(fact):` markers written at the
  length of the paragraph they will replace, so the layout is tested honestly. FACT-06
  (founding year), FACT-07 (team size).
- **No licence number anywhere.** The reference prints one in its footer. Ours does not get
  one, invented or otherwise.
