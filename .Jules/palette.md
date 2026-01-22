## 2026-01-21 - Icon-Only Button Accessibility Pattern
**Learning:** This app frequently uses icon-only buttons (like traffic lights, toggle controls) without accessible names, making them invisible to screen readers.
**Action:** Always wrap icon-only buttons with `aria-label` describing the action, and consider adding `group-hover:opacity-100` tooltips or internal icons for clarity.
