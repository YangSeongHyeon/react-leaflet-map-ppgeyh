import React, { useEffect, useRef } from 'react';
import { map, tileLayer, Browser } from 'leaflet';

import './myMap.css';

const MyMap = ({
  mapIsReadyCallback /* To be triggered when a map object is created */,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initialState = {
      lng: 126.97844906350132,
      lat: 37.56492306412759,
      zoom: 18,
    };

    const leafletMap = map(mapContainer.current).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // This API key is for use only in stackblitz.com
    // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
    // The Geoapify service is free for small projects and the development phase.
    const myAPIKey = '18c85a44a76042788847e2fb74d27386';
    const isRetina = Browser.retina;
    var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
      maxZoom: 20,
      id: 'osm-bright',
    }).addTo(leafletMap);

    mapIsReadyCallback(leafletMap);
  }, [mapContainer.current]);

  return <div className="map-container" ref={mapContainer}></div>;
};

export default MyMap;
