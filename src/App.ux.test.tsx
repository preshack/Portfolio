import { render, screen } from '@testing-library/react';
import App from './App';

test('window control buttons have accessible labels', () => {
  render(<App />);

  // Check for Reload button
  const reloadButton = screen.getByLabelText(/reload terminal/i);
  expect(reloadButton).toBeTruthy();

  // Check for Maximize/Minimize button (Yellow)
  // Since there are two buttons that might have similar labels, we need to be careful.
  // The yellow button and the toggle button both control maximization.
  // I'll check if at least one exists with this label for now, or check for all.
  const maximizeButtons = screen.getAllByLabelText(/maximize terminal/i);
  expect(maximizeButtons.length).toBeGreaterThanOrEqual(1);

  // Check for Disabled/Green button
  // If it's disabled or decorative, it might be better to check it has a label indicating it's disabled
  const disabledButton = screen.getByLabelText(/disabled/i);
  expect(disabledButton).toBeTruthy();
});
