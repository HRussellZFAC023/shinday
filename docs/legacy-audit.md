# Legacy vs Current Audit

This document summarizes missing Project Diva features compared to the legacy `main.OLDMONOLITH.js` implementation.

## Missing or Changed Features
- **HUD elements** – combo bars, voltage, and level progress are not fully restored.
- **Song overlays** – success overlay rings and ranking visuals still require polish.
- **Daily quests relocation** – sidebar quests remain instead of showing within Japanese section.
- **Navigation flow** – game tile transitions and difficulty slider styling need alignment with legacy layout.

## Recently Addressed
- Ring and perfect-hit visual effects extracted into `visual-effects.js`.
- Falling beat animations initialized once per game and cleaned up on stop.
- Prefetching for vocab questions to prevent game stalls.
- Miku × Chat refactored into a typing interface.

Use this checklist to guide remaining work toward a full Project Diva–style experience.
