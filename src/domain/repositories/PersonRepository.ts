import { Person, CastCredit, CrewCredit } from '../../shared/types';

export interface PersonRepository {
  searchPeople(query: string): Promise<Person[]>;
  getPersonById(id: number): Promise<Person>;
  getPersonCastCredits(personId: number): Promise<CastCredit[]>;
  getPersonCrewCredits(personId: number): Promise<CrewCredit[]>;
}
