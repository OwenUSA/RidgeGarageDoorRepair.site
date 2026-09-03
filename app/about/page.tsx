import type { Metadata } from 'next';
import AboutPageHero from '@/components/sections/AboutPageHero';
import AboutStory from '@/components/sections/AboutStory';
import AboutValues from '@/components/sections/AboutValues';
import AboutCtaBand from '@/components/sections/AboutCtaBand';
import { getMeta } from '@/lib/sections';
import { business } from '@/lib/business';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. Founding year, headcount and credential copy live in content/copy.ts.

const meta = getMeta('/about');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${business.url}/about`,
    siteName: business.name,
    type: 'website',
    images: [{ url: '/placeholders/about.page-hero.bg-1440x438.svg', width: 1440, height: 438, alt: `${business.name} team` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/placeholders/about.page-hero.bg-1440x438.svg'],
  },
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
