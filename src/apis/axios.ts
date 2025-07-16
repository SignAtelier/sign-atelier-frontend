import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "../store/userStore";

const authAxios: AxiosInstance = axios.create({
  baseURL: "https://e18b69c76523.ngrok-free.app",
  withCredentials: true,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const refeshResponse = await axios.post("/api/auth/refresh", null, {
          withCredentials: true,
        });

        const newAccessToken = refeshResponse.data.accessToken;

        useUserStore.getState().setAccessToken(newAccessToken);

        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

        return authAxios(originalConfig);
      } catch {
        useUserStore.getState().clearAll();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
