import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Calendar, Sparkles, CheckCircle2, Play, Trophy } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { soundManager } from '../utils/audio';

export const DailyChallengePage: React.FC = () => {
  const { userStats } = useAuthStore();
  const { startNewGame } = useGameStore();

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const completedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const today = 24;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white flex items-center space-x-3">
            <Flame className="w-8 h-8 text-amber-400 fill-amber-400" />
            <span>Daily Challenge Calendar</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Solve each day's hand-crafted puzzle to maintain your streak and earn +300 bonus XP!
          </p>
        </div>

        {/* Streak Counter Badge */}
        <div className="glass-card px-5 py-3 rounded-2xl border border-amber-500/40 flex items-center space-x-3 self-start sm:self-auto bg-amber-500/10">
          <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-mono text-slate-300 block uppercase">Current Streak</span>
            <span className="font-display font-black text-xl text-amber-400">
              {userStats.currentStreak} Days 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Today's Hero Challenge Card */}
      <GlassCard glow className="border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-brand-500/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TODAY'S SPECIAL PUZZLE — JULY 24</span>
          </div>
          <h2 className="font-display font-black text-3xl text-white">
            The Quantum Lattice
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Curated Expert difficulty puzzle featuring Naked Pairs & Pointing Pairs techniques. Complete to earn <strong>+300 XP</strong> & extend streak!
          </p>
        </div>

        <Link
          to="/play"
          onClick={() => {
            soundManager.playClick();
            startNewGame('EXPERT', 'TEACHER');
          }}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center space-x-2 transition-all hover:scale-105"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>Play Today's Challenge</span>
        </Link>
      </GlassCard>

      {/* Calendar Grid */}
      <GlassCard className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-brand-400" />
            <span>July 2026 Progress</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            23 / 31 Solved
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-xs font-mono text-slate-500 font-bold uppercase">
              {d}
            </span>
          ))}

          {daysInMonth.map((day) => {
            const isSolved = completedDays.includes(day);
            const isCurrentDay = day === today;

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center border p-1 relative transition-all ${
                  isCurrentDay
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20'
                    : isSolved
                    ? 'bg-slate-900/80 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-600'
                }`}
              >
                <span className={`text-xs font-bold font-mono ${isCurrentDay ? 'text-amber-300' : 'text-slate-200'}`}>
                  {day}
                </span>
                {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1" />}
                {isCurrentDay && !isSolved && (
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 mt-1 animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
