import { CreateListingFormData, EditListingFormData, UpdateUserFormData } from "@/types/type";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/listing"; // replace with your backend URL

export const createListing = async (body: CreateListingFormData, token:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, body,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const editListing = async (listingId:string, body: EditListingFormData, token:string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/edit/${listingId}`, body,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const deleteListing = async (listingId:string, token:string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${listingId}`,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}