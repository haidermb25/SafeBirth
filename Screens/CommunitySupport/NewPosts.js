import React, { useEffect, useState,useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PostComponent from "../../Components/Community/PostComponent.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetAllPosts } from "../../Api/AllPosts.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
const App = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]); // Initialize as an empty array

  
  useFocusEffect(
    useCallback(() => {
      const getPosts = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem("userid");
          const userId = storedUserId ? storedUserId : 0;

          const result = await GetAllPosts(userId); 
          console.log(result);

          if (Array.isArray(result)) {
            setPosts(result);
          } else {
            setPosts([]);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]); 
        }
      };

      getPosts(); 
    }, []) 
  );
  return (
    <View style={styles.demoContainer}>
      <View style={styles.header}>
        <View style={styles.goBack}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.Community}>
          <Text style={styles.headerTitle}>Safe Birth Community</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.length === 0 ? (
          <Text>Loading posts...</Text> // Handle empty posts state
        ) : (
          posts.map((post, index) => (
            <PostComponent
              key={index}
              postId={post.postid}
              userId={post.user_id}
              userImage={post.image || "https://via.placeholder.com/50"} // Ensure safe access to properties
              userName={post.username || "Unknown"}
              postText={post.post_text || "No content"}
              postImage={post.image}
              rating={post.user_rating || 0} // Default to 0 if rating is undefined
              average_rating={post.average_rating || 0}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  demoContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(52, 167, 81, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
  },
  headerTitle: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  searchInput: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 2,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    color: "rgba(52, 167, 81, 0.9)",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default App;
