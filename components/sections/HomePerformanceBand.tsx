// components/sections/HomePerformanceBand.tsx
// BUILT by the owning section agent. ADAPTED section: reference retained, content
// swapped for our own copy and a placeholder image, so it is measured on structural
// metrics only (docs/sections.md), never on pixel diff.
//
// Contract row: docs/sections.md, our-section-id `home-performance-band`.
// Copy: content/copy.ts `home.performance-band` on route `/`. Read it, never rewrite it.
//
// Media slot `home.performance-band.img` is 620x550 at 1440 (assets/INVENTORY.md),
// rendered as a decorative flat-fill placeholder (empty alt) inside a `.media` wrapper
// per HomeHero's convention. No background-image anywhere on this white surface.

import { dataSection, getSection } from '@/lib/sections';

export default function HomePerformanceBand() {
  const s = getSection('/', 'home.performance-band');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container split">

        <div className="statement">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <div className="split__media">
          <div className="media" style={{ aspectRatio: '620 / 550' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholders/home.performance-band.img-620x550.jpg"
              alt=""
              width={620}
              height={550}
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
