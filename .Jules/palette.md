## 2026-02-06 - Window Control Accessibility
**Learning:** Decorative window controls (like macOS traffic lights) are often implemented as empty divs, making them inaccessible to screen readers and keyboard users.
**Action:** Always add `aria-label` to these controls and ensure they have visible focus states and hover effects that reveal their function (e.g., icons).
