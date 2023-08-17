import React, { ReactElement, createContext, useState } from 'react';
import { IAuthContextValue } from '@/types/interfaces';

const defaultAuthContextValue: IAuthContextValue = {
  isUserLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export function AuthProvider({ children }: { children: ReactElement }): ReactElement {
  const [isUserLoggedIn, setUser] = useState(JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false'));

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
}
