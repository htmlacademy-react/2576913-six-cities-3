import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT} from '../../const';
import {City, Offers} from '../../types/offers';

type MapProps = {
  city: City;
  offers: Offers;
  className?: string;
};

function Map({city, offers, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const markerLayerRef = useRef<leaflet.LayerGroup | null>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = markerLayerRef.current ?? leaflet.layerGroup().addTo(map);
    markerLayer.clearLayers();
    markerLayerRef.current = markerLayer;

    offers.forEach(({location}) => {
      leaflet.marker({
        lat: location.latitude,
        lng: location.longitude,
      }, {
        icon: defaultCustomIcon,
      }).addTo(markerLayer);
    });
  }, [map, city, offers, defaultCustomIcon]);

  return (
    <section className={`${className || ''} map`} ref={mapRef}></section>
  );
}

export default Map;
