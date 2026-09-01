import type { Metadata } from 'next';
import { copy } from '@/content/copy';

// PROMPT 5 STUB. The shared shell only; the /about sections land in the build wave.
// data-section carries the our-section-id from the machine-readable table at the foot of
// docs/sections.md, dash-form, so identity pairing fires instead of the progress join.

export const metadata: Metadata = {
  title: copy.routes['/about'].meta.title,
  description: copy.routes['/about'].meta.description,
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <section className="stub u-container" data-section="about-page-hero">
      <h1>About Ridge Garage Door Repair</h1>
      <p className="stub__note u-muted">Section shell only. Content lands in the build wave.</p>
    </section>
  );
}
