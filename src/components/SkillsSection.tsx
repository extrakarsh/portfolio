'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  GitBranch, 
  Palette, 
  Monitor, 
  MessageSquare, 
  Users, 
  Target,
  Zap
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useParallax';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { elementRef: skillsRef, isIntersecting } = useIntersectionObserver(0.1);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "HTML5", icon: Code, color: "text-orange-600" },
        { name: "CSS3", icon: Code, color: "text-blue-600" },
        { name: "JavaScript", icon: Code, color: "text-yellow-600" },
        { name: "React.js", icon: Globe, color: "text-cyan-600" },
        { name: "Responsive Design", icon: Monitor, color: "text-green-600" }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: Code, color: "text-blue-600" },
        { name: "Python", icon: Code, color: "text-green-600" }
      ]
    },
    {
      title: "Version Control & Tools",
      skills: [
        { name: "Git", icon: GitBranch, color: "text-orange-600" },
        { name: "GitHub", icon: GitBranch, color: "text-gray-800" },
        { name: "VS Code", icon: Code, color: "text-blue-500" },
        { name: "Figma", icon: Palette, color: "text-purple-500" },
        { name: "Framer", icon: Palette, color: "text-pink-500" },
        { name: "n8n", icon: Zap, color: "text-purple-600" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: Database, color: "text-blue-500" },
        { name: "PostgreSQL", icon: Database, color: "text-blue-600" }
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Communication", icon: MessageSquare, color: "text-green-600" },
        { name: "Leadership", icon: Users, color: "text-blue-600" },
        { name: "Problem-Solving", icon: Target, color: "text-red-600" },
        { name: "Adaptability", icon: Zap, color: "text-yellow-600" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-mirage/80 max-w-2xl mx-auto">
            A comprehensive toolkit of technical and soft skills that drive innovation and problem-solving
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`p-6 rounded-2xl glass-card gradient-border hover:shadow-xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="font-playfair text-xl font-bold text-mirage mb-6 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center text-center p-3 rounded-xl bg-white/30 hover:bg-white/40 backdrop-blur-md transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-2 hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-indigo-500" />
                      </div>
                      <span className="text-sm font-medium text-mirage">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Info */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="p-8 rounded-2xl glass-effect gradient-border max-w-4xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-4">
              Languages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['English', 'Kannada', 'Tulu', 'Hindi'].map((language) => (
                <span
                  key={language}
                  className="px-4 py-2 bg-white/40 backdrop-blur-md text-mirage rounded-full font-medium border border-white/50 hover:scale-105 transition-transform duration-300"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
