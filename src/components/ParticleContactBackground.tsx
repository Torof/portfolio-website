'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Define particle type
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  connections: number[];
  id: number;
}

const ParticleContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Vibrant colors for particles
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // bright blue
    'rgba(139, 92, 246, 0.8)',   // bright purple
    'rgba(236, 72, 153, 0.8)',   // bright pink
    'rgba(249, 115, 22, 0.8)',   // bright orange
    'rgba(16, 185, 129, 0.8)',   // bright emerald
    'rgba(34, 211, 238, 0.8)'    // bright cyan
  ];

  // Initialize particles and canvas
  useEffect(() => {
    const initializeCanvas = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      
      // Create particles
      const particleCount = Math.min(Math.floor((width * height) / 12000), 100); // Limit max particles
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        newParticles.push({
          id: i,
          x,
          y,
          size: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          originX: x,
          originY: y,
          connections: []
        });
      }
      
      setParticles(newParticles);
    };

    initializeCanvas();

    // Handle resize events
    const handleResize = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        setAnimationId(null);
      }
      initializeCanvas();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Animation loop for particle movement and connection drawing
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update each particle
      const updatedParticles = particles.map(particle => {
        // Move particle
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        
        // Bounce off edges
        if (newX < 0 || newX > dimensions.width) {
          particle.vx *= -1;
          newX = particle.x + particle.vx;
        }
        
        if (newY < 0 || newY > dimensions.height) {
          particle.vy *= -1;
          newY = particle.y + particle.vy;
        }
        
        // Apply mouse influence if mouse is over canvas
        if (mousePosition) {
          const dx = mousePosition.x - newX;
          const dy = mousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Attraction to mouse
            const force = 0.2 * (1 - Math.max(0, distance / 100));
            newX += dx * force;
            newY += dy * force;
          }
        }
        
        // Return updated particle
        return {
          ...particle,
          x: newX,
          y: newY
        };
      });
      
      // Clear previous connections
      updatedParticles.forEach(p => {
        p.connections = [];
      });
      
      // Find connections between particles
      for (let i = 0; i < updatedParticles.length; i++) {
        const particleA = updatedParticles[i];
        
        for (let j = i + 1; j < updatedParticles.length; j++) {
          const particleB = updatedParticles[j];
          
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If particles are close enough, draw a connection
          if (distance < 100) {
            particleA.connections.push(j);
            particleB.connections.push(i);
            
            // Draw the connection
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 100) * 0.2})`;
            ctx.lineWidth = (1 - distance / 100) * 1;
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw each particle
      updatedParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add a glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );

        // Extract color components and create new rgba values
        const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (colorMatch) {
          const r = colorMatch[1];
          const g = colorMatch[2];
          const b = colorMatch[3];
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        } else {
          // Fallback
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      setParticles(updatedParticles);
      const id = requestAnimationFrame(drawParticles);
      setAnimationId(id);
    };
    
    drawParticles();
    
    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particles, dimensions, mousePosition, isVisible]);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(79,70,229,0.08)] to-[rgba(14,157,235,0.05)]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Particle canvas with proper sizing */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0"
        />
      )}
      
      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.1)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.05)]"></div>
    </div>
  );
};

export default ParticleContactBackground;