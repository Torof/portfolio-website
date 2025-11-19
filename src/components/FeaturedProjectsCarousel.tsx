'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { FeaturedProject } from '@/lib/data/featuredProjects';

interface FeaturedProjectsCarouselProps {
  projects: FeaturedProject[];
}

const FeaturedProjectsCarousel = ({ projects }: FeaturedProjectsCarouselProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
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

  const ProjectCard = ({ project }: { project: FeaturedProject }) => (
    <div
      className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
        theme === 'theme-light'
          ? 'bg-white border-2 border-gray-200'
          : 'bg-slate-900 border-2 border-slate-700'
      }`}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {/* Placeholder for project image */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
          {project.title}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3
          className={`text-xl font-bold mb-3 ${
            theme === 'theme-light' ? 'text-slate-900' : 'text-white'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-sm mb-4 leading-relaxed line-clamp-3 ${
            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
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
        <div className="flex gap-3">
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                theme === 'theme-light'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Website</span>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
              theme === 'theme-light'
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`rounded-2xl border p-8 transition-all duration-300 ${
        theme === 'theme-light'
          ? 'bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg'
          : 'bg-slate-900/90 backdrop-blur-sm border-slate-700 shadow-lg'
      }`}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'theme-light' ? 'text-slate-900' : 'text-white'
          }`}
        >
          {t('featuredProjects.title')}
        </h2>
        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          {t('featuredProjects.description')}
        </p>
      </div>

      {/* Carousel with Navigation */}
      <div className="flex items-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={() => paginate(-1)}
          className={`flex-shrink-0 p-3 rounded-full transition-all ${
            theme === 'theme-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
          }`}
          aria-label="Previous projects"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Carousel Display Area */}
        <div className="flex-1 relative min-h-[480px] overflow-hidden">
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
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              {/* Grid of 2 projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => paginate(1)}
          className={`flex-shrink-0 p-3 rounded-full transition-all ${
            theme === 'theme-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
          }`}
          aria-label="Next projects"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPage ? 1 : -1);
              setCurrentPage(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentPage
                ? theme === 'theme-light'
                  ? 'bg-blue-600 w-8'
                  : 'bg-blue-500 w-8'
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
};

export default FeaturedProjectsCarousel;
