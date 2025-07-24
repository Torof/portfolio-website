'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from "@/lib/types";
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const EnhancedProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Stagger animation based on index
  const animationDelay = 0.1 * index;

  return (
    <>
      <style jsx>{`
        @media (prefers-color-scheme: light) {
          .theme-project-card {
            background: rgb(31 41 55) !important;
            border-color: rgb(55 65 81) !important;
          }
          .theme-project-title {
            color: white !important;
          }
          .theme-project-description {
            color: rgb(209 213 219) !important;
          }
          .theme-tech-tag {
            background: rgb(31 41 55) !important;
            color: rgb(96 165 250) !important;
            border-color: rgb(55 65 81) !important;
          }
          .theme-tech-tag:hover {
            background: rgb(55 65 81) !important;
          }
          .theme-project-links {
            color: rgb(156 163 175) !important;
          }
          .theme-project-links:hover {
            color: rgb(96 165 250) !important;
          }
        }
      `}</style>
      
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden border border-gray-700 w-full project-card relative shadow-lg theme-project-card backdrop-blur-md bg-[rgba(15,23,42,0.7)] dark:bg-[rgba(15,23,42,0.7)] light:bg-[rgba(255,255,255,0.8)]"
    >
      <div className="h-48 relative overflow-hidden">
        {/* Animated project image */}
        {project.thumbnail ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image 
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="object-cover object-center w-full h-full"
              width={640}
              height={360}
              priority={true}
            />
          </motion.div>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#16213e] to-[#1a1a2e] flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: 360,
                transition: { repeat: Infinity, duration: 20, ease: "linear" }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--secondary-400)]">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </motion.div>
          </div>
        )}
        
        {/* Project name overlay with animated gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent flex items-end"
          whileHover={{ opacity: 0.9 }}
        >
          <motion.h3 
            className="text-xl font-semibold p-4 text-white theme-project-title"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {project.title}
          </motion.h3>
        </motion.div>
      </div>
      
      <div className="p-6 flex-grow">
        <p className="text-gray-300 mb-4 leading-relaxed theme-project-description">
          {project.longDescription || project.description}
        </p>
        
        {/* Animated tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, idx: number) => (
            <motion.span 
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx + animationDelay }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#1f2937",
              }}
              className="px-3 py-1 text-xs bg-gray-800 text-blue-400 rounded-full border border-gray-700 theme-tech-tag"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          {project.githubUrl && (
            <motion.a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-400 hover:text-blue-400 transition-colors theme-project-links"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </motion.a>
          )}
          
          {project.liveUrl && (
            <motion.a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-400 hover:text-blue-400 transition-colors theme-project-links"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Live Demo
            </motion.a>
          )}
          
        </div>
      </div>

      {/* Animated border effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 1,
          transition: { duration: 0.3 }
        }}
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,0.3) 50%, rgba(124,58,237,0) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
        }}
      />
    </motion.div>
    </>
  );
};

export default EnhancedProjectCard;