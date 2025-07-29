"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface PremiumSkillSectionsProps {
  categories: SkillCategory[];
}

// Smart Contracts - Clean, Readable List Design
const SmartContractsSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-2xl border backdrop-blur-xl ${
        theme === 'theme-light'
          ? 'bg-white/80 border-blue-200/50 shadow-lg'
          : 'bg-slate-900/80 border-blue-500/30 shadow-lg shadow-blue-500/10'
      }`}>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-xl mr-4 ${
              theme === 'theme-light' 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-600 to-purple-700'
            }`}>
              <span className="text-2xl text-white">📋</span>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Smart Contract Standards
              </h3>
              <p className={`text-sm ${
                theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {category.skills.length} standards • Production-ready implementations
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className={`group p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-white to-blue-50/50 border-blue-100 hover:border-blue-200 hover:shadow-md'
                  : 'bg-gradient-to-r from-slate-800 to-blue-950/30 border-slate-700 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Standard Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline">
                    <div className={`text-sm font-bold mr-3 ${
                      theme === 'theme-light' 
                        ? 'text-blue-600' 
                        : 'text-blue-400'
                    }`}>
                      ERC-{skill.id.includes('erc') ? skill.id.replace('erc', '').replace('-', '') : 'STD'}
                    </div>
                    <h4 className={`text-lg font-semibold ${
                      theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                    } group-hover:text-blue-600 transition-colors`}>
                      {skill.name.replace(/^ERC-\d+\s*\(?\s*/, '').replace(/\)?$/, '')}
                    </h4>
                  </div>
                  
                  {/* EIP Link */}
                  {skill.id.includes('erc') && (
                    <a
                      href={`https://eips.ethereum.org/EIPS/eip-${skill.id.replace('erc', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                        theme === 'theme-light'
                          ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                          : 'text-blue-400 hover:bg-blue-900/30 hover:text-blue-300'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="mr-1">View EIP</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
                
                <p className={`text-sm leading-relaxed ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// DeFi - Trading Interface Style
const DeFiSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [selectedPair, setSelectedPair] = useState('TOROF/DEFI');
  const [activeView, setActiveView] = useState('orderbook');

  const tradingPairs = ['TOROF/DEFI', 'SKILL/USD', 'YIELD/ETH', 'SMART/BTC'];

  return (
    <section className="mb-24">
      <div className={`relative p-8 rounded-2xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/90 to-green-50/50 border-slate-200/50 shadow-xl'
          : 'bg-gradient-to-br from-slate-900/90 to-green-950/30 border-slate-700/50 shadow-xl shadow-green-500/10'
      }`}>
        
        {/* Trading Terminal Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-xl mr-4 ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-green-600 to-blue-600' 
                  : 'bg-gradient-to-br from-green-700 to-blue-700'
              }`}>
                <span className="text-2xl text-white">📈</span>
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  DeFi Trading Terminal
                </h3>
                <p className={`text-sm ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Advanced DeFi protocols and yield strategies
                </p>
              </div>
            </div>
            
            {/* Market Status */}
            <div className="flex items-center space-x-4">
              <motion.div 
                className="flex items-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className={`text-sm font-medium ${
                  theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
                }`}>
                  Markets Open
                </span>
              </motion.div>
              <div className={`text-sm ${
                theme === 'theme-light' ? 'text-slate-600' : 'text-slate-300'
              }`}>
                24h Vol: $2.4B
              </div>
            </div>
          </div>

          {/* Trading Pair Selector */}
          <div className="flex space-x-2 mb-6">
            {tradingPairs.map((pair) => (
              <motion.button
                key={pair}
                onClick={() => setSelectedPair(pair)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPair === pair
                    ? theme === 'theme-light'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                    : theme === 'theme-light'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pair}
              </motion.button>
            ))}
          </div>

          {/* Trading View Tabs */}
          <div className="flex space-x-6 mb-8">
            {['orderbook', 'chart', 'positions'].map((view) => (
              <motion.button
                key={view}
                onClick={() => setActiveView(view)}
                className={`pb-2 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeView === view
                    ? theme === 'theme-light'
                      ? 'border-green-500 text-green-600'
                      : 'border-green-400 text-green-400'
                    : 'border-transparent light-text opacity-60 hover:opacity-100'
                }`}
                whileHover={{ y: -2 }}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Order Book */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl border ${
              theme === 'theme-light'
                ? 'bg-white/60 border-gray-200'
                : 'bg-slate-800/60 border-slate-700'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h4 className={`font-semibold ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  Order Book - DeFi Skills
                </h4>
                <div className={`text-xs ${
                  theme === 'theme-light' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Spread: 0.01%
                </div>
              </div>

              {/* Order Book Headers */}
              <div className="grid grid-cols-4 gap-4 mb-4 pb-2 border-b border-gray-200 dark:border-slate-700">
                <div className={`text-xs font-medium ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  PROTOCOL
                </div>
                <div className={`text-xs font-medium text-center ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  PRICE
                </div>
                <div className={`text-xs font-medium text-center ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  SIZE
                </div>
                <div className={`text-xs font-medium text-right ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  TOTAL
                </div>
              </div>

              {/* Sell Orders (Red) */}
              <div className="mb-4">
                {category.skills.slice(0, 4).reverse().map((skill, index) => (
                  <motion.div
                    key={`sell-${skill.id}`}
                    className={`grid grid-cols-4 gap-4 p-2 rounded transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20 ${
                      theme === 'theme-light' ? 'hover:bg-red-50' : 'hover:bg-red-950/20'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{skill.icon}</span>
                      <span className={`text-sm font-medium ${
                        theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                      }`}>
                        {skill.name.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-mono text-red-500">
                        ${(skill.level * 8.5).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className={`text-sm font-mono ${
                        theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {(skill.level * 1.2).toFixed(1)}K
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-mono ${
                        theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        ${(skill.level * 10.2).toFixed(1)}K
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Market Price */}
              <div className={`text-center py-3 mb-4 rounded-lg ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200' 
                  : 'bg-gradient-to-r from-green-950/30 to-blue-950/30 border border-green-700'
              }`}>
                <div className={`text-lg font-bold ${
                  theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
                }`}>
                  $42.75 ↗ +2.4%
                </div>
                <div className={`text-xs ${
                  theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Last Price
                </div>
              </div>

              {/* Buy Orders (Green) */}
              <div>
                {category.skills.slice(4, 8).map((skill, index) => (
                  <motion.div
                    key={`buy-${skill.id}`}
                    className={`grid grid-cols-4 gap-4 p-2 rounded transition-all duration-300 ${
                      theme === 'theme-light' ? 'hover:bg-green-50' : 'hover:bg-green-950/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{skill.icon}</span>
                      <span className={`text-sm font-medium ${
                        theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                      }`}>
                        {skill.name.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-mono text-green-500">
                        ${(skill.level * 7.8).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className={`text-sm font-mono ${
                        theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {(skill.level * 0.9).toFixed(1)}K
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-mono ${
                        theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        ${(skill.level * 7.0).toFixed(1)}K
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Portfolio */}
            <div className={`p-6 rounded-xl border ${
              theme === 'theme-light'
                ? 'bg-white/60 border-gray-200'
                : 'bg-slate-800/60 border-slate-700'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Portfolio
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Total Balance
                  </span>
                  <span className={`font-bold ${
                    theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
                  }`}>
                    $125,450
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    24h PnL
                  </span>
                  <span className="font-bold text-green-500">+$2,340 (+1.9%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Available
                  </span>
                  <span className={`font-bold ${
                    theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    $12,450
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Trade */}
            <div className={`p-6 rounded-xl border ${
              theme === 'theme-light'
                ? 'bg-white/60 border-gray-200'
                : 'bg-slate-800/60 border-slate-700'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Quick Trade
              </h4>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <button className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    theme === 'theme-light'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    BUY
                  </button>
                  <button className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    theme === 'theme-light'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}>
                    SELL
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Amount"
                    className={`w-full p-2 rounded text-sm border ${
                      theme === 'theme-light'
                        ? 'bg-gray-50 border-gray-200 text-gray-900'
                        : 'bg-slate-700 border-slate-600 text-white'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    className={`w-full p-2 rounded text-sm border ${
                      theme === 'theme-light'
                        ? 'bg-gray-50 border-gray-200 text-gray-900'
                        : 'bg-slate-700 border-slate-600 text-white'
                    }`}
                  />
                </div>
                <button className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
                  theme === 'theme-light'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Layer 2 - Sci-Fi Tech Theme  
const Layer2Section = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/40 border-indigo-200/30 shadow-2xl shadow-indigo-500/10'
          : 'bg-gradient-to-br from-indigo-900/20 via-purple-900/15 to-pink-900/10 border-indigo-500/30 shadow-2xl shadow-indigo-500/10'
      }`}>
        
        {/* Sci-fi grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 gap-px h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                className={`border ${
                  theme === 'theme-light' ? 'border-indigo-300' : 'border-indigo-600'
                } ${
                  Math.random() > 0.8 ? (theme === 'theme-light' ? 'bg-indigo-200' : 'bg-indigo-800') : ''
                }`}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.4)",
                  "0 0 20px rgba(99, 102, 241, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl">
                <span className="text-6xl text-white">⚡</span>
              </div>
            </motion.div>
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Layer <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">2 Solutions</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Next-generation scaling infrastructure for the decentralized web
            </p>
          </div>

          <div className="space-y-6">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`group relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                  theme === 'theme-light'
                    ? 'bg-gradient-to-r from-white/80 via-indigo-50/30 to-purple-50/30 border-indigo-200/30 hover:shadow-2xl hover:shadow-indigo-500/20'
                    : 'bg-gradient-to-r from-slate-800/80 via-indigo-900/20 to-purple-900/20 border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/20'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                {/* Animated scan line */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.div 
                      className={`p-4 rounded-xl ${
                        theme === 'theme-light' 
                          ? 'bg-gradient-to-br from-indigo-100 to-purple-100' 
                          : 'bg-gradient-to-br from-indigo-900/50 to-purple-900/50'
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="text-4xl">{skill.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="text-2xl font-semibold light-text mb-2 group-hover:text-indigo-600 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-sm light-text opacity-70 mb-3 max-w-2xl leading-relaxed">
                        {skill.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                          theme === 'theme-light' 
                            ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800' 
                            : 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-indigo-300'
                        } shadow-sm`}>
                          {skill.level * 2000} TPS
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                          theme === 'theme-light' 
                            ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800' 
                            : 'bg-gradient-to-r from-emerald-900/50 to-green-900/50 text-emerald-300'
                        } shadow-sm`}>
                          ${(skill.level * 0.001).toFixed(3)} Gas
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Futuristic status panel */}
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Online</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs light-text opacity-50">Latency:</span>
                        <span className="text-sm font-bold text-indigo-500">{skill.level}ms</span>
                      </div>
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs light-text opacity-50">Nodes:</span>
                        <span className="text-sm font-bold text-purple-500">{skill.level * 100}+</span>
                      </div>
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

// Security - High-End Surveillance Theme
const SecuritySection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();

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
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className={`border ${
                  theme === 'theme-light' ? 'border-slate-300' : 'border-slate-700'
                } ${
                  Math.random() > 0.9 ? 'bg-red-500/20' : ''
                }`}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: Math.random() > 0.95 ? [
                    "rgba(239, 68, 68, 0.1)",
                    "rgba(239, 68, 68, 0.3)",
                    "rgba(239, 68, 68, 0.1)"
                  ] : undefined
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
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
                      <h4 className="text-xl font-semibold light-text mb-2 group-hover:text-red-600 transition-colors">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
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
                      className="text-xs font-bold text-emerald-500 mb-2"
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

// Development Tools - Modern IDE Theme
const DevelopmentSection = ({ category }: { category: SkillCategory }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  const toolCategories = {
    all: category.skills,
    testing: category.skills.filter(s => s.subcategory === 'Testing'),
    deployment: category.skills.filter(s => s.subcategory === 'Deployment'),
    integration: category.skills.filter(s => s.subcategory === 'Frontend Integration'),
    storage: category.skills.filter(s => s.subcategory === 'Storage' || s.subcategory === 'Storage Services'),
  };

  return (
    <section className="mb-32">
      <div className={`relative p-12 rounded-3xl border backdrop-blur-xl overflow-hidden ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-indigo-50/30 border-slate-200/30 shadow-2xl shadow-blue-500/5'
          : 'bg-gradient-to-br from-slate-900/90 via-blue-900/10 to-indigo-900/10 border-slate-700/50 shadow-2xl shadow-blue-500/5'
      }`}>
        
        {/* Code editor background */}
        <div className="absolute inset-0 opacity-5 font-mono text-xs overflow-hidden p-4">
          <div className="whitespace-pre-wrap leading-6">
            <span className="text-purple-500">import</span> <span className="text-blue-500">{'{ useState, useEffect }'}</span> <span className="text-purple-500">from</span> <span className="text-green-500">'react'</span><br/>
            <span className="text-purple-500">import</span> <span className="text-blue-500">ethers</span> <span className="text-purple-500">from</span> <span className="text-green-500">'ethers'</span><br/><br/>
            <span className="text-blue-500">function</span> <span className="text-yellow-500">useContract</span>() {'{'}<br/>
            &nbsp;&nbsp;<span className="text-purple-500">const</span> [<span className="text-blue-500">contract</span>, <span className="text-blue-500">setContract</span>] = <span className="text-yellow-500">useState</span>(<span className="text-orange-500">null</span>)<br/>
            &nbsp;&nbsp;<span className="text-purple-500">return</span> <span className="text-blue-500">contract</span><br/>
            {'}'}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              animate={{
                rotateZ: [0, 1, 0, -1, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className={`p-6 rounded-2xl ${
                theme === 'theme-light' 
                  ? 'bg-gradient-to-br from-slate-700 to-blue-600 shadow-xl shadow-blue-500/25' 
                  : 'bg-gradient-to-br from-slate-800 to-blue-700 shadow-xl shadow-blue-500/25'
              }`}>
                <span className="text-6xl text-white">⚙️</span>
              </div>
            </motion.div>
            <h3 className={`text-4xl font-light mb-4 ${
              theme === 'theme-light' ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Development <span className="font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">Tools</span>
            </h3>
            <p className="text-xl light-text opacity-70 max-w-3xl mx-auto font-light leading-relaxed">
              Professional-grade development environment and cutting-edge toolchain
            </p>
          </div>

          {/* Elegant tab navigation */}
          <div className="flex justify-center mb-12">
            <div className={`inline-flex rounded-2xl p-2 backdrop-blur-xl ${
              theme === 'theme-light' 
                ? 'bg-white/60 border border-white/30' 
                : 'bg-slate-800/60 border border-slate-700/30'
            }`}>
              {Object.keys(toolCategories).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? theme === 'theme-light'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/25'
                      : 'light-text opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {toolCategories[activeTab as keyof typeof toolCategories].map((skill, index) => (
                <motion.div
                  key={`${activeTab}-${skill.id}`}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-br from-white/80 to-slate-50/50 border-slate-200/30 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/10'
                      : 'bg-gradient-to-br from-slate-800/80 to-slate-900/50 border-slate-700/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-emerald-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <motion.div 
                        className={`p-3 rounded-xl mr-4 ${
                          theme === 'theme-light' 
                            ? 'bg-gradient-to-br from-blue-100 to-indigo-100' 
                            : 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50'
                        }`}
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-xl">{skill.icon}</span>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold light-text mb-1 group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === 'theme-light' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-blue-900/50 text-blue-300'
                        }`}>
                          v{skill.level}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm light-text opacity-70 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Package stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="light-text opacity-50">
                      {(skill.level * 250).toLocaleString()}k+ downloads
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(skill.level)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                        />
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

export default function PremiumSkillSections({ categories }: PremiumSkillSectionsProps) {
  const categoryComponents = {
    'smart-contracts': SmartContractsSection,
    'defi': DeFiSection,
    'layer2': Layer2Section,
    'security': SecuritySection,
    'development': DevelopmentSection,
  };

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const Component = categoryComponents[category.id as keyof typeof categoryComponents];
        return Component ? (
          <Component key={category.id} category={category} />
        ) : null;
      })}
    </div>
  );
}