/* eslint-disable import/order */
import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import MockLink from '@/__mocks__/MockLink';
import swiperMocks from '@/__mocks__/MockSwiper';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Accordion from '@/components/Accordion/Accrodion';
import Footer from '@/components/Footer/Footer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: jest.fn().mockReturnValue({}),
}));

afterEach(cleanup);

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

  test('render header', () => {});

  test('render footer', () => {
    const socialNetworks = screen.getByText('Мы в социальных сетях');
    expect(socialNetworks).toBeInTheDocument();
  });
});

describe('Accordion component', () => {
  const props = {
    sectionName: 'test-section',
    listName: 'test-list',
    title: 'Test Title',
    children: [<div key="test-content">Test content</div>],
    isOpen: false,
    onClickAccordion: jest.fn(),
    onKeydownAccordion: jest.fn(),
  };

  test('renders the accordion with the correct title', () => {
    render(<Accordion {...props} />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('calls onClickAccordion when the title is clicked', () => {
    render(<Accordion {...props} />);

    const titleElement = screen.getByText('Test Title');
    fireEvent.click(titleElement);

    expect(props.onClickAccordion).toHaveBeenCalled();
  });

  test('render the content when isOpen is true and hides it when isOpen is false', () => {
    const { rerender } = render(<Accordion {...props} />);

    let contentElement = screen.queryByText('Test Title');
    if (contentElement) {
      const classes = contentElement.className.split(' ');
      const hasActiveClass = classes.some((className) => className.endsWith('__accordion-heading--active'));
      expect(hasActiveClass).toBe(false);
    }

    rerender(<Accordion {...props} isOpen={true} />);
    contentElement = screen.queryByText('Test Title');
    if (contentElement) {
      const classes = contentElement.className.split(' ');
      const hasActiveClass = classes.some((className) => className.endsWith('__accordion-heading--active'));
      expect(hasActiveClass).toBe(true);
    }
  });

  test('calls onKeydownAccordion with the cottert event', () => {
    render(<Accordion {...props} />);

    const titleElement = screen.getByText('Test Title');
    fireEvent.keyDown(titleElement, { key: 'Enter', code: 'Enter' });
    expect(props.onKeydownAccordion).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter', code: 'Enter' }));
  });
});

describe('Footer component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('scroll to top of the page when link is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const link = getByText('О разработчиках сайта');
    fireEvent.click(link);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
