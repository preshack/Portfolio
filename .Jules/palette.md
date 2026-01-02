## 2024-05-23 - Accessibility for Custom UI Controls
**Learning:** Custom window controls (like macOS red/yellow/green buttons) are often purely decorative or mouse-only in theme-heavy UIs. This creates a "mystery meat" navigation for screen readers.
**Action:** Always add `aria-label` and `title` to custom UI controls even if their function seems obvious visually. For purely decorative elements (like the disabled green button), use `cursor-default` and a clarifying tooltip/label to prevent user confusion.

## 2024-05-23 - Testing Duplicate ARIA Labels
**Learning:** When multiple buttons perform the same action (e.g., maximize via window control AND maximize via toolbar icon), using the same `aria-label` causes `getByLabelText` to fail.
**Action:** Use `getAllByLabelText` in tests when redundancy is intentional, or differentiate labels slightly if the context differs (e.g., "Maximize window" vs "Toggle maximize mode"). For this app, `getAllByLabelText` was the correct approach as the function is identical.
