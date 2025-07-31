'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { techStack, TechItem } from '@/lib/data/techStack';

interface TechRiverProps {
  className?: string;
}

export default function TechRiver({ className = '' }: TechRiverProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Flatten all tech items and add more diverse technologies
  const techItems: (TechItem & { category: string })[] = [
    // Blockchain technologies
    ...techStack.blockchain.map(tech => ({ 
      ...tech, 
      category: 'blockchain'
    })),
    // Frontend technologies (filter out duplicates)
    ...techStack.frontend
      .filter(tech => !techStack.blockchain.some(b => b.name === tech.name))
      .map(tech => ({ 
        ...tech, 
        category: 'frontend'
      })),
    // Backend technologies (filter out duplicates)
    ...techStack.backend
      .filter(tech => 
        !techStack.blockchain.some(b => b.name === tech.name) &&
        !techStack.frontend.some(f => f.name === tech.name)
      )
      .map(tech => ({ 
        ...tech, 
        category: 'backend'
      })),
    // Additional technologies (using existing logos or creating new entries)
    { name: 'GitHub Copilot', icon: '🤖', logo: '/logos/github-copilot.svg', category: 'ai' },
    { name: 'ChatGPT', icon: '💬', logo: '/logos/chatgpt.svg', category: 'ai' },
    { name: 'Claude', icon: '🧠', logo: '/logos/claude.svg', category: 'ai' },
  ];

  // Distribute techs across streams alternating to avoid adjacency
  const allTechs = techItems.map((tech, index) => ({
    ...tech,
    streamIndex: index % 2
  }));

  // Create 2 parallel streams for the river effect
  const streams = Array.from({ length: 2 }, (_, streamIndex) => 
    allTechs.filter(tech => tech.streamIndex === streamIndex)
  );

  // Color themes for different categories
  const getCategoryColor = (category: string) => {
    const colors = {
      blockchain: 'from-yellow-400 to-orange-500',
      frontend: 'from-blue-400 to-cyan-500', 
      backend: 'from-green-400 to-emerald-500',
      ai: 'from-purple-400 to-pink-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  if (!mounted) {
    return <div className={`h-96 ${className}`} />;
  }

  return (
    <section className={`relative py-24 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20'
          : 'bg-gradient-to-br from-slate-900 via-blue-950/30 to-purple-950/20'
      }`}>
        {/* Flowing background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            {/* Flowing river paths */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${50 + i * 40} Q250,${30 + i * 40 + Math.sin(i) * 20} 500,${50 + i * 40} T1000,${50 + i * 40}`}
                fill="none"
                stroke="url(#riverGradient)"
                strokeWidth="2"
                opacity="0.6"
                animate={{
                  d: [
                    `M0,${50 + i * 40} Q250,${30 + i * 40 + Math.sin(i) * 20} 500,${50 + i * 40} T1000,${50 + i * 40}`,
                    `M0,${50 + i * 40} Q250,${70 + i * 40 + Math.sin(i + 1) * 20} 500,${50 + i * 40} T1000,${50 + i * 40}`,
                    `M0,${50 + i * 40} Q250,${30 + i * 40 + Math.sin(i + 2) * 20} 500,${50 + i * 40} T1000,${50 + i * 40}`
                  ]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className={`p-8 rounded-3xl ${
              theme === 'theme-light' 
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/25' 
                : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/40'
            }`}>
              <span className="text-6xl text-white">🌈</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className={`text-5xl font-light mb-6 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Technology <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">River</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A flowing showcase of all the technologies I use to build amazing digital experiences
          </motion.p>
        </div>

        {/* Tech River Streams */}
        <div className="relative h-96 w-full max-w-7xl mx-auto overflow-hidden">
          {streams.map((streamTechs, streamIndex) => (
            <div 
              key={streamIndex}
              className="absolute w-full"
              style={{ 
                top: `${streamIndex * 50}%`,
                height: '40%'
              }}
            >
              {/* Stream background flow */}
              <motion.div
                className={`absolute inset-0 rounded-full opacity-10 ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200'
                    : 'bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800'
                }`}
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Flowing tech logos */}
              <div className="relative h-full flex items-center">
                {/* Create multiple copies for seamless loop */}
                {Array.from({ length: 3 }).map((_, copyIndex) => (
                  <motion.div
                    key={copyIndex}
                    className="absolute flex items-center"
                    animate={{
                      x: [`${copyIndex * 100}%`, `${(copyIndex - 1) * 100}%`],
                    }}
                    transition={{
                      duration: 20 + streamIndex * 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      left: 0,
                    }}
                  >
                    {streamTechs.map((tech, techIndex) => (
                      <motion.div
                        key={`${tech.name}-${copyIndex}`}
                        className={`relative group cursor-pointer mx-6 ${
                          techIndex === streamTechs.length - 1 ? 'mr-12' : ''
                        }`}
                        whileHover={{ 
                          scale: 1.15, 
                          zIndex: 10,
                          y: -10 
                        }}
                        initial={{ 
                          opacity: 0, 
                          scale: 0.5
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1
                        }}
                        transition={{
                          opacity: { duration: 0.6, delay: techIndex * 0.1 },
                          scale: { duration: 0.6, delay: techIndex * 0.1 }
                        }}
                      >
                        {/* Tech logo container */}
                        <div className={`relative p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                          theme === 'theme-light'
                            ? 'bg-white/80 border-white/50 group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-xl'
                            : 'bg-slate-800/80 border-slate-700/50 group-hover:bg-slate-800 group-hover:border-slate-600 group-hover:shadow-xl'
                        }`}>
                          {/* Logo */}
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <img 
                              src={tech.logo} 
                              alt={tech.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback to emoji if logo fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const nextSibling = target.nextElementSibling;
                                if (nextSibling && nextSibling instanceof HTMLElement) {
                                  nextSibling.style.display = 'block';
                                }
                              }}
                            />
                            <span className="text-2xl hidden">{tech.icon}</span>
                          </div>

                          {/* Hover tooltip */}
                          <motion.div
                            className={`absolute ${
                              streamIndex === 0 ? 'top-full mt-4' : '-top-16'
                            } left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
                              theme === 'theme-light'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-900'
                            } shadow-lg opacity-0 group-hover:opacity-100 z-50`}
                            initial={{ scale: 0.8, y: streamIndex === 0 ? -10 : 10 }}
                            whileHover={{ scale: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.name}
                            <div className={`absolute ${
                              streamIndex === 0 ? 'bottom-full' : 'top-full'
                            } left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                              theme === 'theme-light'
                                ? streamIndex === 0 
                                  ? 'border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900'
                                  : 'border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'
                                : streamIndex === 0
                                  ? 'border-l-4 border-r-4 border-b-4 border-transparent border-b-white'
                                  : 'border-l-4 border-r-4 border-t-4 border-transparent border-t-white'
                            }`} />
                          </motion.div>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}