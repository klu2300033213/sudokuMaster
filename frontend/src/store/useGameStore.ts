import { create } from 'zustand';
import { Difficulty, GameMode, Grid, Move, ProgressiveHint, TutorExplanation } from '../types';
import { SudokuEngine } from '../utils/sudokuEngine';
import { soundManager } from '../utils/audio';
import { useSettingsStore } from './useSettingsStore';

interface GameState {
  // Game Setup
  difficulty: Difficulty;
  gameMode: GameMode;
  isGameActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  isGameOver: boolean;

  // Board Data
  grid: Grid;
  initialBoard: number[][];
  solution: number[][];
  selectedCell: { row: number; col: number } | null;

  // Game Engine Tools
  isPencilMode: boolean;
  history: Move[];
  redoStack: Move[];
  timerSeconds: number;
  mistakesCount: number;
  hintsUsedCount: number;

  // AI & Modes
  currentHint: ProgressiveHint | null;
  hintStep: number;
  activeHintCell: { row: number; col: number } | null;
  tutorExplanation: TutorExplanation | null;

  // Actions
  startNewGame: (difficulty?: Difficulty, mode?: GameMode) => void;
  selectCell: (row: number, col: number) => void;
  inputNumber: (num: number) => void;
  eraseCell: () => void;
  togglePencilMode: () => void;
  undo: () => void;
  redo: () => void;
  restartGame: () => void;
  togglePause: () => void;
  requestHint: () => void;
  tickTimer: () => void;
  clearTutorExplanation: () => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
  difficulty: 'MEDIUM',
  gameMode: 'TEACHER',
  isGameActive: false,
  isPaused: false,
  isCompleted: false,
  isGameOver: false,

  grid: [],
  initialBoard: [],
  solution: [],
  selectedCell: null,

  isPencilMode: false,
  history: [],
  redoStack: [],
  timerSeconds: 0,
  mistakesCount: 0,
  hintsUsedCount: 0,

  currentHint: null,
  hintStep: 0,
  activeHintCell: null,
  tutorExplanation: null,

