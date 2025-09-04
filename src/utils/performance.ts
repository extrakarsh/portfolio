'use client';

// Performance optimization utilities

// Debounce function for scroll events
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// RequestAnimationFrame wrapper for smooth animations
export function requestAnimationFrame(callback: () => void): number {
  return window.requestAnimationFrame(callback);
}

export function cancelAnimationFrame(id: number): void {
  window.cancelAnimationFrame(id);
}

// Intersection Observer utility
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
}

// Memory usage monitoring
export function getMemoryUsage(): MemoryInfo | null {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as { memory: MemoryInfo }).memory;
  }
  return null;
}

// Lazy loading utility
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(img);
}

// Preload critical resources
export function preloadResource(href: string, as: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

// Optimize images for WebP format
export function getOptimizedImageSrc(src: string): string {
  if (typeof window === 'undefined') return src;
  
  // Check if browser supports WebP
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

  if (supportsWebP && src.includes('.')) {
    const [name] = src.split('.');
    return `${name}.webp`;
  }

  return src;
}

// CSS optimization utilities
export function addOptimizedStyles(element: HTMLElement): void {
  element.style.willChange = 'transform';
  element.style.transform = 'translateZ(0)'; // Force GPU acceleration
}

export function removeOptimizedStyles(element: HTMLElement): void {
  element.style.willChange = 'auto';
  element.style.transform = '';
}

// Bundle size optimization
export function dynamicImport<T>(importFn: () => Promise<T>): Promise<T> {
  return importFn();
}

// Critical CSS inlining
export function inlineCriticalCSS(css: string): void {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// Service Worker registration for caching
export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
