import './DetailedProductSection.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement, MouseEvent, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';
import { IProductData } from '@/types/apiInterfaces';
import brandsIcons from './brandsIcons';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

const DetailedProductSection = ({
  productData,
  isDataFetching,
}: {
  productData: IProductData | null;
  isDataFetching: boolean;
}): ReactElement => {
  const { userCart, setUserCart } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  if (productData !== null) {
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
        if (
          target.classList.contains('detailed-product__modal-container') ||
          target.classList.contains('close-button')
        ) {
          setIsModalOpen(false);
        }
      }
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
      const product = userCart?.lineItems.filter((item) => item.productId === id);
      if (product) {
        const result = await handleDeleteProduct(id, product[0].quantity);
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
      <section className={`_container detailed-product ${isDataFetching ? 'detailed-product--opacity' : ''}`}>
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
                className={`${
                  userCart?.lineItems.some((item) => item.productId === id) ? 'button button_type_primary' : 'button'
                }`}
                type="button"
                text={userCart?.lineItems.some((product) => product.productId === id) ? 'Удалить' : 'В корзину'}
                onClick={
                  userCart?.lineItems.some((product) => product.productId === id)
                    ? handleDeleteProductInCart
                    : handleAddProductInCart
                }
                disabled={!isInStock || isDisabled}
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
      </section>
    );
  }

  return (
    <section className={`_container detailed-product ${isDataFetching ? 'detailed-product--opacity' : ''}`}>
      <div className="detailed-product__description-block">
        <p className="detailed-product__header">Такого товара не существует.</p>
        <p className="detailed-product__description">Воспользуйтесь каталогом или поиском, чтобы найти нужный товар.</p>
        <div className="detailed-product__button-container">
          <Button className="button" type="button" onClick={(): void => navigate('/catalog')} text="Каталог" />
        </div>
      </div>
    </section>
  );
};

export default DetailedProductSection;
