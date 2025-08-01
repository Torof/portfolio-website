"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory } from '@/lib/types';

interface SmartContractsSectionProps {
  category: SkillCategory;
}

// Smart Contracts - Single-Side Gear Wheel
const SmartContractsSection = ({ category }: SmartContractsSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to get translated ERC description
  const getERCDescription = (skillId: string): string => {
    const key = `erc.${skillId}.description`;
    const translated = t(key);
    return translated !== key ? translated : category.skills.find(s => s.id === skillId)?.description || '';
  };
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
                {t('erc.wheel.tryLuck')}
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
                title={t('erc.wheel.spinTooltip')}
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
                  <span>{isShuffling ? t('erc.wheel.spinning') : t('erc.wheel.random')}</span>
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
                      isShuffling
                        ? theme === 'theme-light'
                          ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400'
                          : 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
                        : isCenter
                          ? theme === 'theme-light'
                            ? 'bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300 border-cyan-400 shadow-2xl'
                            : 'bg-gradient-to-br from-slate-700 via-gray-600 to-slate-800 border-cyan-400 shadow-2xl'
                          : theme === 'theme-light'
                            ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400'
                            : 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600'
                    }`}>
                      {/* Chrome shine effect for center card */}
                      {isCenter && !isShuffling && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />
                        </>
                      )}
                      {/* Border blinking effect - keep this during shuffling */}
                      {isCenter && (
                        <div className={`absolute inset-0 border-2 rounded-xl ${
                          theme === 'theme-light' ? 'border-pink-400/50' : 'border-pink-400/70'
                        } animate-pulse`} />
                      )}
                      <div className="flex items-center space-x-3" style={{ marginLeft: `${60 - (Math.abs(offset) * 3)}px` }}> {/* Text closer to left edge */}
                        <div className={`text-sm font-bold px-3 py-1.5 rounded-lg relative overflow-hidden border ${
                          isShuffling
                            ? theme === 'theme-light' 
                              ? 'bg-gray-200 text-gray-700 border-gray-300' 
                              : 'bg-slate-700 text-gray-300 border-slate-600'
                            : isCenter
                              ? theme === 'theme-light'
                                ? 'bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 text-white shadow-lg shadow-slate-400/40 border-cyan-400'
                                : 'bg-gradient-to-r from-slate-600 via-gray-500 to-slate-700 text-white shadow-lg shadow-slate-500/50 border-cyan-400'
                              : theme === 'theme-light' 
                                ? 'bg-gray-200 text-gray-700 border-gray-300' 
                                : 'bg-slate-700 text-gray-300 border-slate-600'
                        }`}>
                          {/* Chrome shine for center badge */}
                          {isCenter && !isShuffling && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-pulse" />
                          )}
                          <span className="relative z-10" style={{
                            textShadow: isShuffling 
                              ? 'none'
                              : isCenter 
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
                              {getERCDescription(skill.id)}
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
                        <span className="mr-2">{t('erc.detail.viewEIP')}</span>
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
                          {t('erc.detail.myExperience')}
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
                          {t('erc.detail.useCases')}
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

export default SmartContractsSection;