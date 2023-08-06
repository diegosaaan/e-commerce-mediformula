import React, { ReactElement } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import customLabelIcon from '@/assets/images/svg/footer-label-on-map.svg';

export default function YandexMap(): ReactElement {
  const defaultState = {
    center: [55.768426, 37.6753],
    zoom: 17,
  };

  const mapStyle = {
    width: '100%',
    height: '300px',
  };

  const placemarkOptions = {
    iconLayout: 'default#image',
    iconImageSize: [50, 50],
    iconImageHref: customLabelIcon,
    iconCaption: 'подсказка',
  };

  return (
    <YMaps>
      <Map defaultState={defaultState} style={mapStyle}>
        <Placemark geometry={[55.768426, 37.6753]} options={placemarkOptions} />
      </Map>
    </YMaps>
  );
}
