# docs/facts-needed.md — every TODO(fact)

Anything not in `CLAUDE.md` CONSTANTS is never guessed. This file is appended to as the
build emits `TODO(fact):` markers inline, and it feeds `docs/PRE-LAUNCH.md`.

Known from the reference's structure before a line of page code exists — these slots have
a place in the layout and no legitimate content:

| id | route / section | what is needed | why it is blocked |
|---|---|---|---|
| FACT-01 | `/` `home.trust-strip` | badge 1 text + icon | D-14: licensed / bonded / insured cannot be claimed |
| FACT-02 | `/` `home.trust-strip` | badge 2 text + icon | D-14 |
| FACT-03 | `/` `home.trust-strip` | badge 3 text + icon | D-14 |
| FACT-04 | `/` `home.why-choose` | any credential or certification claim | D-14 |
| FACT-05 | `/` testimonials | real permissioned customer quotes | D-13: `[TESTIMONIAL PLACEHOLDER]` ships instead |
| FACT-06 | `/about` `about.story` | year founded | D-14/D-17 |
| FACT-07 | `/about` `about.story` | team size | D-14/D-17 |
| FACT-08 | `/about` `about.values` | certifications / affiliations | D-14 |
| FACT-09 | shell | logo asset (wordmark + icon lockup) | Appendix A: wordmark in the display font until a file exists |
| FACT-10 | all | response time / arrival window claims | D-14; the transparency proposition must not smuggle a speed claim |
| FACT-11 | all | warranty terms | D-14 |
| FACT-12 | all | service radius in miles | only the `SERVICE_AREA` sentence is licensed |

Counted, never invented, never removed. The acceptance sweep reports the count.

---

## Added at Prompt 2+3+4

The copy now exists, so these are no longer predictions — each one is a marker that ships
in `content/copy.ts` or a slot that ships empty.

| id | route / section | what is needed | why it is blocked |
|---|---|---|---|
| FACT-13 | `/` `home.trust-strip` | the same three chips, now with copy | The three cards carry literal `TODO(fact):` text at the reference's 171/150/161-character lengths, so the layout is tested honestly. Supersedes nothing; FACT-01/02/03 name the individual facts. |
| FACT-14 | `/about` `about.story` | founding story | Two of the section's three paragraphs are `TODO(fact):` markers written at the length of the paragraph they will replace (243 and 237 chars). Resolving FACT-06 and FACT-07 fills them. |
| FACT-15 | `/` `home.testimonials-head` | three testimonial bodies | The heading band is real copy. The cards below ship literal `[TESTIMONIAL PLACEHOLDER]` blocks **from the component, not from `copy.ts`** — deliberately, so the marker is not counted as prose by the length gate. D-13. |

## Facts the reference states and we deliberately do not

Recorded so a later turn does not "notice the gap" and fill it:

| they state | we ship | why |
|---|---|---|
| `License Number: 1122135` in the footer | nothing | D-14 / FACT-01. A licence number is the single most checkable false claim a contractor site can make. |
| "25+ years of experience", in the title tag, the meta description and three body sections | nothing | D-14 / FACT-06. |
| "GAF-certified" | nothing | D-14 / FACT-08. A manufacturer certification we do not hold. |
| "lifetime warranties" | nothing | D-14 / FACT-11. |
| "24/7 emergency" service | nothing | D-06. Our hours are 7:00–19:00, seven days, one block. The proposition also does not lead on speed — FACT-10. |
| an email address, in the footer and in the privacy policy | nothing | D-03, banned outright. |
| 26 city/neighbourhood pages and a service-area grid | the one `SERVICE_AREA` sentence | D-02. |

**Current open `TODO(fact)` count: 15.** Prompt 11 reports it.

---

## Confirmed at the Prompt 6+7 build wave — every marker SHIPS VISIBLY

The sections are now built, so each marker below is no longer a plan: it is rendered text a
visitor would read. That visibility is the point. A marker that is styled to disappear is
the same failure as inventing the fact, because nobody is prompted to supply it.

| id | where it now renders | what a reader sees |
|---|---|---|
| FACT-01/02/03/13 | `/` `home.trust-strip` | three `.factchip` boxes at the reference's own 100px badge height, each carrying its literal `TODO(fact): licence` / `insurance` / `affiliation` label and its explanatory note. The row is deliberately built and deliberately empty. |
| FACT-05/15 | `/` `home.testimonials-head` | three `.tphold` cards, each headed with the literal string `[TESTIMONIAL PLACEHOLDER]` above decorative grey bars. **No customer name, no quote, no star rating, no review count, and no `AggregateRating` or `Review` JSON-LD anywhere on the site** — verified by sweep. |
| FACT-06/07/14 | `/about` `about.story` | two of the section's three paragraphs are full `TODO(fact):` markers at the length of the paragraph they will replace. No founding year, no founder, no headcount, and no "our experienced team" hedge substituted for them. |
| FACT-04/08 | `/` `home.why-choose`, `/about` `about.values` | both sections were written to make a virtue of carrying no credential. `home.why-choose` opens by saying there is no certificate and no job count on the page *because* neither could be verified. Nothing was added to either. |
| FACT-09 | shell header and footer | the wordmark is set in the display font. No logo file exists. |
| FACT-10/11/12 | all five routes | no response time, no arrival window, no warranty term, no service radius in miles. The proposition is transparency and it never smuggles a speed claim; the only geographic statement anywhere is the single `SERVICE_AREA` sentence. |

**Nothing was invented to fill a slot during the build wave, and the count is unchanged at
15.** Two facts were checked for specifically because they are the ones a build tends to
invent under layout pressure — a founding year to fill a story column, and a badge to fill
a badge row — and both shipped as markers.

`docs/PRE-LAUNCH.md` section 5 carries the same list as a pre-public blocker.
