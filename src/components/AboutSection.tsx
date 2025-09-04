'use client';

import { useRef, useState, useEffect } from 'react';
import { Code, Globe, Brain, Zap, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useParallax';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { elementRef: aboutRef, isIntersecting } = useIntersectionObserver(0.1);

  // Education data from resume
  const education = [
    {
      institution: "Canara Engineering College, Mangalore, India",
      degree: "Bachelor of Engineering in Computer Science",
      period: "2022 – Present",
      grade: "CGPA: 8.19",
      icon: GraduationCap
    },
    {
      institution: "St. Philomena PU College, Puttur, India",
      degree: "PUC (PCMB)",
      period: "2020 – 2022",
      grade: "Grade: 75%",
      icon: BookOpen
    },
    {
      institution: "Vivekananda English Medium School, Puttur, India",
      degree: "SSLC",
      period: "2010 – 2020",
      grade: "Grade: 90%",
      icon: Award
    }
  ];

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  const interests = [
    { icon: Code, title: 'Frontend Development', description: 'Building responsive, user-friendly interfaces with HTML, CSS, and JavaScript' },
    { icon: Globe, title: 'React.js', description: 'Creating dynamic web applications with modern React practices' },
    { icon: Brain, title: 'Problem Solving', description: 'Tackling complex challenges with creative and efficient solutions' },
    { icon: Zap, title: 'Version Control', description: 'Collaborative development using Git and GitHub workflows' },
  ];

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          ref={aboutRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl font-bold text-mirage mb-4">
            About Me
          </h2>
          <p className="text-xl text-deep-sea-green max-w-3xl mx-auto">
            A passionate Computer Science student with a foundation in frontend development 
            and a drive to create innovative solutions that make a real impact.
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="font-playfair text-3xl font-bold text-mirage mb-8 text-center">
            Education
          </h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {education.map((edu, index) => {
              const IconComponent = edu.icon;
              return (
                <div
                  key={edu.institution}
                  className={`p-6 rounded-2xl glass-card gradient-border transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <IconComponent size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-lg font-semibold text-mirage">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-mirage/70">{edu.period}</p>
                    </div>
                  </div>
                  <p className="text-mirage font-medium mb-2">{edu.institution}</p>
                  <p className="text-indigo-600 font-semibold">{edu.grade}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Side - Personal Story */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="font-playfair text-2xl font-semibold text-mirage">
              My Journey
            </h3>
            
            <div className="space-y-4">
              <p className="text-navy leading-relaxed">
                I&apos;m Akarsh Rai B, a Computer Science Engineering student at Canara Engineering College, 
                Mangalore. With a CGPA of 8.19, I&apos;ve built a strong foundation in programming and 
                problem-solving.
              </p>
              
              <p className="text-navy leading-relaxed">
                My journey in tech started with basic programming concepts and has evolved into 
                building responsive web applications using HTML, CSS, and JavaScript. I&apos;m particularly 
                passionate about React.js and creating user-friendly interfaces.
              </p>
              
              <p className="text-navy leading-relaxed">
                I believe in collaborative development and have experience with Git version control 
                and team workflows. I&apos;m always eager to learn new technologies and contribute to 
                meaningful projects.
              </p>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="p-8 rounded-2xl glass-effect">
              <div className="grid grid-cols-2 gap-6">
                {interests.map((interest, index) => {
                  const IconComponent = interest.icon;
                  return (
                    <div
                      key={interest.title}
                      className={`text-center p-4 rounded-xl bg-wild-sand/30 relative overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-100 flex items-center justify-center relative hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-indigo-600" />
                      </div>
                      <h4 className="font-playfair text-sm font-semibold text-mirage mb-2">
                        {interest.title}
                      </h4>
                      <p className="text-xs text-navy leading-tight">
                        {interest.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="p-8 rounded-2xl glass-effect max-w-4xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-6">
              What Drives Me
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-playfair text-lg font-semibold text-mirage mb-2">
                  Problem Solving
                </h4>
                <p className="text-deep-sea-green text-sm">
                  I love tackling complex challenges and finding elegant solutions
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-playfair text-lg font-semibold text-mirage mb-2">
                  Continuous Learning
                </h4>
                <p className="text-deep-sea-green text-sm">
                  Always exploring new technologies and expanding my skill set
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-playfair text-lg font-semibold text-mirage mb-2">
                  Collaboration
                </h4>
                <p className="text-deep-sea-green text-sm">
                  Working effectively in teams and contributing to shared goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
