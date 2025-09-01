import { GetShowsUseCase } from '../GetShowsUseCase';
import { ShowRepository } from '../../repositories/ShowRepository';
import { Show } from '../../../shared/types';

// Mock the repository
const mockShowRepository: jest.Mocked<ShowRepository> = {
  getShows: jest.fn(),
  getShowDetails: jest.fn(),
  getEpisodes: jest.fn(),
  searchShows: jest.fn(),
};

describe('GetShowsUseCase', () => {
  let useCase: GetShowsUseCase;

  beforeEach(() => {
    useCase = new GetShowsUseCase(mockShowRepository);
    jest.clearAllMocks();
  });

  it('executes successfully and returns shows', async () => {
    const mockShows: Show[] = [
      {
        id: 1,
        name: 'Test Show 1',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama'],
        status: 'Running',
        runtime: 60,
        premiered: '2020-01-01',
        officialSite: 'https://test.com',
        schedule: {
          time: '20:00',
          days: ['Monday'],
        },
        rating: {
          average: 8.5,
        },
        weight: 100,
        network: {
          id: 1,
          name: 'Test Network',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        webChannel: null,
        dvdCountry: null,
        externals: {
          tvrage: 12345,
          thetvdb: 67890,
          imdb: 'tt1234567',
        },
        image: {
          medium: 'https://test.com/image.jpg',
          original: 'https://test.com/image-original.jpg',
        },
        summary: 'A test show summary',
        updated: 1234567890,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/shows/1',
          },
          previousepisode: null,
          nextepisode: null,
        },
      },
    ];

    mockShowRepository.getShows.mockResolvedValue(mockShows);

    const result = await useCase.execute(0);

    expect(mockShowRepository.getShows).toHaveBeenCalledWith(0);
    expect(result).toEqual(mockShows);
  });

  it('handles repository errors', async () => {
    const error = new Error('Repository error');
    mockShowRepository.getShows.mockRejectedValue(error);

    await expect(useCase.execute(0)).rejects.toThrow('Repository error');
    expect(mockShowRepository.getShows).toHaveBeenCalledWith(0);
  });

  it('passes the correct page parameter', async () => {
    mockShowRepository.getShows.mockResolvedValue([]);

    await useCase.execute(5);

    expect(mockShowRepository.getShows).toHaveBeenCalledWith(5);
  });

  it('returns empty array when repository returns empty', async () => {
    mockShowRepository.getShows.mockResolvedValue([]);

    const result = await useCase.execute(0);

    expect(result).toEqual([]);
  });
});
