import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  BookOpen,
  Bot,
  Lightbulb,
  Zap,
  Trophy,
  BarChart3,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-16 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The Next-Gen Sudoku Platform Powered by AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]"
            >
              Master Sudoku with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-violet-400">
                Real-Time AI Tutoring
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Experience Sudoku like never before. Combining the thrill of competitive chess, the gamification of Duolingo, and the elegance of modern software design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <Link
                to="/play"
                onClick={() => soundManager.playClick()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-base shadow-xl shadow-brand-500/30 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Play Now</span>
              </Link>

              <Link
                to="/features"
                onClick={() => soundManager.playClick()}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel hover:bg-white/10 text-slate-200 font-semibold text-base flex items-center justify-center space-x-2 border border-slate-700 transition-all hover:border-slate-500"
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Explore Features</span>
              </Link>
            </motion.div>

            {/* Micro Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-center lg:text-left">
              <div>
                <span className="font-display font-extrabold text-2xl text-white">500K+</span>
                <p className="text-xs text-slate-400">Puzzles Solved</p>
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-brand-400">5 Levels</span>
                <p className="text-xs text-slate-400">Easy to Evil</p>
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-emerald-400">3 Modes</span>
                <p className="text-xs text-slate-400">Teacher, Hint, Challenge</p>
              </div>
            </div>
          </div>

          {/* Right Hero - Interactive Animated Sudoku Grid Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel p-4 rounded-3xl border border-slate-700/80 shadow-2xl shadow-indigo-950/50 relative overflow-hidden">
              {/* Floating AI Tutor Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 z-20 glass-card px-4 py-2.5 rounded-2xl border border-brand-500/40 shadow-xl flex items-center space-x-2 bg-slate-900/90"
              >
                <Bot className="w-5 h-5 text-brand-400" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">AI Tutor</span>
                  <span className="text-xs font-bold text-slate-100">Naked Single Detected!</span>
                </div>
              </motion.div>

              {/* Grid Preview */}
              <div className="grid grid-cols-9 gap-1 p-2 bg-slate-950/90 rounded-2xl border border-slate-800">
                {[
                  [5, 3, 0, 0, 7, 0, 0, 0, 0],
                  [6, 0, 0, 1, 9, 5, 0, 0, 0],
                  [0, 9, 8, 0, 0, 0, 0, 6, 0],
                  [8, 0, 0, 0, 6, 0, 0, 0, 3],
                  [4, 0, 0, 8, 0, 3, 0, 0, 1],
                  [7, 0, 0, 0, 2, 0, 0, 0, 6],
                  [0, 6, 0, 0, 0, 0, 2, 8, 0],
                  [0, 0, 0, 4, 1, 9, 0, 0, 5],
                  [0, 0, 0, 0, 8, 0, 0, 7, 9],
                ].map((row, r) =>
                  row.map((val, c) => {
                    const isSpecial = r === 2 && c === 0;
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`aspect-square rounded-md flex items-center justify-center font-display font-extrabold text-sm sm:text-base ${
                          isSpecial
                            ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400 animate-pulse'
                            : val !== 0
                            ? 'bg-slate-900 text-slate-200 border border-slate-800'
                            : 'bg-slate-950 border border-slate-800/40 text-slate-600'
                        }`}
                      >
                        {isSpecial ? '4' : val !== 0 ? val : ''}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THREE GAME MODES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
            Three Tailored Game Modes
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you want a friendly tutor, progressive hints, or hardcore timed challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Teacher Mode */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel p-8 rounded-3xl border border-brand-500/30 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">1. Teacher Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Acts like an interactive tutor. Automatically explains every move rationale, warns before mistakes occur, highlights Naked/Hidden Singles, and tracks your learning progress.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-brand-400 font-semibold">
              <span>Beginner to Intermediate</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Hint Mode */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">2. Hint Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No automatic interruptions. Press Hint when stuck to receive progressive 4-step hints: Row focus → Column focus → Candidate breakdown → Value placement.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Intermediate to Advanced</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Challenge Mode */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">3. Challenge Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hardcore speed solver mode. No hints, no explanations, no auto pencil notes. Strictly timed with mistake limits. Everything depends on pure raw skill.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-rose-400 font-semibold">
              <span>Grandmasters & Competitors</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Loved by Solvers Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'The AI Teacher mode helped me understand X-Wing and Pointing Pairs in less than a day. Absolutely game-changing!',
              author: 'Sophia Chen',
              role: 'Competitive Sudoku Player',
              rating: 5,
            },
            {
              quote: 'The UI feels as smooth as Chess.com. Progressive hints are brilliant when training for speedsolving competitions.',
              author: 'Marcus Vance',
              role: 'Logic Puzzle Grandmaster',
              rating: 5,
            },
            {
              quote: 'Finally a Sudoku app that looks modern, records detailed statistics, and gamifies learning with streaks and XP!',
              author: 'Elena Rostova',
              role: 'Mathematics Educator',
              rating: 5,
            },
          ].map((t, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="pt-4 border-t border-slate-800 flex flex-col">
                <span className="font-bold text-sm text-slate-100">{t.author}</span>
                <span className="text-[10px] text-slate-400 font-mono">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
