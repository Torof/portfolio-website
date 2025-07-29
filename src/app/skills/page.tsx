'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation, getAnimationClass } from '@/lib/hooks/useScrollAnimation';
import { useTheme } from '@/lib/context/ThemeContext';
import { skillCategories, stackOverflowProfile, featuredAnswers } from '@/lib/data/advancedSkills';
import { AdvancedSkill } from '@/lib/types';
import AnimatedTitle from '@/components/AnimatedTitle';
import BlockchainNetwork from '@/components/BlockchainNetwork';
import PremiumSkillSections from '@/components/PremiumSkillSections';
import Link from 'next/link';
import Image from 'next/image';


const StackOverflowCard = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
          Community Contributions
        </h2>
        <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
          Sharing knowledge and helping developers solve complex blockchain challenges on Stack Exchange
        </p>
      </div>

      <motion.div
        className={`relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 group overflow-hidden ${
          theme === 'theme-light'
            ? 'bg-gradient-to-br from-white/95 via-orange-50/95 to-amber-50/95 border-orange-200 hover:border-orange-300 hover:shadow-2xl'
            : 'bg-gradient-to-br from-slate-800/90 via-orange-900/20 to-amber-900/20 border-orange-700/50 hover:border-orange-600/50'
        }`}
        whileHover={{ scale: 1.01 }}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
            theme === 'theme-light' 
              ? 'bg-gradient-to-br from-orange-200 to-amber-200' 
              : 'bg-gradient-to-br from-orange-600/20 to-amber-600/20'
          }`}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Profile */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="relative mb-4 md:mb-0">
              <div className="relative group/avatar">
                <Image
                  src={stackOverflowProfile.profileImage}
                  alt={stackOverflowProfile.displayName}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-orange-400 shadow-xl group-hover/avatar:scale-105 transition-transform"
                />
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-full shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 120 120" fill="currentColor">
                    <polygon points="84,93 84,70 92,70 92,101 22,101 22,70 30,70 30,93"/>
                    <path d="m38,68.4l36.9,7.9 1.6,-7.6l-36.9,-7.9l-1.6,7.6zm4.9,-18.2l34.2,16.2 3.3,-7l-34.2,-16.2l-3.3,7zm9.5,-17.3l29.1,24.7 5,-5.9l-29.1,-24.7l-5,5.9zm18.7,-16.8l-6.1,4.6 22.6,30.2 6.1,-4.6l-22.6,-30.2zm-5.3,-19.3l-6.9,3.2 15.9,34.2 6.9,-3.2l-15.9,-34.2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:ml-8 flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold light-text mb-2">
                {stackOverflowProfile.displayName}
              </h3>
              <p className="text-lg light-text opacity-70 mb-4">
                Ethereum Stack Exchange Contributor
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-orange-100 to-amber-100' 
                    : 'bg-gradient-to-br from-orange-900/30 to-amber-900/30'
                }`}>
                  <div className="text-2xl font-bold text-orange-600">
                    {stackOverflowProfile.reputation.toLocaleString()}
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">Reputation</div>
                </div>
                
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-yellow-100 to-amber-100' 
                    : 'bg-gradient-to-br from-yellow-900/30 to-amber-900/30'
                }`}>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-2xl font-bold light-text">{stackOverflowProfile.badges.gold}</span>
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">Gold</div>
                </div>
                
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-gray-100 to-slate-100' 
                    : 'bg-gradient-to-br from-gray-900/30 to-slate-900/30'
                }`}>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-2xl font-bold light-text">{stackOverflowProfile.badges.silver}</span>
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">Silver</div>
                </div>
                
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-amber-100 to-orange-100' 
                    : 'bg-gradient-to-br from-amber-900/30 to-orange-900/30'
                }`}>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                    <span className="text-2xl font-bold light-text">{stackOverflowProfile.badges.bronze}</span>
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">Bronze</div>
                </div>
              </div>

              {/* Top Tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {stackOverflowProfile.topTags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-4 py-2 text-sm rounded-full font-bold transition-all duration-300 ${
                      theme === 'theme-light'
                        ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 hover:from-orange-200 hover:to-amber-200'
                        : 'bg-gradient-to-r from-orange-900/50 to-amber-900/50 text-orange-300 hover:from-orange-800/50 hover:to-amber-800/50'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Answers */}
          <div className="mt-8">
            <h4 className="text-2xl font-bold light-text mb-6 text-center">Featured Contributions</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredAnswers.map((answer) => (
                <motion.div 
                  key={answer.id}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 group/answer overflow-hidden ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200 hover:border-orange-300'
                      : 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 hover:border-orange-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Score badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <div className={`flex items-center px-3 py-1 rounded-full ${
                      theme === 'theme-light' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-green-900/50 text-green-300'
                    }`}>
                      <span className="text-lg mr-1">↑</span>
                      <span className="font-bold">{answer.score}</span>
                    </div>
                    {answer.isAccepted && (
                      <div className={`p-1 rounded-full ${
                        theme === 'theme-light' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-green-900/50 text-green-400'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <h5 className="font-bold light-text text-lg mb-3 pr-24 leading-tight">
                    {answer.questionTitle}
                  </h5>
                  
                  <p className="text-sm light-text opacity-80 mb-4 leading-relaxed">
                    {answer.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {answer.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
                          theme === 'theme-light'
                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200'
                            : 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 hover:from-blue-800/50 hover:to-indigo-800/50'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <Link
              href={stackOverflowProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                  : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white'
              }`}
            >
              View My Full Stack Exchange Profile
              <svg 
                className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className={`min-h-screen relative ${
      theme === 'theme-light' 
        ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
        : 'bg-gradient-to-br from-slate-900 to-slate-800'
    }`}>
      {/* Blockchain Network Background - Fixed positioning to cover full page */}
      <div className="fixed inset-0 z-0">
        <BlockchainNetwork />
      </div>
      
      <div className="container-custom relative z-10 py-24">
        {/* Title */}
        <div 
          ref={titleAnimation.ref}
          className={`text-center mb-16 ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
        >
          <AnimatedTitle variant="glitch" className="text-5xl md:text-6xl mb-6">
            Advanced Skills
          </AnimatedTitle>
          <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
            Deep technical expertise in blockchain development, smart contracts, and decentralized finance
          </p>
        </div>

        {/* What I Can Do For You Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
              What I Can Do For You
            </h2>
            <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
              From concept to production, I deliver complete blockchain solutions that drive real business value
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Full System Architecture */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-blue-50/90 to-purple-50/90 border-blue-200 hover:border-purple-300'
                  : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700/50 hover:border-purple-600/50'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">🏗️</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  Complete Smart Contract Systems
                </h3>
                <p className="light-text opacity-80 mb-6">
                  I architect and build entire smart contract ecosystems from scratch, handling everything from tokenomics design to complex DeFi mechanics.
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Custom token standards (ERC-20, ERC-721, ERC-1155)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>DeFi protocols (AMMs, lending, staking, yield farming)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Governance systems and DAOs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Multi-chain deployment strategies</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Optimization & Security */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-green-50/90 to-emerald-50/90 border-green-200 hover:border-emerald-300'
                  : 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50 hover:border-emerald-600/50'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  Optimization & Security Auditing
                </h3>
                <p className="light-text opacity-80 mb-6">
                  I optimize existing contracts for gas efficiency and conduct thorough security reviews to ensure your protocols are bulletproof.
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Gas optimization using Yul and assembly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Security vulnerability assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Code refactoring for efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Best practices implementation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Full DApp Development */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-orange-50/90 to-red-50/90 border-orange-200 hover:border-red-300'
                  : 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700/50 hover:border-red-600/50'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  End-to-End DApp Development
                </h3>
                <p className="light-text opacity-80 mb-6">
                  I build complete decentralized applications with modern frontends, robust backends, and seamless blockchain integration.
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>React/Next.js frontend development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Web3 integration (ethers.js, wagmi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>Backend APIs and indexing services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>IPFS integration and decentralized storage</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Me */}
          <motion.div
            className={`relative p-10 rounded-2xl border backdrop-blur-md text-center ${
              theme === 'theme-light'
                ? 'bg-gradient-to-r from-purple-50/90 via-pink-50/90 to-blue-50/90 border-purple-200'
                : 'bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border-purple-700/50'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold light-text mb-6">
              Why I'm the Right Choice
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="text-lg font-semibold light-text mb-2">6+ Years Experience</h4>
                <p className="text-sm light-text opacity-80">Battle-tested in production environments</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="text-lg font-semibold light-text mb-2">Security First</h4>
                <p className="text-sm light-text opacity-80">Auditing mindset in every line of code</p>
              </div>
              <div>
                <div className="text-4xl mb-3">💡</div>
                <h4 className="text-lg font-semibold light-text mb-2">Innovation Driven</h4>
                <p className="text-sm light-text opacity-80">Always exploring cutting-edge solutions</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-lg font-semibold light-text mb-2">Client Focused</h4>
                <p className="text-sm light-text opacity-80">Your success is my priority</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stack Overflow Integration */}
        <div className="mb-20">
          <StackOverflowCard />
        </div>

        {/* Themed Skills Sections */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
              Technical Expertise
            </h2>
            <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
              Explore my specialized blockchain development skills through uniquely themed sections, each showcasing different aspects of my expertise.
            </p>
          </div>

          <PremiumSkillSections categories={skillCategories} />
        </div>
      </div>
    </div>
  );
}