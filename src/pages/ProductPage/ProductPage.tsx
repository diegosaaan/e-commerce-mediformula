import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement, useEffect } from 'react';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import DetailedProductSection from './components/DetailedProductSection';
import ApiEndpoints from '@/enums/apiEndpoints';

function ProductPage(): ReactElement {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page">
      <DetailedProductSection />
      <ProductCardsSection
        header="Специальные предложения"
        sectionClassName="special-offers"
        counter={15}
        url={`${ApiEndpoints.URL_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`}
      />
    </div>
  );
}

export default ProductPage;
