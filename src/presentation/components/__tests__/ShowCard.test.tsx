import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ShowCard } from '../ShowCard';
import { Show } from '../../../shared/types';

// Mock the useIsFavorite hook
jest.mock('../../hooks/useFavorites', () => ({
  useIsFavorite: jest.fn(() => ({ data: false })),
}));

const mockShow: Show = {
  id: 1,
  name: 'Test Show',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Thriller'],
  status: 'Running',
  runtime: 60,
  premiered: '2020-01-01',
  officialSite: 'https://test.com',
  schedule: {
    time: '20:00',
    days: ['Monday'],
  },
  rating: {
    average: 8.5,
  },
  weight: 100,
  network: {
    id: 1,
    name: 'Test Network',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 12345,
    thetvdb: 67890,
    imdb: 'tt1234567',
  },
  image: {
    medium: 'https://test.com/image.jpg',
    original: 'https://test.com/image-original.jpg',
  },
  summary: 'A test show summary',
  updated: 1234567890,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
    previousepisode: null,
    nextepisode: null,
  },
};

describe('ShowCard', () => {
  const mockOnPress = jest.fn();
  const mockOnFavoritePress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders show information correctly', () => {
    const { getByText } = render(
      <ShowCard
        show={mockShow}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    expect(getByText('Test Show')).toBeTruthy();
    expect(getByText('Drama • Thriller')).toBeTruthy();
    expect(getByText('8.5')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const { getByTestId } = render(
      <ShowCard
        show={mockShow}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    const card = getByTestId('show-card');
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onFavoritePress when favorite button is pressed', () => {
    const { getByTestId } = render(
      <ShowCard
        show={mockShow}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);

    expect(mockOnFavoritePress).toHaveBeenCalledTimes(1);
  });

  it('hides favorite button when showFavoriteButton is false', () => {
    const { queryByTestId } = render(
      <ShowCard
        show={mockShow}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
        showFavoriteButton={false}
      />
    );

    expect(queryByTestId('favorite-button')).toBeNull();
  });

  it('renders without image when image is null', () => {
    const showWithoutImage = { ...mockShow, image: null };
    
    const { getByText } = render(
      <ShowCard
        show={showWithoutImage}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    expect(getByText('Test Show')).toBeTruthy();
  });

  it('renders without genres when genres array is empty', () => {
    const showWithoutGenres = { ...mockShow, genres: [] };
    
    const { getByText, queryByText } = render(
      <ShowCard
        show={showWithoutGenres}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    expect(getByText('Test Show')).toBeTruthy();
    expect(queryByText('Drama • Thriller')).toBeNull();
  });

  it('renders without rating when rating is null', () => {
    const showWithoutRating = { ...mockShow, rating: { average: null } };
    
    const { getByText, queryByText } = render(
      <ShowCard
        show={showWithoutRating}
        onPress={mockOnPress}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    expect(getByText('Test Show')).toBeTruthy();
    expect(queryByText('8.5')).toBeNull();
  });
});
