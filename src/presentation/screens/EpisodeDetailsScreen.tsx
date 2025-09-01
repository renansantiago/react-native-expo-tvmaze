import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ShowRepositoryImpl } from '../../data/repositories/ShowRepositoryImpl';
import { GetEpisodeDetailsUseCase } from '../../domain/usecases';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { formatDate, formatTime } from '../../shared/utils/dateUtils';
import { removeHtmlTags } from '../../shared/utils/textUtils';

const showRepository = new ShowRepositoryImpl();
const getEpisodeDetailsUseCase = new GetEpisodeDetailsUseCase(showRepository);

export const EpisodeDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const episodeId = parseInt(id!);

  const { data: episode, isLoading, isError } = useQuery({
    queryKey: ['episode-details', episodeId],
    queryFn: () => getEpisodeDetailsUseCase.execute(episodeId),
    enabled: !!episodeId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !episode) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading episode details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={episode.image?.original}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.surface} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{episode.name}</Text>
        
        <View style={styles.episodeInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="film-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              Season {episode.season}, Episode {episode.number}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              {formatDate(episode.airdate)}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              {formatTime(episode.airtime)} ({episode.runtime} min)
            </Text>
          </View>
        </View>

        {episode.rating.average && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={Colors.rating} />
            <Text style={styles.rating}>{episode.rating.average.toFixed(1)}</Text>
          </View>
        )}

        {episode.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summary}>{removeHtmlTags(episode.summary)}</Text>
          </View>
        )}
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
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  episodeInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
