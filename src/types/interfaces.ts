import React, { ReactElement } from 'react';

export interface IRouteData {
  key: string;
  path: string;
  element: ReactElement;
}

export interface IAuthContextValue {
  isUserLoggedIn: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
}

export interface IAccordionProps {
  sectionName: string;
  listName: string;
  title: string;
  children: ReactElement;
  isOpen: boolean;
  onToogleAccordion: (event: React.KeyboardEvent | React.MouseEvent) => void;
}
