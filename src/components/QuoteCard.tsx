import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => (
  <View style={styles.card}>
    <Text style={styles.quoteText}>"{quote}"</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
  },
});

export default QuoteCard;
