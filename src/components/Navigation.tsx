'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  theme: 'designer' | 'automation';
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onDarkModeToggle: () => void;
}

export default function Navigation({ 
  theme, 
  isDarkMode, 
  onThemeToggle, 
  onDarkModeToggle 
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Automation', href: '#automation' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className={`w-8 h-8 rounded-full ${
                theme === 'designer' 
                  ? 'bg-warm-coral' 
                  : 'bg-electric-blue'
              }`} />
              <span className="font-playfair text-xl font-bold">
                Digital Craftsman
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium hover:text-electric-blue transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onThemeToggle}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'designer' 
                    ? 'bg-warm-coral/20 text-warm-coral' 
                    : 'bg-electric-blue/20 text-electric-blue'
                }`}
                title={`Switch to ${theme === 'designer' ? 'Automation' : 'Designer'} mode`}
              >
                <Palette size={20} />
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDarkModeToggle}
                className="p-2 rounded-full bg-charcoal/10 text-charcoal hover:bg-charcoal/20 transition-colors"
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-charcoal/10 text-charcoal"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-playfair text-xl font-bold">
                  Menu
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-charcoal/10 text-charcoal"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium hover:text-electric-blue transition-colors py-2"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center space-x-4 mt-8 pt-8 border-t border-charcoal/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onThemeToggle}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                    theme === 'designer' 
                      ? 'bg-warm-coral/20 text-warm-coral' 
                      : 'bg-electric-blue/20 text-electric-blue'
                  }`}
                >
                  {theme === 'designer' ? 'Automation Mode' : 'Designer Mode'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDarkModeToggle}
                  className="flex-1 py-3 px-4 rounded-lg bg-charcoal/10 text-charcoal hover:bg-charcoal/20 transition-colors"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
