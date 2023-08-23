import React, { ReactElement } from 'react';
import mediaData from '../mediaHelpers/mediaData';
import { IMediaItemData } from '@/types/componentsInrefaces';
import { MediaIntroItem, MediaListItem } from '../mediaHelpers/MediaItems';

const Video = (): ReactElement => {
  const { introData, listData } = mediaData.video;

  return (
    <>
      <MediaIntroItem introData={introData} />
      <ul className="media__list media__list-video">
        {listData.map((data: IMediaItemData) => (
          <MediaListItem key={data.heading} data={data} />
        ))}
      </ul>
    </>
  );
};

export default Video;
