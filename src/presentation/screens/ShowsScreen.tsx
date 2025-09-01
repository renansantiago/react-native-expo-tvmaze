import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useInfiniteShows } from '../hooks/useShows';
import { ShowCard } from '../components/ShowCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { Show, FavoriteShow } from '../../shared/types';
import { useRouter } from 'expo-router';
import { useAddToFavorites, useRemoveFromFavorites } from '../hooks/useFavorites';
import { useDebounce } from '../hooks/useDebounce';

export const ShowsScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useInfiniteShows();

  const addToFavorites = useAddToFavorites();
  const removeFromFavorites = useRemoveFromFavorites();

  const allShows = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data]);

  // Filter shows based on debounced search query
  const filteredShows = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return allShows;
    }
    
    const query = debouncedSearchQuery.toLowerCase().trim();
    return allShows.filter(show => 
      show.name.toLowerCase().includes(query) ||
      show.genres.some(genre => genre.toLowerCase().includes(query))
    );
  }, [allShows, debouncedSearchQuery]);

  const handleShowPress = (show: Show) => {
    router.push(`/show/${show.id}`);
  };

  const handleFavoritePress = (show: Show, isFavorite: boolean) => {
    const favoriteShow: FavoriteShow = {
      id: show.id,
      name: show.name,
      image: show.image?.medium || null,
      addedAt: Date.now(),
    };

    if (isFavorite) {
      removeFromFavorites.mutate(show.id);
    } else {
      addToFavorites.mutate(favoriteShow);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderShowItem = ({ item }: { item: Show }) => (
    <ShowCard
      show={item}
      onPress={() => handleShowPress(item)}
      onFavoritePress={(isFavorite) => handleFavoritePress(item, isFavorite)}
    />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading shows</Text>
        <Text style={styles.errorSubtext}>{error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search shows..."
        onClear={() => setSearchQuery('')}
      />
      <FlatList
        data={filteredShows}
        renderItem={renderShowItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingVertical: 8,
  },
  flatList: {
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
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
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
