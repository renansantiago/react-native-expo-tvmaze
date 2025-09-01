import { PersonRepository } from '../repositories/PersonRepository';
import { Person } from '../../shared/types';

export class SearchPeopleUseCase {
  private personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  async execute(query: string): Promise<Person[]> {
    if (!query.trim()) {
      return [];
    }
    return await this.personRepository.searchPeople(query);
  }
}
