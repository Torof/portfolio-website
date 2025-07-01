'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from "@/lib/types";
import EnhancedProjectCard from './EnhancedProjectCard';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ProjectsSectionProps {
  projects: Project[];
}

const EnhancedProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();
  // Display only the first two projects
  const displayedProjects = projects.slice(0, 2);
  
  return (
    <div className="w-full">
      {/* Project Cards */}
      <div className="space-y-8">
        {displayedProjects.map((project, index) => (
          <EnhancedProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-12"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/projects" className="relative inline-flex group">
            <span className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
            <span className="relative btn-primary group-hover:bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] transition-all duration-300">
{t('common.viewAllProjects')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedProjectsSection;