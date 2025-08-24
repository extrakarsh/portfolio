'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleLinkHover = () => {
      setCursorVariant('link');
    };

    const handleLinkLeave = () => {
      setCursorVariant('default');
    };

    const handleButtonHover = () => {
      setCursorVariant('button');
    };

    const handleButtonLeave = () => {
      setCursorVariant('default');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners for interactive elements
    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('mouseleave', handleButtonLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleButtonHover);
        button.removeEventListener('mouseleave', handleButtonLeave);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      scale: 1,
      backgroundColor: '#0066ff',
    },
    link: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      height: 30,
      width: 30,
      scale: 1.5,
      backgroundColor: '#ff6b6b',
    },
    button: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      scale: 2,
      backgroundColor: '#32d74b',
    },
  };

  if (!isHovering) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-cursor mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor Trail */}
      <motion.div
        className="fixed pointer-events-none z-cursor"
        style={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
        }}
        animate={{
          scale: [1, 0.8, 0],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className="w-2 h-2 bg-electric-blue rounded-full" />
      </motion.div>
      
      {/* Magnetic Effect Indicator */}
      {cursorVariant !== 'default' && (
        <motion.div
          className="fixed pointer-events-none z-cursor"
          style={{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 border border-electric-blue rounded-full" />
        </motion.div>
      )}
    </>
  );
}
