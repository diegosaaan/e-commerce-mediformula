import React, { ReactElement } from 'react';
import '@/components/Header/Header.scss';
import PageNav from '@/components/PageNav/PageNav';

const Header = (): ReactElement => {
  return (
    <header>
      <PageNav />
    </header>
  );
};

export default Header;
