# Behavior — service card hover and press

Applies to `home.services-grid`, `home.components-grid`, `home.why-choose`,
`about.values`, `services.list`.

## mechanism

Two compositor properties and nothing else: `transform: translate3d(0,-4px,0)` and
`box-shadow`. The shadow is **pre-declared at rest with zero alpha** and animated on the
alpha, not introduced on hover.

- **NOT `top`/`margin-top`** — layout properties; the whole grid reflows on hover of one card.
- **NOT animating `box-shadow` from `none`** — `none` is not interpolable with a shadow, so
  the browser snaps instead of transitioning. Declare
  `box-shadow: 0 30px 60px rgba(0,0,0,0)` at rest and animate to `rgba(0,0,0,0.1)`.
- **NOT `scale()`** on a card containing text — it resamples the glyphs and they blur for the
  duration of the transition.

Hover styles are wrapped in `@media (hover: hover) and (pointer: fine)`. Without that guard,
touch devices latch the hover state on tap and the card stays lifted until the user taps
elsewhere. Appendix A also says: skip hover below 768 — the guard enforces it by capability
rather than by width, which is the more accurate test.

Press is `:active { transform: translate3d(0,-1px,0) }` — a partial return, not a return to
rest, so the card reads as pushed rather than released.

The whole card is one `<a>`, so the affordance and the hit target are the same element. No
nested interactive elements — a card containing both a link and a `tel:` button produces an
invalid nested-anchor DOM and an ambiguous tap target.

## ratio and why

| thing | value |
|---|---|
| lift | 4px |
| shadow | `0 30px 60px rgba(0,0,0,0 → 0.1)` (the reference's own shadow token) |
| duration | `0.3s ease` in, `0.18s` out |
| press | `-1px`, `0.08s` |

4px against a ~360px-tall card is roughly 1% of its height — enough to read as a lift,
small enough that eight cards lifting in sequence as the pointer crosses the grid does not
look like the page is boiling. The 60px blur at only 10% alpha is what makes it read as
height rather than as a border.

Out is faster than in (0.18 vs 0.3). Entering is a response to the user and can afford to
be leisurely; leaving should already be finished by the time the pointer reaches the next
card, or a fast diagonal sweep leaves a trail of half-lifted cards.

## failure mode

- Animating `box-shadow` from `none`: the shadow snaps in at frame one and the lift looks
  detached from it.
- Symmetric in/out timing: trailing cards.
- No `hover: hover` guard: cards stick lifted on touch.
- `scale()`: blurred text mid-transition.
- Lifting on the grid container instead of the card: the entire block twitches.

## trigger

Pointer enter/leave; `:active` on press; `:focus-visible` mirrors the hover state exactly so
keyboard users see the same affordance. Not repeating, no route-change concerns.

## accessibility

- `:focus-visible` gets both the lift **and** a 3:1 focus ring — the lift alone is not a
  focus indicator, because it does not survive a high-contrast or forced-colors mode.
- The card's accessible name is its heading; the icon is `aria-hidden`.
- If the card links to an in-page anchor on `/services`, the target gets `scroll-margin-top`
  so the heading is not flush against the viewport edge on arrival.
- Under `prefers-reduced-motion: reduce`, the transform is dropped entirely and only the
  shadow alpha animates. The affordance survives; the movement does not.
