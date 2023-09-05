import React, { ReactElement } from 'react';
import '@/pages/Main/components/category-section/CategoryCards.scss';
import '@/pages/App.scss';
import CategoryTag from './CategoryTag/CategoryTag';
import img1Path from '@/assets/images/png/categories-blood-pressure-cuff.png';
import img2Path from '@/assets/images/png/categories-insoles.png';
import img3Path from '@/assets/images/png/categories-massager.png';
import img4Path from '@/assets/images/png/categories-crutch.png';

const CategoryCards = (): ReactElement => {
  return (
    <section className="_container category">
      <h2 className="_heading">Популярные категории</h2>
      <div className="category__card-container">
        <div className="category__card category__card1">
          <div className="category__image-container category__image-background1">
            <img className="category__image" src={img1Path} alt="Blood Pressure Cuff" />
          </div>
          <div className="category__content">
            <h3 className="category__cardHeader">Медтехника для дома</h3>
            <div className="category__tagsContainer">
              <CategoryTag title="Тонометры" />
              <CategoryTag title="Ингаляторы и небулайзеры" />
              <CategoryTag title="Глюкометры и тест-полоски" />
              <CategoryTag title="Термометры" />
              <CategoryTag title="Грелки электрические и солевые" />
            </div>
          </div>
        </div>
        <div className="category__card category__card2">
          <div className="category__image-container category__image-background2">
            <img className="category__image" src={img2Path} alt="Insoles" />
          </div>
          <div className="category__content">
            <h3 className="category__cardHeader">Ортопедия</h3>
            <div className="category__tagsContainer">
              <CategoryTag title="Стельки" />
              <CategoryTag title="Бандажи/фиксаторы суставов" />
              <CategoryTag title="Подушки" />
              <CategoryTag title="Детская обувь" />
              <CategoryTag title="Бинты" />
            </div>
          </div>
        </div>
        <div className="category__card category__card3">
          <div className="category__image-container category__image-background3">
            <img className="category__image" src={img3Path} alt="Massager" />
          </div>
          <div className="category__content">
            <h3 className="category__cardHeader">Массажное оборудование</h3>
            <div className="category__tagsContainer">
              <CategoryTag title="Для тела" />
              <CategoryTag title="Для шеи и плеч" />
              <CategoryTag title="Для ног" />
              <CategoryTag title="Вакуумный массаж" />
              <CategoryTag title="Аппликаторы" />
            </div>
          </div>
        </div>
        <div className="category__card category__card4">
          <div className="category__image-container category__image-background4">
            <img className="category__image" src={img4Path} alt="Insoles" />
          </div>
          <div className="category__content">
            <h3 className="category__cardHeader">Реабилитационная техника</h3>
            <div className="category__tagsContainer">
              <CategoryTag title="Медицинские кровати" />
              <CategoryTag title="Матрасы и подушки" />
              <CategoryTag title="Костыли" />
              <CategoryTag title="Трости" />
              <CategoryTag title="Ходунки, опоры" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
