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

import { Check } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

export default function HomeWhyChoose() {
  const s = getSection('/', 'home.why-choose');
  const reasons = (s.body ?? []).slice(1, 5);

  return (
    <section className="band" data-section={dataSection(s.id)} data-surface="alt">
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <ul className="checklist">
          {reasons.map((reason) => (
            <li key={reason}>
              <Check size={20} strokeWidth={2.5} aria-hidden="true" />
              <p>{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
