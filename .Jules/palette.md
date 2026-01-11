## 2024-05-23 - Traffic Light Controls
**Learning:** Users instinctively expect "traffic light" window controls to behave like macOS (Red=Close, Yellow=Minimize, Green=Maximize), even in web-based terminal emulators.
**Action:** When using this visual metaphor, explicitly implement these behaviors instead of generic toggles or disabled states. Add hover icons (X, -, +) to reinforce the action before click.

## 2024-05-23 - Test Matchers in TSA environment
**Learning:** `toBeInTheDocument` from `jest-dom` may not be recognized by TypeScript in some CRA environments without explicit setup in `tsconfig.json` or `setupTests.ts`.
**Action:** Use standard Jest matchers like `toBeTruthy()` for simple existence checks if compilation fails, or ensure proper type augmentation is configured.
