import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock scrollTo since it's not implemented in JSDOM
Element.prototype.scrollTo = jest.fn();

describe('UX & Accessibility Enhancements', () => {
  const originalLocation = window.location;

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

  test('Window controls have accessible labels', () => {
    render(<App />);

    expect(screen.getByLabelText('Reload terminal')).toBeTruthy();
    expect(screen.getByLabelText('Minimize terminal')).toBeTruthy();
    expect(screen.getByLabelText('Maximize terminal')).toBeTruthy();
  });

  test('Window control functionality', () => {
    render(<App />);

    const reloadBtn = screen.getByLabelText('Reload terminal');
    fireEvent.click(reloadBtn);
    expect(window.location.reload).toHaveBeenCalled();
  });

  test('ProxAI Send button has accessible label', () => {
    render(<App />);
    // Click the proxai dock item to switch views
    const dockButtons = screen.getAllByRole('button');
    const proxaiSpan = screen.getByText('proxai');
    fireEvent.click(proxaiSpan.closest('button')!);

    expect(screen.getByLabelText('Send command')).toBeTruthy();
  });

  test('Skill code snippet buttons have accessible labels', async () => {
    render(<App />);

    // Trigger a skill event to show the modal
    act(() => {
        const event = new CustomEvent('showSkill', { detail: 'Python' });
        document.dispatchEvent(event);
    });

    const copyBtn = await screen.findByLabelText('Copy code');
    const closeBtn = screen.getByLabelText('Close code snippet');

    expect(copyBtn).toBeTruthy();
    expect(closeBtn).toBeTruthy();
  });
});
