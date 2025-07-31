'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation, getAnimationClass } from '@/lib/hooks/useScrollAnimation';
import { useTheme } from '@/lib/context/ThemeContext';
import { skillCategories } from '@/lib/data/advancedSkills';
import { AdvancedSkill } from '@/lib/types';
import AnimatedTitle from '@/components/AnimatedTitle';
import BlockchainNetwork from '@/components/BlockchainNetwork';
import PremiumSkillSections from '@/components/PremiumSkillSections';
import TechRiver from '@/components/TechRiver';
import LiveStackExchangeCard from '@/components/LiveStackExchangeCard';



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
              Why I&apos;m the Right Choice
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

      </div>
      
      {/* My Tech Stack Section - Full Width */}
      <div className="mb-20">
        <TechRiver />
      </div>
      
      <div className="container-custom relative z-10">

        {/* Stack Exchange Integration */}
        <div className="mb-20">
          <LiveStackExchangeCard />
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