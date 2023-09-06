import React, { ReactElement, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getCategories } from '@/services/catalog';
import { ICategoryData, ICategoryDataResponse } from '@/types/apiInterfaces';
import { IBreadcrumbsData } from '@/types/componentsInrefaces';

export const initialBreadCrumbsData = [
  {
    link: '/',
    name: 'Главная',
  },
  {
    link: '/catalog',
    name: 'Каталог',
  },
  {
    id: ' ',
    name: 'Все категории',
  },
];

export const createBreadcrumbs = async (categoryId: string): Promise<IBreadcrumbsData[]> => {
  const categoriesBreadcrumbs: IBreadcrumbsData[] = [];

  const getCategoryData = async (id: string): Promise<ICategoryData> => {
    const url = `${ApiEndpoints.URL_CATALOG_CATEGORIES}/${id}`;
    const { data } = (await getCategories(url)) as ICategoryDataResponse;
    return data;
  };

  const addCategoryToBreadcrumbs = async (id: string): Promise<void> => {
    if (id) {
      const data = await getCategoryData(id);
      categoriesBreadcrumbs.push({
        id: data.id,
        name: data.name.ru,
      });

      if (data.parent) {
        await addCategoryToBreadcrumbs(data.parent.id);
      }
    } else {
      categoriesBreadcrumbs.push({ id: '', name: 'Все категории' });
    }
  };

  await addCategoryToBreadcrumbs(categoryId);

  const result = [
    ...categoriesBreadcrumbs,
    ...[
      {
        link: '/catalog',
        name: 'Каталог',
      },
      {
        link: '/',
        name: 'Главная',
      },
    ],
  ];

  return result.reverse();
};

export const renderBrendcrumbs = (
  brendcrumbsData: IBreadcrumbsData[],
  handleChangeCategory: (event: MouseEvent) => Promise<void>
): ReactElement => (
  <>
    {brendcrumbsData.map((item, index) => (
      <React.Fragment key={index}>
        {item.link && (
          <li key={`link-${item.id}`} className="catalog__breadcrumb-item">
            <Link className="catalog__breadcrumb-link" to={item.link}>
              {`${item.name}`}
              <span className="catalog__breadcrumb-dott">•</span>
            </Link>
          </li>
        )}
        {'id' in item && (
          <li
            tabIndex={0}
            key={`id-${item.id}`}
            className="catalog__breadcrumb-item"
            id={item.id}
            onClick={handleChangeCategory}
          >
            {`${item.name}`}
            <span className="catalog__breadcrumb-dott">{`${!brendcrumbsData[index + 1] ? '' : '•'}`}</span>
          </li>
        )}
      </React.Fragment>
    ))}
  </>
);
