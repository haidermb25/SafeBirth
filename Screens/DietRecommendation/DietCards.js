import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native"; // Added useRoute
import DietCard from "../../Components/DietRecommendation/DietCard";
import { fetchContent } from "../../Api/DietRecommendation";

const DietCards = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get route parameters
  const [dietData, setDietData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDietData = async () => {
      setLoading(true);
      try {
        const result = await fetchContent();
        if (result && result.success) {
          setDietData(result.data);
        } else {
          setError("Failed to load diet plans");
        }
      } catch (err) {
        setError("An error occurred while fetching diet plans");
      }
      setLoading(false);
    };

    if (route.params?.recommendationResult) {
      console.log(
        "Received recommendation:",
        route.params.recommendationResult
      );
      setDietData(route.params.recommendationResult.data);
      setLoading(false);
    } else {
      getDietData();
    }
  }, [route.params?.recommendationResult]); // Add route dependency

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
        <Appbar.BackAction
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }], // Reset navigation state
              });
            }}
          />


          <Appbar.Content title="Diet Plans" />
        </Appbar.Header>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }], // Reset navigation state
              });
            }}
          />

          <Appbar.Content title="Diet Plans" />
        </Appbar.Header>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
      <Appbar.BackAction
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }], // Reset navigation state
              });
            }}
          />

        <Appbar.Content title="Diet Plans" />
      </Appbar.Header>

      <FlatList
        data={dietData}
        keyExtractor={(item) => item.dietplanid.toString()}
        renderItem={({ item }) => <DietCard data={item} />}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.aiButton}
        onPress={() =>
          navigation.navigate("subscriptionForm", { name: "diet" })
        }
      >
        <Text style={styles.aiButtonText}>Get AI Recommendation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#f2f2f2",
  },
  list: {
    paddingHorizontal: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
  aiButton: {
    position: "absolute",
    bottom: 20,
    right: 34,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  aiButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default DietCards;
