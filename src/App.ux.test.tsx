import { render, screen } from '@testing-library/react';
import App from './App';

test('Window controls are accessible', () => {
  render(<App />);
  const reloadBtn = screen.getByLabelText(/reload terminal/i);
  const minimizeBtn = screen.getByLabelText(/minimize terminal/i);
  const maximizeBtn = screen.getByLabelText(/maximize terminal/i);

  expect(reloadBtn).toBeTruthy();
  expect(minimizeBtn).toBeTruthy();
  expect(maximizeBtn).toBeTruthy();
});
