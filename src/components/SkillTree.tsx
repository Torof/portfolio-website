"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { AdvancedSkill, SkillCategory } from '@/lib/types';

interface SkillNode {
  id: string;
  skill: AdvancedSkill;
  x: number;
  y: number;
  connections: string[];
  category: string;
  level: number;
}

interface SkillTreeProps {
  categories: SkillCategory[];
}

export default function SkillTree({ categories }: SkillTreeProps) {
  const { theme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<AdvancedSkill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryColors = {
    'smart-contracts': { bg: 'from-blue-500 to-purple-600', text: 'text-blue-400', glow: 'shadow-blue-500/30' },
    'defi': { bg: 'from-green-500 to-blue-600', text: 'text-green-400', glow: 'shadow-green-500/30' },
    'layer2': { bg: 'from-purple-500 to-pink-600', text: 'text-purple-400', glow: 'shadow-purple-500/30' },
    'security': { bg: 'from-red-500 to-orange-600', text: 'text-red-400', glow: 'shadow-red-500/30' },
    'development': { bg: 'from-cyan-500 to-blue-600', text: 'text-cyan-400', glow: 'shadow-cyan-500/30' },
  };

  // Generate skill network layout
  useEffect(() => {
    const generateSkillNetwork = () => {
      const nodes: SkillNode[] = [];
      const centerX = 400;
      const centerY = 300;
      
      // Create circular layout for each category
      categories.forEach((category, categoryIndex) => {
        const categoryAngle = (categoryIndex / categories.length) * 2 * Math.PI;
        const categoryRadius = 200;
        const categoryCenterX = centerX + Math.cos(categoryAngle) * categoryRadius;
        const categoryCenterY = centerY + Math.sin(categoryAngle) * categoryRadius;

        category.skills.forEach((skill, skillIndex) => {
          const skillAngle = (skillIndex / category.skills.length) * 2 * Math.PI;
          const skillRadius = 80 + (skill.level * 10); // Spread based on skill level
          
          const x = categoryCenterX + Math.cos(skillAngle) * skillRadius;
          const y = categoryCenterY + Math.sin(skillAngle) * skillRadius;

          // Generate connections to related skills
          const connections: string[] = [];
          
          // Connect to skills in same category (nearby skills)
          const nearbySkills = category.skills.filter((_, i) => 
            Math.abs(i - skillIndex) <= 2 && i !== skillIndex
          );
          nearbySkills.forEach(nearbySkill => {
            if (Math.random() > 0.5) { // 50% chance of connection
              connections.push(nearbySkill.id);
            }
          });

          // Connect to related skills in other categories
          if (skill.level >= 4) { // High-level skills connect across categories
            categories.forEach(otherCategory => {
              if (otherCategory.id !== category.id) {
                const relatedSkills = otherCategory.skills.filter(s => s.level >= 3);
                if (relatedSkills.length > 0 && Math.random() > 0.7) {
                  const randomRelated = relatedSkills[Math.floor(Math.random() * relatedSkills.length)];
                  connections.push(randomRelated.id);
                }
              }
            });
          }

          nodes.push({
            id: skill.id,
            skill,
            x,
            y,
            connections,
            category: category.id,
            level: skill.level
          });
        });
      });

      setSkillNodes(nodes);
    };

    generateSkillNetwork();
  }, [categories]);

  const getNodeConnections = (nodeId: string) => {
    const node = skillNodes.find(n => n.id === nodeId);
    if (!node) return [];
    
    return skillNodes.filter(n => 
      node.connections.includes(n.id) || n.connections.includes(nodeId)
    );
  };

  const handleNodeClick = (skill: AdvancedSkill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
  };

  return (
    <div className="relative w-full">
      {/* Interactive Network Container */}
      <div 
        ref={containerRef}
        className={`relative w-full h-[600px] rounded-3xl border backdrop-blur-md overflow-hidden ${
          theme === 'theme-light'
            ? 'bg-gradient-to-br from-gray-50/90 to-blue-50/90 border-gray-200'
            : 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700'
        }`}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {skillNodes.map(node => 
            node.connections.map(connectionId => {
              const connectedNode = skillNodes.find(n => n.id === connectionId);
              if (!connectedNode) return null;

              const isHighlighted = hoveredSkill === node.id || hoveredSkill === connectionId;
              const opacity = isHighlighted ? 0.8 : 0.2;

              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke={theme === 'theme-light' ? '#64748b' : '#94a3b8'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  opacity={opacity}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: Math.random() * 2 }}
                />
              );
            })
          )}
        </svg>

        {/* Skill Nodes */}
        {skillNodes.map((node, index) => {
          const categoryColor = categoryColors[node.category as keyof typeof categoryColors];
          const isHovered = hoveredSkill === node.id;
          const isConnected = hoveredSkill ? getNodeConnections(hoveredSkill).some(n => n.id === node.id) : false;
          const isSelected = selectedSkill?.id === node.id;

          return (
            <motion.div
              key={node.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                isHovered || isConnected || isSelected ? 'z-20' : 'z-10'
              }`}
              style={{ left: node.x, top: node.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered || isSelected ? 1.2 : 1,
                opacity: hoveredSkill && !isHovered && !isConnected ? 0.3 : 1
              }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                type: "spring",
                stiffness: 300
              }}
              onClick={() => handleNodeClick(node.skill)}
              onMouseEnter={() => setHoveredSkill(node.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Node Circle */}
              <div className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                theme === 'theme-light'
                  ? `bg-white border-gray-300 shadow-lg ${isHovered || isSelected ? categoryColor.glow : ''}`
                  : `bg-slate-800 border-slate-600 shadow-lg ${isHovered || isSelected ? categoryColor.glow : ''}`
              }`}>
                <div className="absolute inset-0 flex items-center justify-center text-lg">
                  {node.skill.icon}
                </div>
                
                {/* Level indicator */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white bg-gradient-to-r ${categoryColor.bg}`}>
                  {node.level}
                </div>

                {/* Pulse effect for high-level skills */}
                {node.level >= 4 && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColor.bg} opacity-20 animate-ping`}></div>
                )}
              </div>

              {/* Skill Name on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                      theme === 'theme-light'
                        ? 'bg-white border border-gray-200 text-gray-800 shadow-lg'
                        : 'bg-slate-800 border border-slate-600 text-white shadow-lg'
                    }`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {node.skill.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Network Stats */}
        <div className={`absolute top-4 left-4 px-4 py-2 rounded-lg ${
          theme === 'theme-light'
            ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
            : 'bg-slate-800/80 backdrop-blur-sm border border-slate-600'
        }`}>
          <div className="text-sm font-medium light-text">
            {skillNodes.length} Skills • {skillNodes.reduce((acc, node) => acc + node.connections.length, 0)} Connections
          </div>
        </div>

        {/* Instructions */}
        <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg ${
          theme === 'theme-light'
            ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
            : 'bg-slate-800/80 backdrop-blur-sm border border-slate-600'
        }`}>
          <div className="text-xs light-text opacity-70">
            Hover to explore • Click for details
          </div>
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
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${
                    categoryColors[selectedSkill.category as keyof typeof categoryColors].bg
                  } text-white`}>
                    Level {selectedSkill.level}
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