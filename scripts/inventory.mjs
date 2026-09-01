// Prompt 2 — asset slot inventory + placeholder generation.
//
// Reads the Prompt 1 asset capture (.harness/assets/<page>.json, keyed by breakpoint) and
// the Prompt 1 reference section screenshots (.harness/ref/<page>/<bp>/<section>.png).
// Classification is entirely cfg-driven — harness.config.mjs `slotRules` — so this script
// carries no asset names of its own.
//
// It DOWNLOADS NOTHING. Every REPLACE asset stays on the reference's server (D-09); only
// its rendered geometry and a colour sampled from OUR OWN screenshot cross the line.
//
// Why this is not ../_shared/harness/src/inventory.mjs: that module reads
// .harness/cap/ref/<slug>-<bp>/sec-NN.png + .harness/assets/<page>-<bp>.json, which is the
// shared harness's own capture layout. Our captures predate it (Prompt 1 ran before A-11
// landed) and the reference has since gone behind a bot wall, so they cannot be retaken.
// This is a format adapter over frozen input, not a second instrument: no thresholds, no
// diffing, no measurement logic lives here.
//
//   node scripts/inventory.mjs
import path from 'node:path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import sharp from 'sharp';

const PAGES = { root: '/', about: '/about', services: '/services', contact: '/contact', privacy: '/privacy' };
const BPS = [390, 768, 1440];
const OUT_DIR = 'public/placeholders';

const cfg = (await import('../harness.config.mjs')).default;

const ruleFor = (slot) => cfg.slotRules.find((r) =>
  r.match instanceof RegExp ? r.match.test(slot) : r.match === slot);

// ---- dominant colour ---------------------------------------------------------------
// The Prompt 1 capture already sampled most slots. Where it recorded null (the image had
// not decoded when the probe ran) fall back to the average of OUR reference screenshot of
// the section the slot sits in — still a real sample, just coarser. Which of the two
// produced a row's colour is recorded, never silently merged.
const secAvgCache = new Map();
async function sectionAverage(page, section) {
  const key = `${page}/${section}`;
  if (secAvgCache.has(key)) return secAvgCache.get(key);
  const png = path.join('.harness', 'ref', page, '1440', `${section}.png`);
  let hex = null;
  if (existsSync(png)) {
    try {
      const st = await sharp(png).stats();
      const [r, g, b] = st.channels.slice(0, 3).map((c) => Math.round(c.mean));
      hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
    } catch { /* unreadable crop — leave null, reported as unsampled */ }
  }
  secAvgCache.set(key, hex);
  return hex;
}

// ---- collect -------------------------------------------------------------------------
const slots = new Map();
for (const [page, route] of Object.entries(PAGES)) {
  const cap = JSON.parse(readFileSync(`.harness/assets/${page}.json`, 'utf8'));
  for (const bp of BPS) {
    for (const a of cap[String(bp)] ?? []) {
      // Shell slots are one implementation measured five times — keep the home instance.
      const shared = a.slot.startsWith('shell.') && page !== 'root';
      if (shared) continue;
      const key = a.slot;
      if (!slots.has(key)) {
        slots.set(key, {
          refSlot: a.slot, route, page, section: a.section, kind: a.kind,
          fit: a.fit, radius: a.radius, alt: a.alt ?? '',
          colour: a.dominant ? { hex: a.dominant, from: 'slot-crop' } : null,
          bps: {}, aspects: {},
        });
      }
      const s = slots.get(key);
      if (!s.colour && a.dominant) s.colour = { hex: a.dominant, from: 'slot-crop' };
      if (a.rendered && a.rendered.w > 1 && a.rendered.h > 1) {
        s.bps[bp] = { w: Math.round(a.rendered.w), h: Math.round(a.rendered.h) };
        s.aspects[bp] = Math.round((a.rendered.w / a.rendered.h) * 1000) / 1000;
        // "highest resolution actually served", not the thumbnail in the srcset
        const nat = a.natural && a.natural.w ? a.natural : null;
        if (nat && (!s.natural || nat.w * nat.h > s.natural.w * s.natural.h)) s.natural = { ...nat };
      }
    }
  }
}

