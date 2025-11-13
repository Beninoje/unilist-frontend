import { UpdateUserFormData } from "@/types/type";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/users"; // replace with your backend URL

export const updateProfile = async (body: UpdateUserFormData, token:string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, body,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const addToFavourites = async (listingId:BigInt, token:string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/favourites/${listingId}`,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}
export const fetchAllFavourites = async (token:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favourites/all`,{
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Favourites: ",response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}
