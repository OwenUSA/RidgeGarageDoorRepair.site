# Behavior — mobile nav drawer

Applies below 768px. Source: `.harness/state/ref-390.json`.

**What the reference does, for the record:** `nav.elementor-nav-menu--dropdown`, absolute,
`z-index: 9997`, animated on `max-height` + `scaleY(0→1)`, `0.3s ease`, no body scroll
lock, does not close on Escape, 19 links. We reproduce none of that mechanism. See F-03.

## mechanism

Fixed panel translated with `transform: translate3d(100%, 0, 0) → translate3d(0,0,0)`, plus
a separate opacity backdrop. **Compositor properties only.**

- **NOT `max-height`** — it reflows the links mid-transition and they jitter. This is what
  the reference does and it is the tell.
- **NOT `left`/`right`** — animating a layout property forces layout every frame.
- **NOT a `display` toggle** — `display: none` on close kills the exit transition so the
  panel snaps shut. Use `visibility` + `pointer-events` sequenced after the transform, or
  keep it mounted and rely on `inert`.

Body scroll lock is `position: fixed; top: -<scrollY>px; width: 100%` on `<body>`, with
`scrollY` restored on close. **NOT `overflow: hidden` on `<body>`** — iOS Safari ignores it
and the page scrolls behind the open drawer.

Panel is a single element; the five links are children, not independently positioned.

## ratio and why

| thing | value |
|---|---|
| panel transform | `0.32s cubic-bezier(0.22, 1, 0.36, 1)` |
| backdrop opacity | `0 → 0.5`, `0.2s linear`, starts at `0ms` |
| link stagger | `0.03s` each, first at `0.08s` |

The backdrop is faster than the panel and starts first **so it finishes first**. That is
what makes the panel read as arriving *over* an already-dimmed page instead of dragging the
dimming along with it. The `cubic-bezier(0.22, 1, 0.36, 1)` is a strong ease-out: almost all
distance is covered in the first third, so the panel feels like it was thrown rather than
driven.

With five links, `0.03s × 5 = 0.15s` of total stagger — under the 0.32s panel travel, so
the last link still lands before the panel stops. Anything longer reads as a slideshow
rather than one gesture. This is exactly why our five-route nav must not reuse a stagger
tuned for the reference's 19 links.

## failure mode

- Animating `max-height`: links jitter as the box reflows each frame.
- `display: none` on close: exit transition never runs, the drawer snaps shut. The single
  most common tell of a hand-rolled drawer.
- `overflow: hidden` on body: works on desktop, silently fails on iOS, which is the
  majority of the traffic for a phone-call-driven business.
- Staggering the panel *and* the links with the same duration: reads as lag, not rhythm.
- Forgetting to restore `scrollY`: closing the drawer teleports the user to the top of the
  page, which on a 16k-pixel home page is catastrophic.

## trigger

Opens on hamburger click. Closes on: hamburger click, `Escape`, backdrop click, and
**`usePathname()` change**. The last one is not optional — in the App Router the drawer is
part of the persistent layout and survives navigation, so without a pathname effect the
user taps a link, the route changes underneath, and the drawer is still sitting there.

Not repeating, no re-entry animation state to track. Fires once per open.

## accessibility

- Toggle carries `aria-expanded` and `aria-controls` pointing at the panel id.
- Toggle has an accessible name (`aria-label="Open menu"` / `"Close menu"`), not just an
  icon.
- Focus moves into the panel on open and returns to the toggle on close.
- Focus is trapped inside the panel while open; the rest of the tree gets `inert`.
- Under `prefers-reduced-motion: reduce` the transform drops to `0.01s` and only opacity
  animates. The drawer still works; it just stops travelling.
- The panel's `tel:` CTA is the first focusable item after the close button.
