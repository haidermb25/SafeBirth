import API_BASE_URL from "./ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Get the User Data
export const getUserData = async (email) => {
   console.log("Email:", email);
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
      return null
    }
  } catch (error) {
    return null;
  }
};



  export const getSubscribeDietPlan = async () => {
    try {
      const id = await AsyncStorage.getItem('userid');
      const url = `${API_BASE_URL}/getSubscribeDiet/${id}`;
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
      if (responseData) {
        return responseData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };



  export const getSubscribeExercisePlan = async () => {
    try {
      const id = await AsyncStorage.getItem('userid');
      const url = `${API_BASE_URL}/getSubscribeExercise/${id}`;
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
      if (responseData) {
        return responseData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };