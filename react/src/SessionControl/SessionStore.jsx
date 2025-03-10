import { create } from "zustand";

const useSessionStore = create((set) => ({
  token: null,
  expiresAt: null, // Store expiration timestamp
  setSession: (token, expiresAt) => set({ token, expiresAt }),
  clearSession: () => set({ token: null, expiresAt: null }),
}));

export default useSessionStore;
