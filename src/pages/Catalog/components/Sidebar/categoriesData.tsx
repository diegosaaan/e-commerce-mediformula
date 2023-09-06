import React, { ReactElement, MouseEvent } from 'react';

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export const categoriesData = [
  {
    id: '',
    name: 'Все категории',
  },
  {
    id: '4a00911b-0a38-490c-b746-f7c1fd2d9d08',
    name: 'Массажное оборудование',
  },
  {
    id: '8c8ed4a3-0bc6-4a94-8e40-b8c7745b18bc',
    name: 'Реабилитационная техника',
    subcategories: [
      {
        id: 'c7124db8-1cf3-47b3-895f-0736deaa766f',
        name: 'Тренажеры',
        subcategories: [
          {
            id: '4347f27d-01e5-4ee7-a866-baa2afd889fb',
            name: 'Беговые дорожки',
          },
          {
            id: 'abf6b4b5-5258-4227-bc21-50427a572ad2',
            name: 'Велотренажеры',
          },
        ],
      },
      {
        id: 'a8255622-10f7-4da1-ae05-a75b565690b3',
        name: 'Матрасы и подушки',
      },
    ],
  },
  {
    id: '2bcd0f21-335c-46dc-9c78-d7d8ff66a75c',
    name: 'Медтехника для дома',
    subcategories: [
      {
        id: '6631fdb6-a379-4e59-bcb0-de7fa9e8d706',
        name: 'Тонометры',
        subcategories: [
          {
            id: 'ff7d7a48-ed33-4c4a-8fe5-3fc342b1aa60',
            name: 'Автоматические тонометры',
          },
          {
            id: '0e47f646-0458-4f13-a4f6-f05f6d4f4bcc',
            name: 'Механические тонометры',
          },
          {
            id: '2644c8de-218f-4551-9c69-3a473649e36d',
            name: 'Стетоскопы',
          },
        ],
      },
      {
        id: '0e5fdbcf-f9b3-44ef-9f7c-ebc43a39c62a',
        name: 'Ингаляторы',
        subcategories: [
          {
            id: '6ef106b2-3bc8-47b2-b29c-e3ee74f7bb40',
            name: 'Ультразвуковые ингаляторы',
          },
          {
            id: 'f92a58bd-3311-454f-8bc4-a97cb323f4d5',
            name: 'Паровые ингаляторы',
          },
        ],
      },
      {
        id: '9bbc928c-0553-48d2-8fe3-d2a135f760c0',
        name: 'Термометры',
        subcategories: [
          {
            id: '1fd1c403-5dd2-4250-a203-f6bcb8b97539',
            name: 'Электронные термометры',
          },
          {
            id: '38f75b11-44d8-42b2-b18e-01c7d7afa65b',
            name: 'Инфракрасные термометры',
          },
          {
            id: 'dd4b9b73-cc7d-4e4d-8a32-3913fa1abbb5',
            name: 'Бесконтактные термометры',
          },
        ],
      },
    ],
  },
];

export const renderCategories = (
  categories: Category[],
  isTopCategory: boolean,
  handleChangeCategory: (event: React.MouseEvent) => Promise<void>
): ReactElement => {
  return (
    <>
      {categories.map(
        (category, index): ReactElement => (
          <React.Fragment key={index}>
            <li
              tabIndex={0}
              key={category.id}
              id={category.id}
              className={`catalog__category-list-item catalog__category-heading ${
                isTopCategory ? 'catalog__parent-category-heading' : ''
              } `}
              onClick={(event): Promise<void> => handleChangeCategory(event)}
            >
              {category.name}
            </li>
            {category.subcategories && (
              <li key={index} className="catalog__category-list-item">
                <ul className="catalog__category-list catalog__sub-category-list">
                  {renderCategories(category.subcategories, false, handleChangeCategory)}
                </ul>
              </li>
            )}
          </React.Fragment>
        )
      )}
    </>
  );
};
