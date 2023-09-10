import React, { ReactElement, createContext, useEffect, useState } from 'react';
import { isUserToken, getUserToken, getUserInfoByToken } from '@/services/tokenHelpers';
import { IAuthContextValue } from '@/types/componentsInrefaces';
import { IUserInfo } from '@/types/apiInterfaces';
import ApiEndpoints from '@/enums/apiEndpoints';

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
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [isContentLoadedPageUserInfo, setContentLoadedPageUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    if (wasUserLoggedIn) {
      (async (): Promise<void> => {
        const userToken = await getUserToken('1SortUserToken', ApiEndpoints.URL_AUTH_TOKEN);
        setIsUserLoggedIn(isUserToken() && wasUserLoggedIn && userToken);
      })();
    } else {
      (async (): Promise<void> => {
        await getUserToken('1SortAnonymousToken', ApiEndpoints.URL_ANONYMOUS_TOKEN);
      })();
    }
    setContentLoaded(true);
  }, []);

  useEffect(() => {
    setContentLoadedPageUserInfo(true);
    (async (): Promise<void> => {
      if (isUserLoggedIn) {
        const fetchedUserInfo = await getUserInfoByToken();
        setUserInfo(fetchedUserInfo);
        setContentLoadedPageUserInfo(false);
      }
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
