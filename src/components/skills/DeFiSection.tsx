"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SkillCategory, AdvancedSkill } from '@/lib/types';

interface DeFiSectionProps {
  category: SkillCategory;
}

// DeFi Trading Terminal Component
const DeFiTradingTerminal = ({ category }: DeFiSectionProps) => {
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


  // Get detailed protocol information
  const getProtocolDetails = (skill: AdvancedSkill) => {
    const usageDescriptions: { [key: string]: string } = {
      'Trading': t('defi.usage.dex'),
      'Credit': t('defi.usage.lending'),
      'Incentives': t('defi.usage.yieldFarming'),
      'Yield Generation': t('defi.usage.yieldFarming'),
      'Advanced DeFi': t('defi.usage.derivatives'),
      'Risk Management': t('defi.usage.lending'),
      'Protocol Design': t('defi.usage.default'),
      'Infrastructure': t('defi.usage.default'),
      'default': t('defi.usage.default')
    };

    // Get translated skill description
    const getTranslatedDescription = (skillId: string): string => {
      const key = `defi.${skillId}.description`;
      const translated = t(key);
      return translated !== key ? translated : skill.description;
    };

    return {
      description: getTranslatedDescription(skill.id),
      usage: usageDescriptions[skill.subcategory || 'default'] || usageDescriptions['default'],
      features: skill.examples || []
    };
  };

  return (
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
                <div className="col-span-4">{t('defi.dropdown.protocols')}</div>
                <div className="col-span-3">{t('defi.dropdown.type')}</div>
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
                      <div className={`col-span-4 font-bold flex items-center ${
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
                      <div className={`col-span-3 text-xs ${
                        theme === 'theme-light' ? 'text-amber-700' : 'text-green-500'
                      }`}>
                        {skill.subcategory}
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
                          theme === 'theme-light' ? 'text-amber-600' : 'text-green-500'
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                          <span className="text-xs">Active</span>
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
                                {'>>>'} {t('defi.section.protocolOverview')}:
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
                                {'>>>'} {t('defi.section.howIUseIt')}:
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
                                  {'>>>'} {t('defi.section.keyFeatures')}:
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
  );
};

// Main DeFi Section Wrapper
const DeFiSection = ({ category }: DeFiSectionProps) => {
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
                  ? 'bg-green-100 text-green-600'
                  : 'bg-green-900/30 text-green-400'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                DeFi Protocol Expertise
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
            Deep expertise in decentralized finance protocols and mechanisms. I have hands-on experience
            building and integrating with <strong>AMMs (Automated Market Makers)</strong>, <strong>lending protocols</strong>,
            <strong>yield farming systems</strong>, and <strong>tokenomics designs</strong>. My work spans across
            <strong>liquidity pool mechanics</strong>, <strong>flash loan implementations</strong>, <strong>oracle
            integrations</strong>, and <strong>vault strategies</strong>. I understand the intricate details of
            DeFi primitives, from <strong>Uniswap V2/V3</strong> mathematics to <strong>Compound-style interest
            rate models</strong>, and have built protocols handling significant TVL with robust security measures
            and gas-optimized implementations.
          </p>
        </div>

        {/* Expandable Content - DeFi Trading Terminal */}
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
                <DeFiTradingTerminal category={category} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DeFiSection;