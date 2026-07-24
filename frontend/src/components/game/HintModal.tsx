import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, X, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const HintModal: React.FC = () => {
  const { currentHint, hintStep, requestHint, activeHintCell } = useGameStore();

  if (!currentHint) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel p-6 rounded-3xl max-w-md w-full border border-amber-500/30 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-100">
                  AI Progressive Hint
                </h3>
                <span className="text-xs font-mono text-amber-400">
                  Step {hintStep} of 4
                </span>
              </div>
            </div>
          </div>

          {/* Hint Step Progress Dots */}
          <div className="flex items-center space-x-2 my-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  step <= hintStep ? 'bg-amber-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Hint Content */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 my-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-amber-300">
                {currentHint.title}
              </h4>
              {currentHint.techniqueName && (
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {currentHint.techniqueName}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentHint.description}
            </p>
            {activeHintCell && (
              <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Target Cell: Row {activeHintCell.row + 1}, Column {activeHintCell.col + 1}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            {hintStep < 4 ? (
              <button
                onClick={requestHint}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <span>Next Hint (Step {hintStep + 1}/4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => useGameStore.setState({ currentHint: null })}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Done & Return to Game</span>
              </button>
            )}
            <button
              onClick={() => useGameStore.setState({ currentHint: null })}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
