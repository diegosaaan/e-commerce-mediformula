import React, { ReactElement } from 'react';
import '@/pages/Registration/Registration.scss';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationPage(): ReactElement {
  const navigate = useNavigate();
  const goBack = (): void => navigate(-1);

  return (
    <div className="registration-page">
      <h1>Страница регистрации</h1>
      <button onClick={goBack}>Вернуться назад</button>
      <form action="">
        <input type="text" placeholder="Введите имя..." />
        <input type="text" placeholder="Введите фамилию..." />
      </form>
      <p>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
