import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trophy, Award, Crown, Brain, Sparkles, Zap, Flame, Target, Lock } from 'lucide-react';
import { Achievement } from '../types';
import { ApiService } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';

export const AchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNLOCKED' | 'LOCKED'>('ALL');

  useEffect(() => {
    ApiService.getAchievements().then(setAchievements);
  }, []);

  const filtered = achievements.filter((a) => {
    if (filter === 'UNLOCKED') return a.unlocked;
    if (filter === 'LOCKED') return !a.unlocked;
    return true;
  });

  const getIcon = (code: string) => {
    switch (code) {
      case 'FIRST_WIN': return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'WINS_10': return <Award className="w-6 h-6 text-brand-400" />;
      case 'WINS_100': return <Crown className="w-6 h-6 text-yellow-400" />;
      case 'NO_HINT_VICTORY': return <Brain className="w-6 h-6 text-violet-400" />;
      case 'PERFECT_GAME': return <Sparkles className="w-6 h-6 text-emerald-400" />;
      case 'SPEED_MASTER': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'DAILY_CHAMPION': return <Flame className="w-6 h-6 text-rose-400 fill-rose-400" />;
      default: return <Target className="w-6 h-6 text-brand-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-brand-400" />
            <span>Achievements & Badges</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Unlock prestige trophies by demonstrating speed, perfection, and streak consistency
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['ALL', 'UNLOCKED', 'LOCKED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((ach) => (
          <GlassCard
            key={ach.id}
            glow={ach.unlocked}
            className={ach.unlocked ? 'border-brand-500/30' : 'opacity-60 border-slate-800'}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                  ach.unlocked
                    ? 'bg-brand-500/20 border-brand-500/40 shadow-lg shadow-brand-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                {ach.unlocked ? getIcon(ach.code) : <Lock className="w-5 h-5 text-slate-500" />}
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  ach.unlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
              >
                {ach.unlocked ? 'Unlocked' : `${ach.progress}%`}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-base text-white mb-1">{ach.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">{ach.description}</p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full ${
                  ach.unlocked ? 'bg-gradient-to-r from-brand-500 to-emerald-400' : 'bg-slate-700'
                }`}
                style={{ width: `${ach.progress}%` }}
              />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
