import { ShowRepository } from '../repositories/ShowRepository';
import { Episode } from '../../shared/types';

export class GetEpisodeDetailsUseCase {
  private showRepository: ShowRepository;

  constructor(showRepository: ShowRepository) {
    this.showRepository = showRepository;
  }

  async execute(episodeId: number): Promise<Episode> {
    return await this.showRepository.getEpisodeById(episodeId);
  }
}
