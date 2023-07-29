import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExampleHeader from './ExampleHeader';

test('renders ExampleHeader component', () => {
  render(<ExampleHeader />);

  const headingElement = screen.getByText(/Hello, world/i);
  expect(headingElement).toBeInTheDocument();
});
