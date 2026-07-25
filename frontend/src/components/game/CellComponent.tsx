import React from 'react';
import { clsx } from 'clsx';
import { Cell } from '../../types';
import { useSettingsStore } from '../../store/useSettingsStore';

interface CellComponentProps {
  cell: Cell;
  onSelect: (row: number, col: number) => void;
  isHintTarget?: boolean;
}

export const CellComponent = React.memo<CellComponentProps>(
  ({ cell, onSelect, isHintTarget = false }) => {
    const { row, col, value, isGiven, isError, notes, isSelected, isSameNumber, isPeer } = cell;
    const { showPencilNotes } = useSettingsStore();

    // 3x3 block borders calculation
    const isRightThick = (col + 1) % 3 === 0 && col !== 8;
    const isBottomThick = (row + 1) % 3 === 0 && row !== 8;

    // Background styling calculation - Solid non-transparent colors to prevent Android GPU texture bleeding
    let bgClass = 'bg-slate-900 dark:bg-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800';

    if (isSelected) {
      bgClass = 'bg-brand-600 dark:bg-brand-600 ring-2 ring-brand-400 text-white z-10';
    } else if (isHintTarget) {
      bgClass = 'bg-amber-600 dark:bg-amber-600 ring-2 ring-amber-400 text-white animate-pulse z-10';
    } else if (isSameNumber) {
      bgClass = 'bg-indigo-800 dark:bg-indigo-900 ring-1 ring-indigo-500';
    } else if (isPeer) {
      bgClass = 'bg-slate-800/90 dark:bg-slate-800/90';
    }

    return (
      <div
        onClick={() => onSelect(row, col)}
        className={clsx(
          'sudoku-cell relative flex items-center justify-center border border-slate-700/70 text-center font-display cursor-pointer aspect-square select-none touch-manipulation',
          isRightThick && 'border-right-thick',
          isBottomThick && 'border-bottom-thick',
          bgClass
        )}
      >
        {/* Digit Display */}
        {value !== 0 ? (
          <span
            className={clsx(
              'text-xl sm:text-2xl lg:text-3xl leading-none',
              isGiven
                ? 'text-slate-100 dark:text-slate-100 font-black'
                : isError
                ? 'text-rose-400 dark:text-red-400 font-black animate-shake'
                : 'text-brand-300 dark:text-brand-300 font-extrabold'
            )}
          >
            {value}
          </span>
        ) : showPencilNotes && notes.length > 0 ? (
          /* 3x3 Mini Pencil Marks Grid */
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 text-[9px] sm:text-[10px] leading-none text-slate-300 font-mono select-none pointer-events-none font-bold">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="flex items-center justify-center">
                {notes.includes(n) ? <span className="text-brand-300 font-extrabold">{n}</span> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const p = prevProps.cell;
    const n = nextProps.cell;
    const notesEqual =
      p.notes.length === n.notes.length &&
      p.notes.every((val, idx) => val === n.notes[idx]);

    return (
      p.value === n.value &&
      p.isSelected === n.isSelected &&
      p.isPeer === n.isPeer &&
      p.isSameNumber === n.isSameNumber &&
      p.isError === n.isError &&
      p.isGiven === n.isGiven &&
      prevProps.isHintTarget === nextProps.isHintTarget &&
      notesEqual
    );
  }
);
