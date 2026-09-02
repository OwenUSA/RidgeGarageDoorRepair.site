// components/sections/HomeTransparency.tsx
// Contract row: docs/sections.md, our-section-id `home-transparency`.
// Copy: content/copy.ts `home.transparency` on route `/`. Read it, never rewrite it.
//
// NOVEL, no reference counterpart (docs/sections.md) - measured on token conformance at
// zero violations, never on pixel diff. Cards are plain, non-interactive divs (no anchor,
// no hover lift - docs/behavior/04 only applies to a card that is itself a link) on the
// alt surface, per the lead's per-section guidance.

import { PackageOpen, ReceiptText, ShieldCheck } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

// The reference puts a trio of centred line-icon cards immediately under the hero.
// These are lucide glyphs redrawn at the reference's own box (D-09/D-11) - nothing was
// lifted. Order follows copy.ts card order and is positional on purpose: the cards are a
// fixed set authored in one place, so an id lookup would only add a second spelling.
const ICONS = [PackageOpen, ReceiptText, ShieldCheck];

export default function HomeTransparency() {
  const s = getSection('/', 'home.transparency');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head sec-head--center sec-head--wide">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="grid grid--3 grid--even">
          {s.cards?.map((card, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <div className="card card--center" key={card.heading}>
                <span className="card__icon">
                  <Icon size={52} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="card__title">{card.heading}</h3>
                <p className="u-muted">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
