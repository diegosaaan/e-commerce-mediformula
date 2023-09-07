/* eslint-disable no-global-assign */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, Matcher } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RegistrationPage from '../Registration';
import {
  validRegistrationFormData,
  validAddressFormData,
  invalidRegistrationFormData,
  // invalidAddressFormData,
  IFormData,
} from './testCases';
import { createNewUserToken } from '@/services/tokenHelpers';
import { createAdminJSONHeaders } from '@/services/headers';
import { register } from '@/services/userAuth';
import { ILocalStorageUserTokenData, IUserTokenData } from '@/types/apiInterfaces';
import ApiEndpoints from '@/enums/apiEndpoints';
import MockLocalStorage from '@/__mocks__/mockLocalStorage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: jest.fn().mockReturnValue({}),
}));

const addDataToFieldAndCheckBtnWorkCorrect = (
  registrationFormData: IFormData[],
  addressFormData: IFormData[],
  indexOfaddAddressButton: number // billing or shipping
): void => {
  validRegistrationFormData.forEach((__, index) => {
    const { fieldName, fieldValue } = registrationFormData[index];
    fireEvent.change(screen.getByLabelText(`${fieldName}`), { target: { value: `${fieldValue}` } });
  });

  const openAddressFormButton = screen.getByText('Добавить адреса');
  fireEvent.click(openAddressFormButton);

  const addAddressButtons = document.querySelectorAll('.auth__button-add');
  fireEvent.click(addAddressButtons[indexOfaddAddressButton]);

  validAddressFormData.forEach((__, index) => {
    const { fieldName, fieldValue } = addressFormData[index];
    fireEvent.change(screen.getByLabelText(`${fieldName}`), { target: { value: `${fieldValue}` } });
  });

  const addAddressButton = document.querySelector('.auth__button_type_add');
  expect(addAddressButton).toBeInTheDocument();
  expect(addAddressButton).not.toBeDisabled();
  fireEvent.click(addAddressButton!);

  const copyAddressButton = document.querySelector('.auth__button-copy');
  expect(copyAddressButton).toBeInTheDocument();
  fireEvent.click(copyAddressButton!);

  const addressesItems = document.querySelectorAll('.auth__item-address');
  addressesItems.forEach((item) => fireEvent.click(item));

  const prevButton = document.querySelector('.auth__button-prev');
  expect(prevButton).toBeInTheDocument();
  fireEvent.click(prevButton!);
};

describe('Render registration page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  test('render registration form', () => {
    expect(screen.getByText('На главную')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();

    validRegistrationFormData.forEach(({ fieldName }) => {
      expect(screen.getByLabelText(`${fieldName}`)).toBeInTheDocument();
    });

    expect(screen.getByText('Добавить адреса')).toBeInTheDocument();
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    expect(screen.getByText('Зарегистрироваться')).toBeDisabled();
  });

  test('render address form', () => {
    fireEvent.click(screen.getByText('Добавить адреса'));

    expect(screen.getByText('Добавьте адреса для доставок')).toBeInTheDocument();
    expect(screen.getByText('Добавьте адреса для выставления счетов')).toBeInTheDocument();

    const addAddressButtons = document.querySelectorAll('.auth__button-add');
    expect(addAddressButtons.length).toBe(2);

    fireEvent.click(addAddressButtons[0]);

    expect(document.querySelector('.auth__select')).toBeInTheDocument();
    validAddressFormData.forEach(({ fieldName }) => {
      expect(screen.getByLabelText(`${fieldName}`)).toBeInTheDocument();
    });

    const prevButton = document.querySelector('.auth__button-prev');
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton!);

    expect(document.querySelector('.auth__select')).not.toBeInTheDocument();
    validAddressFormData.forEach(({ fieldName }) => {
      expect(screen.queryByLabelText(`${fieldName}`)).not.toBeInTheDocument();
    });
  });
});

describe('Check the possibility of registration with various options for filling in fields, add/delete address button logic', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  test('Check the possibility of registration when the fields are filled correctly', async () => {
    await waitFor(() => {
      addDataToFieldAndCheckBtnWorkCorrect(validRegistrationFormData, validAddressFormData, 0);
      expect(screen.queryByText('Зарегистрироваться')).not.toBeDisabled();
    });
  });

  test('Check the impossibility of registration when the fields are filled incorrectly', async () => {
    await waitFor(() => {
      addDataToFieldAndCheckBtnWorkCorrect(invalidRegistrationFormData, validAddressFormData, 1);
      expect(screen.getByText('Зарегистрироваться')).toBeDisabled();
    });
  });

  // test('Check the impossibility of add address when the fields are filled incorrectly', async () => {
  //   await waitFor(() => {
  //     const openAddressFormButton = screen.getByText('Добавить адреса');
  //     fireEvent.click(openAddressFormButton);

  //     const addAddressButtons = document.querySelectorAll('.auth__button-add');
  //     fireEvent.click(addAddressButtons[0]);

  //     validAddressFormData.forEach((__, index) => {
  //       const { fieldName, fieldValue } = invalidAddressFormData[index];
  //       fireEvent.change(screen.getByLabelText(`${fieldName}`), { target: { value: `${fieldValue}` } });
  //     });

  //     const cityErrorMessage = screen.getByText(
  //       'Поле должно содержать хотя бы один символ и не содержать специальных символов или цифр.'
  //     );

  //     expect(cityErrorMessage).toBeInTheDocument();
  //   });
  // });

  test('Check the correct operation of the delete address button', async () => {
    await waitFor(() => {
      addDataToFieldAndCheckBtnWorkCorrect(validRegistrationFormData, validAddressFormData, 0);
      const openAddressFormButton = screen.getByText('Добавить адреса');
      fireEvent.click(openAddressFormButton);

      let addressesItems = document.querySelectorAll('.auth__item-address');
      expect(addressesItems.length).toEqual(2);

      const copyAddressButton = document.querySelector('.auth__button-copy');
      expect(copyAddressButton).toBeInTheDocument();
      fireEvent.click(copyAddressButton!);

      const deleteAddressButton = document.querySelector('.auth__button-delete');
      expect(deleteAddressButton).toBeInTheDocument();
      fireEvent.click(deleteAddressButton!);

      addressesItems = document.querySelectorAll('.auth__item-address');
      expect(addressesItems.length).toEqual(2);
    });
  });
});

