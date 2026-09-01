// components/sections/ContactMap.tsx
// Contract row: docs/sections.md, our-section-id `contact-map`.
// Copy: content/copy.ts `contact.map` on route `/contact`. Read it, never rewrite it.
//
// D-08: zoom ~15 here (the home page is ~13). BusinessMap already supplies the keyless
// coordinate-only embed, loading="lazy", the explicit title, the aspect-ratio wrapper and
// the "Get directions" link — none of that is reimplemented or duplicated here.

import BusinessMap from '@/components/BusinessMap';
import { dataSection, getSection } from '@/lib/sections';

export default function ContactMap() {
  const s = getSection('/contact', 'contact.map');

  return (
    <section className="band" data-surface="alt" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="mapsec__grid">
          <div className="mapsec__copy">
            <h2>{s.heading}</h2>
            {s.body?.map((p) => (
              <p key={p} className="u-muted">
                {p}
              </p>
            ))}
          </div>

          <BusinessMap zoom={15} />
        </div>
      </div>
    </section>
  );
}
