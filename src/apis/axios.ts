import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "../store/userStore";

const authAxios: AxiosInstance = axios.create({
  withCredentials: true,
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        await axios.post("/api/auth/refresh", null, {
          withCredentials: true,
        });

        return authAxios(originalConfig);
      } catch {
        const store = useUserStore.getState();

        store.clearAll();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
