// STEP B — capture one side (ref | ours) for one route at one breakpoint.
// Writes .harness/<side>/<route>/<bp>/{full.png, <sectionId>.png, metrics.json}
// Prints one summary line. Never dumps a trace.
//
//   node harness/capture.mjs --side=ref  --route=/ --bp=1440
//   node harness/capture.mjs --side=ours --route=/ --bp=390 --section=home.hero
import { withPage, settle, writeJSON, out, summary, FREEZE_CSS, LOCAL } from './lib.mjs';
import { SECTION_SEL, refBands, METRICS_FN } from './bands.mjs';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

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

const side = arg('side', 'ours');
const route = normRoute(arg('route', '/'));
const bp = Number(arg('bp', '1440'));
const only = arg('section', null);
const slug = route === '/' ? 'root' : route.replace(/\W+/g, '_').replace(/^_|_$/g, '');

const routeDef = MAP.routes[route];
if (!routeDef) throw new Error(`route ${route} not in harness/sections.json`);

const dir = out(side, slug, String(bp));
mkdirSync(dir, { recursive: true });

const url = side === 'ref' ? routeDef.refUrl : LOCAL + route;

const res = await withPage(bp, async (page) => {
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(page);
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  // resolve section nodes -> stable ids
  const handles = await page.evaluateHandle(
    ({ sel, side, sections }) => {
      const bands = (() => {
        if (side === 'ours') {
          return [...document.querySelectorAll('[data-section]')].map((n) => ({
            id: n.getAttribute('data-section'),
            n,
          }));
        }
        let nodes = [...document.querySelectorAll(sel)];
        nodes = nodes.filter((n) => !nodes.some((o) => o !== n && o.contains(n)));
        nodes = nodes.filter((n) => n.getBoundingClientRect().height >= 40);
        nodes.sort(
          (a, b) =>
            a.getBoundingClientRect().top + scrollY - (b.getBoundingClientRect().top + scrollY)
        );
        return sections
          .filter((s) => s.refIndex != null && nodes[s.refIndex])
          .map((s) => ({ id: s.id, n: nodes[s.refIndex] }));
      })();
      window.__bands = bands;
      return bands.map((b) => b.id);
    },
    { sel: SECTION_SEL, side, sections: routeDef.sections }
  );
  const ids = await handles.jsonValue();

  const metrics = await page.evaluate(
    (fnSrc) => {
      const metrics = eval('(' + fnSrc + ')');
      const o = {};
      for (const { id, n } of window.__bands) {
        const m = metrics(n);
        const r = n.getBoundingClientRect();
        m.absY = Math.round(r.top + scrollY);
        o[id] = m;
      }
      o.__page = {
        height: document.documentElement.scrollHeight,
        width: innerWidth,
        title: document.title,
      };
      return o;
    },
    METRICS_FN.toString()
  );

  await page.screenshot({ path: join(dir, 'full.png'), fullPage: true });

  const shot = [];
  for (const { id } of ids.map((id) => ({ id }))) {
    if (only && id !== only) continue;
    const m = metrics[id];
    if (!m || m.box.h < 20) continue;
    // clip in page coordinates — fullPage screenshot semantics
    await page
      .screenshot({
        path: join(dir, `${id}.png`),
        clip: { x: 0, y: m.absY, width: Math.min(bp, m.box.w || bp), height: m.box.h },
        fullPage: true,
      })
      .then(() => shot.push(id))
      .catch(() => {});
  }
  return { metrics, ids, shot };
});

writeJSON(join(dir, 'metrics.json'), res.metrics);
summary(
  `capture ${side} ${route} @${bp} → sections=${res.ids.length} shot=${res.shot.length} h=${res.metrics.__page.height} → ${dir}`
);
