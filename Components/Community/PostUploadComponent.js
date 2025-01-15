import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../Api/AllPosts";
import Toast from "react-native-toast-message";

const PostUploadComponent = ({ onNewPost }) => {
  const [postText, setPostText] = useState(""); // Store the post title/text
  const [postImage, setPostImage] = useState(null); // Store the selected image URI
  const [isUploading, setIsUploading] = useState(false); // Uploading state to show loading spinner
  const [imageUri, setImageUri] = useState(null); // Image URI for preview

  // Image Picker
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPostImage(result.assets[0].uri); // Set the image URI for the preview
      setImageUri(result.assets[0].uri);
    }
  };

  // Handle Post Submission
  const handlePostSubmit = async () => {
    if (!postText.trim() && !postImage) {
      // Ensure there is either text or an image before submission
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Either post text or an image is required",
        position: "top",
        visibilityTime: 2000,
      });
      return;
    }

    setIsUploading(true);

    try {
      // Call the addPost function with the post text and image URI
      const response = await addPost(postText, postImage);

      // Handle success
      if (response) {
        Toast.show({
          type: "success",
          text1: "New Post",
          text2: "Post Uploaded Successfully",
          position: "top",
          visibilityTime: 2000,
        });

        // Notify the parent component to refresh data
        if (onNewPost) {
          onNewPost();  // This will trigger a re-render in the parent component
        }

        // Reset the form state after successful upload
        setPostText("");
        setPostImage(null);
        setImageUri(null);
      }
    } catch (error) {
      // Handle error
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an issue uploading the post",
        position: "top",
        visibilityTime: 2000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* User Avatar and Name */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={require("../../Assets/Images/baby.png")} // Correct local image path
        />
        <Text style={styles.userName}>New Post</Text>
      </View>

      {/* Post Text Input */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        value={postText}
        onChangeText={setPostText}
        multiline
        numberOfLines={4}
      />

      {/* Browse Image Button */}
      <TouchableOpacity style={styles.filePicker} onPress={handleImagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <>
            <Text style={styles.icon}>📂</Text>
            <Text style={styles.text}>Select file</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Display Selected Image */}
      {postImage && (
        <Image source={{ uri: postImage }} style={styles.selectedImage} />
      )}

      {/* Post Upload Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePostSubmit}
          disabled={isUploading}
          style={[styles.button, isUploading ? styles.uploadingText : styles.buttonEnabled]}
        >
          <Text style={styles.buttonText}>
            {isUploading ? "Uploading..." : "Upload Post"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Upload status message */}
      {isUploading && (
        <Text style={styles.uploadingText}>Uploading your post...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 20, // Added margin from the top for spacing
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Increased margin bottom to create space
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18, // Slightly larger text for the user's name
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: "#f2f2f2",
    marginBottom: 15, // Increased margin for better spacing
    textAlignVertical: "top", // Align text at the top of the input
  },
  button: {
    width: 360, // Set width
    height: 60, // Set height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Rounded corners
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Green color for enabled state
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Gray color for disabled state
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 18, // Text size
    fontWeight: "bold",
  },
  filePicker: {
    marginLeft: 0,
    width: 360,
    height: 200,
    borderWidth: 1,
    borderColor: "#0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: "#aaa",
  },
  text: {
    color: "#aaa",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default PostUploadComponent;
