// components/sections/ServicesCtaBand.tsx
// Contract row: docs/sections.md, our-section-id `services-cta-band`.
// Copy: content/copy.ts `services.cta-band` on route `/services`. ADAPTED, no reference
// pixel diff is measured (A-15, reference permanently unreachable).
//
// `ctas[0]` already contains the phone number ("Call (405) 555-0139"), so it is rendered
// verbatim as the call button's label - it must NOT be appended with the number again.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function ServicesCtaBand() {
  const s = getSection('/services', 'services.cta-band');

  return (
    <section className="band" data-surface="gradient" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="statement statement--center">
          <h2>{s.heading}</h2>
          {s.body?.map((p) => (
            <p key={p}>{p}</p>
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
