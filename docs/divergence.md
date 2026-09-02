# docs/divergence.md — ranked divergence table

Generated 2026-09-02T01:05:14.532Z by `src/diff.mjs`.
Rewritten each convergence loop. Ranked worst-first, normalized against each row's own threshold.

Rows: 0 · FAIL: 0 · PASS: 0 · BLOCKED: 0

## Top 10

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------

## Full table

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------

---

## READ THIS BEFORE QUOTING THE ZERO ABOVE — A-15

**Zero rows is not zero divergence. It is fifteen BLOCKED passes.**

`diff.mjs` returned `missing capture (run capture.mjs first)` for all 15 route x breakpoint
passes, because there is no reference-side capture and there can never be one: the reference
went behind a bot wall mid-build and no complete local copy was kept (A-15 / F-10 / F-19).

    route      | section | bp            | class   | metric      | value              | threshold | status
    -----------|---------|---------------|---------|-------------|--------------------|-----------|--------------------
    /          | ALL     | 390/768/1440  | ADAPTED | struct-dev% | no reference side  | 5         | BLOCKED/no-reference
    /about     | ALL     | 390/768/1440  | ADAPTED | struct-dev% | no reference side  | 5         | BLOCKED/no-reference
    /services  | ALL     | 390/768/1440  | ADAPTED | struct-dev% | no reference side  | 5         | BLOCKED/no-reference
    /contact   | ALL     | 390/768/1440  | ADAPTED | struct-dev% | no reference side  | 5         | BLOCKED/no-reference
    /privacy   | ALL     | 390/768/1440  | ADAPTED | struct-dev% | no reference side  | 5         | BLOCKED/no-reference

A BLOCKED row has no value and no threshold was applied to it. **No number was back-filled**
and no converter was written; invented numbers that look like measurements are worse than no
measurement. What DID gate this build, and passed, is the render-truth set, which needs no
reference at all: see the final gate table in `docs/known-divergence.md`.
