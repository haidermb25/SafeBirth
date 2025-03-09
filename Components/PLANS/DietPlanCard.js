import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DietPlanCard = ({ planName, timePeriod, objective }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.planName}>{planName}</Text>
            <Text style={styles.timePeriod}>{timePeriod}</Text>
            <Text style={styles.description}>{objective}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.button, styles.viewDetailButton]}>
            <Text style={styles.buttonText}>View Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "100%", // Max width 96%
    alignSelf: "center", // Center the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 }, // Ensures shadow is evenly spread
    shadowOpacity: 0.25, // Slightly increased for better visibility
    shadowRadius: 10, // More spread for a softer effect
    elevation: 10, // Stronger depth effect on Android
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
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  viewDetailButton: {
    backgroundColor: "#4CAF50", // Green button
  },
  cancelButton: {
    backgroundColor: "#D32F2F", // Red button
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DietPlanCard;
