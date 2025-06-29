'use client';

import React, { useState, useEffect } from 'react';
import { projects } from "@/lib/data";
import ProjectsSection from './ProjectsSection';
import TechStackGrid from './TechStackGrid';

// Only display featured projects
const featuredProjects = projects.filter(project => project.featured);

const SplitLayoutSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // If mobile, render stacked layout
  if (isMobile) {
    return (
      <section className="section relative bg-[rgba(255,255,255,0.02)] overflow-hidden">
        <div className="blob-background top-40 right-20 opacity-5"></div>
        <div className="container-custom">
          {/* Tech Stack First */}
          <div className="mb-16">
            <div className="mb-10 text-center">
              <h2 className="section-title text-4xl font-bold">Tech Stack</h2>
              <p className="text-[var(--dark-200)] mt-4">
                Technologies and tools I use to bring blockchain projects to life
              </p>
            </div>
            
            {/* Tech stack grid */}
            <TechStackGrid />
          </div>
          
          {/* Projects Second */}
          <div>
            <div className="mb-10 text-center">
              <h2 className="section-title text-4xl font-bold">Projects</h2>
              <p className="text-[var(--dark-200)] mt-4">
                Explore my recent blockchain development work
              </p>
            </div>
            <ProjectsSection projects={featuredProjects} />
          </div>
        </div>
      </section>
    );
  }

  // For desktop, render a flexbox layout with proper alignment
  return (
    <section className="section relative bg-[rgba(255,255,255,0.02)] overflow-hidden">
      <div className="blob-background top-40 right-20 opacity-5"></div>
      
      {/* Full width flex container without any additional constraints */}
      <div className="flex w-full">
        {/* Left Column - Tech Stack */}
        <div className="w-1/2 flex justify-center px-8">
          <div className="w-full pl-16">
            <div className="mb-14 text-center">
              <h2 className="section-title text-4xl font-bold">Tech Stack</h2>
              <p className="text-[var(--dark-200)] mt-4">
                Technologies and tools I use to bring blockchain projects to life
              </p>
            </div>
            
            {/* Tech stack grid */}
            <TechStackGrid />
          </div>
        </div>
        
        {/* Right Column - Projects */}
        <div className="w-1/2 flex justify-center px-4">
          <div className="max-w-md w-full">
            <div className="mb-14 text-center">
              <h2 className="section-title text-4xl font-bold">Projects</h2>
              <p className="text-[var(--dark-200)] mt-4">
                Explore my recent blockchain development work
              </p>
            </div>
            <ProjectsSection projects={featuredProjects} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitLayoutSection;