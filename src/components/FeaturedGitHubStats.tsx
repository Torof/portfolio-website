'use client';

import React, { useEffect, useState } from 'react';
import { GitHubStats, fetchGitHubStats } from '@/lib/services/github';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

const FeaturedGitHubStats: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const githubStats = await fetchGitHubStats();
        setStats(githubStats);
      } catch (error) {
        console.error('Error loading GitHub stats:', error);
      }
    };

    loadStats();
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!stats || !stats.user) return null;

  return (
    <div className="mb-8">
      <div 
        className={`
          transition-all duration-700 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          bg-gradient-to-br from-[rgba(15,23,42,0.6)] to-[rgba(30,41,59,0.6)]
          rounded-xl border border-[rgba(255,255,255,0.1)] p-6
          backdrop-blur-sm
        `}
      >
        <div className="flex items-center justify-between">
          {/* Compact Stats */}
          <div className="flex items-center space-x-8">
            {/* Profile Picture */}
            <Link 
              href={`https://github.com/${stats.user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.2)] group-hover:border-[rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={stats.user.avatar_url}
                    alt={`${stats.user.name || stats.user.login} GitHub Avatar`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    priority
                  />
                  
                  {/* GitHub icon overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Username & Title */}
            <div>
              <Link 
                href={`https://github.com/${stats.user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <p className="text-lg font-semibold text-[var(--dark-100)] group-hover:text-[var(--primary-400)] transition-colors duration-300">
                  @{stats.user.login}
                </p>
                {stats.user.name && (
                  <p className="text-sm text-[var(--dark-300)]">
                    {stats.user.name}
                  </p>
                )}
              </Link>
            </div>
          </div>

          {/* Top Languages Mini Bar */}
          {stats.topLanguages.length > 0 && (
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-[var(--dark-300)] mb-2">{t('github.topLanguages')}</p>
                <div className="flex space-x-2">
                  {stats.topLanguages.slice(0, 3).map((language) => (
                    <div key={language.name} className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: language.color }}
                      ></div>
                      <span className="text-xs text-[var(--dark-200)] font-mono">
                        {language.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* View More Link */}
              <Link 
                href="/projects"
                className="text-sm text-[var(--primary-400)] hover:text-[var(--primary-300)] transition-colors duration-300 flex items-center"
              >
{t('common.viewAll')}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedGitHubStats;