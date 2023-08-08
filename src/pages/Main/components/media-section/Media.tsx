import './Media.scss';
import React, { ReactElement, useState } from 'react';
import Button from '@/components/Button/Button';
import mediaButtons from './mediaHelpers/mediaBtnData';
import News from './NewsAndArticles/Articles';
import Articles from './NewsAndArticles/News';
import Video from './Video/Video';

const MediaSection = (): ReactElement => {
  const [activeMedia, setActiveMedia] = useState('articles');

  const handleChangeMedia = (media: string): void => {
    setActiveMedia(media);
  };

  return (
    <section className="media container">
      <div className="media__container">
        <div className="media__toogle-btns-container">
          {mediaButtons.map((btn) => (
            <Button
              key={btn.type}
              className={`media__toogle-btn${activeMedia === btn.type ? ' media__toogle-btn--active' : ''}`}
              type="button"
              text={btn.label}
              onClick={(): void => handleChangeMedia(btn.type)}
            />
          ))}
        </div>
        <article className="media__article-container">
          {activeMedia === 'articles' && <Articles />}
          {activeMedia === 'news' && <News />}
          {activeMedia === 'video' && <Video />}
        </article>
      </div>
    </section>
  );
};

export default MediaSection;
