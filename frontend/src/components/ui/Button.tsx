import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:from-brand-400 hover:to-violet-500 focus:ring-brand-500 active:scale-[0.98]',
    secondary:
      'bg-slate-800 text-slate-100 hover:bg-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 focus:ring-slate-500 active:scale-[0.98]',
    outline:
      'border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-500 focus:ring-slate-500 active:scale-[0.98]',
    danger:
      'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 focus:ring-red-500 active:scale-[0.98]',
    ghost:
      'text-slate-300 hover:bg-slate-800/60 hover:text-white focus:ring-slate-500',
    glass:
      'glass-panel text-white hover:bg-white/10 dark:hover:bg-slate-800/80 border border-white/10 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs space-x-1.5',
    md: 'px-4 py-2 text-sm space-x-2',
    lg: 'px-6 py-3 text-base space-x-2.5',
  };

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={clsx(baseStyle, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </motion.button>
  );
};
