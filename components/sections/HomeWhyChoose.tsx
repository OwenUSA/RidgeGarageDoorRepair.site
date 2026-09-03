// components/sections/HomeWhyChoose.tsx
//
// Contract row: docs/sections.md, our-section-id `home-why-choose`.
// Copy: content/copy.ts `home.why-choose` on route `/`. Read it, never rewrite it.
//
// ADAPTED band paired against reference `s11-why-choose`. Contract: one h2 + an intro
// paragraph (body[0]) + four reason paragraphs (body[1..4]) rendered as a checklist —
// NOT four headed cards. data-surface="alt".
//
// NOTE (handback-avoided, recorded per instructions): the slot `home.why-choose.bg`
// exists in assets/INVENTORY.md as a near-white section-average placeholder. It is
// deliberately NOT applied here as a band background — a near-white fill under body
// text is the F-12 weak-fill trap and would make the alt surface's painted contrast
// unmeasurable. Left unused by design.

import { Award, Clock3, Gem, ThumbsUp } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

// The reference runs this band as a full-bleed photograph under a dark scrim, with the
// reasons as a 2x2 grid of hairline panes rather than a checklist. The background is the
// flat-fill placeholder for the slot (`home.why-choose.bg`, 1440x1092 at the wide
// breakpoint) until the terminal asset drop-in - decorative, so it is a background image
// and never an <img> with alt text (F-02).
const ICONS = [Award, Gem, Clock3, ThumbsUp];

export default function HomeWhyChoose() {
  const s = getSection('/', 'home.why-choose');
  const reasons = (s.body ?? []).slice(1, 5);

  return (
    <section
      className="band band--art whyband"
      data-section={dataSection(s.id)}
      data-surface="deep"
      style={{ backgroundImage: 'url(/placeholders/home.why-choose.bg-1440x1092.jpg)' }}
    >
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <div className="grid grid--2 grid--even whyband__grid">
          {reasons.map((reason, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <div className="card" key={reason}>
                <span className="card__icon">
                  <Icon size={34} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p>{reason}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
