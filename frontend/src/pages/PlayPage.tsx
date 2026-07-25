import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, Bot, Lightbulb, Zap, RotateCcw, Pause } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { SudokuBoard } from '../components/game/SudokuBoard';
import { Numpad } from '../components/game/Numpad';
import { ControlsToolbar } from '../components/game/ControlsToolbar';
import { TutorPanel } from '../components/game/TutorPanel';
import { HintModal } from '../components/game/HintModal';
import { PauseModal } from '../components/game/PauseModal';
import { VictoryModal } from '../components/game/VictoryModal';
import { Difficulty, GameMode } from '../types';
import { soundManager } from '../utils/audio';

export const PlayPage: React.FC = () => {
  const {
    isGameActive,
    startNewGame,
    difficulty,
    gameMode,
    timerSeconds,
    tickTimer,
    mistakesCount,
    isPaused,
    isCompleted,
    restartGame,
    togglePause,
  } = useGameStore();

  // Initialize new game if inactive
  useEffect(() => {
    if (!isGameActive) {
      startNewGame('MEDIUM', 'TEACHER');
    }
  }, [isGameActive]);

  // Game Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimer]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD', 'EXPERT', 'EVIL'];
  const modes: { mode: GameMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'TEACHER', label: 'Teacher AI', icon: <Bot className="w-3.5 h-3.5" /> },
    { mode: 'HINT', label: 'Hint Mode', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { mode: 'CHALLENGE', label: 'Challenge Mode', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-3 sm:space-y-6">
      {/* Top Header: Difficulty & Game Mode Selectors */}
      <div className="p-3.5 rounded-2xl border border-slate-700/80 bg-slate-900 dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
        {/* Difficulty Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-full pb-1 md:pb-0">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => {
                soundManager.playClick();
                startNewGame(diff, gameMode);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                difficulty === diff
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {modes.map((m) => (
            <button
              key={m.mode}
              onClick={() => {
                soundManager.playClick();
                startNewGame(difficulty, m.mode);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                gameMode === m.mode
                  ? 'bg-slate-800 text-brand-300 border border-brand-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Game Status Bar: Timer, Mistakes, Controls */}
      <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-slate-300">
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
          <Clock className="w-4 h-4 text-brand-400" />
          <span className="font-mono font-black text-slate-100">{formatTime(timerSeconds)}</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
          <AlertCircle className={`w-4 h-4 ${mistakesCount > 0 ? 'text-rose-400' : 'text-slate-400'}`} />
          <span className="font-mono font-bold text-slate-300">
            Mistakes: <strong className={mistakesCount > 0 ? 'text-rose-400' : 'text-slate-100'}>{mistakesCount}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={restartGame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shadow-sm"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={togglePause}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shadow-sm"
            title="Pause Game"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live AI Tutor Panel (Teacher Mode) */}
      <TutorPanel />

      {/* Flagship Sudoku Board */}
      <SudokuBoard />

      {/* Controls Toolbar */}
      <ControlsToolbar />

      {/* Digit Selector Numpad */}
      <Numpad />

      {/* Game State Modals */}
      <HintModal />
      <PauseModal />
      <VictoryModal />
    </div>
  );
};
