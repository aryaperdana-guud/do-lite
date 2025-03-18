import { create } from "zustand";

const useSessionStore = create((set) => ({
  token: null,
  expiresAt: null,
  idQuery: null,
  idExtend: null,
  setKeyForB: (id) => set({ idQuery: id }),
  setExtendId: (id) => set({ idExtend: id }),
  setSession: (token, expiresAt) => set({ token, expiresAt }),
  clearSession: () =>
    set({ token: null, expiresAt: null, idQuery: null, idExtend: null }),
}));

export default useSessionStore;
