// components/sections/ServicesSymptoms.tsx
// Contract row: docs/sections.md, our-section-id `services-symptoms`.
// Copy: content/copy.ts `services.symptoms` on route `/services`. NOVEL - no reference
// counterpart (the reference's services live on its home page), measured on token
// conformance at zero violations, not on pixel diff.
//
// Four symptom cards, each with its own in-page anchor id (derived from a slug of the
// card heading) so a caller elsewhere on the page can jump straight to a symptom. The
// `[id] { scroll-margin-top }` rule in sections.css already handles arrival framing, so
// nothing extra is needed here for that.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

function slug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ServicesSymptoms() {
  const s = getSection('/services', 'services.symptoms');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="stack">
          {s.cards?.map((card) => (
            <article key={card.heading} id={slug(card.heading)} className="card">
              <h3 className="card__title">{card.heading}</h3>
              <p>{card.body}</p>
              {card.items && (
                <ul className="taglist">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              <div className="actions">
                <a className="u-btn u-btn--call" href={business.phone.href}>
                  <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
                  Call {business.phone.display}
                </a>
                <Link className="u-btn u-btn--ghost" href="/contact">
                  Request a callback
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
