import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;

describe('Terminal UX', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  test('Terminal window controls are accessible and functional', () => {
    render(<App />);

    // Check for accessible labels
    // These checks will fail before implementation, confirming the issue.
    const reloadBtn = screen.getByLabelText(/reload terminal/i);
    // Note: There might be multiple minimize/maximize buttons (traffic light + top right toggle)
    // We should ensure we are targeting the traffic lights specifically if needed,
    // or just checking that *some* button with that label exists.
    // The top right toggle changes label based on state.
    // The traffic lights should have static labels.

    // We use getAllByLabelText in case the top-right toggle also matches
    const minimizeBtns = screen.getAllByLabelText(/minimize terminal/i);
    const maximizeBtns = screen.getAllByLabelText(/maximize terminal/i);

    expect(reloadBtn).toBeTruthy();
    expect(minimizeBtns.length).toBeGreaterThan(0);
    expect(maximizeBtns.length).toBeGreaterThan(0);

    // Test Reload
    fireEvent.click(reloadBtn);
    expect(window.location.reload).toHaveBeenCalled();

    // Test Maximize (Green button)
    // We assume the green button is one of the maximize buttons.
    // In our implementation, we'll make sure the traffic light green button is for maximizing.
    // For this test, let's find the specific traffic light one.
    // Usually traffic lights are in a container.
    // Let's just click the first one found or refine selection if needed.
    // But since the current code has NO labels, this test failing is enough to start.
  });
});