  startNewGame: (difficulty = get().difficulty, mode = get().gameMode) => {
    const { initialBoard, solution } = SudokuEngine.generatePuzzle(difficulty);
    const autoNotes = SudokuEngine.calculateAutoNotes(initialBoard);

    const grid: Grid = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => ({
        row: r,
        col: c,
        value: initialBoard[r][c],
        solutionValue: solution[r][c],
        isGiven: initialBoard[r][c] !== 0,
        isError: false,
        notes: initialBoard[r][c] === 0 ? autoNotes[r][c] : [],
        isSelected: false,
        isHighlighted: false,
        isSameNumber: false,
        isPeer: false,
      }))
    );

    const initialTutorTip = mode === 'TEACHER' ? SudokuEngine.getTeacherTip(initialBoard, solution) : null;

    set({
      difficulty,
      gameMode: mode,
      isGameActive: true,
      isPaused: false,
      isCompleted: false,
      isGameOver: false,
      grid,
      initialBoard,
      solution,
      selectedCell: { row: 0, col: 0 },
      isPencilMode: false,
      history: [],
      redoStack: [],
      timerSeconds: 0,
      mistakesCount: 0,
      hintsUsedCount: 0,
      currentHint: null,
      hintStep: 0,
      activeHintCell: null,
      tutorExplanation: initialTutorTip,
    });

    // Select (0,0) by default
    get().selectCell(0, 0);
  },

  selectCell: (row, col) => {
    soundManager.playClick();
    const currentGrid = get().grid;
    if (currentGrid.length === 0) return;

    const targetCell = currentGrid[row][col];
    const selectedVal = targetCell.value;

    const newGrid = currentGrid.map((r) =>
      r.map((cell) => {
        const isSel = cell.row === row && cell.col === col;
        const isPeer = cell.row === row || cell.col === col ||
          (Math.floor(cell.row / 3) === Math.floor(row / 3) && Math.floor(cell.col / 3) === Math.floor(col / 3));
        const isSameNum = selectedVal !== 0 && cell.value === selectedVal;

        return {
          ...cell,
          isSelected: isSel,
          isPeer,
          isSameNumber: isSameNum,
          isHighlighted: isSel || isPeer || isSameNum,
        };
      })
    );

    set({
      grid: newGrid,
      selectedCell: { row, col },
    });
  },

  inputNumber: (num) => {
    const { selectedCell, grid, isPencilMode, gameMode, solution, history, mistakesCount, isCompleted } = get();
    if (!selectedCell || isCompleted) return;
    const { row, col } = selectedCell;
    const cell = grid[row][col];

    if (cell.isGiven) return; // Cannot edit givens

    if (isPencilMode) {
      soundManager.playNote();
      const currentNotes = [...cell.notes];
      const newNotes = currentNotes.includes(num)
        ? currentNotes.filter((n) => n !== num)
        : [...currentNotes, num].sort((a, b) => a - b);

      // Ensure notes are visible when typing notes
      useSettingsStore.setState({ showPencilNotes: true });

      const newGrid = grid.map((r) =>
        r.map((c) => (c.row === row && c.col === col ? { ...c, notes: newNotes } : c))
      );

      const move: Move = {
        row,
        col,
        prevValue: cell.value,
        newValue: cell.value,
        prevNotes: cell.notes,
        newNotes,
        timestamp: Date.now(),
      };

      set({
        grid: newGrid,
        history: [...history, move],
        redoStack: [],
      });
      return;
    }

    // Direct digit entry mode
    const boardMatrix = grid.map((r) => r.map((c) => c.value));
    const isCorrect = num === cell.solutionValue;

    if (!isCorrect) {
      soundManager.playError();
    } else {
      soundManager.playPlaceNumber();
    }

    // Teacher mode explanation
    let tutorExp: TutorExplanation | null = null;
    if (gameMode === 'TEACHER') {
      tutorExp = SudokuEngine.analyzeMove(boardMatrix, solution, row, col, num);
    }

    const newMistakes = !isCorrect ? mistakesCount + 1 : mistakesCount;

    // Update Grid
    const newGrid = grid.map((r) =>
      r.map((c) => {
        if (c.row === row && c.col === col) {
          return {
            ...c,
            value: num,
            isError: !isCorrect,
            notes: [],
          };
        }
        // If correct placement, remove this number from notes of peers
        if (isCorrect && (c.row === row || c.col === col || (Math.floor(c.row / 3) === Math.floor(row / 3) && Math.floor(c.col / 3) === Math.floor(col / 3)))) {
          return {
            ...c,
            notes: c.notes.filter((n) => n !== num),
          };
        }
        return c;
      })
    );

    const move: Move = {
      row,
      col,
      prevValue: cell.value,
      newValue: num,
      prevNotes: cell.notes,
      newNotes: [],
      timestamp: Date.now(),
    };

    // Check completion condition
    let filledCount = 0;
    let correctCount = 0;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newGrid[r][c].value !== 0) {
          filledCount++;
          if (newGrid[r][c].value === newGrid[r][c].solutionValue) {
            correctCount++;
          }
        }
      }
    }

    const completed = filledCount === 81 && correctCount === 81;

    if (completed) {
      soundManager.playVictory();
    }

    set({
      grid: newGrid,
      history: [...history, move],
      redoStack: [],
      mistakesCount: newMistakes,
      isCompleted: completed,
      tutorExplanation: tutorExp,
    });

    // Re-evaluate highlights for active selection
    get().selectCell(row, col);
  },

  eraseCell: () => {
    const { selectedCell, grid, history } = get();
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const cell = grid[row][col];

    if (cell.isGiven || (cell.value === 0 && cell.notes.length === 0)) return;

    soundManager.playClick();

    const newGrid = grid.map((r) =>
      r.map((c) =>
        c.row === row && c.col === col
          ? { ...c, value: 0, isError: false, notes: [] }
          : c
      )
    );

    const move: Move = {
      row,
      col,
      prevValue: cell.value,
      newValue: 0,
      prevNotes: cell.notes,
      newNotes: [],
      timestamp: Date.now(),
    };

    set({
      grid: newGrid,
      history: [...history, move],
      redoStack: [],
    });

    get().selectCell(row, col);
  },

  togglePencilMode: () => {
    const next = !get().isPencilMode;
    set({ isPencilMode: next });
    if (next) {
      useSettingsStore.setState({ showPencilNotes: true });
    }
  },

  undo: () => {
    const { history, redoStack, grid } = get();
    if (history.length === 0) return;

    soundManager.playClick();
    const lastMove = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    const newGrid = grid.map((r) =>
      r.map((c) =>
        c.row === lastMove.row && c.col === lastMove.col
          ? {
              ...c,
              value: lastMove.prevValue,
              notes: lastMove.prevNotes,
              isError: lastMove.prevValue !== 0 && lastMove.prevValue !== c.solutionValue,
            }
          : c
      )
    );

    set({
      grid: newGrid,
      history: newHistory,
      redoStack: [...redoStack, lastMove],
    });

    get().selectCell(lastMove.row, lastMove.col);
  },

  redo: () => {
    const { redoStack, history, grid } = get();
    if (redoStack.length === 0) return;

    soundManager.playClick();
    const nextMove = redoStack[redoStack.length - 1];
    const newRedo = redoStack.slice(0, -1);

    const newGrid = grid.map((r) =>
      r.map((c) =>
        c.row === nextMove.row && c.col === nextMove.col
          ? {
              ...c,
              value: nextMove.newValue,
              notes: nextMove.newNotes,
              isError: nextMove.newValue !== 0 && nextMove.newValue !== c.solutionValue,
            }
          : c
      )
    );

    set({
      grid: newGrid,
      history: [...history, nextMove],
      redoStack: newRedo,
    });

    get().selectCell(nextMove.row, nextMove.col);
  },

  restartGame: () => {
    const { initialBoard, solution } = get();
    if (initialBoard.length === 0) return;

    const autoNotes = SudokuEngine.calculateAutoNotes(initialBoard);

    const grid: Grid = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => ({
        row: r,
        col: c,
        value: initialBoard[r][c],
        solutionValue: solution[r][c],
        isGiven: initialBoard[r][c] !== 0,
        isError: false,
        notes: initialBoard[r][c] === 0 ? autoNotes[r][c] : [],
        isSelected: false,
        isHighlighted: false,
        isSameNumber: false,
        isPeer: false,
      }))
    );

    set({
      grid,
      isCompleted: false,
      isGameOver: false,
      history: [],
      redoStack: [],
      timerSeconds: 0,
      mistakesCount: 0,
      hintsUsedCount: 0,
      currentHint: null,
      tutorExplanation: null,
    });

    get().selectCell(0, 0);
  },

  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),

  requestHint: () => {
    const { grid, solution, selectedCell, hintStep, hintsUsedCount } = get();
    if (grid.length === 0) return;

    soundManager.playHint();
    const boardMatrix = grid.map((r) => r.map((c) => c.value));
    const { hints, cell } = SudokuEngine.generateProgressiveHint(boardMatrix, solution, selectedCell);

    const nextStep = (hintStep % 4) + 1;
    const hintObj = hints.find((h) => h.level === nextStep) || hints[0];

    // If level 4 hint, fill cell automatically
    if (nextStep === 4 && hintObj.targetValue) {
      get().selectCell(cell.row, cell.col);
      get().inputNumber(hintObj.targetValue);
    }

    set({
      currentHint: hintObj,
      hintStep: nextStep,
      activeHintCell: cell,
      hintsUsedCount: hintsUsedCount + 1,
    });
  },

  tickTimer: () => {
    const { isGameActive, isPaused, isCompleted, timerSeconds } = get();
    if (isGameActive && !isPaused && !isCompleted) {
      set({ timerSeconds: timerSeconds + 1 });
    }
  },

  clearTutorExplanation: () => set({ tutorExplanation: null }),
}));
