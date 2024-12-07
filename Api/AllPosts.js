import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";
import { withRepeat } from "react-native-reanimated";
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

//Get the post from all the users
export const GetAllPosts = async (userid) => {
  try {
    const url = `${API_BASE_URL}/getAllpost/${userid}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const postData = responseData.posts;
    return postData;
  } catch (error) {
    console.error("Error message: ", error.message);
  }
};

//Add or Edit the
export const addrating = async (postid, rating) => {
  try {
    const userid = await AsyncStorage.getItem("userid");
    const url = `${API_BASE_URL}/addrating/${postid}/${userid}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error message: ", error.message);
  }
};


export const addPost = async (post_text, imageUri) => {
  try {
    const userid = await AsyncStorage.getItem("userid");
    if (!userid) {
      Alert.alert("User ID not found.");
      console.error("User ID not found in AsyncStorage");
      return null;
    }

    const url = `${API_BASE_URL}/addpost/${userid}`;
    console.log("URL:", url); // Log URL for debugging

    const formData = new FormData();
    formData.append("post_text", post_text || '');

    if (imageUri) {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!fileInfo.exists) {
        Alert.alert("Image file not found.");
        return null;
      }

      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append("file", {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    console.log("Response Status:", response.status);
    const responseText = await response.text();
    console.log("Response Text:", responseText);

    if (response.ok) {
      const data = JSON.parse(responseText); // Safely parse JSON data
      console.log("Response data:", data);
      return data;
    } else {
      console.error("Error: Unable to upload post.");
      Alert.alert("Error: Unable to upload post.");
      return null;
    }
  } catch (error) {
    console.error("Error message:", error.message || error);
    Alert.alert("An error occurred: " + (error.message || error));
    return null;
  }
};


//Get every User Posts:
export const getUserPost = async () => {
  const userid = await AsyncStorage.getItem("userid");
  const url = `${API_BASE_URL}/getuserpost/${userid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success && data.message.posts) {
      return data; // Return the full data object
    } else {
      console.error(
        "Error fetching posts:",
        data.message.posts || "No posts found"
      );
      return { posts: [] }; // Return empty posts if the API doesn't return them
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] }; // Return empty posts if there's an error
  }
};
