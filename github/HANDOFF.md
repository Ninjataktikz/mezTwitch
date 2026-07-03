# HANDOFF — mezTwitch repo setup (for Claude Code / Claude with GitHub tools)

## Paste this prompt to Claude Code

> Set up my Twitch broadcast repo from this folder. Follow HANDOFF.md exactly:
> create a public GitHub repo `mezTwitch` under my account, push this folder's
> contents as the initial commit, set the Actions secrets (ask me for values),
> enable GitHub Pages (main / root) and Actions, run both workflows once, and
> give me the final list of OBS browser-source URLs.

## Context (read first)

This folder is the complete "mez." Twitch broadcast project for a CS2 streamer
(FACEIT nickname `mezcs_`, Twitch `twitch.tv/mezcs_`).

**Important: the HTML files here are FINAL DEPLOYMENT ARTIFACTS, not design
references.** The `broadcast/*.dc.html` files are self-contained OBS browser
sources (self-mounting HTML + `support.js` runtime). Do NOT rewrite them in
React/Vue, do NOT restructure, rename, or "clean up" any file — push verbatim.
The design source of truth lives in the owner's Claude design project; this
repo is the deployment target.

## Tasks, in order

1. **Create repo** — `gh repo create mezTwitch --public --source . --push`
   (or create empty repo + `git init && git add . && git commit -m "mez broadcast project" && git branch -M main && git remote add origin ... && git push -u origin main`).
   Must be **public** (free GitHub Pages). Owner account: Ninjataktikz.

2. **Actions secrets** — ask the owner for each value, then:
   - `gh secret set FACEIT_KEY` — their FACEIT Data API key (they have it)
   - `gh secret set TWITCH_CLIENT_ID` — value: `1v5z90u55n6uwdlpf5jcs3oluae5uy`
   - `gh secret set TWITCH_CLIENT_SECRET` — owner must generate at
     dev.twitch.tv → their app → "New Secret". Have them paste it directly
     into the command/secret store; never echo it back or write it to a file.
   - `gh secret set DISCORD_WEBHOOK` — optional; skip if they don't use Discord.

3. **Enable Pages** — main branch, root:
   `gh api repos/{owner}/mezTwitch/pages -X POST -f "source[branch]=main" -f "source[path]=/"`
   (or Settings → Pages → Deploy from a branch → main / root).

4. **Verify workflows** — `.github/workflows/faceit-elo-logger.yml` (hourly elo
   snapshot → `data/stats.json`) and `.github/workflows/live-ping.yml`
   (5-min live check → Discord ping on go-live). Trigger each once:
   `gh workflow run "faceit elo logger"` / `gh workflow run "live ping"`,
   confirm green. The live-ping run is a no-op unless the stream is live — a
   green no-op run is success.

5. **Report back** the OBS browser-source URLs (1920×1080 sources; the chat
   overlay 420×600):
   `https://ninjataktikz.github.io/mezTwitch/broadcast/obs-01.dc.html` … `obs-06.dc.html`,
   `obs-07-chat.dc.html`, `obs-08-alerts.dc.html`.
   Scenes 02 and 03 must be used with the `demo` tweak off (transparent mode).

## Folder map

    broadcast/   8 OBS scenes + support.js + faceit.js + alert sound — deploy verbatim
    design/      editable design canvases (broadcast kit, social kit, direction options)
    docs/        Phase 1–11 strategy/system documents (HTML, print-ready)
    brand/       brand guide, design system, component library (markdown)
    exports/     final PNGs/WAV for Twitch/YouTube/social uploads
    data/        stats.json — seeded empty; written hourly by the elo-logger Action
    .github/     the two workflow files

## Security notes

- The FACEIT API key and Twitch **client ID** are intentionally baked into the
  broadcast files (client-side, free-quota, public-by-design). Acceptable in a
  public repo.
- The Twitch **client secret** must exist ONLY as an Actions secret.
- If the owner ever pastes a stream key (`live_...`) anywhere, tell them to
  reset it in the Twitch dashboard.

## Known follow-ups (owner may ask later; don't do unprompted)

- Once `data/stats.json` has ~a week of snapshots: wire the overlays/ledger
  post to read it (raw.githubusercontent URL) for true weekly deltas + an elo
  graph.
- Weekly Action that renders the 2048×2048 ledger stat post automatically.
- OBS WebSocket control deck.
