import { Listing, UpdateUserFormData } from "@/types/type";
import { API_BASE_URL } from "@/utils/api-config/api-config";
import axios from "axios";


export const fetchUser = async (token:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`,{
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
export const updateProfile = async (body: UpdateUserFormData, token:string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/update`, body,{
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
export const addToFavourites = async (listingId: BigInt, token: string) => {
  console.log("User token in api call:", token);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/favourites/${listingId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const removeFromFavourites = async (listingId: BigInt, token: string) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/favourites/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const fetchAllFavourites = async (token:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/favourites/all`,{
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
export const fetchAllUserListings = async (token:string) : Promise<Listing[]>  => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/listings/all`,{
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    console.log("User Listings: ",response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}