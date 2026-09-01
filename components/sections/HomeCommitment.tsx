// components/sections/HomeCommitment.tsx
//
// Contract row: docs/sections.md, our-section-id `home-commitment`.
// Copy: content/copy.ts `home.commitment` on route `/`. Read it, never rewrite it.
//
// ADAPTED band paired against reference `s07-commitment`. Heading, three cards, and one
// closing `body` paragraph — copy.ts puts `body` AFTER `cards` for this section, so the
// paragraph renders after the grid. Layout per lead guidance: `.band` + `.sec-head` +
// a full-width `.media` (home.commitment.img, 1440 box 566x370) above the `.grid
// grid--3` of cards, then the closing paragraph in a `.prose` > `u-muted`. White surface.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeCommitment() {
  const s = getSection('/', 'home.commitment');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
        </div>

        <div className="media" style={{ aspectRatio: '566 / 370' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/placeholders/home.commitment.img-566x370.svg"
            alt=""
            width={566}
            height={370}
            decoding="async"
          />
        </div>

        <div className="grid grid--3">
          {s.cards?.map((card) => (
            <div className="card" key={card.heading}>
              <h3 className="card__title">{card.heading}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="prose">
          <p className="u-muted">{s.body?.[0]}</p>
        </div>
      </div>
    </section>
  );
}
