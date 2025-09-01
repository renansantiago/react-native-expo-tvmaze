import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnChangeText = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search shows..."
      />
    );

    expect(getByPlaceholderText('Search shows...')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search shows..."
      />
    );

    const input = getByPlaceholderText('Search shows...');
    fireEvent.changeText(input, 'test');

    expect(mockOnChangeText).toHaveBeenCalledWith('test');
  });

  it('displays the current value', () => {
    const { getByDisplayValue } = render(
      <SearchBar
        value="test value"
        onChangeText={mockOnChangeText}
        placeholder="Search shows..."
      />
    );

    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('shows clear button when there is text', () => {
    const { getByTestId } = render(
      <SearchBar
        value="test"
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        placeholder="Search shows..."
      />
    );

    const clearButton = getByTestId('clear-button');
    expect(clearButton).toBeTruthy();
  });

  it('hides clear button when there is no text', () => {
    const { queryByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        placeholder="Search shows..."
      />
    );

    const clearButton = queryByTestId('clear-button');
    expect(clearButton).toBeNull();
  });

  it('calls onClear when clear button is pressed', () => {
    const { getByTestId } = render(
      <SearchBar
        value="test"
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        placeholder="Search shows..."
      />
    );

    const clearButton = getByTestId('clear-button');
    fireEvent.press(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it('shows search icon by default', () => {
    const { getByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search shows..."
      />
    );

    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('hides search icon when showSearchIcon is false', () => {
    const { queryByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search shows..."
        showSearchIcon={false}
      />
    );

    expect(queryByTestId('search-icon')).toBeNull();
  });
});
