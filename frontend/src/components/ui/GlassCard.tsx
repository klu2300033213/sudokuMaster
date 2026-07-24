import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      className={clsx(
        'glass-card rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        glow && 'hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:border-indigo-500/40',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
