# Behavior — mobile sticky call bar

Below 768px only. **This has no reference counterpart** — the reference has no fixed or
sticky element anywhere. It exists because of D-04, and its area is an addition, not a
divergence to close (F-05).

## mechanism

`position: fixed; bottom: 0; left: 0; right: 0` containing one full-width `tel:` anchor.
Enters with `transform: translate3d(0, 100%, 0) → 0`.

- **NOT `bottom: -64px → 0`** — animating a layout property against the viewport edge
  triggers layout on every frame and fights the mobile URL-bar collapse.
- Visibility is driven by an **`IntersectionObserver` on a sentinel** placed just below the
  hero, **NOT a `scroll` event listener**. A scroll handler on a 22k-pixel mobile page runs
  hundreds of times per second for a boolean.

The page reserves its height with `padding-bottom` on the page wrapper so the bar never
covers the footer's last row. It must also stay clear of the iOS home indicator:
`padding-bottom: env(safe-area-inset-bottom)`.

Hidden entirely at >=768, where the header's `tel:` CTA is always visible.

## ratio and why

| thing | value |
|---|---|
| bar height | 56px + safe-area inset |
| enter/exit | `0.24s cubic-bezier(0.22, 1, 0.36, 1)` |
| appears after | hero sentinel leaves the viewport |
| z-index | below the nav drawer (drawer must cover it) |

56px is a comfortable thumb target well above the 44px minimum, and the number stays legible
at 17px/700. 0.24s is shorter than the drawer's 0.32s deliberately: the drawer is a gesture
the user initiated, the bar is an ambient affordance appearing on its own, and ambient
motion that takes as long as intentional motion reads as sluggish.

Appearing only after the hero matters — the hero already has the phone number as its primary
CTA, so showing the bar there is a duplicate that covers content for no gain.

## failure mode

- Covering the footer. The bar sits over the tail of a page whose last section is the NAP
  block, so without reserved padding the address is permanently obscured.
- Showing it immediately at scrollY 0, duplicating the hero CTA.
- Putting it above the drawer in stacking order, so an open nav has a call bar punched
  through it.
- A `scroll` listener instead of an observer — janky on exactly the device class this is for.
- Omitting the safe-area inset, so on a notched iPhone the tap target is half under the home
  indicator.

## trigger

`IntersectionObserver` on the hero sentinel: hidden while the sentinel is visible, shown
once it is not. Repeating — it hides again if the user scrolls back up to the hero.

On client-side route change the observer is re-created against the new page's sentinel.
Routes without a hero sentinel (`/privacy`) show the bar from the top.

## accessibility

- It is a real `<a href="tel:...">` with the number in its text, so the accessible name is
  the number.
- Wrapped in a landmark that is **not** `role="navigation"` — it is a single action, so a
  plain element with `aria-label="Call Ridge Garage Door Repair"` is enough.
- It appears in the DOM at the end of the document, so it does not interrupt the tab order
  of the page content; keyboard users reach it last, which is correct for a persistent
  affordance.
- Under `prefers-reduced-motion: reduce` it appears with opacity only, no travel.
- Contrast: it carries the call-now CTA colors, which the palette gate holds to the highest
  contrast ratio on the page.
