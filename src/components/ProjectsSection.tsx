import React from 'react';
// import Link from 'next/link'; // Removed for IPFS compatibility
import { Project } from "@/lib/types";
import ProjectCard from './ProjectCard';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();
  // Display only the first two projects
  const displayedProjects = projects.slice(0, 2);
  
  return (
    <div className="w-full">
      {/* Project Cards */}
      <div className="space-y-8">
        {displayedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <a href="./projects.html" className="btn-primary">
{t('common.viewAllProjects')}
        </a>
      </div>
    </div>
  );
};

export default ProjectsSection;