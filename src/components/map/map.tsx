import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const';
import {City, Offers, Offer} from '../../types/offers';
import {Nullable} from 'vitest';

type MapProps = {
  city: City;
  offers: Offers;
  activeOffer?: Nullable<Offer>;
  className?: string;
};

function Map({city, offers, activeOffer, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const markerLayerRef = useRef<leaflet.LayerGroup | null>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const activeCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
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

    const activeOfferId = activeOffer && activeOffer.id;

    offers.forEach(({id, location}) => {
      leaflet.marker({
        lat: location.latitude,
        lng: location.longitude,
      }, {
        icon: id === activeOfferId ? activeCustomIcon : defaultCustomIcon,
      }).addTo(markerLayer);
    });
  }, [map, city, offers, activeOffer, defaultCustomIcon, activeCustomIcon]);

  return (
    <section className={`${className || ''} map`} ref={mapRef}></section>
  );
}

export default Map;
