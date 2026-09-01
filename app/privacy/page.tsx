import type { Metadata } from 'next';
import PrivacyBody from '@/components/sections/PrivacyBody';
import { getMeta } from '@/lib/sections';

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
};

export default function Page() {
  return (
    <>
      <PrivacyBody />
    </>
  );
}
