import { FormEvent, ReactElement, ReactNode } from 'react';
import { AddressType } from './types';

export interface IRouteData {
  key: string;
  path: string;
  element: ReactElement;
}

export interface IAuthContextValue {
  isUserLoggedIn: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
}

export interface IPropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className: string;
  onClick?: () => void;
}

export interface IPropsInput {
  type: 'search' | 'text' | 'password' | 'email' | 'radio';
  placeholder?: string;
  className: string;
  classNameLabel?: string;
  title?: string;
  name: string;
  children?: ReactNode;
  checked?: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IPropsForm {
  children?: ReactNode;
  className: string;
  name: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IPropsAuthInput {
  type: 'search' | 'text' | 'password' | 'email' | 'date' | 'radio';
  placeholder?: string;
  name: string;
  htmlFor: string;
  isInputPassword?: boolean;
  textError?: string;
  value?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IPropsAuthForm {
  children?: ReactNode;
  name: string;
  title: string;
  text: string;
  textLink: string;
  textButton: string;
  path: string;
  isRegister?: boolean;
  disabled?: boolean;
  isAddAddress?: boolean;
  handlePrevRegister?: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IPropsListAddress {
  name: string;
  addresses: AddressType[];
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IPropsAddressFields {
  address: AddressType;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}
