import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart, Github, Twitter, Globe } from 'lucide-react';
import { SupportForm } from './SupportForm';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-white/10 dark:border-slate-800/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-violet-600 flex items-center justify-center font-bold text-white">
                9
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                SUDOKU <span className="text-brand-500 dark:text-brand-400">MASTER AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The world's most advanced Sudoku ecosystem with step-by-step AI tutoring, progressive hints, global competitive leaderboards, and interactive performance statistics.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/play" className="hover:text-brand-500 transition-colors">Play Sudoku</Link>
              </li>
              <li>
                <Link to="/daily-challenge" className="hover:text-brand-500 transition-colors">Daily Challenge</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-brand-500 transition-colors">Platform Features</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-brand-500 transition-colors">Global Leaderboard</Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-brand-500 transition-colors">Achievements</Link>
              </li>
            </ul>
          </div>

          {/* Learning & Modes */}
          <div>
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              AI & Game Modes
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <span className="text-slate-800 dark:text-slate-300 font-medium">Teacher Mode</span> — Step-by-Step Tutor
              </li>
              <li>
                <span className="text-slate-800 dark:text-slate-300 font-medium">Hint Mode</span> — Progressive Guidance
              </li>
              <li>
                <span className="text-slate-800 dark:text-slate-300 font-medium">Challenge Mode</span> — Hardcore Timed
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors">Solving Techniques Guide</Link>
              </li>
            </ul>
          </div>

          {/* Settings & Support */}
          <div>
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Account & Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/profile" className="hover:text-brand-500 transition-colors">User Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-brand-500 transition-colors">Platform Settings</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-500 transition-colors">Login / Register</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SUPPORT & FEEDBACK CONTACT FORM */}
        <SupportForm />

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Sudoku Master AI. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Developed by <strong className="text-brand-600 dark:text-brand-400 font-bold">Gandham Bhanu Prakash</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
