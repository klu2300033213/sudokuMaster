import React from 'react';
import { Settings, Moon, Sun, Volume2, VolumeX, Sparkles, Shield, AlertTriangle, Eye } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { GlassCard } from '../components/ui/GlassCard';

export const SettingsPage: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    soundEnabled,
    toggleSound,
    musicEnabled,
    toggleMusic,
    animationsEnabled,
    toggleAnimations,
    autoPencilNotes,
    toggleAutoPencilNotes,
    highlightSameNumbers,
    toggleHighlightSameNumbers,
    highlightPeers,
    toggleHighlightPeers,
    warnOnMistakes,
    toggleWarnOnMistakes,
    maxMistakesLimit,
    setMaxMistakesLimit,
  } = useSettingsStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white flex items-center space-x-3">
          <Settings className="w-8 h-8 text-brand-400" />
          <span>Platform Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize board aesthetics, audio feedback, assistance levels, and game rules
        </p>
      </div>

      {/* Appearance & Sound */}
      <GlassCard className="space-y-6">
        <h3 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <Moon className="w-5 h-5 text-brand-400" />
          <span>Theme & Sound Controls</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-slate-200 block">Dark / Light Mode</span>
              <span className="text-xs text-slate-400">Switch between sleek dark space and crisp light theme</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${darkMode ? 'bg-brand-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <span className="font-semibold text-sm text-slate-200 block">Sound Effects</span>
              <span className="text-xs text-slate-400">Synthesized audio cues for cell click, pencil notes, and victory</span>
            </div>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Gameplay Assistance */}
      <GlassCard className="space-y-6">
        <h3 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <Eye className="w-5 h-5 text-violet-400" />
          <span>Gameplay & Visual Assistance</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-slate-200 block">Auto Pencil Notes</span>
              <span className="text-xs text-slate-400">Automatically generate candidate numbers for empty cells</span>
            </div>
            <button
              onClick={toggleAutoPencilNotes}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${autoPencilNotes ? 'bg-brand-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoPencilNotes ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <span className="font-semibold text-sm text-slate-200 block">Highlight Same Numbers</span>
              <span className="text-xs text-slate-400">Highlight all matching digits across the board when selected</span>
            </div>
            <button
              onClick={toggleHighlightSameNumbers}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${highlightSameNumbers ? 'bg-brand-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${highlightSameNumbers ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div>
              <span className="font-semibold text-sm text-slate-200 block">Warn on Mistakes</span>
              <span className="text-xs text-slate-400">Alert immediately when an incorrect digit is entered</span>
            </div>
            <button
              onClick={toggleWarnOnMistakes}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${warnOnMistakes ? 'bg-brand-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${warnOnMistakes ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
