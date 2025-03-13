import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";
import Toast from "react-native-toast-message";



export const getDietSubscription = async () => {
    const id=await AsyncStorage.getItem("userid")   
    try {
        const response = await fetch(`${API_BASE_URL}/getDietProgress/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            Toast.show({
                type: "error",
                text1: "Failed to fetch diet subscription!",
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

export const getExerciseSubscription = async () => {
    const id=await AsyncStorage.getItem("userid")   
    try {
        const response = await fetch(`${API_BASE_URL}/getExerciseProgress/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            Toast.show({
                type: "error",
                text1: "Failed to fetch exercise subscription!",
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


export const CancelSubscription = async (type) => {
    const id=await AsyncStorage.getItem("userid")   
    try {
        const response = await fetch(`${API_BASE_URL}/deleteExercisePlan/${id}/${type}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();   
        return data;
    } catch (error) {
        return null;
    }
};