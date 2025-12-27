## 2025-12-27 - Invalid HTML in ContactRow
**Learning:** Nested interactive elements (like a button inside an anchor) cause undefined behavior in screen readers and are invalid HTML.
**Action:** Always check component structure to ensure interactive elements are not nested. Use utility classes or flex containers to position siblings visually instead of nesting them.
