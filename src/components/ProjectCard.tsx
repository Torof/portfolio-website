'use client';

import Image from 'next/image';
import { Project } from "@/lib/types";
import { useTheme } from '@/lib/context/ThemeContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useTheme();
  const CardWrapper = project.githubUrl ? 'a' : 'div';
  const cardProps = project.githubUrl ? {
    href: project.githubUrl,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <CardWrapper 
      {...cardProps}
      className={`group block rounded-xl overflow-hidden border mb-6 w-full backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
        theme === 'theme-light'
          ? 'bg-[rgba(255,255,255,0.95)] border-gray-400 hover:shadow-[rgba(124,58,237,0.2)] hover:border-blue-500'
          : 'bg-[rgba(15,23,42,0.7)] border-slate-500 hover:shadow-[rgba(124,58,237,0.3)] hover:border-blue-400'
      }`}
    >
      <div className="h-48 relative overflow-hidden project-card-image">
        {/* Project thumbnail with fallback */}
        {project.thumbnail ? (
          <Image 
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-110"
            width={640}
            height={360}
            priority={true}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#16213e] to-[#1a1a2e] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--secondary-400)]">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>
        )}
        
        {/* Project name overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent flex items-end transition-all duration-300 group-hover:from-[rgba(124,58,237,0.8)]">
          <h3 className="text-xl font-semibold p-4 text-white transition-all duration-300 group-hover:transform group-hover:translate-y-[-4px]">{project.title}</h3>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <p className={`mb-4 transition-colors duration-300 ${
          theme === 'theme-light'
            ? 'text-gray-700 group-hover:text-gray-900'
            : 'text-[var(--dark-200)] group-hover:text-[var(--dark-100)]'
        }`}>
          {project.longDescription || project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span 
              key={tech} 
              className={`px-2 py-1 text-xs rounded-full transition-all duration-300 group-hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-[rgba(124,58,237,0.15)] text-purple-700 group-hover:bg-[rgba(124,58,237,0.25)] group-hover:text-purple-800'
                  : 'bg-[rgba(124,58,237,0.1)] text-[var(--secondary-300)] group-hover:bg-[rgba(124,58,237,0.2)] group-hover:text-[var(--secondary-200)]'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          {project.githubUrl && (
            <span className={`flex items-center transition-all duration-300 ${
              theme === 'theme-light'
                ? 'text-gray-600 group-hover:text-purple-600'
                : 'text-[var(--dark-200)] group-hover:text-[var(--secondary-400)]'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 transition-transform duration-300 group-hover:rotate-12">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </span>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center transition-all duration-300 hover:scale-110 hover:translate-x-1 z-10 relative ${
                theme === 'theme-light'
                  ? 'text-gray-600 hover:text-purple-600'
                  : 'text-[var(--dark-200)] hover:text-[var(--secondary-400)]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 transition-transform duration-300 group-hover:rotate-12">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Live Demo
            </a>
          )}
          
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;