// components/sections/AboutPageHero.tsx
// Contract row: docs/sections.md, our-section-id `about-page-hero`.
// Copy: content/copy.ts `about.page-hero` on route `/about`. Read it, never rewrite it.
//
// Page-title band (h1), so this is where the route's accessible name lives. The
// reference slot `about.page-hero.bg` is a section-average near-white fill
// (assets/INVENTORY.md, F-12) and is NOT applied here as a background image: a
// near-white image sitting under body text on a white band would make painted
// contrast unmeasurable. That choice is reported as a note row rather than silently
// dropping the slot.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function AboutPageHero() {
  const s = getSection('/about', 'about.page-hero');

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
          <Link className="u-btn u-btn--ghost" href="/services">
            See what we do
          </Link>
        </div>
      </div>
    </section>
  );
}
