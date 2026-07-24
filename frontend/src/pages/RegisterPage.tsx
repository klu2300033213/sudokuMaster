import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, UserPlus, AlertCircle, ChevronDown, ChevronUp, Globe, Sparkles, Check, Upload, Link as LinkIcon, PlayCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { ApiService } from '../services/api';
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

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Optional profile fields
  const [showOptionalProfile, setShowOptionalProfile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(TOY_AVATARS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [country, setCountry] = useState('IN');
  const [bio, setBio] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Local File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          soundManager.playNote();
          setSelectedAvatar(reader.result);
          setCustomAvatarUrl('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }
    setError('');
    setLoading(true);
    soundManager.playClick();

    const finalAvatar = customAvatarUrl.trim() || selectedAvatar;

    try {
      const res = await ApiService.register(email.trim(), username.trim(), password, {
        avatarUrl: finalAvatar,
        country,
        bio,
      });
      register(email.trim(), username.trim(), res.token, res.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border border-slate-700/80 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-violet-600 mx-auto flex items-center justify-center font-black text-xl text-white shadow-lg shadow-brand-500/30">
            9
          </div>
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Save scores to Global Leaderboard or play as guest</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Username <span className="text-brand-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="bhanuprakash"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="bhanuprakash.gandham12@gmail.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Password <span className="text-brand-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* OPTIONAL PROFILE DETAILS TOGGLE */}
          <div className="pt-2 border-t border-slate-300 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowOptionalProfile(!showOptionalProfile);
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-brand-600 dark:text-brand-300 border border-slate-300 dark:border-slate-800 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Customize Avatar & Profile (Optional)</span>
              </span>
              {showOptionalProfile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showOptionalProfile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-3 overflow-hidden"
                >
                  {/* Avatar Picker & Device Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
                        Choose Avatar or Upload Image
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 flex items-center space-x-1 bg-brand-500/10 px-2 py-1 rounded-lg border border-brand-500/30"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload from Laptop/Mobile</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Presets Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {TOY_AVATARS.map((av, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            soundManager.playNote();
                            setSelectedAvatar(av.url);
                            setCustomAvatarUrl('');
                          }}
                          className={`relative cursor-pointer rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                            selectedAvatar === av.url && !customAvatarUrl
                              ? 'border-brand-500 ring-2 ring-brand-500/40 scale-105'
                              : 'border-slate-300 dark:border-slate-800 hover:border-slate-500'
                          }`}
                        >
                          <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] font-mono text-center text-slate-200 truncate py-0.5 px-0.5">
                            {av.name}
                          </span>
                          {selectedAvatar === av.url && !customAvatarUrl && (
                            <div className="absolute top-1 right-1 bg-brand-500 rounded-full p-0.5">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Or Paste Image URL */}
                    <div className="relative pt-1">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={customAvatarUrl}
                        onChange={(e) => {
                          setCustomAvatarUrl(e.target.value);
                          if (e.target.value) setSelectedAvatar(e.target.value);
                        }}
                        className="w-full glass-input pl-9 pr-3 py-1.5 rounded-xl text-[11px] placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Or paste any avatar Image URL..."
                      />
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Country / Region (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-slate-900"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                            {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Short Bio (Optional)
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={2}
                      className="w-full glass-input p-3 rounded-xl text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Share your Sudoku goals or solving style..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-300 dark:border-slate-800 w-full" />
          <span className="bg-slate-50 dark:bg-slate-950 px-3 text-[10px] font-mono text-slate-500 uppercase absolute">
            OR PLAY WITHOUT ACCOUNT
          </span>
        </div>

        {/* Play as Guest Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            navigate('/play');
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-2 border border-slate-300 dark:border-slate-800 shadow-sm transition-all"
        >
          <PlayCircle className="w-4 h-4 text-emerald-500" />
          <span>Continue as Guest (Play Now)</span>
        </button>

        {/* Footer link */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-400 pt-2">
          Already registered?{' '}
          <Link to="/login" className="text-brand-500 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
