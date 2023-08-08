import React, { ReactElement } from 'react';
import { MediaIntroItem, MediaListItem } from '../mediaHelpers/MediaItems';
import mediaData from '../mediaHelpers/mediaData';
import { IMediaItemData } from '@/types/interfaces';

const News = (): ReactElement => {
  const { introData, listData } = mediaData.news;

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

export default News;
