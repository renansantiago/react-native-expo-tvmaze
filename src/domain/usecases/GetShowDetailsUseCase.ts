import { ShowRepository } from '../repositories/ShowRepository';
import { Show, Episode } from '../../shared/types';

export class GetShowDetailsUseCase {
  private showRepository: ShowRepository;

  constructor(showRepository: ShowRepository) {
    this.showRepository = showRepository;
  }

  async execute(showId: number): Promise<{ show: Show; episodes: Episode[] }> {
    const [show, episodes] = await Promise.all([
      this.showRepository.getShowById(showId),
      this.showRepository.getShowEpisodes(showId),
    ]);

    return { show, episodes };
  }
}
