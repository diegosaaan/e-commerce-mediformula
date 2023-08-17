import { ReactElement, ReactNode } from 'react';

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

export interface IPropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className: string;
  onClick: () => void;
}

export interface IPropsIntroCard {
  header: string;
  iconPath: string;
  text: string;
  label: string;
}

export interface IPropsCard {
  imagePath: string;
  rating: number;
  text: string;
  price: number;
  priceBefore?: number;
  bonus?: number;
  discount?: number;
  onClick: () => void;
}

export interface IPropsTag {
  title: string;
}

export interface IPropsCarousel {
  children: ReactNode;
  cardWidth: number;
}

export interface IPropsCardsSection {
  header: string;
  counter: number;
  sectionClassName: string;
  products?: IPropsProduct[];
}

export interface IPropsProduct {}
