import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders main page with header', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
});
