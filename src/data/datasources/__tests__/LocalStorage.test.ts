import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorage } from '../LocalStorage';
import { FavoriteShow } from '../../../shared/types';

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('LocalStorage', () => {
  let localStorage: LocalStorage;

  beforeEach(() => {
    localStorage = new LocalStorage();
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('returns empty array when no favorites exist', async () => {
      mockedAsyncStorage.getItem.mockResolvedValueOnce(null);

      const result = await localStorage.getFavorites();

      expect(result).toEqual([]);
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith('favorites');
    });

    it('returns parsed favorites when they exist', async () => {
      const mockFavorites: FavoriteShow[] = [
        { id: 1, name: 'Test Show', image: null, addedAt: Date.now() }
      ];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

      const result = await localStorage.getFavorites();

      expect(result).toEqual(mockFavorites);
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith('favorites');
    });

    it('returns empty array when storage error occurs', async () => {
      mockedAsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));

      const result = await localStorage.getFavorites();

      expect(result).toEqual([]);
    });
  });

  describe('addToFavorites', () => {
    it('adds show to favorites successfully', async () => {
      const mockShow: FavoriteShow = { id: 1, name: 'Test Show', image: null, addedAt: Date.now() };
      mockedAsyncStorage.getItem.mockResolvedValueOnce('[]');
      mockedAsyncStorage.setItem.mockResolvedValueOnce();

      await localStorage.addToFavorites(mockShow);

      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([mockShow]));
    });

    it('does not add duplicate show', async () => {
      const mockShow: FavoriteShow = { id: 1, name: 'Test Show', image: null, addedAt: Date.now() };
      const existingFavorites = [mockShow];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingFavorites));
      mockedAsyncStorage.setItem.mockResolvedValueOnce();

      await localStorage.addToFavorites(mockShow);

      // When show already exists, it should not call setItem again
      expect(mockedAsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeFromFavorites', () => {
    it('removes show from favorites successfully', async () => {
      const mockFavorites: FavoriteShow[] = [
        { id: 1, name: 'Test Show 1', image: null, addedAt: Date.now() },
        { id: 2, name: 'Test Show 2', image: null, addedAt: Date.now() }
      ];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));
      mockedAsyncStorage.setItem.mockResolvedValueOnce();

      await localStorage.removeFromFavorites(1);

      const expectedFavorites = mockFavorites.filter(fav => fav.id !== 1);
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(expectedFavorites));
    });

    it('does nothing when show does not exist', async () => {
      const mockFavorites: FavoriteShow[] = [
        { id: 1, name: 'Test Show 1', image: null, addedAt: Date.now() }
      ];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));
      mockedAsyncStorage.setItem.mockResolvedValueOnce();

      await localStorage.removeFromFavorites(999);

      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(mockFavorites));
    });
  });

  describe('isFavorite', () => {
    it('returns true when show is in favorites', async () => {
      const mockFavorites: FavoriteShow[] = [
        { id: 1, name: 'Test Show', image: null, addedAt: Date.now() }
      ];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

      const result = await localStorage.isFavorite(1);

      expect(result).toBe(true);
    });

    it('returns false when show is not in favorites', async () => {
      const mockFavorites: FavoriteShow[] = [
        { id: 1, name: 'Test Show', image: null, addedAt: Date.now() }
      ];
      mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

      const result = await localStorage.isFavorite(999);

      expect(result).toBe(false);
    });

    it('returns false when storage error occurs', async () => {
      mockedAsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));

      const result = await localStorage.isFavorite(1);

      expect(result).toBe(false);
    });
  });
});
