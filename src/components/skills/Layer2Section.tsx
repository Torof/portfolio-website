"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory } from '@/lib/types';

interface Layer2SectionProps {
  category: SkillCategory;
}

// Layer 2 - Network Topology with Official Logos
const Layer2Section = ({ category }: Layer2SectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
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
  
  // Get translated tooltip description
  const getTooltipDescription = (skillId: string): string => {
    const tooltipKey = `layer2.tooltip.${skillId.toLowerCase()}`;
    return t(tooltipKey);
  };

  // Logo mapping for Layer 2 networks
  const getNetworkLogo = (skillId: string): string | null => {
    const logoMap: { [key: string]: string } = {
      'arbitrum': '/logos/arbitrum.svg',
      'optimism': '/logos/optimism.svg',
      'polygon': '/logos/polygon.svg',
      'base': '/logos/base.webp',
      'berachain': '/logos/berachain.svg',
      'gnosis': '/logos/gnosis.svg',
      'zksync-era': '/logos/zksync.svg',
      'scroll': '/logos/scroll.webp',
    };
    return logoMap[skillId] || null; // Return null for emoji-based items
  };

  // Position calculations for network layout
  const centerPos = { x: 50, y: 50 }; // Ethereum at center (percentage)
  const radius = 35; // Distance from center to L2 nodes (percentage) - increased
  const totalNodes = category.skills?.length || 0;
  
  // Debug: Check if we have valid skills
  if (!category.skills || totalNodes === 0) {
    console.warn('Layer2Section: No skills found in category', category);
    return null;
  }
  
  const nodePositions = (category.skills || []).map((skill, index) => {
    // Calculate angle for each node, starting from top (12 o'clock) and going clockwise
    // Prevent division by zero
    const safeTotal = totalNodes > 0 ? totalNodes : 1;
    const angleInRadians = (index / safeTotal) * 2 * Math.PI - Math.PI / 2;
    const x = centerPos.x + radius * Math.cos(angleInRadians);
    const y = centerPos.y + radius * Math.sin(angleInRadians);
    
    // Ensure calculated values are valid numbers
    const safeX = !isNaN(x) && isFinite(x) ? x : centerPos.x;
    const safeY = !isNaN(y) && isFinite(y) ? y : centerPos.y;
    
    // Debug logging (only for truly invalid cases)
    if (!isFinite(safeX) || !isFinite(safeY)) {
      console.error(`Critical: Invalid position calculated for skill ${skill.id}:`, { 
        index, safeTotal, angleInRadians, x, y, safeX, safeY 
      });
    }
    
    return { x: safeX, y: safeY };
  });

  // Final safety check: ensure all positions are valid
  const validPositions = nodePositions.every(pos => 
    pos && typeof pos.x === 'number' && typeof pos.y === 'number' && 
    isFinite(pos.x) && isFinite(pos.y)
  );
  
  if (!validPositions) {
    console.error('Layer2Section: Invalid positions detected', nodePositions);
    return null;
  }

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
                  {t('layer2.title')}
                </h3>
                <p className={`text-lg ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {t('layer2.subtitle')}
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
                {t('layer2.description')}
              </p>
            </div>
          </div>

          {/* Content Container - Flex Layout */}
          <div className="flex gap-8 items-start">
            {/* Left Side - Text Card */}
            <div className="flex-1 max-w-md">
              <div className={`p-6 rounded-xl border ${
                theme === 'theme-light'
                  ? 'bg-white/80 border-indigo-200 shadow-lg'
                  : 'bg-slate-800/80 border-indigo-700 shadow-xl'
              }`}>
                <h4 className={`text-xl font-bold mb-4 ${
                  theme === 'theme-light' ? 'text-indigo-900' : 'text-indigo-300'
                }`}>
                  {t('layer2.architecture.title')}
                </h4>
                <div className={`space-y-3 text-sm ${
                  theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <p>
                    {t('layer2.architecture.intro')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Arbitrum & Optimism:</strong> {t('layer2.architecture.arbitrum')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Polygon & Base:</strong> {t('layer2.architecture.polygon')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>zkSync Era & Scroll:</strong> {t('layer2.architecture.zksync')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Gnosis & Berachain:</strong> {t('layer2.architecture.gnosis')}</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    {t('layer2.architecture.conclusion')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Network Visualization */}
            <div className="relative h-[600px] flex-1 max-w-[600px]">
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
                // Safety check: ensure pos exists and has valid coordinates
                if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number' || !isFinite(pos.x) || !isFinite(pos.y)) return null;
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
              {hoveredNode && category.skills?.map((skill, index) => {
                if (skill.id !== hoveredNode) return null;
                const pos = nodePositions[index];
                // Safety check: ensure pos exists and has valid coordinates
                if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number' || !isFinite(pos.x) || !isFinite(pos.y)) return null;
                return (
                  <motion.circle
                    key={`flow-${skill.id}`}
                    r="0.5"
                    fill="#10b981"
                    initial={{
                      cx: centerPos.x,
                      cy: centerPos.y
                    }}
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
                      style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </foreignObject>
              </motion.g>

              {/* L2 Network Nodes (SVG) */}
              {category.skills.map((skill, index) => {
                const pos = nodePositions[index];
                const isHovered = hoveredNode === skill.id;
                // Safety check: ensure pos exists and has valid coordinates
                if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number' || !isFinite(pos.x) || !isFinite(pos.y)) return null;
                return (
                  <motion.g
                    key={skill.id}
                    style={{ 
                      cursor: 'pointer',
                      filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"
                    }}
                    onMouseEnter={() => handleMouseEnter(skill.id)}
                    onMouseLeave={handleMouseLeave}
                    initial={{ 
                      opacity: 0, 
                      scale: 0
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHovered ? 1.25 : 1,
                      filter: isHovered 
                        ? "drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))"
                        : "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"
                    }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6, 
                      type: "spring",
                      filter: { duration: 0.3 }
                    }}
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
                            src={getNetworkLogo(skill.id) || ''}
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
                // Safety check: ensure pos exists and has valid coordinates
                if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number' || !isFinite(pos.x) || !isFinite(pos.y)) return null;
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
                          src={getNetworkLogo(skill.id) || ''} 
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
                    {getTooltipDescription(skill.id)}
                  </p>

                  <div className="text-xs">
                    <div className={`${
                      theme === 'theme-light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <span className="font-medium">Type:</span> {skill.subcategory}
                    </div>
                  </div>
                </motion.div>
              ) : null;
            })}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layer2Section;