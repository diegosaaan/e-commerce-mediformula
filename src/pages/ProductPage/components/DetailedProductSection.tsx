import './DetailedProductSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement, MouseEvent, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { AxiosError } from 'axios';
import Button from '@/components/Button/Button';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';
import { IProductData, IUserTokenData } from '@/types/apiInterfaces';
import brandsIcons from './brandsIcons';
import { addProductInCart, createCart, getActiveCart } from '@/services/cart';
import { createAnonymousToken, saveUserToken } from '@/services/tokenHelpers';

const DetailedProductSection = ({
  productData,
  isDataFetching,
}: {
  productData: IProductData;
  isDataFetching: boolean;
}): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddProduct, setIsAddProduct] = useState(true);
  const {
    id,
    name: { ru: productName },
    description: { ru: productDescription },
    masterVariant: {
      attributes,
      images: productImages,
      prices: [
        {
          value: { centAmount: defaultPrice },
          discounted,
        },
      ],
    },
  } = productData;

  const brandAttribute = attributes.find((attribute) => attribute.name === 'brand');
  let brand = '';

  if (brandAttribute && typeof brandAttribute.value === 'object' && 'ru' in brandAttribute.value) {
    brand = brandAttribute.value.ru;
  }

  const isInStock = attributes.filter((attribute) => attribute.name === 'in-stock')[0].value as boolean;

  let discountPrice = 0;
  if (discounted) {
    discountPrice = discounted.value.centAmount;
  }

  const openModal = (index: number): void => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (event: MouseEvent): void => {
    if (event.target) {
      const target = event.target as HTMLDivElement;
      if (target.classList.contains('detailed-product__modal-container') || target.classList.contains('close-button')) {
        setIsModalOpen(false);
      }
    }
  };

  const handleProductInCart = async (): Promise<void> => {
    const userToken = localStorage.getItem('1SortUserToken');
    const anonymousToken = localStorage.getItem('1SortAnonymousToken');
    setIsAddProduct((prev) => !prev);
    console.log(isAddProduct);
    console.log(id);

    try {
      if (userToken) {
        const cartActive = await getActiveCart(true);
        const lineItemsId = cartActive.lineItems.filter((item) => item.productId === id);
        const cart = await addProductInCart(
          cartActive.id,
          cartActive.version,
          id,
          lineItemsId[0].id,
          true,
          isAddProduct
        );
        console.log(cart);
      } else if (anonymousToken) {
        const cartActive = await getActiveCart(false);
        const lineItemsId = cartActive.lineItems.filter((item) => item.productId === id);
        const cart = await addProductInCart(
          cartActive.id,
          cartActive.version,
          id,
          lineItemsId[0].id,
          false,
          isAddProduct
        );
        console.log(cart);
      } else {
        const result = await createAnonymousToken();
        if (result !== null && typeof result === 'object') {
          saveUserToken(result as IUserTokenData, '1SortAnonymousToken');
          const cartCreated = await createCart(false);
          const lineItemsId = cartCreated.lineItems.filter((item) => item.productId === id);
          const cart = await addProductInCart(
            cartCreated.id,
            cartCreated.version,
            id,
            lineItemsId[0].id,
            false,
            isAddProduct
          );
          console.log(cart);
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        const cartCreated = await createCart(true);
        const lineItemsId = cartCreated.lineItems.filter((item) => item.productId === id);
        const cart = await addProductInCart(
          cartCreated.id,
          cartCreated.version,
          id,
          lineItemsId[0].id,
          true,
          isAddProduct
        );
        console.log(cart);
      } else {
        console.error('Произошла ошибка:', error);
      }
    }
  };

  // const handleAddDiscount = async (): Promise<void> => {
  //   const cartActive = await getActiveCart(true);
  //   const res = await addDiscountCode(cartActive.id, cartActive.version, true);
  //   console.log(res);
  // };

  // const handleDeleteDiscount = async (): Promise<void> => {
  //   const cartActive = await getActiveCart(true);
  //   const res = await deleteDiscountCode(cartActive.id, cartActive.version, true);
  //   console.log(res);
  // };

  return (
    <section className={`_container detailed-product ${isDataFetching ? 'detailed-product--opacity' : ''}`}>
      {productData ? (
        <>
          <div className="detailed-product__image-container">
            <div className="detailed-product__image-block">
              <>
                <button className={`swiper-arrow detailed-product__swiper-arrow detailed-product__swiper-arrow--prev`}>
                  <img
                    className={`swiper-arrow-img detailed-product__swiper-arrow-img`}
                    src={arrowLeftPath}
                    alt="Shevron Left"
                  />
                </button>
                <Swiper
                  modules={[Navigation]}
                  loop={true}
                  slidesPerView={1}
                  navigation={{
                    prevEl: `.detailed-product__swiper-arrow--prev`,
                    nextEl: `.detailed-product__swiper-arrow--next`,
                  }}
                  style={{ zIndex: isModalOpen ? 0 : 1 }}
                >
                  {productImages.map(({ url }, index) => (
                    <SwiperSlide
                      onClick={(): void => openModal(index)}
                      key={index}
                      style={{
                        backgroundImage: `url(${url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                      }}
                    ></SwiperSlide>
                  ))}
                </Swiper>

                <div
                  className={`detailed-product__modal-container ${
                    isModalOpen ? 'detailed-product__modal-container--active' : ''
                  }`}
                  onClick={(event: MouseEvent): void => closeModal(event)}
                >
                  <div className="detailed-product__modal">
                    {isModalOpen && (
                      <>
                        <button
                          className={`swiper-arrow detailed-product__swiper-arrow detailed-product__swiper-arrow--prev`}
                        >
                          <img
                            className={`swiper-arrow-img detailed-product__swiper-arrow-img`}
                            src={arrowLeftPath}
                            alt="Shevron Left"
                          />
                        </button>

                        <Swiper
                          initialSlide={currentIndex}
                          modules={[Navigation]}
                          loop={true}
                          slidesPerView={1}
                          navigation={{
                            prevEl: `.detailed-product__swiper-arrow--prev`,
                            nextEl: `.detailed-product__swiper-arrow--next`,
                          }}
                        >
                          {productImages.map(({ url }, index) => (
                            <SwiperSlide
                              key={index}
                              style={{
                                backgroundImage: `url(${url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                              }}
                            ></SwiperSlide>
                          ))}
                        </Swiper>
                        <button
                          className={`swiper-arrow detailed-product__swiper-arrow detailed-product__swiper-arrow--next`}
                        >
                          <img
                            className={`swiper-arrow-img detailed-product__swiper-arrow-img`}
                            src={arrowRightPath}
                            alt="Shevron Right"
                          />
                        </button>
                      </>
                    )}
                    <div className="close-button" onClick={(event: MouseEvent): void => closeModal(event)}></div>
                  </div>
                </div>
                <button className={`swiper-arrow detailed-product__swiper-arrow detailed-product__swiper-arrow--next`}>
                  <img
                    className={`swiper-arrow-img detailed-product__swiper-arrow-img`}
                    src={arrowRightPath}
                    alt="Shevron Right"
                  />
                </button>
              </>
            </div>
          </div>
          <div className="detailed-product__description-block">
            <div
              className={`${
                isInStock ? 'detailed-product__product-is-stock' : 'detailed-product__product-no-is-stock'
              }`}
            >
              {isInStock ? 'В наличии' : 'Нет в наличии'}
            </div>
            <h4 className="detailed-product__header">{productName}</h4>
            <p className="detailed-product__description">{productDescription}</p>
            <div className="detailed-product__price-container">
              <p className="detailed-product__price">
                {discountPrice
                  ? `${Math.round(discountPrice / 100).toLocaleString('ru-RU')}₽`
                  : `${Math.round(defaultPrice / 100).toLocaleString('ru-RU')}₽`}
              </p>
              <p className="detailed-product__priceBefore">
                {discountPrice ? `${Math.round(defaultPrice / 100).toLocaleString('ru-RU')}₽` : ''}
              </p>
            </div>
            <div className="detailed-product__button-container">
              <Button
                className="button"
                type="button"
                text="В корзину"
                onClick={handleProductInCart}
                disabled={!isInStock}
              />
            </div>
          </div>
          <div className="detailed-product__added-block">
            <div className="detailed-product__brand-image-container">{brandsIcons[brand]}</div>
            <div className="detailed-product__documentation-block">
              <h5 className="detailed-product__documentation-header">В комплекте</h5>
              <ul className="detailed-product__documentation-list">
                <li className="detailed-product__documentation-element">Инструкция к применению</li>
                <li className="detailed-product__documentation-element">Сертификат</li>
                <li className="detailed-product__documentation-element">Сертификат диллера</li>
                <li className="detailed-product__documentation-element">Гарантийный талон</li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default DetailedProductSection;
