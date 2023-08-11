import newsPhotoIntro from '@/assets/images/jpg/main-media-news-intro.jpg';
import articlesPhotoIntro from '@/assets/images/jpg/main-media-articles-intro.jpg';
import videoPhotoIntro from '@/assets/images/jpg/main-media-intro-video.jpg';
import healthAgePhotoPreview from '@/assets/images/jpg/main-media-health-video.jpg';

const mediaData = {
  news: {
    introData: {
      heading: 'Вспышки кори зафиксированы в половине регионов России',
      date: '25 апреля 2023',
      link: 'https://ren.tv/news/zdorove/1097863',
      img: newsPhotoIntro,
    },
    listData: [
      {
        heading: 'Всемирный день здоровья – 2023: история праздника и советы врачей',
        date: '7 апреля 2023',
        link: 'https://ren.tv/longread/1092318',
      },
      {
        heading: 'ВОЗ о высоком риске распространения холеры в мире',
        date: '23 марта 2023',
        link: 'https://tass.ru/obschestvo/18446967/',
      },
      {
        heading: 'MedTech-стартапы получат поддержку Yandex.Cloud до 1,5млн. рублей',
        date: '18 февраля 2022',
        link: 'https://www.mos.ru/news/item/102803073/',
      },
    ],
  },
  articles: {
    introData: {
      heading: 'Ученые предложили использовать пчелиный яд против коронавируса',
      date: '25 апреля 2023',
      link: 'https://ren.tv/news/v-mire/781317',
      img: articlesPhotoIntro,
    },
    listData: [
      {
        heading: 'Врач рассказал, как арбузные косточки влияют на организм человека',
        date: '4 августа 2023',
        link: 'https://ren.tv/news/zdorove/1129451',
      },
      {
        heading: 'Врач рассказал, что категорически нельзя делать при солнечных ожогах',
        date: '5 августа 2023',
        link: 'https://ren.tv/news/zdorove/1129930',
      },
      {
        heading: 'Названы самые опасные для здоровья спины профессии',
        date: '2 августа 2023',
        link: 'https://ren.tv/news/zdorove/1128872',
      },
    ],
  },
  video: {
    introData: {
      heading: 'Научно-практическая конференция «Наука. Медицина. Инновации: Неинфекционные...»',
      date: '20 апреля 2023г',
      link: 'https://www.youtube.com/watch?v=13H5jMZYcvw',
      videoPreviewImg: videoPhotoIntro,
    },
    listData: [
      {
        heading: 'V Международный конгресс Health Age...',
        date: '4 августа 2023',
        link: 'https://www.youtube.com/watch?v=xMJ9ruWIlcU&t',
        videoPreviewImg: healthAgePhotoPreview,
      },
      {
        heading: 'V Международный конгресс Health Age...',
        date: '5 августа 2023',
        link: '',
        videoPreviewImg: healthAgePhotoPreview,
      },
    ],
  },
};

export default mediaData;
