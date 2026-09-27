import {useState, useEffect, useRef, RefObject} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Nullable } from 'vitest';

type City = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

function useMap(mapRef: RefObject<null>, city: City) {
  const [map, setMap] = useState<Nullable<leaflet.Map>>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
