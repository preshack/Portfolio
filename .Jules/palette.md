## 2024-05-22 - [Jest Types & React Scripts]
**Learning:** `react-scripts build` includes test files in strict type checking, causing failures if `@types/jest` and `jest-dom` types are not perfectly aligned (e.g. `toBeInTheDocument`).
**Action:** Use `toBeTruthy()` for simple existence checks to avoid fragile type dependency issues in CI/build pipelines.
