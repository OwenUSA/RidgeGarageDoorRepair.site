// STEP B (interactive state) — each state captured as its own reference, not just
// the default render. The Prompt 1 profile found 0 scroll-linked motion and 152
// transition-bearing elements, so this file, not a rAF trace, is where the reference's
// real behavior lives.
//
//   node harness/state.mjs --side=ref --bp=390
import { withPage, settle, writeJSON, out, summary } from './lib.mjs';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const arg = (k, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${k}=`));
  return a ? a.slice(k.length + 3) : d;
};
const side = arg('side', 'ref');
const bp = Number(arg('bp', '390'));
const url =
  side === 'ref' ? arg('url', 'https://costarroofinginc.com/') : 'http://localhost:3104' + arg('route', '/');
const dir = out('state', side, String(bp));
mkdirSync(dir, { recursive: true });

const snap = (label) => (page) =>
  page.screenshot({ path: join(dir, `${label}.png`) }).catch(() => {});

const report = await withPage(bp, async (page) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(page);
  const o = {};

  const styleOf = (sel, props) =>
    page.evaluate(
      ({ sel, props }) => {
        const n = document.querySelector(sel);
        if (!n) return null;
        const cs = getComputedStyle(n);
        const r = n.getBoundingClientRect();
        const o = { box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
        for (const p of props) o[p] = cs[p];
        return o;
      },
      { sel, props }
    );

  const HEADER = 'header.elementor-location-header, header, [data-shell="header"]';
  const HDR_PROPS = [
    'position', 'top', 'height', 'backgroundColor', 'boxShadow', 'transform',
    'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'zIndex', 'opacity',
  ];

  // --- header: at rest vs scrolled ---------------------------------------
  o.headerAtTop = await styleOf(HEADER, HDR_PROPS);
  await snap('header-top')(page);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  o.headerScrolled = await styleOf(HEADER, HDR_PROPS);
  o.headerBodyClass = await page.evaluate(() => ({
    body: document.body.className.slice(0, 200),
    header: (document.querySelector('header')?.className || '').slice(0, 200),
  }));
  await snap('header-scrolled')(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // --- mobile nav drawer --------------------------------------------------
  if (bp < 768) {
    const TOGGLE =
      '[data-drawer-toggle], .elementor-menu-toggle, [class*="menu-toggle"], [class*="hamburger"]';
    const PANEL =
      '[data-drawer-panel], nav.elementor-nav-menu--dropdown, .elementskit-menu-offcanvas-elements, [class*="mobile-menu"]';
    o.drawerClosed = await styleOf(PANEL, [
      'transform', 'opacity', 'visibility', 'display', 'position', 'left', 'width',
      'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'zIndex',
    ]);
    const clicked = await page
      .locator(TOGGLE)
      .first()
      .click({ timeout: 4000 })
      .then(() => true)
      .catch(() => false);
    o.drawerToggleFound = clicked;
    if (clicked) {
      await page.waitForTimeout(800);
      o.drawerOpen = await styleOf(PANEL, [
        'transform', 'opacity', 'visibility', 'display', 'position', 'left', 'width',
        'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'zIndex',
      ]);
      o.bodyLockOnOpen = await page.evaluate(() => {
        const cs = getComputedStyle(document.body);
        return { overflow: cs.overflow, position: cs.position, top: cs.top, cls: document.body.className.slice(0, 160) };
      });
      o.drawerLinks = await page.evaluate(() => {
        const p = document.querySelector(
          '[data-drawer-panel], nav.elementor-nav-menu--dropdown, [class*="mobile-menu"]'
        );
        return p ? [...p.querySelectorAll('a')].length : 0;
      });
      await snap('drawer-open')(page);
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(500);
      o.drawerAfterEscape = await styleOf(PANEL, ['transform', 'opacity', 'visibility']);
    }
  }

  // --- accordion (FAQ) ----------------------------------------------------
  const ACC = '.elementskit-card, .elementor-accordion-item, details, [data-accordion-item]';
  const accCount = await page.locator(ACC).count();
  o.accordionCount = accCount;
  if (accCount) {
    const first = page.locator(ACC).first();
    o.accordionClosed = await first.evaluate((n) => {
      const c = n.querySelector('.elementskit-card-body, .collapse, .elementor-tab-content, [data-accordion-panel]') || n.lastElementChild;
      const cs = c ? getComputedStyle(c) : null;
      return cs
        ? {
            display: cs.display, height: cs.height, overflow: cs.overflow,
            transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration,
          }
        : null;
    });
    await first
      .locator('.ekit-accordion--toggler, .elementor-tab-title, summary, [data-accordion-trigger]')
      .first()
      .click({ timeout: 4000 })
      .catch(() => {});
    await page.waitForTimeout(700);
    o.accordionOpen = await first.evaluate((n) => {
      const c = n.querySelector('.elementskit-card-body, .collapse, .elementor-tab-content, [data-accordion-panel]') || n.lastElementChild;
      const t = n.querySelector('.ekit-accordion--toggler, .elementor-tab-title, summary, [data-accordion-trigger]');
      const cs = c ? getComputedStyle(c) : null;
      return {
        display: cs?.display, height: cs?.height,
        ariaExpanded: t?.getAttribute('aria-expanded'),
        titleBg: t ? getComputedStyle(t).backgroundColor : null,
        titleColor: t ? getComputedStyle(t).color : null,
      };
    });
    await snap('accordion-open')(page);
  }

  // --- primary CTA: rest / hover / focus ----------------------------------
  const CTA = 'a.elementor-button, .elementor-button, [data-cta="primary"], a[href^="tel:"]';
  const ctaProps = [
    'backgroundColor', 'color', 'borderRadius', 'boxShadow', 'transform', 'opacity',
    'transitionProperty', 'transitionDuration', 'transitionTimingFunction',
    'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight', 'letterSpacing', 'textTransform',
  ];
  o.ctaRest = await styleOf(CTA, ctaProps);
  if (bp >= 768) {
    await page.locator(CTA).first().hover({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    o.ctaHover = await styleOf(CTA, ctaProps);
  }
  await page.locator(CTA).first().focus({ timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(200);
  o.ctaFocus = await styleOf(CTA, [...ctaProps, 'outlineColor', 'outlineWidth', 'outlineStyle', 'outlineOffset']);

  // --- form: pristine / focused / error -----------------------------------
  const input = page.locator('form input:not([type=hidden]), form textarea').first();
  if (await input.count()) {
    const IN_PROPS = [
      'height', 'borderRadius', 'borderTopWidth', 'borderTopColor', 'backgroundColor',
      'color', 'fontSize', 'paddingLeft', 'paddingTop', 'transitionDuration', 'outlineStyle',
    ];
    o.inputPristine = await input.evaluate((n, p) => {
      const cs = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const o = { box: { w: Math.round(r.width), h: Math.round(r.height) } };
      for (const k of p) o[k] = cs[k];
      return o;
    }, IN_PROPS);
    await input.focus().catch(() => {});
    await page.waitForTimeout(300);
    o.inputFocus = await input.evaluate((n, p) => {
      const cs = getComputedStyle(n);
      const o = {};
      for (const k of p) o[k] = cs[k];
      o.outlineColor = cs.outlineColor;
      o.outlineWidth = cs.outlineWidth;
      o.boxShadow = cs.boxShadow;
      return o;
    }, IN_PROPS);
    o.formFields = await page.evaluate(() =>
      [...document.querySelectorAll('form input:not([type=hidden]), form select, form textarea')].map(
        (n) => ({ tag: n.tagName.toLowerCase(), type: n.type || null, name: n.name || null, ph: n.placeholder || null, required: n.required })
      )
    );
    await snap('form-focus')(page);
  }

  // --- sticky mobile call bar? -------------------------------------------
  o.fixedElements = await page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((n) => {
        const cs = getComputedStyle(n);
        return (cs.position === 'fixed' || cs.position === 'sticky') && n.getBoundingClientRect().height > 20;
      })
      .slice(0, 8)
      .map((n) => ({
        cls: (n.className || '').toString().slice(0, 70),
        pos: getComputedStyle(n).position,
        z: getComputedStyle(n).zIndex,
        box: (() => { const r = n.getBoundingClientRect(); return { y: Math.round(r.y), h: Math.round(r.height) }; })(),
      }))
  );

  return o;
});

const p = writeJSON(out('state', `${side}-${bp}.json`), report);
summary(
  `state ${side} @${bp} → headerPos=${report.headerAtTop?.position}->${report.headerScrolled?.position} drawer=${report.drawerToggleFound ?? 'n/a'} accordions=${report.accordionCount} fixed=${report.fixedElements.length} → ${p}`
);
