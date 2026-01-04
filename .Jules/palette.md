## 2024-05-23 - Accessibility for Custom Window Controls
**Learning:** Custom UI elements like window controls (traffic lights) are often missed by screen readers. Adding `aria-label`, `title`, and visible focus states makes them usable without compromising the aesthetic.
**Action:** Always verify "icon-only" buttons have accessible labels and keyboard focus states. Use `focus-visible` to hide focus rings for mouse users.

## 2024-05-23 - Jest DOM Type Issues
**Learning:** `create-react-app` projects with older TypeScript configurations might fail to recognize `jest-dom` matchers like `toBeInTheDocument` even if the library is installed.
**Action:** Use standard Jest assertions (e.g., `toBeTruthy`) in tests to ensure stability across environments unless the configuration can be reliably fixed.
