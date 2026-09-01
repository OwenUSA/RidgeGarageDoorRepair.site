# Behavior — map lazy mount

Two instances, both required (D-08): `/` at zoom ~13, `/contact` at zoom ~15.
One `<BusinessMap zoom>` component, lead-owned.

## mechanism

Keyless Google Maps embed, **addressed by coordinates, never by the address string**:
`https://www.google.com/maps?q=<MAP_COORDS>&z=<zoom>&output=embed`.

D-07 is the reason: the street address is fictional and will not geocode. Passing it to a
geocoder returns either nothing or, worse, a real building that is not ours. The coordinates
are real Yukon, OK coordinates; the address renders as **text beside the map**, never as a
query.

- `loading="lazy"` on the iframe, plus a fixed **aspect-ratio wrapper** so the reserved box
  exists before the iframe resolves. Without the wrapper the map is a guaranteed CLS hit on
  a page whose primary CTA sits above it.
- **NOT `next/image`** — it is an iframe, not an image.
- **NOT a JS-mounted map on scroll** — `loading="lazy"` already defers the fetch, and a
  scroll-mounted iframe pops in with no reserved height unless you reserve it anyway, at
  which point the JS bought nothing.
- **No API key, no Maps JS SDK, no third-party script** (D-18, D-15).

A "Get directions" link sits outside the iframe:
`https://www.google.com/maps/dir/?api=1&destination=<MAP_COORDS>` — also coordinates.

## ratio and why

| thing | value |
|---|---|
| home zoom | 13 (service area reads as a metro) |
| contact zoom | 15 (reads as a place you could drive to) |
| aspect ratio | 16/9 at >=768, 4/3 at 390 |
| iframe height, `/contact` | ~300px, matching the reference band |

Zoom 13 vs 15 is the whole difference between the two placements: the home map answers "do
you cover me", the contact map answers "where are you". Two zooms, one component, one prop.

4/3 on mobile rather than 16/9 because a 390px-wide 16/9 map is 219px tall, which is too
short to show a useful radius at zoom 13.

## failure mode

- Passing the fake address to the embed: no pin, or a pin on a real unrelated address.
- No aspect-ratio wrapper: layout shift on a page where the phone CTA is above the fold.
- Omitting `title` on the iframe: an unlabelled frame is an AA failure and a screen-reader
  dead end.
- Adding the Maps JS SDK for a static pin: a key to leak, a script to load, D-15 violated.
- Letting the iframe be the only route to the address: it is an opaque frame to assistive
  tech, so the NAP text beside it is doing the real work.

## trigger

Browser-native lazy loading on first scroll into range. Not repeating. On client-side route
change the component remounts with the new `zoom` and the browser re-defers.

## accessibility

- `title="Map showing the Ridge Garage Door Repair service area"` (home) /
  `"…showing our location"` (contact). Distinct titles — two frames titled "Map" is its own
  failure.
- **Map bypass**: a skip link immediately before the iframe that jumps past it, because an
  embedded map is a keyboard trap in some browsers once focus enters it.
- The address, phone and hours are real text next to the map, so nothing is available only
  inside the frame.
- The directions link is a normal link with a descriptive name — not "click here", and not
  an icon alone.
- The iframe is not focusable content the page depends on; nothing inside it is required to
  complete any task.
