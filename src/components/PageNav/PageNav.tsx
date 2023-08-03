import './PageNav.scss';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function PageNav(): ReactElement {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src="" alt="Logo" />
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/registration">Registration</Link>
        </li>
        <li>
          <Link to="/user-profile">Личный кабинет</Link>
        </li>
      </ul>
    </nav>
  );
}
