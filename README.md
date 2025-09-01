# TV Series App

A React Native Expo app for browsing TV series using the TVMaze API. Built with clean architecture principles and modern React Native development practices.

## Features

### Shows

- **Browse TV Series**: View all TV series with pagination support
- **Search Shows**: Search for TV series by name with real-time results
- **Show Details**: View comprehensive information about each show including:
  - Name and poster
  - Air schedule (days and times)
  - Genres
  - Summary
  - Episodes organized by season

### Episodes

- **Episode Details**: View detailed episode information including:
  - Episode name and number
  - Season information
  - Air date and time
  - Summary
  - Episode image (if available)

### Favorites

- **Save Favorites**: Add shows to your favorites list
- **Remove Favorites**: Remove shows from your favorites
- **Browse Favorites**: View all favorite shows in alphabetical order
- **Quick Access**: Navigate directly to show details from favorites

### People

- **Search People**: Search for actors, directors, and other TV professionals
- **Person Details**: View comprehensive person information including:
  - Name and image
  - Cast credits with links to shows
  - Crew credits with links to shows

## Architecture

This app follows Clean Architecture principles with clear separation of concerns:

```
src/
├── domain/           # Business logic and entities
│   ├── entities/      # Core business objects
│   ├── repositories/  # Repository interfaces
│   └── usecases/      # Business use cases
├── data/              # Data layer implementation
│   ├── datasources/   # API and local storage
│   ├── models/        # Data models
│   └── repositories/  # Repository implementations
├── presentation/      # UI layer
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   └── hooks/         # Custom React hooks
└── shared/            # Shared utilities
    ├── constants/     # App constants
    ├── types/         # TypeScript type definitions
    └── utils/         # Utility functions
```

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Query (TanStack Query)**: Data fetching and caching
- **Expo Router**: File-based routing
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client for API calls

## API

The app uses the [TVMaze API](https://www.tvmaze.com/api) which provides:

- Free, fast, and clean REST API
- JSON responses
- Comprehensive TV show and people data
- Rate limiting (20 calls per 10 seconds)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Using Expo Go

The easiest way to test the app is using **Expo Go**:

1. **Install Expo Go** on your device:
   - **iOS**: Download from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - **Android**: Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Scan the QR code**:
   - **iOS**: Use your camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

4. **The app will load** directly on your device!

**Note**: Expo Go allows you to test the app on your physical device without building native code. Perfect for development and testing!

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd react-native-expo-tvmaze
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your preferred platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Testing

This project includes comprehensive testing using Jest and React Native Testing Library. The testing setup covers:

### Test Coverage

- **Components**: UI components like `ShowCard`, `SearchBar`
- **Hooks**: Custom React hooks like `useDebounce`
- **Utilities**: Helper functions for date formatting, text manipulation
- **Data Sources**: Local storage operations
- **Use Cases**: Business logic testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Framework

- **Jest**: JavaScript testing framework
- **React Native Testing Library**: Utilities for testing React Native components
- **TypeScript**: Full TypeScript support for tests
- **Mocking**: Comprehensive mocking for React Native, Expo, and third-party libraries

### Test Structure

```
src/
├── __tests__/         # Test files
│   ├── components/    # Component tests
│   ├── hooks/         # Hook tests
│   ├── utils/         # Utility tests
│   └── datasources/   # Data source tests
```

### Test Configuration

- `jest.config.basic.js`: Jest configuration for React Native
- `jest.setup.basic.js`: Global test setup and mocks
- TypeScript support with `ts-jest`
- Babel transformation for React Native modules

## Project Structure

### Key Files

- `app/_layout.tsx`: Root layout with React Query provider
- `app/(tabs)/_layout.tsx`: Tab navigation configuration
- `app/(tabs)/index.tsx`: Main shows screen
- `app/(tabs)/favorites.tsx`: Favorites screen
- `app/(tabs)/people.tsx`: People search screen
- `app/show/[id].tsx`: Show details screen
- `app/episode/[id].tsx`: Episode details screen
- `app/person/[id].tsx`: Person details screen

### Core Components

- `ShowCard`: Reusable show card component
- `PersonCard`: Reusable person card component
- `SearchBar`: Search input component
- `LoadingSpinner`: Loading indicator

### Custom Hooks

- `useShows`: Shows data management
- `useFavorites`: Favorites management
- `usePeople`: People search and details

## Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Clean architecture principles

### State Management

- React Query for server state
- AsyncStorage for local persistence
- React hooks for local state

### Navigation

- Expo Router for file-based routing
- Tab navigation for main sections
- Stack navigation for detail screens

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TVMaze](https://www.tvmaze.com) for providing the free API
- [Expo](https://expo.dev) for the development platform
- [React Query](https://tanstack.com/query) for data fetching
