import axios from "axios";

const API_BASE_URL = "http://localhost:8080/auth"; // replace with your backend URL

export const signUp = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data; // probably returns JWT token
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const verifyOTP = async (payload:any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, payload)
    return response.data;
  } catch (error:any) {
    throw error.response?.data || { message: "Something went wrong" };
  }

}