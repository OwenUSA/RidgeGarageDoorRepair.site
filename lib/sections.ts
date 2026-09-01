// lib/sections.ts - the typed accessor every section component uses to reach its own
// copy block. LEAD-OWNED shared file, frozen for the build wave (A-6).
//
// Why this exists rather than each component importing `copy` and indexing it inline:
// content/copy.ts keys its sections by the DOTTED id (`home.hero`) because that is what
// docs/sections.md's human tables use, while the markup must carry the DASH form
// (`home-hero`) because that is what the machine-readable contract at the foot of
// docs/sections.md pairs on and what diff.mjs reads. Two spellings of one identity is
// exactly the kind of drift F-14 warns about, so the translation happens once, here, and
// `dataSection()` is the only way a component is allowed to spell its data-section value.
//
// getSection() throws rather than returning undefined. A section that silently renders
// with no copy is a blank band that passes every gate we have.

import { copy, type CopySection } from '@/content/copy';

export type { CopySection };

/** Look up a section's copy block by route and DOTTED id. Throws if absent. */
export function getSection(route: string, id: string): CopySection {
  const page = copy.routes[route];
  if (!page) throw new Error(`copy: no page for route ${route}`);
  const found = page.sections.find((s) => s.id === id);
  if (!found) throw new Error(`copy: no section ${id} on route ${route}`);
  return found;
}

/** Page metadata for a route, for the per-route `metadata` export. */
export function getMeta(route: string) {
  const page = copy.routes[route];
  if (!page) throw new Error(`copy: no page for route ${route}`);
  return page.meta;
}

/**
 * The dash-form section id for the `data-section` attribute. Dots are not legal in
 * either id column of the machine-readable contract; `home.hero` is `home-hero` there
 * and in the markup.
 */
export function dataSection(id: string): string {
  return id.replace(/\./g, '-');
}
