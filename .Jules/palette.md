## 2024-05-22 - Terminal Window Controls & Accessibility
**Learning:** Mock OS window controls (Red/Yellow/Green buttons) often get implemented as purely visual div elements or empty buttons, missing both accessibility (ARIA labels) and expected native behavior (hover icons).
**Action:** When implementing "fake" OS UIs, always fully implement the interactive state: use semantic `<button>` tags, provide `aria-label`s describing the action (Reload, Minimize, Maximize), and use CSS group-hover patterns to reveal standard icons (X, -, +) to match user mental models.

## 2024-05-22 - Strict Type Checking in Tests
**Learning:** `react-scripts build` enforces strict type checking even on test files. Custom Jest matchers like `toBeInTheDocument` from `@testing-library/jest-dom` may cause build failures if types aren't perfectly configured, even if tests pass in JSDOM.
**Action:** Prefer standard boolean assertions (e.g., `expect(element).toBeTruthy()`) in simple verify-existence tests within this environment to ensure build stability.
