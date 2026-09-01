// components/sections/HomeServicesGrid.tsx
// Contract row: docs/sections.md, our-section-id `home-services-grid`.
// Copy: content/copy.ts `home.services-grid` on route `/`. Read it, never rewrite it.
//
// ADAPTED: reference band s05-services retained, content swapped to the symptom-led list
// (docs/sections.md). Per the lead's guidance, media only ships in the first two cards -
// assets/INVENTORY.md `home.services-grid.img1` (620x360 @1440) and `.img2` (600x360 @1440)
// - because cards 3/4's reference slots are a different, shorter box.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

const MEDIA: Record<number, { src: string; w: number; h: number }> = {
  0: { src: '/placeholders/home.services-grid.img1-620x360.svg', w: 620, h: 360 },
  1: { src: '/placeholders/home.services-grid.img2-600x360.svg', w: 600, h: 360 },
};

export default function HomeServicesGrid() {
  const s = getSection('/', 'home.services-grid');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p>{s.body?.[0]}</p>
        </div>

        <div className="grid grid--2">
          {s.cards?.map((card, i) => {
            const media = MEDIA[i];
            return (
              <div className="card" key={card.heading}>
                {media ? (
                  <div className="media" style={{ aspectRatio: `${media.w} / ${media.h}` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media.src} alt="" width={media.w} height={media.h} decoding="async" />
                  </div>
                ) : null}
                <h3 className="card__title">{card.heading}</h3>
                <p>{card.body}</p>
                {card.items ? (
                  <ul className="taglist">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="actions">
          <a className="u-btn u-btn--call" href={business.phone.href}>
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            {s.ctas?.[0]}
          </a>
          <Link className="u-btn u-btn--ghost" href="/contact">
            {s.ctas?.[1]}
          </Link>
        </div>
      </div>
    </section>
  );
}
