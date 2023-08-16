import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import '@/components/ProductCardsSection/ProductCardsSection.scss';
import '@/pages/App.scss';
import Card from '@/components/Card/Card';
import { IPropsCardsSection } from '@/types/interfaces';
import Button from '@/components/Button/Button';
import Carousel from '../Carousel/Carousel';
import ProductCardsData from './ProductCardsData';

const ProductCardsSection = ({ header, counter }: IPropsCardsSection): ReactElement => {
  console.log('I am');
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    console.log('useLayoutEffect is running');
    setTimeout(() => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        console.log('Width inside useLayoutEffect:', width);
        setCardWidth(width);
      }
    }, 100);
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
          {ProductCardsData.map((card, index) => (
            <Card
              key={index}
              ref={index === 0 ? cardRef : null}
              imagePath={card.imagePath}
              rating={card.rating}
              text={card.text}
              price={card.price}
              priceBefore={card.priceBefore}
              bonus={card.bonus}
              discount={card.discount}
              onClick={(): void => {
                console.log('Clicked!');
              }}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCardsSection;
