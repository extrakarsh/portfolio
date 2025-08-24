'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Zap, Clock, TrendingUp, DollarSign, ArrowRight, Play } from 'lucide-react';
import * as THREE from 'three';

interface AutomationSectionProps {
  theme: 'designer' | 'automation';
}

// 3D Workflow Network Component
function WorkflowNetwork({ theme }: { theme: 'designer' | 'automation' }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = [
    { position: [0, 0, 0], color: '#ff6b35', size: 0.4 },
    { position: [2, 1, 0], color: '#0066ff', size: 0.3 },
    { position: [-2, 1, 0], color: '#32d74b', size: 0.3 },
    { position: [1, -1, 1], color: '#ff6b6b', size: 0.3 },
    { position: [-1, -1, 1], color: '#32d74b', size: 0.3 },
    { position: [0, 2, 0], color: '#0066ff', size: 0.3 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 3], [2, 4], [3, 4], [1, 5], [2, 5]
  ];

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI / 4;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, index) => (
        <Float key={index} speed={1 + index * 0.2} floatIntensity={0.3}>
          <mesh position={node.position as [number, number, number]}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshBasicMaterial 
              color={node.color} 
              transparent 
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...nodes[connection[0]].position,
                ...nodes[connection[1]].position
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={theme === 'designer' ? '#ff6b6b' : '#0066ff'} 
            transparent 
            opacity={0.4}
          />
        </line>
      ))}

      {/* Data Flow Particles */}
      {connections.map((connection, index) => (
        <motion.mesh
          key={`particle-${index}`}
          position={[
            (nodes[connection[0]].position[0] + nodes[connection[1]].position[0]) / 2,
            (nodes[connection[0]].position[1] + nodes[connection[1]].position[1]) / 2,
            (nodes[connection[0]].position[2] + nodes[connection[1]].position[2]) / 2,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#32d74b' : '#ff6b6b'} 
            transparent 
            opacity={0.6}
          />
        </motion.mesh>
      ))}
    </group>
  );
}

// ROI Card Component
function ROICard({ icon: Icon, value, label, description, delay }: {
  icon: any;
  value: string;
  label: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-electric-blue/20"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-lime-green rounded-full flex items-center justify-center">
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-charcoal">{value}</div>
          <div className="text-sm text-medium-grey">{label}</div>
        </div>
      </div>
      <p className="text-sm text-charcoal leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Tech Stack Badge Component
function TechBadge({ name, icon: Icon, color, delay }: {
  name: string;
  icon: any;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color + '20' }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <span className="font-medium text-charcoal">{name}</span>
    </motion.div>
  );
}

export default function AutomationSection({ theme }: AutomationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const roiStats = [
    {
      icon: Clock,
      value: '80%',
      label: 'Time Saved',
      description: 'Automated processes reduce manual work by 80% on average.'
    },
    {
      icon: TrendingUp,
      value: '3x',
      label: 'Efficiency Boost',
      description: 'Teams see 3x improvement in process efficiency.'
    },
    {
      icon: DollarSign,
      value: '$50K+',
      label: 'Cost Savings',
      description: 'Average annual savings for enterprise clients.'
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'Always Running',
      description: 'Automated workflows work around the clock.'
    }
  ];

  const techStack = [
    { name: 'n8n', icon: Zap, color: '#ff6b35' },
    { name: 'Zapier', icon: Zap, color: '#ff4a00' },
    { name: 'Make.com', icon: Zap, color: '#ff6b6b' },
    { name: 'REST APIs', icon: Zap, color: '#0066ff' },
    { name: 'Webhooks', icon: Zap, color: '#32d74b' },
    { name: 'Databases', icon: Zap, color: '#ff6b6b' },
  ];

  const caseStudies = [
    {
      title: 'E-commerce Order Processing',
      description: 'Automated order fulfillment from multiple sales channels, reducing processing time from 2 hours to 15 minutes.',
      metrics: ['95% faster', '99.9% accuracy', '24/7 operation']
    },
    {
      title: 'Customer Support Automation',
      description: 'Intelligent ticket routing and response system that handles 70% of support requests automatically.',
      metrics: ['70% auto-resolution', '50% faster response', '24/7 availability']
    },
    {
      title: 'Data Synchronization',
      description: 'Real-time sync between CRM, marketing tools, and analytics platforms with error handling and retry logic.',
      metrics: ['Real-time sync', '99.9% uptime', 'Auto-error recovery']
    }
  ];

  return (
    <section 
      id="automation"
      ref={containerRef}
      className="relative py-section overflow-hidden"
      style={{
        background: theme === 'designer' 
          ? 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)'
          : 'linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)'
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
            Workflow Wizardry
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            Transforming complex business processes into elegant, efficient workflows 
            that save time, reduce errors, and boost productivity.
          </p>
        </motion.div>

        {/* 3D Workflow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Interactive n8n Workflow Network
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto">
              Explore the interconnected nodes and data flow paths that power 
              modern business automation.
            </p>
          </div>

          <div className="h-96 bg-white/50 rounded-3xl overflow-hidden shadow-2xl">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <WorkflowNetwork theme={theme} />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate 
                autoRotateSpeed={0.2}
              />
            </Canvas>
          </div>
        </motion.div>

        {/* ROI Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Proven Results & ROI
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto">
              Real metrics from actual automation projects showing measurable 
              improvements in efficiency and cost savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roiStats.map((stat, index) => (
              <ROICard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Technology Stack
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto">
              Cutting-edge tools and platforms that power modern automation solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <TechBadge
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                color={tech.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Success Stories
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto">
              Real-world examples of how automation has transformed business operations 
              and delivered measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-electric-blue/20"
              >
                <h4 className="font-playfair text-lg font-semibold text-charcoal mb-3">
                  {study.title}
                </h4>
                <p className="text-sm text-charcoal leading-relaxed mb-4">
                  {study.description}
                </p>
                <div className="space-y-2">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-electric-blue rounded-full" />
                      <span className="text-sm font-medium text-charcoal">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-electric-blue to-lime-green text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Play size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <span>Start Your Automation Journey</span>
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform duration-300" 
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
