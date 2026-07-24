import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Grid,
  Trophy,
  BarChart3,
  Flame,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  User,
  Sparkles,
  Shield,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { soundManager } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useSettingsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Play', path: '/play', icon: <Grid className="w-4 h-4" /> },
    { label: 'Dashboard', path: '/dashboard', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Daily Challenge', path: '/daily-challenge', icon: <Flame className="w-4 h-4 text-amber-500" /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { label: 'Statistics', path: '/statistics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Achievements', path: '/achievements', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => soundManager.playClick()}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-violet-600 p-0.5 shadow-lg shadow-brand-500/30 flex items-center justify-center"
            >
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-violet-400">
                  9
                </span>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
                SUDOKU <span className="text-brand-500 dark:text-brand-400">MASTER AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => soundManager.playClick()}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities & User */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Profile or Auth */}
            {isAuthenticated && user ? (
              <Link
                to="/profile"
                onClick={() => soundManager.playClick()}
                className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 hover:border-brand-500/40 transition-all shadow-sm"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-brand-500/40"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {user.username}
                  </span>
                  <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold">
                    Lvl {user.level} ({user.xp} XP)
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-semibold bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass-panel border-t border-slate-800 px-4 pt-2 pb-6 space-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                setMobileMenuOpen(false);
                soundManager.playClick();
              }}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/80"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-sm font-semibold text-brand-400"
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </Link>
            <button
              onClick={toggleSound}
              className="flex items-center space-x-1.5 text-xs text-slate-400"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
