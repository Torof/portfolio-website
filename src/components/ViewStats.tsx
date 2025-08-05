'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';

interface ViewStatsProps {
  className?: string;
}

interface PageStats {
  pageId: string;
  views: number;
  uniqueViews: number;
}

export default function ViewStats({ className = '' }: ViewStatsProps) {
  const { theme } = useTheme();
  const [stats, setStats] = useState<PageStats[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalUniqueViews, setTotalUniqueViews] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pages = ['home', 'projects', 'vibe-coding', 'skills', 'experience', 'contact'];
        const promises = pages.map(async (pageId) => {
          const response = await fetch(`/api/views?page=${pageId}`);
          if (response.ok) {
            const data = await response.json();
            return { pageId, views: data.views, uniqueViews: data.uniqueViews };
          }
          return { pageId, views: 0, uniqueViews: 0 };
        });

        const results = await Promise.all(promises);
        setStats(results);
        
        const totalV = results.reduce((sum, stat) => sum + stat.views, 0);
        const totalUV = results.reduce((sum, stat) => sum + stat.uniqueViews, 0);
        setTotalViews(totalV);
        setTotalUniqueViews(totalUV);
      } catch (error) {
        console.error('Failed to fetch view stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPageDisplayName = (pageId: string): string => {
    const names: Record<string, string> = {
      home: '🏠 Home',
      projects: '💻 Projects',
      'vibe-coding': '🔥 Vibe Coding',
      skills: '⚡ Skills',
      experience: '💼 Experience',
      contact: '📧 Contact',
    };
    return names[pageId] || pageId;
  };

  if (isLoading) {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-sm cursor-pointer ${
        theme === 'theme-light'
          ? 'bg-white/80 border border-gray-200/50'
          : 'bg-slate-800/80 border border-slate-700/50'
      } ${className}`}>
        <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>
        <span className={`text-sm font-medium ${
          theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          Loading stats...
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-sm cursor-pointer transition-all duration-300 ${
          theme === 'theme-light'
            ? 'bg-white/90 border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg'
            : 'bg-slate-800/90 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 hover:shadow-xl'
        }`}
      >
        {/* Analytics Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-xl ${
            theme === 'theme-light' ? 'text-blue-600' : 'text-blue-400'
          }`}
        >
          📊
        </motion.div>

        {/* Summary Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${
              theme === 'theme-light' ? 'text-gray-800' : 'text-gray-100'
            }`}>
              {formatNumber(totalViews)}
            </div>
            <div className={`text-xs ${
              theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Total Views
            </div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${
              theme === 'theme-light' ? 'text-gray-800' : 'text-gray-100'
            }`}>
              {formatNumber(totalUniqueViews)}
            </div>
            <div className={`text-xs ${
              theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Unique Visitors
            </div>
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-sm ${
            theme === 'theme-light' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          ▼
        </motion.div>
      </motion.div>

      {/* Expanded Stats */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 right-0 min-w-72 p-4 rounded-lg backdrop-blur-sm border shadow-xl z-50 ${
              theme === 'theme-light'
                ? 'bg-white/95 border-gray-200'
                : 'bg-slate-800/95 border-slate-700'
            }`}
          >
            <div className={`text-sm font-semibold mb-3 ${
              theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
            }`}>
              📈 Page Analytics
            </div>
            
            <div className="space-y-2">
              {stats
                .sort((a, b) => b.views - a.views)
                .map((stat, index) => (
                <motion.div
                  key={stat.pageId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-2 rounded transition-colors ${
                    theme === 'theme-light'
                      ? 'hover:bg-gray-50'
                      : 'hover:bg-slate-700/50'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    {getPageDisplayName(stat.pageId)}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      theme === 'theme-light'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      {formatNumber(stat.views)} views
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      theme === 'theme-light'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-green-900/50 text-green-300'
                    }`}>
                      {formatNumber(stat.uniqueViews)} unique
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className={`text-xs text-center mt-3 pt-3 border-t ${
              theme === 'theme-light'
                ? 'text-gray-500 border-gray-200'
                : 'text-gray-400 border-slate-600'
            }`}>
              Updates every 30 seconds
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}