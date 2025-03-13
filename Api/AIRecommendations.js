import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";

export const AIRecommendations = async (
    age,
    pregnancyNo,
    multiplePregnancies,
    gestationalDiabetes,
    smoking,
    previousCSection,
    heartDisease,
    stressLevel,
    bmi,
    type
) => {
    try {
        console.log("Received type:", type); // Debugging
        const userId = await AsyncStorage.getItem("userid");

        if (!userId) {
            alert("User ID not found.");
            return null;
        }

        const url = `${API_BASE_URL}/getAiBasedDiet/${userId}/${type}`;
        console.log("API URL:", url); // Debugging API call

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                age,
                pregnancyNo,
                multiplePregnancies,
                gestationalDiabetes,
                smoking,
                previousCSection,
                heartDisease,
                stressLevel,
                bmi,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);
            alert(`API Error: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to fetch AI recommendations.");
        return null;
    }
};
