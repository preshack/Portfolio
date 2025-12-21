import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock window.scrollTo to prevent errors in test
window.scrollTo = jest.fn();

// Mock document.documentElement.scrollTop
Object.defineProperty(document.documentElement, 'scrollTop', {
  value: 0,
  writable: true
});

test('accessible buttons are present', () => {
  render(<App />);

  // Window controls
  expect(screen.getByLabelText(/Reload terminal/i)).toBeTruthy();

  // We have multiple buttons with "Maximize window" label (one in traffic lights, one in header)
  const maximizeButtons = screen.getAllByLabelText(/Maximize window/i);
  expect(maximizeButtons.length).toBeGreaterThanOrEqual(2);

  // ProxAI Input
  // First we need to navigate to ProxAI section?
  // Or is it always rendered? It seems it's conditionally rendered based on currentSection.
  // Default section is "home".
});

test('navigation buttons are accessible', () => {
  render(<App />);

  // Dock buttons
  const homeButton = screen.getByLabelText(/Navigate to home/i);
  expect(homeButton).toBeTruthy();

  const aboutButton = screen.getByLabelText(/Navigate to about/i);
  expect(aboutButton).toBeTruthy();

  const skillsButton = screen.getByLabelText(/Navigate to skills/i);
  expect(skillsButton).toBeTruthy();

  const projectsButton = screen.getByLabelText(/Navigate to projects/i);
  expect(projectsButton).toBeTruthy();

  const contactButton = screen.getByLabelText(/Navigate to contact/i);
  expect(contactButton).toBeTruthy();

  const proxaiButton = screen.getByLabelText(/Navigate to proxai/i);
  expect(proxaiButton).toBeTruthy();
});

test('ProxAI accessibility', () => {
  render(<App />);

  // Navigate to ProxAI
  const proxaiButton = screen.getByLabelText(/Navigate to proxai/i);
  fireEvent.click(proxaiButton);

  // Now input should be visible
  expect(screen.getByLabelText(/ProxAI Command Input/i)).toBeTruthy();
  expect(screen.getByLabelText(/Send command/i)).toBeTruthy();
});

test('Contact accessibility', () => {
  render(<App />);

  // Navigate to Contact
  const contactButton = screen.getByLabelText(/Navigate to contact/i);
  fireEvent.click(contactButton);

  // Check for copy buttons
  // There is a contact row with copyable email
  // "Email Protocol" has copy button.

  // We need to wait for animation or state update?
  // The content is rendered directly in the section object.
  // So it should be there.

  const copyButtons = screen.getAllByLabelText(/Copy to clipboard/i);
  expect(copyButtons.length).toBeGreaterThan(0);
});
