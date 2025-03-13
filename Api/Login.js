import API_BASE_URL from "./ApiConfig";

const LoginApi = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get error details
    return null;
  }

  const data = await response.json();
  return data;
};

export default LoginApi;
