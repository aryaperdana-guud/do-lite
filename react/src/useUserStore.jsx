// useUserStore.jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Initial state
      setUser: (userData) => set({ user: userData }), // Set user state
      clearUser: () => set({ user: null }), // Clear user state
    }),
    {
      name: "user-storage", // Key used for localStorage/sessionStorage
      getStorage: () => localStorage, // Choose where to persist the data
    }
  )
);
