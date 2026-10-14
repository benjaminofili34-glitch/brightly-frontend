# AfterSchool — Frontend Functional Test Plan

Manual functional tests for the CST3144 Vue 3 coursework frontend (`index.html`, `styles.css`).
Expected results are based on the current implementation, **including the final presentation pass**
(restyled catalogue, checkout, empty-cart and order-confirmed views), and should be verified manually in
the browser. The main scenarios were exercised in a browser while this plan was updated, but the full
suite has **not** been executed yet: record your own results in the Pass/Fail column.
No testing framework or code is needed: open the page and follow the steps.

## Test run record

| Field | Value |
|---|---|
| Tester | |
| Date | |
| Browser and version | |
| Screen size / device | |
| Build tested (git commit) | |

| Section | Tests | Passed | Failed |
|---|---|---|---|
| 1. Catalogue initial state (CAT) | 8 | | |
| 2. Sorting (SRT) | 10 | | |
| 3. Search (SRC) | 16 | | |
| 4. Teacher filtering (TCH) | 9 | | |
| 5. Cart (CRT) | 10 | | |
| 6. Totals (TOT) | 5 | | |
| 7. Checkout validation (VAL) | 18 | | |
| 8. Successful checkout (SUC) | 10 | | |
| 9. Multiple orders (MUL) | 4 | | |
| 10. Regression checks (REG) | 10 | | |
| 11. Observations of current behaviour (OBS) | 9 | | |
| 12. Presentation and responsive layout (PRE) | 13 | | |
| **Total** | **122** | | |

## How to run

1. Open `index.html` in a browser. Vue and the fonts load from the internet, so a connection is needed.
   If the lesson photos do not appear when opening the file directly, serve the folder instead
   (`python -m http.server 8765`, then visit `http://localhost:8765/index.html`).
2. The app keeps everything in memory. **Reloading the page (F5) resets it completely**, so reload
   between tests unless a test says it continues from the previous one.
3. Unless a test says otherwise, use a **desktop-width window (1000px or wider)**. Sections 1-11 describe
   the desktop layout. For the phone and tablet layouts (section 12), open the developer tools (F12),
   switch on the device toolbar (Ctrl+Shift+M) and set the width.
4. For each test, tick `Pass` or `Fail` in the last column. Record any failure in the log at the end.

## Reference data (initial state after a fresh load)

| Subject | Teacher | Location | Price | Spaces | Enrolled |
|---|---|---|---|---|---|
| Computer Science | Priya Shah | Hendon | £100 | 5 | 0 |
| Music | James Brown | Camden | £80 | 5 | 0 |
| Mathematics | Emma Davis | Finchley | £90 | 5 | 0 |

## Conventions used in the tests

- **Default order on load** is Subject, ascending: Computer Science, Mathematics, Music.
- **Spaces** are shown on each card as a row of five pills plus the text `N of 5 spaces left`
  (for example `4 of 5 spaces left`). On phones (under 640px) the text is shortened to `N left`.
- **Photo badge** (top-left of each card photo): `N spaces` normally, `Last space` when one remains,
  `Fully booked` when none remain. The badge is hidden on phones.
- **Enrolled** is shown on each card as `N enrolled`, next to a small people icon.
- **Header button** reads `Checkout (n)` where n is the number of places in the cart. It is **disabled
  whenever the cart is empty, in every view** (catalogue, empty cart and order confirmed). While the
  checkout is open with items in the cart it is highlighted with a pale ring.
- **Checkout rows**: each lesson in the cart is one row showing a thumbnail photo, the subject, `location
  with teacher`, `Price: £x`, a `Quantity: n` pill, a **Remove** button and the subtotal (a small
  `Subtotal:` caption above the amount). Rows always appear in the data order Computer Science, Music,
  Mathematics, whichever sort is selected.
- **Checkout card**: on desktop it is to the right of the rows (below 900px it sits under them). It holds
  the `Checkout` heading, the total, the two fields and **Place order**.
- **Search box** is in the header. **Intro heading, sort controls, teacher dropdown and the "Showing n
  activities" text** are in the catalogue view only, not in checkout.
- Search matches subject, location, price and spaces only (not teacher). It updates as you type.
- Where a sort is described as "Subject ↑", it means the **Sort by: Subject** and **Order: ↑ A-Z**
  buttons. "↓" means **↓ Z-A**.

## Setups (reusable preconditions)

| Setup | How to reach it |
|---|---|
| **F** | Fresh load: reload the page and click nothing. |
| **S-SPACES** | From F: click **Add to cart** on Music twice and on Mathematics once. Spaces are now Computer Science 5, Mathematics 4, Music 3. Header shows `Checkout (3)`. |
| **S-FORM** | From F: click **Add to cart** on Computer Science once, then click the header `Checkout (1)` button. The checkout is shown with `Total: £100`. |
| **S-ORDER1** | From F: add Computer Science twice and Music once (`Checkout (3)`, total £280). Open checkout, enter Full name `Amelia Hart` and Phone `07123456789`, click **Place order**, then click **Return to activities**. State: Computer Science 3 spaces / 2 enrolled, Mathematics 5 spaces / 0 enrolled, Music 4 spaces / 1 enrolled. |

---

