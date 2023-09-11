import {
  MouseEvent,
  KeyboardEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  Dispatch,
  ChangeEvent,
  MutableRefObject,
  SetStateAction,
} from 'react';
import { ObjectSchema } from 'yup';
import { AddressType, LoginSchemaType } from './types';
import { IProductData, IUserInfo } from './apiInterfaces';

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
  id?: string;
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: (event?: MouseEvent) => void | Promise<void>;
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
  onChange?: (event: ChangeEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export interface IPropsForm {
  children?: ReactNode;
  className: string;
  name: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
  heading: string;
  counter: number;
  sectionClassName: string;
  handleCardCliked?: (productId: string) => Promise<void>;
  setIsDataFetching?: React.Dispatch<React.SetStateAction<boolean>>;
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
  onChange?: (event: ChangeEvent) => void;
  isEdit?: boolean;
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
  isDataFetching: boolean;
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
  onChange?: (event: ChangeEvent) => void;
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
  onChange?: (event: ChangeEvent) => void;
  setAddressesState: Dispatch<React.SetStateAction<IAuthAddressesState>>;
}

export interface IBreadcrumbsData {
  id?: string;
  link?: string;
  name: string;
}

export interface ICatalogSidebarProps {
  getNewProductList: () => void;
  openFirstProductListPage: () => void;
  handleChangeCategory: (event: MouseEvent) => Promise<void>;
  setIsInStockFilter: (value: boolean) => void;
  setIsDiscountFilter: (value: boolean) => void;
  setIsPriceFilter: (value: boolean) => void;
  setPriceRangeValue: (value: { minPrice: number; maxPrice: number }) => void;
  setBrandsFilter: (value: string[]) => void;
  handleResetFilters: () => void;
  handleCloseSidebar: () => void;
  isInStockFilter: boolean;
  isDiscountFilter: boolean;
  isPriceFilter: boolean;
  priceRangeValue: { minPrice: number; maxPrice: number };
  brandsFilter: string[];
  isMobileSidebarOpen: boolean;
  isDataFetching: boolean;
}

export interface IPaginationProps {
  isDataFetching: boolean;
  currentProductsData: {
    currentPage: number;
    currentProductList: IProductData[];
    totalProducts: number;
  };
  getNewProductList: (searchText?: string) => Promise<void>;
  setCurrentProductList: Dispatch<
    SetStateAction<{ currentProductList: IProductData[]; totalProducts: number; currentPage: number }>
  >;
  pageOffset: MutableRefObject<number>;
  currentCategoryRef: MutableRefObject<null> | MutableRefObject<HTMLHeadingElement>;
}

export interface IPropsDetailedProduct {
  images: ImageDetails[];
  name: string;
  description: string;
  price: number;
  priceBefore: number;
  brand?: string;
  bonus?: number;
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

export interface ImageDetails {
  url: string;
  label: string;
}
