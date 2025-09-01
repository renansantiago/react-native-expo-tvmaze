import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSearchPeople } from '../hooks/usePeople';
import { PersonCard } from '../components/PersonCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { Person } from '../../shared/types';
import { useRouter } from 'expo-router';

export const PeopleScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  
  const {
    data: people,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useSearchPeople(activeSearchQuery);

  const handlePersonPress = (person: Person) => {
    router.push(`/person/${person.id}`);
  };

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearchQuery('');
  };

  const renderPersonItem = ({ item }: { item: Person }) => (
    <PersonCard
      person={item}
      onPress={() => handlePersonPress(item)}
    />
  );

  if (isLoading && searchQuery.length > 0) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error searching people</Text>
        <Text style={styles.errorSubtext}>{error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search People</Text>
        <Text style={styles.subtitle}>
          Find actors, directors, and other TV professionals
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search people..."
          onClear={handleClearSearch}
          showSearchIcon={false}
        />
        <TouchableOpacity
          style={[
            styles.searchButton,
            !searchQuery.trim() && styles.searchButtonDisabled
          ]}
          onPress={handleSearch}
          disabled={!searchQuery.trim()}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.searchButtonText,
            !searchQuery.trim() && styles.searchButtonTextDisabled
          ]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {activeSearchQuery.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Enter a name to search for people
          </Text>
        </View>
      ) : (
        <FlatList
          data={people || []}
          renderItem={renderPersonItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
                  ListEmptyComponent={
          activeSearchQuery.length > 0 && !isLoading ? (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No people found for &quot;{activeSearchQuery}&quot;
                </Text>
                <Text style={styles.noResultsSubtext}>
                  Try a different search term
                </Text>
              </View>
            ) : null
          }
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 80,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  searchButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  searchButtonTextDisabled: {
    color: Colors.textSecondary,
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
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
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
