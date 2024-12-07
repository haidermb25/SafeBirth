import API_BASE_URL from "./ApiConfig";

export const fetchContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/geteducationaldata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
