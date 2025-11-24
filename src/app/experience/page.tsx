'use client';

import { experiences } from '@/lib/data/experiences';
import Image from 'next/image';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import FlipCard from '@/components/FlipCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';

export default function ExperiencePage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  return (
    <>
      {/* Floating Orbs for Visual Interest */}
      <FloatingOrbs />

      <div className="section">
        <div className="container-custom pt-4 pb-20">
          {/* Unified Experience Section */}
          <div className={`backdrop-blur-sm rounded-2xl p-8 md:p-12 border ${
            theme === 'theme-light'
              ? 'bg-gradient-to-br from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.15)] border-[rgba(59,130,246,0.3)]'
              : 'bg-gradient-to-br from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.15)] border-[rgba(255,255,255,0.1)]'
          }`}>
            {/* Title Section */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
                  {t('experience.title')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl light-text max-w-3xl mx-auto leading-relaxed font-light">
                {t('experience.subtitle')}
              </p>
            </div>

            {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
{experiences.map((exp) => (
              <FlipCard 
                key={exp.id}
                height="400px"
                colorScheme="experience"
                frontContent={
                  <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.15)] dark:from-[rgba(255,255,255,0.15)] dark:to-[rgba(255,255,255,0.05)] border border-[rgba(59,130,246,0.3)] dark:border-[rgba(255,255,255,0.2)] transition-all duration-500 hover:shadow-2xl hover:border-[rgba(59,130,246,0.5)] dark:hover:border-[rgba(59,130,246,0.4)] cursor-pointer flex flex-col">
                    {/* Logo and Company */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-[rgba(59,130,246,0.3)] to-[rgba(147,51,234,0.3)] dark:from-[rgba(59,130,246,0.2)] dark:to-[rgba(147,51,234,0.2)] border border-[rgba(59,130,246,0.3)] dark:border-[rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-3xl font-black tracking-wide" style={{ color: '#0f172a' }}>
                            {exp.company.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black light-text mb-2 line-clamp-2 tracking-tight leading-tight">{t(`exp.${exp.id}.position`)}</h3>
                        <div className="flex items-center justify-between">
                          {exp.website ? (
                            <Link
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm font-semibold tracking-wide transition-colors duration-300 truncate ${
                                theme === 'theme-light'
                                  ? 'text-slate-900 hover:text-blue-600'
                                  : 'text-white hover:text-blue-400'
                              }`}
                            >
                              {(() => {
                                const cleanUrl = exp.website.replace('https://', '').replace('http://', '');
                                return cleanUrl.length > 25 ? cleanUrl.substring(0, 25) + '...' : cleanUrl;
                              })()}
                            </Link>
                          ) : (
                            <p className="text-sm text-[var(--primary-400)] font-semibold tracking-wide uppercase">{exp.company}</p>
                          )}
                          <p className="light-text text-sm underline flex-shrink-0">
                            {exp.startDate} - {exp.endDate || t('experience.present')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="flex-1 mb-6 flex flex-col justify-center">
                      <h4 className="text-sm font-black light-text mb-4 flex items-center border-b-2 border-[var(--primary-400)] pb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)] flex items-center justify-center mr-3 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <span className="tracking-wide">{t('experience.skillsUsed')}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-2 text-xs bg-gradient-to-r rounded-full border-2 font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-sm ${
                              theme === 'theme-light'
                                ? 'from-[rgba(59,130,246,0.25)] to-[rgba(147,51,234,0.25)] text-[#1E40AF] border-[rgba(59,130,246,0.6)]'
                                : 'from-[rgba(59,130,246,0.2)] to-[rgba(147,51,234,0.2)] text-white border-[rgba(59,130,246,0.5)]'
                            }`}
                          >
                            {t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) !== `skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}` ? t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) : skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Flip Indicator */}
                    <div className="mt-auto flex items-center justify-center light-text opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs mr-2 font-medium tracking-wide">{t('experience.clickForAchievements')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                }
                backContent={
                  <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(147,51,234,0.2)] to-[rgba(59,130,246,0.2)] dark:from-[rgba(255,255,255,0.15)] dark:to-[rgba(255,255,255,0.05)] border border-[rgba(147,51,234,0.3)] dark:border-[rgba(255,255,255,0.2)] cursor-pointer flex flex-col">
                    <style jsx global>{`
                      .achievement-scrollbar::-webkit-scrollbar {
                        width: 12px;
                      }
                      
                      /* Dark mode styles (default) */
                      .achievement-scrollbar::-webkit-scrollbar-track {
                        background: rgba(30, 41, 59, 0.5);
                        border-radius: 10px;
                        border: 1px solid rgba(148, 163, 184, 0.2);
                      }
                      
                      .achievement-scrollbar::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, #9333ea 0%, #3b82f6 100%);
                        border-radius: 10px;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                      }
                      
                      .achievement-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, #a855f7 0%, #60a5fa 100%);
                        border-color: rgba(255, 255, 255, 0.3);
                      }
                      
                      /* Light mode overrides using theme class */
                      .theme-light .achievement-scrollbar::-webkit-scrollbar-track {
                        background: rgba(226, 232, 240, 0.8);
                        border: 1px solid rgba(203, 213, 225, 0.5);
                      }
                      
                      .theme-light .achievement-scrollbar::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, #c084fc 0%, #93c5fd 100%);
                        border: 2px solid rgba(255, 255, 255, 0.9);
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                      }
                      
                      .theme-light .achievement-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, #d8b4fe 0%, #bfdbfe 100%);
                        border-color: rgba(255, 255, 255, 1);
                      }
                    `}</style>

                    {/* Key Achievements - Clean Highlighted Section */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                      <h4 className="text-2xl font-black light-text mb-6 flex items-center flex-shrink-0 border-b-2 border-[var(--secondary-400)] pb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--primary-400)] flex items-center justify-center mr-4 shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <span className="tracking-wide">{t('experience.achievements')}</span>
                      </h4>
                      <div className="overflow-y-auto flex-1 pr-2 achievement-scrollbar" style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#9333ea #1f2937'
                      }}>
                        {exp.achievements && exp.achievements.length > 0 ? (
                          <ul className="space-y-5">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-4 group">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--primary-400)] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm group-hover:scale-110 transition-transform duration-200">
                                  <span className="text-white text-xs font-bold">{idx + 1}</span>
                                </div>
                                <span className="text-base leading-loose break-words light-text font-normal opacity-95 group-hover:opacity-100 transition-opacity duration-200">
                                  {exp.id === 'alyra-jury' && achievement.includes('https://') ? (
                                    <span>
                                      {achievement.split(' - POAP: ')[0]} -
                                      <a
                                        href={achievement.split('POAP: ')[1]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--primary-400)] hover:text-[var(--primary-500)] underline ml-1"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        View POAP
                                      </a>
                                    </span>
                                  ) : (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: t(`exp.${exp.id}.achievement.${idx + 1}`) !== `exp.${exp.id}.achievement.${idx + 1}`
                                          ? t(`exp.${exp.id}.achievement.${idx + 1}`)
                                          : achievement
                                      }}
                                    />
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="light-text text-sm italic opacity-60 text-center">{t('experience.noAchievements')}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Back Indicator */}
                    <div className="mt-auto flex items-center justify-center light-text opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      <span className="text-xs font-medium tracking-wide">{t('experience.clickForDetails')}</span>
                    </div>
                  </div>
                }
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}