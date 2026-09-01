// Extract the reference token set from the Prompt 1 appearance capture.
// Emits harness/tokens.json — the reference set NOVEL-class token conformance is
// scored against. Prompt 5 turns this into CSS custom properties + the Tailwind
// @theme block; the numbers must not drift between the two.
//
//   node harness/tokens.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = '.harness/profile';
const files = readdirSync(DIR).filter((f) => f.endsWith('.json'));

const fontSize = new Set();
const fontWeight = new Set();
const lineHeight = new Set();
const letterSpacing = new Set();
const space = new Set([0]);
const radius = new Set([0]);
const shadow = new Set();
const colorCount = new Map();
const families = new Map();

const num = (v) => {
  const f = parseFloat(v);
  return Number.isFinite(f) ? f : null;
};
const round = (n) => Math.round(n * 100) / 100;

for (const f of files) {
  const perBp = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  for (const bp of Object.keys(perBp)) {
    const p = perBp[bp];
    for (const [key, count] of p.fonts || []) {
      const [fam, size, weight, lh, ls] = key.split('|');
      const fs = num(size);
      if (fs) fontSize.add(round(fs));
      const fw = num(weight);
      if (fw) fontWeight.add(fw);
      const l = num(lh);
      if (l && fs) lineHeight.add(round(l / fs));
      const s = num(ls);
      if (s) letterSpacing.add(round(s));
      const famName = fam.split(',')[0].replace(/["']/g, '').trim();
      families.set(famName, (families.get(famName) || 0) + count);
    }
    for (const [c, n] of p.colors || []) colorCount.set(c, (colorCount.get(c) || 0) + n);
    for (const [r] of p.radii || []) for (const part of r.split(' ')) { const v = num(part); if (v != null) radius.add(v); }
    for (const [s] of p.shadows || []) shadow.add(s);
    for (const sec of p.sections || []) {
      for (const part of (sec.padding || '').split(' ')) {
        const v = num(part);
        if (v != null && v <= 200) space.add(Math.round(v));
      }
    }
  }
}

// Spacing scale: the reference is Elementor, so raw paddings are noisy. Snap the
// observed values onto a 4px base scale and keep the rungs that are actually used.
const SCALE = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160];
const usedSpace = new Set(
  [...space].map((v) => SCALE.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a)))
);

const colors = [...colorCount.entries()]
  .filter(([c]) => !/rgba\([^)]*, 0\)/.test(c))
  .sort((a, b) => b[1] - a[1])
  .slice(0, 14)
  .map(([c]) => c);

const tokens = {
  _comment:
    'Extracted from the reference by harness/tokens.mjs (Prompt 1). fontSize/space/radius are px. lineHeight is unitless. color is the observed ramp and is REPLACED wholesale by the randomized palette; token conformance on color is scored against the palette in use, not against these.',
  fontFamily: [...families.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k]) => k),
  fontSize: [...fontSize].sort((a, b) => a - b),
  fontWeight: [...fontWeight].sort((a, b) => a - b),
  lineHeight: [...lineHeight].sort((a, b) => a - b),
  letterSpacing: [...letterSpacing].sort((a, b) => a - b),
  space: [...usedSpace].sort((a, b) => a - b),
  radius: [...radius].sort((a, b) => a - b),
  shadow: [...shadow],
  color: colors,
  container: 1280,
  breakpoints: { sm: 480, md: 768, lg: 1025, xl: 1200 },
};

writeFileSync('harness/tokens.json', JSON.stringify(tokens, null, 2));
console.log(
  `tokens → families=${tokens.fontFamily.join(',')} sizes=${tokens.fontSize.length} weights=${tokens.fontWeight.join('/')} space=${tokens.space.length} radius=${tokens.radius.join('/')} shadows=${tokens.shadow.length} colors=${tokens.color.length} → harness/tokens.json`
);
