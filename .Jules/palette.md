## 2025-12-19 - [Accessible Terminal Controls]
**Learning:** Even decorative controls (like the green Mac-style button) need explicit handling (aria-hidden/tabIndex=-1) to avoid confusing screen reader users with dead focusable elements.
**Action:** Always audit 'traffic light' or group controls for non-functional elements and remove them from the tab order.
