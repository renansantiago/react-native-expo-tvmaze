import { Show, Episode, PaginatedResponse } from '../../shared/types';

export interface ShowRepository {
  getShows(page: number): Promise<PaginatedResponse<Show>>;
  getShowById(id: number): Promise<Show>;
  searchShows(query: string): Promise<Show[]>;
  getShowEpisodes(showId: number): Promise<Episode[]>;
  getEpisodeById(episodeId: number): Promise<Episode>;
}
