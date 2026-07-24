import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Cell } from '../../types';
import { useSettingsStore } from '../../store/useSettingsStore';

interface CellComponentProps {
  cell: Cell;
  onSelect: (row: number, col: number) => void;
  isHintTarget?: boolean;
}

export const CellComponent: React.FC<CellComponentProps> = ({
  cell,
  onSelect,
  isHintTarget = false,
}) => {
  const { row, col, value, isGiven, isError, notes, isSelected, isSameNumber, isPeer } = cell;
  const { showPencilNotes } = useSettingsStore();

  // 3x3 block borders calculation
  const isRightThick = (col + 1) % 3 === 0 && col !== 8;
  const isBottomThick = (row + 1) % 3 === 0 && row !== 8;

  // Background styling calculation
  let bgClass = 'bg-slate-900/60 dark:bg-slate-900/60 hover:bg-slate-200/60 dark:hover:bg-slate-800/80';

  if (isSelected) {
    bgClass = 'bg-indigo-200/90 dark:bg-brand-500/35 ring-2 ring-brand-500 dark:ring-brand-400 z-10';
  } else if (isHintTarget) {
    bgClass = 'bg-amber-200/90 dark:bg-amber-500/40 ring-2 ring-amber-500 dark:ring-amber-400 animate-pulse z-10';
  } else if (isSameNumber) {
    bgClass = 'bg-indigo-100/90 dark:bg-indigo-500/35 ring-1 ring-indigo-400/80';
  } else if (isPeer) {
    bgClass = 'bg-slate-100/90 dark:bg-slate-800/70';
  }

  return (
    <div
      onClick={() => onSelect(row, col)}
      className={clsx(
        'sudoku-cell relative flex items-center justify-center border border-slate-300 dark:border-slate-800/80 text-center font-display cursor-pointer transition-colors duration-150 aspect-square select-none',
        isRightThick && 'border-right-thick',
        isBottomThick && 'border-bottom-thick',
        bgClass
      )}
    >
      {/* Digit Display */}
      {value !== 0 ? (
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{
            scale: isError ? [1, 1.15, 0.95, 1] : 1,
            x: isError ? [-4, 4, -4, 4, 0] : 0,
            opacity: 1,
          }}
          transition={{ duration: 0.25 }}
          className={clsx(
            'text-xl sm:text-2xl lg:text-3xl',
            isGiven
              ? 'text-slate-900 dark:text-slate-100 font-black'
              : isError
              ? 'text-rose-600 dark:text-red-400 font-black drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]'
              : 'text-brand-600 dark:text-brand-400 font-extrabold'
          )}
        >
          {value}
        </motion.span>
      ) : showPencilNotes && notes.length > 0 ? (
        /* 3x3 Mini Pencil Marks Grid */
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 text-[9px] sm:text-[10px] leading-none text-slate-700 dark:text-slate-300 font-mono select-none pointer-events-none font-bold">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div key={n} className="flex items-center justify-center">
              {notes.includes(n) ? <span className="text-indigo-600 dark:text-brand-300 font-extrabold">{n}</span> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
