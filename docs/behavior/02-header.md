# Behavior — header (the transition that does not exist)

Source: `.harness/state/ref-390.json`, `ref-1440.json`.

## The measurement first

The reference header is `position: static` **at rest and after scrolling 900px**, at every
breakpoint. No class swap on `<body>` or `<header>`, no shadow appearing, no height change,
no transform, no backdrop-filter. The whole page has **zero** `position: fixed` and **zero**
`position: sticky` elements.

Appendix A: *"Should the header shrink or change on scroll? Only if the reference does.
Otherwise static."* It does not. **Ours is static.**

## mechanism

None. The header is a normal block element in flow, 104px tall at >=768 and 85px at 390,
white background, no shadow.

This spec exists to stop a future iteration from "improving" it. A sticky header on a
16k-pixel page is a defensible product decision, but it is not this clone, it costs 104px
of a 844px phone viewport on every scroll, and it would put a permanent unmeasurable delta
into `shell.header` on all five routes.

**What NOT to add:** `position: sticky`, a scroll listener, an `IntersectionObserver`
sentinel, a shrink-on-scroll class, `backdrop-filter`.

## ratio and why

The only ratio here is the height pair: **104 / 85**. That is the reference's desktop and
mobile bar, and it is what `shell.header`'s `box.h` is measured against at all three
breakpoints. 768 takes the desktop value.

## failure mode

Making it sticky. It looks like a free upgrade and it silently changes the geometry of
every section below it at every breakpoint, because the first section no longer starts at
the top of the viewport.

## trigger

Nothing. No scroll listener exists, so there is no re-entry behavior and no client-side
route-change behavior to specify.

The one piece of scroll-dependent behavior on the site is the **mobile call bar**, which is
a separate element with its own spec (`03-mobile-call-bar.md`), not a header state.

## accessibility

- The header contains the skip link, which is the first focusable element in the document
  and becomes visible on focus.
- The desktop `tel:` CTA is a real link with the number as its accessible name, not an icon
  with a tooltip.
- Nav uses `<nav aria-label="Primary">` with a single `<ul>`. Current route carries
  `aria-current="page"`.
- Because the header is static, focus never lands behind a floating bar — the class of bug
  a sticky header introduces and then has to fix with `scroll-margin-top`.
- **`prefers-reduced-motion` has nothing to do here, and that is deliberate.** The header
  itself never animates; the only motion it owns belongs to the drawer toggle, whose
  reduced-motion clause lives in `01-mobile-nav-drawer.md`. If a future change gives the
  header any transition of its own, that change must add the media query at the same time —
  D-19 is per-animation, not per-file. See `08-scroll-reveal.md` for the site-wide baseline.
