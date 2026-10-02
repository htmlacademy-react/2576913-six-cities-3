import {useState, useEffect, useRef, RefObject} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Nullable } from 'vitest';
import {City} from '../types/offers';

function useMap(mapRef: RefObject<null>, city: City) {
  const [map, setMap] = useState<Nullable<leaflet.Map>>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
      );
    }
  }, [mapRef, city, map]);

  return map;
}

export default useMap;
