// components/sections/ContactPageHero.tsx
// Contract row: docs/sections.md, our-section-id `contact-page-hero`.
// Copy: content/copy.ts `contact.page-hero` on route `/contact`. Read it, never rewrite it.
//
// NOTE: the `contact.page-hero.bg` placeholder is a section-average near-white fill
// (F-12) and is deliberately NOT applied as a background image here — a near-white
// image under body text makes painted contrast unmeasurable. See report row.

import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function ContactPageHero() {
  const s = getSection('/contact', 'contact.page-hero');

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
        </div>
      </div>
    </section>
  );
}
