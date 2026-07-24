import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Trophy,
  Clock,
  Flame,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  PieChart,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GlassCard } from '../components/ui/GlassCard';

export const StatisticsPage: React.FC = () => {
  const { userStats } = useAuthStore();

  const formatTime = (secs: number) => {
    if (secs === 0) return '0m 0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const difficultyColors = {
    EASY: 'bg-emerald-500',
    MEDIUM: 'bg-brand-500',
    HARD: 'bg-amber-500',
    EXPERT: 'bg-violet-500',
    EVIL: 'bg-rose-500',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-brand-400" />
            <span>Performance Statistics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Detailed breakdown of your puzzle solving speed, accuracy, and difficulty progression
          </p>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Win Rate</span>
          </div>
          <span className="font-display font-black text-3xl text-emerald-400 block">
            {userStats.winRate}%
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {userStats.gamesWon} wins of {userStats.gamesPlayed} games
          </span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-brand-400" />
            <span className="text-xs font-semibold text-slate-300">Fastest Time</span>
          </div>
          <span className="font-display font-black text-3xl text-white block">
            {formatTime(userStats.fastestTimeSeconds)}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Personal best record</span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-slate-300">Current Streak</span>
          </div>
          <span className="font-display font-black text-3xl text-amber-400 block">
            {userStats.currentStreak} Days
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Best: {userStats.bestStreak} Days</span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-2">
            <Lightbulb className="w-5 h-5 text-violet-400" />
            <span className="text-xs font-semibold text-slate-300">Hints & Mistakes</span>
          </div>
          <span className="font-display font-black text-3xl text-violet-300 block">
            {userStats.hintsUsedCount} / {userStats.totalMistakes}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Hints used / Mistakes made</span>
        </GlassCard>
      </div>

      {/* Difficulty Distribution Breakdown */}
      <GlassCard className="space-y-6">
        <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-brand-400" />
          <span>Games Won by Difficulty Tier</span>
        </h3>

        <div className="space-y-4">
          {Object.entries(userStats.difficultyDistribution).map(([diff, count]) => {
            const maxVal = Math.max(...Object.values(userStats.difficultyDistribution), 1);
            const percentage = Math.round((count / maxVal) * 100);
            return (
              <div key={diff} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{diff}</span>
                  <span className="font-mono text-brand-400">{count} Wins</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full ${difficultyColors[diff as keyof typeof difficultyColors]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
