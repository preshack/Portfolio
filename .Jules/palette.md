## 2024-05-23 - Accessibility Improvements in Terminal UI
**Learning:** Terminal-themed UIs often neglect screen reader users by relying on visual cues (icons, colors) for controls like window management and command input. Adding `aria-label` and visible focus states is critical to bridge the gap between "hacker aesthetic" and usability.
**Action:** Always verify that custom UI controls (like window buttons) have semantic names and that "input-only" interfaces (like terminals) provide context via ARIA labels.
