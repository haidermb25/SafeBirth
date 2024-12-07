import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings"; // Correct import for the rating package
import { addrating } from "../../Api/AllPosts";
const PostComponent = ({
  postId,
  userId,
  userImage,
  userName,
  postText,
  postImage,
  rating,
  average_rating,
}) => {
  const [newRating, setNewRating] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const [ratingsArray, setRatingsArray] = useState([3]);

  const handleRatingChange = async (newRating) => {
    setNewRating(newRating);
  };

  const handleSubmit = async () => {
    const response = await addrating(postId, newRating);
    if (response) {
      console.log("Successfully");
    } else {
      console.log("Error");
    }
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Post Header */}
      <View style={styles.head}>
        <View style={styles.header}>
          <Image
            source={{ uri: userImage }} // Use the passed prop here
            style={styles.profilePic}
          />
          <View style={styles.headerText}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={{ display: "none" }}>
              {postId}
              {userId}
            </Text>
            <Text></Text>
            {/* Use the passed prop here */}
          </View>
        </View>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRatingText}>
            {parseFloat(average_rating).toFixed(2)}
          </Text>
        </View>
      </View>
      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.postText}>{postText}</Text>
        {/* Use the passed prop here */}
        {postImage && (
          <Image
            source={{ uri: postImage }} // Use the passed prop here
            style={styles.postImage}
          />
        )}
      </View>

      {/* Post Actions */}
      <View style={styles.actions}>
        {/* Star Rating */}
        <View style={styles.starsContainer}>
          <Rating
            imageSize={30}
            startingValue={rating}
            ratingColor="gold"
            ratingBackgroundColor="lightgray"
            readonly={!isEditable}
            onFinishRating={(newRating) => {
              console.log("New rating: ", newRating);
              handleRatingChange(newRating);
            }}
          />
        </View>

        {/* Submit or Edit Button */}
        {isEditable ? (
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={handleEdit}>
            <Text style={styles.sendButtonText}>Edit Rating</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Aligns children to opposite sides
    alignItems: "center",
  },

  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: "#888",
  },
  postContent: {
    marginBottom: 10,
  },
  postText: {
    fontSize: 14,
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted to have space between stars and send button
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    flexWrap: "wrap", // Allow wrapping for small screens
  },
  averageRatingContainer: {
    width: 50,
  },
  averageRatingText: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sendButton: {
    backgroundColor: "rgba(52, 167, 81, 0.9)", // Green color for the Send button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: "#fff", // White text color
    fontWeight: "bold",
  },
});

export default PostComponent;
