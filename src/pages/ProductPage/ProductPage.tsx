import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import DetailedProductSection from './components/DetailedProductSection';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getProducts, getProductsById } from '@/services/tokenHelpers';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';

export const productPageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{ productData: IProductData; discountedProductsData: IProductData[] }> => {
  const { id } = params;
  const discountedProductsUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`;
  let productUrl = '';
  if (id !== undefined) {
    productUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/${id}`;
  }

  const { results: discountedProductsData }: IAllProductData = await getProducts(discountedProductsUrl);
  const productData = await getProductsById(productUrl);
  return { productData, discountedProductsData };
};

const ProductPage = (): ReactElement => {
  const [isDataFetching, setIsDataFetching] = useState(false);

  const { productData, discountedProductsData } = useLoaderData() as {
    productData: IProductData;
    discountedProductsData: IProductData[];
  };

  useEffect(() => {
    setIsDataFetching(false);
  }, [productData]);

  return (
    <div className="product-page">
      <SpinnerPreloader pageClassname="product-page" isDataFetching={isDataFetching} />
      <DetailedProductSection productData={productData} isDataFetching={isDataFetching} />
      <SwiperSection
        setIsDataFetching={setIsDataFetching}
        heading="Специальные предложения"
        sectionClassName="special-offers"
        counter={11}
        products={discountedProductsData}
      />
    </div>
  );
};

export default ProductPage;
