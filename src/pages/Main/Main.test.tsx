import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './Main';

test('renders main page with header', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
});
