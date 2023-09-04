import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import DetailedProductSection from './components/DetailedProductSection';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getProducts, getProductsById } from '@/services/tokenHelpers';
import { IPropsDetailedProduct } from '@/types/componentsInrefaces';
import TransformToDetailedProduct from './components/TransformToDetailedProduct';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';
import SpinnerPreloader from '@/utils/helpers/Loader/SpinnerPreloader/SpinnerPreloader';

export const ProductPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{ productDetails: IPropsDetailedProduct; discountedProducts: IProductData[] }> => {
  const { id } = params;
  const discountedProductsUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`;
  let productUrl = '';
  if (id !== undefined) {
    productUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/${id}`;
  }

  const { results: discountedProducts }: IAllProductData = await getProducts(discountedProductsUrl);
  const productData = await getProductsById(productUrl);

  const productDetails = TransformToDetailedProduct(productData);
  return { productDetails, discountedProducts };
};

const ProductPage = (): ReactElement => {
  const [isDataFetching, setIsDataFetching] = useState(false);

  const { productDetails, discountedProducts } = useLoaderData() as {
    productDetails: IPropsDetailedProduct;
    discountedProducts: IProductData[];
  };

  useEffect(() => {
    setIsDataFetching(false);
  }, [productDetails]);

  return (
    <div className="product-page">
      <SpinnerPreloader pageClassname="product-page" isDataFetching={isDataFetching} />
      <DetailedProductSection productDetails={productDetails} isDataFetching={isDataFetching} />
      <ProductCardsSection
        setIsDataFetching={setIsDataFetching}
        heading="Специальные предложения"
        sectionClassName="special-offers"
        counter={11}
        products={discountedProducts}
      />
    </div>
  );
};

export default ProductPage;
