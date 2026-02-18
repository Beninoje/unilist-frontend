import { apiRequest } from "@/utils/api-client/api-client";

// export const signUp = async (data: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/signup`, data);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || { message: "Something went wrong" };
//   }
// };
export const signUp = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => { 
  try {
    return await apiRequest("POST", "/auth/signup", data);
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const login = async (data: { email: string; password: string }) => {
  
    return apiRequest("POST", "/auth/login", data);
  
};  

//     console.warn("Localhost failed, switching to NGROK...");
//     try {
//       const response = await axios.post(`${NGROK_API_BASE_URL}/login`, data);
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || { message: "Something went wrong" };
//     }
//   }
   
// };
export const verifyOTP = async (payload:any) => {
  try {
    return await apiRequest("POST", "/auth/verify", payload);
  } catch (error:any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};