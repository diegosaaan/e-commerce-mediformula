import React, { ReactElement, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Intro from './components/intro-section/Intro';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import CategoryCards from './components/category-section/CategoryCards';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';
import Services from './components/services-section/Services';
import { getProducts } from '@/services/tokenHelpers';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';
import ApiEndpoints from '@/enums/apiEndpoints';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';

export const mainPageLoader = async (): Promise<IProductData[]> => {
  const productsUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`;
  const { results }: IAllProductData = await getProducts(productsUrl);
  return results;
};

const MainPage = (): ReactElement => {
  const results = useLoaderData() as IProductData[];
  const [isDataFetching, setIsDataFetching] = useState(false);

  return (
    <div className="main-page">
      <SpinnerPreloader pageClassname="main-page" isDataFetching={isDataFetching} />

      <Intro />
      <SwiperSection
        heading="Специальные предложения"
        counter={11}
        sectionClassName="discounted-products"
        products={results}
        setIsDataFetching={setIsDataFetching}
      />
      <CategoryCards />
      <Brends />
      <Advantages />
      <Services />
      <MediaSection />
    </div>
  );
};

export default MainPage;
