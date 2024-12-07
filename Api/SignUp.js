import API_BASE_URL from "./ApiConfig";
import Toast from "react-native-toast-message";
const SignUpApi = async (name, username, email, password, gender) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        gender,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      Toast.show({
        type: "error",
        text1: "Sign-Up Failed!",
        text2: data.message,
        position: "top",
        visibilityTime: 3000,
      });
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default SignUpApi;
