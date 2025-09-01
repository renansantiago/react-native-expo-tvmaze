import { ShowRepository } from '../repositories/ShowRepository';
import { Show, PaginatedResponse } from '../../shared/types';

export class GetShowsUseCase {
  private showRepository: ShowRepository;

  constructor(showRepository: ShowRepository) {
    this.showRepository = showRepository;
  }

  async execute(page: number): Promise<PaginatedResponse<Show>> {
    return await this.showRepository.getShows(page);
  }
}
