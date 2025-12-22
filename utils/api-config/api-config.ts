const MODE = "development"; 

export const API_BASE_URL =
  MODE === "development"
    ? "http://localhost:8080"
    : "https://stephanie-neuropterous-ridiculously.ngrok-free.dev";
