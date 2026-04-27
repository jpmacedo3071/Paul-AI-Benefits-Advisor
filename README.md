# Paul Host Page — import into the GitHub repo

This folder is the redesigned host page that wraps the existing Paul chat widget. All paths are already flattened (no `../../`), so it will run as-is once dropped into the repo.

## What's in here

```
paul-host-page/
├── index.html              ← the page
├── colors_and_type.css     ← design tokens + fonts
├── Header.jsx
├── Hero.jsx
├── TrustStrip.jsx
├── ChatWidget.jsx          ← visual placeholder only — real widget stays owned by the repo
├── FAQ.jsx
├── Footer.jsx
├── README.md
└── assets/
    └── logo-advicehr-full.png
```

## Import into `jpmacedo3071/Paul-AI-Benefits-Advisor`

**Quickest path — web UI upload (no git needed):**
1. Download this folder as a ZIP (use the download card in the chat).
2. Unzip locally.
3. Open the repo on github.com → **Add file → Upload files**.
4. Drag the whole `paul-host-page/` folder in → commit to a new branch, e.g. `redesign/host-page` → open a PR.

**Git CLI:**
```bash
git clone https://github.com/jpmacedo3071/Paul-AI-Benefits-Advisor.git
cd Paul-AI-Benefits-Advisor
git checkout -b redesign/host-page
# copy the unzipped paul-host-page/ folder into the repo root
git add paul-host-page
git commit -m "Add redesigned host page"
git push -u origin redesign/host-page
# then open a PR on github.com
```

**GitHub Desktop:** clone the repo, drop the unzipped folder into the working directory, commit to a new branch, push, open PR.

## Wiring it into the live site

The real chat widget **must not** be touched. When replacing the current `index.html` on `benefitscoach.advicehr.net`:

1. Use the new `index.html` + JSX + CSS from this folder for everything **except** the widget.
2. In `index.html`, find `<ChatWidget />` inside the `App()` component and replace it with the live widget script/embed you use today.
3. Remove `ChatWidget.jsx` and its `<script src="ChatWidget.jsx?v=2">` tag from `index.html` — it's only there so this page renders standalone for review.

## Notes
- The page is plain HTML + in-browser Babel. No build step.
- Fonts load from Google Fonts (DM Sans + DM Serif Display). If you host them, swap the `<link>` in `colors_and_type.css`.
- The calendar booking link points to your Outlook Bookings page — update if it ever changes.
