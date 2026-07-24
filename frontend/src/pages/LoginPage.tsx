import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, CheckSquare, Square, AlertCircle, PlayCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { ApiService } from '../services/api';
import { soundManager } from '../utils/audio';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [identifier, setIdentifier] = useState('bhanuprakash');
  const [password, setPassword] = useState('2236');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your username/email and password.');
      return;
    }

    setError('');
    setLoading(true);
    soundManager.playClick();

    try {
      const res = await ApiService.login(identifier.trim(), password);
      login(identifier.trim(), res.token, res.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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
          <h2 className="font-display font-black text-2xl text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Log in to sync your stats or play immediately as guest</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Username or Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Username or email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Password</label>
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

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            >
              {rememberMe ? (
                <CheckSquare className="w-4 h-4 text-brand-500" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>Remember me</span>
            </button>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-600 hover:from-brand-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Logging in...' : 'Sign In'}</span>
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
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-500 font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
