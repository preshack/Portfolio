## 2024-05-22 - Accessible Mac-style Window Controls
**Learning:** Decorative Mac-style window controls (red/yellow/green dots) are often implemented as empty divs or buttons, leaving screen reader users with no context for these interactive elements.
**Action:** Always attach `aria-label` describing the actual function (e.g., "Reload", "Maximize") to these skeuomorphic controls.