// ---- classify -------------------------------------------------------------------------
const rows = [];
for (const s of slots.values()) {
  const rule = ruleFor(s.refSlot);
  if (!rule) { console.warn('UNCLASSIFIED SLOT (add a slotRule):', s.refSlot); continue; }
  if (!s.colour) {
    const hex = await sectionAverage(s.page, s.section);
    s.colour = hex ? { hex, from: 'section-average' } : { hex: '#8a8f94', from: 'unsampled' };
  }
  const asp = Object.values(s.aspects);
  rows.push({
    ...s,
    slotId: rule.our ?? s.refSlot.replace(/^ref\./, 'ref.'),
    provenance: rule.provenance,
    note: rule.note ?? '',
    aspectChanges: asp.length > 1 && Math.max(...asp) / Math.min(...asp) > 1.05,
  });
}

// Slots the reference numbers but we address by group (services-grid, components-grid)
// keep their reference index in the id so nothing is silently merged.
for (const r of rows) if (r.slotId === r.refSlot && r.provenance === 'REPLACE') r.slotId = r.refSlot;

rows.sort((a, b) => (a.route + a.slotId).localeCompare(b.route + b.slotId));

// ---- placeholders ---------------------------------------------------------------------
// Flat fill at the sampled dominant colour, slot ID and pixel dimensions as text, a hairline
// so the box edge is visible against a same-tone section, and nothing else. No network, no
// external service, no font file — system-ui only, so the SVG renders standalone.
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const readable = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.35 ? '#12161a' : '#f4f6f8';
};
function svg(slotId, w, h, hex, radius) {
  const ink = readable(hex);
  const r = parseFloat(radius) || 0;
  const size = Math.max(9, Math.min(15, Math.round(Math.min(w, h) / 14)));
  const label = h >= 44 && w >= 96
    ? `<text x="50%" y="50%" dy="-0.35em" fill="${ink}" font-family="system-ui,sans-serif" font-size="${size}" font-weight="600" text-anchor="middle" opacity="0.82">${esc(slotId)}</text>` +
      `<text x="50%" y="50%" dy="0.95em" fill="${ink}" font-family="system-ui,sans-serif" font-size="${size}" text-anchor="middle" opacity="0.6">${w}x${h}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Placeholder for ${esc(slotId)}, ${w} by ${h} pixels">` +
    `<rect width="${w}" height="${h}" rx="${r}" fill="${hex}"/>` +
    `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${Math.max(0, r - 0.5)}" fill="none" stroke="${ink}" stroke-opacity="0.22"/>` +
    label + '</svg>\n';
}

mkdirSync(OUT_DIR, { recursive: true });
const generated = [];
for (const r of rows) {
  if (r.provenance !== 'REPLACE') continue;
  // One file per DISTINCT aspect ratio, not per breakpoint: a slot that keeps its aspect
  // across all three widths is one image the browser scales, and three near-identical SVGs
  // would be three files for one decision.
  const seen = new Map();
  for (const bp of BPS) {
    const d = r.bps[bp];
    if (!d) continue;
    const key = Math.round((d.w / d.h) * 100);
    if (seen.has(key)) { seen.get(key).bps.push(bp); continue; }
    seen.set(key, { d, bps: [bp] });
  }
  for (const [, v] of seen) {
    const suffix = seen.size > 1 ? `-${v.d.w}x${v.d.h}` : '';
    const file = path.join(OUT_DIR, `${r.slotId}${suffix}.svg`);
    writeFileSync(file, svg(r.slotId, v.d.w, v.d.h, r.colour.hex, r.radius));
    generated.push({ slotId: r.slotId, file, w: v.d.w, h: v.d.h, bps: v.bps });
  }
}

writeFileSync('.harness/inventory.json', JSON.stringify({ rows, generated }, null, 1));
const tally = (p) => rows.filter((r) => r.provenance === p).length;
console.log(`slots inventoried ${rows.length} | REPLACE ${tally('REPLACE')} | ICON ${tally('ICON')} | WORDMARK ${tally('WORDMARK')} | DELETED ${tally('DELETED')}`);
console.log(`placeholders generated ${generated.length} -> ${OUT_DIR}/`);
console.log('REPLACE assets downloaded 0');
