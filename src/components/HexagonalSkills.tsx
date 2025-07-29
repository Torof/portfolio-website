"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface HexagonProps {
  skill: AdvancedSkill;
  position: { row: number; col: number };
  isHovered: boolean;
  isConnected: boolean;
  onHover: (skillId: string | null) => void;
  onClick: (skill: AdvancedSkill) => void;
}

interface HexagonalSkillsProps {
  categories: SkillCategory[];
}

const Hexagon = ({ skill, position, isHovered, isConnected, onHover, onClick }: HexagonProps) => {
  const { theme } = useTheme();
  
  const categoryColors = {
    'smart-contracts': { 
      bg: 'from-blue-500 to-purple-600', 
      border: 'border-blue-400',
      glow: 'shadow-blue-500/30',
      light: 'bg-blue-400'
    },
    'defi': { 
      bg: 'from-green-500 to-blue-600', 
      border: 'border-green-400',
      glow: 'shadow-green-500/30',
      light: 'bg-green-400'
    },
    'layer2': { 
      bg: 'from-purple-500 to-pink-600', 
      border: 'border-purple-400',
      glow: 'shadow-purple-500/30',
      light: 'bg-purple-400'
    },
    'security': { 
      bg: 'from-red-500 to-orange-600', 
      border: 'border-red-400',
      glow: 'shadow-red-500/30',
      light: 'bg-red-400'
    },
    'development': { 
      bg: 'from-cyan-500 to-blue-600', 
      border: 'border-cyan-400',
      glow: 'shadow-cyan-500/30',
      light: 'bg-cyan-400'
    },
  };

  const colors = categoryColors[skill.category as keyof typeof categoryColors];
  const size = 80 + (skill.level * 8); // Size based on skill level

  // Calculate hexagon position
  const hexWidth = 120;
  const hexHeight = 104;
  const xOffset = position.col * (hexWidth * 0.75);
  const yOffset = position.row * hexHeight + (position.col % 2) * (hexHeight / 2);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: xOffset, 
        top: yOffset,
        width: size,
        height: size
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isHovered ? 1.2 : 1,
        opacity: isConnected || isHovered ? 1 : (isConnected === false ? 0.3 : 1)
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(skill)}
    >
      {/* Hexagon SVG */}
      <svg
        width={size}
        height={size}
        className={`transition-all duration-300 ${
          isHovered || isConnected ? colors.glow : ''
        }`}
        style={{ filter: isHovered ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' : 'none' }}
      >
        {/* Background hexagon */}
        <polygon
          points={`
            ${size * 0.5},${size * 0.1} 
            ${size * 0.9},${size * 0.3} 
            ${size * 0.9},${size * 0.7} 
            ${size * 0.5},${size * 0.9} 
            ${size * 0.1},${size * 0.7} 
            ${size * 0.1},${size * 0.3}
          `}
          className={`transition-all duration-300 ${
            theme === 'theme-light'
              ? `fill-white stroke-2 ${colors.border}`
              : `fill-slate-800 stroke-2 ${colors.border}`
          }`}
          strokeWidth="2"
        />
        
        {/* Gradient overlay for skill level */}
        <defs>
          <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.border.replace('border-', '').replace('-400', '')} stopOpacity="0.1" />
            <stop offset="100%" stopColor={colors.border.replace('border-', '').replace('-400', '')} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <polygon
          points={`
            ${size * 0.5},${size * 0.1} 
            ${size * 0.9},${size * 0.3} 
            ${size * 0.9},${size * 0.7} 
            ${size * 0.5},${size * 0.9} 
            ${size * 0.1},${size * 0.7} 
            ${size * 0.1},${size * 0.3}
          `}
          fill={`url(#gradient-${skill.id})`}
          className="transition-all duration-300"
          style={{ 
            opacity: isHovered ? 0.8 : 0.4 
          }}
        />

        {/* Skill level indicator dots */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={size * 0.2 + (i * size * 0.15)}
            cy={size * 0.85}
            r="3"
            className={`transition-all duration-300 ${
              i < skill.level ? colors.light : 'fill-gray-400'
            }`}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <div className="text-2xl mb-1">{skill.icon}</div>
        <div className={`text-xs font-bold leading-tight ${
          theme === 'theme-light' ? 'text-slate-800' : 'text-white'
        }`}>
          {skill.name.split(' ').slice(0, 2).join(' ')}
        </div>
        
        {/* Level badge */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white bg-gradient-to-r ${colors.bg} shadow-lg`}>
          {skill.level}
        </div>
      </div>

      {/* Pulse effect for high-level skills */}
      {skill.level >= 4 && (
        <div className="absolute inset-0">
          <svg width={size} height={size} className="animate-ping opacity-20">
            <polygon
              points={`
                ${size * 0.5},${size * 0.1} 
                ${size * 0.9},${size * 0.3} 
                ${size * 0.9},${size * 0.7} 
                ${size * 0.5},${size * 0.9} 
                ${size * 0.1},${size * 0.7} 
                ${size * 0.1},${size * 0.3}
              `}
              className={`${colors.border.replace('border-', 'fill-')}`}
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default function HexagonalSkills({ categories }: HexagonalSkillsProps) {
  const { theme } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<AdvancedSkill | null>(null);
  const [skillPositions, setSkillPositions] = useState<Array<{ skill: AdvancedSkill; position: { row: number; col: number } }>>([]);

  // Generate hexagonal grid layout
  useEffect(() => {
    const allSkills = categories.flatMap(cat => cat.skills);
    const positions: Array<{ skill: AdvancedSkill; position: { row: number; col: number } }> = [];
    
    // Create a spiral pattern for better visual distribution
    let skillIndex = 0;
    const maxRadius = Math.ceil(Math.sqrt(allSkills.length) / 2) + 2;
    
    // Start from center and spiral outward
    for (let radius = 0; radius <= maxRadius && skillIndex < allSkills.length; radius++) {
      if (radius === 0) {
        // Center hexagon
        if (skillIndex < allSkills.length) {
          positions.push({
            skill: allSkills[skillIndex],
            position: { row: 0, col: 0 }
          });
          skillIndex++;
        }
      } else {
        // Hexagonal rings
        const hexagonsInRing = radius * 6;
        const angleStep = (2 * Math.PI) / hexagonsInRing;
        
        for (let i = 0; i < hexagonsInRing && skillIndex < allSkills.length; i++) {
          const angle = i * angleStep;
          const row = Math.round(radius * Math.cos(angle));
          const col = Math.round(radius * Math.sin(angle));
          
          positions.push({
            skill: allSkills[skillIndex],
            position: { row: row + 5, col: col + 5 } // Offset to keep positive coordinates
          });
          skillIndex++;
        }
      }
    }
    
    setSkillPositions(positions);
  }, [categories]);

  // Get related skills (same category or similar level)
  const getRelatedSkills = (skillId: string) => {
    const currentSkill = skillPositions.find(p => p.skill.id === skillId)?.skill;
    if (!currentSkill) return [];
    
    return skillPositions
      .filter(p => 
        p.skill.id !== skillId && (
          p.skill.category === currentSkill.category || 
          Math.abs(p.skill.level - currentSkill.level) <= 1
        )
      )
      .map(p => p.skill.id);
  };

  const handleSkillClick = (skill: AdvancedSkill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
  };

  return (
    <div className="w-full">
      {/* Hexagonal Grid Container */}
      <div className={`relative w-full min-h-[600px] rounded-3xl border backdrop-blur-md overflow-hidden p-8 ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-gray-50/90 to-blue-50/90 border-gray-200'
          : 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700'
      }`}>
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {hoveredSkill && getRelatedSkills(hoveredSkill).map(relatedId => {
            const hoveredPos = skillPositions.find(p => p.skill.id === hoveredSkill);
            const relatedPos = skillPositions.find(p => p.skill.id === relatedId);
            
            if (!hoveredPos || !relatedPos) return null;
            
            const startX = hoveredPos.position.col * 90 + 60;
            const startY = hoveredPos.position.row * 78 + 60;
            const endX = relatedPos.position.col * 90 + 60;
            const endY = relatedPos.position.row * 78 + 60;
            
            return (
              <motion.line
                key={`${hoveredSkill}-${relatedId}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={theme === 'theme-light' ? '#3B82F6' : '#60A5FA'}
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Hexagon Skills */}
        <div className="relative" style={{ zIndex: 2 }}>
          {skillPositions.map(({ skill, position }) => {
            const isHovered = hoveredSkill === skill.id;
            const isConnected = hoveredSkill ? getRelatedSkills(hoveredSkill).includes(skill.id) : null;
            
            return (
              <Hexagon
                key={skill.id}
                skill={skill}
                position={position}
                isHovered={isHovered}
                isConnected={isConnected === true}
                onHover={setHoveredSkill}
                onClick={handleSkillClick}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className={`absolute top-4 left-4 p-4 rounded-lg ${
          theme === 'theme-light'
            ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
            : 'bg-slate-800/80 backdrop-blur-sm border border-slate-600'
        }`}>
          <h4 className="font-semibold light-text mb-2 text-sm">Legend</h4>
          <div className="space-y-1 text-xs light-text opacity-70">
            <div>• Hexagon size = skill importance</div>
            <div>• Number badge = skill level (1-5)</div>
            <div>• Hover to see connections</div>
            <div>• Click for details</div>
          </div>
        </div>

        {/* Category Colors */}
        <div className={`absolute top-4 right-4 p-4 rounded-lg ${
          theme === 'theme-light'
            ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
            : 'bg-slate-800/80 backdrop-blur-sm border border-slate-600'
        }`}>
          <h4 className="font-semibold light-text text-sm mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center text-xs">
                <div className={`w-3 h-3 rounded border-2 mr-2 ${
                  category.id === 'smart-contracts' ? 'border-blue-400 bg-blue-400/20' :
                  category.id === 'defi' ? 'border-green-400 bg-green-400/20' :
                  category.id === 'layer2' ? 'border-purple-400 bg-purple-400/20' :
                  category.id === 'security' ? 'border-red-400 bg-red-400/20' :
                  'border-cyan-400 bg-cyan-400/20'
                }`}></div>
                <span className="light-text capitalize">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`absolute bottom-4 left-4 p-4 rounded-lg ${
          theme === 'theme-light'
            ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
            : 'bg-slate-800/80 backdrop-blur-sm border border-slate-600'
        }`}>
          <div className="text-sm font-medium light-text">
            {skillPositions.length} Skills • {categories.length} Categories
          </div>
          {hoveredSkill && (
            <div className="text-xs light-text opacity-70 mt-1">
              {getRelatedSkills(hoveredSkill).length} related skills highlighted
            </div>
          )}
        </div>
      </div>

      {/* Selected Skill Details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className={`mt-8 p-6 rounded-2xl border backdrop-blur-md ${
              theme === 'theme-light'
                ? 'bg-white/90 border-gray-200'
                : 'bg-slate-800/90 border-slate-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{selectedSkill.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold light-text mb-2">{selectedSkill.name}</h3>
                  <div className="flex items-center space-x-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedSkill.category === 'smart-contracts' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      selectedSkill.category === 'defi' ? 'bg-green-100 text-green-800 border border-green-300' :
                      selectedSkill.category === 'layer2' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                      selectedSkill.category === 'security' ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-cyan-100 text-cyan-800 border border-cyan-300'
                    }`}>
                      Level {selectedSkill.level}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mr-1 ${
                            i < selectedSkill.level ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'theme-light'
                    ? 'hover:bg-gray-100 text-gray-500'
                    : 'hover:bg-slate-700 text-slate-400'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="light-text opacity-80 mb-6">{selectedSkill.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSkill.examples && selectedSkill.examples.length > 0 && (
                <div>
                  <h4 className="font-semibold light-text mb-3">Key Areas</h4>
                  <ul className="space-y-2">
                    {selectedSkill.examples.map((example, index) => (
                      <li key={index} className="flex items-start text-sm light-text">
                        <span className="text-green-400 mr-2 mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                <div>
                  <h4 className="font-semibold light-text mb-3">Recent Experience</h4>
                  <ul className="space-y-2">
                    {selectedSkill.projects.map((project, index) => (
                      <li key={index} className="flex items-start text-sm light-text">
                        <span className="text-blue-400 mr-2 mt-1">→</span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}