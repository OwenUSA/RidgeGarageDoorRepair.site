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
