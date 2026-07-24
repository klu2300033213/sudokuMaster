import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const Numpad: React.FC = React.memo(() => {
  const { grid, inputNumber, isPencilMode } = useGameStore();

  // Count instances of each number (1-9) in grid
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = grid[r]?.[c]?.value;
      if (val >= 1 && val <= 9 && !grid[r][c].isError) {
        counts[val] = (counts[val] || 0) + 1;
      }
    }
  }

  return (
    <div className="grid grid-cols-9 gap-1 sm:gap-2 max-w-[540px] w-full mx-auto my-4 px-1 touch-manipulation">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
        const remaining = 9 - (counts[num] || 0);
        const isCompleted = remaining <= 0;
        const isDisabled = !isPencilMode && isCompleted;

        return (
          <button
            key={num}
            onClick={() => (!isDisabled || isPencilMode) && inputNumber(num)}
            disabled={isDisabled}
            className={`relative flex flex-col items-center justify-center py-2 sm:py-3.5 rounded-xl font-display font-bold transition-all active:scale-95 touch-manipulation shadow-sm select-none ${
              isDisabled
                ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-50'
                : isPencilMode
                ? 'bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-700 dark:text-brand-300 border border-indigo-200 dark:border-brand-500/40 font-black'
                : 'bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 hover:bg-brand-500 hover:text-white dark:hover:from-brand-600 dark:hover:to-indigo-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-brand-400 font-black'
            }`}
          >
            <span className="text-lg sm:text-2xl font-black leading-none">{num}</span>
            <span
              className={`text-[9px] font-mono mt-1 ${
                isDisabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400 font-bold'
              }`}
            >
              {remaining > 0 ? `${remaining} left` : '✓'}
            </span>
          </button>
        );
      })}
    </div>
  );
});
