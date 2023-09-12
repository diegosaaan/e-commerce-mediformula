import './ProductCard.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';
import Button from '@/components/Button/Button';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

const ProductCard = ({ product }: { product: IProductData }): ReactElement => {
  const { userCart, setUserCart } = useAuth();
  const [isDataFetching, setIsDataFetcing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const handleAddProductInCart = async (): Promise<void> => {
    setIsDisabled(true);
    const result = await handleAddProduct(id);
    if (result) {
      setUserCart(result);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Товар добавлен!</p>,
        description: <p className="auth__notification">{`Товар ${productName} успешно добавлен в корзину`}</p>,
      });
      setIsDisabled(false);
    } else {
      setIsDisabled(false);
    }
  };

  const handleDeleteProductInCart = async (): Promise<void> => {
    setIsDisabled(true);
    const artifact = userCart?.lineItems.filter((item) => item.productId === id);
    if (artifact) {
      const result = await handleDeleteProduct(id, artifact[0].quantity);
      if (result) {
        setUserCart(result);
        notification.success({
          message: <p className="auth__notification auth__notification_type_success">Товар удален!</p>,
          description: <p className="auth__notification">{`Товар ${productName} успешно удален из корзины`}</p>,
        });
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
      }
    }
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
                {Math.round(discountPrice > 0 ? discountPrice / 100 : defaultPrice / 100).toLocaleString('ru-RU')} ₽
              </span>
              {discountPrice ? (
                <span className="catalog__product-list-item-prev-price">{`${Math.round(
                  defaultPrice / 100
                ).toLocaleString('ru-RU')} ₽`}</span>
              ) : (
                ''
              )}
            </div>
            <Button
              id={id}
              disabled={!isInStock || isDisabled}
              text={userCart?.lineItems.some((item) => item.productId === id) ? 'Удалить' : 'В корзину'}
              type="button"
              className={`button ${
                userCart?.lineItems.some((item) => item.productId === id)
                  ? 'catalog__product-list-item-button catalog__product-list-item-button_type_delete'
                  : 'catalog__product-list-item-button'
              }`}
              onClick={
                userCart?.lineItems.some((item) => item.productId === id)
                  ? handleDeleteProductInCart
                  : handleAddProductInCart
              }
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
