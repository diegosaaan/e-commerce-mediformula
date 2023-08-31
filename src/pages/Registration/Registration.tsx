import '@/pages/Registration/Registration.scss';
import { Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { AddressType, RegisterSchemaType } from '@/types/types';
import { createNewUserToken, saveUserToken } from '@/services/tokenHelpers';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import ListAddress from '@/pages/Registration/components/ListAddress/ListAddress';
import AddressFields from '@/pages/Registration/components/AddressFields/AddressFields';
import { RegisterSchema } from '@/utils/helpers/yup/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import { register } from '@/services/userAuth';
import { IUserTokenData } from '@/types/apiInterfaces';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import getMinDateForRegister from '@/utils/helpers/getMinDateForRegister';

const RegistrationPage = (): ReactElement => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isShippingAddress, setIsShippingAddress] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [shippingState, setShippingState] = useState({
    countryValue: 'Польша (PL)',
    cityValue: '',
    isCityError: true,
    streetValue: '',
    isStreetError: true,
    postalCodeValue: '',
    isPostalCodeError: true,
  });

  const [billingState, setBillingState] = useState({
    countryValue: 'Польша (PL)',
    cityValue: '',
    isCityError: true,
    streetValue: '',
    isStreetError: true,
    postalCodeValue: '',
    isPostalCodeError: true,
  });

  const [shippingAddresses, setShippingAddresses] = useState<AddressType[]>([]);
  const [billingAddresses, setBillingAddresses] = useState<AddressType[]>([]);

  const handleRegister = async (values: RegisterSchemaType): Promise<void> => {
    const uniqueArray = Array.from(
      new Set([...shippingAddresses, ...billingAddresses].map((item) => JSON.stringify(item)))
    ).map((i) => JSON.parse(i));

    let shippingJson: string;
    let billingJson: string;
    let indexShipping;
    let indexBilling;

    if (values.shipping !== '') {
      shippingJson = JSON.stringify(shippingAddresses[Number(values.shipping)]);
      indexShipping = uniqueArray.findIndex((item) => JSON.stringify(item) === shippingJson);
    } else {
      indexShipping = values.shipping;
    }

    if (values.billing !== '') {
      billingJson = JSON.stringify(billingAddresses[Number(values.billing)]);
      indexBilling = uniqueArray.findIndex((item) => JSON.stringify(item) === billingJson);
    } else {
      indexBilling = values.billing;
    }

    const indexesOfShipping = shippingAddresses.map((address) => {
      const jsonStringShipping = JSON.stringify(address);
      const indexInUniqueArray = uniqueArray.findIndex(
        (jsonString) => JSON.stringify(jsonString) === jsonStringShipping
      );
      return indexInUniqueArray;
    });

    const indexesOfBilling = billingAddresses.map((address) => {
      const jsonStringShipping = JSON.stringify(address);
      const indexInUniqueArray = uniqueArray.findIndex(
        (jsonString) => JSON.stringify(jsonString) === jsonStringShipping
      );
      return indexInUniqueArray;
    });

    const { email, firstName, lastName, password, date } = values;

    try {
      await register(
        email,
        firstName,
        lastName,
        password,
        date,
        uniqueArray,
        indexShipping,
        indexBilling,
        indexesOfShipping,
        indexesOfBilling
      );
      const tokenData: IUserTokenData | unknown = await createNewUserToken(values.email, values.password);
      if (tokenData !== null && typeof tokenData === 'object') {
        message.info({
          content: 'Регистрация прошла успешно!',
        });
        signIn(() => navigate('/'));
        saveUserToken(tokenData as IUserTokenData);
      }
    } catch (error: unknown) {
      const err = error as { response: { data: { statusCode: number; message: string } } };
      if (err.response && err.response.data) {
        const { statusCode, message: errorMessage } = err.response.data;
        handleErrors(statusCode, errorMessage);
      }
    }
  };

  const handleAddAddresses = (): void => {
    setIsAddAddress(true);
  };

  const handlePrevRegister = (): void => {
    setIsAddAddress(false);
    setIsShippingAddress(false);
    setIsBillingAddress(false);
  };

  const handleOpenAddressShipping = (): void => {
    setIsShippingAddress(true);
  };

  const handleOpenAddressBilling = (): void => {
    setIsBillingAddress(true);
  };

  const handleAddShippingAddress = (): void => {
    setIsShippingAddress(false);
    const countryMatch = shippingState.countryValue.match(/\((.*?)\)/);
    const country = countryMatch ? countryMatch[1] : '';
    setShippingAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        country,
        city: shippingState.cityValue,
        postalCode: shippingState.postalCodeValue,
        streetName: shippingState.streetValue,
      },
    ]);
  };

  const handleAddBillingAddress = (): void => {
    setIsBillingAddress(false);
    const countryMatch = billingState.countryValue.match(/\((.*?)\)/);
    const country = countryMatch ? countryMatch[1] : '';
    setBillingAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        country,
        city: billingState.cityValue,
        postalCode: billingState.postalCodeValue,
        streetName: billingState.streetValue,
      },
    ]);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        date: `${getMinDateForRegister()}`,
        email: '',
        password: '',
        passwordRepeat: '',
        shipping: '',
        billing: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({ values, errors, touched, handleChange, dirty }): JSX.Element => (
        <AuthForm
          name="form-register"
          text="Уже зарегистрированы?"
          textLink="Войти"
          textButton="Зарегистрироваться"
          path="/login"
          title="Регистрация"
          isRegister={true}
          disabled={
            !dirty ||
            !!(
              errors.firstName ||
              errors.lastName ||
              errors.date ||
              errors.email ||
              errors.password ||
              errors.passwordRepeat
            )
          }
          isAddAddress={isAddAddress}
          handlePrevRegister={handlePrevRegister}
        >
          <ul
            className={`auth__list auth__list_type_main ${isAddAddress ? 'auth__list_inactive' : 'auth__list_active'}`}
          >
            <li>
              <AuthInput
                type="text"
                placeholder="Имя*"
                name="firstName"
                htmlFor="firstName"
                isInputPassword={false}
                value={values.firstName}
                errors={errors.firstName}
                touched={touched.firstName}
                onChange={handleChange}
              />
            </li>
            <li>
              <AuthInput
                type="text"
                placeholder="Фамилия*"
                name="lastName"
                htmlFor="lastName"
                isInputPassword={false}
                value={values.lastName}
                errors={errors.lastName}
                touched={touched.lastName}
                onChange={handleChange}
              />
            </li>
            <li>
              <AuthInput
                type="date"
                placeholder="Дата рождения*"
                name="date"
                htmlFor="date"
                isInputPassword={false}
                onChange={handleChange}
                value={values.date}
                errors={errors.date}
                touched={touched.date}
              />
            </li>
            <li>
              <AuthInput
                type="text"
                placeholder="Email*"
                name="email"
                htmlFor="email"
                isInputPassword={false}
                onChange={handleChange}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
              />
            </li>
            <li>
              <AuthInput
                type="password"
                placeholder="Пароль*"
                name="password"
                htmlFor="password"
                isInputPassword={true}
                onChange={handleChange}
                value={values.password}
                errors={errors.password}
                touched={touched.password}
              />
            </li>
            <li>
              <AuthInput
                type="password"
                placeholder="Повторите пароль*"
                name="passwordRepeat"
                htmlFor="passwordRepeat"
                isInputPassword={true}
                onChange={handleChange}
                value={values.passwordRepeat}
                errors={errors.passwordRepeat}
                touched={touched.passwordRepeat}
              />
            </li>
          </ul>

          {!isAddAddress && (
            <>
              <button className="auth__button auth__button_type_add" type="button" onClick={handleAddAddresses}>
                Добавить адреса
              </button>
            </>
          )}

          <ul className={`auth__list ${isAddAddress ? 'auth__list_active' : 'auth__list_inactive'}`}>
            <li>
              <h2 className="auth__subtitle">Добавьте адреса для доставок</h2>
              {!isShippingAddress && (
                <>
                  <button className="auth__button-add" type="button" onClick={handleOpenAddressShipping}></button>
                  <ListAddress
                    name="shipping"
                    onChange={handleChange}
                    addresses={shippingAddresses}
                    setAddresses={setShippingAddresses}
                    setAddressesAnother={setBillingAddresses}
                    isAddress={isBillingAddress}
                  />
                  <p className="auth__help">
                    Чтобы выбрать адрес для доставки по умолчанию кликните на карточку с адресом
                  </p>
                </>
              )}
            </li>

            {isShippingAddress && (
              <>
                <AddressFields
                  onChange={handleChange}
                  name="shipping"
                  addressesState={shippingState}
                  setAddressesState={setShippingState}
                />
                <button
                  className="auth__button auth__button_type_add"
                  type="button"
                  disabled={
                    !!(shippingState.isPostalCodeError || shippingState.isCityError || shippingState.isStreetError)
                  }
                  onClick={(): void => handleAddShippingAddress()}
                >
                  Добавить
                </button>
              </>
            )}

            <li>
              <h2 className="auth__subtitle">Добавьте адреса для выставления счетов</h2>
              {!isBillingAddress && (
                <>
                  <button className="auth__button-add" type="button" onClick={handleOpenAddressBilling}></button>
                  <ListAddress
                    name="billing"
                    onChange={handleChange}
                    addresses={billingAddresses}
                    setAddresses={setBillingAddresses}
                    setAddressesAnother={setShippingAddresses}
                    isAddress={isShippingAddress}
                  />
                  <p className="auth__help">
                    Чтобы выбрать адрес для выставления счета по умолчанию кликните на карточку с адресом
                  </p>
                </>
              )}
            </li>

            {isBillingAddress && (
              <>
                <AddressFields
                  onChange={handleChange}
                  name="billing"
                  addressesState={billingState}
                  setAddressesState={setBillingState}
                />
                <button
                  className="auth__button auth__button_type_add"
                  type="button"
                  disabled={
                    !!(billingState.isPostalCodeError || billingState.isCityError || billingState.isStreetError)
                  }
                  onClick={(): void => handleAddBillingAddress()}
                >
                  Добавить
                </button>
              </>
            )}
          </ul>
        </AuthForm>
      )}
    </Formik>
  );
};

export default RegistrationPage;
