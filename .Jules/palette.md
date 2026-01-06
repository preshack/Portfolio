## 2024-05-23 - Dynamic ARIA Labels for Toggle Buttons
**Learning:** Toggle buttons that change functionality (like Maximize/Minimize) require dynamic ARIA labels to accurately convey their current state to screen readers. Static labels can be misleading.
**Action:** Use conditional rendering for `aria-label` and `title` attributes based on the component's state (e.g., `aria-label={isMaximized ? "Minimize" : "Maximize"}`). Ensure tests query using `getAllByLabelText` if multiple elements share the same state-dependent label.
