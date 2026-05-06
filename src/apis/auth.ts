import axios from "axios";
import { useUserStore } from "../store/userStore";
import authAxios from "./axios";
import { getApiErrorMessage } from "./error";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://5ec0ae27d9fa.ngrok-free.app";

export const loginWithGoogleCredential = async (credential: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/google`,
    { credential },
    {
      withCredentials: true,
    }
  );

  return response.data.accessToken as string;
};

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/refresh`,
      null,
      {
        withCredentials: true,
      }
    );

    return response.data.accessToken;
  } catch {
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await authAxios.get("/api/users/me");
    const { social_id, provider, profile } = response.data;

    return {
      socialId: social_id,
      provider: provider,
      profilePicture: profile,
    };
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    await authAxios.post("/api/auth/logout");

    const store = useUserStore.getState();

    store.clearAll();
  } catch (error: unknown) {
    alert(getApiErrorMessage(error, "로그아웃에 실패했습니다."));
  }
};
