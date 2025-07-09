import { useUserStore } from "../store/userStore";
import authAxios from "./axios";

export const getUserInfo = async () => {
  const store = useUserStore.getState();

  try {
    const response = await authAxios.get("/api/users/me");

    const { social_id, profile } = response.data;
    const user = { socialId: social_id, profilePicture: profile };

    store.setUserInfo(user);
  } catch (error: any) {
    const data = error.response?.data;

    if (data.code === "NO_TOKEN" || data.code === "TOKEN_INVALID") {
      store.setUserInfo(null);
    } else {
      alert(data.message);
    }
  } finally {
    store.setInitialized();
  }
};

export const logout = async () => {
  try {
    await authAxios.post("/api/auth/logout");

    const store = useUserStore.getState();

    store.clearAll();

    window.location.href = "/";
  } catch (error) {
    alert("로그아웃에 실패했습니다.");
  }
};
