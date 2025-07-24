'use client';

import React, { ReactNode, useState } from 'react';

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  height?: string;
  colorScheme?: 'experience' | 'education';
}

const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent, 
  backContent, 
  height = '450px',
  colorScheme = 'experience' 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  // Color scheme configurations
  const colors = {
    experience: {
      primary: 'rgba(59,130,246, 0.6)',
      secondary: 'rgba(147,51,234, 0.6)',
    },
    education: {
      primary: 'rgba(218,165,32, 0.6)', 
      secondary: 'rgba(255,215,0, 0.6)',
    }
  };

  const currentColors = colors[colorScheme];

  return (
    <>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* Click-based flip effect */
        .flip-container.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-container {
          transform-origin: center center;
          transform-style: preserve-3d;
          position: relative;
          cursor: pointer;
        }
        
        /* Hover effects */
        .flip-card-wrapper:hover .flip-container {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .flip-card-wrapper:hover .flip-container.flipped {
          transform: rotateY(180deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .flip-card-wrapper {
          transition: all 0.3s ease;
        }
        
        /* Prevent transform glitches */
        .flip-container,
        .flip-container * {
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
        
        /* Custom Scrollbar Styling */
        .custom-scrollbar {
          scrollbar-width: normal;
          scrollbar-color: ${currentColors.primary} rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          margin: 5px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, 
            ${colorScheme === 'experience' ? '#3b82f6' : '#DAA520'}, 
            ${colorScheme === 'experience' ? '#9333ea' : '#FFD700'});
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          min-height: 30px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, 
            ${colorScheme === 'experience' ? '#60a5fa' : '#F0E68C'}, 
            ${colorScheme === 'experience' ? '#a78bfa' : '#FFED4E'});
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5),
                      inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border-width: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, 
            ${colorScheme === 'experience' ? '#2563eb' : '#B8860B'}, 
            ${colorScheme === 'experience' ? '#7c3aed' : '#DAA520'});
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      
      <div className="flip-card-wrapper relative perspective-1000" style={{ height }}>
        {/* Card Container with Flip Effect */}
        <div 
          className={`flip-container relative w-full h-full transition-all duration-700 ease-in-out transform-style-preserve-3d ${isFlipped ? 'flipped' : ''}`}
          onClick={handleClick}
        >
          {/* Front of Card */}
          <div className="absolute w-full h-full backface-hidden">
            {frontContent}
          </div>
          
          {/* Back of Card */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            {backContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipCard;