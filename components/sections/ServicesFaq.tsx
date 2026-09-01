'use client';

// components/sections/ServicesFaq.tsx
// Contract row: docs/sections.md, our-section-id `services-faq`.
// Copy: content/copy.ts `services.faq` on route `/services`. NOVEL - no reference
// counterpart, measured on token conformance at zero violations.
//
// Accordion mechanism per docs/behavior/05-accordion.md EXACTLY:
//   - a real <button> inside the heading, not <details>/<summary>;
//   - grid-template-rows 0fr -> 1fr transition already lives in sections.css;
//   - collapsed panels get `inert`, not `aria-hidden` (an aria-hidden focusable subtree
//     is a violation);
//   - MULTIPLE items may be open at once - this is a reference surface, not a wizard, so
//     state is a Set of open indices rather than a single "which one is open" value;
//   - first item open by default.
// No scrollHeight measurement, no max-height, no ResizeObserver - the CSS handles it.

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { dataSection, getSection } from '@/lib/sections';

export default function ServicesFaq() {
  const s = getSection('/services', 'services.faq');
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>

        <div className="acc">
          {s.cards?.map((card, i) => {
            const isOpen = open.has(i);
            const panelId = `services-faq-panel-${i}`;
            const btnId = `services-faq-btn-${i}`;
            return (
              <div key={card.heading} className="acc__item">
                <h3 className="acc__h">
                  <button
                    id={btnId}
                    type="button"
                    className="acc__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    {card.heading}
                    <ChevronDown size={20} strokeWidth={2.5} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="acc__panel"
                  id={panelId}
                  data-open={isOpen ? 'true' : 'false'}
                  inert={!isOpen}
                >
                  <div>
                    <p className="acc__body u-muted">{card.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
