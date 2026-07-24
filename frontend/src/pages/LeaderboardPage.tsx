import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Flame, Search, Globe, Users } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { ApiService } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';

export const LeaderboardPage: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState<'WEEKLY' | 'MONTHLY' | 'ALL_TIME'>('WEEKLY');
  const [tab, setTab] = useState<'GLOBAL' | 'FRIENDS'>('GLOBAL');

  useEffect(() => {
    ApiService.getLeaderboard(timeframe).then(setEntries);
  }, [timeframe]);

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>Global Leaderboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compete against the world's fastest Sudoku grandmasters and climb the ranks
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Global vs Friends Tab */}
          <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTab('GLOBAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                tab === 'GLOBAL' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global</span>
            </button>
            <button
              onClick={() => setTab('FRIENDS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                tab === 'FRIENDS' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Friends</span>
            </button>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {(['WEEKLY', 'MONTHLY', 'ALL_TIME'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf ? 'bg-slate-800 text-brand-300 border border-brand-500/40' : 'text-slate-400'
                }`}
              >
                {tf.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* #2 Rank Silver */}
          <GlassCard className="order-2 md:order-1 border-slate-700 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-slate-700 text-slate-200 font-bold mx-auto flex items-center justify-center border-2 border-slate-400">
              #2
            </div>
            <img
              src={topThree[1].user.avatarUrl}
              alt={topThree[1].user.username}
              className="w-20 h-20 rounded-2xl mx-auto object-cover ring-2 ring-slate-400 shadow-xl"
            />
            <h3 className="font-display font-extrabold text-lg text-white">{topThree[1].user.username}</h3>
            <span className="font-mono font-bold text-brand-400 text-sm block">{topThree[1].score} XP</span>
            <div className="text-[11px] font-mono text-slate-400">Best: {formatTime(topThree[1].bestTimeSeconds)}</div>
          </GlassCard>

          {/* #1 Rank Gold Champion */}
          <GlassCard glow className="order-1 md:order-2 border-amber-500/50 text-center space-y-4 relative bg-gradient-to-b from-amber-500/10 to-transparent -translate-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black mx-auto flex items-center justify-center border-2 border-amber-300 shadow-lg shadow-amber-500/30">
              <Crown className="w-6 h-6 fill-slate-950" />
            </div>
            <img
              src={topThree[0].user.avatarUrl}
              alt={topThree[0].user.username}
              className="w-24 h-24 rounded-2xl mx-auto object-cover ring-4 ring-amber-400 shadow-2xl"
            />
            <div>
              <h3 className="font-display font-black text-xl text-white">{topThree[0].user.username}</h3>
              <span className="font-mono font-black text-amber-400 text-lg block">{topThree[0].score} XP</span>
            </div>
            <div className="text-xs font-mono text-slate-300 bg-amber-500/20 py-1 px-3 rounded-full inline-block border border-amber-500/40">
              🏆 {topThree[0].winCount} Wins • Best: {formatTime(topThree[0].bestTimeSeconds)}
            </div>
          </GlassCard>

          {/* #3 Rank Bronze */}
          <GlassCard className="order-3 border-amber-700/60 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-300 font-bold mx-auto flex items-center justify-center border-2 border-amber-700">
              #3
            </div>
            <img
              src={topThree[2].user.avatarUrl}
              alt={topThree[2].user.username}
              className="w-20 h-20 rounded-2xl mx-auto object-cover ring-2 ring-amber-700 shadow-xl"
            />
            <h3 className="font-display font-extrabold text-lg text-white">{topThree[2].user.username}</h3>
            <span className="font-mono font-bold text-brand-400 text-sm block">{topThree[2].score} XP</span>
            <div className="text-[11px] font-mono text-slate-400">Best: {formatTime(topThree[2].bestTimeSeconds)}</div>
          </GlassCard>
        </div>
      )}

      {/* Ranks Table */}
      <GlassCard className="overflow-x-auto p-0 rounded-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase bg-slate-900/60">
              <th className="p-4">Rank</th>
              <th className="p-4">Player</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4 text-right">Wins</th>
              <th className="p-4 text-right">Best Time</th>
              <th className="p-4 text-right">XP Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {entries.map((entry) => (
              <tr key={entry.rank} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-300">#{entry.rank}</td>
                <td className="p-4 flex items-center space-x-3">
                  <img
                    src={entry.user.avatarUrl}
                    alt={entry.user.username}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                  />
                  <span className="font-bold text-slate-100">{entry.user.username}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-800 text-brand-300 border border-slate-700">
                    {entry.difficulty}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-slate-300">{entry.winCount}</td>
                <td className="p-4 text-right font-mono text-slate-300">{formatTime(entry.bestTimeSeconds)}</td>
                <td className="p-4 text-right font-mono font-bold text-brand-400">{entry.score} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};
