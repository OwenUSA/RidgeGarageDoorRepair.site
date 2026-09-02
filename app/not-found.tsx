import type { Metadata } from 'next';
import Link from 'next/link';
import { business } from '@/lib/business';

// Lead-owned, and NOVEL: the reference has no 404 of its own to clone. It renders inside
// the root layout, so the header, footer and call bar are the shell every other route
// uses. Every value below resolves to a Prompt 5 token via the existing `.statement`,
// `.u-btn` and `.actions` primitives -- no new token, no raw colour.
export const metadata: Metadata = {
  title: `Page not found | ${business.name}`,
  description: 'That page is not on this site. The five pages that are, are linked here.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section statement statement--center" data-section="shell-notfound">
      <div className="container">
        <p className="u-eyebrow">404</p>
        <h1>That page is not here</h1>
        <p className="u-muted">
          The address you followed does not match a page on this site. Everything this site
          has is one of the five below, or one phone call away.
        </p>
        <div className="actions">
          <a className="u-btn u-btn--call" href={business.phone.href}>
            Call {business.phone.display}
          </a>
          <Link className="u-btn u-btn--ghost" href="/">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
