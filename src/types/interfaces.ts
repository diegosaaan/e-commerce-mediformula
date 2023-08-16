import { MouseEvent, KeyboardEvent, FormEvent, ReactElement, ReactNode, Dispatch, SetStateAction } from 'react';
import { ObjectSchema } from 'yup';
import { AddressType, LoginSchemaType } from './types';

export interface IAuthContextValue {
  isUserLoggedIn: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
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
}

export interface IPropsAuthInput {
  type: string;
  placeholder?: string;
  name: string;
  htmlFor: string;
  isInputPassword?: boolean;
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
}

export interface IPropsAddressFields {
  name: string;
  city?: string;
  street?: string;
  cityErrors?: string;
  streetErrors?: string;
  setIsPostalCodeError: Dispatch<SetStateAction<boolean>>;
  cityTouched?: boolean;
  streetTouched?: boolean;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  accordionTitle: string;
  setAcordionTitle: Dispatch<SetStateAction<string>>;
  postalCodeValue: string;
  setPostalCodeValue: Dispatch<SetStateAction<string>>;
}
