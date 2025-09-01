import { ShowRepository } from '../../domain/repositories/ShowRepository';
import { Show, Episode, PaginatedResponse } from '../../shared/types';
import { TVMazeApi } from '../datasources/TVMazeApi';

export class ShowRepositoryImpl implements ShowRepository {
  private api: TVMazeApi;

  constructor() {
    this.api = new TVMazeApi();
  }

  async getShows(page: number): Promise<PaginatedResponse<Show>> {
    try {
      const shows = await this.api.getShows(page);
      return {
        data: shows,
        hasNextPage: shows.length === 250, // TVMaze returns 250 items per page
        hasPreviousPage: page > 0,
        currentPage: page,
      };
    } catch (error) {
      throw error;
    }
  }

  async getShowById(id: number): Promise<Show> {
    try {
      return await this.api.getShowById(id);
    } catch (error) {
      throw error;
    }
  }

  async searchShows(query: string): Promise<Show[]> {
    try {
      const searchResults = await this.api.searchShows(query);
      return searchResults.map(result => result.show);
    } catch (error) {
      throw error;
    }
  }

  async getShowEpisodes(showId: number): Promise<Episode[]> {
    try {
      return await this.api.getShowEpisodes(showId);
    } catch (error) {
      throw error;
    }
  }

  async getEpisodeById(episodeId: number): Promise<Episode> {
    try {
      return await this.api.getEpisodeById(episodeId);
    } catch (error) {
      throw error;
    }
  }
}
