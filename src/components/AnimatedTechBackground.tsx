'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTechBackgroundProps {
  activeCategory: 'blockchain' | 'frontend' | 'backend';
}

const AnimatedTechBackground: React.FC<AnimatedTechBackgroundProps> = ({ activeCategory }) => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number; opacity: number; speed: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState(false);

  // Set vibrant colors based on active category
  const getColors = () => {
    switch (activeCategory) {
      case 'blockchain':
        return {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          glow: 'rgba(59, 130, 246, 0.4)'
        };
      case 'frontend':
        return {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#f97316',
          glow: 'rgba(139, 92, 246, 0.4)'
        };
      case 'backend':
        return {
          primary: '#06b6d4',
          secondary: '#10b981',
          accent: '#3b82f6',
          glow: 'rgba(6, 182, 212, 0.4)'
        };
      default:
        return {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          glow: 'rgba(59, 130, 246, 0.4)'
        };
    }
  };

  const colors = getColors();

  // Generate particles when component mounts or category changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial sizing
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Generate more vibrant particles
    const newParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 20 + 10
    }));

    setParticles(newParticles);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCategory]);

  // Create enhanced grid pattern for background
  const gridLines = [];
  const gridSize = 40;
  const gridOpacity = hovered ? 0.08 : 0.05;

  // Horizontal grid lines
  for (let i = 0; i < (dimensions.height / gridSize); i++) {
    gridLines.push(
      <div
        key={`h-${i}`}
        className="absolute left-0 right-0"
        style={{
          top: `${i * gridSize}px`,
          height: '1px',
          backgroundColor: `rgba(255, 255, 255, ${gridOpacity})`,
        }}
      />
    );
  }

  // Vertical grid lines
  for (let i = 0; i < (dimensions.width / gridSize); i++) {
    gridLines.push(
      <div
        key={`v-${i}`}
        className="absolute top-0 bottom-0"
        style={{
          left: `${i * gridSize}px`,
          width: '1px',
          backgroundColor: `rgba(255, 255, 255, ${gridOpacity})`,
        }}
      />
    );
  }

  // Specific patterns for different categories
  const renderCategoryPattern = () => {
    switch (activeCategory) {
      case 'blockchain':
        return (
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.015] z-0"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="blockchain-pattern"
                patternUnits="userSpaceOnUse"
                width="100"
                height="100"
                patternTransform="rotate(30)"
              >
                <path
                  d="M25,50 L50,25 L75,50 L50,75 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <circle cx="50" cy="50" r="5" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blockchain-pattern)" />
          </svg>
        );
      case 'frontend':
        return (
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.015] z-0"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="frontend-pattern"
                patternUnits="userSpaceOnUse"
                width="120"
                height="120"
              >
                <path
                  d="M30,10 L10,30 M60,10 L10,60 M90,10 L10,90 M120,10 L10,120 M30,40 L40,30 M60,40 L40,60 M90,40 L40,90 M120,40 L40,120 M30,70 L70,30 M60,70 L70,60 M90,70 L70,90 M120,70 L70,120 M30,100 L100,30 M60,100 L100,60 M90,100 L100,90 M120,100 L100,120"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#frontend-pattern)" />
          </svg>
        );
      case 'backend':
        return (
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.015] z-0"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="backend-pattern"
                patternUnits="userSpaceOnUse"
                width="80"
                height="80"
              >
                <rect x="10" y="10" width="10" height="10" stroke="white" strokeWidth="0.5" fill="none" />
                <rect x="40" y="40" width="10" height="10" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="25" cy="55" r="5" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="55" cy="25" r="5" stroke="white" strokeWidth="0.5" fill="none" />
                <line x1="15" y1="15" x2="25" y2="25" stroke="white" strokeWidth="0.5" />
                <line x1="45" y1="45" x2="55" y2="55" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#backend-pattern)" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={canvasRef} 
      className="absolute inset-0 overflow-hidden" 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br opacity-30"
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}20)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      {renderCategoryPattern()}

      {/* Grid lines */}
      <div className="absolute inset-0">
        {gridLines}
      </div>

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
            opacity: particle.opacity,
          }}
          animate={{
            y: ['0%', `${particle.speed}%`],
            opacity: [particle.opacity, particle.opacity / 2, particle.opacity],
            scale: hovered ? [1, 1.5, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + particle.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Gradient glows */}
      <motion.div
        className="absolute w-3/4 h-3/4 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute right-0 bottom-0 w-1/2 h-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}15 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute left-0 top-0 w-1/3 h-1/3 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
        }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};

export default AnimatedTechBackground;