## 1. Catalogue initial state (CAT)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| CAT-01 | Page loads | F | 1. Look at the header and page.<br>2. Look at the header Checkout button. | Header shows the AfterSchool brand with its two-circle logo and the tagline "After-school classes & activities" (hidden on screens narrower than 640px). A search box with a magnifier icon and the placeholder "Search subject, location, price or spaces" is visible. The header button reads `Checkout (0)` and is disabled (outlined and greyed out). Below the header is the intro heading "Find their next favourite afternoon." with a short description. | ☐ Pass ☐ Fail |
| CAT-02 | Lessons listed | F | 1. Count the lesson cards.<br>2. Read the order top to bottom / left to right.<br>3. Read the "Showing" text in the toolbar. | Three cards in the order Computer Science, Mathematics, Music. The toolbar says `Showing 3 activities`. | ☐ Pass ☐ Fail |
| CAT-03 | Computer Science card | F | Read the Computer Science card. | Shows: photo with the badge `5 spaces`; subject Computer Science with price £100 on the same line; location Hendon; teacher Priya Shah; `0 enrolled`; five sage-green pills with `5 of 5 spaces left`. The **Add to cart** button (with a + icon) is enabled. | ☐ Pass ☐ Fail |
| CAT-04 | Mathematics card | F | Read the Mathematics card. | Shows: badge `5 spaces`; subject Mathematics with price £90; location Finchley; teacher Emma Davis; `0 enrolled`; `5 of 5 spaces left`. **Add to cart** is enabled. | ☐ Pass ☐ Fail |
| CAT-05 | Music card | F | Read the Music card. | Shows: badge `5 spaces`; subject Music with price £80; location Camden; teacher James Brown; `0 enrolled`; `5 of 5 spaces left`. **Add to cart** is enabled. | ☐ Pass ☐ Fail |
| CAT-06 | Lesson images | F | Look at the photo on each card. | Each card shows its own photo (computer, maths, music) with rounded corners and no broken-image icon. | ☐ Pass ☐ Fail |
| CAT-07 | Default control state | F | Look at the toolbar and search box. | **Sort by: Subject** and **Order: ↑ A-Z** are highlighted (selected, terracotta). The teacher dropdown shows `All teachers`. The search box is empty. | ☐ Pass ☐ Fail |
| CAT-08 | Control options | F | 1. Read the buttons in **Sort by** and **Order**.<br>2. Look at the teacher control.<br>3. Open the teacher dropdown. | Sort by offers Subject, Location, Price, Spaces. Order offers ↑ A-Z and ↓ Z-A. A caption `Teacher` sits beside the dropdown, which has a chevron arrow. The dropdown lists All teachers, Priya Shah, James Brown, Emma Davis. | ☐ Pass ☐ Fail |

## 2. Sorting (SRT)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| SRT-01 | Subject ascending | F | 1. Click **Subject**.<br>2. Click **↑ A-Z**. | Order: Computer Science, Mathematics, Music. | ☐ Pass ☐ Fail |
| SRT-02 | Subject descending | F | 1. Click **Subject**.<br>2. Click **↓ Z-A**. | Order: Music, Mathematics, Computer Science. | ☐ Pass ☐ Fail |
| SRT-03 | Location ascending | F | 1. Click **Location**.<br>2. Click **↑ A-Z**. | Order by location: Camden (Music), Finchley (Mathematics), Hendon (Computer Science). | ☐ Pass ☐ Fail |
| SRT-04 | Location descending | F | 1. Click **Location**.<br>2. Click **↓ Z-A**. | Order: Hendon (Computer Science), Finchley (Mathematics), Camden (Music). | ☐ Pass ☐ Fail |
| SRT-05 | Price ascending | F | 1. Click **Price**.<br>2. Click **↑ A-Z**. | Order: Music £80, Mathematics £90, Computer Science £100. | ☐ Pass ☐ Fail |
| SRT-06 | Price descending | F | 1. Click **Price**.<br>2. Click **↓ Z-A**. | Order: Computer Science £100, Mathematics £90, Music £80. | ☐ Pass ☐ Fail |
| SRT-07 | Spaces ascending | S-SPACES | 1. Click **Spaces**.<br>2. Click **↑ A-Z**. | Fewest spaces first: Music (3), Mathematics (4), Computer Science (5). | ☐ Pass ☐ Fail |
| SRT-08 | Spaces descending | S-SPACES | 1. Click **Spaces**.<br>2. Click **↓ Z-A**. | Most spaces first: Computer Science (5), Mathematics (4), Music (3). | ☐ Pass ☐ Fail |
| SRT-09 | Selected state highlight | F | 1. Click **Price**, then **↓ Z-A**.<br>2. Look at which buttons are highlighted.<br>3. Click **Location**, then **↑ A-Z**. | After step 1 only **Price** and **↓ Z-A** are highlighted (terracotta fill). After step 3 only **Location** and **↑ A-Z** are highlighted. Exactly one button per group is highlighted at any time. | ☐ Pass ☐ Fail |
| SRT-10 | Sort kept after visiting checkout | F | 1. Click **Price**, then **↓ Z-A**.<br>2. Add Music to the cart.<br>3. Click the header `Checkout (1)` button, then click it again to return. | In the checkout view the intro heading and toolbar are not shown. After returning, the order is still Computer Science, Mathematics, Music and **Price** and **↓ Z-A** are still highlighted. | ☐ Pass ☐ Fail |

