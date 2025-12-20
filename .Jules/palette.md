## 2024-05-23 - Accessibility in Terminal UI
**Learning:** Terminal-style UIs often use custom, icon-only buttons (like traffic lights) which are inaccessible by default.
**Action:** Always add `aria-label` and `title` to these buttons, and ensure keyboard focus states (`focus-visible:ring`) are present since default browser focus rings are often suppressed in such designs.
