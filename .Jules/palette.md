## 2024-05-23 - Accessibility Improvements
**Learning:** React Testing Library matches often fail with TypeScript errors in this setup when using `toBeInTheDocument`.
**Action:** Use standard Jest assertions like `toBeTruthy()` or `toBeNull()` instead, or ensure `setupTests.ts` and `tsconfig.json` are correctly configured to include `jest-dom` types globally.
