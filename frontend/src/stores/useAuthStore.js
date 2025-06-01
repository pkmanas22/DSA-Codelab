import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isAuthenticated: false,

      setAuth: ({ user }) => set({ authUser: user, isAuthenticated: true }),

      clearAuth: () => set({ authUser: null, isAuthenticated: false }),
    }),
    {
      name: 'x-auth-store',
    }
  )
);
