import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CancelSubscription } from "../../Api/SubscriptionAPi"; 
import Toast from "react-native-toast-message";

const ExercisePlanCard = ({ planName, timePeriod, objective, onCancel }) => {
  const navigation = useNavigation();

  const cancelSubscription = async () => {
    const response = await CancelSubscription("exercise");
    if (response.success === true) {
      Toast.show({
        type: "success",
        text1: "Cancel Successful!",
        text2: "Subscription cancelled successfully.",
        position: "top",
        visibilityTime: 2000,
      });
      if (onCancel) {
        onCancel();
      }
    } else { 
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to cancel subscription.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

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
          <TouchableOpacity style={[styles.button, styles.viewDetailButton]} onPress={() => navigation.navigate("DietSubscription")}>
            <Text style={styles.buttonText}>View Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelSubscription}>
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
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
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
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ExercisePlanCard;