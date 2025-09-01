import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
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
  
  const {
    data: people,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useSearchPeople(searchQuery);

  const handlePersonPress = (person: Person) => {
    router.push(`/person/${person.id}`);
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

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search people..."
        onClear={() => setSearchQuery('')}
      />

      {searchQuery.length === 0 ? (
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
            searchQuery.length > 0 && !isLoading ? (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No people found for &quot;{searchQuery}&quot;
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
