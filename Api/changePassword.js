import API_BASE_URL from "./ApiConfig";
export const EmailCheck = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const verifyNewOTP = async (email,otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp
        }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };
  
  export const changePass = async (email,password,confirm_password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/afterforgot/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         password,
         confirm_password
        }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
        console.error(error)
      return null;
    }
  };
