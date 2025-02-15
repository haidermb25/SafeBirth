import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const games = [
  { id: "1", title: "Trivia Quiz", screen: "TriviaQuiz", image: require("../../Assets/Images/carebot.png") },
  { id: "2", title: "Word Scramble", screen: "WordScramble", image: require("../../Assets/Images/carebot.png") },
];

const GameCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate("Dashboard")} />
        <Appbar.Content title="Games & Activities" />
      </Appbar.Header>

      {/* Game Cards */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#f2f2f2",
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
});

export default GameCard;
