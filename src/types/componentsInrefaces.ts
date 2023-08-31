import { MouseEvent, KeyboardEvent, FormEvent, ReactElement, ReactNode, Dispatch } from 'react';
import { ObjectSchema } from 'yup';
import { AddressType, LoginSchemaType } from './types';
import { IUserInfo } from './apiInterfaces';

export interface IAuthContextValue {
  isUserLoggedIn: Promise<boolean> | boolean;
  isContentLoaded: boolean;
  isContentLoadedPageUserInfo: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
  userInfo: IUserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
}

export interface IAccordionProps {
  sectionName: string;
  listName: string;
  title: string;
  children: ReactElement[];
  isOpen: boolean;
  onClickAccordion: (event: MouseEvent) => void;
  onKeydownAccordion?: (event: KeyboardEvent) => void;
}

export interface IPropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className: string;
  onClick?: () => void;
}

export interface IPropsInput {
  type: 'search' | 'text' | 'password' | 'email' | 'radio';
  placeholder?: string;
  className: string;
  classNameLabel?: string;
  title?: string;
  name: string;
  children?: ReactNode;
  checked?: boolean;
  value?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IPropsForm {
  children?: ReactNode;
  className: string;
  name: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IMediaItemData {
  heading: string;
  date: string;
  link: string;
  img?: string;
  videoPreviewImg?: string;
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
  id?: number;
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

export interface IPropsAuthInput {
  type: string;
  placeholder?: string;
  name: string;
  htmlFor: string;
  isInputPassword?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  errors?: string;
  touched?: boolean;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IPropsAuthForm {
  children?: ReactNode;
  name: string;
  title: string;
  text: string;
  textLink: string;
  textButton: string;
  path: string;
  isRegister?: boolean;
  disabled?: boolean;
  isAddAddress?: boolean;
  validationSchema?: ObjectSchema<LoginSchemaType>;
  initialValues?: LoginSchemaType;
  handlePrevRegister?: () => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IPropsListAddress {
  name: string;
  addresses: AddressType[];
  value?: string;
  setAddresses?: React.Dispatch<React.SetStateAction<AddressType[]>>;
  setAddressesAnother?: React.Dispatch<React.SetStateAction<AddressType[]>>;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  isAddress?: boolean;
}

export interface IAuthAddressesState {
  countryValue: string;
  cityValue: string;
  isCityError: boolean;
  streetValue: string;
  isStreetError: boolean;
  postalCodeValue: string;
  isPostalCodeError: boolean;
}

export interface IPropsAddressFields {
  name: string;
  addressesState: IAuthAddressesState;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  setAddressesState: Dispatch<React.SetStateAction<IAuthAddressesState>>;
}

export interface IPropsPopupAddress {
  addressesState: IAuthAddressesState;
  setAddressesState: Dispatch<React.SetStateAction<IAuthAddressesState>>;
  isOpenPopup: boolean;
  setIsOpenPopup: Dispatch<React.SetStateAction<boolean>>;
  address: string;
  initialState?: {
    countryValueInitial: string;
    cityValueInitial: string;
    streetValueInitial: string;
    postalCodeValueInitial: string;
  };
  isEdit: boolean;
}
