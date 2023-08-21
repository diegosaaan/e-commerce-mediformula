/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, Matcher } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from '../Registration';
import {
  validRegistrationFormData,
  validAddressFormData,
  invalidRegistrationFormData,
  invalidAddressFormData,
  IFormData,
} from './testCases';

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

  test('Check the impossibility of add address when the fields are filled incorrectly', async () => {
    await waitFor(() => {
      const openAddressFormButton = screen.getByText('Добавить адреса');
      fireEvent.click(openAddressFormButton);

      const addAddressButtons = document.querySelectorAll('.auth__button-add');
      fireEvent.click(addAddressButtons[0]);

      validAddressFormData.forEach((__, index) => {
        const { fieldName, fieldValue } = invalidAddressFormData[index];
        fireEvent.change(screen.getByLabelText(`${fieldName}`), { target: { value: `${fieldValue}` } });
      });

      const cityErrorMessage = screen.getByText(
        'Поле должно содержать хотя бы один символ и не содержать специальных символов или цифр.'
      );

      expect(cityErrorMessage).toBeInTheDocument();
    });
  });

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

  const openCountrySelectAndChoose = (
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
    openCountrySelectAndChoose(fireEvent.click, 'Бельгия (BE)');
  });

  test('open country select and choose country by keydown', () => {
    openCountrySelectAndChoose((element: Element) => fireEvent.keyDown(element, { key: 'Enter' }), 'Германия (DE)');
  });
});

describe('Register new user', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );
  });

  test('fake register new user', async () => {
    // const mockAddressesObject = {
    //   ...validAddressFormData,
    //   country: 'PL',
    // };

    // const mockTokenData: IUserTokenData = {
    //   access_token: 'mock access token',
    //   refresh_token: 'mock refresh token',
    //   expires_in: 10000,
    //   scope: 'mock scopes',
    //   token_type: 'mock token type',
    // };

    await waitFor(() => {
      addDataToFieldAndCheckBtnWorkCorrect(validRegistrationFormData, validAddressFormData, 0);
      const registerButton = screen.getByText('Зарегистрироваться');
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).not.toBeDisabled();
      // fireEvent.click(registerButton);

      // // eslint-disable-next-line global-require
      // expect(require('@/services/userAuth').register).toHaveBeenCalledWith(
      //   validRegistrationFormData[0].fieldValue, // firstName
      //   validRegistrationFormData[1].fieldValue, // lastName
      //   validRegistrationFormData[2].fieldValue, // date
      //   validRegistrationFormData[3].fieldValue, // email
      //   validRegistrationFormData[5].fieldValue, // password
      //   validRegistrationFormData[6].fieldValue, // repeate password
      //   [mockAddressesObject],
      //   0,
      //   0,
      //   0,
      //   0
      // );

      // expect(createNewUserToken).toHaveBeenCalled();
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

  test('render redirect to main page button', async () => {
    const backToMainPageButton = screen.getByText('На главную');
    fireEvent.click(backToMainPageButton);
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  test('render redirect to login page button', async () => {
    const toLoginPageButton = screen.getByText('Войти');
    fireEvent.click(toLoginPageButton);
    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });
});
