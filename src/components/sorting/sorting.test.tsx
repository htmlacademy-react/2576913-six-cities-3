import { render, screen } from '@testing-library/react';
import { SortingType } from '../../const';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sortingText = 'Sort by';
    const optionTestId = 'option';

    render(<Sorting currentType={SortingType.PriceLow} onChange={() => {}} />);
    const sortingOptions = screen.getAllByTestId(optionTestId);

    expect(screen.getByText(sortingText)).toBeInTheDocument();
    expect(sortingOptions.length).toBe(4);
    expect(sortingOptions[1]).toHaveClass('places__option--active');
  });
});