## 3. Search (SRC)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| SRC-01 | Search by subject | F | Type `music` in the search box (do not press Enter). | Only Music is shown. Toolbar says `Showing 1 activities`. | ☐ Pass ☐ Fail |
| SRC-02 | Partial subject | F | 1. Type `comp`.<br>2. Clear it and type `math`. | `comp` shows only Computer Science. `math` shows only Mathematics. | ☐ Pass ☐ Fail |
| SRC-03 | Search by location | F | Type `camden`. | Only Music is shown. | ☐ Pass ☐ Fail |
| SRC-04 | Partial location | F | 1. Type `hend`.<br>2. Clear it and type `finch`. | `hend` shows only Computer Science. `finch` shows only Mathematics. | ☐ Pass ☐ Fail |
| SRC-05 | Search by price (80) | F | Type `80`. | Only Music (£80) is shown. | ☐ Pass ☐ Fail |
| SRC-06 | Search by price (100, 9) | F | 1. Type `100`.<br>2. Clear it and type `9`. | `100` shows only Computer Science. `9` shows only Mathematics (£90). | ☐ Pass ☐ Fail |
| SRC-07 | Price search is a text match | F | Type `0`. | All three lessons are shown, because 100, 80 and 90 each contain "0". `Showing 3 activities`. | ☐ Pass ☐ Fail |
| SRC-08 | Search by spaces | S-SPACES | 1. Type `3`.<br>2. Clear it and type `4`.<br>3. Clear it and type `5`.<br>4. Clear it and type `2`. | `3` shows only Music. `4` shows only Mathematics. `5` shows only Computer Science. `2` shows the "Nothing matches yet" state. | ☐ Pass ☐ Fail |
| SRC-09 | Spaces search on a fresh page | F | 1. Type `5`.<br>2. Clear it and type `3`. | `5` shows all three lessons (each has 5 spaces). `3` shows the "Nothing matches yet" state. | ☐ Pass ☐ Fail |
| SRC-10 | Case-insensitive search | F | Type each of these in turn: `MUSIC`, `mUsIc`, `HENDON`. | `MUSIC` and `mUsIc` show only Music. `HENDON` shows only Computer Science. Same results as lower-case. | ☐ Pass ☐ Fail |
| SRC-11 | Empty search restores all | F | 1. Type `music` (one card shown).<br>2. Delete all the text with the keyboard. | All three lessons return in the current sort order. `Showing 3 activities`. | ☐ Pass ☐ Fail |
| SRC-12 | Impossible search shows no-results state | F | Type `zzz`. | No lesson cards. A panel shows a sage-green circle with a magnifier, the heading `Nothing matches yet`, the text `Try another subject, location, price or number of spaces.` and a **Clear search & filters** button. Toolbar says `Showing 0 activities`. | ☐ Pass ☐ Fail |
| SRC-13 | Clear search & filters | F | 1. Type `zzz`.<br>2. Click **Clear search & filters**. | The search box is empty, the teacher dropdown shows `All teachers`, the no-results panel disappears and all three lessons are shown. | ☐ Pass ☐ Fail |
| SRC-14 | Search combined with sort | F | 1. Type `0` (all three shown).<br>2. Click **Price**, then **↓ Z-A**. | Order: Computer Science, Mathematics, Music. | ☐ Pass ☐ Fail |
| SRC-15 | Search results keep live spaces | F | 1. Add Computer Science to the cart (it now has 4 spaces).<br>2. Type `4`. | Computer Science is shown with `4 of 5 spaces left`. Mathematics and Music (5 spaces each) are not shown. | ☐ Pass ☐ Fail |
| SRC-16 | Clearing the search box | F | 1. Type `music` (the clear × appears at the right end of the box).<br>2. Press **Esc** while the cursor is in the box.<br>3. Type `music` again, then click the **×** at the right end of the box. | After step 2 and again after step 3 the box is empty and all three lessons are shown (`Showing 3 activities`). Note: the × is the browser's own clear button (Chrome, Edge, Safari); a browser that does not draw one only needs steps 1-2. | ☐ Pass ☐ Fail |

## 4. Teacher filtering (TCH)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| TCH-01 | All teachers | F | Look at the teacher dropdown and the cards. | Dropdown shows `All teachers` (with its `Teacher` caption). All three lessons are shown. | ☐ Pass ☐ Fail |
| TCH-02 | Filter: Priya Shah | F | Choose `Priya Shah` in the dropdown. | Only Computer Science is shown. `Showing 1 activities`. | ☐ Pass ☐ Fail |
| TCH-03 | Filter: James Brown | F | Choose `James Brown`. | Only Music is shown. | ☐ Pass ☐ Fail |
| TCH-04 | Filter: Emma Davis | F | Choose `Emma Davis`. | Only Mathematics is shown. | ☐ Pass ☐ Fail |
| TCH-05 | Return to All teachers | F | 1. Choose `James Brown`.<br>2. Choose `All teachers`. | All three lessons are shown again. `Showing 3 activities`. | ☐ Pass ☐ Fail |
| TCH-06 | Teacher + matching search | F | 1. Choose `James Brown`.<br>2. Type `music`. | Only Music is shown. | ☐ Pass ☐ Fail |
| TCH-07 | Teacher + another matching search | F | 1. Choose `Priya Shah`.<br>2. Type `hendon`. | Only Computer Science is shown. | ☐ Pass ☐ Fail |
| TCH-08 | Search with no match for the teacher | F | 1. Choose `James Brown`.<br>2. Type `hendon`. | Hendon belongs to Priya Shah's lesson, so nothing matches: the "Nothing matches yet" panel is shown and the toolbar says `Showing 0 activities`. Also try `Priya Shah` with `music`: same result. | ☐ Pass ☐ Fail |
| TCH-09 | Clear search & filters resets both | F | 1. Choose `James Brown` and type `hendon` (no results).<br>2. Click **Clear search & filters**. | The search box is empty, the dropdown shows `All teachers` and all three lessons are shown. | ☐ Pass ☐ Fail |

