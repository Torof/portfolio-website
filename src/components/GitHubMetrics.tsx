'use client';

import { useEffect, useState } from 'react';
import { GitHubStats } from '@/lib/services/github';
import ContributionGraph from './ContributionGraph';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';

interface GitHubMetricsProps {
  stats: GitHubStats | null;
}


const GitHubMetrics: React.FC<GitHubMetricsProps> = ({ stats }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!stats) {
    return (
      <div className={`w-full rounded-xl border-2 p-8 ${
        theme === 'theme-light'
          ? 'bg-white shadow-lg border-gray-200'
          : 'bg-gray-900 shadow-2xl shadow-black/20 border-gray-700'
      }`}>
        <div className="flex items-center justify-center h-32">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[var(--primary-400)] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[var(--secondary-400)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[var(--primary-400)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <span className={`ml-4 ${theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-200)]'}`}>{t('projects.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Removed basic metrics - focusing on more meaningful data

  return (
    <div className="w-full">
      {/* Language Stats & Profile */}
      <div 
        className={`
          transition-all duration-700 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          ${theme === 'theme-light'
            ? 'bg-white shadow-lg border-gray-200'
            : 'bg-gray-900 shadow-2xl shadow-black/20 border-gray-700'
          }
          rounded-xl border-2 p-6
          backdrop-blur-sm mb-8
        `}
        style={{ transitionDelay: '300ms' }}
      >
        <div className="flex items-center gap-8">
          {/* Compact Language Stats */}
          {stats.topLanguages.length > 0 && (
            <div className={`flex-1 p-4 rounded-lg ${
              theme === 'theme-light'
                ? 'bg-gradient-to-br from-gray-50 to-blue-50/30'
                : 'bg-gradient-to-br from-gray-800/50 to-purple-900/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${
                theme === 'theme-light' ? 'text-gray-800' : 'text-white'
              }`}>
                <span className="text-xl mr-2">🛠️</span>
                {t('github.topLanguages')}
              </h3>
              
              <div className="space-y-3">
                {stats.topLanguages.slice(0, 4).map((language, index) => (
                  <div key={language.name} className="flex items-center">
                    {/* Language color indicator */}
                    <div 
                      className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ring-2 ${
                        theme === 'theme-light' ? 'ring-gray-300' : 'ring-gray-600'
                      }`}
                      style={{ backgroundColor: language.color }}
                    ></div>
                    
                    {/* Language name */}
                    <span className={`text-sm font-semibold min-w-0 flex-shrink-0 w-20 ${
                      theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {language.name}
                    </span>
                    
                    {/* Compact progress bar */}
                    <div className={`flex-1 mx-3 rounded-full h-3 max-w-32 overflow-hidden ${
                      theme === 'theme-light' 
                        ? 'bg-gray-200 ring-1 ring-gray-300' 
                        : 'bg-gray-800 ring-1 ring-gray-600'
                    }`}>
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ 
                          backgroundColor: language.color,
                          width: isVisible ? `${language.percentage}%` : '0%',
                          transitionDelay: `${500 + index * 100}ms`
                        }}
                      >
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Percentage */}
                    <span className={`text-sm font-bold font-mono flex-shrink-0 ${
                      theme === 'theme-light' ? 'text-gray-800' : 'text-gray-200'
                    }`}>
                      {language.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Profile Picture */}
          {stats.user?.avatar_url && (
            <div className="flex-shrink-0">
              <Link 
                href={`https://github.com/${stats.user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative group cursor-pointer">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Profile image container */}
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 ${
                    theme === 'theme-light' 
                      ? 'border-[rgba(0,0,0,0.2)] group-hover:border-[rgba(0,0,0,0.4)]'
                      : 'border-[rgba(255,255,255,0.2)] group-hover:border-[rgba(255,255,255,0.4)]'
                  }`}>
                    <Image
                      src={stats.user.avatar_url}
                      alt={`${stats.user.name || stats.user.login} GitHub Avatar`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transition-transform duration-300"
                      priority
                    />
                    
                    {/* GitHub icon overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="32" 
                        height="32" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    
                    {/* Blockchain-inspired corner accents */}
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[rgba(255,255,255,0.4)]"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[rgba(255,255,255,0.4)]"></div>
                  </div>

                  {/* GitHub username */}
                  <div className="text-center mt-3">
                    <p className={`text-sm font-medium group-hover:text-[var(--primary-400)] transition-colors duration-300 ${
                      theme === 'theme-light' ? 'text-gray-700' : 'text-[var(--dark-100)]'
                    }`}>
                      @{stats.user.login}
                    </p>
                    {stats.user.name && (
                      <p className={`text-xs mt-1 ${
                        theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-300)]'
                      }`}>
                        {stats.user.name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contribution Graph - Full Width */}
      <div 
        className={`
          transition-all duration-700 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{ transitionDelay: '600ms' }}
      >
        <ContributionGraph 
          yearlyContributions={stats.yearlyContributions}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default GitHubMetrics;