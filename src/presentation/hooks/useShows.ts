import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Show, PaginatedResponse } from "../../shared/types";
import { ShowRepositoryImpl } from "../../data/repositories/ShowRepositoryImpl";
import { GetShowsUseCase, SearchShowsUseCase } from "../../domain/usecases";

const showRepository = new ShowRepositoryImpl();
const getShowsUseCase = new GetShowsUseCase(showRepository);
const searchShowsUseCase = new SearchShowsUseCase(showRepository);

export const useShows = (page: number = 0) => {
  return useQuery({
    queryKey: ["shows", page],
    queryFn: () => getShowsUseCase.execute(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInfiniteShows = () => {
  return useInfiniteQuery({
    queryKey: ["shows"],
    queryFn: ({ pageParam = 0 }) => getShowsUseCase.execute(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PaginatedResponse<Show>) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchShows = (query: string) => {
  return useQuery({
    queryKey: ["search-shows", query],
    queryFn: () => searchShowsUseCase.execute(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
