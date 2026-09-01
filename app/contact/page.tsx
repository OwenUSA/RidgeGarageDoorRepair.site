import type { Metadata } from 'next';
import BusinessMap from '@/components/BusinessMap';
import { copy } from '@/content/copy';

// PROMPT 5 STUB. The shared shell only; the /contact sections land in the build wave.
// data-section carries the our-section-id from the machine-readable table at the foot of
// docs/sections.md, dash-form, so identity pairing fires instead of the progress join.

export const metadata: Metadata = {
  title: copy.routes['/contact'].meta.title,
  description: copy.routes['/contact'].meta.description,
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return (
    <>
      <section className="stub u-container" data-section="contact-page-hero">
        <h1>Contact Ridge Garage Door Repair</h1>
        <p className="stub__note u-muted">Section shell only. The form lands in the build wave.</p>
      </section>

      {/* D-08: the contact map, coordinates only, zoom ~15, beside the form. */}
      <section className="stub" data-section="contact-map" data-surface="alt">
        <div className="u-container">
          <h2>Find us</h2>
          <BusinessMap zoom={15} />
        </div>
      </section>
    </>
  );
}
