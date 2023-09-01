import React, { ReactElement, createContext, useEffect, useState } from 'react';
import { isUserToken, getUserToken, getUserInfoByToken } from '@/services/tokenHelpers';
import { IAuthContextValue } from '@/types/componentsInrefaces';
import { IUserInfo } from '@/types/apiInterfaces';

const defaultAuthContextValue: IAuthContextValue = {
  isUserLoggedIn: false,
  isContentLoaded: false,
  isContentLoadedPageUserInfo: false,
  signIn: () => {},
  signOut: () => {},
  userInfo: null,
  setUserInfo: () => {},
};

export const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const wasUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(wasUserLoggedIn);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [isContentLoadedPageUserInfo, setContentLoadedPageUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    if (wasUserLoggedIn) {
      (async (): Promise<void> => {
        const userToken = await getUserToken();
        setIsUserLoggedIn(isUserToken() && wasUserLoggedIn && userToken);
      })();
    }
    setContentLoaded(true);
  }, []);

  useEffect(() => {
    setContentLoadedPageUserInfo(true);
    (async (): Promise<void> => {
      const fetchedUserInfo = await getUserInfoByToken();
      setUserInfo(fetchedUserInfo);
      setContentLoadedPageUserInfo(false);
    })();
  }, [isUserLoggedIn]);

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

  const value: IAuthContextValue = {
    isUserLoggedIn,
    isContentLoaded,
    isContentLoadedPageUserInfo,
    signIn,
    signOut,
    userInfo,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
