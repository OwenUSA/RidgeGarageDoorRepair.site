import type { Metadata } from 'next';
import AboutPageHero from '@/components/sections/AboutPageHero';
import AboutStory from '@/components/sections/AboutStory';
import AboutValues from '@/components/sections/AboutValues';
import AboutCtaBand from '@/components/sections/AboutCtaBand';
import { getMeta } from '@/lib/sections';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. No founding year, headcount or credential appears on this route; each is a TODO(fact).

const meta = getMeta('/about');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <>
      <AboutPageHero />
      <AboutStory />
      <AboutValues />
      <AboutCtaBand />
    </>
  );
}
