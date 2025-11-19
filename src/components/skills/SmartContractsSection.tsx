"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory } from '@/lib/types';

interface SmartContractsSectionProps {
  category: SkillCategory;
}

const SmartContractsSection = ({ category }: SmartContractsSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-12">
      <div className={`rounded-2xl border p-8 transition-all duration-300 ${
        theme === 'theme-light'
          ? 'bg-white/90 backdrop-blur-sm border-gray-200 hover:shadow-lg'
          : 'bg-slate-900/90 backdrop-blur-sm border-[rgba(255,255,255,0.25)] hover:border-[rgba(255,255,255,0.35)]'
      }`}>
        {/* Header with Title and Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                theme === 'theme-light'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-blue-900/30 text-blue-400'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Smart Contract Expertise
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                theme === 'theme-light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200'
              }`}
            >
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
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
          <p className={`text-base leading-relaxed ${
            theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            With over 7 years of experience as a smart contract developer, I have comprehensive
            knowledge of all major ERC standards and blockchain development patterns. I specialize
            in building secure, gas-optimized contracts for <strong>DeFi protocols</strong>, <strong>NFT platforms</strong>,
            and more. Deep expertise across the full spectrum of <strong>Ethereum standards</strong> including
            token standards, governance mechanisms, proxy patterns, and advanced DeFi primitives.
          </p>
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
              {/* Simple Table Display */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-semibold ${
                    theme === 'theme-light' ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    ERC Standards & Contract Patterns
                  </h4>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    theme === 'theme-light'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {category.skills.length} Standards
                  </span>
                </div>
                <div className={`rounded-lg border overflow-hidden ${
                  theme === 'theme-light'
                    ? 'border-gray-200'
                    : 'border-slate-700'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={
                          theme === 'theme-light'
                            ? 'bg-gray-50 border-b border-gray-200'
                            : 'bg-slate-800 border-b border-slate-700'
                        }>
                          <th className={`px-6 py-3 text-left text-sm font-semibold ${
                            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            Standard
                          </th>
                          <th className={`px-6 py-3 text-left text-sm font-semibold ${
                            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            Category
                          </th>
                          <th className={`px-6 py-3 text-left text-sm font-semibold ${
                            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            Description
                          </th>
                          <th className={`px-6 py-3 text-center text-sm font-semibold ${
                            theme === 'theme-light' ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            Expertise
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.skills.map((skill, index) => (
                          <motion.tr
                            key={skill.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className={`border-b transition-colors ${
                              theme === 'theme-light'
                                ? 'border-gray-100 hover:bg-gray-50'
                                : 'border-slate-800 hover:bg-slate-800/50'
                            }`}
                          >
                            <td className={`px-6 py-4 text-sm font-medium ${
                              theme === 'theme-light' ? 'text-slate-900' : 'text-white'
                            }`}>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{skill.icon}</span>
                                <span>{skill.name}</span>
                              </div>
                            </td>
                            <td className={`px-6 py-4 text-xs ${
                              theme === 'theme-light' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {skill.subcategory}
                            </td>
                            <td className={`px-6 py-4 text-sm ${
                              theme === 'theme-light' ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                              {t(`erc.${skill.id}.description`) !== `erc.${skill.id}.description`
                                ? t(`erc.${skill.id}.description`)
                                : skill.description}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                skill.level === 5
                                  ? theme === 'theme-light'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-green-900/30 text-green-400'
                                  : skill.level === 4
                                  ? theme === 'theme-light'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-blue-900/30 text-blue-400'
                                  : theme === 'theme-light'
                                    ? 'bg-gray-100 text-gray-700'
                                    : 'bg-gray-800 text-gray-400'
                              }`}>
                                {skill.level === 5 ? 'Expert' : skill.level === 4 ? 'Advanced' : skill.level === 3 ? 'Intermediate' : 'Beginner'}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SmartContractsSection;
