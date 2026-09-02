// components/SiteFooter.tsx - LEAD-OWNED SHARED SHELL. Frozen after Prompt 5 (A-6).
//
// What the reference footer carries and we DO NOT:
//   - an email address                 -> D-03, banned outright, in every form
//   - "License Number: 1122135"        -> D-14, a credential we do not have
//   - a Terms and Conditions route     -> D-01, not one of our five routes
//   - a four-item services column and a city column -> D-02
// The single surviving trace of their 26 city pages is business.serviceArea.
// This is why '*::shell.footer' is a declared length exemption in harness.config.mjs:
// what is left cannot be padded back to their character count without inventing
// something.

import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';
import { business, routes } from '@/lib/business';
import { getSection } from '@/lib/sections';

export default function SiteFooter() {
  // Column headings and the base rule come from the reference's own footer shape: a brand
  // column, a headed link column, a headed contact column, then a hairline and a centred
  // copyright. Their Services column and their city column are D-02/D-01 casualties, so
  // this is three columns rather than four - the exemption already declared for
  // '*::shell.footer' in harness.config.mjs.
  const f = getSection('/', 'shell.footer');

  return (
    <footer className="site-footer" data-shell="footer" data-section="shell-footer" data-surface="deep">
      <div className="u-container site-footer__grid">
        <div className="site-footer__brand">
          {/* WORDMARK slot shell.footer.logo - display font until a real logo exists. */}
          <p className="site-footer__name">{business.name}</p>
          <p className="u-muted">{business.tagline}</p>
          <p className="u-muted site-footer__area">{business.serviceArea}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <p className="site-footer__colhead">{f.subheading}</p>
          <ul>
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="site-footer__nap">
          <p className="site-footer__colhead">{f.heading}</p>
          <p>
            <MapPin size={16} strokeWidth={2} aria-hidden="true" />
            <span>
              {business.address.street}
              <br />
              {business.address.locality}, {business.address.region} {business.address.postalCode}
            </span>
          </p>
          <p>
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            <a className="u-link" href={business.phone.href}>{business.phone.display}</a>
          </p>
          <p>
            <Clock size={16} strokeWidth={2} aria-hidden="true" />
            <span>{business.hours.display}</span>
          </p>
        </address>
      </div>

      <div className="u-container site-footer__base">
        <p className="u-muted">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
