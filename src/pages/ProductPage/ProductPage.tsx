import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement, useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import DetailedProductSection from './components/DetailedProductSection';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getProducts, getProductsById } from '@/services/tokenHelpers';
import { IPropsDetailedProduct } from '@/types/componentsInrefaces';
import TransformToDetailedProduct from './components/TransformToDetailedProduct';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';

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

function ProductPage(): ReactElement {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { productDetails, discountedProducts } = useLoaderData() as {
    productDetails: IPropsDetailedProduct;
    discountedProducts: IProductData[];
  };

  return (
    <div className="product-page">
      <DetailedProductSection productDetails={productDetails} />
      <ProductCardsSection
        heading="Специальные предложения"
        sectionClassName="special-offers"
        counter={11}
        products={discountedProducts}
      />
    </div>
  );
}

export default ProductPage;
