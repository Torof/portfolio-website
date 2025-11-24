'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { FeaturedProject } from '@/lib/data/featuredProjects';

interface ProjectsCarouselProps {
  projects: FeaturedProject[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + newDirection;
      if (nextPage < 0) return totalPages - 1;
      if (nextPage >= totalPages) return 0;
      return nextPage;
    });
  };

  // Get the current page's projects
  const startIndex = currentPage * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => paginate(-1)}
          className={`flex-shrink-0 p-2 rounded-full transition-all ${
            theme === 'theme-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
          aria-label="Previous projects"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel Content */}
        <div className="flex-1 relative overflow-hidden min-h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              {/* Grid of 2 projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`flex flex-col p-4 rounded-lg border transition-all duration-300 ${
                      theme === 'theme-light'
                        ? 'bg-white border-gray-500 hover:border-blue-500 hover:shadow-lg'
                        : 'bg-slate-800/60 border-slate-500 hover:border-blue-400 hover:shadow-xl'
                    }`}
                  >
                    {/* Project Image */}
                    <div
                      className={`w-full h-32 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4 ${
                        theme === 'theme-light'
                          ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                          : 'bg-gradient-to-br from-blue-600 to-purple-700'
                      }`}
                    >
                      {project.title}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <h3
                        className={`text-base font-bold mb-2 ${
                          theme === 'theme-light' ? 'text-gray-900' : 'text-white'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 line-clamp-2 ${
                          theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
                        }`}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded-full ${
                              theme === 'theme-light'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-blue-900/30 text-blue-400'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-2">
                        {project.websiteUrl && (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                              theme === 'theme-light'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            <span>Visit</span>
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                            theme === 'theme-light'
                              ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                              : 'bg-slate-700 hover:bg-slate-600 text-white'
                          }`}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.609-2.807 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => paginate(1)}
          className={`flex-shrink-0 p-2 rounded-full transition-all ${
            theme === 'theme-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
          aria-label="Next projects"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPage ? 1 : -1);
              setCurrentPage(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPage
                ? theme === 'theme-light'
                  ? 'bg-blue-600 w-6'
                  : 'bg-blue-500 w-6'
                : theme === 'theme-light'
                  ? 'bg-gray-300 hover:bg-gray-400'
                  : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
