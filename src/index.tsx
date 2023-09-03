import '@/index.scss';
import '@/pages/App.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';
import router from './routes/router';
import { AuthProvider } from './hoc/AuthProvider';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
Modal.setAppElement('#root');
