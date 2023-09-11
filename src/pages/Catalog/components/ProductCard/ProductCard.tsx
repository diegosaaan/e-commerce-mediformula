import './ProductCard.scss';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';
import Button from '@/components/Button/Button';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';
import { handleAddProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';
// import { addProductToCart } from '@/services/cart';

const ProductCard = ({ product }: { product: IProductData }): ReactElement => {
  const { setUserCart } = useAuth();
  const [isDataFetching, setIsDataFetcing] = useState(false);
  const {
    id,
    name: { ru: productName },
    description: { ru: productDescription },
    masterVariant: {
      attributes,
      images: [
        {
          url: imageUrl,
          dimensions: { w: imageWidth, h: imageHeigth },
        },
      ],
      prices: [
        {
          value: { centAmount: defaultPrice },
          discounted,
        },
      ],
    },
  } = product;

  const brandAttribute = attributes.find((attribute) => attribute.name === 'brand');
  let brand = '';

  if (brandAttribute && typeof brandAttribute.value === 'object' && 'ru' in brandAttribute.value) {
    brand = brandAttribute.value.ru;
  }

  const isInStock = attributes.filter((attribute) => attribute.name === 'in-stock')[0].value as boolean;

  let discountPrice = 0;
  let discountValue: keyof typeof DiscountsID | string = '';
  if (discounted) {
    discountPrice = discounted.value.centAmount;
    discountValue = `${DiscountsID[`${discounted.discount.id}` as keyof typeof DiscountsID]}`;
  }

  const handleCardCliked = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsDataFetcing(true);
  };

  // const handleAddProductToCard = async (event?: MouseEvent): Promise<void> => {
  //   if (event && event.target) {
  //     const target = event.target as HTMLButtonElement;
  //     const productID = target.id;
  //     await addProductToCart(productID);
  //   }
  // };

  const handleAddProductInCart = async (): Promise<void> => {
    setUserCart(await handleAddProduct(id));
  };

  return (
    <>
      {isDataFetching && <SpinnerPreloader pageClassname="catalog" isDataFetching={isDataFetching} />}
      <li className={`catalog__product-list-item`}>
        {discountValue && <div className="catalog__product-discount">{discountValue}</div>}
        {!isInStock && <div className="catalog__product-no-is-stock">Нет в наличии</div>}
        <div className="catalog__product-list-item-container">
          <Link className="catalog__product-list-route-link" to={`/catalog/${id}`} onClick={handleCardCliked}>
            <div className={`catalog__product-list-item-left-side`}>
              <div
                className={`catalog__product-list-item-photo-container ${
                  !isInStock ? 'catalog__product-list-item-photo-container--opacity' : ''
                }`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${imageHeigth > 222 || imageWidth > 222 ? 'contain' : 'cover'}`,
                }}
              ></div>
              <div className="catalog__product-list-item-description-container">
                <h3 className="catalog__product-list-item-title">{productName}</h3>
                <h4 className="catalog__product-list-item-description-brand">
                  Бренд:
                  <span className="catalog__product-list-item-description-brand-name">{brand}</span>
                </h4>
                <h4 className="catalog__product-list-item-description-title">Описание:</h4>
                <p className="catalog__product-list-item-description">{productDescription}</p>
              </div>
            </div>
          </Link>
          <div className="catalog__product-list-item-right-side">
            <div className="catalog__product-list-item-price-container">
              <span className="catalog__product-list-item-current-price">
                {Math.round(discountPrice > 0 ? discountPrice / 100 : defaultPrice / 100)} ₽
              </span>
              {discountPrice ? (
                <span className="catalog__product-list-item-prev-price">{`${Math.round(defaultPrice / 100)} ₽`}</span>
              ) : (
                ''
              )}
            </div>
            <Button
              id={id}
              disabled={!isInStock}
              type="button"
              className="button catalog__product-list-item-button"
              onClick={handleAddProductInCart}
            >
              В корзину
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
