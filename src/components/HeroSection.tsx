'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Zap, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  theme: 'designer' | 'automation';
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const heroText = {
    designer: {
      title: "Streamline Your Design, Supercharge Your Creativity",
      subtitle: "All-in-one platform to design, collaborate, and deliver — faster and smarter.",
      cta: "Get Started for Free",
      icon: Sparkles,
      features: [
        "Real-Time Design Collaboration",
        "Creative Project Management", 
        "Design Performance Insights"
      ]
    },
    automation: {
      title: "Streamline Your Team, Supercharge Your Workflow",
      subtitle: "All-in-one platform to plan, collaborate, and deliver — faster and smarter.",
      cta: "Get Started for Free",
      icon: Zap,
      features: [
        "Real-Time Collaboration",
        "Task & Project Tracking",
        "Performance Insights"
      ]
    }
  };

  const currentTheme = heroText[theme];
  const IconComponent = currentTheme.icon;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-beige overflow-hidden"
    >
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-teal" />
              <span className="font-playfair text-xl font-bold text-navy">
                Digital Craftsman
              </span>
            </motion.div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Features', 'Portfolio', 'About'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium text-navy hover:text-teal transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-navy text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              className="relative z-20"
              style={{ y, opacity }}
            >
              {/* Theme Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sky-blue/20 text-teal mb-8"
              >
                <IconComponent size={20} />
                <span className="text-sm font-medium">
                  {theme === 'designer' ? 'Design Mode' : 'Automation Mode'}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight"
              >
                {currentTheme.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-teal mb-12 leading-relaxed"
              >
                {currentTheme.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center space-x-3 px-8 py-4 bg-navy text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>{currentTheme.cta}</span>
                  <ArrowRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </motion.button>
              </motion.div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {currentTheme.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-teal rounded-full" />
                    <span className="text-navy font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              {/* Team Collaboration Visual */}
              <div className="relative">
                {/* Main Circle */}
                <div className="w-80 h-80 bg-gradient-to-br from-sky-blue to-teal rounded-full mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                </div>
                
                {/* Floating Team Members */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-sky-blue"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-16 right-12 w-20 h-20 bg-white rounded-full shadow-lg border-4 border-teal"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 left-16 w-14 h-14 bg-white rounded-full shadow-lg border-4 border-sky-blue"
                />
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-12 right-8 w-18 h-18 bg-white rounded-full shadow-lg border-4 border-teal"
                />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-4 border-navy"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-blue/20 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center py-16 bg-white/50"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-playfair text-4xl font-bold text-navy mb-6">
            Everything Your Team Needs to Work Smarter
          </h2>
          <p className="text-xl text-teal leading-relaxed">
            From design collaboration to real-time automation, our features are built to keep your team connected, organized, and moving forward—together.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
