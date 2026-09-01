// components/sections/HomeAboutTeaser.tsx
// Contract row: docs/sections.md, our-section-id `home-about-teaser`.
// Copy: content/copy.ts `home.about-teaser` on route `/`. Read it, never rewrite it.
//
// ADAPTED: reference band s03-about retained, content swapped to our own copy
// (docs/sections.md). Two-column split, text-wide, per the lead's per-section guidance.
// copy.ts carries no cta for this section, so text and image only - no button.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeAboutTeaser() {
  const s = getSection('/', 'home.about-teaser');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container split split--wide-text">
        <div>
          <div className="sec-head">
            <h2>{s.heading}</h2>
          </div>
          <div className="prose">
            {s.body?.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="split__media">
          <div className="media" style={{ aspectRatio: '556 / 500' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholders/home.about-teaser.img-556x500.svg"
              alt=""
              width={556}
              height={500}
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
