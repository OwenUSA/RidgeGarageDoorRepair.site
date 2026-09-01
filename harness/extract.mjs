// Prompt 2 + 3 input pass: asset slots and copy volume, per section, per breakpoint.
//
// Writes .harness/assets/<page>.json and .harness/text/<page>.json. Both stay in
// .harness/ (gitignored) — per D-09 the reference's photos and body copy never enter the
// repo. The text dump exists solely so scripts/similarity.mjs has something to score
// against, and the asset dump records dimensions and dominant color so placeholders can be
// generated at the right size without downloading a single one of their images.
//
//   node harness/extract.mjs
import { withPage, settle, writeJSON, out, summary, BP_SET } from './lib.mjs';
import { readFileSync } from 'node:fs';

const MAP = JSON.parse(readFileSync('harness/sections.json', 'utf8'));

const probe = (sectionIds) => {
  const SECTION_SEL = [
    'header.elementor-location-header',
    'footer.elementor-location-footer',
    '.elementor-top-section',
    '.e-con.e-parent',
    '[data-element_type="section"]',
  ].join(',');
  let nodes = [...document.querySelectorAll(SECTION_SEL)];
  nodes = nodes.filter((n) => !nodes.some((o) => o !== n && o.contains(n)));
  nodes = nodes.filter((n) => n.getBoundingClientRect().height >= 40);
  nodes.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

  // average color of an element, sampled from the pixels the browser already decoded.
  // Same-origin, so the canvas is not tainted. No image file is ever written to disk.
  const avgColor = (img) => {
    try {
      const c = document.createElement('canvas');
      c.width = 24;
      c.height = 24;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, 24, 24);
      const d = ctx.getImageData(0, 0, 24, 24).data;
      let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 128) continue;
        r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
      }
      if (!n) return null;
      const h = (v) => Math.round(v / n).toString(16).padStart(2, '0');
      return '#' + h(r) + h(g) + h(b);
    } catch {
      return null;
    }
  };

  const assets = [];
  const text = [];

  nodes.forEach((n, idx) => {
    const id = sectionIds[idx] ?? `ref.band${idx}`;

    // --- assets ---
    n.querySelectorAll('img').forEach((img, i) => {
      const r = img.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      const cs = getComputedStyle(img);
      assets.push({
        slot: `${id}.img${i + 1}`,
        section: id,
        kind: 'img',
        src: (img.currentSrc || img.src || '').split('/').pop().split('?')[0],
        rendered: { w: Math.round(r.width), h: Math.round(r.height) },
        natural: { w: img.naturalWidth, h: img.naturalHeight },
        aspect: r.height ? +(r.width / r.height).toFixed(3) : null,
        fit: cs.objectFit,
        radius: cs.borderRadius,
        dominant: avgColor(img),
        alt: (img.alt || '').slice(0, 60),
        loading: img.loading || null,
        srcsetCount: (img.srcset || '').split(',').filter(Boolean).length,
      });
    });
    // CSS background images are asset slots too
    [n, ...n.querySelectorAll('*')].forEach((el, i) => {
      const cs = getComputedStyle(el);
      if (cs.backgroundImage === 'none' || !/url\(/.test(cs.backgroundImage)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      assets.push({
        slot: `${id}.bg${i + 1}`,
        section: id,
        kind: 'background',
        src: (cs.backgroundImage.match(/url\(["']?([^"')]+)/) || [, ''])[1].split('/').pop().split('?')[0],
        rendered: { w: Math.round(r.width), h: Math.round(r.height) },
        natural: null,
        aspect: r.height ? +(r.width / r.height).toFixed(3) : null,
        fit: cs.backgroundSize,
        radius: cs.borderRadius,
        dominant: null,
        position: cs.backgroundPosition,
      });
    });
    const svgs = n.querySelectorAll('svg').length;
    const iconFonts = [...n.querySelectorAll('i,span')].filter((e) =>
      /icofont|elementskit|elegant|fa-|icon-/.test(e.className.toString())
    ).length;

    // --- text volume + body copy (for the similarity gate only) ---
    const headings = [...n.querySelectorAll('h1,h2,h3,h4')].map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: h.textContent.trim().replace(/\s+/g, ' '),
      chars: h.textContent.trim().length,
    }));
    const paras = [...n.querySelectorAll('p,li')]
      .map((p) => p.textContent.trim().replace(/\s+/g, ' '))
      .filter((t) => t.length > 2);
    const btns = [...n.querySelectorAll('a.elementor-button, .elementor-button, button')].map((b) =>
      b.textContent.trim().replace(/\s+/g, ' ')
    );
    text.push({
      section: id,
      headings,
      headingChars: headings.reduce((a, h) => a + h.chars, 0),
      paras,
      paraCount: paras.length,
      bodyChars: paras.reduce((a, p) => a + p.length, 0),
      btns,
      svgs,
      iconFonts,
    });
  });

  return { assets, text, title: document.title, meta: document.querySelector('meta[name=description]')?.content || null };
};

for (const [route, def] of Object.entries(MAP.routes)) {
  const slug = route === '/' ? 'root' : route.replace(/\W+/g, '_').replace(/^_|_$/g, '');
  const ids = [];
  // reference band index -> our section id, so slots are named by the section that owns them
  const byIndex = {};
  for (const s of def.sections) if (s.refIndex != null) byIndex[s.refIndex] = s.id;
  for (let i = 0; i < 24; i++) ids[i] = byIndex[i] ?? `ref.band${i}`;

  const perBp = {};
  let textOnce = null;
  for (const bp of BP_SET) {
    const r = await withPage(bp, async (page) => {
      await page.goto(def.refUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await settle(page);
      return page.evaluate(probe, ids);
    });
    perBp[bp] = r.assets;
    if (bp === 1440) textOnce = { title: r.title, meta: r.meta, sections: r.text };
    summary(`extract ${route} @${bp} → assets=${r.assets.length} sections=${r.text.length}`);
  }
  writeJSON(out('assets', `${slug}.json`), perBp);
  writeJSON(out('text', `${slug}.json`), textOnce);
}
summary('→ .harness/assets/*.json  .harness/text/*.json');
