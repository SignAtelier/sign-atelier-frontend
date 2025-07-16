import axios from "axios";
import { useUserStore } from "../store/userStore";
import authAxios from "./axios";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://e18b69c76523.ngrok-free.app/api/auth/refresh",
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
  } catch (error: any) {
    const data = error.response?.data;

    alert(data.message);
  }
};

export const logout = async () => {
  try {
    await authAxios.post("/api/auth/logout");

    const store = useUserStore.getState();

    store.clearAll();
  } catch {
    alert("로그아웃에 실패했습니다.");
  }
};
