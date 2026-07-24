import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Flame,
  Trophy,
  BarChart3,
  Sparkles,
  Clock,
  CheckCircle2,
  Award,
  Zap,
  ArrowRight,
  Grid,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { soundManager } from '../utils/audio';

export const DashboardPage: React.FC = () => {
  const { user, userStats } = useAuthStore();
  const { isGameActive, difficulty, gameMode, startNewGame } = useGameStore();

  const xpCurrent = user?.xp || 0;
  const level = user?.level || 1;
  const xpForNextLevel = level * 500;
  const xpProgress = Math.min(100, Math.floor(((xpCurrent % 500) / 500) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & XP Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatarUrl}
            alt={user?.username}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                Welcome back, {user?.username}!
              </h1>
              <span className="text-[11px] font-mono font-bold bg-brand-500/20 text-brand-300 px-2.5 py-0.5 rounded-full border border-brand-500/30">
                Lvl {level}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ready to challenge your mind today? Daily streak: <strong className="text-amber-400">{userStats.currentStreak} Days 🔥</strong>
            </p>
          </div>
        </div>

        {/* XP Bar Widget */}
        <div className="w-full md:w-72 space-y-2 glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Level Progress</span>
            </span>
            <span className="font-mono text-brand-400 font-bold">{xpCurrent} / {xpForNextLevel} XP</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue / Quick Play Card */}
        <GlassCard glow className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30">
                {isGameActive ? 'Active Game Saved' : 'Quick Match'}
              </span>
              <span className="text-xs font-mono text-slate-400">{gameMode} Mode</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {isGameActive ? `Resume ${difficulty} Puzzle` : 'Start a New Sudoku Game'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pick your preferred difficulty and let our AI engine tutor you through advanced solving techniques.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
            <Link
              to="/play"
              onClick={() => {
                if (!isGameActive) startNewGame('MEDIUM', 'TEACHER');
                soundManager.playClick();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isGameActive ? 'Continue Playing' : 'Play Medium Puzzle'}</span>
            </Link>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {(['EASY', 'HARD', 'EXPERT'] as const).map((diff) => (
                <Link
                  key={diff}
                  to="/play"
                  onClick={() => {
                    startNewGame(diff, 'TEACHER');
                    soundManager.playClick();
                  }}
                  className="flex-1 sm:flex-none px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 text-center"
                >
                  {diff}
                </Link>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Daily Challenge Card */}
        <GlassCard className="flex flex-col justify-between border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">Daily Challenge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Solve today's curated puzzle to earn <strong>+300 Bonus XP</strong> and extend your streak!
            </p>
          </div>

          <Link
            to="/daily-challenge"
            onClick={() => soundManager.playClick()}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
          >
            <span>Play Daily Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      </div>

      {/* Quick Statistics Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Games Won</span>
            <span className="font-display font-bold text-xl text-white block">
              {userStats.gamesWon} / {userStats.gamesPlayed}
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Win Rate</span>
            <span className="font-display font-bold text-xl text-emerald-400 block">
              {userStats.winRate}%
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Best Time</span>
            <span className="font-display font-bold text-xl text-white block">
              {formatTime(userStats.fastestTimeSeconds)}
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Best Streak</span>
            <span className="font-display font-bold text-xl text-amber-400 block">
              {userStats.bestStreak} Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
