'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  theme: 'designer' | 'automation';
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  projectType: 'design' | 'automation' | 'both';
  delay: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    company: 'TechFlow Solutions',
    role: 'CEO',
    avatar: '/api/placeholder/100/100',
    content: 'The website redesign exceeded our expectations. Not only does it look stunning, but the user experience improvements have increased our conversion rate by 40%. The attention to detail and modern design approach perfectly represents our brand.',
    rating: 5,
    projectType: 'design',
    delay: 0.1
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    company: 'DataSync Inc.',
    role: 'Operations Director',
    avatar: '/api/placeholder/100/100',
    content: 'The n8n automation workflows have transformed our operations. What used to take our team 8 hours daily now runs automatically in 15 minutes. The ROI was immediate, and the system has been running flawlessly for 6 months.',
    rating: 5,
    projectType: 'automation',
    delay: 0.2
  },
  {
    id: '3',
    name: 'Emily Watson',
    company: 'Creative Studios',
    role: 'Marketing Manager',
    avatar: '/api/placeholder/100/100',
    content: 'Working with Digital Craftsman was a game-changer. They not only redesigned our website with a beautiful, modern aesthetic but also implemented automation that saves us hours every week. The combination of design excellence and technical expertise is rare to find.',
    rating: 5,
    projectType: 'both',
    delay: 0.3
  },
  {
    id: '4',
    name: 'David Kim',
    company: 'E-commerce Pro',
    role: 'Founder',
    avatar: '/api/placeholder/100/100',
    content: 'The automation consulting and implementation services were outstanding. They analyzed our processes, identified bottlenecks, and created custom solutions that have improved our efficiency by 300%. Highly recommended!',
    rating: 5,
    projectType: 'automation',
    delay: 0.4
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    company: 'Design Collective',
    role: 'Creative Director',
    avatar: '/api/placeholder/100/100',
    content: 'The design system they created for us is comprehensive and beautiful. It has streamlined our design process and ensured consistency across all our platforms. The documentation and implementation support made the transition seamless.',
    rating: 5,
    projectType: 'design',
    delay: 0.5
  }
];

export default function TestimonialsSection({ theme }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'design':
        return 'bg-warm-coral/20 text-warm-coral';
      case 'automation':
        return 'bg-electric-blue/20 text-electric-blue';
      case 'both':
        return 'bg-gradient-to-r from-warm-coral/20 to-electric-blue/20 text-charcoal';
      default:
        return 'bg-medium-grey/20 text-medium-grey';
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'design':
        return 'Design Project';
      case 'automation':
        return 'Automation Project';
      case 'both':
        return 'Design + Automation';
      default:
        return 'Project';
    }
  };

  return (
    <section 
      id="testimonials"
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
            Client Love
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            Don't just take my word for it. Here's what clients have to say 
            about their experience working with Digital Craftsman.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Main Testimonial */}
          <div className="relative h-96">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction === 1 ? 300 : -300,
                  rotateY: direction === 1 ? 45 : -45
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotateY: 0
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction === 1 ? -300 : 300,
                  rotateY: direction === 1 ? -45 : 45
                }}
                transition={{ 
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                className="absolute inset-0"
              >
                <div className="h-full p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6">
                    <Quote 
                      size={32} 
                      className={theme === 'designer' ? 'text-warm-coral' : 'text-electric-blue'} 
                    />
                  </div>

                  {/* Project Type Badge */}
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${getProjectTypeColor(testimonials[currentIndex].projectType)}`}>
                    {getProjectTypeLabel(testimonials[currentIndex].projectType)}
                  </div>

                  {/* Testimonial Content */}
                  <div className="mb-8">
                    <p className="text-lg text-charcoal leading-relaxed italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-electric-blue to-warm-coral">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonials[currentIndex].avatar})` }}
                      />
                    </div>
                    <div>
                      <h4 className="font-playfair text-lg font-semibold text-charcoal">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-medium-grey">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-6 left-6 flex items-center space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className="fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} className="text-charcoal" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ArrowRight size={20} className="text-charcoal" />
          </motion.button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mb-16">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-electric-blue scale-125' 
                  : 'bg-medium-grey hover:bg-charcoal'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-electric-blue mb-2">98%</div>
            <div className="text-medium-grey">Client Satisfaction</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-warm-coral mb-2">150+</div>
            <div className="text-medium-grey">Projects Completed</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-lime-green mb-2">95%</div>
            <div className="text-medium-grey">Repeat Clients</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="font-playfair text-subtitle font-semibold text-charcoal mb-4">
            Ready to Join the Success Stories?
          </h3>
          <p className="text-body text-medium-grey max-w-2xl mx-auto mb-8">
            Let's create something amazing together. Your project could be the next 
            success story featured here.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-primary-black text-primary-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Start Your Project</span>
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
