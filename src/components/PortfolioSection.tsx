'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';

interface PortfolioSectionProps {
  theme: 'designer' | 'automation';
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  size: 'small' | 'medium' | 'large';
  color: string;
  link: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Wastix – Garbage Collection App',
    category: 'Web Development',
    description: 'Built a web app to connect waste producers and collectors with real-time scheduling, improving sustainability and communication.',
    image: '/api/placeholder/600/400',
    technologies: ['Web Development', 'Real-time Scheduling', 'Sustainability'],
    size: 'large',
    color: '#ff6b6b',
    link: '#'
  },
  {
    id: '2',
    title: 'Bone Age Detection with Deep Learning',
    category: 'AI/ML',
    description: 'Developing a deep learning model to automate growth disorder diagnosis using X-ray image analysis.',
    image: '/api/placeholder/400/300',
    technologies: ['Deep Learning', 'Computer Vision', 'Medical AI', 'Python'],
    size: 'medium',
    color: '#32d74b',
    link: '#'
  }
];

const categories = ['All', 'Web Development', 'AI/ML'];

export default function PortfolioSection({ theme }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <section 
      id="portfolio"
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
            Visual Excellence
          </h2>
          <p className="text-body text-medium-grey max-w-3xl mx-auto">
            A curated collection of projects that showcase my passion for 
            creating beautiful, functional, and user-centered digital experiences.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-black text-primary-white shadow-lg'
                  : 'bg-white/80 text-charcoal hover:bg-white hover:shadow-md'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${getGridClass(project.size)}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/20 to-charcoal/40">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      backgroundColor: project.color + '20'
                    }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  {/* Category Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3 w-fit"
                  >
                    {project.category}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="font-playfair text-xl font-bold mb-2"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-sm text-white/80 mb-4 line-clamp-2"
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      <Eye size={16} />
                      <span>Preview</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white text-charcoal rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>View</span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredProject === project.id ? 1.02 : 1,
                    borderColor: hoveredProject === project.id ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-primary-black text-primary-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>View All Projects</span>
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
