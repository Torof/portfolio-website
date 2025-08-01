"use client";

import { useState, useRef } from 'react';
import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface SkillCarouselProps {
  categories: SkillCategory[];
}

const SkillCard = ({ skill, index }: { skill: AdvancedSkill; index: number }) => {
  const { theme } = useTheme();
  
  const categoryColors = {
    'smart-contracts': { 
      bg: 'from-blue-500/20 to-purple-600/20', 
      border: 'border-blue-400/30',
      accent: 'bg-blue-500',
      text: 'text-blue-400'
    },
    'defi': { 
      bg: 'from-green-500/20 to-blue-600/20', 
      border: 'border-green-400/30',
      accent: 'bg-green-500',
      text: 'text-green-400'
    },
    'layer2': { 
      bg: 'from-purple-500/20 to-pink-600/20', 
      border: 'border-purple-400/30',
      accent: 'bg-purple-500',
      text: 'text-purple-400'
    },
    'security': { 
      bg: 'from-red-500/20 to-orange-600/20', 
      border: 'border-red-400/30',
      accent: 'bg-red-500',
      text: 'text-red-400'
    },
    'development': { 
      bg: 'from-cyan-500/20 to-blue-600/20', 
      border: 'border-cyan-400/30',
      accent: 'bg-cyan-500',
      text: 'text-cyan-400'
    },
  };

  const colors = categoryColors[skill.category as keyof typeof categoryColors];

  return (
    <motion.div
      className={`relative flex-shrink-0 w-80 h-96 rounded-3xl border-2 backdrop-blur-lg transition-all duration-500 group hover:scale-105 ${
        theme === 'theme-light'
          ? `bg-gradient-to-br from-white/95 to-gray-50/95 ${colors.border} hover:shadow-2xl`
          : `bg-gradient-to-br from-slate-800/95 to-slate-900/95 ${colors.border} hover:shadow-2xl`
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      whileHover={{ y: -10 }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Floating accent dot */}
      <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${colors.accent} animate-pulse`}></div>
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
            theme === 'theme-light' 
              ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
              : 'bg-gradient-to-br from-slate-700 to-slate-800'
          }`}>
            <span className="text-3xl">{skill.icon}</span>
          </div>
          
          {/* Level badge */}
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-bold ${colors.accent} text-white shadow-lg`}>
            <div className="flex items-center space-x-1 mr-2">
              {[...Array(skill.level)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
              ))}
            </div>
            Level {skill.level}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold light-text mb-3 leading-tight">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="light-text opacity-80 text-sm leading-relaxed mb-6 flex-grow">
          {skill.description}
        </p>

        {/* Key highlights */}
        {skill.examples && skill.examples.length > 0 && (
          <div className="mb-6">
            <h4 className={`text-xs font-bold mb-3 uppercase tracking-wider ${colors.text}`}>
              Key Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.examples.slice(0, 3).map((example, i) => (
                <span 
                  key={i}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
                    theme === 'theme-light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {example}
                </span>
              ))}
              {skill.examples.length > 3 && (
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${colors.text} opacity-70`}>
                  +{skill.examples.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium light-text opacity-70">Proficiency</span>
            <span className={`text-xs font-bold ${colors.text}`}>{skill.level}/5</span>
          </div>
          <div className={`w-full h-2 rounded-full ${
            theme === 'theme-light' ? 'bg-gray-200' : 'bg-slate-700'
          }`}>
            <div 
              className={`h-full rounded-full ${colors.accent} transition-all duration-1000 ease-out`}
              style={{ width: `${(skill.level / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCarousel = ({ category, categoryIndex }: { category: SkillCategory; categoryIndex: number }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const cardWidth = 320; // Including gap
  const visibleCards = 3;
  const maxIndex = Math.max(0, category.skills.length - visibleCards);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  const scrollTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(maxIndex, index));
    setCurrentIndex(newIndex);
    const targetX = -newIndex * cardWidth;
    
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${targetX}px)`;
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && canScrollLeft) {
      scrollTo(currentIndex - 1);
    } else if (info.offset.x < -threshold && canScrollRight) {
      scrollTo(currentIndex + 1);
    } else {
      scrollTo(currentIndex); // Snap back
    }
  };

  return (
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="text-4xl mr-4">{category.icon}</div>
          <div>
            <h3 className="text-2xl font-bold light-text mb-1">{category.name}</h3>
            <p className="light-text opacity-70 text-sm">{category.skills.length} skills</p>
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full transition-all duration-300 ${
              canScrollLeft
                ? theme === 'theme-light'
                  ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                  : 'bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300'
                : 'opacity-30 cursor-not-allowed bg-gray-100 border border-gray-200 text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={!canScrollRight}
            className={`p-3 rounded-full transition-all duration-300 ${
              canScrollRight
                ? theme === 'theme-light'
                  ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                  : 'bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300'
                : 'opacity-30 cursor-not-allowed bg-gray-100 border border-gray-200 text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex space-x-6"
          drag="x"
          dragConstraints={{ left: -maxIndex * cardWidth, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {category.skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Progress Dots */}
        {category.skills.length > visibleCards && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? theme === 'theme-light' ? 'bg-blue-500' : 'bg-blue-400'
                    : theme === 'theme-light' ? 'bg-gray-300' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function SkillCarousel({ categories }: SkillCarouselProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {/* Featured Skills Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
          theme === 'theme-light'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-blue-900/30 text-blue-300 border border-blue-800'
        }`}>
          ✨ Interactive Skills Showcase
        </div>
        <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
          Swipe or use navigation arrows to explore my technical expertise across different categories
        </p>
      </motion.div>

      {/* Category Carousels */}
      <div className="space-y-12">
        {categories.map((category, index) => (
          <CategoryCarousel 
            key={category.id} 
            category={category} 
            categoryIndex={index}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        className={`mt-16 p-8 rounded-3xl border backdrop-blur-md text-center ${
          theme === 'theme-light'
            ? 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200'
            : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold light-text mb-4">Technical Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {categories.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
            <div className="text-sm light-text opacity-70 uppercase tracking-wider">Total Skills</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-500 mb-2">
              {categories.reduce((acc, cat) => acc + cat.skills.filter(s => s.level >= 4).length, 0)}
            </div>
            <div className="text-sm light-text opacity-70 uppercase tracking-wider">Advanced+</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {categories.length}
            </div>
            <div className="text-sm light-text opacity-70 uppercase tracking-wider">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">6+</div>
            <div className="text-sm light-text opacity-70 uppercase tracking-wider">Years Exp.</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}