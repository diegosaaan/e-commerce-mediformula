import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData, useNavigation } from 'react-router-dom';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import DetailedProductSection from './components/DetailedProductSection';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getProductById } from '@/services/catalog';
import { IProductData } from '@/types/apiInterfaces';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';

export const productPageLoader = async ({ params }: LoaderFunctionArgs): Promise<{ productData: IProductData }> => {
  const { id } = params;
  let productUrl = '';
  if (id !== undefined) {
    productUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/${id}`;
  }
  const productData = await getProductById(productUrl);
  return { productData };
};

const ProductPage = (): ReactElement => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  const [isDataFetching, setIsDataFetching] = useState(false);

  const { productData } = useLoaderData() as {
    productData: IProductData;
  };

  const handleDiscountSwiperProductCliked = (): void => {
    setIsDataFetching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        handleCardCliked={handleDiscountSwiperProductCliked}
      />
    </div>
  );
};

export default ProductPage;
