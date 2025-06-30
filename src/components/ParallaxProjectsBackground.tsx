'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ParallaxProjectsBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Vibrant shapes for background
  const shapes = [
    { type: 'circle', size: 120, color: 'rgba(59, 130, 246, 0.2)', gradient: 'from-blue-500/20 to-purple-500/20', x: '20%', y: '30%', parallaxSpeed: 0.2, glow: true },
    { type: 'circle', size: 180, color: 'rgba(139, 92, 246, 0.15)', gradient: 'from-purple-500/20 to-pink-500/20', x: '70%', y: '60%', parallaxSpeed: 0.3, glow: true },
    { type: 'square', size: 100, color: 'rgba(236, 72, 153, 0.12)', gradient: 'from-pink-500/20 to-orange-500/20', x: '80%', y: '20%', parallaxSpeed: 0.15, glow: false },
    { type: 'square', size: 70, color: 'rgba(16, 185, 129, 0.15)', gradient: 'from-emerald-500/20 to-cyan-500/20', x: '10%', y: '70%', parallaxSpeed: 0.25, glow: false },
    { type: 'triangle', size: 140, color: 'rgba(79, 70, 229, 0.18)', gradient: 'from-indigo-500/20 to-blue-500/20', x: '50%', y: '40%', parallaxSpeed: 0.1, glow: true },
    { type: 'triangle', size: 90, color: 'rgba(249, 115, 22, 0.15)', gradient: 'from-orange-500/20 to-red-500/20', x: '25%', y: '85%', parallaxSpeed: 0.3, glow: false },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (top < viewportHeight && top + height > 0) {
          setIsVisible(true);
          
          // Calculate scroll progress for parallax
          const scrollProgress = Math.max(0, Math.min(1, 1 - (top / (viewportHeight + height))));
          setScrollY(scrollProgress);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Handle resize
    const handleResize = () => {
      if (sectionRef.current) {
        const { width, height } = sectionRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial call
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render different shape types
  const renderShape = (shape: any, index: number) => {
    const parallaxY = scrollY * 100 * shape.parallaxSpeed;
    const rotationAmount = scrollY * 45 * shape.parallaxSpeed;
    
    const commonStyle = {
      position: 'absolute' as 'absolute',
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      transform: `translateY(${parallaxY}px) rotate(${rotationAmount}deg)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform',
    };

    const glowStyle = shape.glow ? {
      boxShadow: `0 0 ${shape.size / 2}px ${shape.color}`,
      filter: 'blur(1px)',
    } : {};

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${shape.gradient}`}
            style={{
              ...commonStyle,
              borderRadius: '50%',
              ...glowStyle,
            }}
          />
        );
      case 'square':
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${shape.gradient}`}
            style={{
              ...commonStyle,
              borderRadius: '20%',
              ...glowStyle,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={index}
            style={{
              ...commonStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              borderWidth: `0 ${shape.size / 2}px ${shape.size}px ${shape.size / 2}px`,
              borderColor: `transparent transparent ${shape.color} transparent`,
              filter: shape.glow ? `drop-shadow(0 0 ${shape.size / 4}px ${shape.color})` : 'none',
            }}
          />
        );
      default:
        return null;
    }
  };

  // Grid lines with parallax effect
  const renderGridLines = () => {
    const gridSize = 100;
    const gridOpacity = 0.02;
    const lines = [];
    
    // Calculate number of lines based on container dimensions
    const horizontalLines = Math.ceil(dimensions.height / gridSize);
    const verticalLines = Math.ceil(dimensions.width / gridSize);
    
    // Horizontal grid lines
    for (let i = 0; i < horizontalLines; i++) {
      const yOffset = scrollY * 20 * (i % 2 === 0 ? 1 : -0.5);
      lines.push(
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: `${i * gridSize + yOffset}px`,
            height: '1px',
            backgroundColor: `rgba(255, 255, 255, ${gridOpacity})`,
            transform: `scaleX(${1 + scrollY * 0.1})`,
            transformOrigin: i % 2 === 0 ? 'left' : 'right',
            transition: 'transform 0.1s ease-out',
          }}
        />
      );
    }
    
    // Vertical grid lines
    for (let i = 0; i < verticalLines; i++) {
      const xOffset = scrollY * 15 * (i % 2 === 0 ? 1 : -0.5);
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0"
          style={{
            left: `${i * gridSize + xOffset}px`,
            width: '1px',
            backgroundColor: `rgba(255, 255, 255, ${gridOpacity})`,
            transform: `scaleY(${1 + scrollY * 0.05})`,
            transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
            transition: 'transform 0.1s ease-out',
          }}
        />
      );
    }
    
    return lines;
  };

  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br opacity-30"
        style={{ 
          backgroundImage: 'linear-gradient(135deg, rgba(12, 74, 110, 0.15), rgba(30, 58, 138, 0.12))',
          backgroundSize: `${200 + scrollY * 50}% ${200 + scrollY * 50}%`,
          backgroundPosition: `${50 + scrollY * 20}% ${50 + scrollY * 20}%`,
          transition: 'background-size 0.3s ease-out, background-position 0.3s ease-out',
        }}
      />
      
      {/* Grid lines with parallax effect */}
      <div className="absolute inset-0">
        {renderGridLines()}
      </div>
      
      {/* Parallax shape elements */}
      <div className="absolute inset-0">
        {shapes.map((shape, index) => renderShape(shape, index))}
      </div>
      
      {/* Glow effect that moves with scroll */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(12, 74, 110, 0.4) 0%, rgba(12, 74, 110, 0) 70%)',
          width: '50%',
          height: '50%',
          top: `${25 - scrollY * 20}%`,
          left: `${25 + scrollY * 20}%`,
          transition: 'top 0.3s ease-out, left 0.3s ease-out',
        }}
      />
      
      <motion.div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(79, 70, 229, 0) 70%)',
          width: '40%',
          height: '40%',
          bottom: `${15 - scrollY * 10}%`,
          right: `${15 + scrollY * 10}%`,
          transition: 'bottom 0.3s ease-out, right 0.3s ease-out',
        }}
      />
    </div>
  );
};

export default ParallaxProjectsBackground;