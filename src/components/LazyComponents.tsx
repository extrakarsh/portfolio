'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

// Dynamic imports for heavy components
export const LazyHeroSection = dynamic(() => import('./HeroSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyAboutSection = dynamic(() => import('./AboutSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyProjectsSection = dynamic(() => import('./ProjectsSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazySkillsSection = dynamic(() => import('./SkillsSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyCertificatesSection = dynamic(() => import('./CertificatesSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyContactSection = dynamic(() => import('./ContactSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyTestimonialsSection = dynamic(() => import('./TestimonialsSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyServicesSection = dynamic(() => import('./ServicesSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyEducationSection = dynamic(() => import('./EducationSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyPortfolioSection = dynamic(() => import('./PortfolioSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

export const LazyAutomationSection = dynamic(() => import('./AutomationSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

// Wrapper component for lazy loading with error boundary
export function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}
