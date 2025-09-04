'use client';

import { ReactNode } from 'react';
import { useParallax } from '../hooks/useParallax';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  enabled?: boolean;
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  enabled = true
}: ParallaxWrapperProps) {
  const parallaxRef = useParallax({ speed, direction, enabled });

  return (
    <div
      ref={parallaxRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: enabled ? 'transform' : 'auto',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      {children}
    </div>
  );
}

// Background parallax component
export function BackgroundParallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ParallaxWrapper
      speed={0.3}
      direction="up"
      className={`absolute inset-0 z-0 ${className}`}
    >
      {children}
    </ParallaxWrapper>
  );
}

// Content parallax component
export function ContentParallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ParallaxWrapper
      speed={0.1}
      direction="up"
      className={`relative z-10 ${className}`}
    >
      {children}
    </ParallaxWrapper>
  );
}

// Fast parallax for foreground elements
export function FastParallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ParallaxWrapper
      speed={0.8}
      direction="up"
      className={className}
    >
      {children}
    </ParallaxWrapper>
  );
}
