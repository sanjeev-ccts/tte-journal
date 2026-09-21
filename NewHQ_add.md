# Adding a New HQ to the Roster System

*A plain-English guide for whoever manages the TTE LOGS repo — no coding
knowledge needed, just careful editing.*

---

## What this document is for

Your app supports multiple railway headquarters (HQs) — currently BSB and
PYGS. When you want to add another one (LKO, CNB, PRG, etc.), you do it by
following the three edits described below. No new files need to be created,
no code needs to be written from scratch. You are simply telling the
existing system about the new HQ's data.

Total time: about 20–30 minutes, most of which is typing in the data.

---

## What you need before starting

Gather these six things about the new HQ. If some aren't ready, you can
enter placeholders and fill them in later using the app's built-in Admin
panel.

1.  **Teams** — the list of teams at that HQ and the four members of each
    team. Example for PYGS: Team A has COR, TTE-1, TTE-2, TTE-3 — four
    named people per team, eight teams total.

2.  **Link Programme** — the rotation schedule. Every team runs a weekly
    pattern, and each of the four members has their own row. This is the
    largest piece of data.

3.  **Train Schedule** — for every train number mentioned in the Link
    Programme: where it starts, where it ends, departure time, arrival
    time, and whether it arrives the next day.

4.  **Anchor Date** — one specific Wednesday that becomes "week zero" of
    the rotation. Every later week counts forward from this date.

5.  **Home Stations** — the stations that count as "back home" for this
    HQ's crew. For PYGS it's PYGS and PRYJ. For LKO it would be LKO, and
    so on.

6.  **HQ Code** — the short name used everywhere (BSB, PYGS, LKO). Must be
    uppercase, no spaces.

---

## The three edits

You will edit exactly three things:

- **Edit 1:** Add a data block to `OtherHQ.html`
- **Edit 2:** Add one line to `OtherHQ.html`
- **Edit 3:** Add one line to `index.html`

That's it. Nothing else needs touching.

---

## Edit 1 — Add the new HQ's data block

**Open the file:** `OtherHQ.html`

