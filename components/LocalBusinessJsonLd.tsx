// components/LocalBusinessJsonLd.tsx - LEAD-OWNED SHARED SHELL. Frozen after Prompt 5.
//
// Built entirely from lib/business.ts. Deliberately ABSENT and not to be added:
//   email            D-03 - no email anywhere, including in structured data
//   aggregateRating  D-13 - fabricated review markup is a legal problem, not a gap
//   review           D-13
//   priceRange       D-12 - we publish no prices and will not imply a band
//   areaServed[]     D-02 - the reference's 26-city array is scrubbed everywhere
//   sameAs / social  we have no profiles; inventing URLs is inventing a fact

import { business } from '@/lib/business';

export default function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${business.url}/#business`,
    name: business.name,
    description: business.tagline,
    url: business.url,
    telephone: business.phone.display,
    image: `${business.url}/placeholders/home.hero.art.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: business.hours.days,
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
