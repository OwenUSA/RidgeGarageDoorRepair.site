# Behavior — form field focus, error and success

`/contact` only. Fields per D-05: name, phone, service needed (select), preferred callback
window, message. **No email field, ever.** No backend (D-18), no form library (Appendix A).

Reference for geometry only: input 47px tall, radius 3px, bg `#F2F6F9`, 1px border in the
same color as the background, 16px text, 16px left padding, `0.3s` transition. Reference
focus style is the **browser default outline and nothing else** — a WCAG 2.2 AA gap we do
not reproduce (F-04).

## mechanism

Plain React `useState`, one object, and a ten-line validator. Validation runs **on blur and
on submit, never on change** — validating each keystroke tells someone their phone number is
invalid while they are still typing the third digit.

- Focus ring: `outline: 2px solid <focus>; outline-offset: 2px` on `:focus-visible`.
  **NOT `outline: none` plus a `box-shadow` ring** — that disappears in forced-colors mode.
  **NOT `:focus`** — it fires on mouse click too and looks like a bug to pointer users.
- Error: `aria-invalid="true"` plus a 1px border change plus a message node. **Color is
  never the only carrier** — there is an icon and text, because the palette is randomized
  and because ~4% of male users cannot rely on a red border.
- Success: the whole form is **replaced** by a callback-confirmation panel, not a toast. A
  toast that vanishes is not a receipt, and there is no backend to re-query.

Phone validation: strip non-digits, require exactly 10, format on blur to `(NPA) NXX-XXXX`,
accept any pasted format. No country selector (one country), no `libphonenumber` (banned).

Submit handler: `preventDefault()`, validate, show the confirmation state, and
`console.warn` the stub notice. `// STUB: no submission target` at the top of the file. Zero
server code, so there is nothing to secure and nothing to leak.

## ratio and why

| thing | value |
|---|---|
| input height | 47px |
| radius | 3px |
| focus ring | 2px, 2px offset, >=3:1 against both field and page |
| border/bg transition | `0.18s ease` |
| error message reveal | `0.15s` opacity only |

47px and 3px come straight from the reference and are what `contact.form-block` is measured
on. The focus ring is 2px with a 2px offset so it reads outside the field's own 1px border
rather than merging with it.

0.18s on the border is fast enough that focus feels instantaneous while still being a
transition rather than a snap. The error message animates opacity only — sliding it in
pushes every field below it down, which moves the target the user is about to click.

## failure mode

- Validating on change: hostile.
- `outline: none` with a box-shadow ring: invisible in forced-colors mode.
- Color-only error state: fails AA non-text contrast and fails colorblind users outright.
- A toast for success: the confirmation is the entire outcome of the page; it must persist.
- Animating the error message's height: layout shift under the pointer.
- Reserving no space for the error message: every field below jumps on first error.

## trigger

Blur validates that field. Submit validates all, focuses the **first** invalid field, and
announces the summary. Success replaces the form. Re-entry: navigating away and back
remounts pristine, which is correct — there is nothing persisted.

## accessibility

- Every field has a real `<label>`, not a placeholder standing in for one. Placeholders
  disappear on input and are not accessible names.
- Errors are announced through a **`aria-live="polite"` region** and referenced from the
  field via `aria-describedby`; `aria-invalid="true"` on the field itself.
- On submit failure, focus moves to the first invalid field. On success, focus moves to the
  confirmation panel heading, which has `tabindex="-1"`.
- The select is a native `<select>` — a custom listbox is a large accessibility surface for
  no gain on five options.
- Required fields are marked in the label text, not by color or by an asterisk alone.
- Fully keyboard-operable end to end, with visible focus on every control including the
  submit button.
- Under `prefers-reduced-motion: reduce`, the 0.18s and 0.15s transitions drop to 0.01s.
