import type { MetadataRoute } from 'next';
import { business, routes } from '@/lib/business';

// Lead-owned. Generated from lib/business.ts `routes`, which is the same five-entry list
// the header and footer render, so a sitemap entry cannot drift from a real route and a
// sixth route cannot appear here without appearing in the nav first (D-01, D-02).
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: r.href === '/' ? business.url : `${business.url}${r.href}`,
    changeFrequency: 'monthly' as const,
    priority: r.href === '/' ? 1 : 0.7,
  }));
}
