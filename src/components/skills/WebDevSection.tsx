"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory } from '@/lib/types';

interface WebDevSectionProps {
  category: SkillCategory;
}

const WebDevSection = ({ category }: WebDevSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-12">
      <div className={`rounded-2xl border-2 p-8 transition-all duration-300 ${
        theme === 'theme-light'
          ? 'bg-white/90 backdrop-blur-sm border-gray-400 hover:shadow-lg'
          : 'bg-slate-900/90 backdrop-blur-sm border-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.5)]'
      }`}>
        {/* Header with Title and Description */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${
              theme === 'theme-light'
                ? 'bg-green-100 text-green-600'
                : 'bg-green-900/30 text-green-400'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-white'
            }`}>
              {t('skills.webDev.title')}
            </h3>
          </div>
          <p
            className={`text-base leading-relaxed ${
              theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
            }`}
            dangerouslySetInnerHTML={{ __html: t('skills.webDev.description') }}
          />
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        theme === 'theme-light'
                          ? 'bg-white border-gray-200 hover:border-green-300 hover:shadow-lg'
                          : 'bg-slate-800/50 border-slate-700 hover:border-green-600/50 hover:shadow-xl'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{skill.icon}</span>
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold mb-2 ${
                            theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                          }`}>
                            {skill.name}
                          </h4>
                          <p className={`text-sm mb-3 ${
                            theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            {skill.description}
                          </p>
                          {skill.examples && skill.examples.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {skill.examples.map((example, idx) => (
                                <span
                                  key={idx}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    theme === 'theme-light'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-green-900/30 text-green-400'
                                  }`}
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-200 ${
              theme === 'theme-light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200'
            }`}
          >
            <span>{isExpanded ? t('skills.section.collapse') : t('skills.section.expand')}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebDevSection;
