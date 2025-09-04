'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  enabled?: boolean;
}

// Main fix: useRef<HTMLDivElement>(null)
export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up', enabled = true } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const updateParallax = useCallback(() => {
    if (!enabled || !elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - rect.top) / (windowHeight + elementHeight)
    ));

    // Calculate transform based on direction and speed
    let transform = '';
    const translateValue = (scrollProgress - 0.5) * speed * 100;

    switch (direction) {
      case 'up':
        transform = `translate3d(0, ${translateValue}px, 0)`;
        break;
      case 'down':
        transform = `translate3d(0, ${-translateValue}px, 0)`;
        break;
      case 'left':
        transform = `translate3d(${translateValue}px, 0, 0)`;
        break;
      case 'right':
        transform = `translate3d(${-translateValue}px, 0, 0)`;
        break;
    }

    element.style.transform = transform;
    element.style.willChange = 'transform';
  }, [speed, direction, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    // Initial call
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParallax, enabled]);

  return elementRef;
}

// Hook for intersection observer-based animations
export function useIntersectionObserver(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { elementRef, isIntersecting };
}

// Hook for smooth scroll-based animations
export function useScrollAnimation() {
  const elementRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateScrollProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + elementHeight)
      ));
      
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return { elementRef, scrollProgress };
}