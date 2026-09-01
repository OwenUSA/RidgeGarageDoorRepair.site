import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// PROMPT 5 STUB. The shared shell only; the /services sections land in the build wave.
// data-section carries the our-section-id from the machine-readable table at the foot of
// docs/sections.md, dash-form, so identity pairing fires instead of the progress join.

export const metadata: Metadata = {
  title: copy.routes['/services'].meta.title,
  description: copy.routes['/services'].meta.description,
  alternates: { canonical: '/services' },
};

export default function Page() {
  return (
    <section className="stub u-container" data-section="services-page-hero">
      <h1>Garage door services in Yukon</h1>
      <p className="stub__note u-muted">Section shell only. Content lands in the build wave.</p>
    </section>
  );
}
