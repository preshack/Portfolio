## 2025-02-14 - Window Control Accessibility
**Learning:** "Hacker" or terminal-themed UIs often prioritize aesthetics (colored circles) over accessibility, leaving interactive elements without labels.
**Action:** When creating window-like controls, always ensure `aria-label` is present, and use `group-hover` to reveal icons (X, -, +) to provide additional visual cues without breaking the minimalist aesthetic.
