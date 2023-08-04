import { ReactElement } from 'react';

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
