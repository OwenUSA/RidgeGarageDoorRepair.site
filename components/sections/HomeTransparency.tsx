// components/sections/HomeTransparency.tsx
// Contract row: docs/sections.md, our-section-id `home-transparency`.
// Copy: content/copy.ts `home.transparency` on route `/`. Read it, never rewrite it.
//
// NOVEL, no reference counterpart (docs/sections.md) - measured on token conformance at
// zero violations, never on pixel diff. Cards are plain, non-interactive divs (no anchor,
// no hover lift - docs/behavior/04 only applies to a card that is itself a link) on the
// alt surface, per the lead's per-section guidance.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeTransparency() {
  const s = getSection('/', 'home.transparency');

  return (
    <section className="band" data-section={dataSection(s.id)} data-surface="alt">
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <div className="grid grid--3">
          {s.cards?.map((card) => (
            <div className="card" key={card.heading}>
              <h3 className="card__title">{card.heading}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
