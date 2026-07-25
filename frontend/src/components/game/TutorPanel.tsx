import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, AlertTriangle, Lightbulb, CheckCircle2, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const TutorPanel: React.FC = () => {
  const { tutorExplanation, clearTutorExplanation, gameMode } = useGameStore();

  if (gameMode !== 'TEACHER' || !tutorExplanation) return null;

  const { type, title, message, technique, suggestedValue } = tutorExplanation;

  const typeConfig = {
    info: {
      bg: 'bg-slate-900 border-brand-500/40 text-slate-100',
      badge: 'Correct Move',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    warning: {
      bg: 'bg-slate-900 border-rose-500/40 text-slate-100',
      badge: 'Mistake Warning',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    tip: {
      bg: 'bg-slate-900 border-indigo-500/40 text-slate-100',
      badge: 'Tutor Tip',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    technique: {
      bg: 'bg-slate-900 border-violet-500/40 text-slate-100',
      badge: 'Technique Unlocked',
      badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    },
  };

  const currentConfig = typeConfig[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        className={`p-3.5 sm:p-4 rounded-2xl border ${currentConfig.bg} max-w-[540px] w-full mx-auto my-2 relative shadow-lg bg-slate-900 dark:bg-slate-900 text-slate-100`}
      >
        <button
          onClick={clearTutorExplanation}
          className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start space-x-3">
          {/* AI Avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-violet-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
            <Bot className="w-4 h-4" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${currentConfig.badgeBg}`}>
                {currentConfig.badge}
              </span>
              {technique && (
                <span className="text-[10px] font-mono text-slate-400">
                  Technique: <strong className="text-brand-300">{technique}</strong>
                </span>
              )}
            </div>

            <h4 className="font-display font-bold text-xs sm:text-sm text-slate-100 flex items-center space-x-1.5">
              <span>{title}</span>
            </h4>

            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">{message}</p>

            {suggestedValue && (
              <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">AI Suggested Solution Value:</span>
                <span className="font-mono font-bold text-brand-400 bg-brand-500/20 px-2 py-0.5 rounded border border-brand-500/40">
                  Digit {suggestedValue}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
