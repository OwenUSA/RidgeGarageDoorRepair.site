// components/sections/HomeCtaBand.tsx
// BUILT by the owning section agent. ADAPTED section: a thin CTA strip, heading plus two
// CTAs, no body copy. The call CTA's accessible name includes the phone number a caller
// actually needs — ctas[0] plus the number as a separate <span> inside the same anchor,
// never a paraphrase like "instant quote" and never a price or response-time claim.
//
// Contract row: docs/sections.md, our-section-id `home-cta-band`.
// Copy: content/copy.ts `home.cta-band` on route `/`. Read it, never rewrite it.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function HomeCtaBand() {
  const s = getSection('/', 'home.cta-band');

  return (
    <section className="band band--tight" data-surface="gradient" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="statement statement--center">
          <h2>{s.heading}</h2>
        </div>

        <div className="actions actions--center">
          <a className="u-btn u-btn--call" href={business.phone.href}>
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            {s.ctas?.[0]} <span>{business.phone.display}</span>
          </a>
          <Link className="u-btn u-btn--ghost" href="/contact">
            {s.ctas?.[1]}
          </Link>
        </div>
      </div>
    </section>
  );
}
