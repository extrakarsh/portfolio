'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const handleContactClick = (contact: any) => {
    if (contact.label === 'Email' || contact.label === 'Phone') {
      // Copy to clipboard for email and phone
      navigator.clipboard.writeText(contact.value).then(() => {
        alert(`✅ ${contact.label} copied to clipboard!\n\n${contact.label}: ${contact.value}`);
      }).catch(() => {
        // Fallback if clipboard fails
        prompt(`Copy this ${contact.label.toLowerCase()}:`, contact.value);
      });
    } else {
      // Open link for GitHub and LinkedIn
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'akarshraib8@gmail.com',
      link: 'mailto:akarshraib8@gmail.com',
      color: 'text-red-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8861716335',
      link: 'tel:+918861716335',
      color: 'text-green-500'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/extrakarsh',
      link: 'https://github.com/extrakarsh',
      color: 'text-gray-800'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/akarshraib',
      link: 'https://linkedin.com/in/akarshraib',
      color: 'text-blue-600'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-mirage/80 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations, and interesting projects
          </p>
        </motion.div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.button
                  onClick={() => handleContactClick(contact)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="block p-6 rounded-2xl glass-card gradient-border hover:shadow-xl transition-all duration-300 relative overflow-hidden w-full"
                >
                  {/* Morphing Background */}
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
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none"
                  />

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center relative"
                  >
                    <motion.div
                      animate={{
                        borderRadius: ["50%", "40% 60% 60% 40% / 40% 40% 60% 60%", "50%"]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-indigo-500/10"
                    />
                    <IconComponent size={28} className="text-indigo-500" />
                  </motion.div>
                  <h3 className="font-playfair text-lg font-bold text-mirage mb-2">
                    {contact.label}
                  </h3>
                  <p className="text-mirage/80 font-medium">
                    {contact.value}
                  </p>

                  {/* Floating Element */}
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-3 right-3 w-4 h-4 rounded-full bg-indigo-500/10 pointer-events-none"
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="p-8 rounded-2xl glass-effect gradient-border max-w-3xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-mirage mb-4">
              Let&apos;s Work Together
            </h3>
            <p className="text-mirage/80 leading-relaxed mb-6">
              Whether you have a project in mind, want to discuss potential opportunities, 
              or just want to say hello, I&apos;d love to hear from you. 
              Feel free to reach out through any of the channels above.
            </p>
            <motion.a
              href="mailto:akarshraib8@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 premium-btn rounded-full"
            >
              <Mail size={20} />
              <span>Send Message</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
