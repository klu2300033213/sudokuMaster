import { Difficulty, Cell, Grid, ProgressiveHint, TutorExplanation } from '../types';

export class SudokuEngine {
  // Check if placing num at board[row][col] is valid
  public static isValid(board: number[][], row: number, col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num && i !== col) return false;
      if (board[i][col] === num && i !== row) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const curR = startRow + r;
        const curC = startCol + c;
        if (board[curR][curC] === num && (curR !== row || curC !== col)) return false;
      }
    }
    return true;
  }

  // Backtracking solver
  public static solve(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (const num of numbers) {
            if (this.isValid(board, row, col, num)) {
              board[row][col] = num;
              if (this.solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  // Count solutions (to guarantee uniqueness)
  public static countSolutions(board: number[][], count = { value: 0 }): number {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
              board[row][col] = num;
              this.countSolutions(board, count);
              board[row][col] = 0;
              if (count.value >= 2) return count.value;
            }
          }
          return count.value;
        }
      }
    }
    count.value++;
    return count.value;
  }

  // Generate full valid Sudoku solution grid
  public static generateFullGrid(): number[][] {
    const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    
    const fillDiagonalBoxes = (g: number[][]) => {
      for (let box = 0; box < 9; box += 3) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        let idx = 0;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            g[box + r][box + c] = nums[idx++];
          }
        }
      }
    };

    fillDiagonalBoxes(grid);
    this.solve(grid);
    return grid;
  }

  // Generate puzzle givens based on difficulty
  public static generatePuzzle(difficulty: Difficulty): { initialBoard: number[][]; solution: number[][] } {
    const solution = this.generateFullGrid();
    const puzzle = solution.map(row => [...row]);

    // Determine target givens
    let removeCount = 40;
    switch (difficulty) {
      case 'EASY':
        removeCount = 36; // ~45 givens
        break;
      case 'MEDIUM':
        removeCount = 44; // ~37 givens
        break;
      case 'HARD':
        removeCount = 50; // ~31 givens
        break;
      case 'EXPERT':
        removeCount = 54; // ~27 givens
        break;
      case 'EVIL':
        removeCount = 58; // ~23 givens
        break;
    }

    const positions: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        positions.push([r, c]);
      }
    }
    positions.sort(() => Math.random() - 0.5);

    let removed = 0;
    for (const [r, c] of positions) {
      if (removed >= removeCount) break;
      const backup = puzzle[r][c];
      puzzle[r][c] = 0;

      // Verify unique solution
      const boardCopy = puzzle.map(row => [...row]);
      const solCount = this.countSolutions(boardCopy, { value: 0 });

      if (solCount !== 1) {
        puzzle[r][c] = backup; // Restore if not unique
      } else {
        removed++;
      }
    }

    return { initialBoard: puzzle, solution };
  }

  // Get candidate list for empty cell
  public static getCandidates(board: number[][], row: number, col: number): number[] {
    if (board[row][col] !== 0) return [];
    const candidates: number[] = [];
    for (let num = 1; num <= 9; num++) {
      if (this.isValid(board, row, col, num)) {
        candidates.push(num);
      }
    }
    return candidates;
  }

  // Calculate all candidate pencil marks for empty cells
  public static calculateAutoNotes(board: number[][]): number[][][] {
    const notesGrid: number[][][] = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => [])
    );

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          notesGrid[r][c] = this.getCandidates(board, r, c);
        }
      }
    }
    return notesGrid;
  }

  // Generate Progressive Hints (4 steps)
  public static generateProgressiveHint(
    currentBoard: number[][],
    solution: number[][],
    selectedCell?: { row: number; col: number } | null
  ): { hints: ProgressiveHint[]; cell: { row: number; col: number } } {
    let targetRow = -1;
    let targetCol = -1;

    // Favor selected empty cell if valid
    if (selectedCell && currentBoard[selectedCell.row][selectedCell.col] === 0) {
      targetRow = selectedCell.row;
      targetCol = selectedCell.col;
    } else {
      // Find cell with fewest candidates (Naked Single or simplest cell)
      let minCandidates = 10;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (currentBoard[r][c] === 0) {
            const candidates = this.getCandidates(currentBoard, r, c);
            if (candidates.length > 0 && candidates.length < minCandidates) {
              minCandidates = candidates.length;
              targetRow = r;
              targetCol = c;
            }
          }
        }
      }
    }

    if (targetRow === -1) {
      // Fallback first empty cell
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (currentBoard[r][c] === 0) {
            targetRow = r;
            targetCol = c;
            break;
          }
        }
        if (targetRow !== -1) break;
      }
    }

    const val = solution[targetRow][targetCol];
    const candidates = this.getCandidates(currentBoard, targetRow, targetCol);
    const isNakedSingle = candidates.length === 1;
    const boxNum = Math.floor(targetRow / 3) * 3 + Math.floor(targetCol / 3) + 1;

    const hints: ProgressiveHint[] = [
      {
        level: 1,
        title: 'Focus Area',
        description: `Look closely at Row ${targetRow + 1} and Box ${boxNum}. Key numbers are constrained here.`,
        targetRow,
        targetCol,
      },
      {
        level: 2,
        title: 'Column Intersection',
        description: `Examine Column ${targetCol + 1}. Intersecting givens restrict options for cell (Row ${targetRow + 1}, Col ${targetCol + 1}).`,
        targetRow,
        targetCol,
      },
      {
        level: 3,
        title: 'Candidate Analysis',
        description: isNakedSingle
          ? `Cell (R${targetRow + 1}, C${targetCol + 1}) is a Naked Single! It only has 1 possible valid candidate.`
          : `Cell (R${targetRow + 1}, C${targetCol + 1}) can only be populated by number ${val} because all other digits exist in its row, column, or 3x3 box.`,
        targetRow,
        targetCol,
        techniqueName: isNakedSingle ? 'Naked Single' : 'Hidden Single',
      },
      {
        level: 4,
        title: 'Direct Placement',
        description: `Place number ${val} in Row ${targetRow + 1}, Column ${targetCol + 1}.`,
        targetRow,
        targetCol,
        targetValue: val,
      },
    ];

    return { hints, cell: { row: targetRow, col: targetCol } };
  }

  // Teacher Mode AI Tutor Analysis
  public static analyzeMove(
    currentBoard: number[][],
    solution: number[][],
    row: number,
    col: number,
    attemptValue: number
  ): TutorExplanation {
    if (attemptValue === solution[row][col]) {
      const candidates = this.getCandidates(currentBoard, row, col);
      if (candidates.length === 1) {
        return {
          type: 'technique',
          title: 'Naked Single Executed!',
          message: `Brilliant move! Digit ${attemptValue} was the ONLY possible candidate for Row ${row + 1}, Column ${col + 1}.`,
          technique: 'Naked Single',
          suggestedValue: attemptValue,
        };
      }
      return {
        type: 'info',
        title: 'Correct Placement',
        message: `Great job! Number ${attemptValue} fits correctly in Row ${row + 1}, Column ${col + 1}.`,
        suggestedValue: attemptValue,
      };
    } else {
      // Wrong move warning
      const rowConflict = currentBoard[row].includes(attemptValue);
      let colConflict = false;
      for (let r = 0; r < 9; r++) {
        if (currentBoard[r][col] === attemptValue) colConflict = true;
      }

      let reason = `Digit ${attemptValue} does not belong here.`;
      if (rowConflict) reason += ` Digit ${attemptValue} already exists in Row ${row + 1}.`;
      if (colConflict) reason += ` Digit ${attemptValue} already exists in Column ${col + 1}.`;

      return {
        type: 'warning',
        title: 'Invalid Placement Warning',
        message: reason,
        technique: 'Conflict Alert',
        suggestedValue: solution[row][col],
      };
    }
  }

  // Get next logical teaching tip
  public static getTeacherTip(board: number[][], solution: number[][]): TutorExplanation | null {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          const candidates = this.getCandidates(board, r, c);
          if (candidates.length === 1) {
            const val = candidates[0];
            return {
              type: 'tip',
              title: 'Naked Single Opportunity',
              message: `Check Row ${r + 1}, Column ${c + 1}! It has only ONE candidate remaining: ${val}.`,
              technique: 'Naked Single',
              affectedCells: [{ row: r, col: c }],
              suggestedValue: val,
            };
          }
        }
      }
    }

    // Default tip
    return {
      type: 'tip',
      title: 'Strategy Tip',
      message: 'Look for rows or columns with 7 or 8 filled numbers to easily deduce the remaining candidates.',
      technique: 'Scanning & Cross-hatching',
    };
  }
}
