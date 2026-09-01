'use client';

// components/SiteHeader.tsx - LEAD-OWNED SHARED SHELL. Frozen after Prompt 5 (A-6).
// No section agent edits this file. A section that needs a change here stops and hands
// it back to the lead.
//
// Behaviour contract: docs/behavior/02-header.md and docs/behavior/01-mobile-nav-drawer.md.
// The header is STATIC - position: static at rest and after scroll, at every breakpoint,
// because the reference is (F-05). Do not add position: sticky, a scroll listener, an
// IntersectionObserver sentinel, a shrink-on-scroll class or backdrop-filter.
// Bar height is 85px below 768 and 104px at and above it: --header-h in globals.css.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { business, routes } from '@/lib/business';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change. NOT optional: in the App Router the drawer lives in the
  // persistent layout and survives navigation, so without this the user taps a link,
  // the route changes underneath, and the panel is still sitting there.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock: position: fixed + restored scrollY. NOT overflow: hidden - iOS
  // Safari ignores that and the page scrolls behind the open drawer, which is the
  // majority device class for a phone-call-driven business.
  useEffect(() => {
    if (!open) return;
    scrollYRef.current = window.scrollY;
    const body = document.body;
    const prev = body.style.cssText;
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = '100%';
    return () => {
      body.style.cssText = prev;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  // Escape + focus management + focus trap.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('button, a[href]');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const lo = items[0];
      const hi = items[items.length - 1];
      if (e.shiftKey && document.activeElement === lo) {
        e.preventDefault();
        hi.focus();
      } else if (!e.shiftKey && document.activeElement === hi) {
        e.preventDefault();
        lo.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header" data-shell="header" data-section="shell-header">
      <a className="u-skip" href="#main">Skip to content</a>

      <div className="u-container site-header__bar">
        <Link className="site-header__brand" href="/" aria-label={`${business.name} home`}>
          {/* WORDMARK slot shell.header.logo - set in the display font until a real
              logo file exists (FACT-09 / assets/INVENTORY.md). */}
          <span className="site-header__mark" aria-hidden="true">R</span>
          <span className="site-header__name">{business.name}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href} aria-current={pathname === r.href ? 'page' : undefined}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className="u-btn u-btn--call site-header__cta" href={business.phone.href}>
          <Phone size={18} strokeWidth={2} aria-hidden="true" />
          <span>{business.phone.display}</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      {/* Drawer. Kept MOUNTED and moved with a compositor property only - never a
          display toggle, which kills the exit transition, and never max-height, which
          reflows the links mid-transition (docs/behavior/01, F-03). */}
      <div
        className="site-drawer__backdrop"
        data-open={open}
        onClick={close}
        aria-hidden="true"
      />
      <div
        id="site-drawer"
        ref={panelRef}
        className="site-drawer"
        data-open={open}
        inert={!open ? true : undefined}
      >
        <div className="site-drawer__head">
          <button type="button" className="site-drawer__close" onClick={() => { close(); toggleRef.current?.focus(); }} aria-label="Close menu">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        {/* The panel's tel: CTA is the first focusable item after the close button. */}
        <a className="u-btn u-btn--call site-drawer__cta" href={business.phone.href}>
          <Phone size={18} strokeWidth={2} aria-hidden="true" />
          <span>{business.phone.display}</span>
        </a>
        <nav aria-label="Primary, mobile">
          <ul>
            {routes.map((r, i) => (
              <li key={r.href} style={{ ['--i' as string]: i }}>
                <Link href={r.href} aria-current={pathname === r.href ? 'page' : undefined}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="site-drawer__hours u-muted">{business.hours.display}</p>
      </div>
    </header>
  );
}
