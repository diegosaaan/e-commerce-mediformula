import React, { ReactElement } from 'react';
import { useLoaderData } from 'react-router-dom';
import Intro from './components/intro-section/Intro';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import CategoryCards from './components/category-section/CategoryCards';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';
import Services from './components/services-section/Services';
import { getProducts } from '@/services/tokenHelpers';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';
import ApiEndpoints from '@/enums/apiEndpoints';

export const MainPageLoader = async (): Promise<IProductData[]> => {
  const productsUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`;
  const { results }: IAllProductData = await getProducts(productsUrl);
  return results;
};

const MainPage = (): ReactElement => {
  const results = useLoaderData() as IProductData[];

  return (
    <div className="main-page">
      <Intro />
      <ProductCardsSection
        heading="Специальные предложения"
        counter={11}
        sectionClassName="discounted-products"
        products={results}
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
