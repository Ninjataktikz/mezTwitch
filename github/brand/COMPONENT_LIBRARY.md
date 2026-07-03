> Project Armez · mez. — single source of truth. Locked decisions live in the Phase 1–5 documents; these files distill them for daily work.

# COMPONENT_LIBRARY.md

Each entry: anatomy · states · rules.

## nav
Wordmark (SVG, links home) · journey / setup / media text links · contact emphasized (primary button, small). Hairline bottom border. Active page: square point before label. Mobile: point + "menu" label opens full-screen chalk sheet, links stacked 64px, close = same position. States: default, hover (Signal, 120ms), focus ring, current.

## footer
The point · social row (YouTube, Twitch, X, Instagram, FACEIT, HLTV — mono hairline icons on 8px module) · privacy · terms · "built on the mez identity system." Identical everywhere.

## button
Primary: ink block, chalk text, radius 0, hover → Signal bg 120ms, no movement. Secondary: hairline outline, text ink, hover → border Signal. Disabled: grey.300 text, no pointer. Never a third style.

## stat-block
Tabular mono figure (40px) + label (12px mono caps) + source link + timestamp. Unverifiable numbers do not ship.

## timeline
One vertical hairline; dated entries snap to it; the point marks "now". Entries: mono date + bold line + 1–2 sentences.

## video-card
AVIF poster + mono duration + click-to-load embed. Never autoplay, never autoload iframes.

## achievement-row
Ledger row: date · event · placement · link. Hairline separators. No trophy graphics.

## table
Header row, hairline rules, mono figures, min 44px row height on touch.

## tag
Mono uppercase, hairline box, no fills.

## form field
Visible label above · input hairline underline · mono inline error stating the fix ("email needs an @") · never placeholder-as-label.

## section-header
Mono kicker (10px, +12%) + display line. One per section; three hierarchy levels max.

## copy-config
Secondary button + mono value string; on copy: "copied." inline 2s. Clipboard-API failure fallback: value pre-selected for manual copy.

## Phase 8 — engineering view
| Component | Kind | Props (typed) |
|---|---|---|
| Nav | server | active: Route |
| Footer | server | — |
| Button | server | variant: 'primary'|'secondary', href?, type? |
| StatBlock | server | value, label, sourceUrl, asOf: Date |
| Timeline | server | entries: TimelineEntry[] (now-marker = entries[0]) |
| VideoCard | client island | posterSrc, duration, embedId, title, date |
| AchievementRow | server | date, event, placement, matchesUrl |
| Table | server | rows: [label, value][] |
| Tag | server | label, href? |
| FormField | client (within form island) | label, name, type, error? |
| SectionHeader | server | kicker, title |
| CopyConfig | client island | value, label — clipboard + select-fallback |

A11y/SEO/perf notes per component unchanged from v1.1/1.2; every island documents why it must be client.

## M2 as-built
- MezMark(width, tone) — server; exact Phase 4 geometry; point tone resolves legally (Signal on chalk, Signal/Dark on ink).
- Nav — server; desktop row + mobile popover sheet (native popover API, no JS); trigger is point + "MENU" label per Phase 6 gap-2 ruling.
- NavLinks(orientation) — the one client micro-island (usePathname → active point, aria-current="page").
- Footer — server; point (Signal/Dark on ink), footer nav, social + legal placeholders, © line.
- Client-JS ledger: nav-links ≈1KB. Feature islands (copy-config, form, video) land at M5–M7.

## M3 as-built
- Tag(label, href, external) — server; mono hairline box; external tags open new tab with rel noopener (outbound = conversion).
- Hero is page-level composition in app/page.tsx, not a component — it appears once, and the inventory stays closed at 12.

## M4 as-built — the library is now complete
Built (all typed, documented, tokens-only, reduced-motion safe):
- Button(variant primary|secondary, tone onChalk|onInk, href|type) — server; renders Link or button. Ghost variant refused: "there is no third button."
- Section(tone chalk|ink, label, id) — layout primitive owning surface rhythm + 1200px cap. Not a 13th UI component.
- SectionHeader(kicker, title?, tone) — server.
- StatBlock(stat: Stat) — server; Stat type makes unverifiable numbers unrepresentable.
- Timeline(entries) — server; 'NOW' entry gets the Signal point.
- Ledger(results) — server; real <table>, 1st places in Signal/Dark.
- ValueTable(title, rows, action?) — server; action slot keeps it server-side with a CopyConfig child.
- CopyConfig(value, label?, tone) — client island #1; clipboard + select-for-manual fallback; "copied." 2s.
- VideoCard(title, date, duration, embedId?) — client island #2; poster-first click-to-load, youtube-nocookie; honest striped slot until posters exist.
- FormField(label, name, as, type, error?) — server-renderable; errors in Signal (the palette has no red and doesn't need one).

Refused from the generic checklist, with cause (all previously banned or unjustified): ghost button, skeleton loaders (static pages — theater), badges/pills (unearned), breadcrumbs (flat IA; schema omitted rather than faked), quote/testimonial cards (killed until citable), avatar component (no user avatars in the product), empty states (content exists or the section doesn't ship), social icon wrapper (footer text links ARE the design), grid/stack/image/media wrappers (Tailwind classes are the layout system; abstraction without value).

Client-JS ledger: nav-links ~1KB + copy-config + video-card. Form island arrives M7. Budget intact.
