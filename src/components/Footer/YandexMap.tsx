import React, { ReactElement } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export default function YandexMap(): ReactElement {
  const defaultState = {
    center: [55.768426, 37.675927],
    zoom: 17,
  };

  const mapStyle = {
    width: '100%',
    height: '300px',
  };

  const placemarkOptions = {
    preset: 'islands#redDotIconWithCaption',
  };

  return (
    <YMaps>
      <Map defaultState={defaultState} style={mapStyle}>
        <Placemark geometry={[55.768426, 37.675927]} options={placemarkOptions} />
      </Map>
    </YMaps>
  );
}
