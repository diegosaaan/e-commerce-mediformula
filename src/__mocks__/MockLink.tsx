import React, { ReactElement } from 'react';

const MockLink = {
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }: { to: string; children: React.ReactNode }): ReactElement => <a href={to}>{children}</a>,
};

export default MockLink;
