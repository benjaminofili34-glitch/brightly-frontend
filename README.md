# Brightly — After-school Booking System (CST3144 coursework, frontend)

A single-page after-school activities marketplace built with **plain HTML + CSS + Vue 3 (CDN, Options API)**.
No build step, no router, no extra libraries. The visual style follows the **Brightly** prototype:
deep green, cream and lime, Manrope headings over DM Sans, white rounded cards, prices in Mauritian
Rupees (Rs).

> **Maintenance note:** this README is reviewed and updated every time the project is scanned
> or changed. Update the *Last scanned* line and add an entry to the [Change log](#change-log).

**Last scanned:** 2026-10-26

---

## Running it

The app lives in the `frontend/` folder. Open `frontend/index.html` in a browser (internet needed:
Vue and the fonts load from CDNs). If the lesson images do not show when opening the file directly,
serve the folder instead:

```bash
cd frontend
python -m http.server 8765
```

then visit <http://localhost:8765/index.html>.

**GitHub Pages:** `.github/workflows/static.yml` publishes the `frontend/` folder to GitHub Pages on
every push to `main` (the repository's Pages source must be set to "GitHub Actions").

## Project structure

| Path | Purpose |
|---|---|
| `frontend/index.html` | The page: template, Vue app (`data` / `computed` / `methods`) |
| `frontend/styles.css` | All styling (design tokens, layout, components, responsive rules) |
| `frontend/images/` | The 10 lesson photos, one per lesson (see [Image credits](#image-credits)) |
| `.github/workflows/static.yml` | Deploys the `frontend/` folder to GitHub Pages |
| `frontend/TEST_PLAN.md` | Manual functional test plan (135 tests) with a Pass/Fail column. **Out of date since the Brightly redesign:** it still expects the old wording and look (`Checkout (n)`, `£`, `Showing n activities`, the spaces badge and pill meter, terracotta/sage colours); the behaviour it tests is unchanged |
| `backend/` | Express server work in progress (`server.js`, `lesson.js`, `images/`); not used by the frontend yet |

## Features (current)

- Lesson catalogue rendered with `v-for`: subject, location, teacher, price, spaces left, enrolled count, photo
- **Add to cart** — adds one place and reduces the lesson's availability; disabled at 0 spaces (and `addToCart()` itself does nothing when no space is left)
- Header **Cart (n)** button shows the cart count and toggles between catalogue and checkout view; disabled while the cart is empty; each switch starts the new view at the top of the page
- The **brightly** logo and the **Explore lessons** link both go back to the catalogue (both set `displayCart = false`, as the logo link already did)
- **Sorting** — by Subject, Location, Price or Spaces, **↑ Ascending** or **↓ Descending**; both control groups are generated with `v-for`. The controls live in the filter sidebar (catalogue view only)
- **Search** (hero box) — filters as you type on subject, location, price and spaces, case-insensitively; spaces around the text are ignored, so a spaces-only search shows everything. Teacher names are not searched. The hero (and the box) only appear in the catalogue view
- **Teacher filter** (dropdown in the sidebar) — works together with the search; the results heading reads "1 lesson to discover" / "n lessons to discover"; a "Nothing matches yet" state with a **Clear search & filters** button appears when nothing matches. **Clear all** in the sidebar calls the same `clearFilters()`
- **Checkout view** — places grouped by lesson with quantity and subtotal; **Remove** takes one place out and restores one space; running total; an empty-cart state with **Back to activities**
- **Checkout form** — Full name (letters and spaces only; spaces around the name are ignored when checking, so a spaces-only name is rejected) and Phone number (digits only); **Place order · Rs total** is enabled only when both are valid. Each field shows an untouched, valid (green border and tick) or invalid (red border, red label and alert icon) state, and a hint under the button explains why it is disabled
- **Order confirmation** — submitting shows "Order confirmed" without reloading the page, empties the cart, clears the form, keeps the reduced availability and adds the purchased quantities to each lesson's enrolled count. The completed order is saved first in `lastOrder` (name trimmed of surrounding spaces), the page scrolls to the top, and the confirmation shows the customer's name and an order summary (lessons, teacher and location, price × quantity, subtotals and total)
- Responsive layout (see below)

**Not implemented yet:** backend / saving orders (all state is in memory and resets when the page is reloaded), and an order reference (the confirmation has a reserved slot for one — see "How the styling hooks into Vue").

## Presentation

The interface follows the **Brightly** prototype (Figma Make, used as a visual reference only): green `#0f695b` for actions, lime `#cfeb70` accents, a cream hero, white rounded cards, Manrope headings over DM Sans body text. Every colour, font and icon is a variable at the top of `styles.css`.

| Area | What you see |
|---|---|
| Header | Sticky white bar: logo (green tile with two lime dots + "brightly"), **Explore lessons** link (green underline while the catalogue is showing), cart button with the count in a green square (faded while the cart is empty; green outline while the cart is open) |
| Hero | Kicker, "Find an activity they'll *love.*" with a lime underline, description, search box; on the right a framed photo (`art.jpg`) with a smaller overlapping photo (`computer.jpg`) and three chips ("10 activities" from `lessons.length`, "Local educators", "Technology · Arts · Sports") |
| Catalogue | Left sidebar: Filter lessons + **Clear all**, Sort by and Order as radio-style rows, Teacher dropdown, a booking note. Right: "n lessons to discover" and a 3-column grid of cards: photo, subject and **Rs price / session**, location, teacher, "n spaces left" with a coloured dot (green; amber at 1; red at 0), "n enrolled", **Add to cart** |
| Fully booked | Dark "Fully booked" overlay on the photo; **Add to cart** stays visible but disabled and grey |
| No results | Dashed white panel with a magnifier tile, "Nothing matches yet", and a **Clear search & filters** button |
| Checkout | "Shopping cart" heading; left panel "Your lessons" (n spaces pill, rows with photo, subject, location and teacher, price per session, Qty, subtotal, × remove-one button, order total); right a sticky "Contact details" card (name, phone, privacy note, **Place order · Rs total**) |
| Empty cart | Dashed panel with a cart tile, heading, text and **Back to activities** |
| Order confirmed | One centred card: tick tile, "Booking confirmed", "Order confirmed", thank-you message, bordered order summary, **Return to activities** |
| Footer | Dark green bar: logo, "After-school learning, made simple.", currency note |

Responsive behaviour:

- **Desktop (over 1100px)** — sidebar + three card columns; checkout in two columns
- **1100px and below** — two card columns, narrower sidebar and hero photo
- **Tablet (800px and below)** — hero stacks (photo under the text); the sidebar becomes a white panel above the results with the sort options as pill buttons; checkout stacks
- **Phone (560px and below)** — 64px header without the nav link or the word "Cart" (count stays); compact hero; one card column; sort pills in an even grid (2 × 2 at 360px and below); compact cart rows
- **340px and below** — the small hero photo is hidden and the chips shrink. Checked at 320, 375, 390, 768 and 1440px with no horizontal scrolling

## The lessons

Ten lessons, each starting with 5 spaces and 0 enrolled. Subjects, prices and locations are all different, so sorting never has ties on those fields.

| # | Subject | Teacher | Location | Price | Photo |
|---|---|---|---|---|---|
| 1 | Computer Science | Priya Shah | Hendon | Rs 100 | `computer.jpg` |
| 2 | Music | James Brown | Camden | Rs 80 | `music.jpg` |
| 3 | Mathematics | Emma Davis | Finchley | Rs 90 | `maths.jpg` |
| 4 | Art | Lena Fischer | Highgate | Rs 70 | `art.jpg` |
| 5 | Football | Tom Whitaker | Barnet | Rs 60 | `football.jpg` |
| 6 | Swimming | Tom Whitaker | Mill Hill | Rs 85 | `swimming.jpg` |
| 7 | Chess | Daniel Reyes | Edgware | Rs 50 | `chess.jpg` |
| 8 | Drama | James Brown | Golders Green | Rs 75 | `drama.jpg` |
| 9 | Dance | Lena Fischer | Kentish Town | Rs 65 | `dance.jpg` |
| 10 | Science | Amara Okafor | Brent Cross | Rs 95 | `science.jpg` |

The frontend data is unchanged by the redesign (London locations, small prices); only the currency label changed. The backend's `lesson.js` uses a different, Mauritius-based data set and field names.

Teachers with more than one lesson: James Brown (Music, Drama), Lena Fischer (Art, Dance) and Tom Whitaker (Football, Swimming).

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
| `teachers` / `teacherFilter` | Options for the teacher dropdown (seven teachers, each teaching at least one lesson), and the selected teacher (`""` = all) |
| `order` | `{ name, phone }` entered in the checkout form |
| `lastOrder` | Snapshot of the completed order (`name`, `phone`, `total`, `items`), saved by `submitOrder()` before the cart and form are cleared; the confirmation view reads it |
| `orderSubmitted` | `true` while the "Order confirmed" view is shown; reset to `false` when a place is added to the cart |

**`computed`** — `filteredLessons` (lessons matching the search and teacher filter), `numberOfItems` (cart size), `sortedLessons` (the filtered lessons ordered by the current attribute and order), `validName`, `validPhone`, `validForm` (checkout validation), `cartTotal` (sum of price × quantity)

**`methods`** — `addToCart(lesson)`, `removeFromCart(lesson)`, `toggleCart()`, `cartItemCount(id)`, `clearFilters()`, `submitOrder(event)`

## How the styling hooks into Vue (`styles.css`)

The CSS never needs JavaScript. The template exposes state through a few attributes:

| Hook in the HTML | Effect in the CSS |
|---|---|
| `:aria-pressed="…"` on sort buttons | Selected option gets the filled green radio dot (desktop) or the solid green pill (tablet/phone) |
| `:aria-pressed="displayCart"` on the cart button | Green outline on the cart button while the checkout is open |
| `:aria-current="displayCart ? null : 'page'"` on **Explore lessons** | Green text and underline bar while the catalogue is showing |
| `:class="{ 'is-low': … }"` on a card | Exactly 1 space left: amber dot and "1 space left" |
| `:class="{ 'is-full': … }"` on a card | 0 spaces left: red dot, "Fully booked" overlay on the photo; the disabled button turns grey |
| `:style="{ '--spaces': … }"` on a card | Kept from the previous design; not used for drawing at the moment |
| `:key="lesson.id"` on a card | Not a styling hook: ties each card to its lesson so a re-sort moves the card instead of reusing its slot for another lesson |
| `<span class="label">` in each card line | Labels ("Subject :" …) are visually hidden but still read by screen readers |
| `:class="{ 'is-valid': validName }"` / `:aria-invalid="…"` on the form fields | Valid and invalid field colours, icons and label colour. They read the existing `validName` / `validPhone`; the validation rules are unchanged |
| `<label class="teacher-filter">` around the dropdown | Names the dropdown for screen readers |
| `.catalogue-layout`, `.filters`, `.results` wrappers | Sidebar + results on desktop; sidebar becomes a panel above the results at 800px and below |
| `.checkout-layout`, `.cart-panel`, `.cart-items` wrappers | Two-column checkout (cart panel + sticky contact card), stacked at 800px and below |
| `<span class="cart-label">` in totals | "Order total" / "Total" captions beside the amounts |
| `.order-summary-header` | Heading row of the order summary. **Order reference slot:** when the backend returns a reference, add `<span class="order-ref">…</span>` inside it (a comment marks the spot); `.order-ref` is already styled as the pill on the right |

Colours, fonts and icons are defined once as variables at the top of `styles.css`.

## Known notes

- Deliberate differences from the Brightly prototype, because they would need data or logic the app does not have yet: **no Category filter** and no category pill on the cards (lessons have no `category` field), no age-range line and no schedule/duration line on the cards (no `ageRange` / `schedule` / `durationMinutes` fields), no per-option counts beside the filters, the Teacher filter stays a dropdown (the prototype uses radio rows), no "Back to lessons" link above the cart (use the logo, **Explore lessons** or the cart button), and on tablets/phones the filters show as an inline panel instead of a "Filters & sort" bottom sheet (that needs an open/closed flag in `data()`).
- The **Remove** button in each cart row is an × icon; its text ("Remove one space") is kept for screen readers.
- Validation accepts any number of digits for the phone (no length check; the requirement is digits only). Names with hyphens, apostrophes or accents are rejected. See the OBS tests in `TEST_PLAN.md`.
- Every switch between the catalogue and the checkout scrolls to the top, so returning to the catalogue does not go back to the card the user was looking at (no scroll position is saved).
- When sorting by Spaces, adding a place can move that card; keyboard focus is then dropped (the next Tab goes to the first card) rather than moving to a different lesson.
- `sortedLessons` uses `Array.sort()` on the cached `filteredLessons` array, so lessons with equal values (for example equal spaces) keep whatever order they had before the sort was changed.

## Image credits

The seven photos added for lessons 4-10 are from [Unsplash](https://unsplash.com) and are used under the [Unsplash License](https://unsplash.com/license) (free to use; credit is appreciated). They were downloaded at 1200px wide.

| File | Photographer | Photo page |
|---|---|---|
| `art.jpg` | Anita Jankovic | <https://unsplash.com/photos/5uaZwt3x7nU> |
| `football.jpg` | Robert Collins | <https://unsplash.com/photos/tvc5imO5pXk> |
| `swimming.jpg` | Mariusz Smenzyk | <https://unsplash.com/photos/xs9r8fPUats> |
| `chess.jpg` | Felix Mittermeier | <https://unsplash.com/photos/nAjil1z3eLk> |
| `drama.jpg` | Kyle Head | <https://unsplash.com/photos/p6rNTdAPbuk> |
| `dance.jpg` | Astrid Schaffner | <https://unsplash.com/photos/t0gpVFi6UmI> |
| `science.jpg` | Vitaly Gariev | <https://unsplash.com/photos/UStQpco0TWo> |

`computer.jpg`, `music.jpg` and `maths.jpg` were already part of the project. They have been resized to the same 1200px width as the Unsplash photos (originally 3888-6000px wide and 2-3 MB each; now 54-97 KB each). All ten photos together are about 1.2 MB.

## Change log

| Date | Change |
|---|---|
| 2026-10-26 | **Brightly redesign** (presentation only). `styles.css` rewritten to the Brightly prototype (tokens, header, hero, filter sidebar, cards, cart page, checkout, empty/confirmed states, footer, responsive rules at 1100/800/560/340px). `index.html` template restructured: header with logo mark, **Explore lessons** link and Cart count; new hero with the existing `v-model="searchTerm"` search box (moved from the header) and a photo collage; sort/order/teacher controls moved into a sidebar with a **Clear all** button (calls the existing `clearFilters()`); cards regrouped into photo/body/footer; prices shown as **Rs**; cart rows and totals moved into a "Your lessons" panel; contact form in its own card; static footer. Every existing directive, `v-model`, handler and computed reference was kept. Script change: only `heading` is now `"Brightly"`. Checked in a browser at 1440, 768, 390, 375 and 320px: sorting both ways, search, teacher filter, both clear buttons, no-results, add to cart down to 1 and 0 spaces (button stays visible and disabled), grouped cart, remove one, totals, validation states, disabled Place order, order confirmation, enrolled counts, empty cart; no console errors and no horizontal scrolling. `TEST_PLAN.md` not updated. |
| 2026-10-26 | Backup commit before the redesign: committed the `lessonId` field in `lastOrder.items`, `.gitignore` for `backend/node_modules`, the `backend/` folder and the root `package.json`, and pushed to GitHub. |
| 2026-10-20 | Moved the app into a `frontend/` folder (`index.html`, `styles.css`, `TEST_PLAN.md` and `images/`; contents unchanged). The GitHub Pages workflow (`.github/workflows/static.yml`, added on GitHub) now uploads `./frontend` instead of the whole repository, so `index.html` is at the root of the published site. Updated the run instructions and the project-structure table for the new paths. |
| 2026-10-14 | Final verification cleanups. `toggleCart()` now calls `window.scrollTo(0, 0)` on every switch between the catalogue and the checkout (no saved scroll position); the scroll to the top after placing an order is unchanged. `TEST_PLAN.md` updated to the current behaviour (now 135 tests, up from 131): Order labels `↑ Ascending / ↓ Descending`, `Showing 1 activity`, the new no-results text, the trimmed name in VAL-15, the brand link first in PRE-11, no search box in the checkout header (OBS-07, PRE-06, PRE-07) and no toolbar divider at tablet width (PRE-03); new tests SRC-19 (trimmed search), SRC-20 (search hidden in checkout), CRT-12 (view switches start at the top), SUC-12 (confirmation opens at the top), PRE-14 (brand link with mouse and keyboard) and PRE-15 (long unbroken name); OBS-03 and OBS-06 removed because that behaviour was fixed. The changed and new tests and a short smoke run were executed in a browser and passed; the full suite has not been run. |
| 2026-10-14 | Applied the 14 approved fixes from the exploratory frontend audit. `index.html`: `:key="lesson.id"` on the catalogue cards and an `availability > 0` guard in `addToCart()`; the brand is now an `<a href="#app">` link; the search box has `aria-label="Search activities"`, is hidden in the checkout view (`v-show`) and ignores surrounding spaces (`.trim()`); "Showing 1 activity" singular; Order labels are now "↑ Ascending / ↓ Descending"; the no-results text mentions the teacher; the confirmation stores the trimmed name; opening the checkout and placing an order scroll to the top. `styles.css`: link styling and `margin-right: auto` on `.brand`, `overflow-wrap: anywhere` on the thank-you message, and no Order divider below 1000px. Re-checked the affected scenarios and a smoke run at 1280, 834, 390 and 320px: no overflow, no console errors. `TEST_PLAN.md` has not been updated yet and still expects the old labels and wording (A-Z/Z-A, "1 activities", the old no-results text, OBS-06/OBS-07). |
| 2026-10-14 | Resized `computer.jpg`, `music.jpg` and `maths.jpg` to 1200px wide (JPEG quality 80, same as the seven added photos): 3.1 MB / 2.1 MB / 2.4 MB down to 82 KB / 97 KB / 54 KB, and the whole `images/` folder from about 8.5 MB to 1.2 MB. Same file names, so no code change. Checked in a browser: all ten photos load at 1200px with no console errors, and the cards, cart thumbnails and photo wash look the same. The originals are still in the git history (and were backed up outside the project before resizing). |
| 2026-10-14 | Updated `TEST_PLAN.md` for the ten lessons (now 131 tests, up from 122). Reference data and conventions rewritten; every count, sort order, search result, teacher-filter result and total recomputed; new tests for the added lessons' card details and photos (CAT-06, CAT-07), the added teachers (TCH-05, TCH-06, TCH-09, TCH-12), searching the new lessons (SRC-17, SRC-18), booking them (CRT-11, TOT-06) and ordering them (SUC-11). Expected values were computed from the data and checked against the running page; the full suite has not been executed. No application code changed. |
| 2026-10-14 | Expanded the lessons from 3 to 10 (Art, Football, Swimming, Chess, Drama, Dance, Science added) with seven Unsplash photos saved in `images/`, and the teachers list from 3 to 7. Only the `lessons` and `teachers` data changed; no logic, markup or CSS. Checked in a browser: all photos load, every sort, the teacher filter, search and a multi-lesson order behave correctly, and the layout holds on desktop and phone. `TEST_PLAN.md` was updated for the ten lessons in the next entry. |
| 2026-10-14 | Final presentation pass. `styles.css` rewritten to match the AfterClass design (header with search, intro, rounded toolbar, spaces badge and meter, no-results, two-column checkout, empty cart, order confirmation, tablet and phone layouts). Small presentation-only markup changes in `index.html`: wrappers and classes, a label around the teacher dropdown, a decorative thumbnail in each cart row, placeholders on the form fields, and read-only `aria-pressed` / `aria-invalid` / `is-valid` bindings; the checkout `<form>` moved below the cart rows and the order summary got an `.order-summary-header` with room for a future order reference. No Vue `data`, `computed` or `methods` changed. Checked in a browser at 1280, 834, 700, 390 and 320px. |
| 2026-10-14 | Updated `TEST_PLAN.md` to the final presentation (now 122 tests): spaces text `N of 5 spaces left` and the photo badges, header button disabled in every empty-cart view, new confirmation wording and order-summary checks, field valid/invalid appearance and the disabled-button hint, Escape/× clearing the search, and a new section of 13 layout checks for desktop, tablet and phone. Refreshed the comments in `index.html` (header, toolbar, no-results/catalogue `v-if`/`v-else`, checkout card, and the data, computed and method notes); comments only, the script logic and the template are unchanged. |
| 2026-10-14 | Fixed the spaces-only name bug found by the test plan: `validName()` now tests `this.order.name.trim()`, so a name of only spaces is rejected while the stored name is unchanged. Corrected the `sortedLessons` comment (it sorts the filtered results, not `lessons`). Moved the old OBS-04 test to VAL-14 and added VAL-15 (padded names are accepted); the plan now has 102 tests. Checked the four requested cases plus edge cases in a browser. |
| 2026-10-14 | Added `TEST_PLAN.md` (101 manual tests covering catalogue, sorting, search, teacher filter, cart, totals, validation, checkout, multiple orders and regression). Expected results are based on the implementation; the main scenarios were exercised in a browser while writing it, but the full suite has not been run. Synced this README with the now-implemented search, teacher filter, checkout form and order confirmation (the earlier `v.model` typo is fixed). |
| 2026-10-13 | Moved the sort toolbar inside the catalogue's `v-if` (wrapped with the catalogue in a `<template v-if="!displayCart">`), so it no longer shows in the checkout view. No CSS change. Synced the README with the checkout form in progress; the header button now re-enables in the checkout view so the user can always return to the catalogue. |
| 2026-10-13 | Styled the frontend (new `styles.css`, minimal HTML wrapper/class/binding additions, Vue logic untouched). Added explanatory comments to `index.html` and `styles.css`. Added this README. |
