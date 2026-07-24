export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT' | 'EVIL';
export type GameMode = 'TEACHER' | 'HINT' | 'CHALLENGE';

export interface Cell {
  row: number;
  col: number;
  value: number; // 0 for empty
  solutionValue: number;
  isGiven: boolean;
  isError: boolean;
  notes: number[]; // pencil marks
  isSelected: boolean;
  isHighlighted: boolean;
  isSameNumber: boolean;
  isPeer: boolean; // same row, col, or 3x3 box
}

export type Grid = Cell[][];

export interface Move {
  row: number;
  col: number;
  prevValue: number;
  newValue: number;
  prevNotes: number[];
  newNotes: number[];
  timestamp: number;
}

export interface ProgressiveHint {
  level: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  targetRow?: number;
  targetCol?: number;
  targetValue?: number;
  techniqueName?: string;
}

export interface TutorExplanation {
  type: 'info' | 'warning' | 'tip' | 'technique';
  title: string;
  message: string;
  technique?: string;
  affectedCells?: { row: number; col: number }[];
  suggestedValue?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  country: string;
  xp: number;
  level: number;
  createdAt: string;
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  totalTimeSeconds: number;
  avgTimeSeconds: number;
  fastestTimeSeconds: number;
  hintsUsedCount: number;
  totalMistakes: number;
  currentStreak: number;
  bestStreak: number;
  difficultyDistribution: Record<Difficulty, number>;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  category: 'WINS' | 'SPEED' | 'SPECIAL' | 'STREAK';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
    country: string;
  };
  score: number; // XP or Best Time
  winCount: number;
  bestTimeSeconds: number;
  difficulty: Difficulty;
}

export interface GameSettings {
  darkMode: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
  autoPencilNotes: boolean;
  showPencilNotes: boolean;
  highlightSameNumbers: boolean;
  highlightPeers: boolean;
  warnOnMistakes: boolean;
  maxMistakesLimit: number; // 0 for unlimited, 3 for strict
}
