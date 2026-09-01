// components/sections/HomeTrustStrip.tsx
// BUILT by the owning section agent. ADAPTED section, D-14: the badge row. Its three
// `cards` are literal TODO(fact) placeholders and MUST ship as placeholders — no licence,
// insurance, bond, BBB rating, certification, trade-body affiliation, years-in-business
// figure or jobs-completed count may be invented here. The chip box is intentionally
// built at the reference's own 100px height (`.factchip` in app/sections.css) and left
// visibly empty; that visibility is the point, not a bug to fix.
//
// Contract row: docs/sections.md, our-section-id `home-trust-strip`.
// Copy: content/copy.ts `home.trust-strip` on route `/`. Read it, never rewrite it.
// This section has no heading in copy.ts, so none is rendered.

import { ShieldQuestion, FileQuestion, HelpCircle } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

const ICONS = [ShieldQuestion, FileQuestion, HelpCircle];

export default function HomeTrustStrip() {
  const s = getSection('/', 'home.trust-strip');

  return (
    <section className="band band--tight" data-surface="alt" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="grid grid--3">
          {s.cards?.map((card, i) => {
            const Icon = ICONS[i] ?? HelpCircle;
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
