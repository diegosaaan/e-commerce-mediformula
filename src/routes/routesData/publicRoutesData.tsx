import React from 'react';
import { IRouteData } from '@/types/interfaces';
import MainPage from '@/pages/Main/Main';
import LoginPage from '@/pages/Login/Login';
import RegistrationPage from '@/pages/Registration/Registration';

const publicRoutesData: IRouteData[] = [
  {
    path: '',
    element: <MainPage />,
    key: 'Main',
  },
  {
    path: '/login',
    element: <LoginPage />,
    key: 'Login',
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
    key: 'Registration',
  },
];

export default publicRoutesData;
