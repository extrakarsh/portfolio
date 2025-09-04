'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificatesSection() {
  const certificates = [
    {
      title: "Microsoft Azure Fundamentals Certification",
      image: "/azure_certificate.png",
      description: "Microsoft Azure cloud computing fundamentals and services",
      year: "2024",
      link: "#"
    },
    {
      title: "No Code AI Agent Builder (n8n)",
      image: "/n8n_certificate.png", 
      description: "Building AI-powered automation workflows with n8n",
      year: "2024",
      link: "#"
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-white">
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
            Certifications & Achievements
          </h2>
          <p className="text-xl text-deep-sea-green max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <motion.div
                animate={{
                  borderRadius: [
                    "16px",
                    "20px 16px 20px 16px / 16px 20px 16px 20px",
                    "16px 20px 16px 20px / 20px 16px 20px 16px",
                    "16px"
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="p-6 rounded-2xl glass-card h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Morphing Border */}
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
                    delay: 1
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-deep-sea-green/20 pointer-events-none"
                />

                {/* Certificate Image */}
                <div className="mb-6 relative overflow-hidden rounded-xl">
                  <motion.img
                    src={certificate.image}
                    alt={certificate.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mirage/20 to-transparent rounded-xl" />
                </div>

                {/* Certificate Content */}
                <div className="mb-6">
                  <h3 className="font-playfair text-xl font-bold text-mirage mb-3 group-hover:text-deep-sea-green transition-colors">
                    {certificate.title}
                  </h3>
                  <p className="text-navy leading-relaxed mb-4">
                    {certificate.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-deep-sea-green/20 text-deep-sea-green rounded-full text-sm font-medium"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Award size={16} />
                    </motion.div>
                    <span>{certificate.year}</span>
                  </motion.div>
                </div>

                {/* View Certificate Button */}
                <motion.a
                  href={certificate.link}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-mirage text-wild-sand rounded-lg font-medium hover:bg-deep-sea-green transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  <span>View Certificate</span>
                </motion.a>

                {/* Floating Decorative Element */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-deep-sea-green/10 pointer-events-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="p-8 rounded-2xl glass-effect max-w-3xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-deep-sea-green leading-relaxed">
              I&apos;m constantly expanding my knowledge through certifications, online courses, and hands-on projects. 
              These credentials represent my commitment to staying current with the latest technologies and best practices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
