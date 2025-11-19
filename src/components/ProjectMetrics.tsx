'use client';

import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { GitHubStats } from '@/lib/services/github';

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
    { label: 'Public Repos', value: '42', icon: '📦' },
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
        <div className="w-1/5">
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
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
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
    {
      label: 'Public Repos',
      value: stats.user?.public_repos?.toString() || '0',
      icon: '📦'
    },
  ] : fallbackMetrics;

  const languages = (stats?.topLanguages?.slice(0, 4)) || fallbackLanguages;

  return (
    <div className="flex gap-6 items-start">
      {/* Left: Title & Description (20%) */}
      <div className="w-1/5 flex-shrink-0">
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
        {/* Stats Cards - only 2 */}
        <div className="grid grid-cols-2 gap-3">
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
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languages.map((language) => (
            <div
              key={language.name}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                theme === 'theme-light'
                  ? 'bg-white border-gray-200 hover:shadow-md'
                  : 'bg-slate-800/60 border-slate-600/50 hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-semibold ${
                      theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {language.name}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: language.color }}
                  ></div>
                </div>
                <div
                  className={`text-xl font-bold mb-2 ${
                    theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {language.percentage}%
                </div>
                <div
                  className={`w-full h-2 rounded-full overflow-hidden ${
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
