import { FavoritesRepository } from '../../domain/repositories/FavoritesRepository';
import { FavoriteShow } from '../../shared/types';
import { LocalStorage } from '../datasources/LocalStorage';

export class FavoritesRepositoryImpl implements FavoritesRepository {
  private storage: LocalStorage;

  constructor() {
    this.storage = new LocalStorage();
  }

  async getFavorites(): Promise<FavoriteShow[]> {
    try {
      const favorites = await this.storage.getFavorites();
      return favorites.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw error;
    }
  }

  async addToFavorites(show: FavoriteShow): Promise<void> {
    try {
      await this.storage.addToFavorites(show);
    } catch (error) {
      throw error;
    }
  }

  async removeFromFavorites(showId: number): Promise<void> {
    try {
      await this.storage.removeFromFavorites(showId);
    } catch (error) {
      throw error;
    }
  }

  async isFavorite(showId: number): Promise<boolean> {
    try {
      return await this.storage.isFavorite(showId);
    } catch (error) {
      console.error('Error checking if favorite:', error);
      return false;
    }
  }
}
