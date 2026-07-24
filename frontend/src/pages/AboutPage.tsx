import React from 'react';
import { Bot, Brain, Code, Cpu, Sparkles, Target, Zap } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          About Sudoku Master AI
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Transforming logical puzzle solving into an interactive, AI-enhanced mastery experience.
        </p>
      </div>

      {/* Vision Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-brand-400" />
            <h3 className="font-display font-bold text-xl text-white">Our Teaching Philosophy</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed space-y-2">
            Traditional Sudoku apps only check if a move is right or wrong without explaining <em>why</em>. Sudoku Master AI breaks down complex logical deductions into step-by-step insights, training your brain to recognize advanced patterns naturally.
          </p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Cpu className="w-6 h-6 text-violet-400" />
            <h3 className="font-display font-bold text-xl text-white">The Algorithmic Core</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our engine combines randomized constraint satisfaction with recursive backtracking solvers to construct guaranteed unique puzzles. Every hint is dynamically evaluated on the fly.
          </p>
        </GlassCard>
      </div>

      {/* Techniques Breakdown Guide */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="font-display font-extrabold text-2xl text-white flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span>Sudoku Solving Techniques Guide</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-brand-300">1. Naked Single</h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Beginner</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an empty cell has only one possible candidate number remaining after eliminating all numbers in its row, column, and 3x3 box.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-brand-300">2. Hidden Single</h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Beginner</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a specific number can only fit in one single empty cell within a given row, column, or 3x3 box, even if that cell has other candidate notes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-brand-300">3. Naked Pair</h4>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Intermediate</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When two cells in the same row/col/box contain the exact same pair of candidates. Those numbers can be safely eliminated from all other cells in that group.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-brand-300">4. Pointing Pairs</h4>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/30">Advanced</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a candidate candidate within a 3x3 box is confined to a single row or column, that candidate can be eliminated from the rest of that row/col outside the box.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
