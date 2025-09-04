'use client';

import { motion } from 'framer-motion';
import { Palette, Zap, Code, Layers, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  theme: 'designer' | 'automation';
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  features: string[];
  color: string;
  delay: number;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Web Design & Development',
    description: 'Modern, responsive websites that combine stunning aesthetics with exceptional functionality.',
    icon: Palette,
    features: ['UI/UX Design', 'Responsive Development', 'Performance Optimization', 'SEO Integration'],
    color: '#ff6b6b',
    delay: 0.1
  },
  {
    id: '2',
    title: 'Automation Consulting',
    description: 'Strategic guidance on implementing automation solutions that drive real business value.',
    icon: Zap,
    features: ['Process Analysis', 'ROI Assessment', 'Implementation Strategy', 'Training & Support'],
    color: '#0066ff',
    delay: 0.2
  },
  {
    id: '3',
    title: 'n8n Workflow Creation',
    description: 'Custom n8n workflows that automate complex business processes and integrate systems.',
    icon: Code,
    features: ['Custom Workflows', 'API Integration', 'Error Handling', 'Monitoring & Alerts'],
    color: '#32d74b',
    delay: 0.3
  },
  {
    id: '4',
    title: 'Design System Development',
    description: 'Comprehensive design systems that ensure consistency and scalability across platforms.',
    icon: Layers,
    features: ['Component Library', 'Design Tokens', 'Documentation', 'Implementation Guide'],
    color: '#ff6b6b',
    delay: 0.4
  }
];

export default function ServicesSection({ theme }: ServicesSectionProps) {
  return (
    <section 
      id="services"
      className="relative py-section overflow-hidden"
      style={{
        background: theme === 'designer' 
          ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)'
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
            What I Offer
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            Comprehensive solutions that bridge the gap between creative design 
            and technical automation, delivering results that exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: service.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-white/20"
            >
              {/* Service Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: service.color + '20' }}
              >
                <service.icon size={32} style={{ color: service.color }} />
              </motion.div>

              {/* Service Content */}
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                {service.title}
              </h3>
              
              <p className="text-body text-medium-grey mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: service.delay + 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="text-sm text-charcoal">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn inline-flex items-center space-x-2 text-sm font-medium transition-colors"
                style={{ color: service.color }}
              >
                <span>Learn More</span>
                <ArrowRight 
                  size={16} 
                  className="group-hover/btn:translate-x-1 transition-transform duration-300" 
                />
              </motion.button>

              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Pricing Hint Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 bg-gradient-to-r from-electric-blue/10 to-warm-coral/10 rounded-3xl"
        >
          <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-body text-medium-grey max-w-2xl mx-auto mb-6">
            Every project is unique, and I believe in providing custom solutions 
            that fit your specific needs and budget. Let&apos;s discuss your project 
            and find the perfect approach.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-primary-black text-primary-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Schedule a Consultation</span>
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
