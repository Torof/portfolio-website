"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface DeFiSectionProps {
  category: SkillCategory;
}

// DeFi - Retro Trading Terminal Theme
const DeFiSection = ({ category }: DeFiSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Update time every second for retro terminal feel
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock price data for retro feel
  const getPriceChange = (index: number) => {
    const changes = ['+2.34%', '-0.89%', '+5.12%', '-1.23%', '+0.45%', '+3.67%', '-2.11%', '+1.89%'];
    return changes[index % changes.length];
  };

  const getTVL = (level: number) => {
    const base = level * 250;
    return `$${base}M`;
  };

  // Get detailed protocol information
  const getProtocolDetails = (skill: AdvancedSkill) => {
    const usageDescriptions: { [key: string]: string } = {
      'DEX': `I architect and optimize automated market maker (AMM) systems, implementing custom trading strategies and liquidity pool integrations. My expertise includes MEV protection, arbitrage mechanisms, and cross-chain bridge development for seamless asset transfers.`,
      'Lending': `I design sophisticated lending and borrowing protocols with dynamic interest rate models and advanced collateral management systems. My work focuses on risk assessment algorithms, liquidation mechanisms, and yield optimization strategies.`,
      'Yield Farming': `I create auto-compounding yield farming strategies and implement complex reward distribution mechanisms. My expertise covers liquidity mining protocols, governance token economics, and sustainable yield generation models.`,
      'Derivatives': `I build advanced derivatives platforms with options, futures, and perpetual contracts. My implementations include synthetic asset protocols, prediction markets, and automated settlement systems.`,
      'default': `I integrate this protocol into comprehensive DeFi ecosystems, focusing on interoperability, gas optimization, and security best practices. My implementations emphasize user experience and robust smart contract architecture.`
    };

    return {
      description: skill.description,
      usage: usageDescriptions[skill.subcategory] || usageDescriptions['default'],
      features: skill.examples || []
    };
  };

  return (
    <section className="mb-24">
      <div className={`relative overflow-hidden rounded-lg border-2 ${
        theme === 'theme-light'
          ? 'bg-amber-50 border-amber-900 shadow-xl'
          : 'bg-black border-green-500 shadow-2xl shadow-green-500/20'
      }`}>
        
        {/* CRT Screen Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 ${
            theme === 'theme-light' 
              ? 'bg-gradient-to-b from-transparent via-amber-900/5 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-green-500/10 to-transparent'
          } animate-pulse`} style={{ animationDuration: '4s' }} />
          
          {/* Scanlines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${theme === 'theme-light' ? 'rgba(139, 69, 19, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 2px,
              ${theme === 'theme-light' ? 'rgba(139, 69, 19, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 4px
            )`
          }} />
        </div>

        <div className="relative z-10">
          {/* Terminal Header */}
          <div className={`px-6 py-3 border-b-2 ${
            theme === 'theme-light' 
              ? 'bg-amber-100 border-amber-900' 
              : 'bg-green-950/50 border-green-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`font-mono text-xs ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  DEFI_TERMINAL_v2.0
                </div>
                <div className={`font-mono text-xs ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
                }`}>
                  [CONNECTED]
                </div>
              </div>
              <div className={`font-mono text-xs ${
                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
              }`}>
                {mounted && currentTime ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--'}
              </div>
            </div>
          </div>

          {/* Main Terminal Content */}
          <div className="p-6">
            {/* Title Section */}
            <div className="mb-6 text-center">
              <motion.h3 
                className={`font-mono text-3xl font-bold mb-2 ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ═══ DEFI PROTOCOL EXPERTISE ═══
              </motion.h3>
              <div className={`font-mono text-sm ${
                theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
              }`}>
                SYSTEM: {category.skills.length} PROTOCOLS LOADED | STATUS: OPERATIONAL
              </div>
            </div>

            {/* Market Stats Bar */}
            <div className={`grid grid-cols-3 gap-4 mb-6 p-3 border ${
              theme === 'theme-light' 
                ? 'bg-amber-100/50 border-amber-800' 
                : 'bg-green-950/30 border-green-600'
            }`}>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  TOTAL TVL
                </div>
                <motion.div 
                  className={`font-mono font-bold ${
                    theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                  }`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  $2.5B
                </motion.div>
              </div>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  AVG APY
                </div>
                <div className={`font-mono font-bold ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  12.8%
                </div>
              </div>
              <div className="text-center">
                <div className={`font-mono text-xs mb-1 ${
                  theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                }`}>
                  GAS SAVED
                </div>
                <div className={`font-mono font-bold ${
                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                }`}>
                  $124K
                </div>
              </div>
            </div>

            {/* Protocol List - Trading Style */}
            <div className={`border-2 ${
              theme === 'theme-light' 
                ? 'border-amber-800 bg-amber-50/50' 
                : 'border-green-600 bg-black/50'
            }`}>
              {/* Table Header */}
              <div className={`grid grid-cols-12 gap-2 px-4 py-2 border-b-2 font-mono text-xs ${
                theme === 'theme-light' 
                  ? 'bg-amber-100 border-amber-800 text-amber-900' 
                  : 'bg-green-950/50 border-green-600 text-green-500'
              }`}>
                <div className="col-span-1">ID</div>
                <div className="col-span-3">{t('defi.dropdown.protocols')}</div>
                <div className="col-span-2">{t('defi.dropdown.type')}</div>
                <div className="col-span-2">{t('defi.dropdown.tvl')}</div>
                <div className="col-span-2">{t('defi.dropdown.24h')}</div>
                <div className="col-span-2">{t('defi.dropdown.status')}</div>
              </div>

              {/* Protocol Rows */}
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  isExpanded 
                    ? 'max-h-none' 
                    : 'max-h-[320px] overflow-y-auto'
                } ${
                  theme === 'theme-light'
                    ? 'scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-100'
                    : 'scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-950'
                }`}
              >
                {category.skills.map((skill, index) => (
                  <div key={skill.id}>
                    <motion.div
                      className={`grid grid-cols-12 gap-2 px-4 py-3 border-b font-mono text-sm transition-all cursor-pointer ${
                        expandedProtocol === skill.id
                          ? theme === 'theme-light'
                            ? 'bg-amber-200 border-amber-300'
                            : 'bg-green-900/50 border-green-400'
                          : theme === 'theme-light'
                            ? 'border-amber-200 hover:bg-amber-100'
                            : 'border-green-900 hover:bg-green-950/30'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setExpandedProtocol(expandedProtocol === skill.id ? null : skill.id)}
                    >
                      <div className={`col-span-1 ${
                        theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={`col-span-3 font-bold flex items-center ${
                        theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                      }`}>
                        <span>{skill.name}</span>
                        <motion.div
                          className="ml-2"
                          animate={{ rotate: expandedProtocol === skill.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-xs">▶</span>
                        </motion.div>
                      </div>
                      <div className={`col-span-2 text-xs ${
                        theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
                      }`}>
                        {skill.subcategory}
                      </div>
                      <div className={`col-span-2 ${
                        theme === 'theme-light' ? 'text-amber-800' : 'text-green-400'
                      }`}>
                        {getTVL(skill.level)}
                      </div>
                      <div className={`col-span-2 font-bold ${
                        getPriceChange(index).startsWith('+') 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {getPriceChange(index)}
                      </div>
                      <div className="col-span-2">
                        <div className={`inline-flex items-center space-x-1 ${
                          skill.level >= 4 
                            ? 'text-green-600' 
                            : theme === 'theme-light' ? 'text-amber-600' : 'text-yellow-500'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            skill.level >= 4 ? 'bg-green-600' : 'bg-yellow-500'
                          } animate-pulse`} />
                          <span className="text-xs">
                            {skill.level >= 4 ? t('defi.dropdown.expert') : t('defi.dropdown.active')}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Expanded Protocol Details */}
                    <AnimatePresence>
                      {expandedProtocol === skill.id && (
                        <motion.div
                          className={`px-6 py-4 border-b-2 ${
                            theme === 'theme-light'
                              ? 'bg-amber-100/50 border-amber-300'
                              : 'bg-green-950/20 border-green-700'
                          }`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-4">
                            {/* Protocol Overview */}
                            <div>
                              <div className={`font-mono text-sm font-bold mb-2 ${
                                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                              }`}>
                                {'>>>'} PROTOCOL_OVERVIEW:
                              </div>
                              <div className={`font-mono text-xs leading-relaxed ${
                                theme === 'theme-light' ? 'text-amber-800' : 'text-green-300'
                              }`}>
                                {getProtocolDetails(skill).description}
                              </div>
                            </div>

                            {/* My Usage */}
                            <div>
                              <div className={`font-mono text-sm font-bold mb-2 ${
                                theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                              }`}>
                                {'>>>'} HOW_I_USE_IT:
                              </div>
                              <div className={`font-mono text-xs leading-relaxed ${
                                theme === 'theme-light' ? 'text-amber-800' : 'text-green-300'
                              }`}>
                                {getProtocolDetails(skill).usage}
                              </div>
                            </div>

                            {/* Technical Features */}
                            {getProtocolDetails(skill).features.length > 0 && (
                              <div>
                                <div className={`font-mono text-sm font-bold mb-2 ${
                                  theme === 'theme-light' ? 'text-amber-900' : 'text-green-400'
                                }`}>
                                  {'>>>'} KEY_FEATURES:
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {getProtocolDetails(skill).features.slice(0, 6).map((feature: string, idx: number) => (
                                    <div 
                                      key={idx}
                                      className={`font-mono text-xs px-2 py-1 border ${
                                        theme === 'theme-light'
                                          ? 'bg-amber-50 border-amber-600 text-amber-800'
                                          : 'bg-green-950/30 border-green-600 text-green-400'
                                      }`}
                                    >
                                      • {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Terminal Action */}
                            <div className={`pt-2 border-t font-mono text-xs ${
                              theme === 'theme-light' 
                                ? 'border-amber-300 text-amber-600' 
                                : 'border-green-700 text-green-600'
                            }`}>
                              {'>'} PROTOCOL_STATUS: ANALYZED | CLICK_TO_COLLAPSE
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Commands */}
            <div className="mt-6 flex items-center justify-between">
              <div className={`font-mono text-xs ${
                theme === 'theme-light' ? 'text-amber-700' : 'text-green-600'
              }`}>
                {'>'} EXECUTE: list --protocols --status=active
              </div>
              
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-4 py-2 font-mono text-sm border-2 transition-all ${
                  theme === 'theme-light'
                    ? 'bg-amber-100 border-amber-800 text-amber-900 hover:bg-amber-200'
                    : 'bg-green-950/50 border-green-500 text-green-400 hover:bg-green-900/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                [{isExpanded ? t('defi.dropdown.collapse') : t('defi.dropdown.expand')}]
              </motion.button>
            </div>

            {/* Footer Status */}
            <div className={`mt-4 pt-4 border-t font-mono text-xs ${
              theme === 'theme-light' 
                ? 'border-amber-300 text-amber-700' 
                : 'border-green-800 text-green-600'
            }`}>
              <div className="flex justify-between">
                <div>SESSION: AUTHENTICATED | USER: BLOCKCHAIN_DEV</div>
                <div>NETWORK: ETHEREUM MAINNET</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeFiSection;