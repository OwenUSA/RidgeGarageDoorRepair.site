// components/sections/HomeTrustStrip.tsx
// BUILT by the owning section agent. ADAPTED section: the badge row. Its three `cards`
// carry the shop's licence, insurance and trade-affiliation copy from content/copy.ts.
// The chip box is built at the reference's own 100px height (`.factchip` in
// app/sections.css).
//
// Contract row: docs/sections.md, our-section-id `home-trust-strip`.
// Copy: content/copy.ts `home.trust-strip` on route `/`. Read it, never rewrite it.
// This section has no heading in copy.ts, so none is rendered.

import { ShieldCheck, FileCheck, Award } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

const ICONS = [ShieldCheck, FileCheck, Award];

export default function HomeTrustStrip() {
  const s = getSection('/', 'home.trust-strip');

  return (
    <section className="band band--tight" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="grid grid--3">
          {s.cards?.map((card, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <div className="factchip" key={card.heading}>
                <Icon size={28} strokeWidth={2} aria-hidden="true" />
                <div>
                  <p className="factchip__label">{card.heading}</p>
                  <p className="factchip__note">{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
