import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";

export const fetchContent = async () => {
    const userId = await AsyncStorage.getItem("userid");
  try {
    const response = await fetch(`${API_BASE_URL}/getAllDietPlans/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null
    }
    const data = await response.json();
    return data;
  } catch (error) { 
    return null
  }
};

export const GetDetailById=async (id)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/getDietDetailsByDietPlan/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        return null
        }
        const data = await response.json();
        return data;
    } catch (error) { 
        return null
    }   
}



export const subscribeDietPlan=async (dietPlanId,weekNo)=>{
    const userId = await AsyncStorage.getItem("userid");
    try {
        const response = await fetch(`${API_BASE_URL}/subscribeDietPlan/${userId}/${dietPlanId}/${weekNo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        return null
        }
        const data = await response.json();
        return data;
    } catch (error) { 
        return null
    }    
}



