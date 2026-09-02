// components/sections/HomeComponentsGrid.tsx
//
// Contract row: docs/sections.md, our-section-id `home-components-grid`.
// Copy: content/copy.ts `home.components-grid` on route `/`. Read it, never rewrite it.
//
// ADAPTED band paired against reference `s09-components`. Heading, one intro `body`
// paragraph, three cards — each opens with its own placeholder image (img1/img2/img3,
// all three at the 1440 box 387x260 per assets/INVENTORY.md) inside a `.media` wrapper.
// White surface: no data-surface attribute. Card hover/press/focus is the CSS contract
// in docs/behavior/04-service-card.md — nothing here reimplements it.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeComponentsGrid() {
  const s = getSection('/', 'home.components-grid');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head sec-head--center sec-head--wide">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="grid grid--3 grid--even">
          {s.cards?.map((card, i) => (
            <div className="card" key={card.heading}>
              <div className="media" style={{ aspectRatio: '387 / 260' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/placeholders/${s.id}.img${i + 1}-387x260.svg`}
                  alt=""
                  width={387}
                  height={260}
                  decoding="async"
                />
              </div>
              <h3 className="card__title">{card.heading}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
