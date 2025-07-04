'use client';

import React from 'react';
import { personalInfo, socialLinks } from '@/lib/data/personalInfo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1729] to-[#1e293b] opacity-90"></div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Create predictable values based on index to avoid hydration mismatch
            const seed = i * 137.5; // Use golden ratio for good distribution
            const left = (seed % 100);
            const top = ((seed * 1.618) % 100);
            const size = 2 + (i % 4);
            const delay = (i * 0.3) % 5;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400 opacity-20"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                }}
              >
                <div className="animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="container-custom">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
                {t('contact.connect')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl light-text max-w-3xl mx-auto leading-relaxed font-light">
              {t('contact.ready')}
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link 
                href={socialLinks.find(link => link.platform === 'LinkedIn')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(14,165,233,0.15)] to-[rgba(59,130,246,0.15)] border border-[rgba(14,165,233,0.3)] transition-all duration-300 hover:border-[rgba(14,165,233,0.5)] hover:shadow-xl cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0077B5] flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold light-text">LinkedIn</h3>
                  </div>
                  <p className="light-text opacity-80 mb-4">
                    {t('contact.linkedin.description')}
                  </p>
                  <div className="flex items-center text-[var(--primary-400)] group-hover:text-[var(--primary-300)] transition-colors">
                    <span className="text-sm font-medium">{t('contact.linkedin.cta')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* GitHub Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link 
                href={socialLinks.find(link => link.platform === 'GitHub')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(55,65,81,0.15)] to-[rgba(17,24,39,0.15)] border border-[rgba(107,114,128,0.3)] transition-all duration-300 hover:border-[rgba(156,163,175,0.5)] hover:shadow-xl cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#333] flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold light-text">GitHub</h3>
                  </div>
                  <p className="light-text opacity-80 mb-4">
                    {t('contact.github.description')}
                  </p>
                  <div className="flex items-center text-[var(--primary-400)] group-hover:text-[var(--primary-300)] transition-colors">
                    <span className="text-sm font-medium">{t('contact.github.cta')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link 
                href={`mailto:${personalInfo.email}`}
                className="block h-full"
              >
                <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(147,51,234,0.15)] to-[rgba(124,58,237,0.15)] border border-[rgba(147,51,234,0.3)] transition-all duration-300 hover:border-[rgba(147,51,234,0.5)] hover:shadow-xl cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--secondary-500)] to-[var(--secondary-600)] flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold light-text">Email</h3>
                  </div>
                  <p className="light-text opacity-80 mb-4">
                    {t('contact.email.description')}
                  </p>
                  <div className="flex items-center text-[var(--secondary-400)] group-hover:text-[var(--secondary-300)] transition-colors">
                    <span className="text-sm font-medium break-all">{personalInfo.email}</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Personal Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(16,185,129,0.15)] to-[rgba(5,150,105,0.15)] border border-[rgba(16,185,129,0.3)] transition-all duration-300 hover:border-[rgba(16,185,129,0.5)] hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold light-text">{t('contact.aboutMe')}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-3">📍</span>
                    <span className="light-text">{personalInfo.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-emerald-400 mr-3">🇫🇷</span>
                    <span className="light-text">{t('contact.nationality')}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-emerald-400 mr-3">🌐</span>
                      <span className="light-text font-medium">{t('contact.languages')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {['French', 'English', 'Spanish', 'Vietnamese'].map((language) => (
                        <span 
                          key={language}
                          className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}