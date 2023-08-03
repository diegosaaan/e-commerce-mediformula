import './App.scss';
import React, { ReactElement } from 'react';
import AppRouter from '@/routes/AppRouter';

export default function App(): ReactElement {
  return (
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}
