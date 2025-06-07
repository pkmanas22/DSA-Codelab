import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isAuthenticated: false,

      problemsSolved: [],

      playlists: [],

      setAuth: ({ user }) =>
        set({
          authUser: user,
          isAuthenticated: true,
          problemsSolved: user?.problemsSolved || [],
          playlists: user?.playlists || [],
        }),

      clearAuth: () => set({ authUser: null, isAuthenticated: false, problemsSolved: [] }),

      addSolvedProblem: (problemId) => {
        const current = get().problemsSolved;
        if (!current.includes(problemId)) {
          set({ problemsSolved: [...current, problemId] });
        }
      },
    }),
    {
      name: 'x-auth-store',
    }
  )
);
