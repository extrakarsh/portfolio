'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'designer' | 'automation';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        theme === 'designer' 
          ? 'bg-warm-coral/20 text-warm-coral' 
          : 'bg-electric-blue/20 text-electric-blue'
      }`}
      title={`Switch to ${theme === 'designer' ? 'Automation' : 'Designer'} mode`}
    >
      <Palette size={20} />
    </motion.button>
  );
}
