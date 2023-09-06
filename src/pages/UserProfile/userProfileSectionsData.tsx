import React from 'react';
import EditAddresses from './components/EditAddresses';
import EditPassword from './components/EditPassword';
import EditUserData from './components/EditUserData';

const userProfileSectionsData = [
  { id: 'userData', label: 'Личные данные', component: <EditUserData /> },
  { id: 'addresses', label: 'Изменить адреса', component: <EditAddresses /> },
  { id: 'password', label: 'Изменить пароль', component: <EditPassword /> },
];

export default userProfileSectionsData;
