'use client';

import { useTheme } from '@/lib/context/ThemeContext';
import { GitHubStats } from '@/lib/services/github';

interface ProjectMetricsProps {
  stats: GitHubStats | null;
  loading?: boolean;
}

export default function ProjectMetrics({ stats, loading }: ProjectMetricsProps) {
  const { theme } = useTheme();

  // Fallback data when API fails
  const fallbackMetrics = [
    { label: 'Total Contributions', value: '1,200+', icon: '📊' },
    { label: 'Public Repos', value: '42', icon: '📦' },
    { label: 'Total Stars', value: '150+', icon: '⭐' },
    { label: 'Followers', value: '85+', icon: '👥' },
  ];

  const fallbackLanguages = [
    { name: 'Solidity', percentage: 45, color: '#AA6746' },
    { name: 'TypeScript', percentage: 30, color: '#3178C6' },
    { name: 'JavaScript', percentage: 15, color: '#F7DF1E' },
    { name: 'Python', percentage: 10, color: '#3776AB' },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
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
    {
      label: 'Total Stars',
      value: stats.totalStars?.toLocaleString() || '0',
      icon: '⭐'
    },
    {
      label: 'Followers',
      value: stats.user?.followers?.toString() || '0',
      icon: '👥'
    },
  ] : fallbackMetrics;

  const languages = (stats?.topLanguages?.slice(0, 4)) || fallbackLanguages;

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
  );
}
