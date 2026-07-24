import React, { useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CellComponent } from './CellComponent';

export const SudokuBoard: React.FC = React.memo(() => {
  const { grid, selectCell, inputNumber, eraseCell, undo, redo, togglePencilMode, selectedCell, activeHintCell } =
    useGameStore();

  const handleSelectCell = useCallback(
    (row: number, col: number) => {
      selectCell(row, col);
    },
    [selectCell]
  );

  // Keyboard navigation & digit input listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (!selectedCell) return;
      const { row, col } = selectedCell;

      if (e.key >= '1' && e.key <= '9') {
        inputNumber(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        eraseCell();
      } else if (e.key === 'ArrowUp' && row > 0) {
        selectCell(row - 1, col);
      } else if (e.key === 'ArrowDown' && row < 8) {
        selectCell(row + 1, col);
      } else if (e.key === 'ArrowLeft' && col > 0) {
        selectCell(row, col - 1);
      } else if (e.key === 'ArrowRight' && col < 8) {
        selectCell(row, col + 1);
      } else if (e.key === 'n' || e.key === 'N') {
        togglePencilMode();
      } else if (e.ctrlKey && e.key === 'z') {
        undo();
      } else if (e.ctrlKey && e.key === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, selectCell, inputNumber, eraseCell, undo, redo, togglePencilMode]);

  if (grid.length === 0) return null;

  return (
    <div className="glass-panel p-1.5 sm:p-3 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700/60 max-w-[98vw] xs:max-w-[480px] sm:max-w-[540px] w-full mx-auto touch-manipulation">
      <div className="grid grid-cols-9 border-2 border-slate-700/80 rounded-xl overflow-hidden bg-slate-950/80">
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isHintTarget =
              activeHintCell !== null && activeHintCell.row === rIdx && activeHintCell.col === cIdx;
            return (
              <CellComponent
                key={`${rIdx}-${cIdx}`}
                cell={cell}
                onSelect={handleSelectCell}
                isHintTarget={isHintTarget}
              />
            );
          })
        )}
      </div>
    </div>
  );
});
