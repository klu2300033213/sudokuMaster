import { Achievement, LeaderboardEntry, User, UserStats } from '../types';

const API_BASE_URL = '/api';

export class ApiService {
  private static getHeaders() {
    const token = localStorage.getItem('sudoku-auth-token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // Auth endpoints
  public static async login(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using mock authentication:', e);
    }

    // Mock Fallback
    return {
      token: 'mock-jwt-token-abcdef123456',
      user: {
        id: 'usr_001',
        username: email.split('@')[0] || 'SudokuMaster',
        email,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        country: 'US',
        bio: 'Sudoku master & AI enthusiast.',
        xp: 4250,
        level: 8,
        createdAt: new Date().toISOString(),
      },
    };
  }

  public static async register(
    email: string,
    username: string,
    password: string,
    optionalProfile?: { avatarUrl?: string; country?: string; bio?: string }
  ): Promise<{ token: string; user: User }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          email,
          username,
          password,
          avatarUrl: optionalProfile?.avatarUrl,
          country: optionalProfile?.country,
          bio: optionalProfile?.bio,
        }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using mock registration:', e);
    }

    return {
      token: 'mock-jwt-token-newuser',
      user: {
        id: `usr_${Date.now()}`,
        username,
        email,
        avatarUrl:
          optionalProfile?.avatarUrl ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
        country: optionalProfile?.country || 'US',
        bio: optionalProfile?.bio || 'Sudoku Master AI Enthusiast!',
        xp: 100,
        level: 1,
        createdAt: new Date().toISOString(),
      },
    };
  }

  // Leaderboards endpoint
  public static async getLeaderboard(timeframe: 'WEEKLY' | 'MONTHLY' | 'ALL_TIME' = 'WEEKLY'): Promise<LeaderboardEntry[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/leaderboard?timeframe=${timeframe}`, {
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, serving mock leaderboard data');
    }

    return [
      {
        rank: 1,
        user: {
          id: 'u1',
          username: 'QuantumSolver',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          country: 'US',
        },
        score: 18450,
        winCount: 142,
        bestTimeSeconds: 118,
        difficulty: 'EVIL',
      },
      {
        rank: 2,
        user: {
          id: 'u2',
          username: 'LogicQueen_JP',
          avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
          country: 'JP',
        },
        score: 16200,
        winCount: 128,
        bestTimeSeconds: 135,
        difficulty: 'EVIL',
      },
      {
        rank: 3,
        user: {
          id: 'u3',
          username: 'GrandmasterAlex',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
          country: 'US',
        },
        score: 14800,
        winCount: 96,
        bestTimeSeconds: 142,
        difficulty: 'EXPERT',
      },
      {
        rank: 4,
        user: {
          id: 'u4',
          username: 'CyberGrid99',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
          country: 'DE',
        },
        score: 12900,
        winCount: 84,
        bestTimeSeconds: 165,
        difficulty: 'HARD',
      },
      {
        rank: 5,
        user: {
          id: 'u5',
          username: 'Elena_Sudoku',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
          country: 'ES',
        },
        score: 11500,
        winCount: 72,
        bestTimeSeconds: 180,
        difficulty: 'HARD',
      },
    ];
  }

  // Achievements Endpoint
  public static async getAchievements(): Promise<Achievement[]> {
    return [
      {
        id: 'ach_1',
        code: 'FIRST_WIN',
        title: 'First Victory',
        description: 'Complete your very first Sudoku puzzle.',
        icon: 'trophy',
        category: 'WINS',
        unlocked: true,
        unlockedAt: '2026-01-16T12:00:00Z',
        progress: 100,
      },
      {
        id: 'ach_2',
        code: 'WINS_10',
        title: 'Decathlon Solver',
        description: 'Achieve 10 total puzzle victories.',
        icon: 'award',
        category: 'WINS',
        unlocked: true,
        unlockedAt: '2026-02-01T15:30:00Z',
        progress: 100,
      },
      {
        id: 'ach_3',
        code: 'WINS_100',
        title: 'Centurion Master',
        description: 'Achieve 100 total puzzle victories.',
        icon: 'crown',
        category: 'WINS',
        unlocked: false,
        progress: 19,
      },
      {
        id: 'ach_4',
        code: 'NO_HINT_VICTORY',
        title: 'Pure Intuition',
        description: 'Win a Hard or higher puzzle without using any hints.',
        icon: 'brain',
        category: 'SPECIAL',
        unlocked: true,
        unlockedAt: '2026-02-10T09:15:00Z',
        progress: 100,
      },
      {
        id: 'ach_5',
        code: 'PERFECT_GAME',
        title: 'Flawless Execution',
        description: 'Win a puzzle with 0 mistakes made.',
        icon: 'sparkles',
        category: 'SPECIAL',
        unlocked: true,
        unlockedAt: '2026-02-12T18:45:00Z',
        progress: 100,
      },
      {
        id: 'ach_6',
        code: 'SPEED_MASTER',
        title: 'Speed Demon',
        description: 'Solve a Medium puzzle in under 5 minutes.',
        icon: 'zap',
        category: 'SPEED',
        unlocked: true,
        unlockedAt: '2026-02-14T11:20:00Z',
        progress: 100,
      },
      {
        id: 'ach_7',
        code: 'DAILY_CHAMPION',
        title: 'Daily Legend',
        description: 'Maintain a 7-day Daily Challenge streak.',
        icon: 'flame',
        category: 'STREAK',
        unlocked: false,
        progress: 71,
      },
      {
        id: 'ach_8',
        code: 'EXPERT_SOLVER',
        title: 'Evil Dominator',
        description: 'Conquer an Evil difficulty puzzle.',
        icon: 'target',
        category: 'SPECIAL',
        unlocked: false,
        progress: 0,
      },
    ];
  }
}
