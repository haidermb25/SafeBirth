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
    null
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
    return null
  }
};



export const addPost = async (postText, postImage) => {
  try {
    let formData = new FormData();

    // Append the post text
    formData.append("post_text", postText);

    // If the post has an image, append the image file to the FormData
    if (postImage) {
      const image = {
        uri: postImage,
        type: "image/png", // or the appropriate mime type
        name: "image.png", // You can dynamically set the name if needed
      };
      formData.append("image", image);
    }

    const userId=await AsyncStorage.getItem("userid")
    const response = await fetch(`https://safe-birth-backend.vercel.app/addpost/${userId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};


// Utility function to convert image URI to File object
const uriToFile = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob(); // Convert the image to a Blob
  const file = new File([blob], 'image.png', { type: blob.type }); // Create a File object
  return file;
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
    
      return { posts: [] }; // Return empty posts if the API doesn't return them
    }
  } catch (error) {
    return { posts: [] }; // Return empty posts if there's an error
  }
};



//Delete the post of the user

export const deletePost = async (postid) => {
  
  const userid = await AsyncStorage.getItem("userid"); // Retrieve user ID from AsyncStorage

  if (!userid) {
    console.error("No user ID found in AsyncStorage");
    return null; // If no user ID is found, return null
  }

  const url = `${API_BASE_URL}/deletepost/${userid}/${postid}`; // Construct the delete URL

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content-type
      },
    });

    if (!response.ok) {
      // If the response status is not OK (200-299), handle the error
      return null;
    }

    const data = await response.json(); // Parse the response as JSON

    // Optionally, return the data from the response
    return data;
  } catch (error) {
    return null; // Return null in case of error
  }
};


export const updatePostText = async (postid,post_text) => {
  const userid = await AsyncStorage.getItem("userid"); // Retrieve user ID from AsyncStorage

  if (!userid) {
    console.error("No user ID found in AsyncStorage");
    return null; // If no user ID is found, return null
  }

  const url = `${API_BASE_URL}/editpost/${userid}/${postid}`; // Construct the delete URL

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content-type
      },
      body:JSON.stringify({
        post_text,
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json(); // Parse the response as JSON
    // Optionally, return the data from the response
    return data;
  } catch (error) {
    return null; // Return null in case of error
  }
};