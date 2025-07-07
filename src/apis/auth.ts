import axios from "axios";
import type { User } from "../store/userStore";

export const getUserInfo = async (setUserInfo: (user: User) => void) => {
  try {
    const response = await axios.get("/api/users/me", {
      withCredentials: true,
    });

    const { social_id, profile } = response.data;
    const user = { socialId: social_id, profilePicture: profile };

    setUserInfo(user);
  } catch (error: any) {
    const data = error.response?.data;

    if (data.code === "NO_TOKEN") return;

    alert(data.message);
  }
};
