import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DietPlanCard = ({
  planName,
  timePeriod,
  objective,
  mealBreakdown,
  rating,
  reviews,
  fees,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome name="cutlery" size={50} color="#4CAF50" />
        <View style={styles.info}>
          <Text style={styles.planName}>{planName}</Text>
          <Text style={styles.timePeriod}>{timePeriod}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
              {rating} ({reviews})
            </Text>
          </View>
        </View>
      </View>
      {/* 
      <Text style={styles.objective}>{objective}</Text>
      <View style={styles.footer}>
        <Text style={styles.fees}>Fees: ${fees}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View Full Plan</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  timePeriod: {
    fontSize: 16,
    color: "#888",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  objectiveLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  objective: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  mealBreakdownLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  mealBreakdown: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  fees: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DietPlanCard;
