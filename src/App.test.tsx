import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

test('renders Preshak name', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Preshak/i });
  expect(headingElement).toBeTruthy();
});

test('window control buttons have accessible labels', () => {
  render(<App />);

  // Reload button
  const reloadBtn = screen.getByLabelText(/Reload terminal/i);
  expect(reloadBtn).toBeTruthy();

  // Maximize/Minimize button (Yellow) AND the top-right toggle button
  // Both have the same label "Maximize terminal" initially.
  const maximizeBtns = screen.getAllByLabelText(/Maximize terminal/i);
  expect(maximizeBtns.length).toBeGreaterThanOrEqual(2);

  // Fullscreen button (Green - Disabled)
  const fullscreenBtn = screen.getByLabelText(/Fullscreen \(disabled\)/i);
  expect(fullscreenBtn).toBeTruthy();
});

test('ProxAI input and button have accessible labels', () => {
  render(<App />);

  // Click the ProxAI button in the dock.
  const proxAiButton = screen.getByText('proxai');
  expect(proxAiButton).toBeTruthy();

  // Wrap state update in act
  act(() => {
    fireEvent.click(proxAiButton);
  });

  // Now the input should be visible.
  const input = screen.getByLabelText(/ProxAI Command Input/i);
  expect(input).toBeTruthy();

  const sendBtn = screen.getByLabelText(/Send command/i);
  expect(sendBtn).toBeTruthy();
});
