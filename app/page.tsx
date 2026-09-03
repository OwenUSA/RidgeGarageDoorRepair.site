import type { Metadata } from 'next';
import HomeHero from '@/components/sections/HomeHero';
import HomeTransparency from '@/components/sections/HomeTransparency';
import HomeServicesGrid from '@/components/sections/HomeServicesGrid';
import HomeProcess from '@/components/sections/HomeProcess';
import HomeAboutTeaser from '@/components/sections/HomeAboutTeaser';
import HomeComponentsGrid from '@/components/sections/HomeComponentsGrid';
import HomeExpertiseBand from '@/components/sections/HomeExpertiseBand';
import HomeWhyChoose from '@/components/sections/HomeWhyChoose';
import HomeCommitment from '@/components/sections/HomeCommitment';
import HomePerformanceBand from '@/components/sections/HomePerformanceBand';
import HomeTrustStrip from '@/components/sections/HomeTrustStrip';
import HomeTestimonialsHead from '@/components/sections/HomeTestimonialsHead';
import HomeCtaBand from '@/components/sections/HomeCtaBand';
import HomeMap from '@/components/sections/HomeMap';
import { getMeta } from '@/lib/sections';
import { business } from '@/lib/business';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. Five reference bands are absent by decision, not by omission: the blog teaser (D-01), the projects heading and the twelve city-named project cards (D-02 + D-09), and the FAQ, which moved to /services.

const meta = getMeta('/');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: business.url,
    siteName: business.name,
    type: 'website',
    images: [{ url: '/placeholders/home.hero.art.jpg', width: 577, height: 607, alt: business.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/placeholders/home.hero.art.jpg'],
  },
};

export default function Page() {
  return (
    <>
      <HomeHero />
      <HomeTransparency />
      <HomeServicesGrid />
      <HomeProcess />
      <HomeAboutTeaser />
      <HomeComponentsGrid />
      <HomeExpertiseBand />
      <HomeWhyChoose />
      <HomeCommitment />
      <HomePerformanceBand />
      <HomeTrustStrip />
      <HomeTestimonialsHead />
      <HomeCtaBand />
      <HomeMap />
    </>
  );
}
