import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Lightbulb,
  Zap,
  Grid,
  Trophy,
  BarChart3,
  Shield,
  Pencil,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 inline-block">
          Complete Feature Overview
        </span>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          Built for Beginners & Grandmasters
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Sudoku Master AI integrates dynamic solving engines, progressive pedagogies, and commercial-grade gamification.
        </p>
      </div>

      {/* Feature Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4 border border-brand-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Infinite Dynamic Board Generator
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every Sudoku puzzle is procedurally created using backtracking solvers and verified to ensure a single, unique mathematical solution.
          </p>
        </GlassCard>

        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4 border border-violet-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Real-Time AI Tutor
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Analyzes your grid state live. Detects naked singles, hidden candidates, pointing pairs, and alerts you before invalid moves are committed.
          </p>
        </GlassCard>

        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            4-Stage Progressive Hints
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never get stuck again. Hints guide your attention step-by-step from general row/col scanning to candidate elimination and final placement.
          </p>
        </GlassCard>

        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
            <Pencil className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Smart Pencil Marks & Auto Notes
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Toggle pencil notes with a single keypress or enable auto notes to instantly view remaining valid candidates for every cell.
          </p>
        </GlassCard>

        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Performance Analytics
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Track win rate %, average time by difficulty, fastest times, total mistakes, and candidate placement accuracy with visual charts.
          </p>
        </GlassCard>

        <GlassCard glow>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Leaderboard & Badges
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Compete on Weekly and Monthly global leaderboards, earn XP, level up, and unlock achievements like Speed Master and Flawless Victory.
          </p>
        </GlassCard>
      </div>

      {/* 5 Difficulty Breakdown */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="font-display font-black text-2xl text-white">5 Precision Difficulty Tiers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { name: 'EASY', givens: '45 Givens', color: 'border-emerald-500/40 text-emerald-400' },
            { name: 'MEDIUM', givens: '37 Givens', color: 'border-brand-500/40 text-brand-400' },
            { name: 'HARD', givens: '31 Givens', color: 'border-amber-500/40 text-amber-400' },
            { name: 'EXPERT', givens: '27 Givens', color: 'border-violet-500/40 text-violet-400' },
            { name: 'EVIL', givens: '23 Givens', color: 'border-rose-500/40 text-rose-400' },
          ].map((d) => (
            <div key={d.name} className={`p-4 rounded-2xl bg-slate-900/60 border ${d.color} text-center space-y-1`}>
              <span className="font-display font-black text-base block">{d.name}</span>
              <span className="text-[11px] font-mono text-slate-400 block">{d.givens}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
