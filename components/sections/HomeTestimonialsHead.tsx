// components/sections/HomeTestimonialsHead.tsx
// BUILT by the owning section agent. ADAPTED section: the testimonials head plus
// three customer quote cards. No AggregateRating/Review JSON-LD is added — plain
// text only, no structured markup.
//
// Contract row: docs/sections.md, our-section-id `home-testimonials-head`.
// Copy: content/copy.ts `home.testimonials-head` on route `/`. Read it, never rewrite it.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeTestimonialsHead() {
  const s = getSection('/', 'home.testimonials-head');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head sec-head--center sec-head--wide">
          <h2>{s.heading}</h2>
          <p className="sec-head__sub">{s.subheading}</p>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="grid grid--3">
          {s.testimonials?.map((t) => (
            <article className="tphold" key={t.name}>
              <p className="tphold__tag" aria-hidden="true">
                {'★'.repeat(t.rating)}
              </p>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <p className="u-muted">{t.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
