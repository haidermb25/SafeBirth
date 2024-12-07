import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DietPlanCard from "../../Components/PLANS/DietPlanCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUserData from "../../Api/Dashboard";
import { useName } from "../../Api/ContextApi";
const Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { name } = useName();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {isSearching ? (
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setIsSearching(false);
              }}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.ImageSection}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Image
                  source={require("../../Assets/Images/Mask group.png")}
                  style={styles.ProfileImage}
                />
              </TouchableOpacity>
              <Text style={styles.profileName}>
                {name.split(" ")[0].charAt(0).toUpperCase() +
                  name.split(" ")[0].slice(1).toLowerCase()}
              </Text>
            </View>
            <View style={styles.IconSection}>
              <TouchableOpacity
                style={styles.iconBorder}
                onPress={() => setIsSearching(true)}
              >
                <Ionicons
                  name="search"
                  size={30}
                  color="black"
                  style={styles.icons}
                />
              </TouchableOpacity>
              <View style={styles.iconBorder}>
                {/* <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.removeItem("userId");
                    await AsyncStorage.removeItem("userid");
                    await AsyncStorage.removeItem("name");
                    await AsyncStorage.removeItem("username");

                    navigation.navigate("Login");
                  }}
                > */}
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="black"
                />
                {/* </TouchableOpacity> */}
              </View>
            </View>
          </>
        )}
      </View>

      {/* Image Card */}
      {!isSearching && (
        <View style={styles.ImageCard}>
          <View style={styles.ImageCardText}>
            <Text style={styles.cardHeading}>Looking for desired plan?</Text>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setIsSearching(true)}
            >
              <Text style={styles.searchButtonText}>Search Now</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../../Assets/Images/doctor.png")}
              style={styles.cardImage}
            />
          </View>
        </View>
      )}

      {/* Scrollable Section */}
      <ScrollView style={styles.scrollableSection}>
        {/* Exercise Plans */}
        <View style={styles.RecommendCards1}>
          <Text style={styles.recommendText}>Exercise Plans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DietPlanCard
              planName="Weight Loss Plan"
              timePeriod="12 Weeks"
              objective="Lose weight and improve overall health"
              mealBreakdown="Breakfast, Lunch, Dinner, Snacks"
              rating={4.5}
              reviews={2530}
              fees={50.99}
              onPress={() => alert("View Full Plan pressed")}
            />
            <DietPlanCard
              planName="Weight Loss Plan"
              timePeriod="12 Weeks"
              objective="Lose weight and improve overall health"
              mealBreakdown="Breakfast, Lunch, Dinner, Snacks"
              rating={4.5}
              reviews={2530}
              fees={50.99}
              onPress={() => alert("View Full Plan pressed")}
            />
          </ScrollView>
        </View>

        {/* Diet Plans */}
        <View style={styles.RecommendCards1}>
          <Text style={styles.recommendText}>Diet Plans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DietPlanCard
              planName="Weight Loss Plan"
              timePeriod="12 Weeks"
              objective="Lose weight and improve overall health"
              mealBreakdown="Breakfast, Lunch, Dinner, Snacks"
              rating={4.5}
              reviews={2530}
              fees={50.99}
              onPress={() => alert("View Full Plan pressed")}
            />
            <DietPlanCard
              planName="Weight Loss Plan"
              timePeriod="12 Weeks"
              objective="Lose weight and improve overall health"
              mealBreakdown="Breakfast, Lunch, Dinner, Snacks"
              rating={4.5}
              reviews={2530}
              fees={50.99}
              onPress={() => alert("View Full Plan pressed")}
            />
          </ScrollView>
        </View>

        {/* All Packages */}
        <View style={styles.RecommendCards2}>
          <Text style={styles.recommendText}>All Packages</Text>
          <DietPlanCard
            planName="Weight Loss Plan"
            timePeriod="12 Weeks"
            objective="Lose weight and improve overall health"
            mealBreakdown="Breakfast, Lunch, Dinner, Snacks"
            rating={4.5}
            reviews={2530}
            fees={50.99}
            onPress={() => alert("View Full Plan pressed")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    gap: 10,
    backgroundColor: "#fff",
  },
  topBar: {
    width: "90%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  iconBorder: {},
  IconSection: {
    flexDirection: "row",
    gap: 20,
  },
  ProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  ImageCard: {
    width: "90%",
    height: "25%",
    backgroundColor: "#00C781",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  ImageCardText: {
    flex: 1,
    paddingRight: 10,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "70%",
  },
  searchButtonText: {
    color: "#00C781",
    fontWeight: "bold",
  },
  cardImage: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  scrollableSection: {
    width: "90%",
    marginTop: 10,
  },
  RecommendCards1: {
    marginBottom: 20,
  },
  recommendText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageCard: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  packageCardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  RecommendCards2: {
    marginBottom: 20,
  },
  allPackageCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  packageImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packageDetails: {
    fontSize: 14,
    color: "#666",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

export default Dashboard;
