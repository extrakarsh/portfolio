'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function EducationSection() {
  const education = [
    {
      degree: "B.E. in Computer Science Engineering",
      institution: "Canara Engineering College, Mangalore",
      details: "CGPA: 8.16",
      year: "2020 - 2024",
      icon: GraduationCap,
      color: "text-blue-600"
    },
    {
      degree: "PUC (PCMB)",
      institution: "St. Philomena PU College, Puttur",
      details: "75%",
      year: "2018 - 2020",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      degree: "High School",
      institution: "Vivekananda English Medium School, Puttur",
      details: "90%",
      year: "2016 - 2018",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl font-bold text-mirage mb-4">
            Educational Journey
          </h2>
          <p className="text-xl text-deep-sea-green max-w-2xl mx-auto">
            A strong foundation built through dedicated learning and academic excellence
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-deep-sea-green to-wild-sand h-full"
          />

          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute top-6 w-4 h-4 rounded-full bg-deep-sea-green border-4 border-wild-sand ${
                  index % 2 === 0 ? 'left-1/2 transform -translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'
                }`}
              />

              {/* Content Card */}
              <div className={`w-5/12 ${
                index % 2 === 0 ? 'mr-auto' : 'ml-auto'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  animate={{
                    borderRadius: [
                      "16px",
                      "20px 16px 20px 16px / 16px 20px 16px 20px",
                      "16px 20px 16px 20px / 20px 16px 20px 16px",
                      "16px"
                    ]
                  }}
                  transition={{
                    borderRadius: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="p-6 rounded-2xl glass-card relative overflow-hidden"
                >
                  {/* Morphing Background */}
                  <motion.div
                    animate={{
                      borderRadius: [
                        "16px",
                        "25px 15px 25px 15px / 15px 25px 15px 25px",
                        "15px 25px 15px 25px / 25px 15px 25px 15px",
                        "16px"
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-deep-sea-green/5 to-wild-sand/5 pointer-events-none"
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                    }`}
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <item.icon size={24} style={{ color: item.color }} />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                    <h3 className="font-playfair text-xl font-bold text-mirage mb-2">
                      {item.degree}
                    </h3>
                    <p className="text-deep-sea-green font-medium mb-2">
                      {item.institution}
                    </p>
                    <p className="text-navy text-sm mb-3">
                      {item.details}
                    </p>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-deep-sea-green/20 text-deep-sea-green rounded-full text-sm font-medium">
                      <span>{item.year}</span>
                    </div>
                  </div>

                  {/* Floating Element */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-deep-sea-green/10 pointer-events-none"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="p-8 rounded-2xl glass-effect max-w-3xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-4">
              Continuous Learning
            </h3>
            <p className="text-deep-sea-green leading-relaxed">
              Beyond formal education, I&apos;m constantly expanding my knowledge through online courses, 
              certifications, and hands-on projects. The tech world evolves rapidly, and I&apos;m committed 
              to staying at the forefront of innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
