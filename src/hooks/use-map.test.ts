import { renderHook, act } from '@testing-library/react';
import leaflet from 'leaflet';
import { MemoryRouter } from 'react-router-dom';
import useMap from './use-map';
import { CITIES } from '../const';

describe('Hook: useMap', () => {
  it('should return leaflet map', () => {
    const mapContainer = document.createElement('div');
    document.body.appendChild(mapContainer);
    const mapRef = {current: mapContainer};

    const {result, unmount} = renderHook(() => useMap(mapRef, CITIES[0]), {
      wrapper: MemoryRouter,
    });

    expect(result.current).toBeInstanceOf(leaflet.Map);

    act(() => {
      result.current?.remove();
    });
    unmount();
    mapContainer.remove();
  });
});
