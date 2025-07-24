"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";

export default function GridOverlay() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Theme-aware colors
  const gridColor = theme === 'theme-light' 
    ? 'rgba(59, 130, 246, 0.15)' // Darker blue for light theme
    : 'rgba(79, 70, 229, 0.1)'; // Original blue for dark theme
  
  const radialColors = theme === 'theme-light'
    ? {
        primary: 'rgba(59, 130, 246, 0.15)',
        secondary: 'rgba(147, 51, 234, 0.15)', 
        accent: 'rgba(6, 182, 212, 0.08)'
      }
    : {
        primary: 'rgba(79, 70, 229, 0.1)',
        secondary: 'rgba(139, 92, 246, 0.1)',
        accent: 'rgba(6, 182, 212, 0.05)'
      };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridPulse 4s ease-in-out infinite'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, ${radialColors.primary} 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${radialColors.secondary} 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${radialColors.accent} 0%, transparent 50%)
          `
        }}
      />
    </div>
  );
}