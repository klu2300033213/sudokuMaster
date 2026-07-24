import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Shield, Trophy, Globe, Calendar, LogOut, Sparkles, CheckCircle2, Edit3, X, Check, Upload, Link as LinkIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GlassCard } from '../components/ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { soundManager } from '../utils/audio';

const TOY_AVATARS = [
  { name: 'AI Bot', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80' },
  { name: 'Grandmaster', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
  { name: 'Cyber Ninja', url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=80' },
  { name: 'Logic Wizard', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' },
  { name: 'Queen Solver', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80' },
  { name: 'Clever Fox', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80' },
  { name: 'Space Explorer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80' },
  { name: 'Quantum Mind', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80' },
];

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'JP', name: 'Japan' },
  { code: 'DE', name: 'Germany' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'IN', name: 'India' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'CA', name: 'Canada' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AU', name: 'Australia' },
];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, userStats, logout, updateProfile } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editAvatar, setEditAvatar] = useState(user?.avatarUrl || TOY_AVATARS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editCountry, setEditCountry] = useState(user?.country || 'US');

  if (!user) return null;

  const xpCurrent = user.xp;
  const level = user.level;
  const xpForNextLevel = level * 500;
  const xpProgress = Math.min(100, Math.floor(((xpCurrent % 500) / 500) * 100));

  // Device File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          soundManager.playNote();
          setEditAvatar(reader.result);
          setCustomAvatarUrl('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    const finalAvatar = customAvatarUrl.trim() || editAvatar;
    updateProfile({
      avatarUrl: finalAvatar,
      bio: editBio,
      country: editCountry,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Card */}
      <GlassCard glow className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-brand-500/30">
        <div className="flex items-center space-x-6 text-center md:text-left flex-col md:flex-row">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/50 shadow-2xl"
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <h1 className="font-display font-black text-3xl text-white">{user.username}</h1>
              <span className="text-xs font-mono font-bold bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full border border-brand-500/30">
                {user.country}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-md">{user.bio}</p>
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Member Since Jan 2026</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{userStats.gamesWon} Victories</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setEditAvatar(user.avatarUrl);
              setCustomAvatarUrl('');
              setEditBio(user.bio || '');
              setEditCountry(user.country);
              setIsEditing(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold shadow-lg shadow-brand-500/20 flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </GlassCard>

      {/* Level & XP Overview */}
      <GlassCard className="space-y-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Level {level} Grandmaster Progress</span>
          </span>
          <span className="font-mono text-brand-400">{xpCurrent} / {xpForNextLevel} XP</span>
        </div>
        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </GlassCard>

      {/* Match History */}
      <GlassCard className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white">Recent Matches</h3>
        <div className="space-y-2">
          {[
            { diff: 'EXPERT', mode: 'TEACHER', result: 'WON', time: '8m 42s', xp: '+600 XP' },
            { diff: 'HARD', mode: 'HINT', result: 'WON', time: '5m 14s', xp: '+400 XP' },
            { diff: 'MEDIUM', mode: 'CHALLENGE', result: 'WON', time: '3m 25s', xp: '+250 XP' },
          ].map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-100">{m.diff}</span>
                <span className="text-slate-400 font-mono">({m.mode})</span>
              </div>
              <div className="flex items-center space-x-4 font-mono">
                <span className="text-slate-400">{m.time}</span>
                <span className="text-brand-400 font-bold">{m.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full border border-slate-700 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-display font-black text-xl text-white">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Avatar Selection & Local Device Upload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Choose Avatar or Upload Image
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] font-bold text-brand-400 hover:text-brand-300 flex items-center space-x-1 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/30"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Character Avatars Presets */}
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {TOY_AVATARS.map((av, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          soundManager.playNote();
                          setEditAvatar(av.url);
                          setCustomAvatarUrl('');
                        }}
                        className={`relative cursor-pointer rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                          editAvatar === av.url && !customAvatarUrl
                            ? 'border-brand-400 ring-2 ring-brand-500/40 scale-105'
                            : 'border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] font-mono text-center text-slate-200 truncate py-0.5 px-0.5">
                          {av.name}
                        </span>
                        {editAvatar === av.url && !customAvatarUrl && (
                          <div className="absolute top-1 right-1 bg-brand-500 rounded-full p-0.5">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Or Image URL Input */}
                  <div className="relative pt-1">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={customAvatarUrl}
                      onChange={(e) => {
                        setCustomAvatarUrl(e.target.value);
                        if (e.target.value) setEditAvatar(e.target.value);
                      }}
                      className="w-full glass-input pl-9 pr-3 py-1.5 rounded-xl text-[11px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Or paste any custom Image URL..."
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Country / Region
                  </label>
                  <select
                    value={editCountry}
                    onChange={(e) => setEditCountry(e.target.value)}
                    className="w-full glass-input p-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-900"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-slate-950 text-slate-100">
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bio */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    className="w-full glass-input p-3 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    placeholder="Tell other Sudoku solvers about yourself..."
                  />
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-brand-500/30"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
