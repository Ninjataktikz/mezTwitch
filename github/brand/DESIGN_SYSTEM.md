> Project Armez · mez. — single source of truth. Locked decisions live in the Phase 1–5 documents; these files distill them for daily work.

# DESIGN_SYSTEM.md (web)

## Tokens
- color.ink #0E0E0E · color.chalk #FAFAF8 · color.signal #2438E8 · color.signalDark #6D7CFF · grey.800/500/300/200 #2A2A28/#6E6E68/#B9B9B4/#E8E8E5
- font.sans "Neue Haas Grotesk" (400/700) · font.mono engineering mono (400)
- type scale: 96/64/40 display · 16 body · 12 mono caption. Line-height 1.05/1.6/1.5. Tracking −1.5% >40px, +12% mono labels.
- space: 8px module — 8/16/24/32/48/64/96. Section padding 96/64/48 (desktop/tablet/mobile).
- radius: 0. shadow: none. border: 1px hairline (grey.200 on chalk, grey.800 on ink).
- breakpoints: 480 / 768 / 1024 / cap 1440 (content max 1200).
- motion: snap 120ms cubic-bezier(0.2,0,0,1) · hold. Nothing else.

## Components (see COMPONENT_LIBRARY.md)
nav, footer, button (primary/secondary), stat-block, timeline, video-card, achievement-row, table, tag, form field, section-header, copy-config.

## Banned
Modals, carousels, tooltips, accordions, badges, newsletter blocks, third button styles, icon libraries with foreign geometry.

## v1.1 additions (Phase 6 validation)
- copy-config confirmation: mono "copied." inline, 120ms snap, 2s hold, no toast.
- timeline "now" marker: the square point on the baseline — sanctioned (co-presence satisfied by nav wordmark).
- focus ring: 2px Signal outline, 2px offset — global.

## v1.2 — Phase 7 as-built
- Surface rhythm: every page carries exactly ONE full-bleed ink band (reel / ledger / press / footer) — rhythm without a third color.
- Type ramp as built: hero clamp(56→96)/1.02/−2% · page-title clamp(44→72) · section 40/1.1 · body 15–16/1.6 · mono labels 10–11/+12–16% caps · stats mono 44 tabular.
- Layout splits: 7/5 and 5/7 two-zone grids; cards 2-up/3-up/4-up at 24px gap; stats 3-up at 48px.
- Interaction inventory (final, 8): link hover, button hover, proof-tag hover, global focus ring, copy-config, form-send confirm, video click-to-load, active-nav point.
- Skeleton loaders: banned (static-fast pages; skeletons are theater).