## 5. Cart (CRT)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| CRT-01 | Add one lesson | F | Click **Add to cart** on Computer Science once. | Computer Science shows `4 of 5 spaces left` (four sage pills) and the badge `4 spaces`. Mathematics and Music still show 5. Header shows `Checkout (1)` and is now enabled (solid terracotta). | ☐ Pass ☐ Fail |
| CRT-02 | Add the same lesson more than once | F | Click **Add to cart** on Music three times. | Music shows `2 of 5 spaces left` and the badge `2 spaces`. Header shows `Checkout (3)`. Other lessons are unchanged. | ☐ Pass ☐ Fail |
| CRT-03 | Availability drops on every addition | F | Click **Add to cart** on Music five times, reading the Music card after each click. | After each click Music shows 4, 3, 2, 1, 0 spaces (`N of 5 spaces left`). At 1: one terracotta pill, terracotta text and the badge `Last space`. At 0: all pills grey, the text `0 of 5 spaces left`, the badge `Fully booked`, a dimmed photo and a greyed button. | ☐ Pass ☐ Fail |
| CRT-04 | Add button disables at zero | F | 1. Add Music five times.<br>2. Try clicking Music's button again.<br>3. Check the other cards' buttons. | Music's button (still labelled **Add to cart**, but grey) is disabled and does nothing when clicked: spaces stay 0 and the header stays `Checkout (5)`. Computer Science and Mathematics buttons stay enabled. | ☐ Pass ☐ Fail |
| CRT-05 | Header count updates | F | 1. Note the header button.<br>2. Add Computer Science twice, Mathematics once, Music three times, checking the header after each click. | At the start it reads `Checkout (0)` and is disabled. Each click adds 1: it ends at `Checkout (6)` and is enabled. | ☐ Pass ☐ Fail |
| CRT-06 | Grouped quantities | F | 1. Add Computer Science twice and Music once.<br>2. Click the header `Checkout (3)` button. | The checkout lists two rows only: Computer Science with `Quantity: 2` and Music with `Quantity: 1` (not three separate rows). Mathematics is not listed. Each row also shows a thumbnail photo, `location with teacher` and `Price: £x`. The checkout card is to the right. | ☐ Pass ☐ Fail |
| CRT-07 | Remove one restores one space | F | 1. Add Computer Science twice (3 spaces left).<br>2. Open checkout and click **Remove** once.<br>3. Click the header button to return to the catalogue. | After the click, Computer Science shows `Quantity: 1` (one place removed, not both) and the header reads `Checkout (1)`. Back in the catalogue Computer Science shows `4 of 5 spaces left`. | ☐ Pass ☐ Fail |
| CRT-08 | Removing the final item shows the empty cart | F | 1. Add Computer Science once.<br>2. Open checkout and click **Remove**. | The checkout card and rows are replaced by a peach circle with a bag icon, the heading `Your cart is empty`, the text `Add an activity to continue.` and a **Back to activities** button. The header reads `Checkout (0)` and is disabled. | ☐ Pass ☐ Fail |
| CRT-09 | Back to activities from the empty cart | Continue from CRT-08 | Click **Back to activities**. | The catalogue is shown with its intro and toolbar. Computer Science is back to `5 of 5 spaces left`. The header reads `Checkout (0)` and is disabled. | ☐ Pass ☐ Fail |
| CRT-10 | Header toggles views and keeps the cart | F | 1. Add Computer Science once.<br>2. Click the header button (checkout view).<br>3. Click the header button again (catalogue).<br>4. Click it a third time. | Step 2 shows the checkout and the header button has a pale ring around it. Step 3 returns to the catalogue (ring gone) showing Computer Science with 4 spaces. Step 4 shows the checkout again with Computer Science `Quantity: 1`. | ☐ Pass ☐ Fail |

## 6. Totals (TOT)

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| TOT-01 | Subtotal = price × quantity | F | 1. Add Computer Science twice, Music three times, Mathematics twice.<br>2. Open checkout and read each row. | Computer Science `Quantity: 2` → `Subtotal: £200`. Music `Quantity: 3` → `Subtotal: £240`. Mathematics `Quantity: 2` → `Subtotal: £180`. (The word `Subtotal:` is a small caption above the amount on the right of the row.) | ☐ Pass ☐ Fail |
| TOT-02 | Total combines different lessons | F | 1. Add Computer Science once, Music twice, Mathematics once.<br>2. Open checkout. | Subtotals £100, £160 and £90. The checkout card shows `Total:` on the left and `£350` large on the right. | ☐ Pass ☐ Fail |
| TOT-03 | Total decreases on removal | Continue from TOT-02 | Click **Remove** on Music once. Then **Remove** on Computer Science. Then **Remove** on Mathematics. Read the total after each click. | After removing one Music: `Total: £270` (Music `Quantity: 1`). After removing Computer Science: `Total: £170` (its row disappears). After removing Mathematics: `Total: £80`. | ☐ Pass ☐ Fail |
| TOT-04 | Place order button shows the same total | F | 1. Add Computer Science once, Music twice, Mathematics once and open checkout.<br>2. Compare `Total:` with the button text.<br>3. Click **Remove** on Music once and compare again. | Step 2: `Total: £350` and the button reads `Place order · £350`. Step 3: `Total: £270` and `Place order · £270`. The two always match. | ☐ Pass ☐ Fail |
| TOT-05 | Total updates after adding more | F | 1. Add Computer Science once and open checkout (total £100).<br>2. Return to the catalogue and add Music once.<br>3. Open checkout again. | First `Total: £100`, then `Total: £180` with the button reading `Place order · £180`. | ☐ Pass ☐ Fail |

## 7. Checkout validation (VAL)

