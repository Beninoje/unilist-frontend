import { Double } from "react-native/Libraries/Types/CodegenTypesNamespace";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?:string;
}
export interface UpdateUserFormErrors{
  firstName?: string;
  lastName?: string;
  password?: string;
}
export interface UpdateUserFormData{
  firstName?: string;
  lastName?: string;
  password?: string;
  email?:string;
}
export interface UserProps {
  firstName: string;
  lastName: string;
  email:string;
  token:string;
} 

// Listings
export interface CreateListingFormData {
  title: string;
  price: Double;
  description: string;
  condition: string;
  category: string;
  images: string[]; 
}
