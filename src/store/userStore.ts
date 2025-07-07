import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  socialId: string;
  profilePicture: string;
}

interface UserState {
  userInfo: User | null;
}

interface UserActions {
  setUserInfo: (user: User) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);
