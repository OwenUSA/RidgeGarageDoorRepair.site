// NOVEL token conformance, run standalone.
//
// Why this file exists: diff.mjs computes token conformance INSIDE diffOne(), which
// returns early with `missing capture` when the reference-side meta.json is absent. Under
// A-15 that meta can never exist here, so the NOVEL gate — which needs no reference side
// at all, only our own capture and the Prompt 5 token set — was unreachable through the
// normal entry point. This driver calls the harness's OWN exported loadTokens() and
// tokenViolations() against our capture. It fabricates nothing and reads nothing from the
// reference; it only removes the reference coupling from a check that never needed one.
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { loadConfig, slug } from '../../_shared/harness/src/config.mjs';
import { loadTokens, tokenViolations } from '../../_shared/harness/src/diff.mjs';

const NOVEL = new Set(process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['home-process', 'home-transparency', 'services-symptoms', 'services-faq', 'privacy-body']);

const cfg = await loadConfig();
const tokens = await loadTokens(cfg);
const bp = cfg.breakpoints.canonical;
let total = 0, scored = 0, missing = [...NOVEL];

console.log('route | section | class | metric | value | threshold | status');
console.log('------|---------|-------|--------|-------|-----------|-------');
for (const route of Object.values(cfg.routeMap)) {
  const file = path.join(cfg.harnessDir, 'cap', 'ours', `${slug(route)}-${bp}`, 'meta.json');
  let meta;
  try { meta = JSON.parse(await readFile(file, 'utf8')); } catch { continue; }
  for (const sec of meta.sections || []) {
    const id = sec.id || '';
    const hit = [...NOVEL].find((n) => id === n || id.endsWith(n) || id.includes(n));
    if (!hit) continue;
    missing = missing.filter((m) => m !== hit);
    const d = tokenViolations(sec, tokens, cfg);
    const n = d.violations ? d.violations.length : (d.count ?? 0);
    total += n; scored++;
    console.log(`${route} | ${hit} | NOVEL | token violations | ${n} | 0 | ${n === 0 ? 'PASS' : 'FAIL'}`);
    if (n) console.log('   ' + JSON.stringify(d.violations ?? d).slice(0, 600));
  }
}
console.log(`\nNOVEL sections scored: ${scored}/${NOVEL.size}  total violations: ${total}`);
if (missing.length) console.log(`NOT FOUND in capture (reported, not passed): ${missing.join(', ')}`);
process.exitCode = total === 0 && !missing.length ? 0 : 1;
