import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuoteCard from "../components/QuoteCard";

const HomeScreen = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allQuotes, setAllQuotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random?tags=inspirational");
      if (!response.ok) throw new Error("Failed to fetch quote");
      const data = await response.json();
      setQuote(data.content);

      // Fetch all existing quotes and add the new one
      const updatedAllQuotes = [...allQuotes, data.content];
      setAllQuotes(updatedAllQuotes);
      await AsyncStorage.setItem("allQuotes", JSON.stringify(updatedAllQuotes));
    } catch (error) {
      setError("Error fetching quote");
    }
  };

  const fetchFavorites = async () => {
    let storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchFavorites();
  }, []);

  const handleAddToFavorites = async () => {
    if (quote) {
      if (!favorites.includes(quote)) {
        const updatedFavorites = [...favorites, quote];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        alert("Quote added to favorites!");
      } else {
        alert("This quote is already in your favorites.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Inspirational Quote</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {quote ? (
        <QuoteCard quote={quote} />
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
      <Button title="Get New Quote" onPress={fetchQuote} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
  },
  loading: {
    fontSize: 18,
    color: "gray",
  },
});

export default HomeScreen;
