import React, { ReactElement } from 'react';
import Input from '@/components/Input/Input';
import { IPropsListAddress } from '@/types/interfaces';

const ListAddress = ({ addresses, name, onChange }: IPropsListAddress): ReactElement => {
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
              <li>Индекс: {item.index}</li>
              <li>Улица: {item.street}</li>
            </ul>
          </Input>
        </li>
      ))}
    </ul>
  );
};

export default ListAddress;
