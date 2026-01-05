## 2024-05-24 - Custom Window Controls and Accessibility
**Learning:** Custom UI elements like "traffic light" window controls often lack standard semantic meaning, making them invisible or confusing to screen reader users if not explicitly labeled.
**Action:** Always ensure custom interactive elements that mimic OS controls have descriptive `aria-label` and `title` attributes that explain their specific function within the web app context (e.g., "Reload terminal" instead of just "Red button").
