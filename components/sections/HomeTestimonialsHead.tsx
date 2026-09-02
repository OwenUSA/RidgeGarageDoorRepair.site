// components/sections/HomeTestimonialsHead.tsx
// BUILT by the owning section agent. ADAPTED section, D-13: the testimonials head plus
// three placeholder cards. No customer name, quote, star rating, review count or date is
// invented, and no AggregateRating/Review JSON-LD exists anywhere on this site — none is
// added here either. The `.tphold` blocks are literal placeholders, decorative bars only.
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
          {[0, 1, 2].map((i) => (
            <article className="tphold" key={i}>
              <p className="tphold__tag">[TESTIMONIAL PLACEHOLDER]</p>
              <div className="tphold__lines" aria-hidden="true">
                <span className="tphold__line" />
                <span className="tphold__line" />
                <span className="tphold__line" />
                <span className="tphold__line tphold__line--short" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
