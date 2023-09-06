import './SwiperSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import SwiperCard from '@/components/SwiperCard/SwiperCard';
import { IPropsCardsSection } from '@/types/componentsInrefaces';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';

const SwiperSection = ({
  setIsDataFetching,
  heading,
  counter,
  sectionClassName,
  products,
}: IPropsCardsSection): ReactElement => {
  const handleCardClick = (): void => {
    if (setIsDataFetching) {
      setIsDataFetching(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="_container cards-section">
      <div className="cards-section__header-container">
        <h2 className="_heading">
          {heading}
          <sup className="cards-section__counter">{counter}</sup>
        </h2>
        <Link className="text-button" to="/catalog" onClick={handleCardClick}>
          ⟶ Смотреть все
        </Link>
      </div>
      <div className="cards-section__cards-container">
        <button className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--prev`}>
          <img
            className={`swiper-arrow-img ${sectionClassName}__swiper-arrow-img`}
            src={arrowLeftPath}
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
              <Link to={`/catalog/${product.id}`} onClick={handleCardClick}>
                <SwiperCard productData={product} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--next`}>
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

export default SwiperSection;
