'use client';

// components/CallBar.tsx - LEAD-OWNED SHARED SHELL. Frozen after Prompt 5 (A-6).
// Spec: docs/behavior/03-mobile-call-bar.md.
//
// This has NO reference counterpart - the reference has no fixed or sticky element
// anywhere, at any breakpoint. It exists because of D-04, and its area is an addition,
// not a divergence to close (F-05).
//
// Visibility is driven by an IntersectionObserver on a sentinel placed just below the
// hero, NOT a scroll listener: a scroll handler on a 22k-pixel mobile page runs hundreds
// of times per second to compute a boolean. Routes with no sentinel (/privacy) show the
// bar from the top, which is the correct default for a page with no hero CTA.
//
// Enter/exit is translate3d, never `bottom`: animating a layout property against the
// viewport edge relayouts every frame and fights the mobile URL-bar collapse.

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';

export const HERO_SENTINEL_ID = 'hero-sentinel';

export default function CallBar() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(HERO_SENTINEL_ID);
    if (!sentinel) {
      setShown(true);
      return;
    }
    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className="callbar" data-shown={shown} aria-label={`Call ${business.name}`}>
      <a className="callbar__link" href={business.phone.href}>
        <Phone size={20} strokeWidth={2.5} aria-hidden="true" />
        <span>{business.phone.display}</span>
      </a>
    </div>
  );
}