Unless stated otherwise, type into **Full name** and **Phone number** in the checkout card, and check whether **Place order** is enabled or disabled. Under each field is a fixed hint ("Letters and spaces only", "Digits only"); there are no error messages. The fields change their look as you type (see VAL-16 and VAL-17).

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| VAL-01 | Blank form | S-FORM | Leave both fields empty. Read the button and the fields. | The fields show the placeholders `e.g. Amelia Hart` and `e.g. 07123456789` and look neutral (no coloured border or icon). `Place order · £100` is disabled (pale, greyed out) and clicking it does nothing. Under the button: `Add a valid name and phone number to place your order.` | ☐ Pass ☐ Fail |
| VAL-02 | Valid name only | S-FORM | Name `Amelia Hart`, phone left empty. | Button stays disabled. | ☐ Pass ☐ Fail |
| VAL-03 | Valid name, letters only | S-FORM | Name `Amelia` (no space), phone `07123456789`. | Button is enabled. | ☐ Pass ☐ Fail |
| VAL-04 | Name containing numbers | S-FORM | Name `Amelia2`, phone `07123456789`. | Button is disabled. | ☐ Pass ☐ Fail |
| VAL-05 | Name containing symbols | S-FORM | Phone `07123456789`. Try each name in turn: `Amelia!`, `Amelia@Hart`. | Button is disabled for each. | ☐ Pass ☐ Fail |
| VAL-06 | Valid phone only | S-FORM | Phone `07123456789`, name left empty. | Button stays disabled. | ☐ Pass ☐ Fail |
| VAL-07 | Phone containing letters | S-FORM | Name `Amelia Hart`. Try each phone in turn: `07abc456789`, `abcdefghijk`. | Button is disabled for each. | ☐ Pass ☐ Fail |
| VAL-08 | Phone containing spaces | S-FORM | Name `Amelia Hart`, phone `0712 345 6789`. | Button is disabled. | ☐ Pass ☐ Fail |
| VAL-09 | Phone containing symbols | S-FORM | Name `Amelia Hart`. Try each phone in turn: `+447123456789`, `07123-456789`. | Button is disabled for each. | ☐ Pass ☐ Fail |
| VAL-10 | Both fields valid | S-FORM | Name `Amelia Hart`, phone `07123456789`. | Button is enabled (solid terracotta) and reads `Place order · £100`. The line under the button is gone. | ☐ Pass ☐ Fail |
| VAL-11 | Valid then invalid | Continue from VAL-10 | 1. Change the phone to `07123x`.<br>2. Change it back to `07123456789`.<br>3. Change the name to `Amelia2`. | Step 1: button disabled. Step 2: enabled. Step 3: disabled. | ☐ Pass ☐ Fail |
| VAL-12 | Emptying a valid field | Continue from VAL-10 | Delete all text from the name field, then retype `Amelia Hart`. Repeat with the phone field. | Button is disabled while either field is empty and enabled again when both are valid. | ☐ Pass ☐ Fail |
| VAL-13 | Enter key cannot bypass validation (manual check) | S-FORM | 1. Type `Amelia2` in Full name and `07123456789` in Phone.<br>2. Press Enter while the cursor is in a field. | Nothing happens: the form is not submitted, the checkout stays on screen and no "Order confirmed" appears (browsers do not submit a form whose submit button is disabled). | ☐ Pass ☐ Fail |
| VAL-14 | Spaces-only name rejected | S-FORM | 1. Type three spaces in Full name and `07123456789` in Phone.<br>2. Replace the name with a single space.<br>3. Clear the name field completely. | **Place order** stays disabled in all three cases. | ☐ Pass ☐ Fail |
| VAL-15 | Spaces around a valid name are allowed | S-FORM | 1. Type `   Amelia Hart` (leading spaces) and `07123456789`.<br>2. Change the name to `Amelia Hart   ` (trailing spaces).<br>3. Click **Place order · £100**. | Steps 1 and 2: **Place order** is enabled. Step 3: `Order confirmed` is shown. Names with a digit or symbol (for example `  Amelia2  `) still keep the button disabled. | ☐ Pass ☐ Fail |
| VAL-16 | Valid field appearance | S-FORM | 1. Type `Amelia Hart` in Full name.<br>2. Type `07123456789` in Phone number. | Each field that passes gets a sage-green border with a soft green ring and a tick at its right end. The hint under it turns green and reads `Letters and spaces only · Looks good` / `Digits only · Looks good`. | ☐ Pass ☐ Fail |
| VAL-17 | Invalid field appearance | S-FORM | 1. Type `Amelia 2` in Full name.<br>2. Type `07123 456` in Phone number. | Each field with text that fails gets a terracotta border with a soft ring and an alert (!) icon at its right end. The hint under it turns dark terracotta and keeps its normal wording (`Letters and spaces only`, `Digits only`) with no "Looks good". An empty field never shows the invalid look. | ☐ Pass ☐ Fail |
| VAL-18 | Disabled-button hint | S-FORM | 1. Look under **Place order** with both fields empty.<br>2. Type a valid name only.<br>3. Type a valid phone as well.<br>4. Change the phone to `12ab`. | The line `Add a valid name and phone number to place your order.` shows in steps 1 and 2, disappears in step 3 (button enabled) and reappears in step 4. | ☐ Pass ☐ Fail |

## 8. Successful checkout (SUC)

