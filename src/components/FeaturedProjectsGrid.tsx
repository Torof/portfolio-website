'use client';

import { useTheme } from '@/lib/context/ThemeContext';
import { FeaturedProject } from '@/lib/data/featuredProjects';

interface FeaturedProjectsGridProps {
  projects: FeaturedProject[];
}

export default function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const { theme } = useTheme();

  // Take only the first 3 projects
  const displayProjects = projects.slice(0, 3);

  // Different vertical offsets for floating effect
  const floatOffsets = ['-mt-24', 'mt-0', '-mt-24'];

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-12 lg:gap-16 px-4">
      {displayProjects.map((project, index) => (
        <div
          key={project.id}
          className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 aspect-square w-[415px] md:w-[505px] lg:w-[640px] ${floatOffsets[index]}`}
        >
          {/* Full card gradient background */}
          <div
            className={`absolute inset-0 ${
              theme === 'theme-light'
                ? 'bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600'
                : 'bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800'
            }`}
          />

          {/* Glassmorphism overlay - css.glass style */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          />

          {/* Top reflection for depth */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
            }}
          />

          {/* Subtle inner border glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6">
            {/* Title above buttons */}
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-4">
              {project.title}
            </h3>

            {/* Buttons at bottom */}
            <div className="flex flex-wrap gap-2">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 hover:border-white/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>Site</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.609-2.807 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span>Skills</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
