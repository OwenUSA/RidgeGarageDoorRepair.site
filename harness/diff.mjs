// STEP C — the comparison side. Three metrics, one per divergence class:
//   FIDELITY -> divergent pixel area %      (threshold 2)
//   ADAPTED  -> structural deviation %      (threshold 5)
//   NOVEL    -> token violations, count     (threshold 0)
// Ranked table to stdout (top rows only) + full table to docs/divergence.md.
//
//   node harness/diff.mjs --route=/ --bp=1440
//   node harness/diff.mjs                       (all routes, all bps)
//   node harness/diff.mjs --route=/ --bp=390 --section=home.hero
import { readJSON, out, summary, BP_SET } from './lib.mjs';
import { STRUCT_KEYS } from './bands.mjs';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';

const arg = (k, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${k}=`));
  return a ? a.slice(k.length + 3) : d;
};
// Git Bash rewrites a bare `/` argument into a Windows path. `root` is the shell-safe
// alias for `/`; any other value is normalised to a leading slash.
const normRoute = (r) => {
  if (!r || r === 'root' || r === '/' || /^[A-Za-z]:[\/]/.test(r) || r.includes('Program Files')) return '/';
  return r.startsWith('/') ? r : '/' + r;
};
const MAP = JSON.parse(readFileSync('harness/sections.json', 'utf8'));
const TOKENS = existsSync('harness/tokens.json')
  ? JSON.parse(readFileSync('harness/tokens.json', 'utf8'))
  : null;
const FLOORS = existsSync('docs/known-divergence.md')
  ? readFileSync('docs/known-divergence.md', 'utf8')
  : '';

const THRESHOLD = { FIDELITY: 2, ADAPTED: 5, NOVEL: 0 };
const onlyRoute = arg('route', null) ? normRoute(arg('route')) : null;
const onlyBp = arg('bp', null);
const onlySection = arg('section', null);
// STEP C ranks sections by divergent pixel area. With zero FIDELITY sections that number
// is informational rather than gating, but it is still the ranking key, so compute it for
// any section where both sides have a shot.
const WANT_PIXEL = process.argv.includes('--pixel');
// After Prompt 9 the palette is ours: color stops being a measured axis.
const COLOR_TERMINAL = /COLOR IS TERMINAL/.test(FLOORS) || process.argv.includes('--no-color');

const slugOf = (r) => (r === '/' ? 'root' : r.replace(/\W+/g, '_').replace(/^_|_$/g, ''));
const get = (o, path) =>
  path.split('.').reduce((a, k) => (a == null ? undefined : a[k]), o);

/** Divergent pixel area, normalised to the reference section box. */
async function pixelDiff(refPng, oursPng, outPng) {
  const meta = await sharp(refPng).metadata();
  const W = meta.width,
    H = meta.height;
  const a = PNG.sync.read(await sharp(refPng).png().toBuffer());
  const bBuf = await sharp(oursPng)
    .resize(W, H, { fit: 'fill' })
    .png()
    .toBuffer();
  const b = PNG.sync.read(bBuf);
  const out = new PNG({ width: W, height: H });
  const n = pixelmatch(a.data, b.data, out.data, W, H, { threshold: 0.12, includeAA: true });
  if (outPng) writeFileSync(outPng, PNG.sync.write(out));
  return { pct: +((n / (W * H)) * 100).toFixed(2), w: W, h: H, px: n };
}

/** Weighted mean relative deviation over the structural vector. */
function structDiff(ref, ours) {
  let wsum = 0,
    dsum = 0;
  const worst = [];
  for (const [key, weight] of STRUCT_KEYS) {
    const a = get(ref, key),
      b = get(ours, key);
    if (typeof a !== 'number' || typeof b !== 'number') continue;
    if (a === 0 && b === 0) continue;
    const denom = Math.max(Math.abs(a), Math.abs(b), 1);
    const d = Math.abs(a - b) / denom;
    wsum += weight;
    dsum += weight * d;
    worst.push([key, +(d * 100).toFixed(1), a, b]);
  }
  // discrete grid facts are pass/fail, not ratios — a 3-col grid rendered as 2 is 100% wrong
  for (const key of ['display', 'card.shadow']) {
    const a = get(ref, key),
      b = get(ours, key);
    if (a == null || b == null) continue;
    const d = String(a) === String(b) ? 0 : 1;
    wsum += 1;
    dsum += d;
    if (d) worst.push([key, 100, a, b]);
  }
  if (!COLOR_TERMINAL) {
    for (const key of ['bg', 'h1.color', 'p.color', 'button.bg', 'button.color']) {
      const a = get(ref, key),
        b = get(ours, key);
      if (a == null || b == null) continue;
      const d = String(a) === String(b) ? 0 : 1;
      wsum += 1;
      dsum += d;
      if (d) worst.push([key, 100, a, b]);
    }
  }
  worst.sort((x, y) => y[1] - x[1]);
  return { pct: wsum ? +((dsum / wsum) * 100).toFixed(2) : 0, worst: worst.slice(0, 6) };
}

/** Every resolved value must trace to an extracted token. */
function tokenDiff(ours) {
  if (!TOKENS) return { count: -1, worst: [['no harness/tokens.json yet — Prompt 5', 0]] };
  const viol = [];
  const near = (v, list, tol = 0.51) =>
    list.some((t) => Math.abs(t - v) <= tol);
  const check = (label, val, list) => {
    if (val == null || val === 0) return;
    if (!near(val, list)) viol.push([label, val]);
  };
  for (const k of ['h1', 'h2', 'h3', 'p', 'eyebrow']) {
    const t = ours[k];
    if (!t) continue;
    check(`${k}.size`, t.size, TOKENS.fontSize);
    check(`${k}.weight`, t.weight, TOKENS.fontWeight);
    if (!COLOR_TERMINAL && t.color && !TOKENS.color.includes(t.color))
      viol.push([`${k}.color`, t.color]);
  }
  for (const p of ours.pad || []) check('pad', p, TOKENS.space);
  check('gap', ours.gap, TOKENS.space);
  if (ours.button) {
    check('button.radius', ours.button.radius, TOKENS.radius);
    check('button.size', ours.button.size, TOKENS.fontSize);
    if (!COLOR_TERMINAL && !TOKENS.color.includes(ours.button.bg))
      viol.push(['button.bg', ours.button.bg]);
  }
  if (ours.card) {
    check('card.radius', ours.card.radius, TOKENS.radius);
    check('card.padX', ours.card.padX, TOKENS.space);
    if (ours.card.shadow && !TOKENS.shadow.includes(ours.card.shadow))
      viol.push(['card.shadow', ours.card.shadow.slice(0, 40)]);
  }
  if (!COLOR_TERMINAL && ours.bg && !TOKENS.color.includes(ours.bg)) viol.push(['bg', ours.bg]);
  return { count: viol.length, worst: viol.slice(0, 6) };
}

const rows = [];
for (const [route, def] of Object.entries(MAP.routes)) {
  if (onlyRoute && route !== onlyRoute) continue;
  const slug = slugOf(route);
  for (const bp of BP_SET) {
    if (onlyBp && bp !== Number(onlyBp)) continue;
    const refM = readJSON(out('ref', slug, String(bp), 'metrics.json'));
    const ourM = readJSON(out('ours', slug, String(bp), 'metrics.json'));
    for (const s of def.sections) {
      if (onlySection && s.id !== onlySection) continue;
      const cls = s.class;
      const ours = ourM?.[s.id];
      const ref = refM?.[s.id];
      let metric = '-',
        value = null,
        note = '',
        pixel = null;
      if (!ours) {
        rows.push({ route, id: s.id, bp, cls, metric: 'present', value: null, status: 'MISSING' });
        continue;
      }
      if (cls === 'FIDELITY') {
        const rp = out('ref', slug, String(bp), `${s.id}.png`);
        const op = out('ours', slug, String(bp), `${s.id}.png`);
        metric = 'pixel-area%';
        if (existsSync(rp) && existsSync(op)) {
          mkdirSync(out('diff', slug, String(bp)), { recursive: true });
          const d = await pixelDiff(rp, op, out('diff', slug, String(bp), `${s.id}.png`));
          value = d.pct;
        } else note = 'no shot';
      } else if (cls === 'ADAPTED') {
        metric = 'struct-dev%';
        if (ref) {
          const d = structDiff(ref, ours);
          value = d.pct;
          note = d.worst.map(([k, p]) => `${k}:${p}%`).join(' ');
        } else note = 'no ref band';
      } else {
        metric = 'token-viol';
        const d = tokenDiff(ours);
        value = d.count;
        note = d.worst.map(([k, v]) => `${k}=${v}`).join(' ');
      }
      if (WANT_PIXEL && cls !== 'FIDELITY') {
        const rp = out('ref', slug, String(bp), `${s.id}.png`);
        const op = out('ours', slug, String(bp), `${s.id}.png`);
        if (existsSync(rp) && existsSync(op)) {
          mkdirSync(out('diff', slug, String(bp)), { recursive: true });
          const d = await pixelDiff(rp, op, out('diff', slug, String(bp), `${s.id}.png`));
          pixel = d.pct;
        }
      }
      const th = THRESHOLD[cls];
      const status =
        value == null
          ? 'NO-DATA'
          : value < 0
            ? 'NO-TOKENS'
            : value <= th || (cls !== 'NOVEL' && value < th)
              ? 'PASS'
              : 'FAIL';
      rows.push({ route, id: s.id, bp, cls, metric, value, threshold: th, status, note, pixel });
    }
  }
}

// rank by divergent pixel area where it exists, else by the class metric
rows.sort((a, b) => (b.pixel ?? b.value ?? 1e9) - (a.pixel ?? a.value ?? 1e9));
const line = (r) =>
  `${r.route} | ${r.id} | ${r.bp} | ${r.cls} | ${r.metric} | ${r.value ?? '-'} | ${r.threshold ?? '-'} | ${r.status}${r.pixel != null ? `  [pixel ${r.pixel}%]` : ''}${r.note ? '  // ' + r.note : ''}`;

mkdirSync('docs', { recursive: true });
writeFileSync(
  'docs/divergence.md',
  `# docs/divergence.md — ranked divergence table\n\nRegenerated by \`node harness/diff.mjs\`. Do not hand-edit.\nColor measured: ${COLOR_TERMINAL ? 'NO (terminal after Prompt 9)' : 'yes'}\nGenerated: ${new Date().toISOString()}\n\n\`\`\`\nroute | section | breakpoint | class | metric | value | threshold | status\n${rows.map(line).join('\n')}\n\`\`\`\n`
);

const fails = rows.filter((r) => r.status !== 'PASS');
summary(
  `diff → ${rows.length} rows, ${fails.length} not passing, ${rows.filter((r) => r.status === 'MISSING').length} missing → docs/divergence.md`
);
summary('route | section | breakpoint | class | metric | value | threshold | status');
for (const r of rows.slice(0, 10)) summary('  ' + line(r));
