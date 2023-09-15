import React, { ReactElement, createContext, useEffect, useState } from 'react';
import { isUserToken, getUserToken, getUserInfoByToken } from '@/services/tokenHelpers';
import { IAuthContextValue } from '@/types/componentsInrefaces';
import { ICart, IUserInfo } from '@/types/apiInterfaces';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getActiveCart } from '@/services/cart';

const defaultAuthContextValue: IAuthContextValue = {
  isUserLoggedIn: false,
  isContentLoaded: false,
  isContentLoadedPageUserInfo: false,
  signIn: () => {},
  signOut: () => {},
  userInfo: null,
  setUserInfo: () => {},
  userCart: null,
  setUserCart: () => {},
};

export const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const wasUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false');
  const userTokenLocalStorage = localStorage.getItem('1SortUserToken');
  const anonymousTokenLocalStorage = localStorage.getItem('1SortAnonymousToken');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(wasUserLoggedIn);
  const [isContentLoaded, setContentLoaded] = useState(false);
  const [isContentLoadedPageUserInfo, setContentLoadedPageUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [userCart, setUserCart] = useState<ICart | null>(null);

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
      try {
        if (isUserLoggedIn) {
          const fetchedUserInfo = await getUserInfoByToken();
          setUserInfo(fetchedUserInfo);
          setContentLoadedPageUserInfo(false);
        }
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    })();

    (async (): Promise<void> => {
      try {
        if (userTokenLocalStorage) {
          const activeCart = await getActiveCart(true);
          setUserCart(activeCart);
        } else if (anonymousTokenLocalStorage) {
          const activeCart = await getActiveCart(false);
          setUserCart(activeCart);
        } else {
          setUserCart(null);
        }
      } catch (error) {
        console.error('Произошла ошибка:', error);
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
    userCart,
    setUserCart,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
