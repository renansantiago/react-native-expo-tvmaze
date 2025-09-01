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
import { usePersonDetails } from '../hooks/usePeople';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Colors } from '../../shared/constants/Colors';
import { formatDate } from '../../shared/utils/dateUtils';

export const PersonDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const personId = parseInt(id!);

  const { data, isLoading, isError } = usePersonDetails(personId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading person details</Text>
      </View>
    );
  }

  const { person, castCredits, crewCredits } = data;

  const handleShowPress = (showId: number) => {
    router.push(`/show/${showId}`);
  };

  const renderCastCredit = ({ item }: { item: typeof castCredits[0] }) => (
    <TouchableOpacity
      style={styles.creditItem}
      onPress={() => {
        const showId = parseInt(item._links.show.href.split('/').pop()!);
        handleShowPress(showId);
      }}
    >
      <View style={styles.creditInfo}>
        <Text style={styles.showName}>{item._links.show.name}</Text>
        <Text style={styles.characterName}>
          as {item._links.character.name}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderCrewCredit = ({ item }: { item: typeof crewCredits[0] }) => (
    <TouchableOpacity
      style={styles.creditItem}
      onPress={() => {
        const showId = parseInt(item._links.show.href.split('/').pop()!);
        handleShowPress(showId);
      }}
    >
      <View style={styles.creditInfo}>
        <Text style={styles.showName}>{item._links.show.name}</Text>
        <Text style={styles.crewRole}>{item.type}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={person.image?.original}
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
        <Text style={styles.name}>{person.name}</Text>
        
        {person.country && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{person.country.name}</Text>
          </View>
        )}

        {person.birthday && (
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              Born {formatDate(person.birthday)}
            </Text>
          </View>
        )}

        {person.deathday && (
          <View style={styles.infoRow}>
            <Ionicons name="close-circle-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              Died {formatDate(person.deathday)}
            </Text>
          </View>
        )}

        {castCredits.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast Credits</Text>
            <FlatList
              data={castCredits}
              renderItem={renderCastCredit}
              keyExtractor={(item, index) => `cast-${index}`}
              scrollEnabled={false}
            />
          </View>
        )}

        {crewCredits.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Crew Credits</Text>
            <FlatList
              data={crewCredits}
              renderItem={renderCrewCredit}
              keyExtractor={(item, index) => `crew-${index}`}
              scrollEnabled={false}
            />
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
    height: 300,
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
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  creditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  creditInfo: {
    flex: 1,
  },
  showName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  characterName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  crewRole: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
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
