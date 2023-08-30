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
