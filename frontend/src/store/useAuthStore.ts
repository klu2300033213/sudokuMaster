import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserStats } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  userStats: UserStats;
  login: (email: string, token: string, user: User) => void;
  logout: () => void;
  register: (email: string, username: string, token: string, user: User) => void;
  updateProfile: (profileData: Partial<User>) => void;
  addXP: (amount: number) => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
}

const defaultUserStats: UserStats = {
  gamesPlayed: 24,
  gamesWon: 19,
  winRate: 79.2,
  totalTimeSeconds: 14200,
  avgTimeSeconds: 591,
  fastestTimeSeconds: 245,
  hintsUsedCount: 12,
  totalMistakes: 8,
  currentStreak: 5,
  bestStreak: 12,
  difficultyDistribution: {
    EASY: 8,
    MEDIUM: 7,
    HARD: 3,
    EXPERT: 1,
    EVIL: 0,
  },
};

const defaultMockUser: User = {
  id: 'usr_001',
  username: 'GrandmasterAlex',
  email: 'alex.sudoku@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  country: 'US',
  bio: 'Sudoku enthusiast & AI speedsolver. Aiming for Top 10 Global Leaderboard!',
  xp: 4250,
  level: 8,
  createdAt: '2026-01-15T10:00:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: defaultMockUser,
      token: 'mock-jwt-token-abcdef123456',
      isAuthenticated: true,
      userStats: defaultUserStats,

      login: (email, token, user) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      register: (email, username, token, user) => set({ user, token, isAuthenticated: true }),

      updateProfile: (profileData) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: {
            ...currentUser,
            ...profileData,
          },
        });
      },

      addXP: (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;
        const newXP = currentUser.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;

        set({
          user: {
            ...currentUser,
            xp: newXP,
            level: newLevel,
          },
        });
      },

      updateUserStats: (newStats) => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            ...newStats,
          },
        }));
      },
    }),
    {
      name: 'sudoku-auth-storage',
    }
  )
);
