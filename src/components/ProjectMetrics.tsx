'use client';

import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { GitHubStats } from '@/lib/services/github';
import Image from 'next/image';
import Link from 'next/link';
import ContributionGraph from './ContributionGraph';

interface ProjectMetricsProps {
  stats: GitHubStats | null;
  loading?: boolean;
}

export default function ProjectMetrics({ stats, loading }: ProjectMetricsProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Fallback data when API fails
  const fallbackMetrics = [
    { label: 'Total Contributions', value: '1,200+', icon: '📊' },
  ];

  const fallbackLanguages = [
    { name: 'Solidity', percentage: 45, color: '#AA6746' },
    { name: 'TypeScript', percentage: 30, color: '#3178C6' },
    { name: 'JavaScript', percentage: 15, color: '#F7DF1E' },
    { name: 'Python', percentage: 10, color: '#3776AB' },
  ];

  if (loading) {
    return (
      <div className="flex gap-6">
        {/* Left: Title skeleton */}
        <div className="w-[20%]">
          <div className={`h-8 rounded mb-2 animate-pulse ${
            theme === 'theme-light' ? 'bg-gray-200' : 'bg-slate-700'
          }`}></div>
          <div className={`h-16 rounded animate-pulse ${
            theme === 'theme-light' ? 'bg-gray-100' : 'bg-slate-800'
          }`}></div>
        </div>

        {/* Separator */}
        <div className={`w-px ${
          theme === 'theme-light' ? 'bg-gray-300' : 'bg-slate-600'
        }`}></div>

        {/* Right: Metrics skeleton */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border animate-pulse ${
                  theme === 'theme-light'
                    ? 'bg-gray-100 border-gray-200'
                    : 'bg-slate-800/60 border-slate-600/50'
                }`}
              >
                <div className="h-20"></div>
              </div>
            ))}
          </div>

          {/* Contribution graph skeleton */}
          <div className={`p-4 rounded-lg border animate-pulse ${
            theme === 'theme-light'
              ? 'bg-gray-100 border-gray-200'
              : 'bg-slate-800/60 border-slate-600/50'
          }`}>
            <div className="h-48"></div>
          </div>
        </div>
      </div>
    );
  }

  // Use real data if available, otherwise use fallback
  const metrics = stats ? [
    {
      label: 'Total Contributions',
      value: stats.yearlyContributions?.toLocaleString() || '0',
      icon: '📊'
    },
  ] : fallbackMetrics;

  const languages = (stats?.topLanguages?.slice(0, 3)) || fallbackLanguages.slice(0, 3);

  return (
    <div className="flex gap-6 items-start">
      {/* Left: Title & Description (20%) */}
      <div className="w-[20%] flex-shrink-0">
        <h2 className={`text-2xl font-bold mb-3 ${
          theme === 'theme-light' ? 'text-gray-900' : 'text-white'
        }`}>
          {t('projects.someOfMyProjects')}
        </h2>
        <p className={`text-sm leading-relaxed ${
          theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {t('projects.metricsDescription')}
        </p>
      </div>

      {/* Separator */}
      <div className={`w-px self-stretch ${
        theme === 'theme-light' ? 'bg-gray-300' : 'bg-slate-600'
      }`}></div>

      {/* Right: Metrics (80%) */}
      <div className="flex-1 space-y-4">
        {/* Stats Cards - 1 metric + 1 languages + 1 profile */}
        <div className="grid grid-cols-3 gap-3">
          {/* Total Contributions */}
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-white border-gray-200 hover:shadow-md'
                  : 'bg-slate-800/60 border-slate-600/50 hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">{metric.icon}</span>
                <div
                  className={`text-2xl font-bold mb-1 ${
                    theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {metric.value}
                </div>
                <p
                  className={`text-xs ${
                    theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {metric.label}
                </p>
              </div>
            </div>
          ))}

          {/* Languages Card */}
          <div
            className={`p-3 rounded-lg border transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-white border-gray-200 hover:shadow-md'
                : 'bg-slate-800/60 border-slate-600/50 hover:shadow-lg'
            }`}
          >
          <div className="space-y-2">
            {languages.map((language) => (
              <div key={language.name} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: language.color }}
                ></div>
                <span
                  className={`text-xs font-semibold truncate ${
                    theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                  }`}
                  style={{ maxWidth: '60px' }}
                >
                  {language.name}
                </span>
                <div className="flex-1 flex items-center gap-1 min-w-0">
                  <div
                    className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                      theme === 'theme-light' ? 'bg-gray-200' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        backgroundColor: language.color,
                        width: `${language.percentage}%`,
                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-bold flex-shrink-0 ${
                      theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {language.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* GitHub Profile Card */}
          <Link
            href={stats?.user ? `https://github.com/${stats.user.login}` : 'https://github.com/torof'}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
              theme === 'theme-light'
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                : 'bg-slate-800/60 border-slate-600/50 hover:border-blue-500/60 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-blue-400/30">
                <Image
                  src={stats?.user?.avatar_url || 'https://github.com/torof.png'}
                  alt={stats?.user?.login || 'torof'}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className={`text-sm font-semibold mb-1 ${
                  theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                @{stats?.user?.login || 'torof'}
              </p>
              <p
                className={`text-xs ${
                  theme === 'theme-light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                GitHub Profile
              </p>
            </div>
          </Link>
        </div>

        {/* Contribution Graph */}
        <div className="overflow-x-auto">
          <ContributionGraph yearlyContributions={stats?.yearlyContributions || 1200} />
        </div>
      </div>
    </div>
  );
}