Setup for this section (**S-SUBMIT**): from a fresh load add Computer Science twice and Music once, open checkout (`Total: £280`), enter Full name `Amelia Hart` and Phone `07123456789`. Do not press **Place order** yet.

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| SUC-01 | Submitting does not reload the page | S-SUBMIT | 1. Note the address bar URL. Optional: open the browser console (F12) and run `window.reloadMarker = 1`.<br>2. Click **Place order · £280**. | The page does not reload or flash. The address bar is unchanged (no `?name=` or similar query added). If the marker was set, `window.reloadMarker` still returns `1`. | ☐ Pass ☐ Fail |
| SUC-02 | Success view replaces the checkout | S-SUBMIT | Click **Place order · £280**. | The page shows a green tick badge, the heading `Order confirmed`, the text `Thanks, Amelia Hart. Your activities have been booked successfully.`, a **Return to activities** button and an `Order summary` card. The checkout card, fields and cart rows are no longer shown. | ☐ Pass ☐ Fail |
| SUC-03 | Cart becomes empty | S-SUBMIT | Click **Place order · £280** and read the header. | The header reads `Checkout (0)` and is disabled. | ☐ Pass ☐ Fail |
| SUC-04 | Name and phone are cleared | S-SUBMIT | 1. Click **Place order · £280**, then **Return to activities**.<br>2. Add Mathematics once and open checkout. | Both **Full name** and **Phone number** are empty (showing their placeholders) and **Place order · £90** is disabled. | ☐ Pass ☐ Fail |
| SUC-05 | Availability stays reduced | S-SUBMIT | Click **Place order · £280**, then **Return to activities**. Read the spaces. | Computer Science `3 of 5 spaces left`, Music `4 of 5 spaces left`, Mathematics `5 of 5 spaces left`. | ☐ Pass ☐ Fail |
| SUC-06 | Enrolled count increases | S-SUBMIT | Click **Place order · £280**, then **Return to activities**. Read the enrolled counts. | Computer Science `2 enrolled`, Music `1 enrolled`, Mathematics `0 enrolled`. | ☐ Pass ☐ Fail |
| SUC-07 | Return to activities | S-SUBMIT | Click **Place order · £280**, then click **Return to activities**. | The catalogue is shown with the intro, toolbar and `Showing 3 activities`. The header reads `Checkout (0)` and is disabled. | ☐ Pass ☐ Fail |
| SUC-08 | Header button cannot leave the success view | S-SUBMIT | Click **Place order · £280**. Then try to click the header `Checkout (0)` button. | The header button is disabled and does nothing: `Order confirmed` stays on screen. **Return to activities** is the only way out. | ☐ Pass ☐ Fail |
| SUC-09 | Order summary contents | S-SUBMIT | Click **Place order · £280** and read the `Order summary` card. | Two entries, in this order: **Computer Science** / `Hendon with Priya Shah` / `£100 × 2` / `Subtotal: £200`, then **Music** / `Camden with James Brown` / `£80 × 1` / `Subtotal: £80`. Mathematics is not listed. At the bottom, `Total:` on the left and `£280` large on the right. | ☐ Pass ☐ Fail |
| SUC-10 | No order reference is shown | S-SUBMIT | Click **Place order · £280** and look at the heading row of the `Order summary` card. | Only the heading `Order summary` is there. There is no order reference or code on its right (the reference will be added when the backend exists). | ☐ Pass ☐ Fail |

## 9. Multiple orders (MUL)

These tests run in order on one page without reloading.

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| MUL-01 | Complete the first order | F | 1. Add Computer Science twice and Music once.<br>2. Open checkout, enter `Amelia Hart` / `07123456789`.<br>3. Click **Place order · £280**.<br>4. Click **Return to activities**. | `Order confirmed` ("Thanks, Amelia Hart. …") is shown, then the catalogue. Spaces: Computer Science 3, Mathematics 5, Music 4. Enrolled: Computer Science 2, Mathematics 0, Music 1. | ☐ Pass ☐ Fail |
| MUL-02 | Start a second order | Continue from MUL-01 (no reload) | 1. Add Computer Science once and Mathematics three times.<br>2. Click the header `Checkout (4)` button. | The page shows the checkout (card with the `Checkout` heading), **not** `Order confirmed`. Full name and Phone are empty. Rows: Computer Science `Quantity: 1` (£100), Mathematics `Quantity: 3` (£270). `Total: £370` (only this order, not including order 1) and `Place order · £370` is disabled. | ☐ Pass ☐ Fail |
| MUL-03 | Complete the second order | Continue from MUL-02 | 1. Enter `Tom Lee` / `07987654321`.<br>2. Click **Place order · £370**.<br>3. Read the confirmation, then click **Return to activities**. | The confirmation says `Thanks, Tom Lee.` and its `Order summary` lists only this order: Computer Science `£100 × 1` (`Subtotal: £100`) and Mathematics `£90 × 3` (`Subtotal: £270`), `Total: £370`. Nothing from the first order appears. After returning, spaces are Computer Science 2, Mathematics 2, Music 4 and the header reads `Checkout (0)`, disabled. | ☐ Pass ☐ Fail |
| MUL-04 | Enrolled counts accumulate | Continue from MUL-03 | Read the enrolled count on each card. | Computer Science `3 enrolled` (2 + 1), Mathematics `3 enrolled` (0 + 3), Music `1 enrolled` (unchanged). | ☐ Pass ☐ Fail |

## 10. Regression checks (REG)

