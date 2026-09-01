// components/sections/HomeHero.tsx - LEAD-BUILT. The hero touches the shared CTA
// vocabulary and the shared placeholder-art convention, so it is not delegated.
//
// Contract: docs/sections.md row `/ | s01-hero | home-hero | ADAPTED`.
// Copy: content/copy.ts `home.hero`. Not rewritten here - a section component reads
// copy, it never authors it.
//
// Three things this band must NOT do, each of which has a spec behind it:
//   * no entrance animation, no opacity:0 initial state, no IntersectionObserver
//     (docs/behavior/08 - the no-motion baseline is a positive instruction, and the
//     reference's own rAF probe found 0 of 25 tracked elements moving over 901 frames);
//   * no invented fact - no years, no jobs completed, no "same day", no rating
//     (D-14/D-17). What the eyebrow and the lede carry is the proposition, which is
//     transparency, and the proposition is checkable rather than claimed;
//   * no hero <img> with descriptive alt text. The art slot is a flat-fill placeholder
//     until the terminal drop-in (F-02), so it is decorative and marked as such.
//
// The art slot `home.hero.art` is 577x607 at 1440 and is ABSENT at 390 and 768 on the
// reference (assets/INVENTORY.md). So the art column is dropped under 1025 rather than
// letterboxed into a width it never had.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

export default function HomeHero() {
  const s = getSection('/', 'home.hero');

  return (
    <section className="hero" data-section={dataSection(s.id)}>
      <div className="u-container hero__grid">
        <div className="hero__copy">
          <p className="u-eyebrow">{s.eyebrow}</p>
          <h1>{s.heading}</h1>
          <p className="hero__lede u-muted">{s.body?.[0]}</p>

          <div className="actions">
            {/* The call-now CTA. One token, one class, gated once - the same fill as
                the header button, every band and the mobile sticky bar. A-14 gives it
                the 44px box in globals.css rather than here. */}
            <a className="u-btn u-btn--call" href={business.phone.href}>
              <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
              Call {business.phone.display}
            </a>
            <Link className="u-btn u-btn--ghost" href="/contact">
              {s.ctas?.[0]}
            </Link>
          </div>
        </div>

        <div className="hero__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/placeholders/home.hero.art.svg"
            alt=""
            width={577}
            height={607}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
