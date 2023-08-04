import './PageNav.scss';
import React, { ReactElement } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

const setActive = ({ isActive }: { isActive: boolean }): string => (isActive ? 'nav--active' : '');

export default function PageNav(): ReactElement {
  const { isUserLoggedIn, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (): void => signOut(() => navigate('/'));

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={setActive}>
            <img src="" alt="Logo" />
          </NavLink>
        </li>

        {!isUserLoggedIn && (
          <li>
            <NavLink to="/login" className={setActive}>
              Login
            </NavLink>
          </li>
        )}

        {!isUserLoggedIn && (
          <li>
            <NavLink to="/registration">Registration</NavLink>
          </li>
        )}
        {isUserLoggedIn && (
          <li>
            <button onClick={handleLogOut}>Выйти из аккаунта</button>
          </li>
        )}
        <li>
          <NavLink to="/user-profile" className={setActive}>
            Личный кабинет
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
