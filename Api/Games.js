import API_BASE_URL from "./ApiConfig";

export const getChildName = async (fatherName, motherName) => {  
    if (!fatherName || !motherName) {
        alert("Both father and mother names are required!");
        return null;
    }

    try {
        console.log(`Fetching names for: Father=${fatherName}, Mother=${motherName}`);

        const response = await fetch(`${API_BASE_URL}/generateBabyNames?father_name=${encodeURIComponent(fatherName)}&mother_name=${encodeURIComponent(motherName)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("API Error:", response.status);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(`Fetch Error: ${error.message}`);
        return null;
    }
};

