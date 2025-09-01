import { ShowRepository } from '../repositories/ShowRepository';
import { Show } from '../../shared/types';

export class SearchShowsUseCase {
  private showRepository: ShowRepository;

  constructor(showRepository: ShowRepository) {
    this.showRepository = showRepository;
  }

  async execute(query: string): Promise<Show[]> {
    if (!query.trim()) {
      return [];
    }
    return await this.showRepository.searchShows(query);
  }
}
