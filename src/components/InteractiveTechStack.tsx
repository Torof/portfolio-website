'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { techStack } from '../lib/data/techStack';
import { motion } from 'framer-motion';

interface InteractiveTechStackProps {
  onCategoryChange?: (category: 'blockchain' | 'frontend' | 'backend') => void;
}

const InteractiveTechStack: React.FC<InteractiveTechStackProps> = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<'blockchain' | 'frontend' | 'backend'>('frontend');
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


  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Simple Category Selector */}
      <div className="flex justify-center items-center gap-8 pt-12 mb-12">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as 'blockchain' | 'frontend' | 'backend')}
              className={`text-lg font-medium transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
                isActive
                  ? 'light-text border-[var(--primary-400)]'
                  : 'light-text opacity-60 hover:opacity-100 border-transparent hover:border-[var(--primary-400)]/50'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Tech Grid */}
        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {techStack[activeCategory].map((tech) => (
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
                  style={{ width: 'auto', height: 'auto', maxWidth: '52px', maxHeight: '52px' }}
                />
              </div>

              <h3 className="text-[var(--foreground)] text-center text-sm font-medium mb-2">
                {tech.name}
              </h3>


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
    </div>
  );
};

export default InteractiveTechStack;