Run these after **S-ORDER1** (one completed order). State after S-ORDER1: Computer Science 3 spaces / 2 enrolled, Mathematics 5 spaces / 0 enrolled, Music 4 spaces / 1 enrolled. Reload and repeat S-ORDER1 before each test unless it says it continues.

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| REG-01 | Sorting by subject and price after an order | S-ORDER1 | 1. Subject, **↓ Z-A**.<br>2. Subject, **↑ A-Z**.<br>3. Price, **↓ Z-A**.<br>4. Price, **↑ A-Z**. | 1: Music, Mathematics, Computer Science. 2: Computer Science, Mathematics, Music. 3: Computer Science, Mathematics, Music. 4: Music, Mathematics, Computer Science. | ☐ Pass ☐ Fail |
| REG-02 | Sorting by spaces after an order | S-ORDER1 | 1. Spaces, **↑ A-Z**.<br>2. Spaces, **↓ Z-A**. | 1: Computer Science (3), Music (4), Mathematics (5). 2: Mathematics (5), Music (4), Computer Science (3). | ☐ Pass ☐ Fail |
| REG-03 | Search by text after an order | S-ORDER1 | Type `music`. | Only Music is shown, with `4 of 5 spaces left` and `1 enrolled`. | ☐ Pass ☐ Fail |
| REG-04 | Search by spaces after an order | S-ORDER1 | Type `3`, then `4`, then `5`, then `2` (clearing between). | `3`: only Computer Science. `4`: only Music. `5`: only Mathematics. `2`: no-results state. | ☐ Pass ☐ Fail |
| REG-05 | No-results and clear after an order | S-ORDER1 | 1. Type `zzz`.<br>2. Click **Clear search & filters**. | No-results state, then all three lessons return with their post-order spaces and enrolled counts. | ☐ Pass ☐ Fail |
| REG-06 | Teacher filtering after an order | S-ORDER1 | Choose each teacher in turn, then `All teachers`. | `Priya Shah`: only Computer Science (`2 enrolled`, `3 of 5 spaces left`). `James Brown`: only Music (`1 enrolled`, `4 of 5 spaces left`). `Emma Davis`: only Mathematics (`0 enrolled`, `5 of 5 spaces left`). `All teachers`: all three. | ☐ Pass ☐ Fail |
| REG-07 | Teacher + search after an order | S-ORDER1 | 1. Choose `Priya Shah` and type `3`.<br>2. Change the search to `music`. | 1: only Computer Science. 2: no-results state. | ☐ Pass ☐ Fail |
| REG-08 | Cart can be used again | S-ORDER1 | 1. Add Mathematics once.<br>2. Click the header `Checkout (1)` button. | The header was disabled before the add and is enabled after. The checkout is shown (not `Order confirmed`), both fields are empty, `Total: £90`, and `Place order · £90` is disabled until valid details are entered. | ☐ Pass ☐ Fail |
| REG-09 | Remove after an order restores only the new place | S-ORDER1 | 1. Add Computer Science once (now 2 spaces).<br>2. Open checkout and click **Remove**.<br>3. Click **Back to activities**. | Step 2 shows `Your cart is empty`. In the catalogue Computer Science shows `3 of 5 spaces left` (not 5) and still `2 enrolled`. | ☐ Pass ☐ Fail |
| REG-10 | Second order after reusing the cart | Continue from REG-08 | 1. Enter `Amelia Hart` / `07123456789` and click **Place order · £90**.<br>2. Click **Return to activities**. | `Order confirmed` is shown (summary: Mathematics `£90 × 1`, `Total: £90`). Mathematics now shows `4 of 5 spaces left` and `1 enrolled`; Computer Science and Music are unchanged. | ☐ Pass ☐ Fail |

## 11. Observations of current behaviour (OBS)

These record behaviour that may surprise a user. They are **not** assumed to be defects: tick `Pass` if the page behaves as written here, then decide separately whether you want to keep it.

| Test ID | Feature | Preconditions | Steps | Expected result (current behaviour) | Pass/Fail |
|---|---|---|---|---|---|
| OBS-01 | Pound sign in search | F | Type `£100`. | No lessons match: the "Nothing matches yet" state is shown. Price search matches the digits only (`100` works, `£100` does not). | ☐ Pass ☐ Fail |
| OBS-02 | Teacher names are not searched | F | Type `Priya`. | No lessons match. Teachers can only be filtered with the dropdown. | ☐ Pass ☐ Fail |
| OBS-03 | Spaces in the search box are not trimmed | F | 1. Type a single space.<br>2. Clear it and type `music ` (with a trailing space). | A single space shows only Computer Science (its name contains a space). `music ` shows no results. | ☐ Pass ☐ Fail |
| OBS-04 | No phone length check | S-FORM | Name `Amelia Hart`, phone `1`. | **Place order** is enabled. Any number of digits is accepted. | ☐ Pass ☐ Fail |
| OBS-05 | Hyphens, apostrophes and accents in names | S-FORM | Phone `07123456789`. Try names `Mary-Jane`, `O'Neil`, `José` in turn. | **Place order** is disabled for each, because only the letters A-Z/a-z and spaces are allowed. | ☐ Pass ☐ Fail |
| OBS-06 | Singular wording of the result count | F | Type `music`. Read the toolbar. | The toolbar reads `Showing 1 activities` (plural wording is used for one result). | ☐ Pass ☐ Fail |
| OBS-07 | Filters do not affect the checkout view | F | 1. Add Computer Science once.<br>2. Type `music` in the search box (only Music is shown).<br>3. Click the header `Checkout (1)` button.<br>4. Click the header button again. | Step 3: the checkout still lists Computer Science. Step 4: the catalogue is back and the search box still contains `music`, so only Music is shown. | ☐ Pass ☐ Fail |
| OBS-08 | Sorting equal spaces | F | 1. Click **Price**, **↓ Z-A** (Computer Science, Mathematics, Music).<br>2. Click **Spaces**, then **↑ A-Z**. | All three lessons have 5 spaces, so there is nothing to sort by: the previous order (Computer Science, Mathematics, Music) is kept. | ☐ Pass ☐ Fail |
| OBS-09 | Sold-out button label | F | Add Music five times and read Music's button. | The button is grey and disabled but still reads `Add to cart`. The sold-out state is shown by the `Fully booked` badge, the grey meter and the dimmed photo, not by the button text. | ☐ Pass ☐ Fail |

