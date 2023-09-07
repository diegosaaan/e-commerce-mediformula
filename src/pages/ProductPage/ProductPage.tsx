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
    return <CirclePreloader pageClassname="detailet-product" />;
  }

  const { productData } = useLoaderData() as {
    productData: IProductData;
  };

  const [isDataFetching, setIsDataFetching] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(productData);

  const handleDiscountSwiperProductCliked = async (productId: string): Promise<void> => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentPath = window.location.pathname;
    window.history.pushState(null, '', currentPath);
    const newPath = currentPath.replace(/\/catalog\/[^/]+/, `/catalog/${productId}`);
    window.history.replaceState(null, '', newPath);
    setIsDataFetching(true);
    const productUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/${productId}`;

    setTimeout(async () => {
      const newProductData = await getProductById(productUrl);
      setCurrentProduct(newProductData);
      setIsDataFetching(false);
    }, 500);
  };

  useEffect(() => {
    setIsDataFetching(false);
  }, [productData]);

  return (
    <div className="product-page">
      <SpinnerPreloader pageClassname="product-page" isDataFetching={isDataFetching} />
      <DetailedProductSection productData={currentProduct} isDataFetching={isDataFetching} />
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
