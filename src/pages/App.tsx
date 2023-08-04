import './App.scss';
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/routes/AppRouter';

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
