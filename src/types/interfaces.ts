import { FormEvent, ReactElement, ReactNode } from 'react';

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
  type: 'search' | 'text' | 'password' | 'email';
  placeholder?: string;
  className: string;
  name: string;
  onChange: () => void;
}

export interface IPropsForm {
  children?: ReactNode;
  className: string;
  name: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
