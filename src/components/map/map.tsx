import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT} from '../../const';
import {Offers} from '../../types/offers';

type MapProps = {
  city: {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
  };
  offers: Offers;
  className?: string;
};

function Map({city, offers, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach(({location}) => {
        leaflet.marker({
          lat: location.latitude,
          lng: location.longitude,
        }, {
          icon: defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [map, offers, defaultCustomIcon]);

  return (
    <section className={`${className || ''} map`} ref={mapRef}></section>
  );
}

export default Map;
