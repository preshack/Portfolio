import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('navigation dock buttons have accessible names', () => {
  render(<App />);

  // Verify that we can find buttons by their accessible names
  const homeButton = screen.getByRole('button', { name: /Navigate to home section/i });
  const aboutButton = screen.getByRole('button', { name: /Navigate to about section/i });
  const skillsButton = screen.getByRole('button', { name: /Navigate to skills section/i });
  const projectsButton = screen.getByRole('button', { name: /Navigate to projects section/i });
  const contactButton = screen.getByRole('button', { name: /Navigate to contact section/i });
  const proxaiButton = screen.getByRole('button', { name: /Navigate to proxai section/i });

  // Using standard Jest matchers to avoid type issues with jest-dom
  expect(homeButton).toBeTruthy();
  expect(aboutButton).toBeTruthy();
  expect(skillsButton).toBeTruthy();
  expect(projectsButton).toBeTruthy();
  expect(contactButton).toBeTruthy();
  expect(proxaiButton).toBeTruthy();
});
