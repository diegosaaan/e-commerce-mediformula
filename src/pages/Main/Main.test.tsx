/* eslint-disable import/order */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import MockLink from '@/__mocks__/MockLink';
import swiperMocks from '@/__mocks__/MockSwiper';
import { BrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';

jest.mock('swiper/react', () => swiperMocks);

jest.mock('swiper', () => ({
  default: jest.fn(),
  Thumbs: jest.fn(),
}));

jest.mock('react-router-dom', () => MockLink);

describe('Layout component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  test('render header', () => {
    const loginButton = screen.getByText('Войти');
    const registrationButton = screen.getByText('Регистрация');
    expect(loginButton).toBeInTheDocument();
    expect(registrationButton).toBeInTheDocument();
  });

  test('render footer', () => {
    const socialNetworks = screen.getByText('Мы в социальных сетях');
    expect(socialNetworks).toBeInTheDocument();
  });
});
