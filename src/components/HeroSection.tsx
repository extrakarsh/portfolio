'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { throttle } from '../utils/performance';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible
  const [scrollY, setScrollY] = useState(0);
  
  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.3, direction: 'up' });
  const contentParallax = useParallax({ speed: 0.1, direction: 'up' });

  // Throttled scroll handler for performance
  const handleScroll = throttle(() => {
    setScrollY(window.scrollY);
  }, 16); // ~60fps

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleEmailClick = () => {
    const email = 'akarshraib8@gmail.com';
    const subject = 'Hello from Portfolio';
    const body = 'Hi Akarsh,\n\nI came across your portfolio and would like to connect with you.\n\nBest regards,';
    
    // Create mailto URL with proper encoding
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a temporary link element and click it
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickLinks: Array<{
    name: string;
    url: string;
    icon: React.ComponentType<{ size: number }>;
    color: string;
    onClick?: () => void;
  }> = [
    {
      name: 'GitHub',
      url: 'https://github.com/extrakarsh',
      icon: Github,
      color: 'hover:text-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akarshraib/',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      url: '#',
      icon: Mail,
      color: 'hover:text-red-500',
      onClick: handleEmailClick
    }
  ];

  // Calculate parallax transforms
  const backgroundTransform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
  const contentTransform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
  const opacity = Math.max(0, 1 - scrollY / 800);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        ref={backgroundParallax}
        className="absolute inset-0 z-0"
        style={{ transform: backgroundTransform }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
              <span className="font-playfair text-xl font-bold text-mirage">
                ARB
              </span>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium text-mirage hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div 
              ref={contentParallax}
              className="relative z-20"
              style={{ transform: contentTransform, opacity }}
            >
              {/* Name & Title */}
              <div
                className={`mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <h1 className="font-playfair text-5xl lg:text-7xl font-bold gradient-text mb-4 leading-tight">
                  Akarsh Rai B
                </h1>
                <p className="text-2xl text-mirage/80 font-medium mb-2">
                  Frontend Developer
                </p>
                <p className="text-xl text-mirage/80 font-medium mb-2">
                  Computer Science Student
                </p>
                <p className="text-xl text-mirage/80 font-medium">
                  React Enthusiast
                </p>
              </div>

              {/* Quick Links */}
              <div
                className={`mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex flex-wrap gap-4">
                  {quickLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    const isEmail = link.name === 'Email';
                    
                    if (isEmail) {
                      return (
                        <button
                          key={link.name}
                          onClick={link.onClick}
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full glass-card text-mirage font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${link.color}`}
                          style={{ 
                            transitionDelay: `${600 + index * 100}ms`,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                          }}
                        >
                          <IconComponent size={18} />
                          <span>{link.name}</span>
                        </button>
                      );
                    }
                    
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full glass-card text-mirage font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${link.color}`}
                        style={{ 
                          transitionDelay: `${600 + index * 100}ms`,
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                        }}
                      >
                        <IconComponent size={18} />
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Resume Button */}
              <div
                className={`mb-12 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <a
                  href="https://drive.google.com/file/d/1PSG5wu0Im0Y427h7x-phBkxuS9DQL87p/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group premium-btn text-white text-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <FileText size={20} />
                  <span>View Resume</span>
                  <ArrowRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </a>
              </div>

              {/* About Summary */}
              <div
                className={`p-6 rounded-xl glass-card gradient-border transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <p className="text-mirage leading-relaxed">
                  Adaptable Computer Science student with a foundation in frontend development and problem-solving. 
                  Skilled in building responsive, user-friendly interfaces using HTML, CSS, and JavaScript. 
                  Familiar with React.js, Git version control practices, and collaborative workflows. 
                  Eager to contribute as an Associate Frontend Developer by applying technical knowledge, creativity, and a growth mindset.
                </p>
              </div>
            </div>

            {/* Right Column - Profile Picture */}
            <div
              className={`relative flex justify-center items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {/* Profile Picture Container */}
              <div
  className={`relative flex justify-center items-center transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
  }`}
  style={{ transitionDelay: '500ms' }}
>
  {/* Profile Picture Container */}
  <div className="relative group transform translate-x-12 -translate-y-8"> 
    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
    <div className="relative aspect-[3/4] w-80"> {/* 3:4 ratio wrapper */}
      <Image
        src="/dp.jpg"
        alt="Akarsh Rai B"
        fill   // fills parent (aspect-[3/4] keeps ratio)
        className="object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
        priority
        quality={90}
      />
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}