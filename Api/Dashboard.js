import API_BASE_URL from "./ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Get the User Data
export const getUserData = async (email) => {
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



  export const getSubscribeExecisePlan = async () => {
    alert("I am here")
    try {
      const id = await AsyncStorage.getItem('userid');
      if (!email) {
        throw new Error('User email not found in storage');
      }

      const url = `${API_BASE_URL}/getSubscribeExecisePlan/${id}`;
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
        alert(responseData.statusCode)
        return responseData;
      } else {
        alert("I am here")
        return null;
      }
    } catch (error) {
      return null;
    }
  };