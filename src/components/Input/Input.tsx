import React, { ReactElement } from 'react';
import '@/components/Input/Input.scss';
import { IPropsInput } from '@/types/interfaces';

const Input = ({ className, type, placeholder, name, onChange }: IPropsInput): ReactElement => {
  return (
    <>
      <input className={className} type={type} placeholder={placeholder} name={name} onChange={onChange} />
    </>
  );
};

export default Input;
