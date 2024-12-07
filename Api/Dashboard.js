import API_BASE_URL from "./ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Get the User Data
const getUserData = async (email) => {
  try {
    const url = `${API_BASE_URL}/getuser/${email}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const userData = responseData.data; // Access the 'data' object

    if (userData) {
      return userData;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error message:", error.message);
    return null;
  }
};

//Upload the new post
const UploadPosts = () => {};

//Get all user posts
const GetAlluserPosts = () => {};
//Rate the post
const PostRating = () => {};

export default getUserData;
