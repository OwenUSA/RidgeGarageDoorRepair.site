# docs/divergence.md - the divergence table

Written by the lead at the end of the merged **Prompt 6+7 build wave**, 2026-09-01.

## READ THIS BEFORE QUOTING A NUMBER FROM THIS FILE

There are no structural numbers in this table and there never will be. Per amendment
**A-15**, this site's reference (`costarroofinginc.com`) is behind a bot-challenge
interstitial - verified directly with a normal desktop user agent, which returns
`<title>One moment, please...</title>` and roughly 7 KB of body - and **this site kept no
usable local copy of the reference pages.** No reference-side capture can be produced
again, so no structural or pixel comparison against the reference exists.

Every ADAPTED row below therefore reads `BLOCKED/no-reference`.

> **A BLOCKED row is an absence, not a pass.** It carries no value, and no threshold was
> applied to it. Do not read a BLOCKED row as "within tolerance", do not aggregate BLOCKED
> rows into a pass rate, and do not quote the `5` in the threshold column as though
> something had been measured against it - it is the threshold that *would* have applied.

No converter was written to back-fill the missing metric fields from the Prompt 1 legacy
capture, and none may be. Those fields would be invented, and invented numbers that look
like measurements are worse than no measurement, because the next reader cannot tell the
difference.

**What still gates this build** are the render-truth gates, which need no reference side.
All of them are green as of this table:

| gate | result | required |
|---|---|---|
| `contrast.mjs` - gradient-aware WCAG AA on declared CSS | **1031 scored, 0 FAIL, 0 UNMEASURABLE** | 0 FAIL |
| `rendertruth.mjs` - painted legibility, CTA primacy, WCAG 2.5.8 tap targets | **0 findings** | 0 findings |
| token conformance, the 5 NOVEL sections | **0 violations** | 0 |
| `pnpm build` | clean, 6 static routes, no type or lint error | clean |
| email sweep (D-03) | EMAIL SWEEP CLEAN | empty |
| locations sweep (D-02) | clean; only the SERVICE_AREA sentence survives | clean |
| NAP consistency, all five routes | phone, tel:, address, hours, service area all present and identical | consistent |
| internal link crawl | 17 URLs, all 200, no `/locations/*`, no per-service route | all 200 |

## Counts

| | rows |
|---|---:|
| ADAPTED sections in the contract | 32 |
| **structural rows reporting `BLOCKED/no-reference`** (32 ADAPTED x 3 breakpoints) | **96** |
| NOVEL rows, measured once at zero token violations (A-9) | 5 |
| DELETED rows, not built | 4 |
| total rows | 105 |

`shell-header` and `shell-footer` are one lead-owned implementation measured once per
route, which is why they appear five times each.

## Full table

route | section | bp | class | metric | value | threshold | status
------|---------|----|-------|--------|-------|-----------|-------
/ | shell-header | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | shell-header | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | shell-header | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-hero | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-hero | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-hero | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-trust-strip | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-trust-strip | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-trust-strip | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-about-teaser | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-about-teaser | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-about-teaser | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-testimonials-head | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-testimonials-head | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-testimonials-head | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-services-grid | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-services-grid | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-services-grid | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-expertise-band | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-expertise-band | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-expertise-band | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-commitment | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-commitment | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-commitment | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-performance-band | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-performance-band | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-performance-band | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-components-grid | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-components-grid | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-components-grid | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | ref-band10-blog | once (A-9) | DELETED | not built | n/a | n/a | DELETED
/ | home-why-choose | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-why-choose | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-why-choose | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | ref-band12-projects-head | once (A-9) | DELETED | not built | n/a | n/a | DELETED
/ | ref-band13-projects | once (A-9) | DELETED | not built | n/a | n/a | DELETED
/ | ref-band14-faq | once (A-9) | DELETED | not built | n/a | n/a | DELETED
/ | home-cta-band | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-cta-band | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-cta-band | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-map | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-map | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-map | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | shell-footer | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | shell-footer | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | shell-footer | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/ | home-process | once (A-9) | NOVEL | token conformance | 0 | 0 | PASS
/ | home-transparency | once (A-9) | NOVEL | token conformance | 0 | 0 | PASS
/about | shell-header | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | shell-header | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | shell-header | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-page-hero | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-page-hero | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-page-hero | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-story | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-story | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-story | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-values | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-values | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-values | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-cta-band | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-cta-band | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | about-cta-band | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | shell-footer | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | shell-footer | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/about | shell-footer | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-header | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-header | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-header | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-page-hero | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-page-hero | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-page-hero | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-list | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-list | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-list | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-cta-band | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-cta-band | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-cta-band | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-footer | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-footer | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | shell-footer | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/services | services-symptoms | once (A-9) | NOVEL | token conformance | 0 | 0 | PASS
/services | services-faq | once (A-9) | NOVEL | token conformance | 0 | 0 | PASS
/contact | shell-header | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | shell-header | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | shell-header | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-page-hero | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-page-hero | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-page-hero | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-form-block | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-form-block | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-form-block | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-map | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-map | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | contact-map | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | shell-footer | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | shell-footer | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/contact | shell-footer | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | shell-header | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | shell-header | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | shell-header | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | privacy-body | once (A-9) | NOVEL | token conformance | 0 | 0 | PASS
/privacy | shell-footer | 390 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | shell-footer | 768 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
/privacy | shell-footer | 1440 | ADAPTED | struct-dev% | BLOCKED/no-reference | 5 | BLOCKED
