## 2025-02-18 - Accessibility Testing Patterns
**Learning:** Duplicate ARIA labels (e.g., redundant "Maximize terminal" controls) require `getAllByLabelText` in tests.
**Action:** Use `getAllByLabelText` and filter by context or assert on count when multiple UI elements perform the same action.

## 2025-02-18 - TypeScript Build Constraints
**Learning:** `pnpm build` (tsc) fails on `jest-dom` matchers like `toBeInTheDocument` due to missing global type definitions in this repo.
**Action:** Use standard Jest assertions (e.g., `toBeTruthy`) in `.test.tsx` files to ensure build stability.
