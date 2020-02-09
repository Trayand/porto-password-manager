import React from 'react';
import { render, debug } from '@testing-library/react';
import App from '../App';


test('renders text on login page link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/remember/i);
  expect(linkElement).toBeInTheDocument();
  // debug()
});