# Behavior — FAQ accordion (`/services` only)

Source: `.harness/state/ref-390.json`. Reference is ElementsKit
(`a.ekit-accordion--toggler` + Bootstrap `.collapse`), 7 items, first open by default.

## mechanism

Native `<details>`/`<summary>` is **not** used, because its open/close is not animatable
across browsers without the same grid hack below, and because we need `aria-expanded` on a
button we control.

Panel height animates with **`grid-template-rows: 0fr → 1fr`** on a wrapper whose single
child has `overflow: hidden`. This is the one way to transition to intrinsic content height
without measuring it in JS.

- **NOT `max-height: 0 → 9999px`** — the transition spends most of its duration animating
  through empty space, so short answers snap open early and long ones lag. It is also what
  the reference does.
- **NOT `height: auto`** — not interpolable.
- **NOT a JS `scrollHeight` measurement** — it re-measures on every resize and font load,
  and it is wrong for the one frame after a webfont swaps.

Only one item open at a time is **not** enforced. An FAQ is a reference surface; users
compare answers. Closing the previous one is a common default and it is wrong here.

## ratio and why

| thing | value |
|---|---|
| panel | `0.28s cubic-bezier(0.22, 1, 0.36, 1)` |
| chevron rotate | `0.28s`, same curve, same duration |
| open by default | first item only |

Panel and chevron share a duration and a curve so they read as one object rotating open
rather than two things happening near each other. 0.28s is just under the drawer's 0.32s —
this is a smaller object travelling a shorter distance, and matching the drawer's timing
would make it feel heavy.

First item open by default matches the reference and does real work: it shows the user, at
zero cost, that these rows expand.

## failure mode

- `max-height` with a large ceiling: uneven timing between short and long answers.
- Animating the whole item's height instead of the panel wrapper's: the header text drifts
  during the transition.
- Enforcing single-open: the user loses the answer they were reading when they open the next.
- Rotating the chevron on a different curve than the panel: two motions, one gesture.

## trigger

Click or `Enter`/`Space` on the summary button. Toggles; repeatable. No route-change
behavior — `/services` is the only route that has one, and remounting resets to first-open,
which is correct.

## accessibility

- The trigger is a real `<button>` inside the heading (`<h3><button>…</button></h3>`), so it
  is reachable by heading navigation and by tab.
- `aria-expanded` on the button, `aria-controls` pointing at the panel id.
- The panel is **not** `aria-hidden` when collapsed — `overflow: hidden` with a zero-height
  grid row already removes it from the accessibility tree via `content-visibility`; adding
  `aria-hidden` to a focusable subtree is a violation if any link inside is still tabbable.
  Collapsed panels get `inert` instead, which handles both.
- Under `prefers-reduced-motion: reduce`, `transition-duration` drops to `0.01s` for both the
  panel and the chevron.
- Full keyboard path: tab reaches every summary in order; no keyboard trap.
