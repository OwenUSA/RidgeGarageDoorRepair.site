// components/sections/ServicesPageHero.tsx
// Contract row: docs/sections.md, our-section-id `services-page-hero`.
// Copy: content/copy.ts `services.page-hero` on route `/services`. ADAPTED, no reference
// pixel diff is measured (A-15, reference permanently unreachable).
//
// This is the page-title band, so the heading is an <h1>, not an <h2>.
//
// asset note: `services.page-hero.bg` is nominally a background art slot (1440x390,
// assets/INVENTORY.md), but per the dispatch instructions its placeholder fill is a
// section-average near-white (F-12) which makes painted contrast for the body text
// unmeasurable underneath it. So the background art is deliberately NOT applied here;
// the band renders as a plain alt surface instead. Reported as a note row, not a defect.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function ServicesPageHero() {
  const s = getSection('/services', 'services.page-hero');

  return (
    <section className="band" data-surface="alt" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h1>{s.heading}</h1>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="actions">
          <a className="u-btn u-btn--call" href={business.phone.href}>
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            Call {business.phone.display}
          </a>
          <Link className="u-btn u-btn--ghost" href="/contact">
            Request a callback
          </Link>
        </div>
      </div>
    </section>
  );
}
