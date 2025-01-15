import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NotificationsComponent from "../../Components/Community/NotificationsComponent";
import { useFocusEffect } from "@react-navigation/native";
import { getUserPost } from "../../Api/AllPosts";

const PostsAnalysis = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");

  // Function to fetch user posts
  const fetchUserPosts = async () => {
    try {
      const data = await getUserPost();
      if (data && data.success && data.message && data.message.posts) {
        setUserPosts(data.message.posts);
        setUserName(data.message.user.name);
      } else {
        setUserPosts([]); // Set empty array if no posts
      }
    } catch (error) {
      setUserPosts([]); // Handle error by setting empty posts
    }
  };

  // Fetch posts when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserPosts();
    }, [])
  );

  // Function to handle post deletion
  const handlePostDelete = (deletedPostId) => {
    // Filter out the deleted post from the posts list
    const updatedPosts = userPosts.filter(post => post.postid !== deletedPostId);
    setUserPosts(updatedPosts); // Update state after deletion

    // Call the fetchUserPosts method to refresh the list from the server
    fetchUserPosts();
  };

  // Function to handle post update
  const handlePostUpdate = () => {
    // Re-fetch the posts after a post is updated
    fetchUserPosts();
  };

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
          postId={item.postid}
          averageRating={parseFloat(item.average_rating)} // Parse average rating as a float
          imageSource={item.image || null} // Use image if available, otherwise null
          postText={item.post_text || "No text available"} // Handle missing post text
          created_date={item.created_at || "No date available"}
          isActive={item.active}
          userName={userName}
          onPostDelete={handlePostDelete} // Pass the delete handler as a prop
          onPostUpdate={handlePostUpdate} // Pass the update handler as a prop
        />
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No posts available</Text>
      } // Handle empty state
    />
  );
};

export default PostsAnalysis;
