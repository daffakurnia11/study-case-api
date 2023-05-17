import { atom } from "jotai";
import { atomWithStore } from "jotai-zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const loginState = create(
  persist(() => ({}), {
    name: "user-data-login",
    getStorage: () => localStorage,
  })
);

export const loginData = atomWithStore(loginState);
