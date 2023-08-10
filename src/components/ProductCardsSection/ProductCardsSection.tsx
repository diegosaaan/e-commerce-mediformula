import React, { ReactElement } from 'react';
import '@/components/ProductCardsSection/ProductCardsSection.scss';
import '@/pages/App.scss';
import Card from '../Card/Card';
import imagePath from '@/assets/images/png/card-product-image-example.png';
import { IPropsCardsSection } from '@/types/interfaces';
import Button from '../Button/Button';

const ProductCardsSection = ({ header, counter }: IPropsCardsSection): ReactElement => {
  return (
    <section className="_container cardsSection">
      <div className="cardsSection__header-container">
        <h2 className="cardsSection__header">
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
        <button></button>
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
        <button></button>
      </div>
    </section>
  );
};

export default ProductCardsSection;
