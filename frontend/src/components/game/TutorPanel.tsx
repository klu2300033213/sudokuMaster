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
      bg: 'bg-brand-500/15 border-brand-500/30',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      badge: 'Correct Move',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    warning: {
      bg: 'bg-rose-500/15 border-rose-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      badge: 'Mistake Warning',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    tip: {
      bg: 'bg-indigo-500/15 border-indigo-500/30',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      badge: 'Tutor Tip',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    technique: {
      bg: 'bg-violet-500/15 border-violet-500/30',
      icon: <Sparkles className="w-5 h-5 text-violet-400" />,
      badge: 'Technique Unlocked',
      badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    },
  };

  const currentConfig = typeConfig[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`glass-panel p-4 rounded-2xl border ${currentConfig.bg} max-w-[540px] w-full mx-auto my-3 relative shadow-xl`}
      >
        <button
          onClick={clearTutorExplanation}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start space-x-3">
          {/* AI Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-violet-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
            <Bot className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${currentConfig.badgeBg}`}>
                {currentConfig.badge}
              </span>
              {technique && (
                <span className="text-[10px] font-mono text-slate-400">
                  Technique: <strong className="text-brand-300">{technique}</strong>
                </span>
              )}
            </div>

            <h4 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-1.5">
              <span>{title}</span>
            </h4>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{message}</p>

            {suggestedValue && (
              <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs">
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
