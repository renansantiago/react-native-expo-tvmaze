import { FavoriteShow } from '../../shared/types';

export interface FavoritesRepository {
  getFavorites(): Promise<FavoriteShow[]>;
  addToFavorites(show: FavoriteShow): Promise<void>;
  removeFromFavorites(showId: number): Promise<void>;
  isFavorite(showId: number): Promise<boolean>;
}
