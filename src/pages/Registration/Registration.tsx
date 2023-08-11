import React, { FormEvent, ReactElement, useState } from 'react';
import '@/pages/Registration/Registration.scss';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AddressType } from '@/types/types';
import Input from '@/components/Input/Input';

function RegistrationPage(): ReactElement {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isShippingAddress, setIsShippingAddress] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    country: '',
    city: '',
    index: '',
    street: '',
  });

  const [billingAddress, setBillingAddress] = useState({
    country: '',
    city: '',
    index: '',
    street: '',
  });

  const [info, setInfo] = useState({
    firstname: '',
    lastname: '',
    date: '',
    email: '',
    password: '',
    passwordrepeat: '',
  });

  const [shippingAddresses, setShippingAddresses] = useState<AddressType[]>([]);
  const [billingAddresses, setBillingAddresses] = useState<AddressType[]>([]);

  const handleRegister = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
    setShippingAddresses((prevAddresses) => [...prevAddresses, shippingAddress]);
    setShippingAddress({
      country: '',
      city: '',
      index: '',
      street: '',
    });
  };

  const handleAddBillingAddress = (): void => {
    setIsBillingAddress(false);
    setBillingAddresses((prevAddresses) => [...prevAddresses, billingAddress]);
    setBillingAddress({
      country: '',
      city: '',
      index: '',
      street: '',
    });
  };

  const handleShippingChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBillingChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setBillingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInfoChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExampleChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      name="form-register"
      text="Уже зарегистрированы?"
      textLink="Войти"
      textButton="Зарегистрироваться"
      path="/login"
      title="Регистрация"
      isRegister={true}
      disabled={isAddAddress && true}
      isAddAddress={isAddAddress}
      handlePrevRegister={handlePrevRegister}
    >
      <ul className={`auth__list auth__list_type_main ${isAddAddress ? 'auth__list_inactive' : 'auth__list_active'}`}>
        <li>
          <AuthInput
            type="text"
            placeholder="Имя*"
            name="firstname"
            htmlFor="firstname"
            isInputPassword={false}
            onChange={handleInfoChange}
            value={info.firstname}
          />
        </li>
        <li>
          <AuthInput
            type="text"
            placeholder="Фамилия*"
            name="lastname"
            htmlFor="lastname"
            isInputPassword={false}
            onChange={handleInfoChange}
            value={info.lastname}
          />
        </li>
        <li>
          <AuthInput
            type="date"
            placeholder="Дата рождения*"
            name="date"
            htmlFor="date"
            isInputPassword={false}
            onChange={handleInfoChange}
            value={info.date}
          />
        </li>
        <li>
          <AuthInput
            type="email"
            placeholder="Email*"
            name="email"
            htmlFor="email"
            isInputPassword={false}
            textError="Неправильный email"
            onChange={handleInfoChange}
            value={info.email}
          />
        </li>
        <li>
          <AuthInput
            type="password"
            placeholder="Пароль*"
            name="password"
            htmlFor="password"
            isInputPassword={true}
            onChange={handleInfoChange}
            value={info.password}
          />
        </li>
        <li>
          <AuthInput
            type="password"
            placeholder="Повторите пароль*"
            name="passwordrepeat"
            htmlFor="passwordrepeat"
            isInputPassword={true}
            onChange={handleInfoChange}
            value={info.passwordrepeat}
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
          <h2 className="auth__subtitle">Добавьте адреса для доставок и выберите адрес по умолчанию</h2>
          {!isShippingAddress && (
            <>
              <button className="auth__button-add" type="button" onClick={handleOpenAddressShipping}></button>
              <ul className="auth__list-address">
                {shippingAddresses.map((item, index) => (
                  <li className="auth__item-address" key={index}>
                    <Input
                      className="auth__input-address"
                      classNameLabel="auth__label-address"
                      type="radio"
                      name="shipping"
                      onChange={handleExampleChange}
                      checked={true}
                    >
                      <span className="auth__span"></span>
                      <ul className="auth__list-address-value">
                        <li>Страна: {item.country}</li>
                        <li>Город: {item.city}</li>
                        <li>Индекс: {item.index}</li>
                        <li>Улица: {item.street}</li>
                      </ul>
                    </Input>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>

        {isShippingAddress && (
          <>
            <ul className="auth__list auth__list_active">
              <li>
                <AuthInput
                  type="text"
                  placeholder="Страна*"
                  name="country"
                  htmlFor="country"
                  onChange={handleShippingChange}
                  value={shippingAddress.country}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Город*"
                  name="city"
                  htmlFor="city"
                  onChange={handleShippingChange}
                  value={shippingAddress.city}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Почтовый индекс*"
                  name="index"
                  htmlFor="index"
                  onChange={handleShippingChange}
                  value={shippingAddress.index}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Улица*"
                  name="street"
                  htmlFor="street"
                  onChange={handleShippingChange}
                  value={shippingAddress.street}
                />
              </li>
            </ul>
            <button className="auth__button auth__button_type_add" type="button" onClick={handleAddShippingAddress}>
              Добавить
            </button>
          </>
        )}

        <li>
          <h2 className="auth__subtitle">Добавьте адрес для выставления счетов и выберите адрес по умолчанию</h2>
          {!isBillingAddress && (
            <>
              <button className="auth__button-add" type="button" onClick={handleOpenAddressBilling}></button>
              <ul className="auth__list-address">
                {billingAddresses.map((item, index) => (
                  <li className="auth__item-address" key={index}>
                    <Input
                      className="auth__input-address"
                      classNameLabel="auth__label-address"
                      type="radio"
                      name="billing"
                      onChange={handleExampleChange}
                      checked={true}
                    >
                      <span className="auth__span"></span>
                      <ul className="auth__list-address-value">
                        <li>Страна: {item.country}</li>
                        <li>Город: {item.city}</li>
                        <li>Индекс: {item.index}</li>
                        <li>Улица: {item.street}</li>
                      </ul>
                    </Input>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>

        {isBillingAddress && (
          <>
            <ul className="auth__list auth__list_active">
              <li>
                <AuthInput
                  type="text"
                  placeholder="Страна*"
                  name="country"
                  htmlFor="country"
                  onChange={handleBillingChange}
                  value={billingAddress.country}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Город*"
                  name="city"
                  htmlFor="city"
                  onChange={handleBillingChange}
                  value={billingAddress.city}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Почтовый индекс*"
                  name="index"
                  htmlFor="index"
                  onChange={handleBillingChange}
                  value={billingAddress.index}
                />
              </li>
              <li>
                <AuthInput
                  type="text"
                  placeholder="Улица*"
                  name="street"
                  htmlFor="street"
                  onChange={handleBillingChange}
                  value={billingAddress.street}
                />
              </li>
            </ul>
            <button className="auth__button auth__button_type_add" type="button" onClick={handleAddBillingAddress}>
              Добавить
            </button>
          </>
        )}
      </ul>
    </AuthForm>
  );
}

export default RegistrationPage;
