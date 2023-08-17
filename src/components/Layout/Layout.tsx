import React, { ReactElement, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as userAuth from '@/services/auth-user';
import useAuth from '@/utils/hooks/useAuth';

export default function Layout(): ReactElement {
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userAuth
        .getUserInfo()
        .then((res) => {
          if (res) {
            signIn(() => navigate('/'));
          } else {
            signOut(() => navigate('/'));
          }
        })
        .catch((err) => {
          signOut(() => navigate('/'));
          console.log(`Возникла ошибка: ${err}`);
        });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
