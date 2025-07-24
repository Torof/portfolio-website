'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import CodeRain from '@/components/CodeRain';
import GitHubMetrics from '@/components/GitHubMetrics';
import { fetchProjectsFromGitHub } from '@/lib/services/projects';
import { fetchGitHubStats } from '@/lib/services/github';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Project } from '@/lib/types';
import { GitHubStats } from '@/lib/services/github';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear existing data when language changes
    setProjects([]);
    setLoading(true);
    
    // Fetch projects and stats from GitHub in parallel
    Promise.all([
      fetchProjectsFromGitHub(language),
      fetchGitHubStats()
    ]).then(([projectsData, statsData]) => {
      setProjects(projectsData);
      setGithubStats(statsData);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [language]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f1729] to-[#1e293b] border-b border-[rgba(255,255,255,0.05)]">
      {/* Code Rain Background - Fixed to cover full viewport */}
      <div className="fixed inset-0 z-0">
        <CodeRain />
      </div>
      
      <div className="relative z-10 container-custom py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
              {t('projects.title')}
            </span>
          </h1>
          <p className="text-lg text-[var(--dark-200)] max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* GitHub Metrics Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
                {t('projects.githubStats')}
              </span>
            </h2>
            <p className="text-[var(--dark-200)] max-w-2xl mx-auto">
              {t('projects.githubStatsSubtitle')}
            </p>
          </div>
          {githubStats && <GitHubMetrics stats={githubStats} />}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--dark-100)]">{t('projects.loading')}</h3>
            <p className="text-[var(--dark-200)]">
              {t('projects.loadingDescription')}
            </p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--dark-100)]">{t('projects.noProjects')}</h3>
            <p className="text-[var(--dark-200)]">
              {t('projects.noProjectsDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
