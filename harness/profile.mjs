// STEP A — profile the reference. Answers: page height and section count per page,
// breakpoints in the CSS, motion kind, static vs fetched, what state exists, auth/geo.
// Writes .harness/profile/<page>.json, prints one summary line per page.
import { withPage, settle, writeJSON, readJSON, out, summary, BP_SET, REFERENCE } from './lib.mjs';

const ARGS = process.argv.slice(2);
const PAGES = ARGS.filter((a) => !a.startsWith('-'));
const BPS = (ARGS.find((a) => a.startsWith('--bp=')) || '').slice(5).split(',').filter(Boolean).map(Number);
const targets = PAGES.length ? PAGES : [REFERENCE];

const probe = () => {
  const abs = (n) => {
    const r = n.getBoundingClientRect();
    return {
      x: Math.round(r.x + scrollX),
      y: Math.round(r.y + scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };

  // --- breakpoints in the CSS ---------------------------------------------
  const mq = new Set();
  const sheetUrls = [];
  for (const s of document.styleSheets) {
    if (s.href) sheetUrls.push(s.href);
    let rules;
    try {
      rules = s.cssRules;
    } catch {
      continue; // cross-origin, no CORS
    }
    const walk = (list) => {
      for (const r of list) {
        if (r.type === CSSRule.MEDIA_RULE) {
          for (const m of r.media) if (/width/.test(m)) mq.add(m.trim());
          walk(r.cssRules);
        } else if (r.cssRules) walk(r.cssRules);
      }
    };
    walk(rules);
  }

  // --- section inventory ---------------------------------------------------
  // Elementor emits top-level bands as .elementor-top-section (v2 sections) or
  // .e-con.e-parent (v3 flex containers). Generic fallback for non-Elementor refs.
  const SECTION_SEL = [
    'header.elementor-location-header',
    'footer.elementor-location-footer',
    '.elementor-top-section',
    '.e-con.e-parent',
    '[data-element_type="section"]',
  ].join(',');
  let nodes = [...document.querySelectorAll(SECTION_SEL)];
  if (nodes.length < 3)
    nodes = [...document.querySelectorAll('body > header, body > footer, main > section, body > section, main > div')];
  // keep only outermost: drop any node whose ancestor is also in the set
  const set = new Set(nodes);
  nodes = nodes.filter((n) => !nodes.some((o) => o !== n && o.contains(n)));

  const bands = [];
  for (const n of nodes) {
    const b = abs(n);
    if (b.h < 40) continue;
    const cs = getComputedStyle(n);
    bands.push({
      tag: n.tagName.toLowerCase(),
      id: n.id || null,
      cls: (n.className || '').toString().slice(0, 140),
      box: b,
      bg: cs.backgroundColor,
      bgImage: cs.backgroundImage === 'none' ? null : cs.backgroundImage.slice(0, 160),
      padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(' '),
      display: cs.display,
      cols: (() => {
        const kid = n.querySelector('.elementor-container, .e-con-inner, :scope > *');
        return kid ? getComputedStyle(kid).gridTemplateColumns || null : null;
      })(),
      childCount: n.children.length,
      headings: [...n.querySelectorAll('h1,h2,h3')].slice(0, 4).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 140),
        chars: h.textContent.trim().length,
      })),
      paraChars: [...n.querySelectorAll('p')].reduce((a, x) => a + x.textContent.trim().length, 0),
      paraCount: n.querySelectorAll('p').length,
      imgs: [...n.querySelectorAll('img')].map((i) => ({
        src: (i.currentSrc || i.src || '').split('/').pop().slice(0, 60),
        w: Math.round(i.getBoundingClientRect().width),
        h: Math.round(i.getBoundingClientRect().height),
        nw: i.naturalWidth,
        nh: i.naturalHeight,
        fit: getComputedStyle(i).objectFit,
      })),
      svgs: n.querySelectorAll('svg').length,
      links: n.querySelectorAll('a').length,
      btns: [...n.querySelectorAll('a.elementor-button, button, .elementor-button')]
        .slice(0, 4)
        .map((b2) => b2.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)),
      cards: n.querySelectorAll(
        '.elementor-widget-icon-box, .elementor-widget-image-box, .e-con.e-child, article'
      ).length,
      accordion: n.querySelectorAll('.elementor-accordion-item, details, [aria-expanded]').length,
      hasForm: !!n.querySelector('form'),
      hasIframe: !!n.querySelector('iframe'),
    });
  }
  bands.sort((a, b) => a.box.y - b.box.y);

  // --- motion --------------------------------------------------------------
  const libs = {
    gsap: !!window.gsap,
    ScrollTrigger: !!(window.ScrollTrigger || window.gsap?.ScrollTrigger),
    lenis: !!(window.Lenis || window.lenis),
    locomotive: !!window.LocomotiveScroll,
    framer: !!window.Motion || !!document.querySelector('[data-framer-name]'),
    aos: !!window.AOS || !!document.querySelector('[data-aos]'),
    swiper: !!window.Swiper || !!document.querySelector('.swiper, swiper-container'),
    slick: !!(window.jQuery && window.jQuery.fn && window.jQuery.fn.slick),
    wow: !!window.WOW,
    elementor: !!window.elementorFrontend,
    jquery: !!window.jQuery,
  };
  let animatedEls = 0,
    transitionEls = 0,
    willChange = 0,
    stickyEls = 0,
    fixedEls = 0;
  const transformed = [];
  for (const n of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(n);
    if (cs.animationName && cs.animationName !== 'none') animatedEls++;
    if (cs.transitionDuration && cs.transitionDuration !== '0s') transitionEls++;
    if (cs.willChange && cs.willChange !== 'auto') willChange++;
    if (cs.position === 'sticky') stickyEls++;
    if (cs.position === 'fixed') fixedEls++;
    if (cs.transform && cs.transform !== 'none' && transformed.length < 20)
      transformed.push({ cls: (n.className || '').toString().slice(0, 60), t: cs.transform });
  }

  // --- state surfaces ------------------------------------------------------
  const state = {
    forms: document.querySelectorAll('form').length,
    inputs: document.querySelectorAll('input,textarea,select').length,
    emailInputs: document.querySelectorAll('input[type=email]').length,
    mailto: document.querySelectorAll('a[href^="mailto:"]').length,
    tel: document.querySelectorAll('a[href^="tel:"]').length,
    hamburger: document.querySelectorAll(
      '[class*="hamburger"],[class*="burger"],[class*="menu-toggle"],[aria-label*="menu" i],[class*="mobile-menu"]'
    ).length,
    accordions: document.querySelectorAll(
      'details,[class*="accordion"],[class*="faq"],[data-toggle="collapse"],[aria-expanded]'
    ).length,
    tabs: document.querySelectorAll('[role=tab],[class*="tab-"],[class*="tabs"]').length,
    carousels: document.querySelectorAll(
      '.swiper,swiper-container,[class*="carousel"],[class*="slider"],.slick-slider'
    ).length,
    videos: document.querySelectorAll('video').length,
    iframes: [...document.querySelectorAll('iframe')].map((f) => (f.src || '').slice(0, 90)),
    sticky: stickyEls,
    fixed: fixedEls,
  };

  // --- typography + color inventory ---------------------------------------
  const fontSet = new Map();
  for (const n of document.querySelectorAll(
    'h1,h2,h3,h4,h5,h6,p,a,li,span,button,label,blockquote'
  )) {
    if (!n.textContent.trim()) continue;
    const cs = getComputedStyle(n);
    const k = [
      cs.fontFamily,
      cs.fontSize,
      cs.fontWeight,
      cs.lineHeight,
      cs.letterSpacing,
      cs.textTransform,
    ].join('|');
    fontSet.set(k, (fontSet.get(k) || 0) + 1);
  }
  const colors = new Map();
  for (const n of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(n);
    for (const v of [cs.color, cs.backgroundColor, cs.borderTopColor]) {
      if (!v || v === 'rgba(0, 0, 0, 0)' || v === 'transparent') continue;
      colors.set(v, (colors.get(v) || 0) + 1);
    }
  }
  const radii = new Map(),
    shadows = new Map();
  for (const n of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(n);
    if (cs.borderRadius && cs.borderRadius !== '0px')
      radii.set(cs.borderRadius, (radii.get(cs.borderRadius) || 0) + 1);
    if (cs.boxShadow && cs.boxShadow !== 'none')
      shadows.set(cs.boxShadow, (shadows.get(cs.boxShadow) || 0) + 1);
  }

  const fontFaces = [...(document.fonts || [])].map((f) => ({
    family: f.family,
    weight: f.weight,
    style: f.style,
    status: f.status,
  }));

  const navLinks = [...document.querySelectorAll('header a[href], nav a[href]')]
    .map((a) => ({ href: a.href, text: a.textContent.trim().replace(/\s+/g, ' ').slice(0, 40) }))
    .filter((l) => l.href.startsWith(location.origin));

  const allInternal = [
    ...new Set(
      [...document.querySelectorAll('a[href]')]
        .map((a) => a.href)
        .filter((h) => h.startsWith(location.origin))
        .map((h) => h.split('#')[0].replace(/\/$/, '') || '/')
    ),
  ];

  const container = (() => {
    const m = document.querySelector(
      '.container, .elementor-container, main > *, [class*="container"]'
    );
    return m ? Math.round(m.getBoundingClientRect().width) : null;
  })();

  return {
    url: location.href,
    title: document.title,
    viewport: { w: innerWidth, h: innerHeight },
    pageHeight: document.documentElement.scrollHeight,
    sectionCount: bands.length,
    sections: bands,
    mediaQueries: [...mq].sort(),
    sheetUrls,
    libs,
    motion: { animatedEls, transitionEls, willChange, transformed },
    state,
    container,
    fonts: [...fontSet.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40),
    fontFaces,
    colors: [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
    radii: [...radii.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12),
    shadows: [...shadows.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
    navLinks,
    allInternal,
    generator:
      document.querySelector('meta[name=generator]')?.content ||
      (document.body.className.match(/elementor|wp-|astra|divi|avada/g) || []).join(',') ||
      null,
  };
};

/** Scroll-linked vs time-driven: sample transforms by rAF during a slow scroll. */
const motionProbe = async (page) => {
  return page.evaluate(async () => {
    const targets = [...document.querySelectorAll('body *')]
      .filter((n) => {
        const cs = getComputedStyle(n);
        return (
          (cs.transform !== 'none' || cs.opacity !== '1') &&
          n.getBoundingClientRect().height > 40
        );
      })
      .slice(0, 25);
    if (!targets.length) return { samples: 0, movedWithScroll: 0, movedAtRest: 0 };

    const snap = () =>
      targets.map((n) => {
        const cs = getComputedStyle(n);
        return cs.transform + '|' + cs.opacity;
      });

    // at rest, 30 frames, no scroll => time-driven motion shows up here
    const rest0 = snap();
    await new Promise((r) => setTimeout(r, 500));
    const rest1 = snap();
    const movedAtRest = rest0.filter((v, i) => v !== rest1[i]).length;

    // slow programmatic scroll at ~3px/frame, sampling every frame
    let moved = new Set();
    let prev = snap();
    let y = window.scrollY;
    const max = document.body.scrollHeight - innerHeight;
    let frames = 0;
    await new Promise((resolve) => {
      const tick = () => {
        y = Math.min(max, y + 3);
        window.scrollTo(0, y);
        const now = snap();
        now.forEach((v, i) => {
          if (v !== prev[i]) moved.add(i);
        });
        prev = now;
        frames++;
        if (y >= max || frames > 900) return resolve();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    window.scrollTo(0, 0);
    return { samples: targets.length, frames, movedWithScroll: moved.size, movedAtRest };
  });
};

for (const url of targets) {
  const slug = new URL(url).pathname.replace(/\W+/g, '_') || 'root';
  const perBp = readJSON(out('profile', `${slug}.json`)) || {}; // merge, never clobber other bps
  for (const bp of (BPS.length ? BPS : BP_SET)) {
    const data = await withPage(bp, async (page) => {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const status = resp?.status();
      await settle(page);
      const p = await page.evaluate(probe);
      p.httpStatus = status;
      if (bp === 1440) p.motionProbe = await motionProbe(page);
      return p;
    });
    perBp[bp] = data;
    summary(
      `profile ${slug} @${bp} → status=${data.httpStatus} h=${data.pageHeight} sections=${data.sectionCount} mq=${data.mediaQueries.length} forms=${data.state.forms} tel=${data.state.tel} mailto=${data.state.mailto}`
    );
  }
  const p = writeJSON(out('profile', `${slug}.json`), perBp);
  summary(`  → ${p}`);
}
