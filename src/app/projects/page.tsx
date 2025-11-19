'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import CodeRain from '@/components/CodeRain';
import ProjectMetrics from '@/components/ProjectMetrics';
import FeaturedProjectsCarousel from '@/components/ProjectsCarousel';
import { GitHubStats } from '@/lib/services/github';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(3);

  useEffect(() => {
    // Clear existing data when language changes
    setProjects([]);
    setLoading(true);
    setStatsLoading(true);

    // Fetch projects from API route (server-side)
    fetch(`/api/projects?language=${language}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        console.log('Projects loaded:', data.projects);
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setProjects([]);
        setLoading(false);
      });

    // Fetch GitHub stats from API route (server-side)
    fetch('/api/github')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub stats');
        const data = await res.json();
        console.log('GitHub stats loaded:', data.stats);
        setGithubStats(data.stats);
        setStatsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats(null);
        setStatsLoading(false);
      });
  }, [language]);

  return (
    <div className="relative min-h-screen">
      {/* Code Rain Background - Fixed to cover full viewport */}
      <div className="fixed inset-0 z-0">
        <CodeRain theme={theme} />
      </div>

      {/* White Corridor Container */}
      <div className="relative z-10 min-h-screen flex justify-center py-16">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border ${
          theme === 'theme-light'
            ? 'bg-white border-gray-200'
            : 'bg-slate-900 border-[rgba(255,255,255,0.25)]'
        }`}>
          <div className="px-6 md:px-8 py-8">
        {/* Project Metrics */}
        <div className="mb-8">
          <ProjectMetrics stats={githubStats} loading={statsLoading} />
        </div>

        {/* Featured Projects Carousel */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'theme-light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('projects.somePublishedProjects')}
          </h2>
          <FeaturedProjectsCarousel />
        </div>

        {/* Projects Grid */}
        <div className={`p-6 rounded-lg border ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-800/60 border-slate-600'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'theme-light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('projects.githubRepositories')}
          </h2>

          {loading ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'theme-light' ? 'text-gray-800' : 'text-[var(--dark-100)]'
              }`}>{t('projects.loading')}</h3>
              <p className={theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-200)]'}>
                {t('projects.loadingDescription')}
              </p>
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, visibleProjects).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Show More Button */}
              {visibleProjects < projects.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleProjects(prev => prev + 3)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      theme === 'theme-light'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {t('projects.showMore')} ({projects.length - visibleProjects} {t('projects.remaining')})
                  </button>
                </div>
              )}

              {/* Show Less Button */}
              {visibleProjects >= projects.length && projects.length > 3 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleProjects(3)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      theme === 'theme-light'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {t('projects.showLess')}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'theme-light' ? 'text-gray-800' : 'text-[var(--dark-100)]'
              }`}>{t('projects.noProjects')}</h3>
              <p className={theme === 'theme-light' ? 'text-gray-600' : 'text-[var(--dark-200)]'}>
                {t('projects.noProjectsDescription')}
              </p>
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
