import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuoteCard from "../components/QuoteCard";

const QuoteListScreen = () => {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  

  const fetchAllQuotes = async () => {
    const storedAllQuotes = await AsyncStorage.getItem("allQuotes");
    if (storedAllQuotes) {
      const parsedQuotes = JSON.parse(storedAllQuotes);
      setQuotes(parsedQuotes);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const handleAddToFavorites = async (quote: string) => {
    if (!favorites.includes(quote)) {
      const updatedFavorites = [...favorites, quote];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const handleRefresh = () => {
    fetchAllQuotes();
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.card}>
      <QuoteCard quote={item} />
      <Button title="Add to Favorites" onPress={() => handleAddToFavorites(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Inspirational Quotes</Text>
      <FlatList
        data={quotes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={quotes}
      />
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

export default QuoteListScreen;
