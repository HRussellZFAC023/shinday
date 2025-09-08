# Legacy vs Current Audit

This document summarizes gaps versus the legacy `main.OLDMONOLITH.js` and tracks progress toward parity.

## Remaining Gaps
- **Navigation flow** – study/game tiles need finer alignment with the legacy layout.
- **Responsive polish** – verify layout on small screens and embedded views.

## Completed Restorations
- Ring and perfect-hit effects consolidated into `visual-effects.js` and used by all quizzes.
- Falling-beat rhythm system triggered per game and torn down on stop.
- Vocab and kanji modules prefetch several pages up front and refresh caches in the background.
- Miku × Chat simplified into a keyboard-driven typing interface.
- Typing game now emits ring and perfect-hit visuals on keystrokes, matching other quizzes.
- Song-over overlay promoted to a fixed modal with animated result rings.
- Judgment logic unified across quiz modules so StudyHub receives reliable COOL/GREAT/FINE/MISS results without reference errors.

Use this evolving audit to guide remaining refinements for a full Project Diva–style experience.
