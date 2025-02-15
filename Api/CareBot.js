import API_BASE_URL from "./ApiConfig";
export const QueryBot = async (question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/botquery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
};