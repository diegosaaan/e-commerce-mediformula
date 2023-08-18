import React, { ReactElement, createContext, useState } from 'react';
import { isUserToken, isTokenActive } from '@/services/tokenHelpers';
import { IAuthContextValue } from '@/types/componentsInrefaces';

const defaultAuthContextValue: IAuthContextValue = {
  isUserLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const wasUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false');

  const [isUserLoggedIn, setUser] = useState(isUserToken() && wasUserLoggedIn ? isTokenActive() : false);

  const signIn = (cb: () => void): void => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));
    setUser(true);
    cb();
  };

  const signOut = (cb: () => void): void => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(false));
    setUser(false);
    cb();
  };

  const value: IAuthContextValue = { isUserLoggedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
