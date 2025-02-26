import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      id: "",
      password: "",
      setCredentials: (id, password) => set({ id, password }),
      clearCredentials: () => set({ id: "", password: "" }),
    }),
    {
      name: "auth-storage", // Key name in localStorage
      getStorage: () => localStorage, // (or sessionStorage)
    }
  )
);

export default useAuthStore;
