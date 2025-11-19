"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory } from '@/lib/types';
import SecurityDefenseSystem from '@/components/SecurityDefenseSystem';

interface SecuritySectionProps {
  category: SkillCategory;
}

const SecuritySection = ({ category }: SecuritySectionProps) => {
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
                  ? 'bg-red-100 text-red-600'
                  : 'bg-red-900/30 text-red-400'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Smart Contract Security & Auditing
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
            With extensive experience in smart contract security, I specialize in identifying and mitigating
            vulnerabilities before they become exploits. My approach combines <strong>manual code review</strong>,
            <strong>automated static analysis</strong>, and <strong>property-based testing</strong> to ensure
            comprehensive security coverage. I have deep knowledge of common attack vectors including
            <strong> reentrancy</strong>, <strong>flash loan attacks</strong>, <strong>MEV exploitation</strong>,
            <strong>oracle manipulation</strong>, and more. Using industry-standard tools like <strong>Slither</strong>,
            <strong>Foundry</strong>, and <strong>Echidna</strong>, I conduct thorough security audits and implement
            robust defense mechanisms to protect protocols and their users.
          </p>
        </div>

        {/* Expandable Content - Security Defense System */}
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
                <SecurityDefenseSystem category={category} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecuritySection;