import type { Metadata } from 'next';
import BusinessMap from '@/components/BusinessMap';
import { business } from '@/lib/business';
import { copy } from '@/content/copy';

// PROMPT 5 STUB. The shell only. Every home section listed in docs/sections.md lands in
// the build wave (Prompt 6+7); this file renders the shared shell so the palette,
// tokens and both render-truth gates can be measured against a real page first.
//
// data-section carries the OUR-SECTION-ID from the machine-readable table at the foot of
// docs/sections.md, dash-form. Without it, identity pairing never fires and every band
// falls through to the page-progress join -- which mispairs exactly where this build
// deliberately reorders or drops a reference band.

export const metadata: Metadata = {
  title: copy.routes['/'].meta.title,
  description: copy.routes['/'].meta.description,
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <>
      <section className="stub u-container" data-section="home-hero">
        <p className="u-eyebrow stub__eyebrow">{business.serviceArea}</p>
        <h1>{business.tagline}</h1>
        <p className="stub__note u-muted">
          Section shell only. The home page bands land in the build wave.
        </p>
      </section>

      {/* D-08: the home map. Coordinates only, zoom ~13. */}
      <section className="stub" data-section="home-map" data-surface="alt">
        <div className="u-container">
          <h2>Where we work</h2>
          <p className="stub__note u-muted">{business.serviceArea}</p>
          <BusinessMap zoom={13} />
        </div>
      </section>
    </>
  );
}
