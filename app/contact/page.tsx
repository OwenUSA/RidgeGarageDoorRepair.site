import type { Metadata } from 'next';
import ContactPageHero from '@/components/sections/ContactPageHero';
import ContactFormBlock from '@/components/sections/ContactFormBlock';
import ContactMap from '@/components/sections/ContactMap';
import { getMeta } from '@/lib/sections';
import { business } from '@/lib/business';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. The form has no backend and no email field of any kind (D-05, D-03).

const meta = getMeta('/contact');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${business.url}/contact`,
    siteName: business.name,
    type: 'website',
    images: [{ url: '/placeholders/contact.page-hero.bg-1440x366.jpg', width: 1440, height: 366, alt: `Contact ${business.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/placeholders/contact.page-hero.bg-1440x366.jpg'],
  },
};

export default function Page() {
  return (
    <>
      <ContactPageHero />
      <ContactFormBlock />
      <ContactMap />
    </>
  );
}
