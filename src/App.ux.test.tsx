import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
});

test('renders accessible window control buttons', () => {
  render(<App />);

  // Red button
  expect(screen.getByLabelText('Reload terminal')).toBeTruthy();

  // Yellow button and Toggle button (both share the label)
  const maximizeButtons = screen.getAllByLabelText(/Maximize terminal|Minimize terminal/i);
  expect(maximizeButtons.length).toBeGreaterThanOrEqual(1);

  // Green button
  expect(screen.getByLabelText('Fullscreen (Disabled)')).toBeTruthy();
});

test('renders accessible dock navigation', () => {
  render(<App />);

  const sections = ['Home', 'About', 'Skills', 'Projects', 'Contact', 'Proxai'];
  sections.forEach(section => {
    // Proxai might be "Proxai" or "proxai" depending on capitalization logic
    // In code: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
    // "proxai" -> "Proxai"
    expect(screen.getByLabelText(section)).toBeTruthy();
  });
});
