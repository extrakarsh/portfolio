'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSectionProps {
  theme: 'designer' | 'automation';
}

// 3D Geometric Shapes Component
function FloatingShapes({ theme }: { theme: 'designer' | 'automation' }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI / 4;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Wireframe Cube */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#ff6b6b' : '#0066ff'} 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Wireframe Sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, 2, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#32d74b' : '#ff6b6b'} 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Wireframe Torus */}
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.4}>
        <mesh position={[-2, -1, 1]}>
          <torusGeometry args={[1, 0.3, 8, 16]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#0066ff' : '#32d74b'} 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Particle System Component
function ParticleSystem({ theme }: { theme: 'designer' | 'automation' }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const color = theme === 'designer' ? 
          (Math.random() > 0.5 ? [1, 0.42, 0.42] : [0.5, 0.84, 0.27]) :
          (Math.random() > 0.5 ? [0, 0.4, 1] : [0.5, 0.84, 0.27]);

        colors[i * 3] = color[0];
        colors[i * 3 + 1] = color[1];
        colors[i * 3 + 2] = color[2];
      }

      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [theme]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const heroText = {
    designer: {
      title: "Digital Craftsman",
      subtitle: "Where Design Meets Innovation",
      description: "Creating sophisticated digital experiences that blend aesthetic excellence with cutting-edge technology.",
      cta: "View My Work",
      icon: Sparkles
    },
    automation: {
      title: "Workflow Wizard",
      subtitle: "Automation That Drives Results",
      description: "Transforming complex processes into elegant, efficient workflows that save time and boost productivity.",
      cta: "See My Workflows",
      icon: Zap
    }
  };

  const currentTheme = heroText[theme];
  const IconComponent = currentTheme.icon;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: theme === 'designer' 
          ? 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
          : 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)'
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingShapes theme={theme} />
          <ParticleSystem theme={theme} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center max-w-4xl mx-auto px-6"
        style={{ y, opacity }}
      >
        {/* Theme Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-8"
        >
          <IconComponent 
            size={20} 
            className={theme === 'designer' ? 'text-warm-coral' : 'text-electric-blue'} 
          />
          <span className="text-sm font-medium text-charcoal">
            {theme === 'designer' ? 'Designer Mode' : 'Automation Mode'}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="cinematic-title text-hero mb-6 stagger-text cinematic-fade-in"
        >
          {currentTheme.title.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.6 }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="cinematic-subtitle text-subtitle mb-6"
        >
          {currentTheme.subtitle}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="cinematic-accent text-body text-charcoal mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {currentTheme.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-primary-black text-primary-white rounded-full font-medium text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">{currentTheme.cta}</span>
            <ArrowRight 
              size={20} 
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
            />
            
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `linear-gradient(45deg, ${
                  theme === 'designer' 
                    ? '#ff6b6b, #32d74b' 
                    : '#0066ff, #32d74b'
                })`
              }}
            />
          </motion.button>
        </motion.div>

        {/* Font Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
        >
          <h3 className="cinematic-accent text-lg mb-4 text-center">Cinematic Typography</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="cinematic-title text-sm">Runiga</div>
              <div className="text-xs text-medium-grey">Bold & Dramatic</div>
            </div>
            <div className="space-y-2">
              <div className="cinematic-subtitle text-sm">Gadianio</div>
              <div className="text-xs text-medium-grey">Elegant & Refined</div>
            </div>
            <div className="space-y-2">
              <div className="cinematic-accent text-sm">Sellendra</div>
              <div className="text-xs text-medium-grey">Modern & Clean</div>
            </div>
            <div className="space-y-2">
              <div className="cinematic-display text-sm">Mallong</div>
              <div className="text-xs text-medium-grey">Impact & Power</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-charcoal rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-charcoal rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-20 right-20 w-32 h-32 opacity-20"
      >
        <div className="w-full h-full border border-electric-blue rounded-full float" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-40 left-20 w-24 h-24 opacity-20"
      >
        <div className="w-full h-full border border-warm-coral rounded-full float" style={{ animationDelay: '1s' }} />
      </motion.div>
    </section>
  );
}
