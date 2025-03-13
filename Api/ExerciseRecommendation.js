import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";

export const fetchExercisePlanContent = async () => {
  const id=await AsyncStorage.getItem("userid")
  try {
    const response = await fetch(`${API_BASE_URL}/getAllExercisePlans/${id}`, {
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
        const response = await fetch(`${API_BASE_URL}/getExerciseDetailsByExercisePlan/${id}`, {
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



export const subscribeExercisePlan=async (exercisePlanId,weekNo)=>{
  const userId = await AsyncStorage.getItem("userid");
  try {
      const response = await fetch(`${API_BASE_URL}/subscribeExercisePlan/${userId}/${exercisePlanId}/${weekNo}`, {
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
