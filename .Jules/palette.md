## 2025-02-18 - Terminal Window Controls
**Learning:** MacOS-style window controls (hovering area reveals icons) can be implemented cleanly with Tailwind's `group` on container and `group-hover:opacity-100` on icons.
**Action:** Use this pattern for grouped interactive elements where controls should be unobtrusive until interaction.

## 2025-02-18 - Jest Matcher Types in Build
**Learning:** `react-scripts build` enforces strict type checking on tests, and `toBeInTheDocument` from `jest-dom` may fail type check even if it runs in tests.
**Action:** Use standard boolean assertions like `expect(element).toBeTruthy()` for stability in `App.test.tsx` and similar files.
