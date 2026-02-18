import { CreateListingFormData, EditListingFormData, UpdateUserFormData } from "@/types/type";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/listing"; // replace with your backend URL
const NGROK_API_BASE_URL = "https://stephanie-neuropterous-ridiculously.ngrok-free.dev/listing";


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
     console.warn("Localhost failed, switching to NGROK...");
  }
    try {
      const response = await axios.post(`${NGROK_API_BASE_URL}/create`, body,{
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
     console.warn("Localhost failed, switching to NGROK...");
  }
  try {
    const response = await axios.put(`${NGROK_API_BASE_URL}/edit/${listingId}`, body,{
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
     console.warn("Localhost failed, switching to NGROK...");
  }
  try {
    const response = await axios.delete(`${NGROK_API_BASE_URL}/delete/${listingId}`,{
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
export const fetchAllListings = async (token:string, page:number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listing/all?size=4&page=${page}`,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
     console.warn("Localhost failed, switching to NGROK...");
  }
    try {
      const response = await axios.get(`${NGROK_API_BASE_URL}/all`,{
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
     console.warn("Localhost failed, switching to NGROK...");
  }
  try {
    const response = await axios.get(`${NGROK_API_BASE_URL}/view/${listingId}`,{
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