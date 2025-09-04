'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { 
  LazyHeroSection,
  LazyAboutSection,
  LazySkillsSection,
  LazyProjectsSection,
  LazyEducationSection,
  LazyCertificatesSection,
  LazyContactSection,
  LazyWrapper
} from '@/components/LazyComponents';
import { BackgroundParallax } from '@/components/ParallaxWrapper';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-wild-sand flex items-center justify-center z-50">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-deep-sea-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="font-playfair text-2xl font-bold text-mirage">
            Akarsh Rai B
          </h1>
          <p className="text-deep-sea-green mt-2">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-wild-sand relative overflow-hidden">
      <CustomCursor />
      
      {/* Parallax Background */}
      <BackgroundParallax>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </BackgroundParallax>
      
      <Navigation />
      
      <div className="relative z-10 transition-opacity duration-500">
        <LazyWrapper>
          <LazyHeroSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyAboutSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazySkillsSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyProjectsSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyEducationSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyCertificatesSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyContactSection />
        </LazyWrapper>
      </div>
    </main>
  );
}
