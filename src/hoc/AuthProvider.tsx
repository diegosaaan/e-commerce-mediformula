import React, { ReactElement, createContext, useEffect, useState } from 'react';
import { isUserToken, getUserToken } from '@/services/tokenHelpers';
import { IAuthContextValue } from '@/types/componentsInrefaces';

const defaultAuthContextValue: IAuthContextValue = {
  isUserLoggedIn: false,
  isContentLoaded: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const wasUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserToken() && wasUserLoggedIn);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isContentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      if (wasUserLoggedIn) {
        setIsUserLoggedIn(isUserToken() && wasUserLoggedIn ? await getUserToken() : false);
      }
      setContentLoaded(true);
    };

    window.addEventListener('load', loadData, { once: true });
  }, [wasUserLoggedIn, isUserToken, getUserToken, setIsUserLoggedIn]);

  const signIn = (cb: () => void): void => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));
    setIsUserLoggedIn(true);
    cb();
  };

  const signOut = (cb: () => void): void => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(false));
    setIsUserLoggedIn(false);
    cb();
  };

  const value: IAuthContextValue = { isUserLoggedIn, isContentLoaded, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
