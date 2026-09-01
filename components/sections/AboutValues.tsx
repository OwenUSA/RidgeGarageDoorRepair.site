// components/sections/AboutValues.tsx
// Contract row: docs/sections.md, our-section-id `about-values`.
// Copy: content/copy.ts `about.values` on route `/about`. Read it, never rewrite it.
//
// The reference slot `about.values.img` (one image beside a four-card row) is
// deliberately NOT used here - dropping a single image into a four-up card grid
// would fight the cards' own heights and has no natural place in `.grid--4`. That
// unused slot is reported as a note row rather than silently dropped.

import { dataSection, getSection } from '@/lib/sections';

export default function AboutValues() {
  const s = getSection('/about', 'about.values');

  return (
    <section className="band" data-surface="alt" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="grid grid--4">
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
