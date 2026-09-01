// FALLBACK ONLY. costarroofinginc.com went behind a JS bot wall between Prompt 1 and
// Prompt 2+3+4 ("One moment, please...", 51 chars, headless AND headed with a real UA).
// CLAUDE.md pre-answered this: "one retry headed with a normal UA, then fall back to
// profiling a local saved copy". Our local saved copy is the Prompt 1 text capture in
// .harness/text/*.json, taken when the site was still open.
//
// This rebuilds the shape _shared/harness/src/similarity.mjs expects from refcopy.mjs
// (.harness/refcopy.json, keyed by reference path, sections carrying idx/text/chars).
// `text` is reconstructed as headings + paragraphs, so `chars` is body+heading text only
// and excludes button labels and stray nodes that the live extractor's el.textContent
// would have included. Recorded in docs/known-divergence.md as F-10.
import { readFileSync, writeFileSync } from 'node:fs';

const PAGES = { '/': 'root', '/about-us/': 'about', '/services/': 'services', '/contact-us/': 'contact', '/privacy-policy/': 'privacy' };

const out = {};
for (const [refPath, file] of Object.entries(PAGES)) {
  const j = JSON.parse(readFileSync(`.harness/text/${file}.json`, 'utf8'));
  out[refPath] = j.sections.map((s, i) => {
    const headings = (s.headings ?? []).map((h) => (typeof h === 'string' ? h : h.text));
    const paragraphs = s.paras ?? [];
    const text = [...headings, ...paragraphs].join(' ').replace(/\s+/g, ' ').trim();
    return {
      idx: i,
      ourSection: s.section,
      heading: headings[0] ?? '',
      headings, paragraphs,
      buttons: s.btns ?? [],
      text, chars: text.length,
      headingChars: s.headingChars ?? headings.join(' ').length,
      bodyChars: s.bodyChars ?? paragraphs.join(' ').length,
    };
  });
  console.log(refPath, out[refPath].length, 'sections,', out[refPath].reduce((a, s) => a + s.chars, 0), 'chars');
}
writeFileSync('.harness/refcopy.json', JSON.stringify(out, null, 1));
console.log('-> .harness/refcopy.json (reconstructed from Prompt 1 capture)');
