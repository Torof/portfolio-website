'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory } from '@/lib/types';

interface SecurityArsenalProps {
  category: SkillCategory;
}

export default function SecurityArsenal({ category }: SecurityArsenalProps) {
  const { theme } = useTheme();
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map security skills to weapons with medieval/cyber aesthetics
  const weaponMap = {
    'auditing': {
      name: 'Magnifying Blade',
      type: 'Primary Weapon',
      description: 'A legendary sword that reveals hidden vulnerabilities in the code realm',
      weapon: '🗡️',
      glow: 'from-blue-400 to-cyan-500',
      rarity: 'Legendary'
    },
    'common-vulnerabilities': {
      name: 'Shield of Knowledge',
      type: 'Defensive Gear',
      description: 'An ancient shield forged from countless battle scars, protecting against all known attack vectors',
      weapon: '🛡️',
      glow: 'from-red-400 to-orange-500',
      rarity: 'Mythic'
    },
    'formal-verification': {
      name: 'Tome of Certainty',
      type: 'Mystical Artifact',
      description: 'A mathematical grimoire that proves the absolute truth of smart contract logic',
      weapon: '📜',
      glow: 'from-purple-400 to-indigo-500',
      rarity: 'Epic'
    },
    'mev-protection': {
      name: 'Cloak of Shadows',
      type: 'Stealth Equipment',
      description: 'A mystical cloak that shields transactions from the eyes of MEV extractors',
      weapon: '🌑',
      glow: 'from-gray-400 to-slate-500',
      rarity: 'Legendary'
    },
    'invariant-testing': {
      name: 'Chaos Hammer',
      type: 'Testing Weapon',
      description: 'A hammer that strikes with infinite randomness, shattering bugs and revealing edge cases',
      weapon: '🔨',
      glow: 'from-green-400 to-emerald-500',
      rarity: 'Epic'
    },
    'attack-vectors': {
      name: 'Eye of the Hunter',
      type: 'Reconnaissance Tool',
      description: 'A mystical eye that sees through all deceptions and reveals every possible attack path',
      weapon: '👁️',
      glow: 'from-yellow-400 to-amber-500',
      rarity: 'Mythic'
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      'Common': 'text-gray-400',
      'Epic': 'text-purple-400',
      'Legendary': 'text-orange-400', 
      'Mythic': 'text-red-400'
    };
    return colors[rarity as keyof typeof colors] || 'text-gray-400';
  };

  if (!mounted) {
    return <div className="h-96" />;
  }

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-lg border overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50 to-red-50 border-gray-200 shadow-lg'
          : 'bg-gradient-to-br from-slate-900 to-red-950 border-slate-700 shadow-lg'
      }`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0">
            {/* Floating weapon silhouettes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute text-6xl ${
                  theme === 'theme-light' ? 'text-slate-400' : 'text-slate-600'
                }`}
                style={{
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${15 + Math.floor(i / 4) * 70}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                {['⚔️', '🛡️', '🏹', '🔨', '🗡️', '🪓', '⚡', '🌟'][i]}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Security Arsenal
              </span>
            </h2>
            <p className="text-xl light-text opacity-70 max-w-2xl mx-auto">
              Battle-tested weapons forged in the fires of smart contract warfare
            </p>
          </motion.div>
        </div>

        {/* Weapon Rack */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {category.skills.map((skill, index) => {
            const weapon = weaponMap[skill.id as keyof typeof weaponMap];
            if (!weapon) return null;

            const isSelected = selectedWeapon === skill.id;

            return (
              <motion.div
                key={skill.id}
                className={`relative group cursor-pointer ${
                  isSelected ? 'z-20' : 'z-10'
                }`}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setSelectedWeapon(isSelected ? null : skill.id)}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ perspective: '1000px' }}
              >
                {/* Weapon Display */}
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                  theme === 'theme-light'
                    ? `bg-gradient-to-br from-white/90 to-gray-100/90 ${
                        isSelected 
                          ? 'border-orange-400 shadow-2xl shadow-orange-500/20' 
                          : 'border-gray-300 hover:border-orange-300 hover:shadow-xl'
                      }`
                    : `bg-gradient-to-br from-slate-800/90 to-slate-900/90 ${
                        isSelected 
                          ? 'border-orange-500 shadow-2xl shadow-orange-500/20' 
                          : 'border-slate-600 hover:border-orange-400 hover:shadow-xl'
                      }`
                }`}>
                  
                  {/* Glowing Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${weapon.glow} blur-xl`} />
                  
                  {/* Weapon Icon */}
                  <div className="relative z-10 text-center mb-4">
                    <motion.div
                      className="text-6xl mb-3 inline-block"
                      animate={isSelected ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: isSelected ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      {weapon.weapon}
                    </motion.div>
                    
                    {/* Rarity Indicator */}
                    <div className={`text-sm font-bold ${getRarityColor(weapon.rarity)} mb-2`}>
                      ◊ {weapon.rarity} ◊
                    </div>
                  </div>

                  {/* Weapon Info */}
                  <div className="relative z-10 text-center">
                    <h3 className={`text-lg font-bold mb-1 ${
                      theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
                    }`}>
                      {weapon.name}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {weapon.type}
                    </p>
                    
                    {/* Skill Level */}
                    <div className="flex justify-center mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-3 h-3 mx-1 rounded-full ${
                            i < skill.level
                              ? 'bg-gradient-to-r from-orange-400 to-red-500'
                              : theme === 'theme-light' 
                                ? 'bg-gray-300' 
                                : 'bg-slate-600'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        />
                      ))}
                    </div>

                    {/* Mastery Level */}
                    <div className="text-xs text-orange-500 font-medium">
                      Level {skill.level} Mastery
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-orange-400"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weapon Details Modal */}
        <AnimatePresence>
          {selectedWeapon && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWeapon(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              
              {/* Modal */}
              <motion.div
                className={`relative max-w-2xl w-full p-8 rounded-3xl border-2 ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-br from-white to-orange-50 border-orange-300'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500'
                }`}
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const skill = category.skills.find(s => s.id === selectedWeapon);
                  const weapon = weaponMap[selectedWeapon as keyof typeof weaponMap];
                  if (!skill || !weapon) return null;

                  return (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-8xl mb-4">{weapon.weapon}</div>
                        <h3 className={`text-3xl font-bold mb-2 ${
                          theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
                        }`}>
                          {weapon.name}
                        </h3>
                        <div className={`text-lg ${getRarityColor(weapon.rarity)} font-bold mb-4`}>
                          ◊ {weapon.rarity} {weapon.type} ◊
                        </div>
                        <p className={`text-lg italic mb-6 ${
                          theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          &ldquo;{weapon.description}&rdquo;
                        </p>
                      </div>

                      {/* Skill Details */}
                      <div className={`p-6 rounded-2xl ${
                        theme === 'theme-light' 
                          ? 'bg-orange-50/50 border border-orange-200' 
                          : 'bg-slate-800/50 border border-slate-600'
                      }`}>
                        <h4 className={`text-xl font-bold mb-3 ${
                          theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
                        }`}>
                          {skill.name}
                        </h4>
                        <p className="light-text opacity-80 mb-4">{skill.description}</p>
                        
                        {/* Examples */}
                        <div className="mb-4">
                          <h5 className="font-semibold light-text mb-2">Combat Techniques:</h5>
                          <div className="flex flex-wrap gap-2">
                            {skill.examples?.map((example, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 text-sm rounded-full ${
                                  theme === 'theme-light'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-orange-900/30 text-orange-300'
                                }`}
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Battle History */}
                        <div>
                          <h5 className="font-semibold light-text mb-2">Battle History:</h5>
                          <ul className="space-y-1">
                            {skill.projects?.map((project, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-orange-500 mr-2 mt-1">⚔️</span>
                                <span className="light-text opacity-80 text-sm">{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedWeapon(null)}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          theme === 'theme-light'
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }`}
                      >
                        ✕
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}