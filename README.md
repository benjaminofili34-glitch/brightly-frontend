# AfterSchool — Booking System (CST3144 coursework, frontend)

A single-page after-school activities marketplace built with **plain HTML + CSS + Vue 3 (CDN, Options API)**.
No build step, no router, no extra libraries. The visual style is a warm cream, terracotta and sage
palette with rounded cards and pill-shaped controls.

> **Maintenance note:** this README is reviewed and updated every time the project is scanned
> or changed. Update the *Last scanned* line and add an entry to the [Change log](#change-log).

**Last scanned:** 2026-10-14

---

## Running it

Open `index.html` in a browser (internet needed: Vue and the fonts load from CDNs).
If the lesson images do not show when opening the file directly, serve the folder instead:

```bash
python -m http.server 8765
```

then visit <http://localhost:8765/index.html>.

## Project structure

| Path | Purpose |
|---|---|
| `index.html` | The page: template, Vue app (`data` / `computed` / `methods`) |
| `styles.css` | All styling (design tokens, layout, components, responsive rules) |
| `images/` | Lesson photos (`computer.jpg`, `music.jpg`, `maths.jpg`) |
| `TEST_PLAN.md` | Manual functional test plan (122 tests, including phone/tablet/desktop layout checks) with a Pass/Fail column to fill in. Up to date with the final presentation; the tests have been written but not yet fully executed |

## Features (current)

- Lesson catalogue rendered with `v-for`: subject, location, teacher, price, spaces left, enrolled count, photo
- **Add to cart** — adds one place and reduces the lesson's availability; disabled at 0 spaces
- Header **Checkout (n)** button shows the cart count and toggles between catalogue and checkout view
- **Sorting** — by Subject, Location, Price or Spaces, ascending or descending; both control groups are generated with `v-for`. The sort toolbar is shown in the catalogue only and is hidden in the checkout view
- **Search** (header box) — filters as you type on subject, location, price and spaces, case-insensitively. Teacher names are not searched
- **Teacher filter** (dropdown in the toolbar) — works together with the search; a "Nothing matches yet" state with a **Clear search & filters** button appears when nothing matches
- **Checkout view** — places grouped by lesson with quantity and subtotal; **Remove** takes one place out and restores one space; running total; an empty-cart state with **Back to activities**
- **Checkout form** — Full name (letters and spaces only; spaces around the name are ignored when checking, so a spaces-only name is rejected) and Phone number (digits only); **Place order · £total** is enabled only when both are valid. Each field shows an untouched, valid (sage border and tick) or invalid (terracotta border and alert icon) state, and a hint under the button explains why it is disabled
- **Order confirmation** — submitting shows "Order confirmed" without reloading the page, empties the cart, clears the form, keeps the reduced availability and adds the purchased quantities to each lesson's enrolled count. The completed order is saved first in `lastOrder`, and the confirmation shows the customer's name and an order summary (lessons, teacher and location, price × quantity, subtotals and total)
- Responsive layout (see below)

**Not implemented yet:** backend / saving orders (all state is in memory and resets when the page is reloaded), and an order reference (the confirmation has a reserved slot for one — see "How the styling hooks into Vue").

## Presentation

The interface follows a warm "AfterClass" style: cream background, terracotta for actions, sage for availability and success, Caprasimo headings over Figtree body text, pill-shaped controls and rounded cards. Every colour, font and icon is a variable at the top of `styles.css`.

| Area | What you see |
|---|---|
| Header | Sticky bar: logo mark and name, search box with magnifier and clear (×), cart button (terracotta; outlined and greyed while the cart is empty; ringed while the cart is open) |
| Catalogue | Intro heading, a rounded toolbar (Sort by, Order, Teacher, result count), then lesson cards: photo with a spaces badge ("5 spaces" / "Last space" / "Fully booked"), subject and price, location, teacher, enrolled count, five-pill spaces meter (sage, terracotta at the last space, grey when full) and **Add to cart** |
| No results | Sage magnifier circle, "Nothing matches yet", and a **Clear search & filters** button |
| Checkout | Cart rows on the left (photo, subject, location and teacher, price, quantity, subtotal, **Remove**) and a sticky checkout card on the right (total, name, phone, **Place order**) |
| Empty cart | Peach circle with a bag icon, heading, text and **Back to activities** |
| Order confirmed | Sage tick badge, heading, thank-you message, **Return to activities**, and the order summary card |

Responsive behaviour:

- **Desktop (1000px and up)** — four-column-capable card grid, checkout in two columns
- **Tablet (640–999px)** — smaller gutters and headings; checkout and confirmation stack below 900px
- **Phone (under 640px)** — search on its own row, toolbar controls stacked full width, cards become horizontal (square photo, details, meter and a compact **Add to cart**), checkout card stacks under the cart rows

## How the Vue app works (`index.html`)

**`data()`**

| Name | Meaning |
|---|---|
| `heading` | Brand text in the header |
| `searchTerm` | Text in the search box |
| `displayCart` | `false` = catalogue view, `true` = checkout view |
| `sortAttribute` / `sortOrder` | Current sort field (`subject`, `location`, `price`, `availability`) and direction (`ascending` / `descending`) |
| `sortAttributes` / `sortOrders` | Option lists that generate the sort buttons |
| `lessons` | The lesson list (id, subject, teacher, location, price, `availability`, `enrolled`, image); `availability` and `enrolled` change as orders are made |
| `cart` | Flat list of lesson ids, one entry per place (`[2, 2, 3]` = two places on lesson 2, one on lesson 3) |
| `teachers` / `teacherFilter` | Options for the teacher dropdown, and the selected teacher (`""` = all) |
| `order` | `{ name, phone }` entered in the checkout form |
| `lastOrder` | Snapshot of the completed order (`name`, `phone`, `total`, `items`), saved by `submitOrder()` before the cart and form are cleared; the confirmation view reads it |
| `orderSubmitted` | `true` while the "Order confirmed" view is shown; reset to `false` when a place is added to the cart |

**`computed`** — `filteredLessons` (lessons matching the search and teacher filter), `numberOfItems` (cart size), `sortedLessons` (the filtered lessons ordered by the current attribute and order), `validName`, `validPhone`, `validForm` (checkout validation), `cartTotal` (sum of price × quantity)

**`methods`** — `addToCart(lesson)`, `removeFromCart(lesson)`, `toggleCart()`, `cartItemCount(id)`, `clearFilters()`, `submitOrder(event)`

## How the styling hooks into Vue (`styles.css`)

The CSS never needs JavaScript. The template exposes state through a few attributes:

| Hook in the HTML | Effect in the CSS |
|---|---|
| `:aria-pressed="…"` on sort buttons | Selected button turns terracotta (`[aria-pressed="true"]`) |
| `:aria-pressed="displayCart"` on the header button | Ring around the cart button while the checkout is open |
| `:class="{ 'is-low': … }"` on a card | Exactly 1 space left: terracotta meter, text and "Last space" badge |
| `:class="{ 'is-full': … }"` on a card | 0 spaces left: grey meter, dimmed photo, "Fully booked" badge |
| `:style="{ '--spaces': … }"` on a card | Fills the 5-pill spaces meter and prints the number in the "N spaces" badge |
| `<span class="label">` in each card line | Labels ("Subject :" …) are visually hidden but still read by screen readers |
| `:class="{ 'is-valid': validName }"` / `:aria-invalid="…"` on the form fields | Valid and invalid field colours and icons. They read the existing `validName` / `validPhone`; the validation rules are unchanged |
| `<label class="teacher-filter">` around the dropdown | Names the dropdown for screen readers and places the "Teacher" caption beside it |
| `.checkout-layout`, `.cart-items` wrappers | Two-column checkout (rows + sticky card), stacked below 900px |
| `<span class="cart-label">` before amounts | Small "Subtotal:" / "Total:" captions beside the amounts |
| `.order-summary-header` | Heading row of the order summary. **Order reference slot:** when the backend returns a reference, add `<span class="order-ref">…</span>` inside it (a comment marks the spot); `.order-ref` is already styled as the pill on the right |

Colours, fonts and icons are defined once as variables at the top of `styles.css`.

## Known notes

- Deliberate differences from the original design concept, because they would need new features or logic: no quantity +/- buttons (only **Remove**, one place at a time), no "in cart" tag on cards, no "Back to activities" link above the cart rows (use the header button), no order reference, and teacher avatars show an icon instead of initials. On phones the sort and teacher controls stack in the toolbar instead of opening a sheet.
- The header button reads "Checkout (n)" rather than "Cart", and the disabled **Add to cart** button keeps its text (the "Fully booked" badge on the photo shows the state).
- The spaces text assumes five places per lesson ("3 of 5 spaces left"), matching the intro text and the five-pill meter.
- Validation accepts any number of digits for the phone (no length check; the requirement is digits only). Names with hyphens, apostrophes or accents are rejected. See the OBS tests in `TEST_PLAN.md`.
- The toolbar says "Showing 1 activities" when exactly one lesson matches.
- `sortedLessons` uses `Array.sort()` on the cached `filteredLessons` array, so lessons with equal values (for example equal spaces) keep whatever order they had before the sort was changed.

## Change log

| Date | Change |
|---|---|
| 2026-10-14 | Final presentation pass. `styles.css` rewritten to match the AfterClass design (header with search, intro, rounded toolbar, spaces badge and meter, no-results, two-column checkout, empty cart, order confirmation, tablet and phone layouts). Small presentation-only markup changes in `index.html`: wrappers and classes, a label around the teacher dropdown, a decorative thumbnail in each cart row, placeholders on the form fields, and read-only `aria-pressed` / `aria-invalid` / `is-valid` bindings; the checkout `<form>` moved below the cart rows and the order summary got an `.order-summary-header` with room for a future order reference. No Vue `data`, `computed` or `methods` changed. Checked in a browser at 1280, 834, 700, 390 and 320px. |
| 2026-10-14 | Updated `TEST_PLAN.md` to the final presentation (now 122 tests): spaces text `N of 5 spaces left` and the photo badges, header button disabled in every empty-cart view, new confirmation wording and order-summary checks, field valid/invalid appearance and the disabled-button hint, Escape/× clearing the search, and a new section of 13 layout checks for desktop, tablet and phone. Refreshed the comments in `index.html` (header, toolbar, no-results/catalogue `v-if`/`v-else`, checkout card, and the data, computed and method notes); comments only, the script logic and the template are unchanged. |
| 2026-10-14 | Fixed the spaces-only name bug found by the test plan: `validName()` now tests `this.order.name.trim()`, so a name of only spaces is rejected while the stored name is unchanged. Corrected the `sortedLessons` comment (it sorts the filtered results, not `lessons`). Moved the old OBS-04 test to VAL-14 and added VAL-15 (padded names are accepted); the plan now has 102 tests. Checked the four requested cases plus edge cases in a browser. |
| 2026-10-14 | Added `TEST_PLAN.md` (101 manual tests covering catalogue, sorting, search, teacher filter, cart, totals, validation, checkout, multiple orders and regression). Expected results are based on the implementation; the main scenarios were exercised in a browser while writing it, but the full suite has not been run. Synced this README with the now-implemented search, teacher filter, checkout form and order confirmation (the earlier `v.model` typo is fixed). |
| 2026-10-13 | Moved the sort toolbar inside the catalogue's `v-if` (wrapped with the catalogue in a `<template v-if="!displayCart">`), so it no longer shows in the checkout view. No CSS change. Synced the README with the checkout form in progress; the header button now re-enables in the checkout view so the user can always return to the catalogue. |
| 2026-10-13 | Styled the frontend (new `styles.css`, minimal HTML wrapper/class/binding additions, Vue logic untouched). Added explanatory comments to `index.html` and `styles.css`. Added this README. |
