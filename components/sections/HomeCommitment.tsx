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

import { Check } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

export default function HomeCommitment() {
  const s = getSection('/', 'home.commitment');

  // Reference shape: a staggered stack of check-led panes in one column, and the band's
  // own heading, its closing paragraph and the photograph in the other. The previous
  // layout stacked all three vertically, which put a full-width image between the head
  // and the cards and left the copy stranded at the bottom.
  return (
    <section className="band" data-section={dataSection(s.id)} data-surface="alt">
      <div className="u-container commit">
        <div className="commit__cards">
          {s.cards?.map((card) => (
            <div className="iconcard" key={card.heading}>
              <span className="iconcard__mark">
                <Check size={20} strokeWidth={3} aria-hidden="true" />
              </span>
              <div>
                <h3 className="iconcard__title">{card.heading}</h3>
                <p>{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="commit__copy">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>

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
        </div>
      </div>
    </section>
  );
}
