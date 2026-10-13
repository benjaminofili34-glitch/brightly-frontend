# AfterSchool — Booking System (CST3144 coursework, frontend)

A single-page after-school activities marketplace built with **plain HTML + CSS + Vue 3 (CDN, Options API)**.
No build step, no router, no extra libraries. The visual style is a warm cream, terracotta and sage
palette with rounded cards and pill-shaped controls.

> **Maintenance note:** this README is reviewed and updated every time the project is scanned
> or changed. Update the *Last scanned* line and add an entry to the [Change log](#change-log).

**Last scanned:** 2026-10-13

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

## Features (current)

- Lesson catalogue rendered with `v-for`: subject, location, price, spaces left, photo
- **Add to cart** — adds one place and reduces the lesson's availability; disabled at 0 spaces
- Header **Checkout (n)** button shows the cart count and toggles between catalogue and checkout view
- **Checkout view** — places grouped by lesson with a quantity; **Remove** takes one place out and restores one space
- **Sorting** — by Subject, Location, Price or Spaces, ascending or descending; both control groups are generated with `v-for`
- Responsive layout (card grid on desktop, single column on phones)

**Not implemented yet** (planned separately): teacher filtering, search, enrolment/checkout form, backend.

## How the Vue app works (`index.html`)

**`data()`**

| Name | Meaning |
|---|---|
| `heading` | Brand text in the header |
| `displayCart` | `false` = catalogue view, `true` = checkout view |
| `sortAttribute` / `sortOrder` | Current sort field (`subject`, `location`, `price`, `availability`) and direction (`ascending` / `descending`) |
| `sortAttributes` / `sortOrders` | Option lists that generate the sort buttons |
| `sortTeachers` | Reserved for the teacher filter (unused) |
| `lessons` | The lesson list; `availability` changes as the cart changes |
| `cart` | Flat list of lesson ids, one entry per place (`[2, 2, 3]` = two places on lesson 2, one on lesson 3) |

**`computed`** — `numberOfItems` (cart size), `sortedLessons` (lessons sorted by the current attribute and order)

**`methods`** — `addToCart(lesson)`, `removeFromCart(lesson)`, `toggleCart()`, `cartItemCount(id)`

## How the styling hooks into Vue (`styles.css`)

The CSS never needs JavaScript. The template exposes state through a few attributes:

| Hook in the HTML | Effect in the CSS |
|---|---|
| `:aria-pressed="…"` on sort buttons | Selected button turns terracotta (`[aria-pressed="true"]`) |
| `:class="{ 'is-low': … }"` on a card | Exactly 1 space left: terracotta meter and text |
| `:class="{ 'is-full': … }"` on a card | 0 spaces left: grey meter, dimmed photo |
| `:style="{ '--spaces': … }"` on a card | Fills the 5-pill spaces meter |
| `<span class="label">` in each card line | Labels ("Subject :" …) are visually hidden but still read by screen readers |

Colours, fonts and icons are defined once as variables at the top of `styles.css`.

## Known notes

- Opening the checkout view and removing the **last** item disables the header button (it is disabled when the cart is empty), so you cannot switch back to the catalogue without reloading. Existing behaviour, not caused by the styling.
- `sortedLessons` uses `Array.sort()`, which reorders `lessons` itself rather than a copy.
- The disabled Add to cart button keeps the text "Add to cart" when a lesson is full (it is greyed out); showing "Fully booked" instead would need template logic.

## Change log

| Date | Change |
|---|---|
| 2026-10-13 | Styled the frontend (new `styles.css`, minimal HTML wrapper/class/binding additions, Vue logic untouched). Added explanatory comments to `index.html` and `styles.css`. Added this README. |
