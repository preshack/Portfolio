import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App UX Accessibility', () => {
  test('window control buttons have accessible labels', () => {
    render(<App />);

    // Verify Accessible Names
    expect(screen.getByLabelText(/Reload Terminal/i)).toBeTruthy();
    expect(screen.getByLabelText(/Minimize Terminal/i)).toBeTruthy();
    expect(screen.getByLabelText(/Maximize Terminal/i)).toBeTruthy();
  });

  test('maximize and minimize buttons update terminal state', () => {
    render(<App />);

    const maximizeBtn = screen.getByLabelText(/Maximize Terminal/i);
    const minimizeBtn = screen.getByLabelText(/Minimize Terminal/i);

    // Find the terminal window container
    // We can find it by looking for the header text and traversing up
    const headerElement = screen.getByText(/preshak@hackbox/i);
    const terminalWindow = headerElement.closest('div.relative.z-10');

    expect(terminalWindow).not.toBeNull();

    // Initial State: Not Maximized (max-w-5xl)
    // Use optional chaining or assertion to silence TS if needed, but here standard checks work
    expect(terminalWindow?.className).toContain('max-w-5xl');
    expect(terminalWindow?.className).not.toContain('max-w-7xl');

    // Click Maximize (Green Button)
    fireEvent.click(maximizeBtn);

    // Expect Maximized State (max-w-7xl)
    expect(terminalWindow?.className).toContain('max-w-7xl');
    expect(terminalWindow?.className).not.toContain('max-w-5xl');

    // Click Minimize (Yellow Button)
    fireEvent.click(minimizeBtn);

    // Expect Minimized/Normal State (max-w-5xl)
    expect(terminalWindow?.className).toContain('max-w-5xl');
    expect(terminalWindow?.className).not.toContain('max-w-7xl');
  });
});
