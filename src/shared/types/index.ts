export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
  } | null;
  dvdCountry: string | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    } | null;
    nextepisode: {
      href: string;
    } | null;
  };
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number | null;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
  _links: {
    self: {
      href: string;
    };
    show: {
      href: string;
    };
  };
}

export interface Person {
  id: number;
  url: string;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  } | null;
  birthday: string | null;
  deathday: string | null;
  gender: string | null;
  image: {
    medium: string;
    original: string;
  } | null;
  updated: number;
  _links: {
    self: {
      href: string;
    };
  };
}

export interface CastCredit {
  self: boolean;
  voice: boolean;
  _links: {
    show: {
      href: string;
      name: string;
    };
    character: {
      href: string;
      name: string;
    };
  };
}

export interface CrewCredit {
  type: string;
  _links: {
    show: {
      href: string;
      name: string;
    };
  };
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface PersonSearchResult {
  score: number;
  person: Person;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface FavoriteShow {
  id: number;
  name: string;
  image: string | null;
  addedAt: number;
}
