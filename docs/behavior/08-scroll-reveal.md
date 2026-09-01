# Behavior — scroll reveal (there is none, and that is the specification)

Source: `docs/profile.md` §4, `.harness/profile/_.json → motion`, `motionProbe`, `libs`.

## The measurement first, because it decides everything below

Prompt 1 probed for scroll choreography four independent ways and all four came back empty:

| probe | result |
|---|---|
| animation libraries on `window` | gsap ✗ ScrollTrigger ✗ Lenis ✗ Locomotive ✗ Framer ✗ AOS ✗ Swiper ✗ Slick ✗ WOW ✗ |
| elements carrying a CSS `animation-name` | **0** |
| `will-change` declarations | **0** |
| rAF sample, 3px/frame scroll of the entire 16,571px home page | 25 candidate elements tracked over 901 frames — **0 moved** |
| the same 25 elements sampled at rest for 500ms | **0 moved** |

The 152 non-zero `transition-duration` values on the page are **all** hover, open and close
state changes — they belong to specs 01, 04, 05 and 06 and not one of them is bound to
scroll position.

**So: nothing on the reference fades up, slides in, staggers, parallaxes, counts up,
splits a heading, or pins.** This spec exists to record that as a measured finding rather
than an oversight, and to stop a later turn inventing a reveal on the grounds that the page
"feels static" — it is supposed to.

`CLAUDE.md`'s dependency allowlist makes `framer-motion` conditional on the profile finding
"real choreography". The profile says explicitly that it did not. **`framer-motion` is not
justified and will not be installed.** Neither will GSAP, ScrollTrigger, Lenis, Locomotive
or AOS, all of which are banned outright.

## mechanism

**The no-motion baseline: sections are painted at their final opacity and their final
transform, in document flow, on first paint. There is no entrance state.**

That is a positive instruction, not an absence of one. Concretely, what must be true of
every section component in the Prompt 6+7 build wave:

- No `opacity: 0` / `translateY(24px)` initial state waiting for a class to be added.
- No `IntersectionObserver` that adds an `.is-visible` class to a band. The only two
  observers on this site are the mobile call bar's hero sentinel (spec 03) and the
  browser's own `loading="lazy"` on the map iframe (spec 07). A third one on a section is
  the tell that this spec was not read.
- No `animation` / `@keyframes` on a band, and no `will-change` anywhere. `will-change` on
  a band that never changes promotes a full-width layer for the life of the page and costs
  memory on exactly the phones this site is for.
- No scroll listener of any kind. Not a throttled one, not a passive one, not one behind a
  feature flag.
- No CSS `animation-timeline: view()` / `scroll()`. It is the modern, cheap, correct way to
  build a scroll reveal, which is precisely why it needs naming here: being cheap is not an
  argument for adding motion the reference does not have.

**What IS allowed to move on scroll: nothing.** The one element whose visibility changes
with scroll position is the mobile sticky call bar, and it is not a reveal — it is a
persistent affordance with its own spec, its own observer, and its own reason (D-04) for
existing without a reference counterpart.

## ratio and why

There are no durations to specify, so the ratio that matters is a different one: **0 of 36
built sections carry an entrance animation.** That is the number Prompt 11 checks, and the
acceptance value is zero, not "few".

The reasoning is not aesthetic minimalism. A scroll reveal is a wager that content arriving
late is worth more than content arriving instantly, and this site's content is a phone
number for someone whose garage door is stuck open. Every reveal buys a moment of polish by
selling a moment of the one thing the visitor came for. On a 22,379px-tall mobile home page
that transaction happens fifteen times.

There is also a measurement cost, and it is the concrete one. A reveal bound to viewport
position makes a band's rendered state depend on **how the page was scrolled to get there**.
The harness screenshots sections after a reveal scroll and a `settle()`; a band mid-fade at
capture time produces a divergence number that changes between two identical runs. With
`ITERATION_CAP` at 1 (A-2) there is no second pass to catch a flapping row — it would be
floored on a number that was never real.

## failure mode

- **Adding a "subtle" fade-up because the page looks flat next to a competitor's.** It puts
  a permanent, unmeasurable, non-deterministic delta into every ADAPTED band on all five
  routes, and it is invisible in a static screenshot, so it will be diagnosed as a spacing
  bug for an hour first.
- **A reveal that never fires.** The classic: an `IntersectionObserver` set up for content
  already inside the viewport at load, so the hero starts at `opacity: 0` and stays there.
  A reveal you do not build cannot fail closed like this, which is a real argument and not
  only a stylistic one.
- **`opacity: 0` as the initial state with JS disabled or erroring.** The content is gone.
  The reference's content is plain HTML that renders without a single line of JS, and ours
  must be too.
- **Staggering the service cards.** Spec 04 already gives them hover motion tuned for a
  pointer crossing a grid; a scroll stagger on the same eight cards means two independent
  motion systems fighting over the same elements the first time someone scrolls with a mouse
  hovering the grid.
- **Using `will-change: transform` on bands "for smoothness"** when nothing transforms.
- **Reading this spec as "motion is banned on the site."** It is not. Four specs describe
  real transitions. What is banned is motion **bound to scroll position**.

## trigger

**None. There is no trigger, and the absence is the point.** Nothing observes scroll, so:

- there is no re-entry state to reset;
- there is nothing to re-arm on a **client-side route change** — and this is where a scroll
  reveal would have hurt most in the App Router, because a band that reveals once and marks
  itself done stays revealed when the layout persists across navigation, so the *second*
  page the user visits renders correctly only by accident;
- there is no first-paint race between hydration and the observer.

The only scroll-position-dependent behavior in the entire build is spec 03's call bar
sentinel, and its route-change contract is written there, not here.

## accessibility

Most of this section is unusually short for a good reason: **the accessible outcome of a
no-motion baseline is that every accessibility hazard of a scroll reveal is absent by
construction.** Recording which ones, so nobody reintroduces them:

- **`prefers-reduced-motion: reduce` needs no branch here.** There is no scroll-driven
  motion to disable, so there is no code path that can forget to honour it. D-19 requires
  the media query to be honoured on *every* animation; the four specs that animate each
  carry their own reduced-motion clause. This spec has nothing to reduce.
- **Vestibular safety.** Large-area movement tied to scrolling is the single most common
  trigger for motion-sensitive users, and full-width bands sliding in are exactly that
  shape. None ship.
- **No content is hidden from assistive tech pending a scroll.** A screen reader, a
  reader-mode extension, a print stylesheet and a search crawler all see the complete page
  immediately, because the page is complete immediately. A reveal implemented with
  `opacity: 0` leaves content in the accessibility tree while invisible; one implemented
  with `visibility` or `content-visibility` removes it — both are wrong for someone
  navigating by headings, and neither exists here.
- **Focus order is never ahead of paint.** Tabbing to a control inside a band that has not
  yet "revealed" is a known way to focus an invisible element; with no reveal, the focused
  element is always the visible one.
- **`scroll-margin-top`** still applies to the `/services` in-page anchors (spec 04), so an
  anchored heading does not land flush against the viewport edge. That is anchor hygiene,
  not motion, and it stays.
