import React from 'react';
import { IRouteData } from '@/types/interfaces';
import UserProfilePage from '@/pages/UserProfile/UserProfile';

const privateRoutesData: IRouteData[] = [
  {
    path: '/user-profile',
    element: <UserProfilePage />,
    key: 'User profile',
  },
];

export default privateRoutesData;
