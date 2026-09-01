# RESUME — Ridge build wave, killed mid-flight

**Cause:** account session limit (HTTP 429), reset 7:20pm America/Caracas. It killed the
lead and its in-flight builders together. Nothing rolled back; `npx tsc --noEmit` exits 0.

## Chain position
Merged PROMPT 6+7 build wave, substantially complete. Prompts 0-5+9 committed; tokens,
palette (seed 79039, violet-slate `#41434b` + deep rust `#672b22`) and the shell are FROZEN.
Amendment **A-15** governs measurement here.

## Built — 27 section components, all five routes wired, typecheck clean
`app/page.tsx`, `/about`, `/services`, `/contact`, `/privacy` all reference sections.
Also landed: `app/sections.css`, `lib/sections.ts`, `docs/PRE-LAUNCH.md`.
`app/globals.css` was edited by the LEAD (permitted — the shell is lead-owned; builders
hand shared changes back rather than editing them).

## In flight at the moment of the kill
The lead had just accepted two render-truth findings as real and was fixing them:
1. **cta-primacy** — fixing the CTA's COMPETITORS, never the headings. This is the correct
   direction: an earlier version of the gate ranked the tel: CTA against all text, which
   near-black-on-white wins by construction, and a sibling site washed its headings out
   trying to satisfy it. That regression had to be reverted. Fix the other buttons.
2. **statement-band ink density.**
Neither fix is confirmed landed. Re-run both gates and re-derive.

## Measurement status under A-15
This site's reference (costarroofinginc.com) is BOT-WALLED and no local copy was kept, so:
- Every structural row reports `BLOCKED/no-reference` — never a number, never a PASS.
  A BLOCKED row is an absence and must read as one.
- **Do NOT write a converter** that back-fills the missing metric fields from the legacy
  Prompt 1 capture. Invented numbers that look like measurements are worse than none.
- BLOCKING gates that DO work here: `contrast.mjs` (0 FAIL), `rendertruth.mjs`
  (0 findings), token conformance on NOVEL sections (0 violations), `pnpm build`, the
  email / locations / NAP sweeps, and the internal link crawl.

```bash
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs
```

## Traps already paid for — do not re-learn
- After ANY rebuild: kill the port holder, restart, verify BOTH the page title AND that the
  referenced stylesheet returns 200 before believing a gate. This site produced 17 phantom
  tap-target findings from a stale server whose stylesheet hash no longer existed — the
  page had no CSS at all. Recorded in `docs/shell-status.md`.
- The inverse also happened here: a DEAD task wrapper fronting a LIVE server. Task status
  is never evidence about what is on the port; only title + stylesheet-200 is.
- Never background the dev server with `&` in the same command chain as a gate run.
- `docs/sections.md` carries a human table AND a machine twin, plus `content/copy.ts`
  `refSection` as a third copy. Edit all together (F-14).
