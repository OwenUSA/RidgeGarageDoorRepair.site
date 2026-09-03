import type { Metadata } from 'next';
import ServicesPageHero from '@/components/sections/ServicesPageHero';
import ServicesList from '@/components/sections/ServicesList';
import ServicesSymptoms from '@/components/sections/ServicesSymptoms';
import ServicesFaq from '@/components/sections/ServicesFaq';
import ServicesCtaBand from '@/components/sections/ServicesCtaBand';
import { getMeta } from '@/lib/sections';
import { business } from '@/lib/business';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. services.symptoms and services.faq are NOVEL: no reference band exists at either position, so both are scored on token conformance rather than against a reference.

const meta = getMeta('/services');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/services' },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${business.url}/services`,
    siteName: business.name,
    type: 'website',
    images: [{ url: '/placeholders/services.page-hero.bg-1440x390.svg', width: 1440, height: 390, alt: `Garage door services offered by ${business.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/placeholders/services.page-hero.bg-1440x390.svg'],
  },
};

export default function Page() {
  return (
    <>
      <ServicesPageHero />
      <ServicesList />
      <ServicesSymptoms />
      <ServicesFaq />
      <ServicesCtaBand />
    </>
  );
}
