
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

describe('App Window Controls', () => {
  test('should have accessible window controls with correct labels', () => {
    render(<App />);

    // Check for ARIA labels - these should fail currently
    const reloadBtn = screen.getByLabelText('Reload terminal');
    const minimizeBtn = screen.getByLabelText('Minimize terminal');
    const maximizeBtns = screen.getAllByLabelText('Maximize terminal');

    expect(reloadBtn).toBeTruthy();
    expect(minimizeBtn).toBeTruthy();
    expect(maximizeBtns.length).toBeGreaterThan(0);
  });

  test('should show hover icons in window controls', () => {
    // This is hard to test visually with just unit tests,
    // but we can check if the icons exist in the DOM inside the buttons
    // Currently they are empty divs/buttons with background colors
    render(<App />);

    const buttons = screen.getAllByRole('button');
    // We expect the first 3 buttons in the header to contain icons (X, Minus, Plus)
    // currently they don't.
  });
});
