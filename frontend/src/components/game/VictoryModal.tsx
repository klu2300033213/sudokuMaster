import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Clock, AlertTriangle, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

export const VictoryModal: React.FC = () => {
  const { isCompleted, timerSeconds, mistakesCount, hintsUsedCount, difficulty, startNewGame } =
    useGameStore();
  const { addXP, updateUserStats, userStats } = useAuthStore();

  useEffect(() => {
    if (isCompleted) {
      // Fire confetti burst
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
      });

      // Calculate XP bonus
      const diffMultiplier = { EASY: 100, MEDIUM: 200, HARD: 350, EXPERT: 500, EVIL: 750 };
      const xpGained = diffMultiplier[difficulty] + Math.max(0, 150 - mistakesCount * 25);
      addXP(xpGained);

      // Update User Statistics
      const newGamesPlayed = userStats.gamesPlayed + 1;
      const newGamesWon = userStats.gamesWon + 1;
      const newStreak = userStats.currentStreak + 1;
      const newBestStreak = Math.max(userStats.bestStreak, newStreak);
      const isFastest = userStats.fastestTimeSeconds === 0 || timerSeconds < userStats.fastestTimeSeconds;

      updateUserStats({
        gamesPlayed: newGamesPlayed,
        gamesWon: newGamesWon,
        winRate: parseFloat(((newGamesWon / newGamesPlayed) * 100).toFixed(1)),
        totalTimeSeconds: userStats.totalTimeSeconds + timerSeconds,
        fastestTimeSeconds: isFastest ? timerSeconds : userStats.fastestTimeSeconds,
        hintsUsedCount: userStats.hintsUsedCount + hintsUsedCount,
        totalMistakes: userStats.totalMistakes + mistakesCount,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
      });
    }
  }, [isCompleted]);

  if (!isCompleted) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const xpAmount = { EASY: 150, MEDIUM: 250, HARD: 400, EXPERT: 600, EVIL: 900 }[difficulty];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full border border-brand-500/40 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-500/30 rounded-full blur-3xl" />

          {/* Trophy Header Icon */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 mb-4"
          >
            <Trophy className="w-10 h-10 fill-slate-950" />
          </motion.div>

          <h2 className="font-display font-black text-3xl text-white tracking-tight">
            PUZZLE SOLVED!
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Fantastic job conquering the <span className="text-brand-400 font-bold">{difficulty}</span> puzzle!
          </p>

          {/* XP Reward Badge */}
          <div className="my-5 p-3 rounded-2xl bg-gradient-to-r from-brand-500/20 to-violet-500/20 border border-brand-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">XP Earned:</span>
            </div>
            <span className="font-mono font-black text-xl text-brand-300">+{xpAmount} XP</span>
          </div>

          {/* Match Statistics Grid */}
          <div className="grid grid-cols-3 gap-2 my-4 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Clock className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Time</span>
              <span className="font-mono font-bold text-xs text-slate-100">{formatTime(timerSeconds)}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <AlertTriangle className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Mistakes</span>
              <span className="font-mono font-bold text-xs text-slate-100">{mistakesCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Hints</span>
              <span className="font-mono font-bold text-xs text-slate-100">{hintsUsedCount}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => startNewGame(difficulty)}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Next Puzzle</span>
            </button>
            <Link
              to="/dashboard"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center space-x-2 border border-slate-700 block"
            >
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
