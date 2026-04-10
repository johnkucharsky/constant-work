import axios from "axios";

export const LOCAL_API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: LOCAL_API_URL,
});

// 🔥 Global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Something went wrong";

    // Log full error for debugging
    console.error("API ERROR:", error?.response?.data || error);

    // Throw clean error for UI
    return Promise.reject(new Error(message));
  },
);
