import React, { ReactElement, useState } from 'react';
import { notification, message } from 'antd';
import '@/pages/Registration/Registration.scss';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AddressType, RegisterSchemaType } from '@/types/types';
import ListAddress from '@/pages/Registration/components/ListAddress/ListAddress';
import AddressFields from '@/pages/Registration/components/AddressFields/AddressFields';
import { RegisterSchema } from '@/utils/helpers/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import * as userAuth from '@/services/auth-user';
import exit from '@/assets/images/svg/auth-exit.svg';

const RegistrationPage = (): ReactElement => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  notification.config({
    maxCount: 5,
    placement: 'bottomLeft',
    duration: 10,
    closeIcon: (
      <span className="ant-notification-close-x">
        <span role="img" aria-label="close" className="anticon anticon-close ant-notification-close-icon">
          <img className="auth__exit-btn" src={exit} alt="close" />
        </span>
      </span>
    ),
  });

  message.config({
    duration: 2,
    maxCount: 1,
  });

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

  const handleRegister = (values: RegisterSchemaType): void => {
    const uniqueArray = Array.from(
      new Set([...shippingAddresses, ...billingAddresses].map((item) => JSON.stringify(item)))
    ).map((i) => JSON.parse(i));
    const objShipping = shippingAddresses[Number(values.shipping)];
    const objBilling = billingAddresses[Number(values.billing)];

    const shippingJson = JSON.stringify(objShipping);
    const indexShipping = uniqueArray.findIndex((item) => JSON.stringify(item) === shippingJson);

    const billingJson = JSON.stringify(objBilling);
    const indexBilling = uniqueArray.findIndex((item) => JSON.stringify(item) === billingJson);

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
    userAuth
      .register(
        values.email,
        values.firstName,
        values.lastName,
        values.password,
        values.date,
        uniqueArray,
        indexShipping,
        indexBilling,
        indexesOfShipping,
        indexesOfBilling
      )
      .then((res) => {
        userAuth
          .getToken(values.email, values.password)
          .then((result) => {
            if (result !== null && typeof result === 'object' && 'access_token' in result) {
              const accessToken: string = result.access_token as string;
              console.log(result);
              message.info({
                content: 'Регистрация прошла успешно!',
              });
              signIn(() => navigate('/'));
              localStorage.setItem('token', String(accessToken));
            }
          })
          .catch((err) => console.log(`Возникла ошибка: ${err}`));
        console.log(res);
      })
      .catch((err) => {
        if (err === 400) {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: (
              <p className="auth__notification">
                Пользователь с таким email уже существует!
                <a className="auth__link auth__link_type_notification" href="/login">
                  {' '}
                  Войдите{' '}
                </a>
                на сайт либо введите другой email
              </p>
            ),
          });
        } else if (err === 500) {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: <p className="auth__notification">500 Ошибка сервера, повторите запрос позднее</p>,
          });
        } else {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: <p className="auth__notification">При регистрации возникла ошибка</p>,
          });
        }
        console.log(`Возникла ошибка: ${err}`);
      });
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
        date: '',
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
              errors.passwordRepeat ||
              errors.shipping ||
              errors.billing
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
                type="email"
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
                  />
                  <p className="auth__input-error">{errors.shipping && errors.shipping}</p>
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
                  />
                  <p className="auth__input-error">{errors.billing && errors.billing}</p>
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
