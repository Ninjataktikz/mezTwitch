# mezTwitch — the mez. broadcast project

Everything for the mez. Twitch presence: brand, OBS scenes, social kit,
strategy docs, exports, and the automation workflows.

    broadcast/   8 OBS scenes (browser sources) — served via GitHub Pages
    design/      editable design canvases (broadcast kit, social kit, options)
    docs/        Phase 1–11 strategy & system documents
    brand/       brand guide, design system, component library (markdown)
    exports/     final PNGs/WAV for Twitch, YouTube, socials
    data/        stats.json — hourly elo ledger written by Actions
    .github/     automation workflows

## push (after creating the empty mezTwitch repo, Public)

Unzip this package, then from inside the folder:

    git init && git add . && git commit -m "mez broadcast project"
    git branch -M main
    git remote add origin https://github.com/Ninjataktikz/mezTwitch.git
    git push -u origin main

(Or github.com → mezTwitch → Add file → Upload files — include `.github`.)

## one-time setup

**Secrets** — Settings → Secrets and variables → Actions → New repository secret:

| secret | value |
|---|---|
| `FACEIT_KEY` | your FACEIT API key |
| `TWITCH_CLIENT_ID` | your Twitch app client ID |
| `TWITCH_CLIENT_SECRET` | dev.twitch.tv → your app → New Secret. Paste ONLY here — never in chat/files. |
| `DISCORD_WEBHOOK` | optional — Discord channel → Integrations → Webhooks → copy URL |

**Pages** — Settings → Pages → Deploy from a branch → `main` / root.

**Actions** — Actions tab → enable, then run each workflow once manually to verify.

## OBS browser source URLs (after Pages deploys)

    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-01.dc.html
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-02.dc.html   (demo off)
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-03.dc.html   (demo off)
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-04.dc.html
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-05.dc.html
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-06.dc.html
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-07-chat.dc.html
    https://ninjataktikz.github.io/mezTwitch/broadcast/obs-08-alerts.dc.html

## notes

- Public repo: the FACEIT key + Twitch client ID inside the scene files are
  visible. Both are free-quota/public-by-design. The Twitch client SECRET
  belongs only in Actions secrets.
- `data/stats.json` becomes useful after ~a week of hourly snapshots — then the
  overlays and ledger post can show true weekly deltas and an elo graph.
- Files here are deployment copies of the design project. After design changes,
  ask Claude to re-sync, then push again.
