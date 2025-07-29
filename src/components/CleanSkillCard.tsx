import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { AdvancedSkill } from '@/lib/types';

const CleanSkillCard = ({ skill }: { skill: AdvancedSkill }) => {
  const { theme } = useTheme();
  
  const levelColors = {
    1: 'from-rose-400 to-pink-500',
    2: 'from-orange-400 to-amber-500', 
    3: 'from-yellow-400 to-orange-500',
    4: 'from-blue-400 to-indigo-500',
    5: 'from-emerald-400 to-green-500'
  };

  const levelBgColors = {
    1: 'from-rose-50/90 to-pink-50/90',
    2: 'from-orange-50/90 to-amber-50/90', 
    3: 'from-yellow-50/90 to-orange-50/90',
    4: 'from-blue-50/90 to-indigo-50/90',
    5: 'from-emerald-50/90 to-green-50/90'
  };

  const levelBgColorsDark = {
    1: 'from-rose-900/30 to-pink-900/30',
    2: 'from-orange-900/30 to-amber-900/30', 
    3: 'from-yellow-900/30 to-orange-900/30',
    4: 'from-blue-900/30 to-indigo-900/30',
    5: 'from-emerald-900/30 to-green-900/30'
  };

  const levelBorderColors = {
    1: 'border-rose-200 hover:border-pink-300',
    2: 'border-orange-200 hover:border-amber-300', 
    3: 'border-yellow-200 hover:border-orange-300',
    4: 'border-blue-200 hover:border-indigo-300',
    5: 'border-emerald-200 hover:border-green-300'
  };

  const levelBorderColorsDark = {
    1: 'border-rose-700/50 hover:border-pink-600/50',
    2: 'border-orange-700/50 hover:border-amber-600/50', 
    3: 'border-yellow-700/50 hover:border-orange-600/50',
    4: 'border-blue-700/50 hover:border-indigo-600/50',
    5: 'border-emerald-700/50 hover:border-green-600/50'
  };

  const levelLabels = {
    1: 'Beginner',
    2: 'Intermediate', 
    3: 'Proficient',
    4: 'Advanced',
    5: 'Expert'
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
        theme === 'theme-light'
          ? `bg-gradient-to-br ${levelBgColors[skill.level]} ${levelBorderColors[skill.level]}`
          : `bg-gradient-to-br ${levelBgColorsDark[skill.level]} ${levelBorderColorsDark[skill.level]}`
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating orb effect - consistent with service cards */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${levelColors[skill.level]} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
      
      <div className="relative z-10">
        {/* Clean header - similar to service cards */}
        <div className="mb-6">
          <div className="text-4xl mb-4">{skill.icon}</div>
          <h3 className="text-xl font-bold light-text mb-3">
            {skill.name}
          </h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${levelColors[skill.level]} text-white`}>
            {levelLabels[skill.level]}
          </div>
        </div>

        {/* Clean description */}
        <p className="light-text opacity-80 mb-6">
          {skill.description}
        </p>

        {/* Key areas - clean list style */}
        {skill.examples && skill.examples.length > 0 && (
          <ul className="space-y-3 light-text mb-6">
            {skill.examples.slice(0, 3).map((example: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Projects - clean list style */}
        {skill.projects && skill.projects.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold light-text mb-3 opacity-70 uppercase tracking-wider">Recent Experience</h4>
            <ul className="space-y-2 light-text">
              {skill.projects.slice(0, 2).map((project: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CleanSkillCard;