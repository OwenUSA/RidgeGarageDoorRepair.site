// components/sections/PrivacyBody.tsx
// BUILT by the /privacy route agent. copy id `privacy.body`, route `/privacy`, NOVEL.
//
// Contract row: docs/sections.md, our-section-id `privacy-body`.
// Copy: content/copy.ts `privacy.body` on route `/privacy`. Read here, never rewritten -
// heading, subheading and all fourteen numbered clauses render verbatim and in order.
//
// NOVEL means there is no reference band to diverge from: this is measured once, on
// token conformance at zero violations, not per breakpoint (A-9). Every class below
// already exists in app/sections.css (`.band`, `.u-container`, `.legal`, `.legal__note`)
// or app/globals.css (`.u-muted`) - nothing here is inline-styled and nothing invents a
// new class, so there is nothing that could resolve outside the extracted token set.
//
// The mandatory HTML comment is rendered via dangerouslySetInnerHTML because a plain JSX
// {/* */} comment never reaches the compiled HTML output and would not satisfy D-16 - a
// human viewing source, not just the rendered page, has to see the warning.
//
// No motion, no 'use client', no state: this is a static server component reading static
// copy, matching D-19/D-15 and the no-motion baseline used across the rest of the site.

import { dataSection, getSection } from '@/lib/sections';

export default function PrivacyBody() {
  const s = getSection('/privacy', 'privacy.body');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="legal">
          <div
            dangerouslySetInnerHTML={{
              __html: '<!-- UNREVIEWED TEMPLATE — requires legal review before launch -->',
            }}
          />
          <h1>{s.heading}</h1>
          <p className="legal__note">{s.subheading}</p>

          {s.cards?.map((card) => (
            <section key={card.heading}>
              <h2>{card.heading}</h2>
              <p className="u-muted">{card.body}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
