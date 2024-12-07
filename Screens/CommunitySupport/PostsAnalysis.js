import React, { useEffect, useState,useCallback  } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NotificationsComponent from "../../Components/Community/NotificationsComponent";
import { ScrollView } from "react-native";
import { getUserPost } from "../../Api/AllPosts";
import { useFocusEffect } from "@react-navigation/native";

const PostsAnalysis = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const UserPosts = async () => {
        try {
          const data = await getUserPost();
          if (data && data.success && data.message && data.message.posts) {
            setUserPosts(data.message.posts);
            setUserName(data.message.user.name);
          } else {
            setUserPosts([]); // Set empty array if no posts
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
          setUserPosts([]); // Handle error by setting empty posts
        }
      };

      UserPosts();
    }, [])
  );

  // Styles for the component
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      marginLeft: 20,
    },
    emptyText: {
      fontSize: 16,
      color: "gray",
    },
  });

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={userPosts}
      keyExtractor={(item) => item.postid.toString()} // Ensure unique key extraction
      renderItem={({ item }) => (
        <NotificationsComponent
          key={item.postid}
          postNumber={item.postid}
          averageRating={parseFloat(item.average_rating)} // Parse average rating as a float
          imageSource={item.image || null} // Use image if available, otherwise null
          postText={item.post_text || "No text available"} // Handle missing post text
          created_date={item.created_at || "No date available"}
          isActive={item.active}
          userName={userName}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No posts available</Text>
      } // Handle empty state
    />
  );
};

export default PostsAnalysis;
