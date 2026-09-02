// components/sections/HomeMap.tsx - LEAD-BUILT. It composes <BusinessMap>, which is a
// frozen shared shell component (A-6), so the wrapper is lead-owned too.
//
// Contract: docs/sections.md row `/ | s16-map | home-map | ADAPTED`. The reference band
// is two halves - a city-link grid and an "Our Location" block. The city-grid half is
// DELETED per D-02; the location half survives as this section.
//
// D-08 for the home page specifically: zoom ~13 (the /contact copy is at ~15), keyless
// iframe, loading="lazy", an explicit title, a fixed aspect-ratio wrapper so the tiles
// arriving cannot shift the band, and a "Get directions" link. All of that lives inside
// <BusinessMap>; this file supplies the zoom and the surrounding copy.
//
// D-07: the address is fictional and will not geocode, so the embed is by COORDINATE.
// Nothing here passes an address string to Google.

import BusinessMap from '@/components/BusinessMap';
import { dataSection, getSection } from '@/lib/sections';

export default function HomeMap() {
  const s = getSection('/', 'home.map');

  return (
    <section className="band" data-section={dataSection(s.id)} data-surface="alt">
      <div className="u-container mapsec__grid">
        <div className="mapsec__copy">
          <p className="u-eyebrow">{s.subheading}</p>
          <h2>{s.heading}</h2>
          {s.body?.map((p, i) => (
            <p key={i} className="u-muted">
              {p}
            </p>
          ))}
        </div>

        {/* zoom 13 on the home page: wide enough to show the metro this shop covers
            rather than one street. /contact uses 15. */}
        <BusinessMap zoom={13} ratio="16 / 11" id="home-map" />
      </div>
    </section>
  );
}
