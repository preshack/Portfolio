## 2024-05-23 - Traffic Light Controls
**Learning:** Icon-only "traffic light" window controls (macOS style) are a common pattern in dev-themed portfolios but often lack accessibility.
**Action:** Always add ARIA labels (Reload, Minimize, Maximize) and consider adding hover icons (X, -, +) using group-hover to combine aesthetics with usability.

## 2024-05-23 - Test Stability
**Learning:** `create-react-app` TypeScript setups can have flaky `jest-dom` type recognition in CI/build environments.
**Action:** For robust micro-changes, prefer standard Jest assertions (like `toBeTruthy`) over library-specific matchers (`toBeInTheDocument`) when you can't guarantee the environment configuration.
