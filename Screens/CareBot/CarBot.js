import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CareBot from "../../Components/Carebot/CareBot";
import { useNavigation } from "@react-navigation/native";

const CarBot = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
        <Ionicons name="close-outline" size={30} color="black" />
      </TouchableOpacity>
      
      {/* Chatbot */}
      <CareBot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Ensures the container takes the full width
    backgroundColor: "#F5F5F5",
  },
  button: {
    position: "absolute",
    top: 30, // Adjust based on your needs
    right: 10,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
    zIndex: 10, // Ensures it's above other elements
  },
  CareBot: {
    marginTop: 40,
  }
});

export default CarBot;
