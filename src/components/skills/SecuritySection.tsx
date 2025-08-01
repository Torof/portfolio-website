"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory } from '@/lib/types';

interface SecuritySectionProps {
  category: SkillCategory;
}

// Security - High-End Surveillance Theme
const SecuritySection = ({ category }: SecuritySectionProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate deterministic pattern based on index to avoid hydration mismatch
  const getGridPattern = (index: number) => {
    // Use deterministic logic instead of Math.random()
    const isActive = (index * 7) % 13 === 0; // Every ~13th item
    const isAnimated = (index * 11) % 17 === 0; // Every ~17th item
    return { isActive, isAnimated };
  };

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/80 via-red-50/40 to-orange-50/30 border-slate-200/30 shadow-2xl shadow-red-500/5'
          : 'bg-gradient-to-br from-slate-900/90 via-red-900/10 to-orange-900/10 border-slate-700/50 shadow-2xl shadow-red-500/5'
      }`}>
        
        {/* Surveillance grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-6 gap-2 h-full">
            {Array.from({ length: 60 }).map((_, i) => {
              const { isActive, isAnimated } = getGridPattern(i);
              return (
                <motion.div
                  key={i}
                  className={`border ${
                    theme === 'theme-light' ? 'border-slate-300' : 'border-slate-700'
                  } ${
                    mounted && isActive ? 'bg-red-500/20' : ''
                  }`}
                  animate={mounted && isAnimated ? {
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: [
                      "rgba(239, 68, 68, 0.1)",
                      "rgba(239, 68, 68, 0.3)",
                      "rgba(239, 68, 68, 0.1)"
                    ]
                  } : {}}
                  transition={{
                    duration: 2 + (i % 3), // Deterministic duration based on index
                    repeat: Infinity,
                    delay: (i % 5) * 0.8, // Deterministic delay based on index
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              animate={{
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className={`p-6 rounded-2xl ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-slate-700 to-red-600 shadow-xl shadow-red-500/25' 
                  : 'bg-gradient-to-br from-slate-800 to-red-700 shadow-xl shadow-red-500/25'
              }`}>
                <span className="text-6xl text-white">🛡️</span>
              </div>
            </motion.div>
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Security <span className="font-bold bg-gradient-to-r from-slate-700 to-red-600 bg-clip-text text-transparent">& Auditing</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Military-grade security protocols and comprehensive vulnerability assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`group relative p-8 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 overflow-hidden ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-br from-white/90 to-slate-50/60 border-slate-200/50 hover:border-red-300/50 hover:shadow-2xl hover:shadow-red-500/10'
                    : 'bg-gradient-to-br from-slate-800/90 to-slate-900/60 border-slate-700/50 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Security scan line effect */}
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <motion.div 
                      className={`p-4 rounded-xl mr-4 ${
                        theme === 'theme-light' 
                          ? 'bg-gradient-to-br from-slate-100 to-red-100' 
                          : 'bg-gradient-to-br from-slate-700 to-red-900/50'
                      }`}
                      whileHover={{ rotateX: 15, rotateY: 15 }}
                    >
                      <span className="text-2xl">{skill.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold light-text mb-2 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.level >= 4 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                        } shadow-sm`}>
                          {skill.level >= 4 ? 'SECURE' : 'MONITORING'}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === 'theme-light' 
                            ? 'bg-slate-100 text-slate-800' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          Level {skill.level}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Threat assessment display */}
                  <div className="text-right">
                    <motion.div 
                      className="text-xs font-medium text-emerald-500 mb-2"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      THREAT LEVEL: LOW
                    </motion.div>
                    <div className="flex justify-end space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm light-text opacity-70 leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Security metrics dashboard */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-emerald-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {skill.level * 50}+
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider">Audits Complete</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-red-500 mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      {Math.max(0, 5 - skill.level)}
                    </motion.div>
                    <div className="text-xs light-text opacity-50 uppercase tracking-wider">Critical Issues</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;