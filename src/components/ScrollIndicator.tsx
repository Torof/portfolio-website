'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkScrollPosition = () => {
      // Calculate how far the user has scrolled down the page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Make it disappear when we're 300px from the bottom (increased from 100px)
      const isNearBottom = scrollTop + clientHeight > scrollHeight - 300;
      
      setIsVisible(!isNearBottom);
    };

    // Add scroll event listener
    window.addEventListener('scroll', checkScrollPosition);
    // Check position initially
    checkScrollPosition();

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center animate-bounce cursor-pointer" 
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <div className="bg-[#d4d4d8] rounded-full p-2 drop-shadow-lg">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="8 12 12 16 16 12" />
          <line x1="12" y1="8" x2="12" y2="16" />
        </svg>
      </div>
    </div>
  );
}