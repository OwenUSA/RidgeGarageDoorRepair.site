// components/sections/HomeExpertiseBand.tsx
//
// Contract row: docs/sections.md, our-section-id `home-expertise-band`.
// Copy: content/copy.ts `home.expertise-band` on route `/`. Read it, never rewrite it.
//
// ADAPTED band paired against reference `s06-expertise`. A full-bleed statement band:
// heading and two `body` paragraphs, no cards, no image. This is the band carrying the
// CTA gradient (data-surface="gradient"), so it stays text-only, centered.

import { dataSection, getSection } from '@/lib/sections';

export default function HomeExpertiseBand() {
  const s = getSection('/', 'home.expertise-band');

  return (
    <section className="band" data-section={dataSection(s.id)} data-surface="gradient">
      <div className="u-container">
        <div className="statement statement--center">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
          <p>{s.body?.[1]}</p>
        </div>
      </div>
    </section>
  );
}
