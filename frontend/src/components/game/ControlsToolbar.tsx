import React from 'react';
import { Undo2, Redo2, Eraser, Pencil, Lightbulb, Pause, Eye, EyeOff } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { useSettingsStore } from '../../store/useSettingsStore';

export const ControlsToolbar: React.FC = React.memo(() => {
  const {
    undo,
    redo,
    eraseCell,
    togglePencilMode,
    isPencilMode,
    history,
    redoStack,
    requestHint,
    togglePause,
    gameMode,
  } = useGameStore();

  const { showPencilNotes, toggleShowPencilNotes } = useSettingsStore();

  const baseBtnClass =
    'flex flex-col items-center justify-center p-2 rounded-xl border flex-1 text-[11px] font-bold transition-all active:scale-95 touch-manipulation shadow-sm focus:outline-none select-none';

  return (
    <div className="grid grid-cols-4 sm:flex items-center justify-center gap-1.5 sm:gap-2 max-w-[540px] w-full mx-auto mb-4 px-1 touch-manipulation">
      {/* Undo */}
      <button
        onClick={undo}
        disabled={history.length === 0}
        className={`${baseBtnClass} bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:bg-slate-100 dark:disabled:bg-slate-900 text-slate-400 dark:text-slate-500`}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="w-4 h-4 mb-1 text-brand-600 dark:text-brand-400" />
        <span>Undo</span>
      </button>

      {/* Redo */}
      <button
        onClick={redo}
        disabled={redoStack.length === 0}
        className={`${baseBtnClass} bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:bg-slate-100 dark:disabled:bg-slate-900 text-slate-400 dark:text-slate-500`}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="w-4 h-4 mb-1 text-indigo-600 dark:text-indigo-400" />
        <span>Redo</span>
      </button>

      {/* Erase */}
      <button
        onClick={eraseCell}
        className={`${baseBtnClass} bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700`}
        title="Erase cell (Backspace)"
      >
        <Eraser className="w-4 h-4 mb-1 text-rose-600 dark:text-rose-400" />
        <span>Erase</span>
      </button>

      {/* Pencil Notes Typing Mode */}
      <button
        onClick={togglePencilMode}
        className={`${baseBtnClass} ${
          isPencilMode
            ? 'bg-brand-500 text-white border-brand-400 shadow-md shadow-brand-500/30'
            : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
        }`}
        title="Toggle Pencil Typing Mode (N)"
      >
        <Pencil className="w-4 h-4 mb-1" />
        <span>{isPencilMode ? 'Note Mode' : 'Digit Mode'}</span>
      </button>

      {/* SHOW / HIDE SMALL NUMBERS TOGGLE BUTTON */}
      <button
        onClick={toggleShowPencilNotes}
        className={`${baseBtnClass} ${
          showPencilNotes
            ? 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 shadow-sm'
        }`}
        title={showPencilNotes ? 'Hide Small Numbers in boxes' : 'Show Small Numbers in boxes'}
      >
        {showPencilNotes ? (
          <Eye className="w-4 h-4 mb-1 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <EyeOff className="w-4 h-4 mb-1 text-amber-600 dark:text-amber-400" />
        )}
        <span>{showPencilNotes ? 'Hide Notes' : 'Show Notes'}</span>
      </button>

      {/* Progressive Hint Button */}
      {gameMode !== 'CHALLENGE' && (
        <button
          onClick={requestHint}
          className={`${baseBtnClass} bg-amber-500 hover:bg-amber-400 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20`}
          title="AI Progressive Hint"
        >
          <Lightbulb className="w-4 h-4 mb-1 text-slate-950 fill-slate-950" />
          <span>Hint</span>
        </button>
      )}

      {/* Pause */}
      <button
        onClick={togglePause}
        className={`${baseBtnClass} bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700`}
        title="Pause Game"
      >
        <Pause className="w-4 h-4 mb-1 text-slate-700 dark:text-slate-300" />
        <span>Pause</span>
      </button>
    </div>
  );
});
