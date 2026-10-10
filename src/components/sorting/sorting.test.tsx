import { render, screen } from '@testing-library/react';
import { SortingType } from '../../const';
import Sorting from './sorting';
import userEvent from '@testing-library/user-event';

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

  it('should call onChange with the checked sorting type', async () => {
    const onChange = vi.fn();
    const optionTestId = 'option';
    const optionIndex = 3;
    const expectedSortingType = SortingType.Rating;

    render(<Sorting currentType={SortingType.Default} onChange={onChange} />);
    const sortingOptions = screen.getAllByTestId(optionTestId);
    await userEvent.click(sortingOptions[optionIndex]);

    expect(onChange).toHaveBeenCalledWith(expectedSortingType);
  });
});
