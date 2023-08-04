import React, { ReactElement } from 'react';
import '@/components/Button/Button.scss';
import { IPropsButton } from '@/types/interfaces';

const Button = ({ type, text, onClick, className, children }: IPropsButton): ReactElement => {
  return (
    <>
      <button className={className} type={type} onClick={onClick}>
        {text}
        {children}
      </button>
    </>
  );
};

export default Button;
