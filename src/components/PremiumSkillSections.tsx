"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';
import SecurityDefenseSystem from './SecurityDefenseSystem';

interface PremiumSkillSectionsProps {
  categories: SkillCategory[];
}

// Smart Contracts - Single-Side Gear Wheel
const SmartContractsSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    // Don't prevent default - let the browser handle scrolling naturally
    // We just use the wheel event to detect scroll direction for our custom logic
    
    const delta = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex(prev => {
      const newIndex = prev + delta;
      // Infinite loop - wrap around
      if (newIndex < 0) return category.skills.length - 1;
      if (newIndex >= category.skills.length) return 0;
      return newIndex;
    });
  };

  const handleShuffle = () => {
    if (isShuffling) return; // Prevent multiple shuffles
    
    setIsShuffling(true);
    
    // Casino-like wheel spinning: 2 full rotations + landing on selected card
    const totalCards = category.skills.length;
    const finalIndex = Math.floor(Math.random() * totalCards);
    const fullRotations = 2; // Two full rotations
    
    // Calculate the shortest path to the final index after full rotations
    let stepsToFinal;
    if (finalIndex >= currentIndex) {
      stepsToFinal = finalIndex - currentIndex;
    } else {
      stepsToFinal = totalCards - currentIndex + finalIndex;
    }
    
    const totalSteps = fullRotations * totalCards + stepsToFinal;
    
    let currentStep = 0;
    const startingIndex = currentIndex;
    
    const spin = () => {
      if (currentStep < totalSteps) {
        // Calculate current index position (sequential movement through cards)
        const newIndex = (startingIndex + currentStep + 1) % totalCards;
        setCurrentIndex(newIndex);
        currentStep++;
        
        // Dynamic delay: start fast, slow down exponentially near the end
        const progress = currentStep / totalSteps;
        const baseDelay = 50;
        const maxDelay = 300;
        const delay = baseDelay + (maxDelay - baseDelay) * Math.pow(progress, 2.5);
        
        setTimeout(spin, delay);
      } else {
        // Animation naturally ends on the final index, no jump needed
        setIsShuffling(false);
      }
    };
    
    spin();
  };

  if (!mounted) {
    return <div className="mb-24 h-96" />; // Placeholder during hydration
  }

  return (
    <section className="mb-24">
      <motion.div 
        className={`relative p-8 rounded-2xl border-4 backdrop-blur-xl overflow-hidden ${
          theme === 'theme-light'
            ? 'bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400 border-gray-400 shadow-2xl'
            : 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 border-gray-400 shadow-2xl'
        }`}
        animate={isShuffling ? {
          borderColor: theme === 'theme-light' 
            ? ['rgba(56, 189, 248, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(56, 189, 248, 0.8)']
            : ['rgba(56, 189, 248, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(56, 189, 248, 0.6)']
        } : {}}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        
        {/* Retro neon pulse effects during shuffle */}
        {isShuffling && (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255, 20, 147, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(255, 255, 0, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(0, 255, 255, 0.2) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {/* Header */}
        <div className="mb-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            {/* Left: Title and Icon */}
            <div className="flex items-center">
              <div className={`p-3 rounded-xl mr-4 relative ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-slate-400 via-gray-300 to-slate-500 shadow-lg shadow-slate-400/40' 
                  : 'bg-gradient-to-br from-slate-600 via-gray-500 to-slate-700 shadow-lg shadow-slate-500/50'
              }`}>
                {/* Chrome shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-pulse" />
                
                {/* Retro neon border */}
                <div className={`absolute inset-0 rounded-xl border-2 ${
                  theme === 'theme-light' ? 'border-cyan-400/50' : 'border-cyan-400/70'
                } animate-pulse`} />
                
                <motion.div
                  animate={{ rotate: currentIndex * 15 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="relative z-10"
                >
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${
                  theme === 'theme-light' 
                    ? 'from-slate-600 via-gray-400 to-slate-700 bg-clip-text text-transparent' 
                    : 'from-slate-200 via-white to-slate-300 bg-clip-text text-transparent'
                } drop-shadow-lg`} style={{ 
                  textShadow: theme === 'theme-light' 
                    ? '0 0 10px rgba(56, 189, 248, 0.5)' 
                    : '0 0 10px rgba(56, 189, 248, 0.7)' 
                }}>
                  Smart Contract Standards
                </h3>
                <p className={`text-xs font-normal opacity-60 ${
                  theme === 'theme-light' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {category.skills.length} standards • Scroll wheel to navigate • Use arrows to browse
                </p>
              </div>
            </div>
            
            {/* Center: Shuffle Button */}
            <div className="text-center">
              <div className={`text-xs font-bold mb-2 ${
                theme === 'theme-light' ? 'text-cyan-600' : 'text-cyan-400'
              }`} style={{ 
                textShadow: theme === 'theme-light' 
                  ? '0 0 5px rgba(56, 189, 248, 0.5)' 
                  : '0 0 5px rgba(56, 189, 248, 0.8)' 
              }}>
                Try your luck! ↓
              </div>
              <motion.button
                onClick={handleShuffle}
                disabled={isShuffling}
                className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden border-2 ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 hover:from-slate-500 hover:via-gray-400 hover:to-slate-600 text-white shadow-lg shadow-slate-400/40 border-cyan-400'
                    : 'bg-gradient-to-r from-slate-600 via-gray-500 to-slate-700 hover:from-slate-700 hover:via-gray-600 hover:to-slate-800 text-white shadow-lg shadow-slate-500/50 border-cyan-400'
                } ${isShuffling ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-500/60'}`}
                whileHover={!isShuffling ? { scale: 1.08 } : {}}
                whileTap={!isShuffling ? { scale: 0.92 } : {}}
                title="Spin the retro wheel to randomly select a standard"
              >
                {/* Chrome shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full animate-pulse" />
                
                {/* Neon border effect during spinning */}
                {isShuffling && (
                  <div className="absolute inset-0 rounded-xl border-2 border-pink-500 animate-pulse">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-cyan-500/20 animate-pulse" />
                  </div>
                )}
                
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{isShuffling ? '⚡ SPINNING...' : '🎲 RANDOM'}</span>
                </span>
              </motion.button>
            </div>
            
            {/* Right: Counter */}
            <div className={`text-sm px-4 py-2 rounded-xl font-bold border-2 ${
              theme === 'theme-light' 
                ? 'bg-gradient-to-r from-slate-200 to-slate-300 border-cyan-400 text-slate-800 shadow-lg shadow-cyan-400/30' 
                : 'bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/40'
            }`} style={{
              textShadow: theme === 'theme-light' 
                ? '0 0 5px rgba(56, 189, 248, 0.6)' 
                : '0 0 8px rgba(56, 189, 248, 0.8)'
            }}>
              <span className="font-mono">⚡ {String(currentIndex + 1).padStart(2, '0')} / {String(category.skills.length).padStart(2, '0')}</span>
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
                    <div className={`p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 h-full relative overflow-hidden ${
                      isCenter
                        ? theme === 'theme-light'
                          ? 'bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300 border-cyan-400 shadow-2xl'
                          : 'bg-gradient-to-br from-slate-700 via-gray-600 to-slate-800 border-cyan-400 shadow-2xl'
                        : theme === 'theme-light'
                          ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400'
                          : 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
                    }`}>
                      {/* Chrome shine effect for center card */}
                      {isCenter && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />
                          <div className={`absolute inset-0 border-2 rounded-xl ${
                            theme === 'theme-light' ? 'border-pink-400/50' : 'border-pink-400/70'
                          } animate-pulse`} />
                        </>
                      )}
                      <div className="flex items-center space-x-3" style={{ marginLeft: `${60 - (Math.abs(offset) * 3)}px` }}> {/* Text closer to left edge */}
                        <div className={`text-sm font-bold px-3 py-1.5 rounded-lg relative overflow-hidden border ${
                          isCenter
                            ? theme === 'theme-light'
                              ? 'bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 text-white shadow-lg shadow-slate-400/40 border-cyan-400'
                              : 'bg-gradient-to-r from-slate-600 via-gray-500 to-slate-700 text-white shadow-lg shadow-slate-500/50 border-cyan-400'
                            : theme === 'theme-light' 
                              ? 'bg-gray-200 text-gray-700 border-gray-300' 
                              : 'bg-slate-700 text-gray-300 border-slate-600'
                        }`}>
                          {/* Chrome shine for center badge */}
                          {isCenter && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-pulse" />
                          )}
                          <span className="relative z-10" style={{
                            textShadow: isCenter 
                              ? theme === 'theme-light' 
                                ? '0 0 5px rgba(56, 189, 248, 0.5)' 
                                : '0 0 8px rgba(56, 189, 248, 0.8)'
                              : 'none'
                          }}>
                            ERC-{skill.id.includes('erc') ? skill.id.replace('erc', '').replace('-', '') : 'STD'}
                          </span>
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

          {/* Retro Neon Selector */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="relative">
              {/* Retro chrome arrow pointer */}
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 6, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className={`w-0 h-0 ${
                  theme === 'theme-light'
                    ? 'border-l-[26px] border-l-slate-500 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent'
                    : 'border-l-[26px] border-l-slate-400 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent'
                } drop-shadow-xl`} />
                
                {/* Neon outline */}
                <div className={`absolute inset-0 w-0 h-0 ${
                  theme === 'theme-light'
                    ? 'border-l-[28px] border-l-cyan-500 border-t-[17px] border-t-transparent border-b-[17px] border-b-transparent'
                    : 'border-l-[28px] border-l-cyan-400 border-t-[17px] border-t-transparent border-b-[17px] border-b-transparent'
                } opacity-60 animate-pulse`} style={{ transform: 'translate(-1px, -0.5px)' }} />
              </motion.div>
              
              {/* Cyan glowing effect */}
              <div className={`absolute -top-4 -left-8 w-12 h-8 rounded-full blur-lg ${
                theme === 'theme-light'
                  ? 'bg-cyan-500/50'
                  : 'bg-cyan-400/60'
              } animate-pulse`} />
              
              {/* Retro spark effect */}
              <motion.div 
                className={`absolute -top-1 -left-1 w-1 h-1 rounded-full ${
                  theme === 'theme-light' ? 'bg-pink-500' : 'bg-pink-400'
                }`}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 0.3
                }}
              />
            </div>
          </div>
          
          
          {/* Retro Chrome Navigation buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev - 1;
                return newIndex < 0 ? category.skills.length - 1 : newIndex;
              })}
              className={`p-3 rounded-xl transition-all hover:scale-110 border-2 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 border-cyan-400 text-white shadow-lg shadow-slate-400/40'
                  : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-cyan-400 text-white shadow-lg shadow-slate-500/50'
              }`}
              title="Previous standard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
                filter: theme === 'theme-light' 
                  ? 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.5))' 
                  : 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.8))'
              }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev + 1;
                return newIndex >= category.skills.length ? 0 : newIndex;
              })}
              className={`p-3 rounded-xl transition-all hover:scale-110 border-2 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 border-cyan-400 text-white shadow-lg shadow-slate-400/40'
                  : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-cyan-400 text-white shadow-lg shadow-slate-500/50'
              }`}
              title="Next standard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
                filter: theme === 'theme-light' 
                  ? 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.5))' 
                  : 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.8))'
              }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          </div>

          {/* Retro Chrome Info Card for Selected Standard - Right Half */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 p-6 flex items-center">
            <div className={`w-full h-full rounded-lg border-2 p-6 backdrop-blur-sm relative overflow-hidden ${
              theme === 'theme-light'
                ? 'bg-gradient-to-br from-slate-200 via-gray-100 to-slate-300 border-cyan-400 shadow-xl'
                : 'bg-gradient-to-br from-slate-800 via-gray-700 to-slate-900 border-cyan-400 shadow-xl'
            }`}>
              {/* Retro chrome shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse opacity-60" />
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

      </motion.div>
    </section>
  );
};

// DeFi - Retro Trading Terminal Theme
const DeFiSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Update time every second for retro terminal feel
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock price data for retro feel
  const getPriceChange = (index: number) => {
    const changes = ['+2.34%', '-0.89%', '+5.12%', '-1.23%', '+0.45%', '+3.67%', '-2.11%', '+1.89%'];
    return changes[index % changes.length];
  };

  const getTVL = (level: number) => {
    const base = level * 250;
    return `$${base}M`;
  };

  // Get detailed protocol information
  const getProtocolDetails = (skill: any) => {
    const usageDescriptions: { [key: string]: string } = {
      'DEX': `I architect and optimize automated market maker (AMM) systems, implementing custom trading strategies and liquidity pool integrations. My expertise includes MEV protection, arbitrage mechanisms, and cross-chain bridge development for seamless asset transfers.`,
      'Lending': `I design sophisticated lending and borrowing protocols with dynamic interest rate models and advanced collateral management systems. My work focuses on risk assessment algorithms, liquidation mechanisms, and yield optimization strategies.`,
      'Yield Farming': `I create auto-compounding yield farming strategies and implement complex reward distribution mechanisms. My expertise covers liquidity mining protocols, governance token economics, and sustainable yield generation models.`,
      'Derivatives': `I build advanced derivatives platforms with options, futures, and perpetual contracts. My implementations include synthetic asset protocols, prediction markets, and automated settlement systems.`,
      'default': `I integrate this protocol into comprehensive DeFi ecosystems, focusing on interoperability, gas optimization, and security best practices. My implementations emphasize user experience and robust smart contract architecture.`
    };

    return {
      description: skill.description,
      usage: usageDescriptions[skill.subcategory] || usageDescriptions['default'],
      features: skill.examples || []
    };
  };

  return (
    <section className="mb-24">
      <div className={`relative overflow-hidden rounded-lg border-2 ${
        theme === 'theme-light'
          ? 'bg-amber-50 border-amber-900 shadow-xl'
          : 'bg-black border-green-500 shadow-2xl shadow-green-500/20'
      }`}>
        
        {/* CRT Screen Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 ${
            theme === 'theme-light' 
              ? 'bg-gradient-to-b from-transparent via-amber-900/5 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-green-500/10 to-transparent'
          } animate-pulse`} style={{ animationDuration: '4s' }} />
          
          {/* Scanlines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${theme === 'theme-light' ? 'rgba(139, 69, 19, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 2px,
              ${theme === 'theme-light' ? 'rgba(139, 69, 19, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 4px
            )`
          }} />
        </div>

        <div className="relative z-10">
          {/* Terminal Header */}
          <div className={`px-6 py-3 border-b-2 ${
            theme === 'theme-light' 
              ? 'bg-amber-100 border-amber-900' 
              : 'bg-green-950/50 border-green-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`font-mono text-xs ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  DEFI_TERMINAL_v2.0
                </div>
                <div className={`font-mono text-xs ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
                }`}>
                  [CONNECTED]
                </div>
              </div>
              <div className={`font-mono text-xs ${
                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
              }`}>
                {mounted && currentTime ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--'}
              </div>
            </div>
          </div>

          {/* Main Terminal Content */}
          <div className="p-6">
            {/* Title Section */}
            <div className="mb-6 text-center">
              <motion.h3 
                className={`font-mono text-3xl font-bold mb-2 ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ═══ DEFI PROTOCOL EXPERTISE ═══
              </motion.h3>
              <div className={`font-mono text-sm ${
                theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
              }`}>
                SYSTEM: {category.skills.length} PROTOCOLS LOADED | STATUS: OPERATIONAL
              </div>
            </div>

            {/* Market Stats Bar */}
            <div className={`grid grid-cols-3 gap-4 mb-6 p-3 border ${
              theme === 'theme-light' 
                ? 'bg-amber-100/50 border-amber-800' 
                : 'bg-green-950/30 border-green-600'
            }`}>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  TOTAL TVL
                </div>
                <motion.div 
                  className={`font-mono font-bold ${
                    theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                  }`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  $2.5B
                </motion.div>
              </div>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  AVG APY
                </div>
                <div className={`font-mono font-bold ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  12.8%
                </div>
              </div>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  GAS SAVED
                </div>
                <div className={`font-mono font-bold ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  $124K
                </div>
              </div>
            </div>

            {/* Protocol List - Trading Style */}
            <div className={`border-2 ${
              theme === 'theme-light' 
                ? 'border-amber-800 bg-amber-50/50' 
                : 'border-green-600 bg-black/50'
            }`}>
              {/* Table Header */}
              <div className={`grid grid-cols-12 gap-2 px-4 py-2 border-b-2 font-mono text-xs ${
                theme === 'theme-light' 
                  ? 'bg-amber-100 border-amber-800 text-amber-900' 
                  : 'bg-green-950/50 border-green-600 text-green-500'
              }`}>
                <div className="col-span-1">ID</div>
                <div className="col-span-3">PROTOCOL</div>
                <div className="col-span-2">TYPE</div>
                <div className="col-span-2">TVL</div>
                <div className="col-span-2">24H</div>
                <div className="col-span-2">STATUS</div>
              </div>

              {/* Protocol Rows */}
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  isExpanded 
                    ? 'max-h-none' 
                    : 'max-h-[320px] overflow-y-auto'
                } ${
                  theme === 'theme-light'
                    ? 'scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-100'
                    : 'scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-950'
                }`}
              >
                {category.skills.map((skill, index) => (
                  <div key={skill.id}>
                    <motion.div
                      className={`grid grid-cols-12 gap-2 px-4 py-3 border-b font-mono text-sm transition-all cursor-pointer ${
                        expandedProtocol === skill.id
                          ? theme === 'theme-light'
                            ? 'bg-amber-200 border-amber-300'
                            : 'bg-green-900/50 border-green-400'
                          : theme === 'theme-light'
                            ? 'border-amber-200 hover:bg-amber-100'
                            : 'border-green-900 hover:bg-green-950/30'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setExpandedProtocol(expandedProtocol === skill.id ? null : skill.id)}
                    >
                      <div className={`col-span-1 ${
                        theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={`col-span-3 font-bold flex items-center ${
                        theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                      }`}>
                        <span>{skill.name}</span>
                        <motion.div
                          className="ml-2"
                          animate={{ rotate: expandedProtocol === skill.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-xs">▶</span>
                        </motion.div>
                      </div>
                      <div className={`col-span-2 text-xs ${
                        theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
                      }`}>
                        {skill.subcategory}
                      </div>
                      <div className={`col-span-2 ${
                        theme === 'theme-light' ? 'text-amber-800' : 'text-green-400'
                      }`}>
                        {getTVL(skill.level)}
                      </div>
                      <div className={`col-span-2 font-bold ${
                        getPriceChange(index).startsWith('+') 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {getPriceChange(index)}
                      </div>
                      <div className="col-span-2">
                        <div className={`inline-flex items-center space-x-1 ${
                          skill.level >= 4 
                            ? 'text-green-600' 
                            : theme === 'theme-light' ? 'text-amber-600' : 'text-yellow-500'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            skill.level >= 4 ? 'bg-green-600' : 'bg-yellow-500'
                          } animate-pulse`} />
                          <span className="text-xs">
                            {skill.level >= 4 ? 'EXPERT' : 'ACTIVE'}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Expanded Protocol Details */}
                    <AnimatePresence>
                      {expandedProtocol === skill.id && (
                        <motion.div
                          className={`px-6 py-4 border-b-2 ${
                            theme === 'theme-light'
                              ? 'bg-amber-100/50 border-amber-300'
                              : 'bg-green-950/20 border-green-700'
                          }`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-4">
                            {/* Protocol Overview */}
                            <div>
                              <div className={`font-mono text-sm font-bold mb-2 ${
                                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                              }`}>
                                {'>>>'} PROTOCOL_OVERVIEW:
                              </div>
                              <div className={`font-mono text-xs leading-relaxed ${
                                theme === 'theme-light' ? 'text-amber-800' : 'text-green-300'
                              }`}>
                                {getProtocolDetails(skill).description}
                              </div>
                            </div>

                            {/* My Usage */}
                            <div>
                              <div className={`font-mono text-sm font-bold mb-2 ${
                                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                              }`}>
                                {'>>>'} HOW_I_USE_IT:
                              </div>
                              <div className={`font-mono text-xs leading-relaxed ${
                                theme === 'theme-light' ? 'text-amber-800' : 'text-green-300'
                              }`}>
                                {getProtocolDetails(skill).usage}
                              </div>
                            </div>

                            {/* Technical Features */}
                            {getProtocolDetails(skill).features.length > 0 && (
                              <div>
                                <div className={`font-mono text-sm font-bold mb-2 ${
                                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                                }`}>
                                  {'>>>'} KEY_FEATURES:
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {getProtocolDetails(skill).features.slice(0, 6).map((feature: string, idx: number) => (
                                    <div 
                                      key={idx}
                                      className={`font-mono text-xs px-2 py-1 border ${
                                        theme === 'theme-light'
                                          ? 'bg-amber-50 border-amber-600 text-amber-800'
                                          : 'bg-green-950/30 border-green-600 text-green-400'
                                      }`}
                                    >
                                      • {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Terminal Action */}
                            <div className={`pt-2 border-t font-mono text-xs ${
                              theme === 'theme-light' 
                                ? 'border-amber-300 text-amber-600' 
                                : 'border-green-700 text-green-600'
                            }`}>
                              {'>'} PROTOCOL_STATUS: ANALYZED | CLICK_TO_COLLAPSE
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Commands */}
            <div className="mt-6 flex items-center justify-between">
              <div className={`font-mono text-xs ${
                theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
              }`}>
                {'>'} EXECUTE: list --protocols --status=active
              </div>
              
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-4 py-2 font-mono text-sm border-2 transition-all ${
                  theme === 'theme-light'
                    ? 'bg-amber-100 border-amber-800 text-amber-900 hover:bg-amber-200'
                    : 'bg-green-950/50 border-green-500 text-green-400 hover:bg-green-900/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
              </motion.button>
            </div>

            {/* Footer Status */}
            <div className={`mt-4 pt-4 border-t font-mono text-xs ${
              theme === 'theme-light' 
                ? 'border-amber-300 text-amber-700' 
                : 'border-green-800 text-green-600'
            }`}>
              <div className="flex justify-between">
                <div>SESSION: AUTHENTICATED | USER: BLOCKCHAIN_DEV</div>
                <div>NETWORK: ETHEREUM MAINNET</div>
              </div>
            </div>
          </div>
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
                  Multi-Chain Architecture
                </h4>
                <div className={`space-y-3 text-sm ${
                  theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <p>
                    I specialize in building cross-chain applications that leverage the unique strengths of each Layer 2 network:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Arbitrum & Optimism:</strong> DeFi protocols with complex logic and composability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Polygon & Base:</strong> High-volume consumer applications and gaming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>zkSync Era & Scroll:</strong> Privacy-focused and ZK-powered applications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span><strong>Gnosis & Berachain:</strong> DAOs and innovative consensus mechanisms</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    My expertise includes implementing secure cross-chain messaging, unified liquidity management, and seamless user experiences across multiple networks.
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
      </div>
    </section>
  );
};

// Security - High-End Surveillance Theme
const SecuritySection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate deterministic pattern based on index to avoid hydration mismatch
  const getGridPattern = (index: number) => {
    // Use deterministic logic instead of Math.random()
    const isActive = (index * 7) % 13 === 0; // Every ~13th item
    const isAnimated = (index * 11) % 17 === 0; // Every ~17th item
    return { isActive, isAnimated };
  };

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/80 via-red-50/40 to-orange-50/30 border-slate-200/30 shadow-2xl shadow-red-500/5'
          : 'bg-gradient-to-br from-slate-900/90 via-red-900/10 to-orange-900/10 border-slate-700/50 shadow-2xl shadow-red-500/5'
      }`}>
        
        {/* Surveillance grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-6 gap-2 h-full">
            {Array.from({ length: 60 }).map((_, i) => {
              const { isActive, isAnimated } = getGridPattern(i);
              return (
                <motion.div
                  key={i}
                  className={`border ${
                    theme === 'theme-light' ? 'border-slate-300' : 'border-slate-700'
                  } ${
                    mounted && isActive ? 'bg-red-500/20' : ''
                  }`}
                  animate={mounted && isAnimated ? {
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: [
                      "rgba(239, 68, 68, 0.1)",
                      "rgba(239, 68, 68, 0.3)",
                      "rgba(239, 68, 68, 0.1)"
                    ]
                  } : {}}
                  transition={{
                    duration: 2 + (i % 3), // Deterministic duration based on index
                    repeat: Infinity,
                    delay: (i % 5) * 0.8, // Deterministic delay based on index
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              animate={{
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className={`p-6 rounded-2xl ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-slate-700 to-red-600 shadow-xl shadow-red-500/25' 
                  : 'bg-gradient-to-br from-slate-800 to-red-700 shadow-xl shadow-red-500/25'
              }`}>
                <span className="text-6xl text-white">🛡️</span>
              </div>
            </motion.div>
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Security <span className="font-bold bg-gradient-to-r from-slate-700 to-red-600 bg-clip-text text-transparent">& Auditing</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Military-grade security protocols and comprehensive vulnerability assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`group relative p-8 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 overflow-hidden ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-br from-white/90 to-slate-50/60 border-slate-200/50 hover:border-red-300/50 hover:shadow-2xl hover:shadow-red-500/10'
                    : 'bg-gradient-to-br from-slate-800/90 to-slate-900/60 border-slate-700/50 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Security scan line effect */}
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <motion.div 
                      className={`p-4 rounded-xl mr-4 ${
                        theme === 'theme-light' 
                          ? 'bg-gradient-to-br from-slate-100 to-red-100' 
                          : 'bg-gradient-to-br from-slate-700 to-red-900/50'
                      }`}
                      whileHover={{ rotateX: 15, rotateY: 15 }}
                    >
                      <span className="text-2xl">{skill.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold light-text mb-2 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.level >= 4 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                        } shadow-sm`}>
                          {skill.level >= 4 ? 'SECURE' : 'MONITORING'}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === 'theme-light' 
                            ? 'bg-slate-100 text-slate-800' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          Level {skill.level}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Threat assessment display */}
                  <div className="text-right">
                    <motion.div 
                      className="text-xs font-medium text-emerald-500 mb-2"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      THREAT LEVEL: LOW
                    </motion.div>
                    <div className="flex justify-end space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm light-text opacity-70 leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Security metrics dashboard */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-emerald-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {skill.level * 50}+
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider">Audits Complete</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-red-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      {Math.max(0, 5 - skill.level)}
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider">Critical Issues</div>
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


export default function PremiumSkillSections({ categories }: PremiumSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
    'security': SecurityDefenseSystem,
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