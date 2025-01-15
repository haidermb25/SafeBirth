import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { deletePost, updatePostText } from "../../Api/AllPosts"; // Assuming you have an API to update text

const NotificationsComponent = ({
  postId,
  averageRating,
  imageSource,
  postText,
  created_date,
  isActive,
  userName,
  onPostDelete, // Callback prop to notify the parent component
  onPostUpdate, // Callback prop to notify the parent component to re-render
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPostText, setNewPostText] = useState(postText);

  // Function to handle delete icon click
  const handleDeleteClick = () => {
    // Show confirmation alert
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel", // Cancel button
          style: "cancel",
        },
        {
          text: "Delete", // Delete button
          style: "destructive",
          onPress: async () => {
            // Perform delete operation after confirmation
            const data = await deletePost(postId);
            if (data.success === true) {
              Toast.show({
                type: "success",
                text1: "Delete Successful!",
                text2: "Post has been deleted successfully.",
                position: "top",
                visibilityTime: 2000,
              });

              // Notify parent component to remove the post from the list
              onPostDelete(postId);
            } else {
              Toast.show({
                type: "error",
                text1: "Delete Error!",
                text2: "There is some error in deletion.",
                position: "top",
                visibilityTime: 2000,
              });
            }
          },
        },
      ],
      { cancelable: true } // Allow closing by clicking outside the alert
    );
  };

  // Function to handle edit icon click
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing
  };

  // Function to save edited text
  const handleSaveClick = async () => {
    if (newPostText.trim() !== "") {
      const data = await updatePostText(postId, newPostText); // Assuming you have an API for this
      if (data.success) {
        Toast.show({
          type: "success",
          text1: "Update Successful!",
          text2: "Post text has been updated.",
          position: "top",
          visibilityTime: 2000,
        });

        setIsEditing(false); // Disable editing after saving
        // Notify parent component to re-render the list
        onPostUpdate(postId, newPostText); // Pass updated data to parent

      } else {
        Toast.show({
          type: "error",
          text1: "Update Error!",
          text2: "There was an error updating the post.",
          position: "top",
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: "warning",
        text1: "Text is empty!",
        text2: "Please enter some text before saving.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="trash-outline"
          size={30}
          color="#2d6a4f"
          onPress={handleDeleteClick} // Trigger handleDeleteClick on press
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
          <Ionicons name="create-outline" size={24} color="#2d6a4f" />
        </TouchableOpacity>
        <Text style={styles.rating}>⭐ {averageRating}</Text>
      </View>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={{ uri: imageSource }} style={styles.image} />
        ) : null}
      </View>
      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={newPostText}
            onChangeText={setNewPostText}
            multiline
          />
        ) : (
          <Text style={styles.postText}>{postText}</Text>
        )}

        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.date}>{created_date}</Text>

        <TouchableOpacity
          style={[styles.statusButton, isActive ? styles.activeStatus : styles.inactiveStatus]}
        >
          <Text style={styles.statusText}>
            {isActive ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    marginRight: 30,
    padding: 15,
    overflow: "hidden",
    width: 320,
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: 40,

  },
  headerContainer: {
    flexDirection: "row", // Ensure icons are in a row
    justifyContent: "space-between", // Space between delete and edit icons
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    opacity: 0.8,
  },
  postNumber: {
    position: "absolute",
    top: 0,
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "blue",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  rating: {
    fontSize: 16,
    color: "#f39c12",
  },
  content: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  postText: {
    fontSize: 14,
    color: "#333",
    marginTop: -35,
  },
  textInput: {
    fontSize: 14,
    color: "#333",
    marginTop: -35,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 40,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
    fontStyle: "italic",
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    alignSelf: "flex-end",
    marginRight: -16,
  },
  activeStatus: {
    backgroundColor: "#2ecc71",
  },
  inactiveStatus: {
    backgroundColor: "#e74c3c",
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 4,
    marginLeft: -200, // Make sure the pencil icon is right next to the delete icon
    alignSelf: "flex-start",
    fontWeight:'bold',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#2ecc71",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center", // Center button
    minWidth: 100, // Ensure it's wide enough
  },
  saveText: {
    fontSize: 14,
    width: 230,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center", // Center text inside button
  },
});

export default NotificationsComponent;
