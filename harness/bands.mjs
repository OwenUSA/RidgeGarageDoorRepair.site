// DOM-side section extraction, shared by capture and measurement.
// Injected with page.evaluate — must be self-contained, no imports.

export const SECTION_SEL = [
  'header.elementor-location-header',
  'footer.elementor-location-footer',
  '.elementor-top-section',
  '.e-con.e-parent',
  '[data-element_type="section"]',
].join(',');

/** Returns the outermost reference bands, top to bottom. Mirrors profile.mjs. */
export const refBands = (sel) => {
  let nodes = [...document.querySelectorAll(sel)];
  nodes = nodes.filter((n) => !nodes.some((o) => o !== n && o.contains(n)));
  nodes = nodes.filter((n) => n.getBoundingClientRect().height >= 40);
  return nodes.sort(
    (a, b) => a.getBoundingClientRect().top + scrollY - (b.getBoundingClientRect().top + scrollY)
  );
};

/**
 * The structural-metric vector for one node. Everything here is a number or a
 * short enum — this is what ADAPTED sections are scored on, and it is deliberately
 * blind to words and image content.
 */
export const METRICS_FN = function metrics(n) {
  const num = (v) => {
    const f = parseFloat(v);
    return Number.isFinite(f) ? f : 0;
  };
  const cs = getComputedStyle(n);
  const r = n.getBoundingClientRect();

  // inner content box: the first descendant that is narrower than the section and
  // horizontally centred — Elementor's .elementor-container / .e-con-inner, or ours.
  const innerNode =
    n.querySelector(':scope > .elementor-container, :scope > .e-con-inner, :scope > [data-inner]') ||
    n.firstElementChild;
  const ir = innerNode ? innerNode.getBoundingClientRect() : r;
  const ics = innerNode ? getComputedStyle(innerNode) : cs;

  // repeated children = the grid. Count siblings that share a tag+width signature.
  const kids = innerNode ? [...innerNode.children] : [];
  const kidBoxes = kids.map((k) => k.getBoundingClientRect()).filter((b) => b.height > 8);
  const rowTops = [...new Set(kidBoxes.map((b) => Math.round(b.top / 8) * 8))];
  const perRow = rowTops.length ? Math.round(kidBoxes.length / rowTops.length) : 0;

  const pick = (sel) => n.querySelector(sel);
  const typeOf = (el) => {
    if (!el) return null;
    const c = getComputedStyle(el);
    return {
      size: num(c.fontSize),
      weight: num(c.fontWeight),
      lh: c.lineHeight === 'normal' ? num(c.fontSize) * 1.2 : num(c.lineHeight),
      ls: num(c.letterSpacing),
      family: c.fontFamily.split(',')[0].replace(/["']/g, ''),
      transform: c.textTransform,
      color: c.color,
    };
  };

  const btn = pick('a.elementor-button, .elementor-button, button, [data-cta]');
  const bcs = btn ? getComputedStyle(btn) : null;
  const bb = btn ? btn.getBoundingClientRect() : null;

  const card =
    pick('.elementor-widget-icon-box, .elementor-widget-image-box, .e-con.e-child, [data-card]') ||
    null;
  const ccs = card ? getComputedStyle(card) : null;
  const cb = card ? card.getBoundingClientRect() : null;

  const img = pick('img');
  const ib = img ? img.getBoundingClientRect() : null;

  return {
    box: { w: Math.round(r.width), h: Math.round(r.height) },
    pad: [num(cs.paddingTop), num(cs.paddingRight), num(cs.paddingBottom), num(cs.paddingLeft)],
    inner: { w: Math.round(ir.width), h: Math.round(ir.height) },
    innerPadX: num(ics.paddingLeft),
    gap: num(ics.gap || ics.columnGap),
    display: ics.display,
    gridCols: (ics.gridTemplateColumns || 'none')
      .split(' ')
      .filter((x) => x !== 'none')
      .map((x) => Math.round(num(x))),
    childCount: kids.length,
    rows: rowTops.length,
    perRow,
    bg: cs.backgroundColor,
    hasBgImage: cs.backgroundImage !== 'none',
    h1: typeOf(pick('h1')),
    h2: typeOf(pick('h2')),
    h3: typeOf(pick('h3')),
    p: typeOf(pick('p')),
    eyebrow: typeOf(pick('.elementor-widget-heading h6, [data-eyebrow]')),
    button: btn
      ? {
          w: Math.round(bb.width),
          h: Math.round(bb.height),
          padX: num(bcs.paddingLeft),
          padY: num(bcs.paddingTop),
          radius: num(bcs.borderRadius),
          size: num(bcs.fontSize),
          weight: num(bcs.fontWeight),
          ls: num(bcs.letterSpacing),
          bg: bcs.backgroundColor,
          color: bcs.color,
          transform: bcs.textTransform,
        }
      : null,
    card: card
      ? {
          w: Math.round(cb.width),
          h: Math.round(cb.height),
          padX: num(ccs.paddingLeft),
          padY: num(ccs.paddingTop),
          radius: num(ccs.borderRadius),
          bg: ccs.backgroundColor,
          border: ccs.borderTopWidth,
          shadow: ccs.boxShadow === 'none' ? null : ccs.boxShadow,
        }
      : null,
    image: ib ? { w: Math.round(ib.width), h: Math.round(ib.height), fit: getComputedStyle(img).objectFit } : null,
    counts: {
      imgs: n.querySelectorAll('img').length,
      svgs: n.querySelectorAll('svg').length,
      links: n.querySelectorAll('a').length,
      headings: n.querySelectorAll('h1,h2,h3,h4').length,
      paras: n.querySelectorAll('p').length,
      inputs: n.querySelectorAll('input,select,textarea').length,
      cards: n.querySelectorAll(
        '.elementor-widget-icon-box, .elementor-widget-image-box, .e-con.e-child, [data-card]'
      ).length,
    },
    chars: {
      heading: [...n.querySelectorAll('h1,h2,h3')].reduce((a, x) => a + x.textContent.trim().length, 0),
      body: [...n.querySelectorAll('p,li')].reduce((a, x) => a + x.textContent.trim().length, 0),
    },
  };
};

/** Numeric metrics compared for ADAPTED sections, and how each is weighted. */
export const STRUCT_KEYS = [
  ['box.w', 1],
  ['box.h', 2],
  ['pad.0', 1],
  ['pad.2', 1],
  ['inner.w', 2],
  ['gap', 1],
  ['perRow', 2],
  ['rows', 1],
  ['h1.size', 2],
  ['h1.weight', 1],
  ['h1.lh', 1],
  ['h1.ls', 1],
  ['h2.size', 2],
  ['h2.weight', 1],
  ['h2.lh', 1],
  ['h3.size', 1],
  ['p.size', 2],
  ['p.lh', 1],
  ['button.h', 1],
  ['button.padX', 1],
  ['button.radius', 1],
  ['button.size', 1],
  ['card.w', 2],
  ['card.h', 1],
  ['card.padX', 1],
  ['card.radius', 1],
];
