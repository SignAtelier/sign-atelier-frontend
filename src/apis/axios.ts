import axios, { type AxiosInstance } from 'axios';
import { useUserStore } from '../store/userStore';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const authAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
        const refeshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          null,
          {
            withCredentials: true,
          }
        );

        const newAccessToken = refeshResponse.data.accessToken;

        useUserStore.getState().setAccessToken(newAccessToken);

        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

        return authAxios(originalConfig);
      } catch {
        useUserStore.getState().clearAll();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
