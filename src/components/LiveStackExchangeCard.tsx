'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { fetchCompleteStackExchangeData } from '@/lib/services/stackexchange'; // Fallback for static builds
import { stackOverflowProfile, featuredAnswers } from '@/lib/data/advancedSkills';
import { StackOverflowProfile, StackOverflowAnswer } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

const LiveStackExchangeCard = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<StackOverflowProfile>(stackOverflowProfile);
  const [answers, setAnswers] = useState<StackOverflowAnswer[]>(featuredAnswers);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveData, setIsLiveData] = useState(false);


  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  // Helper function to clean markdown formatting from text
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace [text](url) with text
      .replace(/`([^`]*)`/g, '$1') // Replace `code` with code
      .replace(/\*\*([^*]*)\*\*/g, '$1') // Replace **bold** with bold
      .replace(/\*([^*]*)\*/g, '$1') // Replace *italic* with italic
      .trim();
  };

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        // Try API route first (server-side, better rate limiting)
        console.log('🔄 Attempting to fetch live Stack Exchange data via API route...');

        const response = await fetch('/api/stackexchange?userId=52251', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.profile) {
            setProfile(data.profile);
            setIsLiveData(true);
            console.log('✅ Successfully fetched live Stack Exchange profile via API route');
          }

          if (data.answers && data.answers.length > 0) {
            setAnswers(data.answers.slice(0, 4));
            console.log(`✅ Successfully fetched ${data.answers.length} live Stack Exchange answers via API route`);
          }

          console.log(`📊 Data source: ${data.source}, fetched at: ${data.fetchedAt}`);
          return; // Success, exit early
        } else {
          throw new Error(`API route returned ${response.status}`);
        }

      } catch (apiError) {
        console.log('⚠️ API route failed, trying direct Stack Exchange API...', apiError);

        try {
          // Fallback: Direct Stack Exchange API call (may be rate limited)
          const { profile: liveProfile, answers: liveAnswers } = await fetchCompleteStackExchangeData('52251');

          if (liveProfile) {
            setProfile(liveProfile);
            setIsLiveData(true);
            console.log('✅ Successfully fetched live Stack Exchange profile via direct API');
          }

          if (liveAnswers && liveAnswers.length > 0) {
            setAnswers(liveAnswers.slice(0, 4));
            console.log(`✅ Successfully fetched ${liveAnswers.length} live Stack Exchange answers via direct API`);
          }

        } catch {
          console.log('⚠️ Both API route and direct Stack Exchange API failed, using static data');
          console.log('📋 Displaying static Stack Exchange data');
          // Keep using fallback data - component will show static data
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
  }, []);

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
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-orange-900/30 text-orange-400'
              }`}>
                <svg className="w-6 h-6" viewBox="0 0 120 120" fill="currentColor">
                  <polygon points="84,93 84,70 92,70 92,101 22,101 22,70 30,70 30,93"/>
                  <path d="m38,68.4l36.9,7.9 1.6,-7.6l-36.9,-7.9l-1.6,7.6zm4.9,-18.2l34.2,16.2 3.3,-7l-34.2,-16.2l-3.3,7zm9.5,-17.3l29.1,24.7 5,-5.9l-29.1,-24.7l-5,5.9zm18.7,-16.8l-6.1,4.6 22.6,30.2 6.1,-4.6l-22.6,-30.2zm-5.3,-19.3l-6.9,3.2 15.9,34.2 6.9,-3.2l-15.9,-34.2z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-white'
              }`}>
                Stack Exchange Contributions
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
            Active contributor to the <strong>Ethereum Stack Exchange</strong> community, helping developers solve
            complex smart contract and blockchain problems. With <strong>{profile.reputation.toLocaleString()} reputation</strong> and
            <strong> {profile.badges.silver} silver</strong> and <strong>{profile.badges.bronze} bronze badges</strong>,
            I provide detailed technical answers on topics including <strong>Solidity</strong>, <strong>EVM</strong>,
            <strong>NFTs</strong>, and <strong>smart contract security</strong>. My contributions focus on practical
            solutions to real-world blockchain development challenges, sharing knowledge gained from years of
            hands-on experience building production smart contracts.
          </p>
        </div>

        {/* Expandable Content - Stack Exchange Profile */}
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
                <motion.div
                  className={`relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 group overflow-hidden ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-br from-white/95 via-orange-50/95 to-amber-50/95 border-orange-200 hover:border-orange-300 hover:shadow-2xl'
                      : 'bg-gradient-to-br from-slate-800/90 via-orange-900/20 to-amber-900/20 border-orange-700/50 hover:border-orange-600/50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
        {/* Live Data Indicator */}
        {isLiveData && (
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs light-text opacity-70 font-medium">{t('community.liveData')}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-medium">{t('community.loadingData')}</span>
            </div>
          </div>
        )}

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
                  src={profile.profileImage}
                  alt={profile.displayName}
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
                {profile.displayName}
              </h3>
              <p className="text-lg light-text opacity-70 mb-4">
                {t('community.stackExchangeContributor')}
              </p>
              
              {/* Stats Grid */}
              <div className={`grid gap-4 mb-6 ${
                profile.badges.gold > 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
              }`}>
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-orange-100 to-amber-100' 
                    : 'bg-gradient-to-br from-orange-900/30 to-amber-900/30'
                }`}>
                  <div className="text-2xl font-bold text-orange-600">
                    {profile.reputation.toLocaleString()}
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">{t('community.reputation')}</div>
                </div>
                
                {profile.badges.gold > 0 && (
                  <div className={`p-4 rounded-xl text-center ${
                    theme === 'theme-light' 
                      ? 'bg-gradient-to-br from-yellow-100 to-amber-100' 
                      : 'bg-gradient-to-br from-yellow-900/30 to-amber-900/30'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 784.37 1277.39" fill="currentColor">
                        <polygon points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
                        <polygon points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
                        <polygon points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
                        <polygon points="392.07,1277.38 392.07,956.52 -0,724.89"/>
                        <polygon points="392.07,882.29 784.13,650.54 392.07,472.33"/>
                        <polygon points="0,650.54 392.07,882.29 392.07,472.33"/>
                      </svg>
                      <span className="text-2xl font-bold light-text">{profile.badges.gold}</span>
                    </div>
                    <div className="text-xs light-text opacity-70 uppercase tracking-wider">{t('community.gold')}</div>
                  </div>
                )}
                
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-gray-100 to-slate-100' 
                    : 'bg-gradient-to-br from-gray-900/30 to-slate-900/30'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 784.37 1277.39" fill="currentColor">
                      <polygon points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
                      <polygon points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
                      <polygon points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
                      <polygon points="392.07,1277.38 392.07,956.52 -0,724.89"/>
                      <polygon points="392.07,882.29 784.13,650.54 392.07,472.33"/>
                      <polygon points="0,650.54 392.07,882.29 392.07,472.33"/>
                    </svg>
                    <span className="text-2xl font-bold light-text">{profile.badges.silver}</span>
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">{t('community.silver')}</div>
                </div>
                
                <div className={`p-4 rounded-xl text-center ${
                  theme === 'theme-light' 
                    ? 'bg-gradient-to-br from-amber-100 to-orange-100' 
                    : 'bg-gradient-to-br from-amber-900/30 to-orange-900/30'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-amber-600" viewBox="0 0 784.37 1277.39" fill="currentColor">
                      <polygon points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
                      <polygon points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
                      <polygon points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
                      <polygon points="392.07,1277.38 392.07,956.52 -0,724.89"/>
                      <polygon points="392.07,882.29 784.13,650.54 392.07,472.33"/>
                      <polygon points="0,650.54 392.07,882.29 392.07,472.33"/>
                    </svg>
                    <span className="text-2xl font-bold light-text">{profile.badges.bronze}</span>
                  </div>
                  <div className="text-xs light-text opacity-70 uppercase tracking-wider">{t('community.bronze')}</div>
                </div>
              </div>

              {/* Top Tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {profile.topTags.map((tag, index) => (
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
            <h4 className="text-2xl font-bold light-text mb-6 text-center">{t('community.featuredContributions')}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {answers.map((answer) => (
                <Link
                  key={answer.id}
                  href={answer.answerUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div 
                    className={`relative p-6 rounded-2xl border transition-all duration-300 group/answer overflow-hidden cursor-pointer ${
                      theme === 'theme-light'
                        ? 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200 hover:border-orange-300 hover:shadow-lg'
                        : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700 hover:border-orange-600/50 hover:shadow-xl'
                    }`}
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ duration: 0.2 }}
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

                  {/* Question Title */}
                  <div className="mb-4">
                    <div className={`text-xs font-semibold mb-1 ${
                      theme === 'theme-light' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      {t('community.question')}
                    </div>
                    <h5 className="font-bold light-text text-lg pr-24 leading-tight group-hover/answer:text-orange-500 transition-colors">
                      {truncateText(answer.questionTitle, 65)}
                    </h5>
                  </div>
                  
                  {/* Answer Preview */}
                  <div className="mb-4">
                    <div className={`text-xs font-semibold mb-2 ${
                      theme === 'theme-light' ? 'text-orange-600' : 'text-orange-400'
                    }`}>
                      {t('community.myAnswer')}
                    </div>
                    <p className={`text-sm leading-relaxed italic transition-colors ${
                      theme === 'theme-light' 
                        ? 'text-slate-700 bg-orange-50/50 border-l-4 border-orange-200 group-hover/answer:text-slate-900' 
                        : 'text-slate-300 bg-orange-900/20 border-l-4 border-orange-600/50 group-hover/answer:text-slate-100'
                    } pl-4 py-2 rounded-r`}>
{truncateText(cleanMarkdown(answer.excerpt), 180)}
                    </p>
                  </div>
                  
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
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <Link
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                  : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white'
              }`}
            >
              {t('community.viewProfile')}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LiveStackExchangeCard;