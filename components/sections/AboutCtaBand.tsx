// components/sections/AboutCtaBand.tsx
// Contract row: docs/sections.md, our-section-id `about-cta-band`.
// Copy: content/copy.ts `about.cta-band` on route `/about`. Read it, never rewrite it.
//
// `s.ctas[0]` already reads "Call (405) 555-0139" - it is used verbatim as the call
// button's label and the phone number is not appended a second time.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function AboutCtaBand() {
  const s = getSection('/about', 'about.cta-band');

  return (
    <section className="band" data-surface="gradient" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="statement statement--center">
          <h2>{s.heading}</h2>
          {s.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="actions actions--center">
          <a className="u-btn u-btn--call" href={business.phone.href}>
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            {s.ctas?.[0]}
          </a>
          <Link className="u-btn u-btn--ghost" href="/contact">
            Request a callback
          </Link>
        </div>
      </div>
    </section>
  );
}
