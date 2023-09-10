export interface IApiHeaders {
  Authorization: string;
  'Content-Type': string;
}

export interface ILocalStorageUserTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface IUserTokenData extends ILocalStorageUserTokenData {
  scope: string;
  token_type: string;
}

export interface IApiIntrospectData {
  active: boolean;
  scope?: string;
  exp?: number;
  client_id?: string;
}

export interface IAuthResponseTokenAdmin {
  access_token: string;
}

export interface IProductData {
  id: string;
  key: string;
  version: number;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
  published: boolean;
  hasStagedChanges: boolean;
  productType: {
    id: string;
    typeId: string;
  };
  categories: {
    id: string;
    typeId: string;
  }[];
  name: {
    ru: string;
    'en-US'?: string;
  };
  description: {
    ru: string;
  };
  masterVariant: {
    id: number;
    key: string;
    sku: string;
    images: {
      url: string;
      label: string;
      dimensions: {
        h: number;
        w: number;
      };
    }[];
    attributes: {
      name: string;
      value:
        | boolean
        | {
            ru: string;
            'en-US': string;
          };
    }[];
    assets: [];
    prices: {
      id: string;
      value: {
        centAmount: number;
        currencyCode: string;
        fractionDigits: number;
        type: string;
      };
      discounted?: {
        discount: {
          id: string;
          typeId: string;
        };
        value: {
          centAmount: number;
          currencyCode: string;
          fractionDigits: number;
          type: string;
        };
      };
    }[];
  };
  metaDescription: {
    ru: string;
    'en-US': string;
  };
  metaTitle: {
    ru: string;
    'en-US': string;
  };
  slug: {
    ru: string;
    'en-US'?: string;
  };
  variants: [];
  searchKeywords: object;
  categoryOrderHints: object;
}

export interface IAllProductData {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IProductData[];
}

export interface ICategoryData {
  id: string;
  key: string;
  orderHint: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  name: {
    ru: string;
    'en-US': string;
  };
  parent: {
    id: string;
    typeId: string;
  };
  slug: {
    ru: string;
    'en-US': string;
  };
  ancestors: [];
}

export interface ICategoryDataResponse {
  data: ICategoryData;
}

export interface ICreateNewUserToken {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export interface IUserInfo {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: 'Password';
}

export interface ICart {
  cartState: string;
  createdAt: string;
  createdBy: { clientId: string; isPlatformClient: boolean; customer: { typeId: string; id: string } };
  customLineItems: [];
  customerId: string;
  deleteDaysAfterLastModification: number;
  directDiscounts: [];
  discountCodes: [];
  id: string;
  inventoryMode: string;
  itemShippingAddresses: [];
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { clientId: string; isPlatformClient: boolean; customer: { typeId: string; id: string } };
  lineItems: [];
  origin: string;
  refusedGifts: [];
  shipping: [];
  shippingMode: string;
  taxCalculationMode: string;
  taxMode: string;
  taxRoundingMode: string;
  totalPrice: { type: string; currencyCode: string; centAmount: number; fractionDigits: number };
  type: string;
  version: number;
  versionModifiedAt: string;
}
