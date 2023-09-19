import './SwiperSection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import React, { ReactElement, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import SwiperCard from '@/components/SwiperCard/SwiperCard';
import { IPropsCardsSection } from '@/types/componentsInrefaces';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IProductData } from '@/types/apiInterfaces';
import { getProducts } from '@/services/catalog';
import SpinnerPreloader from '../Preloaders/SpinnerPreloader/SpinnerPreloader';

const SwiperSection = ({
  heading,
  counter,
  sectionClassName,
  handleCardCliked,
  setIsDataFetching,
}: IPropsCardsSection): ReactElement => {
  const [isProductsDataFetching, setIsProductsDataFetching] = useState(true);
  const [discountedProductsData, setDiscountedProductsData] = useState<IProductData[]>([]);
  const productsUrl = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?filter=variants.prices.discounted.discount.typeId:"product-discount"`;

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      try {
        const { results } = await getProducts(productsUrl);
        setTimeout(() => {
          setDiscountedProductsData(results);
          setIsProductsDataFetching(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setIsProductsDataFetching(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <section className="_container cards-section">
      <div className="cards-section__header-container">
        <h2 className="_heading">
          {heading}
          <sup className="cards-section__counter">{counter}</sup>
        </h2>
        <Link className="text-button" to="/catalog">
          ⟶ Смотреть все
        </Link>
      </div>
      {discountedProductsData.length ? (
        <>
          <div className="cards-section__cards-container">
            <button
              className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--prev`}
            >
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
              {discountedProductsData.map((product, index) => (
                <SwiperSlide key={index}>
                  <SwiperCard
                    productData={product}
                    handleCardCliked={handleCardCliked}
                    setIsDataFetching={setIsDataFetching}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`swiper-arrow ${sectionClassName}__swiper-arrow ${sectionClassName}__swiper-arrow--next`}
            >
              <img
                className={`swiper-arrow-img ${sectionClassName}__swiper-arrow-img`}
                src={arrowRightPath}
                alt="Shevron Right"
              />
            </button>
          </div>
        </>
      ) : (
        <SpinnerPreloader pageClassname="cards-section" isDataFetching={isProductsDataFetching} />
      )}
    </section>
  );
};

export default SwiperSection;
