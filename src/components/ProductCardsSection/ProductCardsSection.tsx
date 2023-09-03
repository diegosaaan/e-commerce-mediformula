import './ProductCardsSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import Card from '@/components/Card/Card';
import { IPropsCardsSection } from '@/types/componentsInrefaces';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';
import TransformProductToCardProps from './TransformProductToCardProps';

const ProductCardsSection = ({ header, counter, sectionClassName, products }: IPropsCardsSection): ReactElement => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="_container cards-section">
      <div className="cards-section__header-container">
        <h2 className="_heading">
          {header}
          <sup className="cards-section__counter">{counter}</sup>
        </h2>
        <Link
          className="text-button"
          to="/catalog"
          onClick={(): void => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⟶ Смотреть все
        </Link>
      </div>
      <div className="cards-section__cards-container">
        <button className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--prev`}>
          <img
            className={`swiper-arrow-img ${sectionClassName}__swiper-arrow-img`}
            src={arrowLeftPath}
            ref={prevRef}
            alt="Shevron Left"
          />
        </button>
        <Swiper
          modules={[Navigation]}
          loop={true}
          slidesPerView={4}
          navigation={{
            prevEl: `.${sectionClassName}__swiper-arrow--prev`,
            nextEl: `.${sectionClassName}__swiper-arrow--next`,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            467: {
              slidesPerView: 1.5,
            },
            567: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2.5,
            },
            1023: {
              slidesPerView: 3,
            },
            1279: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Link to={`/catalog/${product.id}`}>
                <Card {...TransformProductToCardProps(product)} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          ref={nextRef}
          className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--next`}
        >
          <img
            className={`swiper-arrow-img ${sectionClassName}__swiper-arrow-img`}
            src={arrowRightPath}
            alt="Shevron Right"
          />
        </button>
      </div>
    </section>
  );
};

export default ProductCardsSection;
