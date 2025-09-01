import { FavoritesRepository } from '../repositories/FavoritesRepository';
import { FavoriteShow } from '../../shared/types';

export class GetFavoritesUseCase {
  private favoritesRepository: FavoritesRepository;

  constructor(favoritesRepository: FavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(): Promise<FavoriteShow[]> {
    return await this.favoritesRepository.getFavorites();
  }
}

export class AddToFavoritesUseCase {
  private favoritesRepository: FavoritesRepository;

  constructor(favoritesRepository: FavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(show: FavoriteShow): Promise<void> {
    await this.favoritesRepository.addToFavorites(show);
  }
}

export class RemoveFromFavoritesUseCase {
  private favoritesRepository: FavoritesRepository;

  constructor(favoritesRepository: FavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(showId: number): Promise<void> {
    await this.favoritesRepository.removeFromFavorites(showId);
  }
}

export class IsFavoriteUseCase {
  private favoritesRepository: FavoritesRepository;

  constructor(favoritesRepository: FavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(showId: number): Promise<boolean> {
    return await this.favoritesRepository.isFavorite(showId);
  }
}
