'use client';

import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { techStack, TechItem } from '@/lib/data/techStack';

interface TechRiverProps {
  className?: string;
}

const TechRiver = memo(function TechRiver({ className = '' }: TechRiverProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [showList, setShowList] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stable path data to avoid hydration issues
  const generatePathData = (index: number, phase: number = 0) => {
    // Ensure all values are numbers and not NaN
    const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0;
    const safePhase = typeof phase === 'number' && !isNaN(phase) ? phase : 0;
    
    const baseY = 50 + safeIndex * 40;
    const controlY = 30 + safeIndex * 40 + Math.sin(safeIndex + safePhase) * 20;
    
    // Ensure all calculated values are valid numbers
    const safeBaseY = !isNaN(baseY) ? baseY : 50;
    const safeControlY = !isNaN(controlY) ? controlY : 30;
    
    return `M0,${safeBaseY} Q250,${safeControlY} 500,${safeBaseY} T1000,${safeBaseY}`;
  };

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
    <>
      <style jsx>{`
        @keyframes flow-right {
          0% { transform: translateX(150%); }
          100% { transform: translateX(-150%); }
        }
        .animate-flow-right {
          animation: flow-right linear infinite;
          z-index: 1;
          position: absolute;
          display: flex;
          align-items: center;
        }
        .tech-item {
          z-index: 2;
          position: relative;
        }
        .tech-item:hover {
          z-index: 10;
        }
      `}</style>
      <section className={`relative py-24 overflow-hidden w-full ${className}`}>
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
                d={generatePathData(i, 0)}
                fill="none"
                stroke="url(#riverGradient)"
                strokeWidth="2"
                opacity="0.6"
                animate={mounted ? {
                  d: [
                    generatePathData(i, 0),
                    generatePathData(i, 1),
                    generatePathData(i, 2)
                  ]
                } : {}}
                initial={{
                  d: generatePathData(i, 0)
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
        {/* Section Toggle Button - Top Right Corner */}
        <motion.button
          onClick={() => setShowList(!showList)}
          className={`absolute top-12 right-12 z-20 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-sm ${
            theme === 'theme-light'
              ? 'bg-white/80 border-gray-300 hover:bg-white hover:border-gray-400 text-gray-700 shadow-lg hover:shadow-xl'
              : 'bg-slate-800/80 border-slate-600 hover:bg-slate-800 hover:border-slate-500 text-gray-200 shadow-lg hover:shadow-xl'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-sm font-medium">
            <span>{showList ? t('skills.techStack.riverView') : t('skills.techStack.listView')}</span>
          </div>
        </motion.button>

        {/* Header */}
        <div className="text-center mb-16 container-custom mx-auto px-6">
          <motion.h2 
            className={`text-5xl font-light mb-6 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('skills.techStack.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('skills.techStack.description')}
          </motion.p>
        </div>

        {/* Toggle between River View and List View */}
        {!showList ? (
          /* Tech River Streams - Full Width */
          <div className="relative h-96 w-full overflow-hidden">
            {streams.map((streamTechs, streamIndex) => (
              <div 
                key={streamIndex}
                className="absolute w-full"
                style={{ 
                  top: `${streamIndex * 50}%`,
                  height: '40%'
                }}
              >
                {/* Stream background flow - static for testing */}
                <div
                  className={`absolute inset-0 rounded-full opacity-10 ${
                    theme === 'theme-light' 
                      ? 'bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200'
                      : 'bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800'
                  }`}
                />

                {/* Flowing tech logos */}
                <div className="relative h-full flex items-center">
                  {/* Create multiple copies for seamless loop */}
                  {Array.from({ length: 3 }).map((_, copyIndex) => (
                    <div
                      key={copyIndex}
                      className="absolute flex items-center animate-flow-right"
                      style={{
                        left: 0,
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        animationDelay: `${copyIndex * -20}s`,
                        animationDuration: '60s'
                      }}
                    >
                      {streamTechs.map((tech, techIndex) => (
                        <motion.div
                          key={`${tech.name}-${copyIndex}`}
                          className={`relative group cursor-pointer mx-6 tech-item ${
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
                            opacity: { duration: 0.6 },
                            scale: { duration: 0.6 }
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
                              <Image 
                                src={tech.logo} 
                                alt={tech.name}
                                width={64}
                                height={64}
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Technology List Table */
          <motion.div 
            className="w-full max-w-6xl mx-auto container-custom px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`rounded-2xl border backdrop-blur-sm ${
              theme === 'theme-light'
                ? 'bg-white/80 border-white/50 shadow-xl'
                : 'bg-slate-800/80 border-slate-700/50 shadow-xl'
            }`}>
              {/* Table Header */}
              <div className={`px-6 py-4 border-b ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'
                  : 'bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-slate-700'
              }`}>
                <h3 className={`text-2xl font-bold ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  {t('skills.techStack.count', { count: techItems.length })}
                </h3>
              </div>

              {/* Table Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
                {['blockchain', 'frontend', 'backend', 'ai'].map((category) => (
                  <div key={category} className={`p-4 rounded-xl ${
                    theme === 'theme-light' ? 'bg-gray-50/50' : 'bg-slate-900/30'
                  }`}>
                    {/* Category Header */}
                    <div className="mb-4">
                      <h4 className={`text-lg font-semibold capitalize mb-2 ${
                        theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                      }`}>
                        {category === 'ai' ? 'AI Tools' : category}
                      </h4>
                      <div className={`w-full h-1 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`} />
                    </div>

                    {/* Category Items */}
                    <div className="space-y-3">
                      {techItems
                        .filter(tech => tech.category === category)
                        .map((tech, index) => (
                          <motion.div
                            key={tech.name}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                              theme === 'theme-light'
                                ? 'hover:bg-white hover:shadow-md'
                                : 'hover:bg-slate-800 hover:shadow-md'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ x: 5 }}
                          >
                            {/* Tech Logo */}
                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                              <Image 
                                src={tech.logo} 
                                alt={tech.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                              <span className="text-lg hidden">{tech.icon}</span>
                            </div>
                            
                            {/* Tech Name */}
                            <span className={`font-medium ${
                              theme === 'theme-light' ? 'text-slate-700' : 'text-slate-200'
                            }`}>
                              {tech.name}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
      </section>
    </>
  );
});

export default TechRiver;