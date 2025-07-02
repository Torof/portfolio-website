'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { techStack } from '../lib/data/techStack';
import { useLanguage } from '../lib/context/LanguageContext';

interface TechItem {
  name: string;
  icon: string;
  logo: string;
}

interface TechCategoryProps {
  title: string;
  technologies: TechItem[];
  colorClass: string;
  iconPath: React.ReactNode;
}

const TechCategory: React.FC<TechCategoryProps> = ({ 
  title, 
  technologies, 
  colorClass, 
  iconPath 
}) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<boolean>(false);
  
  // Display either the first 3 items or all items based on expanded state
  const displayedTechnologies = expanded ? technologies : technologies.slice(0, 3);
  const remainingCount = technologies.length - 3;
  
  return (
    <div className="mb-12 border border-[rgba(255,255,255,0.1)] theme-dark:border-[rgba(255,255,255,0.1)] theme-light:border-[rgba(0,0,0,0.1)] rounded-xl p-6 bg-[var(--background-secondary)] shadow-lg">
      {/* Category Header with Icon */}
      <div className="flex items-center mb-6 justify-center">
        <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {iconPath}
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[var(--foreground)]">
          {title}
        </h3>
      </div>

      {/* Visual separator - solid line */}
      <div className="w-full h-px bg-[rgba(255,255,255,0.1)] theme-dark:bg-[rgba(255,255,255,0.1)] theme-light:bg-[rgba(0,0,0,0.1)] mb-6"></div>

      {/* Tech Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {displayedTechnologies.map((tech) => (
          <div 
            key={tech.name} 
            className="flex flex-col items-center p-6 rounded-lg glass-vibrant hover:translate-y-[-2px] transition-all duration-300 h-32 shadow-sm"
          >
            <div className="h-16 w-16 relative mb-4 flex items-center justify-center">
              <Image 
                src={tech.logo}
                alt={`${tech.name} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-[var(--foreground)] text-center text-sm font-medium">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* View More toggle button if there are more than 3 items */}
      {remainingCount > 0 && (
        <div className="text-right mt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-[var(--primary-500)] hover:text-[var(--primary-700)] transition-colors flex items-center ml-auto font-medium glass-vibrant px-3 py-1 rounded-md"
          >
            {expanded ? (
              <>
                {t('common.showLess')}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </>
            ) : (
              <>
                {t('common.viewMore', { count: remainingCount, type: title.toLowerCase() })}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const TechStackGrid: React.FC = () => {
  return (
    <div className="w-full">
      <TechCategory 
        title="Blockchain" 
        technologies={techStack.blockchain}
        colorClass="bg-[rgba(2,132,201,0.2)]"
        iconPath={
          <>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </>
        }
      />
      
      <TechCategory 
        title="Frontend" 
        technologies={techStack.frontend}
        colorClass="bg-[rgba(124,58,237,0.2)]"
        iconPath={
          <>
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </>
        }
      />
      
      <TechCategory 
        title="Backend" 
        technologies={techStack.backend}
        colorClass="bg-[rgba(6,182,212,0.2)]"
        iconPath={
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        }
      />
    </div>
  );
};

export default TechStackGrid;