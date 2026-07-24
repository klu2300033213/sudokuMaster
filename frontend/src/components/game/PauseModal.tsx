import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Home, Clock, Trophy } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { Link } from 'react-router-dom';

export const PauseModal: React.FC = () => {
  const { isPaused, togglePause, restartGame, timerSeconds, difficulty, gameMode } = useGameStore();

  if (!isPaused) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl max-w-sm w-full border border-slate-700/80 shadow-2xl text-center space-y-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/40 mx-auto flex items-center justify-center text-brand-400">
            <Clock className="w-7 h-7" />
          </div>

          <div>
            <h3 className="font-display font-extrabold text-2xl text-slate-100">
              Game Paused
            </h3>
            <div className="flex items-center justify-center space-x-3 mt-2 font-mono text-sm text-slate-400">
              <span>{difficulty}</span>
              <span>•</span>
              <span>{gameMode} Mode</span>
              <span>•</span>
              <span className="text-brand-400 font-bold">{formatTime(timerSeconds)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={togglePause}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume Game</span>
            </button>

            <button
              onClick={() => {
                togglePause();
                restartGame();
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center space-x-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Restart Current Board</span>
            </button>

            <Link
              to="/dashboard"
              onClick={togglePause}
              className="w-full py-3 px-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 font-medium text-xs flex items-center justify-center space-x-2 border border-slate-800"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
