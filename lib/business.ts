// lib/business.ts - the SINGLE source of truth for every business fact on this site.
//
// Every component reads from here. A hard-coded phone number, address fragment or
// opening hour anywhere else in the repo is a bug, not a shortcut: NAP consistency is
// gate 4 of the acceptance sweep and it is checked by string, across all five routes.
//
// EVERY FACT BELOW IS FICTIONAL AND DELIBERATE (CLAUDE.md CONSTANTS). The address does
// not exist. The coordinates are real Yukon, OK coordinates and the map is embedded by
// coordinate only, never by address string (D-07). The phone is inside the 555-01XX
// reserved range and cannot ring a real person (D-04). All of it is listed in
// docs/PRE-LAUNCH.md as must-replace-before-public.
//
// Nothing else may be added here. Credentials, years in business, review counts, prices,
// warranty terms, response times and team size are NOT facts we have: they are
// TODO(fact) per D-14/D-17 and live in docs/facts-needed.md.
//
// The literals are NOT retyped here. They are re-exported from `site` in
// content/copy.ts, which is the one place they are written, because the Prompt 3
// similarity gate imports content/copy.ts directly with a bare Node import() and cannot
// resolve the `@/` alias - so the dependency has to point this way round. This module is
// the typed accessor every component reads; content/copy.ts is the store.

import { site } from '@/content/copy';

export const business = {
  name: site.name,
  shortName: site.shortName,
  tagline: site.tagline,

  phone: {
    display: site.phone,
    /** tel: href form. E.164, no punctuation. */
    href: site.phoneHref,
  },

  address: {
    street: site.street,
    locality: site.city,
    region: site.state,
    postalCode: site.zip,
    country: 'US',
    /** One-line form, for inline prose and the map caption. */
    oneLine: site.address,
  },

  /** "lat,lng". Passed to Google Maps as a COORDINATE, never geocoded (D-07). */
  coords: site.coords,
  latitude: Number(site.coords.split(',')[0]),
  longitude: Number(site.coords.split(',')[1]),

  hours: {
    /** Human form, used verbatim in the header, footer and contact page. */
    display: site.hours,
    opens: '07:00',
    closes: '19:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  /** D-02: the single surviving trace of the reference's 26 city pages. */
  serviceArea: site.serviceArea,

  /** D-18: local only. Used for canonical/JSON-LD identity, never fetched. */
  url: 'https://ridgegaragedoorrepair.site',
} as const;

/** Google Maps embed by COORDINATE. Keyless, no API key, no geocoder (D-07). */
export function mapEmbedSrc(zoom: number): string {
  return site.mapEmbed(zoom);
}

/** "Get directions" target, also coordinate-only (D-08). */
export const directionsHref = site.directions;

/** The five routes. Adding one is out of scope (D-01). No Locations (D-02). */
export const routes = site.routes;
