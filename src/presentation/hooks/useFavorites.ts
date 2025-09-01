import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FavoriteShow } from '../../shared/types';
import { FavoritesRepositoryImpl } from '../../data/repositories/FavoritesRepositoryImpl';
import {
  GetFavoritesUseCase,
  AddToFavoritesUseCase,
  RemoveFromFavoritesUseCase,
  IsFavoriteUseCase,
} from '../../domain/usecases/FavoritesUseCase';

const favoritesRepository = new FavoritesRepositoryImpl();
const getFavoritesUseCase = new GetFavoritesUseCase(favoritesRepository);
const addToFavoritesUseCase = new AddToFavoritesUseCase(favoritesRepository);
const removeFromFavoritesUseCase = new RemoveFromFavoritesUseCase(favoritesRepository);
const isFavoriteUseCase = new IsFavoriteUseCase(favoritesRepository);

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavoritesUseCase.execute(),
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (show: FavoriteShow) => addToFavoritesUseCase.execute(show),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (showId: number) => removeFromFavoritesUseCase.execute(showId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useIsFavorite = (showId: number) => {
  return useQuery({
    queryKey: ['is-favorite', showId],
    queryFn: () => isFavoriteUseCase.execute(showId),
  });
};
