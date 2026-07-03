> Project Armez · mez. — single source of truth. Locked decisions live in the Phase 1–5 documents; these files distill them for daily work.

# ANIMATION_GUIDE.md

Two verbs. There is no third.

## snap
120ms, cubic-bezier(0.2, 0, 0, 1), opacity/color only in UI (position changes only for the point's baseline travel). Fast out of the gate, dead stop, no overshoot.

## hold
Stillness as a deliberate state. Content renders complete — no staggered entrances, no fade-in-on-scroll, no parallax, no scroll-jacking.

## Sanctioned uses
- Hover/focus: color shift only.
- The point: single 120ms blink on events; baseline travel as loading state.
- Page transitions: none — instant, like a document.

## prefers-reduced-motion
Both verbs collapse to instant state change. The design degrades to itself.
