import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ShowRepositoryImpl } from '../../data/repositories/ShowRepositoryImpl';
import { GetShowDetailsUseCase } from '../../domain/usecases';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { formatSchedule, formatDate } from '../../shared/utils/dateUtils';
import { removeHtmlTags, formatGenres } from '../../shared/utils/textUtils';
import { useAddToFavorites, useRemoveFromFavorites, useIsFavorite } from '../hooks/useFavorites';
import { FavoriteShow } from '../../shared/types';

const showRepository = new ShowRepositoryImpl();
const getShowDetailsUseCase = new GetShowDetailsUseCase(showRepository);

export const ShowDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const showId = parseInt(id!);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['show-details', showId],
    queryFn: () => getShowDetailsUseCase.execute(showId),
    enabled: !!showId,
  });

  const { data: isFavorite } = useIsFavorite(showId);
  const addToFavorites = useAddToFavorites();
  const removeFromFavorites = useRemoveFromFavorites();

  const handleFavoritePress = () => {
    if (!data?.show) return;

    const favoriteShow: FavoriteShow = {
      id: data.show.id,
      name: data.show.name,
      image: data.show.image?.medium || null,
      addedAt: Date.now(),
    };

    if (isFavorite) {
      removeFromFavorites.mutate(showId);
    } else {
      addToFavorites.mutate(favoriteShow);
    }
  };

  const handleEpisodePress = (episodeId: number) => {
    router.push(`/episode/${episodeId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading show details</Text>
      </View>
    );
  }

  const { show, episodes } = data;

  // Group episodes by season
  const episodesBySeason = episodes.reduce((acc, episode) => {
    const season = episode.season;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {} as Record<number, typeof episodes>);

  const renderEpisodeItem = ({ item }: { item: typeof episodes[0] }) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => handleEpisodePress(item.id)}
    >
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeTitle}>
          {item.number}. {item.name}
        </Text>
        <Text style={styles.episodeDate}>
          {formatDate(item.airdate)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderSeasonSection = ({ item }: { item: number }) => (
    <View style={styles.seasonSection}>
      <Text style={styles.seasonTitle}>Season {item}</Text>
      <FlatList
        data={episodesBySeason[item]}
        renderItem={renderEpisodeItem}
        keyExtractor={(episode) => episode.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={show.image?.original}
          style={styles.poster}
          contentFit="cover"
        />
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.favorite : Colors.surface}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{show.name}</Text>
        
        {show.genres.length > 0 && (
          <Text style={styles.genres}>{formatGenres(show.genres)}</Text>
        )}

        {show.schedule && (
          <View style={styles.scheduleContainer}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.schedule}>{formatSchedule(show.schedule)}</Text>
          </View>
        )}

        {show.rating.average && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={Colors.rating} />
            <Text style={styles.rating}>{show.rating.average.toFixed(1)}</Text>
          </View>
        )}

        {show.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summary}>{removeHtmlTags(show.summary)}</Text>
          </View>
        )}

        <View style={styles.episodesContainer}>
          <Text style={styles.episodesTitle}>Episodes</Text>
          <FlatList
            data={Object.keys(episodesBySeason).map(Number).sort((a, b) => a - b)}
            renderItem={renderSeasonSection}
            keyExtractor={(season) => season.toString()}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    position: 'relative',
    height: 300,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    backgroundColor: Colors.overlay,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: Colors.overlay,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  genres: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  schedule: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  episodesContainer: {
    marginBottom: 24,
  },
  episodesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  seasonSection: {
    marginBottom: 24,
  },
  seasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  episodeInfo: {
    flex: 1,
  },
  episodeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  episodeDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error,
  },
});