## 12. Presentation and responsive layout (PRE)

Visual checks of the final styling. Set the window or device-toolbar width as stated. In every case nothing should overlap, be cut off, or need sideways scrolling.

| Test ID | Feature | Preconditions | Steps | Expected result | Pass/Fail |
|---|---|---|---|---|---|
| PRE-01 | Sticky header | F, window made short (or browser zoom 200%) so the page scrolls | Scroll down the catalogue, then back up. | The header (brand, search, cart button) stays pinned at the top while the content scrolls beneath it. | ☐ Pass ☐ Fail |
| PRE-02 | Desktop catalogue layout (about 1280px wide) | F | Look at the whole page. | Header in one row: brand on the left, a wide search box (about 560px) next to the cart button on the right. The intro heading is on the left (three lines) with its description to the right. The toolbar is one rounded bar on a single line: Sort by, Order, a thin divider, Teacher, with `Showing 3 activities` at the far right. The three cards sit in one row (a four-column grid, so there is a free slot on the right), each with the photo on top and **Add to cart** at the bottom. | ☐ Pass ☐ Fail |
| PRE-03 | Tablet catalogue layout (about 834px wide) | F | Look at the page at this width. | Header still one row (brand, search, cart button). The intro heading is smaller. In the toolbar the Teacher control wraps to a second line and the result count stays at the right of that line. Cards are two per row. | ☐ Pass ☐ Fail |
| PRE-04 | Phone catalogue layout (about 390px wide) | F | Look at the page at this width. | Header: brand and cart button on the first row, search box full-width on its own row below; the tagline is hidden. The toolbar is stacked: the Sort by control full width, the Order control full width, then the Teacher dropdown, then the count. Cards are one per row and horizontal: a square photo on the left; subject and price, location, teacher and enrolled count beside it; underneath, the five pills with `N left` and a compact **Add to cart** button on the right. There is no photo badge. | ☐ Pass ☐ Fail |
| PRE-05 | Very small phone (320px wide) | F | Look at the page at this width, then add one lesson. | Same layout as PRE-04. The cart button shows just the text `Checkout (n)` (no bag icon) and still sits on the first row beside the brand. Subject and price do not touch each other. No sideways scrolling. | ☐ Pass ☐ Fail |
| PRE-06 | Desktop checkout layout (about 1280px wide) | F | 1. Add Computer Science, Music and Mathematics once each.<br>2. Open checkout and look at it. | Cart rows (thumbnail, details, subtotal at the right, **Remove** with a bin icon) fill the left column. The checkout card (heading `Checkout`, total, fields, **Place order**) is on the right, level with the first row. The header cart button has its pale ring. | ☐ Pass ☐ Fail |
| PRE-07 | Tablet and phone checkout layout (834px, then 390px) | Same cart as PRE-06, checkout open | Look at the checkout at each width. | Below 900px the checkout card moves under the rows, full width. At 390px each row is compact: a small square thumbnail, the subject with the subtotal at the top right, location/teacher and price beside the thumbnail, and the `Quantity` pill and **Remove** on the last line. The card's fields and **Place order** fill the width. | ☐ Pass ☐ Fail |
| PRE-08 | Order confirmation layout | S-SUBMIT then click **Place order · £280** (check at about 1280px, then 390px) | Look at the confirmation at each width. | At 1280px: tick badge, heading, message and **Return to activities** on the left; the `Order summary` card on the right. At 390px the summary card stacks under the message. Amounts are right-aligned in the card. | ☐ Pass ☐ Fail |
| PRE-09 | Empty cart layout | Add one lesson, open checkout, click **Remove** (check at about 1000px, then 390px) | Look at the empty-cart view at each width. | At 1000px: the peach circle with a bag icon and a small green circle on the left; heading, text and **Back to activities** to its right. At 390px the picture sits above the text. | ☐ Pass ☐ Fail |
| PRE-10 | No-results layout | F, type `zzz` (check at about 1280px, then 390px) | Look at the panel at each width. | At 1280px: the green magnifier circle on the left, heading, text and **Clear search & filters** to its right. At 390px they stack with the circle first. | ☐ Pass ☐ Fail |
| PRE-11 | Keyboard focus | F | Press **Tab** repeatedly from the top of the page, then use **Enter** or **Space** on a focused button. | Focus moves in a sensible order: search box, the Sort by buttons, the Order buttons, the teacher dropdown, then each **Add to cart** button (the disabled header button is skipped). The focused control always shows a clear terracotta outline. Enter or Space activates a focused button. | ☐ Pass ☐ Fail |
| PRE-12 | Hover and disabled appearance | F, some items in the cart | 1. Hover **Add to cart** and a Sort by button.<br>2. Hover the disabled header button on an empty cart (reload) and a sold-out Add button (add Music five times). | Hovering **Add to cart** darkens the terracotta; hovering an unselected sort button gives it a light tint. Disabled buttons do not change on hover and show the "not allowed" cursor; the sold-out button's grey label is still readable. | ☐ Pass ☐ Fail |
| PRE-13 | No sideways scrolling | F, then the checkout and the confirmation | At widths 320px, 390px, 834px and 1280px, view the catalogue, the checkout (with a few lessons) and the confirmation. | No horizontal scroll bar appears and no content is cut off at any of these widths in any of the three views. | ☐ Pass ☐ Fail |

---

## Failure log

| Test ID | What happened (actual result) | Browser | Date | Fixed? |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
