'use client';

import { useEffect, useState } from 'react';
import { GitHubStats } from '@/lib/services/github';
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
    return null;
  }

  return (
    <div className="w-full">
      {/* Compact Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* Profile Card */}
        {stats?.user?.avatar_url && (
          <Link
            href={`https://github.com/${stats.user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              theme === 'theme-light'
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                : 'bg-slate-800/60 border-slate-600/50 hover:border-cyan-400/60 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-[var(--primary-400)]/30">
                <Image
                  src={stats.user.avatar_url}
                  alt={stats.user.login}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-xs font-semibold truncate w-full ${
                theme === 'theme-light' ? 'text-gray-900' : 'text-white'
              }`}>
                @{stats.user.login}
              </p>
              <p className={`text-[10px] mt-0.5 ${
                theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Profile
              </p>
            </div>
          </Link>
        )}

        {/* Language Cards */}
        {stats?.topLanguages?.slice(0, 5).map((language, index) => (
          <div
            key={language.name}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-white border-gray-200 hover:shadow-md'
                : 'bg-slate-800/60 border-slate-600/50 hover:shadow-lg'
            }`}
            style={{
              transitionDelay: `${index * 50}ms`
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div
                  className="w-3 h-3 rounded-full mr-2 ring-2 ring-white/20"
                  style={{ backgroundColor: language.color }}
                ></div>
                <span className={`text-xs font-semibold truncate ${
                  theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {language.name}
                </span>
              </div>
              <div className={`text-lg font-bold ${
                theme === 'theme-light' ? 'text-gray-900' : 'text-white'
              }`}>
                {language.percentage}%
              </div>
              <div className={`w-full h-1 rounded-full mt-2 overflow-hidden ${
                theme === 'theme-light' ? 'bg-gray-200' : 'bg-gray-700'
              }`}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    backgroundColor: language.color,
                    width: isVisible ? `${language.percentage}%` : '0%',
                    transitionDelay: `${300 + index * 100}ms`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* Yearly Contributions Card */}
        {stats?.yearlyContributions !== undefined && (
          <div
            className={`p-3 rounded-lg border transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-white border-gray-200 hover:shadow-md'
                : 'bg-slate-800/60 border-slate-600/50 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col">
              <p className={`text-[10px] uppercase font-semibold mb-1 ${
                theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Contributions
              </p>
              <div className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stats.yearlyContributions.toLocaleString()}
              </div>
              <p className={`text-[10px] mt-1 ${
                theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                this year
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubMetrics;