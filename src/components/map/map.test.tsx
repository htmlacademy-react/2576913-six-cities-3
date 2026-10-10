import {render} from '@testing-library/react';
import {CITIES, URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';
import Map from './map';

const leafletMocks = vi.hoisted(() => {
  type MarkerLocation = {lat: number; lng: number};
  type MarkerOptions = {icon: {iconUrl: string}};

  const mapInstance = {};
  const markerLayer = {
    addTo: vi.fn(),
    clearLayers: vi.fn(),
  };
  markerLayer.addTo.mockReturnValue(markerLayer);

  return {
    mapInstance,
    markerLayer,
    icon: vi.fn((options: {iconUrl: string}) => options),
    layerGroup: vi.fn(() => markerLayer),
    marker: vi.fn((location: MarkerLocation, options: MarkerOptions) => {
      void location;
      void options;
      return {addTo: vi.fn()};
    }),
  };
});

vi.mock('leaflet', () => ({
  default: {
    icon: leafletMocks.icon,
    layerGroup: leafletMocks.layerGroup,
    marker: leafletMocks.marker,
  },
}));

vi.mock('../../hooks/use-map', () => ({
  default: () => leafletMocks.mapInstance,
}));

describe('Component: Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map container with the provided class name', () => {
    const {container} = render(<Map city={CITIES[0]} offers={[]} className="offer__map" />);

    expect(container.querySelector('section.map')).toHaveClass('offer__map', 'map');
  });

  it('should create a marker for each offer at its location', () => {
    const firstOffer = makeFakeOffer();
    const secondOffer = {...makeFakeOffer(), id: 'second-offer'};

    render(<Map city={CITIES[0]} offers={[firstOffer, secondOffer]} />);

    expect(leafletMocks.marker.mock.calls).toHaveLength(2);
    expect(leafletMocks.marker.mock.calls[0][0]).toEqual({
      lat: firstOffer.location.latitude,
      lng: firstOffer.location.longitude,
    });
    expect(leafletMocks.marker.mock.calls[0][1].icon.iconUrl).toBe(URL_MARKER_DEFAULT);
    expect(leafletMocks.marker.mock.calls[1][0]).toEqual({
      lat: secondOffer.location.latitude,
      lng: secondOffer.location.longitude,
    });
    expect(leafletMocks.marker.mock.calls[1][1].icon.iconUrl).toBe(URL_MARKER_DEFAULT);
  });

  it('should use the active marker icon only for the active offer', () => {
    const firstOffer = makeFakeOffer();
    const activeOffer = {...makeFakeOffer(), id: 'active-offer'};

    render(
      <Map
        city={CITIES[0]}
        offers={[firstOffer, activeOffer]}
        activeOffer={activeOffer}
      />
    );

    expect(leafletMocks.marker.mock.calls).toHaveLength(2);
    expect(leafletMocks.marker.mock.calls[0][1].icon.iconUrl).toBe(URL_MARKER_DEFAULT);
    expect(leafletMocks.marker.mock.calls[1][1].icon.iconUrl).toBe(URL_MARKER_ACTIVE);
    expect(leafletMocks.layerGroup.mock.calls).toHaveLength(1);
    expect(leafletMocks.markerLayer.addTo).toHaveBeenCalledWith(leafletMocks.mapInstance);
    expect(leafletMocks.markerLayer.clearLayers.mock.calls).toHaveLength(1);
  });
});
