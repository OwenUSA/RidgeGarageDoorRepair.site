// components/BusinessMap.tsx - LEAD-OWNED SHARED SHELL. Frozen after Prompt 5 (A-6).
//
// D-07: the address is fictional and will not geocode, so the embed is by COORDINATE,
// never by address string, and nothing here is ever passed to a geocoder.
// D-08: keyless iframe, loading="lazy", an explicit title (the iframe is opaque to
// assistive tech without one), a fixed aspect-ratio wrapper so it cannot shift layout
// while it loads, and a "Get directions" link. zoom is a prop: ~13 on the home page,
// ~15 on /contact.
//
// The address is rendered as REAL TEXT beside the frame, not only inside it. That is
// also why '/contact::contact.map' is a declared length exemption: the reference band is
// a bare iframe with zero text nodes, so a percentage against it has no denominator.

import { business, directionsHref, mapEmbedSrc } from '@/lib/business';

type Props = {
  zoom: number;
  /** width / height. Fixed so the frame reserves its box before the tiles arrive. */
  ratio?: string;
  className?: string;
  /** Unique per instance: the map bypass link needs a distinct target id per map. */
  id?: string;
};

export default function BusinessMap({ zoom, ratio = '16 / 10', className, id = 'map' }: Props) {
  const pastId = `${id}-past`;
  return (
    <div className={className ? `business-map ${className}` : 'business-map'}>
      {/* Map bypass, per docs/behavior/07. An embedded map is a keyboard trap in some
          browsers once focus enters the iframe, so a visually-hidden skip link before the
          frame jumps a keyboard user straight past it to the address and directions link.
          Nothing inside the iframe is content the page depends on. */}
      <a className="u-skip business-map__bypass" href={`#${pastId}`}>
        Skip the map
      </a>
      <div className="business-map__frame" style={{ aspectRatio: ratio }}>
        <iframe
          src={mapEmbedSrc(zoom)}
          title={`Map showing the approximate location of ${business.name} in ${business.address.locality}, ${business.address.region}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="business-map__meta" id={pastId} tabIndex={-1}>
        <p className="business-map__address">
          {business.address.street}
          <br />
          {business.address.locality}, {business.address.region} {business.address.postalCode}
        </p>
        <a className="u-link" href={directionsHref} target="_blank" rel="noopener noreferrer">
          Get directions
        </a>
      </div>
    </div>
  );
}
