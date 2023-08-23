import React, { ReactElement } from 'react';
import { MediaIntroItem, MediaListItem } from '../mediaHelpers/MediaItems';
import mediaData from '../mediaHelpers/mediaData';
import { IMediaItemData } from '@/types/componentsInrefaces';

const Articles = (): ReactElement => {
  const { introData, listData } = mediaData.articles;

  return (
    <>
      <MediaIntroItem introData={introData} />
      <ul className="media__list media__news-list">
        {listData.map((data: IMediaItemData) => (
          <MediaListItem key={data.heading} data={data} />
        ))}
      </ul>
    </>
  );
};

export default Articles;
