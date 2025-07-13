import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SignState {
  name: string;
  fileBase64: string;
}

interface SignAtions {
  setName: (name: string) => void;
  setFileBase64: (fileBase64: string) => void;
  clearAll: () => void;
}

export const useSignStore = create<SignState & SignAtions>()(
  persist(
    (set) => ({
      name: "",
      fileBase64: "",
      setName: (name) => set({ name }),
      setFileBase64: (fileBase64) => set({ fileBase64 }),
      clearAll: () => set({ name: "", fileBase64: "" }),
    }),
    {
      name: "sign-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
