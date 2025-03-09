import API_BASE_URL from "./ApiConfig";

export const fetchExercisePlanContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getAllExercisePlans`, {
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

