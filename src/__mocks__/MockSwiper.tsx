import React, { ReactElement } from 'react';

const swiperMocks = {
  Swiper: ({ children }: { children: ReactElement }): ReactElement => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactElement }): ReactElement => <div>{children}</div>,
  useSwiper: (): { swiper: { slideNext: () => void } } => ({
    swiper: {
      slideNext: (): void => {},
    },
  }),
};

export default swiperMocks;
