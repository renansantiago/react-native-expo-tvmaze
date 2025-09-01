import { PersonRepository } from '../../domain/repositories/PersonRepository';
import { Person, CastCredit, CrewCredit } from '../../shared/types';
import { TVMazeApi } from '../datasources/TVMazeApi';

export class PersonRepositoryImpl implements PersonRepository {
  private api: TVMazeApi;

  constructor() {
    this.api = new TVMazeApi();
  }

  async searchPeople(query: string): Promise<Person[]> {
    try {
      const searchResults = await this.api.searchPeople(query);
      return searchResults.map(result => result.person);
    } catch (error) {
      throw error;
    }
  }

  async getPersonById(id: number): Promise<Person> {
    try {
      return await this.api.getPersonById(id);
    } catch (error) {
      throw error;
    }
  }

  async getPersonCastCredits(personId: number): Promise<CastCredit[]> {
    try {
      return await this.api.getPersonCastCredits(personId);
    } catch (error) {
      throw error;
    }
  }

  async getPersonCrewCredits(personId: number): Promise<CrewCredit[]> {
    try {
      return await this.api.getPersonCrewCredits(personId);
    } catch (error) {
      throw error;
    }
  }
}
