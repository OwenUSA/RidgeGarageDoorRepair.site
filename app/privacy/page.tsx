import type { Metadata } from 'next';
import PrivacyBody from '@/components/sections/PrivacyBody';
import { getMeta } from '@/lib/sections';
import { business } from '@/lib/business';

// ROUTE ASSEMBLY - lead-owned. Written once, before the build wave, so that four
// concurrent agents never contend over this file. Section ORDER here is the render
// order declared by content/copy.ts, which deliberately differs from the reference band
// order; A-12 makes `position` ADVISORY, so reordering cannot inflate a structural
// residual. privacy.body is NOVEL and is measured once, at zero token violations (A-9).

const meta = getMeta('/privacy');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${business.url}/privacy`,
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
      <PrivacyBody />
    </>
  );
}
