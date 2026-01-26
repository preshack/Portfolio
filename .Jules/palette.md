## 2024-05-22 - Terminal Window Controls
**Learning:** To authentically mimic macOS window controls while maintaining accessibility, use icon-only buttons with explicit `aria-label`s ("Close", "Minimize", "Maximize"). Hide the icons (`X`, `Minus`, `Plus`) by default and reveal them on hover (`group-hover:opacity-100`) to preserve the clean "traffic light" aesthetic.
**Action:** Reuse this pattern for any new floating panels or modal windows in the application to ensure consistency with the terminal theme.
