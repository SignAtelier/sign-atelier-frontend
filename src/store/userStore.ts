import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  socialId: string;
  profilePicture: string;
}

interface UserState {
  userInfo: User | null;
  initialized: boolean;
}

interface UserActions {
  setUserInfo: (user: User | null) => void;
  setInitialized: () => void;
  clearAll: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      userInfo: null,
      initialized: false,
      setUserInfo: (user) => set({ userInfo: user }),
      setInitialized: () => set({ initialized: true }),
      clearAll: () => set({ userInfo: null, initialized: false }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        userInfo: state.userInfo,
        initialized: state.initialized,
      }),
    }
  )
);
