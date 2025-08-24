'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Mail, Calendar, MessageCircle, Zap, ArrowRight, Check } from 'lucide-react';
import * as THREE from 'three';

interface ContactSectionProps {
  theme: 'designer' | 'automation';
}

// 3D Abstract Geometric Shapes Component
function AbstractShapes({ theme }: { theme: 'designer' | 'automation' }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI / 6;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Floating Cubes */}
      <Float speed={1} floatIntensity={0.5}>
        <mesh position={[-2, 1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#ff6b6b' : '#0066ff'} 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.5} floatIntensity={0.7}>
        <mesh position={[2, -1, 1]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#32d74b' : '#ff6b6b'} 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating Spheres */}
      <Float speed={2} floatIntensity={0.4}>
        <mesh position={[0, 2, -1]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial 
            color={theme === 'designer' ? '#0066ff' : '#32d74b'} 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Connection Lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-2, 1, 0, 2, -1, 1])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={theme === 'designer' ? '#ff6b6b' : '#0066ff'} 
          transparent 
          opacity={0.2}
        />
      </line>
    </group>
  );
}

export default function ContactSection({ theme }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggStep, setEasterEggStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show easter egg after successful submission
    setShowEasterEgg(true);
    setIsSubmitting(false);
  };

  const easterEggSteps = [
    "🎉 Form submitted successfully!",
    "🤖 But wait... there's more!",
    "⚡ This form was actually processed by an n8n workflow!",
    "🔄 The data flowed through multiple nodes:",
    "   📧 Email capture → 📊 Database → 📱 Slack notification",
    "   → 📈 Analytics → 📋 CRM update",
    "🚀 Automation in action!",
    "💡 Want to see how it works? Let's build one for you!"
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send me a direct message',
      action: 'hello@digitalcraftsman.com',
      color: '#ff6b6b'
    },
    {
      icon: Calendar,
      title: 'Schedule a Call',
      description: 'Book a consultation',
      action: 'Book Now',
      color: '#0066ff'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant responses',
      action: 'Start Chat',
      color: '#32d74b'
    }
  ];

  return (
    <section 
      id="contact"
      className="relative py-section overflow-hidden"
      style={{
        background: theme === 'designer' 
          ? 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
          : 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)'
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
            Let's Create Something Amazing
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            Ready to transform your digital presence or automate your processes? 
            Let's discuss your project and bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-8">
                Start the Conversation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-transparent border-2 border-medium-grey/30 rounded-xl focus:border-electric-blue transition-colors duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-4 text-medium-grey transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-electric-blue peer-[-webkit-autofill]:-top-2 peer-[-webkit-autofill]:left-2 peer-[-webkit-autofill]:text-xs peer-[-webkit-autofill]:text-electric-blue">
                    Full Name
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-transparent border-2 border-medium-grey/30 rounded-xl focus:border-electric-blue transition-colors duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-4 text-medium-grey transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-electric-blue peer-[-webkit-autofill]:-top-2 peer-[-webkit-autofill]:left-2 peer-[-webkit-autofill]:text-xs peer-[-webkit-autofill]:text-electric-blue">
                    Email Address
                  </label>
                </div>

                {/* Company Field */}
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-transparent border-2 border-medium-grey/30 rounded-xl focus:border-electric-blue transition-colors duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-4 text-medium-grey transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-electric-blue peer-[-webkit-autofill]:-top-2 peer-[-webkit-autofill]:left-2 peer-[-webkit-autofill]:text-xs peer-[-webkit-autofill]:text-electric-blue">
                    Company (Optional)
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-4 bg-transparent border-2 border-medium-grey/30 rounded-xl focus:border-electric-blue transition-colors duration-300 peer resize-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-4 text-medium-grey transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-electric-blue peer-[-webkit-autofill]:-top-2 peer-[-webkit-autofill]:left-2 peer-[-webkit-autofill]:text-xs peer-[-webkit-autofill]:text-electric-blue">
                    Tell me about your project
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-electric-blue to-lime-green text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <ArrowRight size={20} />
                    </div>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Easter Egg Modal */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10"
                >
                  <div className="text-center text-white p-8 max-w-md">
                    <Zap size={48} className="text-electric-blue mx-auto mb-4" />
                    <div className="space-y-4">
                      {easterEggSteps.slice(0, easterEggStep + 1).map((step, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.5 }}
                          className="text-sm"
                        >
                          {step}
                        </motion.p>
                      ))}
                    </div>
                    
                    {easterEggStep < easterEggSteps.length - 1 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={() => setEasterEggStep(prev => prev + 1)}
                        className="mt-6 px-6 py-3 bg-electric-blue text-white rounded-lg hover:bg-electric-blue/80 transition-colors"
                      >
                        Next
                      </motion.button>
                    )}
                    
                    {easterEggStep === easterEggSteps.length - 1 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setShowEasterEgg(false)}
                        className="mt-6 px-6 py-3 bg-warm-coral text-white rounded-lg hover:bg-warm-coral/80 transition-colors"
                      >
                        Amazing! Let's Talk
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Options & 3D Background */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Options */}
            <div className="space-y-6">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: option.color + '20' }}
                    >
                      <option.icon size={24} style={{ color: option.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-playfair text-lg font-semibold text-charcoal mb-1">
                        {option.title}
                      </h4>
                      <p className="text-sm text-medium-grey mb-2">
                        {option.description}
                      </p>
                      <span className="text-sm font-medium" style={{ color: option.color }}>
                        {option.action}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3D Background Visualization */}
            <div className="h-64 bg-white/50 rounded-2xl overflow-hidden shadow-lg">
              <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <AbstractShapes theme={theme} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={0.3}
                />
              </Canvas>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="p-8 bg-gradient-to-r from-electric-blue/10 to-warm-coral/10 rounded-3xl">
            <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-body text-medium-grey max-w-2xl mx-auto mb-6">
              Whether you need a stunning website, powerful automation, or both, 
              I'm here to help you achieve your goals.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-primary-black text-primary-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>Let's Get Started</span>
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
