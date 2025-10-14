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
