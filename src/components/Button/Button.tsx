import React, { ReactElement } from 'react';
import '@/components/Button/Button.scss';
import { IPropsButton } from '@/types/componentsInrefaces';
import useAuth from '@/utils/hooks/useAuth';

const Button = ({ type, text, onClick, className, children }: IPropsButton): ReactElement => {
  const { isContentLoaded } = useAuth();

  return (
    <>
      <button className={className} type={type} onClick={onClick} disabled={!isContentLoaded}>
        {text}
        {children}
      </button>
    </>
  );
};

export default Button;
