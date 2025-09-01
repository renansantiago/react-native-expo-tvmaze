import axios, { AxiosInstance } from 'axios';
import { Show, Episode, Person, CastCredit, CrewCredit, SearchResult, PersonSearchResult } from '../../shared/types';

export class TVMazeApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.tvmaze.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getShows(page: number): Promise<Show[]> {
    try {
      const response = await this.api.get(`/shows?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new Error('Failed to fetch shows');
    }
  }

  async getShowById(id: number): Promise<Show> {
    try {
      const response = await this.api.get(`/shows/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show details:', error);
      throw new Error('Failed to fetch show details');
    }
  }

  async searchShows(query: string): Promise<SearchResult[]> {
    try {
      const response = await this.api.get(`/search/shows?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching shows:', error);
      throw new Error('Failed to search shows');
    }
  }

  async getShowEpisodes(showId: number): Promise<Episode[]> {
    try {
      const response = await this.api.get(`/shows/${showId}/episodes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show episodes:', error);
      throw new Error('Failed to fetch show episodes');
    }
  }

  async getEpisodeById(episodeId: number): Promise<Episode> {
    try {
      const response = await this.api.get(`/episodes/${episodeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episode details:', error);
      throw new Error('Failed to fetch episode details');
    }
  }

  async searchPeople(query: string): Promise<PersonSearchResult[]> {
    try {
      const response = await this.api.get(`/search/people?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching people:', error);
      throw new Error('Failed to search people');
    }
  }

  async getPersonById(id: number): Promise<Person> {
    try {
      const response = await this.api.get(`/people/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching person details:', error);
      throw new Error('Failed to fetch person details');
    }
  }

  async getPersonCastCredits(personId: number): Promise<CastCredit[]> {
    try {
      const response = await this.api.get(`/people/${personId}/castcredits?embed=show`);
      return response.data;
    } catch (error) {
      console.error('Error fetching person cast credits:', error);
      throw new Error('Failed to fetch person cast credits');
    }
  }

  async getPersonCrewCredits(personId: number): Promise<CrewCredit[]> {
    try {
      const response = await this.api.get(`/people/${personId}/crewcredits?embed=show`);
      return response.data;
    } catch (error) {
      console.error('Error fetching person crew credits:', error);
      throw new Error('Failed to fetch person crew credits');
    }
  }
}
