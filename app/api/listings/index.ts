import { CreateListingFormData, EditListingFormData, UpdateUserFormData } from "@/types/type";
import { API_BASE_URL } from "@/utils/api-config/api-config";
import axios from "axios";

export const createListing = async (body: CreateListingFormData, token:string) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/listing/create`, body,{
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
export const editListing = async (listingId:string, body: EditListingFormData, token:string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/listing/edit/${listingId}`, body,{
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
export const deleteListing = async (listingId:string, token:string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/listing/delete/${listingId}`,{
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
export const fetchAllListings = async (token:string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listing/all`,{
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
export const fetchListing = async (listingId:string, token:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listing/view/${listingId}`,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error:any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}