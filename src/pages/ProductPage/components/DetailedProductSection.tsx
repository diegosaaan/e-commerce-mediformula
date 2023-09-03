import './DetailedProductSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from 'react-modal';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { IPropsDetailedProduct } from '@/types/componentsInrefaces';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';
import BrandIcons from './BrandIcons';

const DetailedProductSection = ({ productDetails }: { productDetails: IPropsDetailedProduct }): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number): void => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <section className="_container detailed-product">
      {productDetails ? (
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
                  {productDetails.images.map((imageDetailes, index) => (
                    <SwiperSlide key={index}>
                      <Link to="#" onClick={(): void => openModal(index)}>
                        <img
                          className="detailed-product__image-image"
                          src={imageDetailes.url}
                          alt={imageDetailes.label}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {isModalOpen && (
                  <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <a href="#" className="overlay" onClick={closeModal}></a>
                    <div className="modal-window">
                      {productDetails.images.length > 1 ? (
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
                            {productDetails.images.map((imageDetailes, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  className="modal-window__image"
                                  src={imageDetailes?.url}
                                  alt={imageDetailes?.label}
                                />
                              </SwiperSlide>
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
                      ) : (
                        <img
                          className="modal-window__image"
                          src={productDetails.images[0]?.url}
                          alt={productDetails.images[0]?.label}
                        />
                      )}
                      <div className="close-button" onClick={closeModal}></div>
                    </div>
                  </Modal>
                )}
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
          <div className="detailed-product__added-block">
            <div>{productDetails.brand ? BrandIcons[productDetails.brand] || productDetails.brand : 'Загрузка...'}</div>
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
