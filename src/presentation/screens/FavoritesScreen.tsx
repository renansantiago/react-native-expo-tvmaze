import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites, useRemoveFromFavorites } from '../hooks/useFavorites';
import { ShowCard } from '../components/ShowCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { FavoriteShow } from '../../shared/types';

export const FavoritesScreen: React.FC = () => {
  const router = useRouter();
  const { data: favorites, isLoading, refetch, isRefetching } = useFavorites();
  const removeFromFavorites = useRemoveFromFavorites();

  const handleShowPress = (show: FavoriteShow) => {
    router.push(`/show/${show.id}`);
  };

  const handleRemoveFavorite = (showId: number) => {
    removeFromFavorites.mutate(showId);
  };

  const renderShowItem = ({ item }: { item: FavoriteShow }) => (
    <ShowCard
      show={{
        id: item.id,
        name: item.name,
        image: item.image ? { medium: item.image, original: item.image } : null,
        type: '',
        language: '',
        genres: [],
        status: '',
        runtime: null,
        premiered: null,
        officialSite: null,
        schedule: { time: '', days: [] },
        rating: { average: null },
        weight: 0,
        network: null,
        webChannel: null,
        dvdCountry: null,
        externals: { tvrage: null, thetvdb: null, imdb: null },
        summary: null,
        updated: 0,
        _links: { self: { href: '' }, previousepisode: null, nextepisode: null },
      }}
      onPress={() => handleShowPress(item)}
      onFavoritePress={() => handleRemoveFavorite(item.id)}
      isFavorite={true}
    />
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites?.length || 0} {favorites?.length === 1 ? 'show' : 'shows'}
        </Text>
      </View>

      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderShowItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring shows and add them to your favorites
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.exploreButtonText}>Explore Shows</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});
