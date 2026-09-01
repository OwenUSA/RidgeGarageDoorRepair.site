// components/sections/ServicesList.tsx
// Contract row: docs/sections.md, our-section-id `services-list`.
// Copy: content/copy.ts `services.list` on route `/services`. ADAPTED, no reference pixel
// diff is measured (A-15, reference permanently unreachable).
//
// Deliberately heading + intro ONLY. The reference band this pairs against is 218
// characters total and nothing else - loading the eight services into it was explicitly
// rejected at Prompt 3 (they live in `services.symptoms` instead, grouped by symptom
// rather than by system). Do not add a grid, a list or a card here.

import { dataSection, getSection } from '@/lib/sections';

export default function ServicesList() {
  const s = getSection('/services', 'services.list');

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container">
        <div className="sec-head">
          <h2>{s.heading}</h2>
          <p className="u-muted">{s.body?.[0]}</p>
        </div>
      </div>
    </section>
  );
}