describe('Check country select work correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  const openCountrySelectAndChooseCity = (
    selectMethod: {
      (element: Element): boolean;
      (element: Element): boolean;
      (arg0: Element): void;
    },
    country: Matcher
  ): void => {
    const openAddressFormButton = screen.getByText('Добавить адреса');
    fireEvent.click(openAddressFormButton);

    const addAddressButtons = document.querySelectorAll('.auth__button-add');
    fireEvent.click(addAddressButtons[0]);

    const selectList = document.querySelector('.auth__select-list');
    const selectTitle = document.querySelector('.auth__list-heading');

    expect(selectList).toBeInTheDocument();
    expect(selectTitle).toBeInTheDocument();
    expect(selectTitle?.textContent).toBe('Польша (PL)');

    selectMethod(selectTitle!);

    const selectCountryItem = screen.getByText(country);
    selectMethod(selectCountryItem);

    expect(selectTitle?.textContent).toBe(country);
  };

  test('open country select and choose country by click', () => {
    openCountrySelectAndChooseCity(fireEvent.click, 'Бельгия (BE)');
  });

  test('open country select and choose country by keydown', () => {
    openCountrySelectAndChooseCity((element: Element) => fireEvent.keyDown(element, { key: 'Enter' }), 'Германия (DE)');
  });
});

describe('Register new user', () => {
  const mock = new MockAdapter(axios);

  const mockTokenData: IUserTokenData = {
    access_token: 'mock access token',
    refresh_token: 'mock refresh token',
    expires_in: 10000,
    scope: 'mock scopes',
    token_type: 'mock token type',
  };

  beforeAll(() => {
    mock.onPost(ApiEndpoints.URL_CUSTOMERS).reply(200, 'was registered');
    mock.onPost(ApiEndpoints.URL_AUTH_TOKEN_ADMIN).reply(200, 'admin token');
    mock.onPost(ApiEndpoints.URL_AUTH_CUSTOMERS_TOKEN).reply(200, mockTokenData);
  });

  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  test('register new user', async () => {
    waitFor(async () => {
      await register(
        'Mops', // firstName
        'Carvi', // lastName
        '1990-09-09', // date
        'mops@gmail.com', // email
        'Mops12345@', // password
        [], // uniqueArray
        0, // indexShipping
        0, // indexBilling
        [0], // indexesOfShipping
        [0] // indexesOfBilling
      );

      await createAdminJSONHeaders();
      await createNewUserToken('mock email', 'mock password');

      expect(register).toHaveReturnedWith('was registered');
      expect(createNewUserToken).toHaveReturnedWith(mockTokenData);
      expect(createAdminJSONHeaders).toHaveReturnedWith({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'admin token'}`,
      });
    });
  });
});

describe('Checking redirect to main/login pages work correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  test('render redirect to main page button', () => {
    const backToMainPageButton = screen.getByText('На главную');
    fireEvent.click(backToMainPageButton);
    expect(window.location.pathname).toBe('/');
  });

  test('render redirect to login page button', () => {
    const toLoginPageButton = screen.getByText('Войти');
    fireEvent.click(toLoginPageButton);
    expect(window.location.pathname).toBe('/login');
  });
});

describe('Get user data from local storage', () => {
  const mock = new MockAdapter(axios);
  const mockLocalStorage = new MockLocalStorage();
  const originalLocalStorage = localStorage;

  const localStorageTokenData: ILocalStorageUserTokenData = {
    access_token: 'mock access token',
    refresh_token: 'mock refresh token',
    expires_in: 10000,
  };

  beforeAll(() => {
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    mock.onPost(ApiEndpoints.URL_AUTH_CUSTOMERS_TOKEN).reply(200, localStorageTokenData);
    localStorage = mockLocalStorage;
  });

  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  afterAll(() => {
    localStorage = originalLocalStorage;
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('get null from local storage', () => {
    const localData = localStorage.getItem('isUserLoggedIn');
    expect(localData).toBeNull();
  });

  // test('get user token from local storage after new user token was created and saved', async () => {
  //   const response = await createNewUserToken('mock email', 'mock password');
  //   if (response !== null && typeof response === 'object') {
  //     if ('data' in response) {
  //       const data = response.data as IUserTokenData;
  //       saveUserToken(data);

  //       const userTokenData: ILocalStorageUserTokenData = JSON.parse(localStorage.getItem('1SortUserToken') as string);
  //       expect(localStorage.setItem).toHaveBeenCalledWith('1SortUserToken', JSON.stringify(localStorageTokenData));
  //       expect(userTokenData).toEqual(localStorageTokenData);
  //     } else {
  //       throw new Error('"response do not have the "data" field. Please check the test');
  //     }
  //   } else {
  //     throw new Error('"response" is not a Object. Please check the test');
  //   }
  // });
});
