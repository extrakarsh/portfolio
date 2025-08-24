'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      const newVelocity = {
        x: newPosition.x - lastPosition.x,
        y: newPosition.y - lastPosition.y
      };
      
      setVelocity(newVelocity);
      setLastPosition(newPosition);
      setMousePosition(newPosition);
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
  }, [lastPosition]);

  // Calculate blob shape based on velocity
  const getBlobShape = () => {
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const maxSpeed = 50;
    const normalizedSpeed = Math.min(speed / maxSpeed, 1);
    
    // Create blob path based on speed
    const radius = 20 + normalizedSpeed * 15;
    const squishX = 1 + normalizedSpeed * 0.5;
    const squishY = 1 - normalizedSpeed * 0.3;
    
    return {
      width: radius * 2 * squishX,
      height: radius * 2 * squishY,
      borderRadius: `${radius}px`,
      transform: `scale(${1 + normalizedSpeed * 0.2})`,
    };
  };

  const cursorVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      scale: 1,
      backgroundColor: '#567C8D', // teal
      borderRadius: '50%',
      filter: 'blur(0px)',
    },
    link: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      height: 50,
      width: 50,
      scale: 1.2,
      backgroundColor: '#C8D9E6', // sky-blue
      borderRadius: '50%',
      filter: 'blur(1px)',
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      scale: 1.5,
      backgroundColor: '#2F4156', // navy
      borderRadius: '50%',
      filter: 'blur(2px)',
    },
  };

  if (!isHovering) return null;

  const blobStyle = getBlobShape();

  return (
    <>
      {/* Main Blob Cursor */}
      <motion.div
        className="fixed pointer-events-none z-cursor mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        style={blobStyle}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
      />
      
      {/* Blob Trail */}
      <motion.div
        className="fixed pointer-events-none z-cursor"
        style={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
        }}
        animate={{
          scale: [1, 0.7, 0],
          opacity: [0.4, 0.2, 0],
          borderRadius: ['50%', '40%', '30%'],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div 
          className="w-6 h-6 bg-teal/60"
          style={{ borderRadius: '50%' }}
        />
      </motion.div>
      
      {/* Secondary Blob Trail */}
      <motion.div
        className="fixed pointer-events-none z-cursor"
        style={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        animate={{
          scale: [0.8, 0.5, 0],
          opacity: [0.3, 0.1, 0],
          borderRadius: ['50%', '45%', '35%'],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'loop',
          delay: 0.2,
        }}
      >
        <div 
          className="w-4 h-4 bg-sky-blue/40"
          style={{ borderRadius: '50%' }}
        />
      </motion.div>
      
      {/* Magnetic Effect Indicator */}
      {cursorVariant !== 'default' && (
        <motion.div
          className="fixed pointer-events-none z-cursor"
          style={{
            x: mousePosition.x - 35,
            y: mousePosition.y - 35,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 border-2 border-teal rounded-full" />
        </motion.div>
      )}
    </>
  );
}
