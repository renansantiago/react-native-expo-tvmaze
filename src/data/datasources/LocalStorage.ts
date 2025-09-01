import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteShow } from '../../shared/types';

export class LocalStorage {
  private static FAVORITES_KEY = 'favorites';

  async getFavorites(): Promise<FavoriteShow[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(LocalStorage.FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error reading favorites from storage:', error);
      return [];
    }
  }

  async saveFavorites(favorites: FavoriteShow[]): Promise<void> {
    try {
      await AsyncStorage.setItem(LocalStorage.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
      throw new Error('Failed to save favorites');
    }
  }

  async addToFavorites(show: FavoriteShow): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const existingIndex = favorites.findIndex(fav => fav.id === show.id);
      
      if (existingIndex === -1) {
        favorites.push(show);
        await this.saveFavorites(favorites);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw new Error('Failed to add to favorites');
    }
  }

  async removeFromFavorites(showId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filteredFavorites = favorites.filter(fav => fav.id !== showId);
      await this.saveFavorites(filteredFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw new Error('Failed to remove from favorites');
    }
  }

  async isFavorite(showId: number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.id === showId);
    } catch (error) {
      console.error('Error checking if favorite:', error);
      return false;
    }
  }
}
