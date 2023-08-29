import React, { ReactElement, useEffect, useState } from 'react';
import '@/pages/ProductPage/components/DetailedProductSection.scss';
import { useParams } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { IPropsDetailedProduct } from '@/types/componentsInrefaces';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getProductsById } from '@/services/tokenHelpers';
import TransformToDetailedProduct from './TransformToDetailedProduct';

const DetailedProductSection = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  let url = '';
  if (id !== undefined) {
    url = ApiEndpoints.URL_PRODUCTS_BY_ID.replace('{id}', id);
  }

  const [productDetails, setProductDetails] = useState<IPropsDetailedProduct | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getProductsById(url);
        const data: IPropsDetailedProduct = TransformToDetailedProduct(response);
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="_container detailed-product">
      {productDetails ? (
        <>
          <div className="detailed-product__image-block">
            <img
              className="detailed-product__image-image"
              src={productDetails.images[0].url}
              alt={productDetails.images[0].label}
            />
          </div>
          <div className="detailed-product__description-block">
            <h4 className="detailed-product__header">{productDetails.name}</h4>
            <p className="detailed-product__description">{productDetails.description}</p>
            <div className="detailed-product__price-container">
              <p className="detailed-product__price">{`${productDetails.price}₽`}</p>
              <p className="detailed-product__priceBefore">{`${productDetails.priceBefore}₽`}</p>
            </div>
            <div className="detailed-product__button-container">
              <Button className="button" type="button" text="В корзину" onClick={(): void => {}} />
            </div>
          </div>
          <div className="detailed-product__added-block">{productDetails.brand}</div>
        </>
      ) : null}
    </section>
  );
};

export default DetailedProductSection;
