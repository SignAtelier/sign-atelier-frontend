import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { SignatureStyle } from "../apis/types";

interface SignState {
  name: string;
  style: SignatureStyle;
}

interface SignActions {
  setName: (name: string) => void;
  setStyle: (style: SignatureStyle) => void;
  clearAll: () => void;
}

export const useSignStore = create<SignState & SignActions>()(
  persist(
    (set) => ({
      name: "",
      style: "luxury",
      setName: (name) => set({ name }),
      setStyle: (style) => set({ style }),
      clearAll: () => set({ name: "", style: "luxury" }),
    }),
    {
      name: "sign-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
