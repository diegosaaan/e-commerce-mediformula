import React, { ReactElement } from 'react';
import linkArrow from '@/assets/images/svg/main-media-link-arrow.svg';
import { IMediaItemData } from '@/types/componentsInrefaces';

export const MediaIntroItem = ({
  introData: { heading, date, link, img, videoPreviewImg },
}: {
  introData: IMediaItemData;
}): ReactElement => (
  <a className={`media__intro-link ${videoPreviewImg ? 'media__video-intro-link' : ''}`} href={link} target="_blank">
    <div className="media__intro-heading-container">
      <h4 className="media__intro-heading">{heading}</h4>
      <span className="media__date">{date}</span>
    </div>
    <div
      className={`media__intro-photo ${videoPreviewImg ? 'media__intro-photo-video-preview' : ''}`}
      style={{
        backgroundImage: `url(${img || videoPreviewImg})`,
      }}
    >
      {!videoPreviewImg && <img className="media__intro-link-arrow" src={linkArrow} alt="Links arrow" />}
    </div>
  </a>
);

export const MediaListItem = ({
  data: { heading, date, link, videoPreviewImg },
}: {
  data: IMediaItemData;
}): ReactElement => (
  <li className={`media__list-item ${videoPreviewImg ? 'media__list-video-item media__list-item--no-border' : ''}`}>
    <a className="media__list-link-container" href={link} target="_blank">
      {videoPreviewImg && <img className="media__list-item-preview" src={videoPreviewImg} alt="Video preview image" />}
      <h5 className="media__list-item-heading">{heading}</h5>
      <span className="media__date">{date}</span>
    </a>
  </li>
);
