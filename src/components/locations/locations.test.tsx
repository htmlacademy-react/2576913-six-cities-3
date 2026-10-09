import { render, screen } from '@testing-library/react';
import Locations from './locations';
import { CITIES } from '../../const';

describe('Component: Locations', () => {
  it('should render correctly', () => {
    const expectedCount = CITIES.length;
    const locationsContainerTestId = 'locationsContainer';
    const locationsValueTestId = 'locationsValue';
    const activeCityIndex = 0;

    render(<Locations cities={CITIES} currentCity={CITIES[activeCityIndex].name} onChange={() => {}} />);
    const locationsContainer = screen.getByTestId(locationsContainerTestId);
    const locationsValues = screen.getAllByTestId(locationsValueTestId);

    expect(locationsContainer).toBeInTheDocument();
    expect(locationsValues.length).toBe(expectedCount);
    expect(locationsValues[activeCityIndex]).toHaveClass('tabs__item--active');
  });
});
