import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import '@/components/ProductCardsSection/ProductCardsSection.scss';
import '@/pages/App.scss';
import Card from '@/components/Card/Card';
import imagePath from '@/assets/images/png/card-product-image-example.png';
import { IPropsCardsSection } from '@/types/interfaces';
import Button from '@/components/Button/Button';
import Carousel from '../Carousel/Carousel';

const ProductCardsSection = ({ header, counter }: IPropsCardsSection): ReactElement => {
  console.log('I am');
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    console.log('useLayoutEffect is running');
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      console.log('Width inside useLayoutEffect:', width);
      setCardWidth(width);
    }
  }, []);

  return (
    <section className="_container cardsSection">
      <div className="cardsSection__header-container">
        <h2 className="_heading">
          {header}
          <sup className="cardsSection__counter">{counter}</sup>
        </h2>
        <Button
          className="textButton"
          type="button"
          text="⟶ Смотреть все"
          onClick={(): void => {
            console.log('Clicked Look here!');
          }}
        />
      </div>
      <div className="cardsSection__cards-container">
        <Carousel cardWidth={cardWidth}>
          <Card
            ref={cardRef}
            imagePath={imagePath}
            rating={4.8}
            text="1Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="2Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="3Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="4Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="5Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="6Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
          <Card
            imagePath={imagePath}
            rating={4.8}
            text="Кислородный концентратор JAY-10 двухпоточный"
            price={81938}
            priceBefore={85348}
            bonus={450}
            discount={10}
            onClick={(): void => {
              console.log('Clicked!');
            }}
          />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCardsSection;
