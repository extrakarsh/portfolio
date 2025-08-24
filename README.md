# Digital Craftsman Portfolio

A sophisticated, modern portfolio website for a web designer and automation enthusiast specializing in n8n projects. This site demonstrates both design excellence and technical automation capabilities through dynamic 3D elements, smooth micro-interactions, and contemporary design patterns.

## ✨ Features

### 🎨 Design Excellence
- **Sophisticated Monochrome + Accent Color Palette**
  - Pure Black (#000000) and Pure White (#FFFFFF)
  - Electric Blue (#0066ff) for automation/tech elements
  - Warm Coral (#ff6b6b) for design-focused elements
  - Lime Green (#32d74b) for success states and n8n branding

- **Modern Typography System**
  - Playfair Display (headings, hero text) - elegant serif for sophistication
  - Inter (body text, navigation) - clean sans-serif for readability
  - JetBrains Mono (code snippets, technical elements)

### 🚀 Interactive 3D Elements
- **Three.js Integration** with React Three Fiber
- **Floating Geometric Wireframes** (cubes, spheres, torus)
- **Particle Systems** forming n8n workflow node connections
- **Interactive Skill Constellation** with floating nodes
- **3D Workflow Network** visualization for automation projects

### 🎭 Advanced Animations
- **Framer Motion** for smooth transitions and micro-interactions
- **GSAP** for complex timeline animations
- **Staggered Text Animations** with letter-by-letter reveals
- **3D Card Effects** with hover transformations
- **Morphing Border Animations** with color rotations

### 🎯 Theme Switching
- **Designer Mode** ↔ **Automation Mode** toggle
- **Dynamic Color Palette** changes
- **3D Element Transformations** based on theme
- **Content Adaptation** for different professional personas

### 📱 Responsive Design
- **Mobile-First Approach** with touch-optimized interactions
- **Progressive Enhancement** - core content loads first, 3D elements enhance
- **Performance Optimization** for mobile devices
- **Gesture Support** for mobile navigation

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14+** with App Router for optimal performance
- **React 18+** with TypeScript for type safety
- **Tailwind CSS** + custom CSS for advanced animations

### 3D Graphics & Animation
- **Three.js** with React Three Fiber (@react-three/fiber)
- **React Three Drei** for 3D utilities and controls
- **Framer Motion** for component animations
- **GSAP** for complex timeline animations

### Performance & UX
- **Lenis** for buttery smooth scrolling
- **React Spring** for physics-based animations
- **Custom Cursor** with magnetic effects
- **Smooth Scrolling** with momentum-based interactions

### Icons & Assets
- **Lucide React** for modern iconography
- **Google Fonts** integration (Playfair Display, Inter, JetBrains Mono)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Main page with theme switching
│   └── globals.css         # Global styles and design system
├── components/
│   ├── Navigation.tsx      # Sophisticated navigation with theme toggle
│   ├── CustomCursor.tsx    # Interactive custom cursor
│   ├── HeroSection.tsx     # 3D hero with floating shapes
│   ├── AboutSection.tsx    # Skills constellation and stats
│   ├── PortfolioSection.tsx # Bento box grid portfolio
│   ├── AutomationSection.tsx # n8n workflow showcases
│   ├── ServicesSection.tsx # Service offerings with 3D icons
│   ├── TestimonialsSection.tsx # Client testimonials carousel
│   ├── ContactSection.tsx  # Contact form with easter egg
│   └── ThemeToggle.tsx     # Theme switching component
```

## 🎨 Design System

### Color Variables
```css
:root {
  --color-primary-black: #000000;
  --color-primary-white: #ffffff;
  --color-charcoal: #1a1a1a;
  --color-medium-grey: #808080;
  --color-light-grey: #f5f5f5;
  --color-electric-blue: #0066ff;
  --color-warm-coral: #ff6b6b;
  --color-lime-green: #32d74b;
}
```

### Typography Scale
```css
h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
p { font-size: 1.125rem; }
```

### Animation Classes
- `.float` - Floating animation
- `.stagger-text` - Staggered text entrance
- `.morphing-border` - Morphing border effects
- `.card-3d` - 3D card transformations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🎯 Key Sections

### 1. Hero Section - "Digital Craftsman"
- Animated grid background with perspective
- 3D floating geometric wireframes
- Theme toggle between Designer/Automation modes
- Staggered letter animations

### 2. About Section - "The Intersection of Design & Automation"
- Split-screen layout with personal story
- Interactive 3D skill constellation
- Statistics counters with animations
- Live n8n workflow preview

### 3. Portfolio Section - "Visual Excellence"
- Bento box grid with varying card sizes
- 3D depth effects on hover
- Category filtering with smooth transitions
- Project showcase with technology tags

### 4. Automation Section - "Workflow Wizardry"
- Interactive 3D n8n workflow network
- ROI statistics and case studies
- Technology stack badges
- Success metrics display

### 5. Services Section - "What I Offer"
- Card-based service layout
- 3D rotating service icons
- Feature lists with animations
- Pricing hints without full disclosure

### 6. Testimonials Section - "Client Love"
- Rotating testimonial carousel
- 3D card flip effects
- Client avatars and ratings
- Project type categorization

### 7. Contact Section - "Let's Create Something Amazing"
- Minimal floating label form
- 3D abstract geometric background
- Multiple contact options
- Hidden n8n workflow easter egg

## 🎭 Easter Eggs & Hidden Features

### n8n Workflow Easter Egg
After submitting the contact form, users discover that the form was processed by an actual n8n workflow, demonstrating automation in action.

### Theme-Specific 3D Elements
Each theme (Designer/Automation) features different 3D elements, colors, and animations that reflect the professional focus.

### Magnetic Cursor Effects
Interactive elements gently pull the custom cursor toward them, creating engaging micro-interactions.

## 📱 Mobile Optimization

### Touch Interactions
- Hover effects replaced with tap interactions
- Simplified 3D scenes for mobile devices
- Touch-optimized navigation and gestures

### Performance Considerations
- Reduced particle counts on mobile
- Battery-conscious animation settings
- Progressive enhancement approach

## 🔧 Customization

### Theme Colors
Modify the color palette in `globals.css` and `tailwind.config.ts` to match your brand.

### 3D Elements
Adjust 3D scene complexity, particle counts, and animation speeds in individual component files.

### Content
Update project data, testimonials, and service offerings in the respective component files.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
The project is optimized for Next.js and can be deployed to any platform that supports it.

## 📊 Performance Metrics

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1

### Optimization Features
- Image optimization with Next.js
- Code splitting for 3D libraries
- Lazy loading of non-critical components
- Efficient animation rendering

## 🤝 Contributing

This is a portfolio project, but contributions to improve the codebase are welcome. Please ensure all animations and interactions maintain the sophisticated, professional aesthetic.

## 📄 License

This project is created for portfolio purposes. Feel free to use as inspiration for your own projects.

## 🙏 Acknowledgments

- **Pawel Gola** for design inspiration
- **Three.js** community for 3D graphics
- **Framer Motion** team for animation tools
- **n8n** for automation platform

---

**Digital Craftsman Portfolio** - Where Design Meets Automation Excellence 🎨⚡
