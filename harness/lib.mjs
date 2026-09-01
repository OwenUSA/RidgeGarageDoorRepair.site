// Shared harness plumbing. Nothing here prints a trace to stdout — every pass writes
// to .harness/ and returns a summary line. See CLAUDE.md "Cost discipline".
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const OUT = '.harness';
export const BP_SET = [390, 768, 1440];
export const REFERENCE = 'https://costarroofinginc.com/';
export const LOCAL = 'http://localhost:3104';
export const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export function ensure(p) {
  mkdirSync(dirname(p), { recursive: true });
  return p;
}
export function writeJSON(p, obj) {
  ensure(p);
  writeFileSync(p, JSON.stringify(obj, null, 2));
  return p;
}
export function readJSON(p) {
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}
export function out(...parts) {
  return join(OUT, ...parts);
}

/**
 * One browser, one context per breakpoint. Headed fallback is decided up front
 * (goal-prompt): one retry headed with a normal UA, then a local saved copy.
 */
export async function withPage(bp, fn, { headed = false, blockThirdParty = false } = {}) {
  const browser = await chromium.launch({ headless: !headed });
  try {
    const context = await browser.newContext({
      viewport: { width: bp, height: bp < 768 ? 844 : bp < 1440 ? 1024 : 900 },
      deviceScaleFactor: 1,
      userAgent: UA,
      reducedMotion: 'no-preference',
      isMobile: bp < 768,
      hasTouch: bp < 768,
    });
    if (blockThirdParty) {
      await context.route('**/*', (route) => {
        const u = route.request().url();
        if (/googletagmanager|google-analytics|facebook|hotjar|clarity|doubleclick/.test(u))
          return route.abort();
        return route.continue();
      });
    }
    const page = await context.newPage();
    const result = await fn(page, context);
    await context.close();
    return result;
  } finally {
    await browser.close();
  }
}

/** Settle: fonts loaded, lazy images in, animations past their first tick. */
export async function settle(page, { scrollPass = true } = {}) {
  await page.waitForLoadState('domcontentloaded');
  // Wait for hydration BEFORE measuring. The reference is WordPress/Elementor: its FAQ
  // accordion renders every panel open in the HTML and collapses them once its JS runs,
  // which changes page height by ~2x. Measuring pre-hydration reads a page nobody sees.
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(600);
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  if (scrollPass) {
    // A single slow pass to trigger IntersectionObserver reveals and lazy images,
    // then back to top. NOT a measurement scroll — see rafTrace for that.
    await page.evaluate(async () => {
      const step = Math.max(200, window.innerHeight / 2);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 250));
    });
  }
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/** Freeze anything that would make two captures of the same page differ. */
export const FREEZE_CSS = `
  *, *::before, *::after {
    animation-play-state: paused !important;
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }
  video, iframe { visibility: hidden !important; }
`;

export function summary(line) {
  process.stdout.write(line.endsWith('\n') ? line : line + '\n');
}
