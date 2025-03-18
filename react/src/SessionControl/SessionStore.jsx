import { create } from "zustand";

const useSessionStore = create((set) => ({
  token: null,
  expiresAt: null, // Store expiration timestamp
  idQuery: null, // Store key from Tab A for Tab B
  setKeyForB: (id) => set({ idQuery: id }),
  setSession: (token, expiresAt) => set({ token, expiresAt }),
  clearSession: () => set({ token: null, expiresAt: null }),
}));

export default useSessionStore;
