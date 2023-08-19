import '@/pages/Registration/components/ListAddress/ListAddress.scss';
import React, { ReactElement } from 'react';
import Input from '@/components/Input/Input';
import { IPropsListAddress } from '@/types/componentsInrefaces';

const ListAddress = ({
  addresses,
  name,
  onChange,
  setAddresses,
  setAddressesAnother,
  isAddress,
}: IPropsListAddress): ReactElement => {
  const handleDeleteAddress = (index: number): void => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    if (setAddresses) {
      setAddresses(updatedAddresses);
    }
  };

  const handleCopyAddress = (index: number): void => {
    if (setAddressesAnother) {
      setAddressesAnother((prevAddresses) => [...prevAddresses, addresses[index]]);
    }
  };

  return (
    <ul className="auth__list-address">
      {addresses.map((item, index) => (
        <li className="auth__item-address" key={index}>
          <Input
            className="auth__input-address"
            classNameLabel="auth__label-address"
            type="radio"
            name={name}
            onChange={onChange}
            value={String(index)}
          >
            <span className="auth__span"></span>
            <ul className="auth__list-address-value">
              <li>Страна: {item.country}</li>
              <li>Город: {item.city}</li>
              <li>Индекс: {item.postalCode}</li>
              <li>Улица: {item.streetName}</li>
            </ul>
          </Input>
          <div className="auth__item-container">
            {!isAddress && addresses.length !== 1 && (
              <button
                className="auth__button-delete"
                type="button"
                onClick={(): void => handleDeleteAddress(index)}
              ></button>
            )}
            {!isAddress && (
              <button
                className="auth__button-copy"
                type="button"
                onClick={(): void => handleCopyAddress(index)}
              ></button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListAddress;
