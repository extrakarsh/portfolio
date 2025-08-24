'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import AutomationSection from '@/components/AutomationSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'designer' | 'automation'>('designer');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'designer' ? 'automation' : 'designer');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-primary-white flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="font-playfair text-2xl font-bold text-charcoal">
            Digital Craftsman
          </h1>
          <p className="text-medium-grey mt-2">Loading your experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-charcoal text-primary-white' : 'bg-primary-white text-primary-black'
    }`}>
      <CustomCursor />
      
      <Navigation 
        theme={theme} 
        isDarkMode={isDarkMode} 
        onThemeToggle={toggleTheme}
        onDarkModeToggle={toggleDarkMode}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection theme={theme} />
          <AboutSection theme={theme} />
          <PortfolioSection theme={theme} />
          <AutomationSection theme={theme} />
          <ServicesSection theme={theme} />
          <TestimonialsSection theme={theme} />
          <ContactSection theme={theme} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
