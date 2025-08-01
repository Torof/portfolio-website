"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory } from '@/lib/types';

interface ThemedSkillSectionsProps {
  categories: SkillCategory[];
}

// Smart Contracts - Blockchain/Document Theme
const SmartContractsSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  // const [selectedSkill, setSelectedSkill] = useState<AdvancedSkill | null>(null);

  return (
    <section className="mb-20">
      <div className={`relative p-8 rounded-3xl border-2 backdrop-blur-md overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 border-blue-300'
          : 'bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border-blue-700'
      }`}>
        {/* Blockchain pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 gap-4 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={`rounded border-2 ${
                theme === 'theme-light' ? 'border-blue-400' : 'border-blue-600'
              }`}></div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-3xl font-bold text-blue-600 mb-4">Smart Contract Standards</h3>
            <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
              Advanced knowledge of ERC standards and contract patterns that power the blockchain ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                  theme === 'theme-light'
                    ? 'bg-white/80 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl'
                    : 'bg-slate-800/80 border-blue-700 hover:border-blue-500 shadow-lg hover:shadow-xl'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Contract-style header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{skill.icon}</div>
                    <div className={`text-xs font-mono px-2 py-1 rounded ${
                      theme === 'theme-light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      ERC-{skill.id.includes('erc') ? skill.id.replace('erc', '') : 'CUSTOM'}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    skill.level >= 4 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    V{skill.level}.0
                  </div>
                </div>

                <h4 className="font-bold light-text mb-2">{skill.name}</h4>
                <p className="text-sm light-text opacity-70 mb-4">{skill.description}</p>

                {/* Implementation status */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    theme === 'theme-light' ? 'bg-green-100 text-green-800' : 'bg-green-900/50 text-green-300'
                  }`}>
                    ✓ Deployed
                  </span>
                  <span className="light-text opacity-50">Level {skill.level}/5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// DeFi - Financial/Trading Theme
const DeFiSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  // const [selectedSkill, setSelectedSkill] = useState<AdvancedSkill | null>(null);

  return (
    <section className="mb-20">
      <div className={`relative p-8 rounded-3xl border-2 backdrop-blur-md overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-green-50/90 via-emerald-50/90 to-teal-50/90 border-green-300'
          : 'bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 border-green-700'
      }`}>
        {/* Trading chart pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="chart-pattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,20 Q15,10 30,15 T60,12" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-500"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chart-pattern)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-3xl font-bold text-green-600 mb-4">DeFi Protocols</h3>
            <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
              Deep understanding of decentralized finance mechanisms and yield generation strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  theme === 'theme-light'
                    ? 'bg-white/80 border-green-200 hover:border-green-400'
                    : 'bg-slate-800/80 border-green-700 hover:border-green-500'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{skill.icon}</div>
                    <div>
                      <h4 className="font-bold light-text mb-1">{skill.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          skill.level >= 4 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                          APY {skill.level * 20}%
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          theme === 'theme-light' ? 'bg-green-100 text-green-800' : 'bg-green-900/50 text-green-300'
                        }`}>
                          TVL Ready
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price chart mini */}
                  <div className="w-16 h-8">
                    <svg className="w-full h-full">
                      <path 
                        d="M0,8 Q4,4 8,6 T16,8" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none" 
                        className="text-green-500"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-sm light-text opacity-70 mb-4">{skill.description}</p>

                {/* Protocol stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xs font-bold text-green-500">{skill.level * 10}M+</div>
                    <div className="text-xs light-text opacity-50">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-green-500">{skill.level}</div>
                    <div className="text-xs light-text opacity-50">Protocols</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-green-500">99.9%</div>
                    <div className="text-xs light-text opacity-50">Uptime</div>
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

// Layer 2 - Network/Scaling Theme
const Layer2Section = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();

  return (
    <section className="mb-20">
      <div className={`relative p-8 rounded-3xl border-2 backdrop-blur-md overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-indigo-50/90 border-purple-300'
          : 'bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 border-purple-700'
      }`}>
        {/* Network nodes pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={i}>
                <circle 
                  cx={`${(i % 5) * 25 + 10}%`} 
                  cy={`${Math.floor(i / 5) * 25 + 10}%`} 
                  r="2" 
                  fill="currentColor" 
                  className="text-purple-500"
                />
                {i % 5 !== 4 && (
                  <line 
                    x1={`${(i % 5) * 25 + 10}%`} 
                    y1={`${Math.floor(i / 5) * 25 + 10}%`}
                    x2={`${((i % 5) + 1) * 25 + 10}%`} 
                    y2={`${Math.floor(i / 5) * 25 + 10}%`}
                    stroke="currentColor" 
                    strokeWidth="1" 
                    className="text-purple-500"
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-3xl font-bold text-purple-600 mb-4">Layer 2 Solutions</h3>
            <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
              Scaling solutions and cross-chain bridges for high-performance blockchain applications
            </p>
          </div>

          <div className="space-y-6">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'theme-light'
                    ? 'bg-white/80 border-purple-200 hover:border-purple-400'
                    : 'bg-slate-800/80 border-purple-700 hover:border-purple-500'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-4xl">{skill.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold light-text mb-1">{skill.name}</h4>
                      <p className="text-sm light-text opacity-70 mb-2">{skill.description}</p>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          theme === 'theme-light' ? 'bg-purple-100 text-purple-800' : 'bg-purple-900/50 text-purple-300'
                        }`}>
                          {skill.level * 1000} TPS
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          theme === 'theme-light' ? 'bg-green-100 text-green-800' : 'bg-green-900/50 text-green-300'
                        }`}>
                          ${(skill.level * 0.001).toFixed(3)} Gas
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Network status indicator */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-green-500">Active</span>
                    </div>
                    <div className="text-xs light-text opacity-50">
                      Latency: {skill.level}ms
                    </div>
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

// Security - Shield/Protection Theme
const SecuritySection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();

  return (
    <section className="mb-20">
      <div className={`relative p-8 rounded-3xl border-2 backdrop-blur-md overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-red-50/90 via-orange-50/90 to-yellow-50/90 border-red-300'
          : 'bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 border-red-700'
      }`}>
        {/* Security pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-2 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={`aspect-square border ${
                Math.random() > 0.7 ? 'bg-red-500' : ''
              } ${theme === 'theme-light' ? 'border-red-300' : 'border-red-700'}`}></div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-3xl font-bold text-red-600 mb-4">Security & Auditing</h3>
            <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
              Advanced security analysis and vulnerability assessment for bulletproof smart contracts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  theme === 'theme-light'
                    ? 'bg-white/90 border-red-200 hover:border-red-400 hover:shadow-red-200/50 shadow-lg'
                    : 'bg-slate-800/90 border-red-700 hover:border-red-500 hover:shadow-red-900/50 shadow-lg'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl mr-4 ${
                      theme === 'theme-light' ? 'bg-red-100' : 'bg-red-900/30'
                    }`}>
                      <span className="text-2xl">{skill.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold light-text mb-1">{skill.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          skill.level >= 4 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                          SECURE
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          theme === 'theme-light' ? 'bg-red-100 text-red-800' : 'bg-red-900/50 text-red-300'
                        }`}>
                          Level {skill.level}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Threat level indicator */}
                  <div className="text-right">
                    <div className="text-xs font-bold text-green-500 mb-1">LOW RISK</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm light-text opacity-70 mb-4">{skill.description}</p>

                {/* Security metrics */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-500">{skill.level * 20}+</div>
                    <div className="text-xs light-text opacity-50">Audits</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-500">{(5 - skill.level) * 2}</div>
                    <div className="text-xs light-text opacity-50">Vulnerabilities</div>
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

// Development Tools - Code/Tools Theme
const DevelopmentSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  const toolCategories = {
    all: category.skills,
    testing: category.skills.filter(s => s.subcategory === 'Testing'),
    deployment: category.skills.filter(s => s.subcategory === 'Deployment'),
    integration: category.skills.filter(s => s.subcategory === 'Frontend Integration'),
  };

  return (
    <section className="mb-20">
      <div className={`relative p-8 rounded-3xl border-2 backdrop-blur-md overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-cyan-50/90 via-blue-50/90 to-indigo-50/90 border-cyan-300'
          : 'bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-indigo-900/20 border-cyan-700'
      }`}>
        {/* Code pattern background */}
        <div className="absolute inset-0 opacity-5 font-mono text-xs overflow-hidden">
          <div className="whitespace-pre-wrap leading-4">
            {`function deployContract() {\n  const contract = new Contract();\n  return contract.deploy();\n}\n\ninterface IERC20 {\n  function transfer() external;\n}\n\npragma solidity ^0.8.0;\n\ncontract Token {\n  mapping(address => uint256) balances;\n}`}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-3xl font-bold text-cyan-600 mb-4">Development Tools</h3>
            <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
              Advanced development frameworks and tools for building production-ready blockchain applications
            </p>
          </div>

          {/* Tool categories tabs */}
          <div className="flex justify-center mb-8">
            <div className={`flex rounded-xl p-1 ${
              theme === 'theme-light' ? 'bg-gray-100' : 'bg-slate-800'
            }`}>
              {Object.keys(toolCategories).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? theme === 'theme-light'
                        ? 'bg-white text-cyan-600 shadow-sm'
                        : 'bg-slate-700 text-cyan-400 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {toolCategories[activeTab as keyof typeof toolCategories].map((skill, index) => (
                <motion.div
                  key={`${activeTab}-${skill.id}`}
                  className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    theme === 'theme-light'
                      ? 'bg-white/80 border-cyan-200 hover:border-cyan-400'
                      : 'bg-slate-800/80 border-cyan-700 hover:border-cyan-500'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">{skill.icon}</div>
                      <div>
                        <h4 className="font-bold light-text text-sm mb-1">{skill.name}</h4>
                        <div className={`px-2 py-1 rounded text-xs ${
                          theme === 'theme-light' ? 'bg-cyan-100 text-cyan-800' : 'bg-cyan-900/50 text-cyan-300'
                        }`}>
                          v{skill.level}.{Math.floor(Math.random() * 10)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Package status */}
                    <div className="text-right">
                      <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                      <div className="text-xs light-text opacity-50">Stable</div>
                    </div>
                  </div>

                  <p className="text-xs light-text opacity-70 mb-3 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Download/usage stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="light-text opacity-50">
                      {skill.level * 1000}k+ downloads
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(skill.level)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-cyan-500"></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ThemedSkillSections({ categories }: ThemedSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
    'security': SecuritySection,
    'development': DevelopmentSection,
  };

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const Component = categoryComponents[category.id as keyof typeof categoryComponents];
        return Component ? (
          <Component key={category.id} category={category} />
        ) : null;
      })}
    </div>
  );
}