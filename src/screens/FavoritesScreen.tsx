import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuoteCard from "../components/QuoteCard";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (quote: string) => {
    
    const updatedFavorites = favorites.filter(fav => fav !== quote);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Removed!!");
  };

  const handleRefresh = () => {
    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    loadFavorites();
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.card}>
      <QuoteCard quote={item} />
      <Button title="Remove from Favorites" onPress={() => handleRemoveFavorite(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Quotes</Text>
      {favorites.length === 0 ? (
        <Text>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <Button title="Refresh Quotes" onPress={handleRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});

export default FavoritesScreen;
