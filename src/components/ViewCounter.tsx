'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';

interface ViewCounterProps {
  pageId: string;
  className?: string;
}

export default function ViewCounter({ pageId, className = '' }: ViewCounterProps) {
  const { theme } = useTheme();
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackView = async () => {
      try {
        // Get current views from API
        const response = await fetch(`/api/views?page=${pageId}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }

        // Track this view
        await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pageId }),
        });

        // Update view count
        const updatedResponse = await fetch(`/api/views?page=${pageId}`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setViews(updatedData.views);
        }
      } catch (error) {
        console.error('Failed to track view:', error);
        
        // Fallback to localStorage for local tracking
        const localKey = `views_${pageId}`;
        const localViews = parseInt(localStorage.getItem(localKey) || '0', 10);
        const newViews = localViews + 1;
        localStorage.setItem(localKey, newViews.toString());
        setViews(newViews);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
  }, [pageId]);

  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm ${
        theme === 'theme-light'
          ? 'bg-white/70 border border-gray-200/50'
          : 'bg-slate-800/70 border border-slate-700/50'
      } ${className}`}>
        <div className="w-4 h-4 animate-pulse rounded bg-gray-400"></div>
        <span className={`text-sm font-medium ${
          theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          Loading...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
        theme === 'theme-light'
          ? 'bg-white/80 border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-md'
          : 'bg-slate-800/80 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 hover:shadow-lg'
      } ${className}`}
    >
      {/* Eye icon */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className={`text-lg ${
          theme === 'theme-light' ? 'text-blue-600' : 'text-blue-400'
        }`}
      >
        👁️
      </motion.div>

      {/* View count */}
      <motion.span
        key={views}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`text-sm font-semibold ${
          theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
        }`}
      >
        {formatViews(views)} views
      </motion.span>

      {/* Pulse effect for new view */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 rounded-lg border-2 pointer-events-none ${
          theme === 'theme-light' ? 'border-blue-400' : 'border-blue-500'
        }`}
      />
    </motion.div>
  );
}