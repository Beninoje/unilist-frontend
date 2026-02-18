import axios, { AxiosRequestConfig } from "axios";

const LOCAL_BASE = "http://localhost:8080";
const NGROK_BASE = "https://stephanie-neuropterous-ridiculously.ngrok-free.dev";

let activeBaseUrl: string | null = null;

export const apiRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint:string,
    data?: any,
    config: AxiosRequestConfig = {} ,
) => {
    const req = async (baseUrl: string) => {
        return await axios({
            method,
            url: `${baseUrl}${endpoint}`,
            data,
            ...config
        });
    };

    if(activeBaseUrl){
        const res = await req(activeBaseUrl);
        return res.data;
    }
    // Try Local Host first
    try {
        const res = await req(LOCAL_BASE);
        activeBaseUrl = LOCAL_BASE;
        return res.data;      
    } catch (error:any) {
        console.warn("Localhost failed, switching to NGROK...");
    }
    // Try NGROK next
    try {
        const res = await req(NGROK_BASE);
        activeBaseUrl = NGROK_BASE;
        return res.data;        
    } catch (error:any) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};
