'use client';

import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '../hooks/useParallax';

export default function ProjectsSection() {
  const [activeImages, setActiveImages] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);
  const { elementRef: projectsRef, isIntersecting } = useIntersectionObserver(0.1);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const projects = [
    {
      title: "Wastix – Garbage Collection App",
      year: "2024",
      description: "Designed a responsive web app UI to connect waste producers and collectors. Implemented backend scheduling and ensured consistent layouts across devices.",
      technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
      status: "Completed",
      link: "#",
      github: "#",
      images: [
        "/wastix-1.jpg",
        "/wastix-2.jpg", 
        "/wastix-3.jpg"
      ]
    },
    {
      title: "Truck Bidding System",
      year: "2025",
      description: "Developed a real-time bidding platform for logistics with responsive dashboards. Integrated APIs for smooth client-server interaction and optimized UI for high concurrency.",
      technologies: ["React.js", "Node.js", "PostgreSQL", "Git"],
      status: "Completed",
      link: "#",
      github: "#",
      images: [
        "/truck-1.jpg",
        "/truck-2.jpg",
        "/truck-3.jpg"
      ]
    },
    {
      title: "Bone Age Detection Using Deep Learning",
      year: "2025",
      description: "Working on a CNN-based system (Xception model) to estimate bone age from pediatric X-rays. Applying data augmentation and exploring frontend visualization for medical staff.",
      technologies: ["Python", "TensorFlow/Keras", "OpenCV", "CNN"],
      status: "Ongoing",
      link: "#",
      github: "#",
      images: [
        "/bone-age-1.jpg",
        "/bone-age-2.jpg",
        "/bone-age-3.jpg"
      ]
    }
  ];

  const handleImageSwitch = (projectTitle: string, imageIndex: number) => {
    setActiveImages(prev => ({
      ...prev,
      [projectTitle]: imageIndex
    }));
  };

  const getActiveImageIndex = (projectTitle: string) => {
    return activeImages[projectTitle] || 0;
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          ref={projectsRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-mirage/80 max-w-2xl mx-auto">
            Showcasing innovative solutions that combine technology with real-world impact
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-6 rounded-2xl glass-card gradient-border h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-mirage mb-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-mirage/70">
                      <Calendar size={16} />
                      <span>{project.year}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-white/40 backdrop-blur-md hover:scale-110 transition-transform duration-300">
                    <Code size={20} className="text-indigo-500" />
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-mirage leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Image Carousel */}
                <div className="mb-6 relative overflow-hidden rounded-xl bg-white/30">
                  <div className="aspect-video relative group/carousel">
                    {project.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ${
                          imgIndex === getActiveImageIndex(project.title) ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${imgIndex + 1}`}
                          fill
                          className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                          style={{
                            filter: 'contrast(1.05) saturate(1.1)',
                          }}
                        />
                      </div>
                    ))}
                    
                    {/* Hover Overlay with Image Navigation */}
                    <div className="absolute inset-0 bg-black/0 group-hover/carousel:bg-black/10 transition-all duration-300 rounded-xl">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-2">
                          {project.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                                imgIndex === getActiveImageIndex(project.title) 
                                  ? 'bg-white scale-125' 
                                  : 'bg-white/60'
                              }`}
                              onClick={() => handleImageSwitch(project.title, imgIndex)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Apple-style Image Counter */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-xs font-medium opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                      {getActiveImageIndex(project.title) + 1} of {project.images.length}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:bg-black/40"
                      onClick={() => {
                        const currentIndex = getActiveImageIndex(project.title);
                        const newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
                        handleImageSwitch(project.title, newIndex);
                      }}
                    >
                      ←
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:bg-black/40"
                      onClick={() => {
                        const currentIndex = getActiveImageIndex(project.title);
                        const newIndex = (currentIndex + 1) % project.images.length;
                        handleImageSwitch(project.title, newIndex);
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/50 backdrop-blur-md text-mirage text-xs rounded-full border border-white/50 hover:scale-105 transition-transform duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full animate-pulse ${
                        project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    />
                    <span className="text-sm text-mirage/70">{project.status}</span>
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex space-x-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 premium-btn rounded-full hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/70 text-mirage rounded-full font-medium hover:bg-white/80 backdrop-blur-md transition-all duration-300 border border-white/60 hover:scale-105 hover:-translate-y-1"
                  >
                    <ExternalLink size={16} />
                    <span>View Project</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-8 rounded-2xl glass-effect gradient-border max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-4">
              More Projects Coming Soon
            </h3>
            <p className="text-mirage/80 mb-6">
              I&apos;m constantly working on new ideas and solutions. Check back for updates!
            </p>
            <a
              href="https://github.com/extrakarsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 premium-btn rounded-full hover:scale-105 transition-transform duration-300"
            >
              <Github size={20} />
              <span>Visit My GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
