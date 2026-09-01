// components/sections/HomeProcess.tsx
// Contract row: docs/sections.md, our-section-id `home-process`.
// Copy: content/copy.ts `home.process` on route `/`. Read it, never rewrite it.
//
// NOVEL, no reference counterpart - measured on token conformance at zero violations.
// Four ordered-step cards on the white surface (no data-surface attribute); the ordinal
// is decorative (aria-hidden), the card heading carries the accessible name.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeProcess() {
  const s = getSection('/', 'home.process');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <div className="grid grid--4">
          {s.cards?.map((card, i) => (
            <div className="card" key={card.heading}>
              <span className="card__step" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="card__title">{card.heading}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
