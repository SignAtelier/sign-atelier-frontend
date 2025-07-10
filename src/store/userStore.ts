import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  socialId: string;
  provider: string;
  profilePicture: string;
}

interface UserState {
  userInfo: User | null;
  accessToken: string | null;
}

interface UserActions {
  setUserInfo: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clearAll: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      userInfo: null,
      accessToken: null,
      setUserInfo: (user) => set({ userInfo: user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearAll: () => set({ userInfo: null, accessToken: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        userInfo: state.userInfo,
        accessToken: state.accessToken,
      }),
    }
  )
);
