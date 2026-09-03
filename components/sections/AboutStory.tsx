// components/sections/AboutStory.tsx
// Contract row: docs/sections.md, our-section-id `about-story`.
// Copy: content/copy.ts `about.story` on route `/about`. Read it, never rewrite it.
//
// The founding year and current headcount (FACT-06, FACT-07) are filled in copy.ts.

import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function AboutStory() {
  const s = getSection('/about', 'about.story');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="split split--wide-text">
          <div>
            <div className="sec-head">
              <h2>{s.heading}</h2>
            </div>
            <div className="prose">
              {s.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="actions">
              <a className="u-btn u-btn--call" href={business.phone.href}>
                {s.ctas?.[0]}
              </a>
            </div>
          </div>

          <div className="split__media">
            <div className="media" style={{ aspectRatio: '620 / 450' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/placeholders/about.story.img-620x450.svg"
                alt=""
                width={620}
                height={450}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
