"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface PremiumSkillSectionsProps {
  categories: SkillCategory[];
}

// Smart Contracts - Single-Side Gear Wheel
const SmartContractsSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex(prev => {
      const newIndex = prev + delta;
      // Infinite loop - wrap around
      if (newIndex < 0) return category.skills.length - 1;
      if (newIndex >= category.skills.length) return 0;
      return newIndex;
    });
  };

  if (!mounted) {
    return <div className="mb-24 h-96" />; // Placeholder during hydration
  }

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-2xl border backdrop-blur-xl ${
        theme === 'theme-light'
          ? 'bg-white/80 border-blue-200/50 shadow-lg'
          : 'bg-slate-900/80 border-blue-500/30 shadow-lg shadow-blue-500/10'
      }`}>
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`p-3 rounded-xl mr-4 ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-700'
              }`}>
                <motion.div
                  animate={{ rotate: currentIndex * 15 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  Smart Contract Standards
                </h3>
                <p className={`text-sm ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {category.skills.length} standards • Scroll wheel to navigate • Use arrows to browse
                </p>
              </div>
            </div>
            
            {/* Current Item Indicator */}
            <div className="flex items-center space-x-3">
              <div className={`text-sm px-3 py-1 rounded-full ${
                theme === 'theme-light' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-blue-900/50 text-blue-300'
              }`}>
                {currentIndex + 1} / {category.skills.length}
              </div>
            </div>
          </div>
        </div>

        {/* Combined Wheel and Info Card */}
        <div 
          className={`h-96 rounded-lg border relative overflow-hidden ${
            theme === 'theme-light'
              ? 'bg-gradient-to-l from-slate-50 to-blue-50/30 border-blue-100'
              : 'bg-gradient-to-l from-slate-900 to-blue-950/20 border-slate-700'
          }`}
          onWheel={handleScroll}
          style={{ perspective: '1000px' }}
        >
          {/* Single-Side Gear Wheel - Left Half */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden">
          {/* Vertical Wheel Container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {category.skills.map((skill, index) => {
                // Calculate position relative to current index with wrapping
                let offset = index - currentIndex;
                const totalCards = category.skills.length;
                
                // Handle wrapping for infinite scroll
                if (offset > totalCards / 2) offset -= totalCards;
                if (offset < -totalCards / 2) offset += totalCards;
                
                const visibleRange = 4; // Show 4 cards above and below (back to original)
                
                // Only render visible cards
                if (Math.abs(offset) > visibleRange) return null;
                
                // Vertical wheel calculations
                const angleStep = 25; // degrees between each card on the wheel (back to original)
                const angle = offset * angleStep; // Remove rotation limits
                const radians = (angle * Math.PI) / 180;
                
                // Calculate positions for vertical wheel (rotating around X axis)
                const radius = 180; // radius of the wheel
                const y = Math.sin(radians) * radius; // Vertical position on wheel
                const z = Math.cos(radians) * radius; // Depth - positive z = closer to viewer
                
                // Scale based on position - center is largest
                const scale = 1 - Math.abs(offset) * 0.15; // Back to original scale difference
                const opacity = Math.max(0, 1 - Math.abs(offset) * 0.25); // Back to gradual fade
                const blur = Math.abs(offset) > 2 ? 1 : 0;
                
                const isCenter = offset === 0;
                
                // Distance-based approach from right border
                const containerWidth = 550; // Assuming container is about 550px wide
                let distanceFromRightBorder;
                if (offset === 0) {
                  distanceFromRightBorder = 5; // Central card: 5px from right border
                } else {
                  distanceFromRightBorder = 5 + (Math.abs(offset) * 30); // Each card: +30px more from central
                }
                const width = containerWidth - distanceFromRightBorder;

                return (
                  <motion.div
                    key={skill.id}
                    className="absolute"
                    style={{
                      left: 0,
                      top: '50%',
                      height: '80px',
                      transformOrigin: 'left center',
                    }}
                    animate={{
                      width: `${width}px`,
                      transform: `
                        translateY(calc(-50% + ${y}px))
                        translateZ(${z}px)
                        translateX(-20px)
                        rotateX(${-angle}deg)
                        scale(1)
                      `,
                      opacity: opacity,
                      filter: `blur(${blur}px)`,
                      zIndex: Math.round(20 - Math.abs(offset)), // Simple z-index based on distance from center
                    }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 120,
                      mass: 0.5
                    }}
                  >
                    <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 h-full ${
                      isCenter
                        ? theme === 'theme-light'
                          ? 'bg-white border-blue-400 shadow-2xl'
                          : 'bg-slate-800 border-blue-500 shadow-2xl shadow-blue-500/20'
                        : theme === 'theme-light'
                          ? 'bg-white border-gray-200'
                          : 'bg-slate-800 border-slate-600'
                    }`}>
                      <div className="flex items-center space-x-3" style={{ marginLeft: `${60 - (Math.abs(offset) * 3)}px` }}> {/* Text closer to left edge */}
                        <div className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                          isCenter
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : theme === 'theme-light' 
                              ? 'bg-gray-100 text-gray-700' 
                              : 'bg-slate-700 text-gray-300'
                        }`}>
                          ERC-{skill.id.includes('erc') ? skill.id.replace('erc', '').replace('-', '') : 'STD'}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold ${
                            isCenter ? 'text-base' : 'text-sm'
                          } ${
                            theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                          }`}>
                            {skill.name.replace(/^ERC-\d+\s*\(?\s*/, '').replace(/\)?$/, '')}
                          </h4>
                          {isCenter && (
                            <p className={`text-xs mt-1 ${
                              theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                              {skill.description}
                            </p>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Left edge gradient to enhance cut-off effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 pointer-events-none ${
            theme === 'theme-light'
              ? 'bg-gradient-to-r from-slate-50 to-transparent'
              : 'bg-gradient-to-r from-slate-900 to-transparent'
          }`} />

          {/* Wheel of Fortune Style Cursor/Selector */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="relative">
              {/* Arrow pointer */}
              <motion.div
                className={`w-0 h-0 ${
                  theme === 'theme-light'
                    ? 'border-l-[20px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent'
                    : 'border-l-[20px] border-l-blue-400 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent'
                }`}
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Glowing effect */}
              <div className={`absolute -top-3 -left-6 w-8 h-6 rounded-full blur-sm ${
                theme === 'theme-light'
                  ? 'bg-blue-600/30'
                  : 'bg-blue-400/30'
              }`} />
            </div>
          </div>
          
          
          {/* Navigation buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev - 1;
                return newIndex < 0 ? category.skills.length - 1 : newIndex;
              })}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                theme === 'theme-light'
                  ? 'bg-white border border-gray-200 text-gray-700'
                  : 'bg-slate-800 border border-slate-600 text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev + 1;
                return newIndex >= category.skills.length ? 0 : newIndex;
              })}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                theme === 'theme-light'
                  ? 'bg-white border border-gray-200 text-gray-700'
                  : 'bg-slate-800 border border-slate-600 text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          </div>

          {/* Info Card for Selected Standard - Right Half */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 p-6 flex items-center">
            <div className={`w-full h-full rounded-lg border p-6 backdrop-blur-sm ${
              theme === 'theme-light'
                ? 'bg-white/95 border-blue-200 shadow-lg'
                : 'bg-slate-800/95 border-slate-600 shadow-lg'
            }`}>
            {(() => {
              const selectedSkill = category.skills[currentIndex];
              return (
                <div className="h-full flex flex-col">
                  {/* EIP Link at top */}
                  <div className="flex justify-end mb-4">
                    {selectedSkill.id.includes('erc') && (
                      <a
                        href={`https://eips.ethereum.org/EIPS/eip-${selectedSkill.id.replace('erc', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          theme === 'theme-light'
                            ? 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                            : 'text-blue-400 hover:bg-blue-900/30 border border-blue-800'
                        }`}
                      >
                        <span className="mr-2">View EIP</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">

                    {/* Projects */}
                    {selectedSkill.projects && (
                      <div>
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                        }`}>
                          My Experience
                        </h4>
                        <ul className={`text-sm space-y-1 ${
                          theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {selectedSkill.projects.slice(0, 3).map((project, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-0.5">•</span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Examples */}
                    {selectedSkill.examples && (
                      <div>
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                        }`}>
                          Use Cases
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkill.examples.map((example, index) => (
                            <span 
                              key={index}
                              className={`px-3 py-1 text-xs rounded-full ${
                                theme === 'theme-light'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-blue-900/50 text-blue-300'
                              }`}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// DeFi - Corporate Professional Style
const DeFiSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-lg border ${
        theme === 'theme-light'
          ? 'bg-white border-gray-200 shadow-lg'
          : 'bg-slate-800 border-slate-700 shadow-lg'
      }`}>
        
        
        {/* Corporate Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`p-4 rounded-lg mr-4 ${
                theme === 'theme-light' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
              }`}>
                <span className="text-2xl">🏦</span>
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                }`}>
                  DeFi Protocol Expertise
                </h3>
                <p className={`text-sm ${
                  theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Comprehensive decentralized finance experience
                </p>
              </div>
            </div>
            
            {/* Professional Status */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-4 py-2 rounded-lg ${
                theme === 'theme-light'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-green-900/30 text-green-300 border border-green-800'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Expert Level</span>
              </div>
              <div className={`text-sm font-medium ${
                theme === 'theme-light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {category.skills.length} Protocols
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Protocols', value: category.skills.length, color: 'blue' },
              { label: 'Expert Level', value: category.skills.filter(s => s.level >= 4).length, color: 'green' },
              { label: 'Avg Experience', value: `${Math.round(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length)}+ Years`, color: 'purple' },
              { label: 'Success Rate', value: '98.5%', color: 'emerald' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`p-4 rounded-lg border ${
                  theme === 'theme-light'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-slate-700 border-slate-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={`text-xs font-medium mb-1 ${
                  theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {stat.label}
                </div>
                <div className={`text-2xl font-bold ${
                  stat.color === 'blue' ? 'text-green-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-emerald-600'
                }`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instructions */}
          <div className={`p-4 rounded-lg border ${
            theme === 'theme-light'
              ? 'bg-blue-50 border-blue-200 text-blue-900'
              : 'bg-blue-900/20 border-blue-800 text-blue-200'
          }`}>
            <div className="text-sm font-medium">
              Click on any protocol below to view detailed information and experience
            </div>
          </div>
        </div>

        {/* Protocol List */}
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          {category.skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className={`relative cursor-pointer transition-all duration-300 rounded-lg border ${
                expandedSkill === skill.id 
                  ? theme === 'theme-light'
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : 'bg-blue-900/20 border-blue-600 shadow-md'
                  : theme === 'theme-light'
                    ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                    : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 hover:shadow-sm'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
            >
              {/* Protocol Row */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Protocol Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    theme === 'theme-light' 
                      ? 'bg-gray-100' 
                      : 'bg-slate-600'
                  }`}>
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  
                  {/* Protocol Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-lg font-semibold ${
                      theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {skill.name}
                    </h4>
                    <p className={`text-sm ${
                      theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {skill.subcategory} • {skill.level * 2}+ Years Experience
                    </p>
                  </div>
                  
                  {/* Metrics */}
                  <div className="hidden md:flex items-center space-x-6">
                    <div className="text-center">
                      <div className={`text-sm font-medium ${
                        theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Level
                      </div>
                      <div className={`text-lg font-bold ${
                        skill.level >= 4 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {skill.level}/5
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${
                        theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Projects
                      </div>
                      <div className={`text-lg font-bold ${
                        theme === 'theme-light' ? 'text-green-600' : 'text-blue-400'
                      }`}>
                        {skill.level * 3}+
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand Arrow */}
                  <motion.div
                    className={`p-2 rounded-lg ${
                      theme === 'theme-light' 
                        ? 'bg-gray-100 hover:bg-gray-200' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    animate={{ rotate: expandedSkill === skill.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedSkill === skill.id && (
                  <motion.div
                    className={`overflow-hidden border-t ${
                      theme === 'theme-light'
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-slate-600 border-slate-500'
                    }`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 space-y-4">
                      {/* Description */}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Overview
                        </h5>
                        <p className={`text-sm leading-relaxed ${
                          theme === 'theme-light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {skill.description}
                        </p>
                      </div>

                      {/* Explanatory Text */}
                      <div className={`p-6 rounded-lg ${
                        theme === 'theme-light' 
                          ? 'bg-gray-50 border border-gray-100' 
                          : 'bg-slate-700/50 border border-slate-600'
                      }`}>
                        <h5 className={`font-semibold mb-3 ${
                          theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          How I Use {skill.name}
                        </h5>
                        <div className={`text-sm leading-relaxed space-y-3 ${
                          theme === 'theme-light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          <p>
                            {skill.subcategory === 'DEX' ? `I leverage ${skill.name} for building and optimizing automated market maker (AMM) systems, implementing custom trading strategies, and integrating liquidity pools into DeFi applications. My experience includes deep liquidity analysis, MEV protection strategies, and cross-chain bridge implementations.` :
                            skill.subcategory === 'Lending' ? `I utilize ${skill.name} to architect sophisticated lending and borrowing protocols, implement dynamic interest rate models, and create innovative collateral management systems. My work focuses on risk assessment algorithms, liquidation mechanisms, and yield optimization strategies.` :
                            skill.subcategory === 'Yield Farming' ? `I design and deploy ${skill.name}-based yield farming strategies, create auto-compounding vaults, and implement complex reward distribution mechanisms. My expertise covers liquidity mining protocols, governance token economics, and sustainable yield generation models.` :
                            skill.subcategory === 'Derivatives' ? `I build sophisticated ${skill.name} derivatives platforms, implement options and futures contracts, and create synthetic asset protocols. My work includes perpetual contracts, prediction markets, and complex financial instruments with automated settlement systems.` :
                            `I integrate ${skill.name} into comprehensive DeFi ecosystems, focusing on protocol interoperability, gas optimization, and security best practices. My implementations emphasize user experience, capital efficiency, and robust smart contract architecture.`}
                          </p>
                          <p>
                            My approach combines deep technical knowledge with practical market understanding, ensuring that every implementation is not only technically sound but also economically viable and user-friendly. I prioritize security, scalability, and composability in all DeFi protocol development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Layer 2 - Network Topology with Official Logos
const Layer2Section = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = (skillId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredNode(skillId);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredNode(null);
    }, 150); // Small delay to allow moving to tooltip
    setHoverTimeout(timeout);
  };

  const handleTooltipEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleTooltipLeave = () => {
    setHoveredNode(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);
  
  // Logo mapping for Layer 2 networks
  const getNetworkLogo = (skillId: string): string | null => {
    const logoMap: { [key: string]: string } = {
      'arbitrum': '/logos/arbitrum.svg',
      'optimism': '/logos/optimism.svg',
      'polygon': '/logos/polygon.svg',
      'base': '/logos/base.webp',
      'berachain': '/logos/berachain.svg',
    };
    return logoMap[skillId] || null; // Return null for emoji-based items
  };

  // Position calculations for network layout
  const centerPos = { x: 50, y: 50 }; // Ethereum at center (percentage)
  const radius = 35; // Distance from center to L2 nodes (percentage) - increased
  const totalNodes = category.skills.length;
  
  const nodePositions = category.skills.map((skill, index) => {
    // Calculate angle for each node, starting from top (12 o'clock) and going clockwise
    const angleInRadians = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
    const x = centerPos.x + radius * Math.cos(angleInRadians);
    const y = centerPos.y + radius * Math.sin(angleInRadians);
    
    return { x, y };
  });

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-lg border overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50 to-indigo-50 border-gray-200 shadow-lg'
          : 'bg-gradient-to-br from-slate-900 to-indigo-950 border-slate-700 shadow-lg'
      }`}>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-12 gap-px h-full w-full">
            {Array.from({ length: 240 }).map((_, i) => (
              <motion.div
                key={i}
                className={`border ${
                  theme === 'theme-light' ? 'border-indigo-300' : 'border-indigo-600'
                }`}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  backgroundColor: Math.random() > 0.95 ? [
                    "rgba(99, 102, 241, 0.2)",
                    "rgba(99, 102, 241, 0.6)",
                    "rgba(99, 102, 241, 0.2)"
                  ] : undefined
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className={`p-4 rounded-2xl mr-4 ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg' 
                  : 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg'
              }`}>
                <span className="text-3xl text-white">🌐</span>
              </div>
              <div className="text-left">
                <h3 className={`text-3xl font-bold ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  Layer 2 Network
                </h3>
                <p className={`text-lg ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Interconnected scaling ecosystem
                </p>
              </div>
            </div>
            
            {/* Brief Explanation */}
            <div className={`p-4 rounded-lg max-w-4xl mx-auto ${
              theme === 'theme-light'
                ? 'bg-indigo-50/50 border border-indigo-200/50'
                : 'bg-indigo-900/20 border border-indigo-800/50'
            }`}>
              <p className={`text-sm leading-relaxed ${
                theme === 'theme-light' ? 'text-indigo-900' : 'text-indigo-200'
              }`}>
                I architect multi-chain ecosystems where each Layer 2 serves specific purposes - from high-throughput gaming on Polygon to innovative DeFi on Arbitrum, all connected through secure bridge infrastructure.
              </p>
            </div>
          </div>

          {/* Network Visualization */}
          <div className="relative h-[600px] w-full max-w-[700px] mx-auto">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Circular Guide (subtle) */}
              <circle
                cx={centerPos.x}
                cy={centerPos.y}
                r={radius}
                fill="none"
                stroke={theme === 'theme-light' ? '#e0e7ff' : '#1e293b'}
                strokeWidth="0.3"
                opacity="0.5"
              />
              
              {/* Connection Lines */}
              {category.skills.map((skill, index) => {
                const pos = nodePositions[index];
                return (
                  <motion.line
                    key={`connection-${skill.id}`}
                    x1={centerPos.x}
                    y1={centerPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={theme === 'theme-light' ? '#6366f1' : '#818cf8'}
                    strokeWidth={hoveredNode === skill.id ? '0.4' : '0.2'}
                    opacity={hoveredNode === skill.id ? 0.8 : 0.3}
                    animate={{
                      pathLength: [0, 1],
                      opacity: hoveredNode === skill.id ? [0.3, 0.8] : [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      pathLength: { duration: 2, delay: index * 0.2 },
                      opacity: { duration: 2, repeat: Infinity }
                    }}
                  />
                );
              })}

              {/* Data Flow Animation */}
              {hoveredNode && category.skills.map((skill, index) => {
                if (skill.id !== hoveredNode) return null;
                const pos = nodePositions[index];
                return (
                  <motion.circle
                    key={`flow-${skill.id}`}
                    r="0.5"
                    fill="#10b981"
                    animate={{
                      cx: [centerPos.x, pos.x, centerPos.x],
                      cy: [centerPos.y, pos.y, centerPos.y],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                );
              })}

              {/* Ethereum Core Node (SVG) */}
              <motion.g
                animate={{
                  filter: [
                    "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                    "drop-shadow(0 0 16px rgba(147, 51, 234, 0.7))",
                    "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <circle
                  cx={centerPos.x}
                  cy={centerPos.y}
                  r="10"
                  fill={theme === 'theme-light' 
                    ? "url(#ethereumGradientLight)" 
                    : "url(#ethereumGradientDark)"}
                  stroke={theme === 'theme-light' ? '#3b82f6' : '#60a5fa'}
                  strokeWidth="1"
                />
                <foreignObject 
                  x={centerPos.x - 6} 
                  y={centerPos.y - 6} 
                  width="12" 
                  height="12"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src="/logos/ethereum.svg" 
                      alt="Ethereum logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </foreignObject>
              </motion.g>

              {/* L2 Network Nodes (SVG) */}
              {category.skills.map((skill, index) => {
                const pos = nodePositions[index];
                const isHovered = hoveredNode === skill.id;
                return (
                  <motion.g
                    key={skill.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleMouseEnter(skill.id)}
                    onMouseLeave={handleMouseLeave}
                    animate={{
                      scale: isHovered ? 1.25 : 1,
                      filter: isHovered 
                        ? "drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))"
                        : "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"
                    }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.25 : 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="7.5"
                      fill={theme === 'theme-light' 
                        ? "url(#nodeGradientLight)" 
                        : "url(#nodeGradientDark)"}
                      stroke={theme === 'theme-light' ? '#6366f1' : '#818cf8'}
                      strokeWidth="0.5"
                    />
                    {/* Network Logo or Emoji */}
                    {getNetworkLogo(skill.id) ? (
                      <foreignObject
                        x={pos.x - 4}
                        y={pos.y - 5.5}
                        width="8"
                        height="8"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={getNetworkLogo(skill.id)}
                            alt={`${skill.name} logo`}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      </foreignObject>
                    ) : (
                      <text
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="6"
                        fill={theme === 'theme-light' ? '#1e293b' : '#ffffff'}
                      >
                        {skill.icon}
                      </text>
                    )}
                    <text
                      x={pos.x}
                      y={pos.y + 3.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="2.5"
                      fill={theme === 'theme-light' ? '#1e293b' : '#ffffff'}
                      fontWeight="bold"
                    >
                      {skill.name.split(' ')[0]}
                    </text>
                  </motion.g>
                );
              })}

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="ethereumGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="ethereumGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="nodeGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e0e7ff" />
                </linearGradient>
                <linearGradient id="nodeGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Tooltips (HTML overlay for better styling) */}
            <AnimatePresence>
              {category.skills.map((skill, index) => {
                const pos = nodePositions[index];
                return hoveredNode === skill.id ? (
                <motion.div
                  key={`tooltip-${skill.id}`}
                  className={`absolute p-4 rounded-lg shadow-xl border min-w-52 max-w-80 z-30 backdrop-blur-sm ${
                    theme === 'theme-light'
                      ? 'bg-white/95 border-gray-200'
                      : 'bg-slate-800/95 border-slate-600'
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: pos.y < 30 
                      ? 'translate(-50%, calc(100% + 12px))' // Show below if near top
                      : 'translate(-50%, calc(-100% - 12px))', // Show above by default
                    pointerEvents: 'auto'
                  }}
                  initial={{ opacity: 0, y: pos.y < 30 ? -10 : 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: pos.y < 30 ? -10 : 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onMouseEnter={handleTooltipEnter}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-lg">
                      {getNetworkLogo(skill.id) ? (
                        <img 
                          src={getNetworkLogo(skill.id)} 
                          alt={`${skill.name} logo`} 
                          className="w-6 h-6 object-contain rounded-full"
                        />
                      ) : (
                        <span>{skill.icon}</span>
                      )}
                    </div>
                    <h4 className={`font-bold text-base ${
                      theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                    }`}>
                      {skill.name}
                    </h4>
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-3 ${
                    theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {skill.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className={`${
                      theme === 'theme-light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <span className="font-medium">Type:</span> {skill.subcategory}
                    </div>
                    <div className={`${
                      theme === 'theme-light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <span className="font-medium">Experience:</span> {skill.level * 2}+ years
                    </div>
                  </div>

                  <div className={`text-xs px-3 py-1.5 rounded-full text-center font-medium ${
                    skill.level >= 4 
                      ? (theme === 'theme-light' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-900/50 text-emerald-300')
                      : (theme === 'theme-light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300')
                  }`}>
                    {skill.level >= 4 ? 'Expert Level' : 'Proficient Level'}
                  </div>
                </motion.div>
              ) : null;
            })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// Security - Cybersecurity Fortress & Hacking Simulation Theme
const SecuritySection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [scanningActive, setScanningActive] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Trigger security scan simulation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanningActive(true);
      setTimeout(() => setScanningActive(false), 3000);
    }, 8000);

    const simInterval = setInterval(() => {
      setSimulationRunning(true);
      setTimeout(() => setSimulationRunning(false), 5000);
    }, 12000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(simInterval);
    };
  }, []);

  const hackingAttempts = [
    { ip: "192.168.1.100", type: "SQL_INJECTION", blocked: true },
    { ip: "10.0.0.42", type: "XSS_ATTACK", blocked: true },
    { ip: "172.16.0.15", type: "BRUTE_FORCE", blocked: true },
    { ip: "203.0.113.5", type: "DDOS_ATTEMPT", blocked: true },
  ];

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/90 via-red-50/30 to-amber-50/20 border-red-200/40 shadow-2xl shadow-red-500/10'
          : 'bg-gradient-to-br from-slate-900/95 via-red-950/20 to-amber-950/10 border-red-900/50 shadow-2xl shadow-red-500/20'
      }`}>
        
        {/* Cybersecurity Matrix Background */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="grid grid-cols-16 grid-rows-10 gap-px h-full w-full">
            {Array.from({ length: 160 }).map((_, i) => (
              <motion.div
                key={i}
                className={`border ${
                  theme === 'theme-light' ? 'border-red-300/30' : 'border-red-700/30'
                }`}
                animate={{
                  backgroundColor: Math.random() > 0.97 ? [
                    "rgba(239, 68, 68, 0.1)",
                    "rgba(34, 197, 94, 0.3)",
                    "rgba(239, 68, 68, 0.1)"
                  ] : scanningActive && Math.random() > 0.9 ? [
                    "rgba(34, 197, 94, 0.2)",
                    "rgba(34, 197, 94, 0.6)",
                    "rgba(34, 197, 94, 0.2)"
                  ] : undefined,
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Security Alerts */}
        <AnimatePresence>
          {simulationRunning && (
            <div className="absolute top-6 right-6 z-30">
              <motion.div
                className={`p-4 rounded-lg border backdrop-blur-sm ${
                  theme === 'theme-light'
                    ? 'bg-red-100/90 border-red-300 text-red-800'
                    : 'bg-red-900/80 border-red-700 text-red-200'
                }`}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
              >
                <div className="text-xs font-mono space-y-1">
                  <div className="font-bold">🚨 THREAT DETECTED</div>
                  {hackingAttempts.slice(0, 2).map((attempt, i) => (
                    <motion.div
                      key={i}
                      className="text-xs opacity-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                    >
                      {attempt.ip} - {attempt.type} - BLOCKED ✅
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6 relative"
              whileHover={{ scale: 1.1 }}
            >
              {/* Fortress Shield Icon */}
              <div className={`p-8 rounded-2xl relative ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-red-600 to-amber-600 shadow-xl shadow-red-500/30' 
                  : 'bg-gradient-to-br from-red-700 to-amber-700 shadow-xl shadow-red-500/40'
              }`}>
                <motion.div
                  animate={{
                    rotateY: scanningActive ? [0, 360] : 0,
                    scale: scanningActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                >
                  <span className="text-6xl text-white">🏰</span>
                </motion.div>
                
                {/* Scanning Beam Effect */}
                <AnimatePresence>
                  {scanningActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        background: [
                          "conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.3), transparent)",
                          "conic-gradient(from 180deg, transparent, rgba(34, 197, 94, 0.3), transparent)",
                          "conic-gradient(from 360deg, transparent, rgba(34, 197, 94, 0.3), transparent)"
                        ]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Cybersecurity <span className="font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">Fortress</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Advanced penetration testing, smart contract auditing, and real-time threat detection
            </p>

            {/* Security Status Board */}
            <div className={`mt-8 inline-flex items-center px-6 py-3 rounded-full ${
              theme === 'theme-light'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-green-900/30 text-green-300 border border-green-800'
            }`}>
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full mr-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-sm font-medium">
                DEFENSE SYSTEMS OPERATIONAL • {category.skills.reduce((acc, s) => acc + s.level * 47, 0)}+ VULNERABILITIES PATCHED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`group relative p-8 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 overflow-hidden ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-br from-white/95 to-red-50/70 border-red-200/60 hover:border-red-400/60 hover:shadow-2xl hover:shadow-red-500/20'
                    : 'bg-gradient-to-br from-slate-800/95 to-red-950/40 border-red-800/60 hover:border-red-600/60 hover:shadow-2xl hover:shadow-red-500/20'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Penetration Testing Scanner */}
                <motion.div
                  className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    y: ["-100%", "100%", "-100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Honeypot Detection Pattern */}
                <motion.div
                  className="absolute top-2 right-2 w-20 h-20 opacity-5 group-hover:opacity-20"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,5"/>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,3"/>
                    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.5"/>
                  </svg>
                </motion.div>

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <motion.div 
                      className={`p-4 rounded-xl mr-4 relative ${
                        theme === 'theme-light' 
                          ? 'bg-gradient-to-br from-red-100 to-amber-100' 
                          : 'bg-gradient-to-br from-red-900/50 to-amber-900/50'
                      }`}
                      whileHover={{ rotateX: 15, rotateY: 15 }}
                    >
                      <span className="text-2xl relative z-10">{skill.icon}</span>
                      {/* Security Badge Overlay */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-xs text-white">✓</span>
                      </motion.div>
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold light-text mb-2 group-hover:text-green-600 transition-colors">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${
                          skill.level >= 4 ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                        } shadow-sm`}>
                          {skill.level >= 4 ? 'FORTIFIED' : 'SECURING'}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === 'theme-light' 
                            ? 'bg-slate-100 text-slate-800' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          Level {skill.level} Security
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-time Threat Monitor */}
                  <div className="text-right">
                    <motion.div 
                      className="text-xs font-medium font-mono text-green-500 mb-2"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      PERIMETER: SECURE
                    </motion.div>
                    <div className="flex justify-end space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? 'bg-green-500' : 'bg-red-300'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            boxShadow: i < skill.level ? [
                              "0 0 0 rgba(34, 197, 94, 0)",
                              "0 0 8px rgba(34, 197, 94, 0.6)",
                              "0 0 0 rgba(34, 197, 94, 0)"
                            ] : undefined
                          }}
                          transition={{ 
                            delay: index * 0.1 + i * 0.1,
                            boxShadow: { duration: 2, repeat: Infinity }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm light-text opacity-70 leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Advanced Security Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <motion.div 
                      className="text-xl font-bold text-green-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {skill.level * 89}+
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider font-mono">Penetration Tests</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-xl font-bold text-blue-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      {skill.level * 156}+
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider font-mono">Vulnerabilities Fixed</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-xl font-bold text-amber-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    >
                      {Math.max(0, 3 - skill.level)}
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider font-mono">Critical Threats</div>
                  </div>
                </div>

                {/* Honeypot Attack Simulation */}
                <div className={`mt-4 p-3 rounded-lg font-mono text-xs ${
                  theme === 'theme-light'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-slate-800 text-green-400'
                }`}>
                  <div className="flex justify-between items-center">
                    <span>HONEYPOT STATUS:</span>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-green-500"
                    >
                      ACTIVE • {Math.floor(Math.random() * 50) + 10} ATTEMPTS BLOCKED
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Development Tools - DevOps Pipeline & Workflow Visualization
const DevelopmentSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [activeStage, setActiveStage] = useState(0);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  // Pipeline stages
  const pipelineStages = [
    { 
      name: 'Development', 
      icon: '💻', 
      color: 'blue',
      tools: category.skills.filter(s => s.subcategory === 'Frontend Integration' || s.subcategory === 'Storage')
    },
    { 
      name: 'Testing', 
      icon: '🧪', 
      color: 'green',
      tools: category.skills.filter(s => s.subcategory === 'Testing')
    },
    { 
      name: 'Build', 
      icon: '🔨', 
      color: 'orange',
      tools: category.skills.filter(s => s.subcategory === 'Storage Services')
    },
    { 
      name: 'Deploy', 
      icon: '🚀', 
      color: 'purple',
      tools: category.skills.filter(s => s.subcategory === 'Deployment')
    }
  ];

  // Auto-progress pipeline
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % pipelineStages.length);
    }, 4000);

    const buildInterval = setInterval(() => {
      setPipelineRunning(true);
      setBuildProgress(0);
      
      const buildTimer = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(buildTimer);
            setTimeout(() => setPipelineRunning(false), 1000);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(buildInterval);
    };
  }, []);

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-purple-50/20 border-blue-200/40 shadow-2xl shadow-blue-500/10'
          : 'bg-gradient-to-br from-slate-900/95 via-blue-950/20 to-purple-950/10 border-blue-900/50 shadow-2xl shadow-blue-500/20'
      }`}>
        
        {/* Circuit Board Background */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Horizontal lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={i * 25}
                x2="400"
                y2={i * 25}
                stroke="currentColor"
                strokeWidth="0.5"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  strokeDasharray: ["5,5", "10,2", "5,5"]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
            {/* Vertical lines */}
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={i * 25}
                y1="0"
                x2={i * 25}
                y2="300"
                stroke="currentColor"
                strokeWidth="0.5"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
            {/* Connection nodes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.circle
                key={`node-${i}`}
                cx={Math.random() * 400}
                cy={Math.random() * 300}
                r="2"
                fill="currentColor"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 4
                }}
              />
            ))}
          </svg>
        </div>

        {/* Pipeline Status Display */}
        <AnimatePresence>
          {pipelineRunning && (
            <div className="absolute top-6 right-6 z-30">
              <motion.div
                className={`p-4 rounded-lg border backdrop-blur-sm ${
                  theme === 'theme-light'
                    ? 'bg-blue-100/90 border-blue-300 text-blue-800'
                    : 'bg-blue-900/80 border-blue-700 text-blue-200'
                }`}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
              >
                <div className="text-xs font-mono space-y-2">
                  <div className="font-bold">🔄 PIPELINE RUNNING</div>
                  <div className="w-40 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      animate={{ width: `${buildProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="text-xs">Building... {Math.floor(buildProgress)}%</div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6 relative"
              whileHover={{ scale: 1.1 }}
            >
              {/* DevOps Pipeline Icon */}
              <div className={`p-8 rounded-2xl relative ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl shadow-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-700 to-purple-700 shadow-xl shadow-blue-500/40'
              }`}>
                <motion.div
                  animate={{
                    rotateX: pipelineRunning ? [0, 360] : 0,
                    scale: pipelineRunning ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <span className="text-6xl text-white">⚡</span>
                </motion.div>
                
                {/* Data Flow Animation */}
                <AnimatePresence>
                  {pipelineRunning && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        background: [
                          "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                          "conic-gradient(from 180deg, transparent, rgba(147, 51, 234, 0.3), transparent)",
                          "conic-gradient(from 360deg, transparent, rgba(59, 130, 246, 0.3), transparent)"
                        ]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              DevOps <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pipeline</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Automated CI/CD workflows, containerization, and infrastructure as code
            </p>

            {/* Pipeline Status */}
            <div className={`mt-8 inline-flex items-center px-6 py-3 rounded-full ${
              theme === 'theme-light'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-green-900/30 text-green-300 border border-green-800'
            }`}>
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full mr-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-sm font-medium">
                ALL SYSTEMS OPERATIONAL • {category.skills.reduce((acc, s) => acc + s.level * 127, 0)}+ SUCCESSFUL DEPLOYMENTS
              </span>
            </div>
          </div>

          {/* Pipeline Stages Visualization */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-8 mb-8">
              {pipelineStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center">
                  <motion.div
                    className={`relative p-6 rounded-2xl border backdrop-blur-sm cursor-pointer ${
                      activeStage === index
                        ? theme === 'theme-light'
                          ? 'bg-white border-blue-400 shadow-xl shadow-blue-500/20'
                          : 'bg-slate-800 border-blue-500 shadow-xl shadow-blue-500/20'
                        : theme === 'theme-light'
                          ? 'bg-white/50 border-gray-200 hover:border-gray-300'
                          : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                    } transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    animate={{
                      scale: activeStage === index ? 1.1 : 1,
                      y: activeStage === index ? -8 : 0
                    }}
                    onClick={() => setActiveStage(index)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{stage.icon}</div>
                      <div className={`text-sm font-medium ${
                        activeStage === index 
                          ? 'text-blue-600' 
                          : theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {stage.name}
                      </div>
                    </div>
                    
                    {/* Active stage indicator */}
                    {activeStage === index && (
                      <motion.div
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Pipeline connection arrow */}
                  {index < pipelineStages.length - 1 && (
                    <motion.div
                      className={`mx-4 ${
                        theme === 'theme-light' ? 'text-slate-400' : 'text-slate-600'
                      }`}
                      animate={{
                        x: activeStage === index ? [0, 8, 0] : 0,
                        opacity: activeStage === index ? [0.5, 1, 0.5] : 0.3
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tools for Active Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {pipelineStages[activeStage].tools.map((skill, index) => (
                <motion.div
                  key={`${activeStage}-${skill.id}`}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-br from-white/90 to-blue-50/60 border-blue-200/50 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/15'
                      : 'bg-gradient-to-br from-slate-800/90 to-blue-950/40 border-blue-800/50 hover:border-blue-600/60 hover:shadow-xl hover:shadow-blue-500/15'
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Pipeline flow indicator */}
                  <motion.div
                    className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      y: ["-100%", "100%", "-100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <motion.div 
                        className={`p-4 rounded-xl mr-4 relative ${
                          theme === 'theme-light' 
                            ? 'bg-gradient-to-br from-blue-100 to-purple-100' 
                            : 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                        }`}
                        whileHover={{ rotateZ: 15, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl relative z-10">{skill.icon}</span>
                        
                        {/* Integration badge */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-xs text-white">⚡</span>
                        </motion.div>
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold light-text mb-2 group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${
                            theme === 'theme-light' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-blue-900/50 text-blue-300'
                          }`}>
                            v{skill.level}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            skill.level >= 4 ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            {skill.level >= 4 ? 'STABLE' : 'BETA'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm light-text opacity-70 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* DevOps metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <motion.div 
                        className="text-lg font-bold text-green-500 mb-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {skill.level * 98}%
                      </motion.div>
                      <div className="text-xs light-text opacity-50 uppercase tracking-wider font-mono">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <motion.div 
                        className="text-lg font-bold text-blue-500 mb-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        {skill.level * 45}s
                      </motion.div>
                      <div className="text-xs light-text opacity-50 uppercase tracking-wider font-mono">Build Time</div>
                    </div>
                  </div>

                  {/* Pipeline integration status */}
                  <div className={`p-3 rounded-lg font-mono text-xs ${
                    theme === 'theme-light'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-slate-800 text-green-400'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span>INTEGRATION:</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-green-500"
                      >
                        ACTIVE • {Math.floor(Math.random() * 999) + 100} BUILDS
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function PremiumSkillSections({ categories }: PremiumSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
    'security': SecuritySection,
    'development': DevelopmentSection,
  };

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const Component = categoryComponents[category.id as keyof typeof categoryComponents];
        return Component ? (
          <Component key={category.id} category={category} />
        ) : null;
      })}
    </div>
  );
}