import { PersonRepository } from '../repositories/PersonRepository';
import { Person, CastCredit, CrewCredit } from '../../shared/types';

export class GetPersonDetailsUseCase {
  private personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  async execute(personId: number): Promise<{
    person: Person;
    castCredits: CastCredit[];
    crewCredits: CrewCredit[];
  }> {
    const [person, castCredits, crewCredits] = await Promise.all([
      this.personRepository.getPersonById(personId),
      this.personRepository.getPersonCastCredits(personId),
      this.personRepository.getPersonCrewCredits(personId),
    ]);

    return { person, castCredits, crewCredits };
  }
}
