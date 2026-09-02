import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';

// Lead-owned. Five routes only (D-01). No /locations/* to disallow because none exists
// (D-02), and nothing is hidden: the site has no admin surface, no API route and no
// backend (D-18).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${business.url}/sitemap.xml`,
    host: business.url,
  };
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
