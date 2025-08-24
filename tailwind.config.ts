import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Color Palette - Inspired by Flowblox Design
        navy: '#2F4156',
        teal: '#567C8D',
        'sky-blue': '#C8D9E6',
        beige: '#F5EFEB',
        white: '#FFFFFF',
        // Legacy colors for compatibility
        primary: {
          black: '#2F4156',
          white: '#FFFFFF',
        },
        charcoal: '#2F4156',
        'medium-grey': '#567C8D',
        'light-grey': '#F5EFEB',
        'electric-blue': '#567C8D',
        'warm-coral': '#C8D9E6',
        'lime-green': '#567C8D',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'runiga': ['Runiga', 'serif'],
        'gadianio': ['Gadianio', 'serif'],
        'sellendra': ['Sellendra', 'serif'],
        'mallong': ['Mallong', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1' }],
        'section': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2' }],
        'subtitle': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
      },
      spacing: {
        'section': 'var(--section-padding)',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'container': 'var(--container-max-width)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'stagger-in': 'stagger-in 0.6s ease-out forwards',
        'border-rotate': 'border-rotate 3s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        staggerIn: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'border-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        'cursor': '9999',
        'modal': '9998',
        'overlay': '9997',
        'tooltip': '9996',
      },
    },
  },
  plugins: [],
};

export default config;
