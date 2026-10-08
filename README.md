# Study Timer

A small study tracker for exam season, in a single HTML file.

- **Exams:** countdowns to each exam, with progress on its courses and labs.
- **Focus timer:** start, reset or skip focus sessions.
- **Study log:** time per day, time per subject, and progress per exam.
- **Export / Import:** save all your data to a `.json` file and load it elsewhere.

## Using it

Open `index.html` in a browser. That's it. Your data stays in that browser and nothing is
sent anywhere.

## Putting it online

The app can also run as a website with accounts, so your data follows you across devices and
works offline on phones. It uses Firebase for accounts and the database, and Netlify for
hosting. See [SETUP.md](SETUP.md) for the step-by-step guide.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `SETUP.md` | How to put it online |
| `firestore.rules` | Database rules: each person can only read and write their own data |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icon.svg` | Lets phones install it like an app |
| `_headers` | Netlify response headers |
