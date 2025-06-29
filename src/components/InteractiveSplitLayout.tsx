'use client';

import React, { useState, useEffect } from 'react';
import { projects } from "@/lib/data";
import EnhancedProjectsSection from './EnhancedProjectsSection';
import AnimatedTechStack from './AnimatedTechStack';
import { motion } from 'framer-motion';

// Only display featured projects
const featuredProjects = projects.filter(project => project.featured);

const InteractiveSplitLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tech' | 'projects'>('tech');

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

  // If mobile, render tabbed interface
  if (isMobile) {
    return (
      <section className="section relative bg-[rgba(255,255,255,0.02)] overflow-hidden pt-12 pb-20">
        <motion.div 
          className="blob-background top-40 right-20 opacity-5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-[rgba(255,255,255,0.05)] p-1 rounded-lg flex">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('tech')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
                  activeTab === 'tech' 
                    ? 'bg-[var(--background-secondary)] text-[var(--primary-400)] shadow-md' 
                    : 'text-[var(--dark-200)] hover:text-[var(--primary-300)]'
                }`}
              >
                Tech Stack
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
                  activeTab === 'projects' 
                    ? 'bg-[var(--background-secondary)] text-[var(--primary-400)] shadow-md' 
                    : 'text-[var(--dark-200)] hover:text-[var(--primary-300)]'
                }`}
              >
                Projects
              </motion.button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{ 
                opacity: activeTab === 'tech' ? 1 : 0,
                x: activeTab === 'tech' ? 0 : -20
              }}
              transition={{ duration: 0.3 }}
              style={{ display: activeTab === 'tech' ? 'block' : 'none' }}
            >
              <div className="text-center mb-10">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="section-title text-4xl font-bold"
                >
                  Tech Stack
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--dark-200)] mt-4"
                >
                  Technologies and tools I use to bring blockchain projects to life
                </motion.p>
              </div>
              
              {/* Tech stack grid */}
              <AnimatedTechStack />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{ 
                opacity: activeTab === 'projects' ? 1 : 0,
                x: activeTab === 'projects' ? 0 : 20 
              }}
              transition={{ duration: 0.3 }}
              style={{ display: activeTab === 'projects' ? 'block' : 'none' }}
            >
              <div className="text-center mb-10">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="section-title text-4xl font-bold"
                >
                  Projects
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--dark-200)] mt-4"
                >
                  Explore my recent blockchain development work
                </motion.p>
              </div>
              <EnhancedProjectsSection projects={featuredProjects} />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // For desktop, render a more interactive split layout
  return (
    <section className="section relative bg-[rgba(255,255,255,0.02)] overflow-hidden py-16">
      <motion.div 
        className="blob-background top-40 right-20 opacity-5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Full width flex container with an animated divider */}
      <div className="flex w-full relative">
        {/* Animated divider */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent"
          animate={{
            height: ["0%", "80%", "0%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 5,
            ease: "easeInOut"
          }}
        />
        
        {/* Left Column - Tech Stack */}
        <motion.div 
          className="w-1/2 flex justify-center px-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full pl-16">
            <div className="mb-14 text-center">
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="section-title text-4xl font-bold"
              >
                Tech Stack
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[var(--dark-200)] mt-4"
              >
                Technologies and tools I use to bring blockchain projects to life
              </motion.p>
            </div>
            
            {/* Tech stack grid */}
            <AnimatedTechStack />
          </div>
        </motion.div>
        
        {/* Right Column - Projects */}
        <motion.div 
          className="w-1/2 flex justify-center px-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-md w-full">
            <div className="mb-14 text-center">
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="section-title text-4xl font-bold"
              >
                Projects
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[var(--dark-200)] mt-4"
              >
                Explore my recent blockchain development work
              </motion.p>
            </div>
            <EnhancedProjectsSection projects={featuredProjects} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSplitLayout;