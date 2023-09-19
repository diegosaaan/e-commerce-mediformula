import './AboutUs.scss';
import React, { ReactElement } from 'react';

const AboutUsPage = (): ReactElement => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="_container about-page">
      <section className="about-page__intro">
        <div className="about-page__intro-first">
          <p className="about-page__intro-text">
            Наше e-Commerce приложение разрабатывается и поддерживается командой из трёх талантливых разработчиков. Наша
            команда успешно завершила проект благодаря эффективному сотрудничеству и четкому разделению обязанностей.
            Регулярные созвоны и взаимная проверка работы позволили нам оперативно находить и устранять баги. Каждый
            член команды активно участвовал в обсуждении задач и предлагал конструктивные решения. Эта координированная
            работа обеспечила качественное и своевременное выполнение проекта.
            <br />
            <br />
            Мы также хотим выразить нашу искреннюю благодарность двум замечательным менторам, которые предоставили
            неоценимую помощь и поддержку на протяжении всего обучения -
            <a href="https://github.com/artsiomfando">
              <span className="about-page__mentors"> Артём Фандо </span>
            </a>
            и
            <a href="https://github.com/malyshkin-vitali">
              <span className="about-page__mentors"> Виталий Малышкин</span>
            </a>
            .
          </p>
          <a className="about-page__intro-logo" href="https://rs.school/">
            <span className="about-page__school-icon"></span>
            <span className="about-page__school-hover-icon"></span>
          </a>
        </div>
      </section>
      <section>
        <h2 className="about-page__title-about">Наша команда</h2>

        <article className="about-page__person-section">
          <div className="about-page__person-photo photo-aleksandr"></div>
          <div className="about-page__person-info">
            <h3 className="about-page__bio-heading">Александр</h3>
            <p className="about-page__bio-role">Тимлид</p>
            <div className="about-page__bio-text-block">
              <p className="about-page__bio-text">
                Александр завершил бакалавриат по специальности "Промышленное и гражданское строительство" и продолжил
                обучение на магистратуре. В сентябре 2022 года он записался на подготовительный курс в Rolling Scope
                School, и, успешно завершив его в декабре, записался уже на основной поток. Сейчас Александр вглублен в
                работу над крутым e-Commerce проектом вместе с командой единомышленников. Он сосредоточен на скорости
                внедрения новых фич и повышении удобства использования продукта. Его цель - получение первого оффера в
                сфере front-end разработки, а после получения реального практического опыта он надеется вернуться в
                Rolling Scope School в качестве ментора. Александр стремится делиться своим опытом и знаниями, чтобы
                помочь новым поколениям разработчиков сделать свои первые шаги в этой динамично развивающейся отрасли.
              </p>
              <p className="about-page__bio-text">В проекте Александр работал над:</p>
              <ul>
                <li className="about-page__bio-list">настройка репозитория и доски задач</li>
                <li className="about-page__bio-list">реализация роутинга между страницами приложения</li>
                <li className="about-page__bio-list">реализация страницы 404</li>
                <li className="about-page__bio-list">обработка токена аутентификации</li>
                <li className="about-page__bio-list">
                  дизайн футера приложения, дизайн секций бренды, преимущества, услуги, медиа
                </li>
                <li className="about-page__bio-list">реализация страницы каталога</li>
                <li className="about-page__bio-list">
                  реализация функций фильтрации, сортировки и поиска товаров в каталоге
                </li>
                <li className="about-page__bio-list">
                  реализация навигации между различными категориями и подкатегориями продуктов с помощью API
                  CommerceTools
                </li>
                <li className="about-page__bio-list">реализация страницы корзины, интеграция с API CommerceTools</li>
              </ul>
            </div>
            <a href="https://github.com/DiegoKitty" className="about-page__social">
              <span className="about-page__social-icon"></span>
              <span className="about-page__social-link">@DiegoKitty</span>
            </a>
          </div>
        </article>

        <article className="about-page__person-section about-page__person-section--reverse">
          <div className="about-page__person-photo photo-evgeniya"></div>
          <div className="about-page__person-info">
            <h3 className="about-page__bio-heading">Евгения</h3>
            <p className="about-page__bio-role">Разработчик</p>
            <div className="about-page__bio-text-block">
              <p className="about-page__bio-text">
                Евгения обладает магистерской степенью в области химической технологии и начала свою карьеру в сфере
                защиты от незаконного копирования интеллектуальной собственности в интернете. Опыт в тестировании
                приложений предоставил ей ценное понимание IT-сферы. После профессиональной переподготовки по программе
                "Full-stack программирование" Евгения обнаружила свою страсть к фронтенд-разработке. Пройдя
                подготовительный этап в RS School, она сейчас завершает основной курс обучения. Её основной фокус —
                создание интуитивно понятных пользовательских интерфейсов, которые улучшают опыт взаимодействия
                пользователей с продуктом.
              </p>
              <p className="about-page__bio-text">В проекте Евгения работала над:</p>
              <ul>
                <li className="about-page__bio-list">настройка среды разработки</li>
                <li className="about-page__bio-list">реализация страниц регистрации и логина</li>
                <li className="about-page__bio-list">
                  внедрение проверки на стороне клиента для полей в регистрационной форме
                </li>
                <li className="about-page__bio-list">внедрение проверки на стороне клиента для полей в форме логина</li>
                <li className="about-page__bio-list">интеграция профиля пользователя с CommerceTools</li>
                <li className="about-page__bio-list">дизайн хедера приложения</li>
                <li className="about-page__bio-list">реализация страницы профиля пользователя</li>
                <li className="about-page__bio-list">реализация функции изменения данных пользователя</li>
                <li className="about-page__bio-list">реализация страницы корзины, интеграция с API CommerceTools</li>
              </ul>
            </div>
            <a href="https://github.com/evgeniiyar" className="about-page__social">
              <span className="about-page__social-icon"></span>
              <span className="about-page__social-link">@evgeniiyar</span>
            </a>
          </div>
        </article>

        <article className="about-page__person-section">
          <div className="about-page__person-photo photo-julia"></div>
          <div className="about-page__person-info">
            <h3 className="about-page__bio-heading">Юлия</h3>
            <p className="about-page__bio-role">Разработчик</p>
            <div className="about-page__bio-text-block">
              <p className="about-page__bio-text">
                Юлия — выпускница БНТУ по экологическому менеджменту и аудиту, с десятилетним стажем инженера-эколога в
                промышленном строительстве. Свой путь в IT Юлия начала как дизайнер интерфейсов и постепенно увлеклась
                написанием кода. В декабре 2022 года Юлия начала обучение в Rolling Scope School и за это время успела
                поработать над несколькими проектами. Юлия любит решать задачи, которые помогают превратить идеи в
                реальные продукты, с которыми люди могут взаимодействовать. Она не боится сложных задач и стремится
                работать над проектами, которые будут стимулировать ее рост как специалиста.
              </p>
              <p className="about-page__bio-text">В проекте Юлия работала над:</p>
              <ul>
                <li className="about-page__bio-list">настройка проекта на CommerceTools и API клиента</li>
                <li className="about-page__bio-list">
                  дизайн секций интро, популярные продукты и популярные категории
                </li>
                <li className="about-page__bio-list">интеграция секции популярные продукты с CommerceTools</li>
                <li className="about-page__bio-list">реализация страницы детального описания продукта</li>
                <li className="about-page__bio-list">
                  реализация модального окна для увеличенного изображения продукта со слайдером
                </li>
                <li className="about-page__bio-list">реализация страницы о нас</li>
              </ul>
            </div>
            <a href="https://github.com/JuliaHoladava" className="about-page__social">
              <span className="about-page__social-icon"></span>
              <span className="about-page__social-link">@JuliaHoladava</span>
            </a>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AboutUsPage;