**Find this line** (use your editor's search function — the magnifying
glass icon):

    const PYGS_DATA = {

This marks the start of the existing PYGS data. You are going to add a
copy of this block for your new HQ, placed **above** the PYGS block.

**Copy the entire PYGS block** — it starts at `const PYGS_DATA = {` and
ends with a closing `};` several hundred lines later. Don't worry about
understanding it — just copy it whole.

**Paste it above**, then change four things:

### Change 1 — The block's name

The line that said `const PYGS_DATA = {` becomes:

    const LKO_DATA = {

Replace `LKO` with your new HQ's code. **Important:** the code must match
the code you will use in Edit 3, and must be uppercase.

### Change 2 — The config section

Near the top of the copied block, you'll see:

    config: {
        hqCode: "PYGS",
        displayName: "PYGS",
        homeStations: ["PYGS", "PRYJ"],
        ...
        teamLetters: ["A","B","C","D","E","F","G","H"],
        ...

Change **hqCode** and **displayName** to your new HQ's code. Change
**homeStations** to the new HQ's home stations. If the new HQ has a
different number of teams (say 10 instead of 8), extend the teamLetters
list accordingly — `["A","B","C","D","E","F","G","H","I","J"]`.

### Change 3 — The team names

Further down, you'll see a section starting with:

    teamMaster: {
        A: { cor: "Laiq Ahmed", tte1: "...", tte2: "...", tte3: "..." },
        B: { ... },
        ...

Replace each name with the actual people from your new HQ. If a team has
only three members (no TTE-3), leave that field as an empty pair of quotes
`""`.

### Change 4 — The programme, schedule, and anchor

Similarly, replace every value in the `linkProgramme` section, the
`trainSchedule` section, and the `anchorDate` line with the new HQ's
actual data.

**If you don't have all this data ready**, leave the fields empty
(`""` for text, or omit whole rows) and fill them in later through the
app's Admin panel — see "Filling in data later" below.

---

## Edit 2 — Register the new HQ inside OtherHQ.html

**Still in `OtherHQ.html`**, find this line:

    function getDefaultsForHQ(hq) { return hq === 'PYGS' ? PYGS_DATA : null; }

**Replace it with:**

    function getDefaultsForHQ(hq) {
        if (hq === 'PYGS') return PYGS_DATA;
        if (hq === 'LKO')  return LKO_DATA;
        return null;
    }

(If you have already added other HQs before this one, just insert your
new line — e.g. `if (hq === 'CNB') return CNB_DATA;` — before the
`return null;` line. Do not remove existing lines.)

That is the only place in this file that needs updating. Everything else
is driven by the HQ code that comes from the URL.

---

## Edit 3 — Register the new HQ inside index.html

**Open the file:** `index.html`

**Find this block:**

    window.rosterHqFileMap = {
        'BSB':  'roster.html',
        'PYGS': 'OtherHQ.html?hq=PYGS'
    };

**Add a line for your new HQ**, keeping the same pattern:

    window.rosterHqFileMap = {
        'BSB':  'roster.html',
        'PYGS': 'OtherHQ.html?hq=PYGS',
        'LKO':  'OtherHQ.html?hq=LKO'
    };

Note the subtle difference: BSB points to its own separate file
(`roster.html`), but every other HQ — PYGS, LKO, and any future one —
points to the same shared file (`OtherHQ.html`) with the HQ code appended
as `?hq=XXXX`.

Make sure every HQ line except the last ends with a comma.

---

## Saving and uploading

For each file you edited:

1. Save the file in your editor.
2. Upload it to GitHub (open the file in GitHub, tap the pencil icon,
   select all, delete, paste your new version, commit).
3. Wait about one minute for GitHub Pages to publish the change.

If you edited both files, do them one after the other — order doesn't
matter.

---

## Testing the new HQ

After the upload is live:

1. In the main app, go to **Profile**, change the HQ field to your new
   HQ's code (e.g. `LKO`), and save.
2. Go back to the Dashboard. The roster card's sub-label should now read
   **"Roster for LKO"**.
3. Tap the Roster card. The page opens, titled **"LKO Duty Roster"**.
4. If you are the admin, tap the **Admin** tab. All six cards should be
   present.
5. On first admin load, if the seed data block was filled in, the app
   will automatically create the Firebase node for the new HQ. You'll see
   a small "Created LKO data" message at the bottom.
6. Back in **My Duty**, pick a Team and Position, tap Save. The calendar
   should render.

If anything is missing — for example the Admin panel shows blank tables
— the seed data block either wasn't filled in or wasn't saved properly.
You can still fill it in manually through the Admin panel.

---

## Filling in data later through the Admin panel

If you left fields blank in Edit 1, you can complete them from within
the app:

1. Open the Roster page for that HQ.
2. Tap the **Admin** tab.
3. Tap **Edit Teams** — a table opens. Click into each cell, type the
   name, tap Save.
4. Tap **Link Programme** — same idea; 32 rows of 14 cells each.
5. Tap **Train Schedule** — you can add new trains by tapping the
   **+ Add Row** button at the bottom and filling in the fields.
6. Tap **Anchor Date** — set the Wednesday that starts the rotation.

Changes made through the Admin panel are stored in the cloud immediately
and are picked up by every user of that HQ within seconds.

---

## What not to touch

You do **not** need to edit any of these files when adding an HQ:

- `roster.html` — BSB-only; frozen. Leave it alone.
- `roster-core.js` — shared logic; works for every HQ automatically.
- `roster-bridge.js` — already HQ-aware; works for every HQ automatically.
- `service-worker.js` — no new files to cache.
- Firebase Rules — the existing wildcard rule covers any HQ.

Every new HQ reuses the same machinery.

---

## If something goes wrong

**The app stops loading entirely.**
You probably deleted a closing brace (`}`) or a comma while editing.
Compare your edited section against the original and look for something
that ends too early. Every opening `{` must have a matching `}`.

**The roster card is visible but tapping it does nothing.**
The line you added to `rosterHqFileMap` in `index.html` probably has a
typo. Check that the HQ code matches exactly — same case, no extra
spaces.

**The Admin panel opens but the tables are empty.**
The seed data block in `OtherHQ.html` is either missing values or not
properly filled in. Either fix it in the file, or enter the data through
the Admin panel itself.

**The calendar shows dates but no trains.**
The Link Programme for that HQ hasn't been entered yet, or the Anchor
Date hasn't been set. Both are editable through the Admin panel.

**The Quick Add modal is blank.**
The Train Schedule for that HQ is missing some trains that appear in the
programme. Add them via Admin → Train Schedule.

---

## Two rotation types — weekly vs daily

Not every HQ rotates its programme the same way. There are two patterns in
use. They are genuinely different systems, not just different data.

### Weekly rotation (example: PYGS)

Every Wednesday, every team moves forward one position in a cycle. If Team
A ran a certain programme last week, this week Team B runs that same
programme, and Team A runs what Team C ran last week, and so on. After as
many weeks as there are teams, it cycles back to the start.

- The whole week's programme stays the same for a team
- It changes only on Wednesdays
- Team letters (A–H) identify teams
- Each team has up to four TTE members, and each member has their own
  programme row

### Daily rotation (example: BSB)

Every day, every team's programme number advances by one. If Team 9 ran
Programme 9 yesterday, it runs Programme 10 today, Programme 11 tomorrow,
and so on. After a fixed number of days (43 for BSB) the cycle repeats.

- Each team's programme changes every single day
- Teams are identified by number (1–43 for BSB)
- Each team has a **Base Programme** number — the programme they run on
  the anchor date. Every day after that, their effective programme is
  Base + days elapsed, wrapped around the cycle length.
- All members of a team share the same daily programme

---

### How to tell which rotation your HQ uses

Ask someone who knows that HQ's working — or check the roster document
itself. The tell-tale signs:

- **Weekly rotation** looks like a grid of weekly patterns with team
  letters or names in the left column
- **Daily rotation** looks like a numbered list where every team has the
  same daily programme number or the same sequence advancing by day

If you are unsure, ask first. It's a two-minute question that saves a day
of confusion.

---

### Adding a weekly-rotation HQ

Follow the three edits described earlier in this document exactly as
written. Set `rotationType: "weekly"` in the new data block (or omit it —
weekly is the default).

---

### Adding a daily-rotation HQ

The same three edits apply, with four additional settings inside the new
data block:

1. **`rotationType: "daily"`** — tells the app to use the daily model.

2. **`rotationCount: N`** — the length of the cycle. For BSB's model,
   N = 43. Every `N` days, each team's programme number wraps back to
   where it started.

3. **A `baseProg` field on every team** in the `teamMaster` section. This
   is the programme number that team runs on the anchor date. Example:


---

## Summary

For every new HQ:

1. Copy the PYGS data block in `OtherHQ.html`, rename it, fill in values.
2. Add one line to `getDefaultsForHQ` in the same file.
3. Add one line to `rosterHqFileMap` in `index.html`.

Upload both files. Test as a user with the new HQ set in their profile.
Done.