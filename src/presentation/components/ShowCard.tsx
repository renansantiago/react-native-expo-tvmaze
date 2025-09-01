import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Show } from "../../shared/types";
import { Colors } from "../../shared/constants/Colors";
import { formatGenres } from "../../shared/utils/textUtils";
import { useIsFavorite } from "../hooks/useFavorites";

interface ShowCardProps {
  show: Show;
  onPress: () => void;
  onFavoritePress?: (isFavorite: boolean) => void;
  showFavoriteButton?: boolean;
}

export const ShowCard: React.FC<ShowCardProps> = ({
  show,
  onPress,
  onFavoritePress,
  showFavoriteButton = true,
}) => {
  const { data: isFavorite = false } = useIsFavorite(show.id);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      testID="show-card"
    >
      <View style={styles.imageContainer}>
        <Image
          source={show.image?.medium}
          style={styles.image}
          contentFit="cover"
          placeholder="Loading..."
        />
        {showFavoriteButton && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onFavoritePress?.(isFavorite)}
            activeOpacity={0.8}
            testID="favorite-button"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? Colors.favorite : Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {show.name}
        </Text>
        {show.genres.length > 0 && (
          <Text style={styles.genres} numberOfLines={1}>
            {formatGenres(show.genres)}
          </Text>
        )}
        {show.rating.average && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={Colors.rating} />
            <Text style={styles.rating}>{show.rating.average.toFixed(1)}</Text>
          </View>
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
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  genres: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});
