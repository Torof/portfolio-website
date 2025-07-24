'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { techStack } from '../lib/data/techStack';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/context/LanguageContext';

interface InteractiveTechStackProps {
  onCategoryChange?: (category: 'blockchain' | 'frontend' | 'backend') => void;
}

const InteractiveTechStack: React.FC<InteractiveTechStackProps> = ({ onCategoryChange }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'blockchain' | 'frontend' | 'backend'>('blockchain');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Notify parent component when category changes
  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(activeCategory);
    }
  }, [activeCategory, onCategoryChange]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const categories = [
    { 
      id: 'blockchain', 
      name: 'Blockchain', 
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "#0ea5e9"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      ),
      color: (active: boolean) => active ? 'from-[#036aa3] to-[#0284c9]' : 'from-[#0ea5e9] to-[#38b2f8]',
      baseColor: '#0ea5e9',
      brightColor: '#38b2f8',
      darkColor: '#036aa3',
      textColor: (active: boolean) => active ? 'white' : '#0ea5e9'
    },
    { 
      id: 'frontend', 
      name: 'Frontend', 
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "#7c3aed"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      color: (active: boolean) => active ? 'from-[#5b21b6] to-[#6d28d9]' : 'from-[#7c3aed] to-[#8b5cf6]',
      baseColor: '#7c3aed',
      brightColor: '#8b5cf6',
      darkColor: '#5b21b6',
      textColor: (active: boolean) => active ? 'white' : '#7c3aed'
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "#06b6d4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      color: (active: boolean) => active ? 'from-[#065a86] to-[#036aa3]' : 'from-[#06b6d4] to-[#0ea5e9]',
      baseColor: '#06b6d4',
      brightColor: '#0ea5e9',
      darkColor: '#065a86',
      textColor: (active: boolean) => active ? 'white' : '#06b6d4'
    }
  ];

  const getExpertiseLevel = (techName: string): number => {
    // This would ideally come from your data, but I'm mocking it for demonstration
    // Returns a rating from 1-5 stars
    const expertiseLevels: {[key: string]: number} = {
      'Solidity': 5,
      'Hardhat': 5,
      'Foundry': 4,
      'Ethereum': 5,
      'Solana': 4,
      'Polkadot': 3,
      'Rust': 4,
      'React': 5,
      'Next.js': 5,
      'Typescript': 5,
      'HTML': 5,
      'CSS': 4,
      'TailwindCSS': 5,
      'Node.js': 4,
      'Bash': 4,
      'theGraph': 4
    };
    
    return expertiseLevels[techName] || 3; // Default to 3 stars if not defined
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Enhanced Category Selector */}
      <div className="flex flex-col items-center mb-12">
        <p className="text-gray-300 text-sm mb-4 text-center">
          Choose a category to explore different technologies
        </p>
        <div className="flex items-center gap-2 p-2 rounded-2xl glass-vibrant backdrop-blur-md border border-white/20">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id as 'blockchain' | 'frontend' | 'backend')}
                className={`relative rounded-xl flex flex-col items-center justify-center font-medium transition-all duration-300 cursor-pointer group ${
                  isActive 
                    ? 'px-8 py-4 bg-gradient-to-r text-white shadow-lg glow-' + (category.id === 'blockchain' ? 'blue' : category.id === 'frontend' ? 'purple' : 'blue')
                    : 'px-6 py-3 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
                style={{
                  backgroundImage: isActive ? `linear-gradient(135deg, ${category.darkColor}, ${category.baseColor})` : undefined,
                }}
              >
                <div className={`flex items-center justify-center rounded-lg transition-all duration-300 mb-2 ${
                  isActive 
                    ? 'w-10 h-10 bg-white/20' 
                    : 'w-8 h-8 bg-white/5 group-hover:bg-white/10'
                }`}>
                  {category.icon(isActive)}
                </div>
                <span className={`font-semibold transition-all duration-300 text-center ${
                  isActive ? 'text-base' : 'text-sm'
                }`}>
                  {category.name}
                </span>
                
                {/* Status indicator */}
                <div className={`text-xs transition-all duration-300 mt-1 ${
                  isActive 
                    ? 'text-white/80 font-medium' 
                    : 'text-gray-400 opacity-70 group-hover:opacity-100'
                }`}>
{isActive ? t('common.active') : t('common.clickToView')}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tech Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {techStack[activeCategory].map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className="relative flex flex-col items-center glass-vibrant rounded-xl p-5 transition-all duration-300 hover:border-[var(--primary-400)] hover:bg-[rgba(255,255,255,0.12)] theme-light:hover:bg-[rgba(0,0,0,0.12)]"
            >
              <div className="h-16 w-16 relative mb-4 flex items-center justify-center">
                <Image 
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={52}
                  height={52}
                  className="object-contain drop-shadow-lg"
                />
              </div>

              <h3 className="text-[var(--foreground)] text-center text-sm font-medium mb-2">
                {tech.name}
              </h3>

              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-1 mt-auto">
                {[...Array(5)].map((_, i) => {
                  const starFill = i < getExpertiseLevel(tech.name) ? 
                    'text-[#FFC107]' : 
                    'text-[rgba(255,255,255,0.2)]';
                  
                  return (
                    <motion.svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className={`${starFill}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.05) + (i * 0.05) }}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </motion.svg>
                  );
                })}
              </div>
              
              {/* Expertise Label - only visible on hover */}
              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[rgba(0,0,0,0.8)] text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10"
                  >
                    Proficiency: {getExpertiseLevel(tech.name)}/5
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glow effect on hover */}
              {hoveredTech === tech.name && (
                <motion.div 
                  className="absolute inset-0 rounded-xl" 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    boxShadow: [
                      '0 0 0 rgba(124, 58, 237, 0)',
                      '0 0 15px rgba(124, 58, 237, 0.5)',
                      '0 0 0 rgba(124, 58, 237, 0)'
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTechStack;