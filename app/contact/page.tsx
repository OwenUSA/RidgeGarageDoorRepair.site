import type { Metadata } from 'next';
import ContactPageHero from '@/components/sections/ContactPageHero';
import ContactFormBlock from '@/components/sections/ContactFormBlock';
import ContactMap from '@/components/sections/ContactMap';
import { getMeta } from '@/lib/sections';

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
