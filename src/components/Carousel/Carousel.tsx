import React, { ReactElement, useState, useEffect, Children, cloneElement } from 'react';
import '@/components/Carousel/Carousel.scss';
import { IPropsCarousel } from '@/types/interfaces';
import arrowRightPath from '@/assets/images/svg/arrow-ahead.svg';
import arrowLeftPath from '@/assets/images/svg/arrow-back.svg';

const Carousel = ({ children, cardWidth }: IPropsCarousel): ReactElement => {
  console.log('cardWidth', cardWidth);
  const [cards, setCards] = useState<ReactElement[]>([]);
  const [offset, setOffset] = useState(0);

  const handleLeftClick = (): void => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + cardWidth;
      return Math.min(newOffset, 0);
    });
  };

  const handleRightClick = (): void => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - cardWidth;
      const maxOffset = -(cardWidth * (cards.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    const newCards = Children.toArray(children)
      .filter(React.isValidElement)
      .map((child) =>
        cloneElement<React.HTMLProps<HTMLElement>>(child as React.ReactElement, {
          style: {
            minWidth: `${cardWidth}px`,
            maxWidth: `${cardWidth}px`,
            height: '100%',
          },
        })
      );

    setCards(newCards);
    console.log('Updated cardWidth:', cardWidth);
  }, [cardWidth]);

  return (
    <div className="carousel__container">
      <button className="arrow" onClick={handleLeftClick}>
        <img src={arrowLeftPath} alt="Shevron Left" />
      </button>
      <div className="carousel__window">
        <div className="carousel__cards-container" style={{ transform: `translateX(${offset}px)` }}>
          {cards}
        </div>
      </div>
      <button className="arrow" onClick={handleRightClick}>
        <img src={arrowRightPath} alt="Shevron Right" />
      </button>
    </div>
  );
};

export default Carousel;
