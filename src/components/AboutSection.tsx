'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Code, Palette, Zap, Users, Clock, TrendingUp } from 'lucide-react';
import * as THREE from 'three';

interface AboutSectionProps {
  theme: 'designer' | 'automation';
}

// 3D Skill Constellation Component
function SkillConstellation({ theme }: { theme: 'designer' | 'automation' }) {
  const groupRef = useRef<THREE.Group>(null);

  const skills = [
    { name: 'React', position: [2, 2, 0], color: '#61dafb' },
    { name: 'TypeScript', position: [-2, 1, 1], color: '#3178c6' },
    { name: 'Three.js', position: [1, -1, 2], color: '#000000' },
    { name: 'n8n', position: [-1, -2, 0], color: '#ff6b35' },
    { name: 'Figma', position: [0, 2, -1], color: '#f24e1e' },
    { name: 'Node.js', position: [2, -1, -1], color: '#339933' },
    { name: 'Tailwind', position: [-2, -1, 1], color: '#06b6d4' },
    { name: 'GSAP', position: [0, 0, 2], color: '#88ce02' },
  ];

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI / 6;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Skill Nodes */}
      {skills.map((skill, index) => (
        <Float key={skill.name} speed={1 + index * 0.2} floatIntensity={0.5}>
          <mesh position={skill.position as [number, number, number]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial 
              color={skill.color} 
              transparent 
              opacity={0.8}
            />
          </mesh>
          
          {/* Connection Lines */}
          {index < skills.length - 1 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      ...skill.position,
                      ...skills[(index + 1) % skills.length].position
                    ]),
                    3
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color={theme === 'designer' ? '#ff6b6b' : '#0066ff'} 
                transparent 
                opacity={0.3}
              />
            </line>
          )}
        </Float>
      ))}
    </group>
  );
}

// Stats Component
function StatCard({ icon: Icon, value, label, delay }: {
  icon: any;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-electric-blue to-warm-coral rounded-full flex items-center justify-center">
        <Icon size={28} className="text-white" />
      </div>
      <div className="text-3xl font-bold text-charcoal mb-2">{value}</div>
      <div className="text-medium-grey text-sm">{label}</div>
    </motion.div>
  );
}

export default function AboutSection({ theme }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const stats = [
    { icon: Clock, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '200+', label: 'Projects Completed' },
    { icon: Zap, value: '100+', label: 'Workflows Automated' },
  ];

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative py-section overflow-hidden"
      style={{
        background: theme === 'designer' 
          ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          : 'linear-gradient(135deg, #f8fbff 0%, #ffffff 100%)'
      }}
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-playfair text-section font-bold mb-6">
            The Intersection of Design & Automation
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            I bridge the gap between creative design and technical automation, 
            creating digital experiences that are both beautiful and efficient.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal">
              My Journey
            </h3>
            
            <div className="space-y-4">
              <p className="text-body text-charcoal leading-relaxed">
                I started as a web designer with a passion for creating beautiful, 
                functional interfaces. But I quickly realized that the real magic 
                happens when design meets automation.
              </p>
              
              <p className="text-body text-charcoal leading-relaxed">
                Today, I specialize in building sophisticated web experiences 
                and creating n8n workflows that transform how businesses operate. 
                Every project is an opportunity to blend aesthetic excellence 
                with technical innovation.
              </p>
              
              <p className="text-body text-charcoal leading-relaxed">
                Whether it's a stunning portfolio website or a complex automation 
                system, I approach each challenge with the same level of creativity 
                and attention to detail.
              </p>
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warm-coral rounded-full" />
                <span className="text-sm font-medium text-charcoal">UI/UX Design</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-electric-blue rounded-full" />
                <span className="text-sm font-medium text-charcoal">Web Development</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-lime-green rounded-full" />
                <span className="text-sm font-medium text-charcoal">n8n Workflows</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warm-coral rounded-full" />
                <span className="text-sm font-medium text-charcoal">Process Automation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - 3D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-96 relative"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <SkillConstellation theme={theme} />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate 
                autoRotateSpeed={0.3}
              />
            </Canvas>
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-playfair font-bold text-charcoal mb-2">
                  Skills Constellation
                </div>
                <div className="text-sm text-medium-grey">
                  Hover to explore connections
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Automation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gradient-to-r from-electric-blue/10 to-warm-coral/10 rounded-3xl"
        >
          <div className="text-center mb-8">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Live n8n Workflow Preview
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto">
              See how automation transforms complex processes into elegant, 
              efficient workflows that save time and boost productivity.
            </p>
          </div>

          {/* Workflow Animation Placeholder */}
          <div className="relative h-64 bg-white/50 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Zap size={48} className="text-electric-blue mx-auto mb-4" />
                <div className="text-lg font-medium text-charcoal mb-2">
                  Workflow Visualization
                </div>
                <div className="text-sm text-medium-grey">
                  Interactive n8n workflow demo coming soon
                </div>
              </div>
            </div>
            
            {/* Animated Flow Lines */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <motion.path
                  d="M 50 100 Q 200 50 350 100"
                  stroke={theme === 'designer' ? '#ff6b6b' : '#0066ff'}
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.circle
                  cx="50"
                  cy="100"
                  r="4"
                  fill={theme === 'designer' ? '#ff6b6b' : '#0066ff'}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
