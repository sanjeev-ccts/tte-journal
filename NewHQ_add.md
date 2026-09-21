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

## A note about other HQ types

The pattern described here works for HQs that follow the same general
shape as PYGS — teams rotate weekly, each team has up to four members,
duties follow a repeating weekly pattern.

If a future HQ has a genuinely different structure (different number of
days in the rotation, teams that don't rotate, or members who don't all
follow the same shape), it may need its own separate file rather than
reusing `OtherHQ.html`. Consult whoever built the app if that situation
arises.

---

## Summary

For every new HQ:

1. Copy the PYGS data block in `OtherHQ.html`, rename it, fill in values.
2. Add one line to `getDefaultsForHQ` in the same file.
3. Add one line to `rosterHqFileMap` in `index.html`.

Upload both files. Test as a user with the new HQ set in their profile.
Done.