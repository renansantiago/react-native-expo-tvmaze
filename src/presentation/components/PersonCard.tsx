import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Person } from '../../shared/types';
import { Colors } from '../../shared/constants/Colors';

interface PersonCardProps {
  person: Person;
  onPress: () => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={person.image?.medium}
        style={styles.image}
        contentFit="cover"
        placeholder="Loading..."
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {person.name}
        </Text>
        {person.country && (
          <Text style={styles.country} numberOfLines={1}>
            {person.country.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
