import { API_BASE_URL } from "@/utils/api-config/api-config";
import axios from "axios";

;

export const signUp = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};


export const login = async (data: { email: string; password: string }) => {

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Something went wrong" };
    }
  };
export const verifyOTP = async (payload:any) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Something went wrong" };
    }
};