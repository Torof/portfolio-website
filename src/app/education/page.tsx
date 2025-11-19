'use client';

import { educations, certifications } from '@/lib/data/education';
import Image from 'next/image';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import FlipCard from '@/components/FlipCard';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function EducationPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* Floating Orbs for Visual Interest */}
      <FloatingOrbs />

      <div className="section">
        <div className="container-custom pt-8 pb-20">
          {/* Unified Education Section */}
          <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 bg-gradient-to-br from-[rgba(218,165,32,0.15)] to-[rgba(255,140,0,0.15)] dark:from-[rgba(218,165,32,0.1)] dark:to-[rgba(255,140,0,0.1)] border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.1)]">
            {/* Title Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] flex items-center justify-center shadow-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#DAA520] to-[#FFD700]">
                    {t('education.title')}
                  </span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl light-text max-w-3xl mx-auto leading-relaxed font-light">
                {t('education.subtitle')}
              </p>
            </div>

            {/* Education Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
{educations.map((education) => (
              <FlipCard 
                key={education.id}
                height="450px"
                colorScheme="education"
                frontContent={
                  <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(218,165,32,0.15)] to-[rgba(255,140,0,0.15)] dark:from-[rgba(255,255,255,0.15)] dark:to-[rgba(255,255,255,0.05)] border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.2)] transition-all duration-500 hover:shadow-2xl hover:border-[rgba(218,165,32,0.5)] dark:hover:border-[rgba(218,165,32,0.4)] cursor-pointer flex flex-col">
                    
                    {/* Institution Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[rgba(218,165,32,0.3)] to-[rgba(255,140,0,0.3)] dark:from-[rgba(218,165,32,0.2)] dark:to-[rgba(255,140,0,0.2)] border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {education.logo ? (
                          <Image 
                            src={education.logo} 
                            alt={`${education.institution} logo`} 
                            width={60} 
                            height={60} 
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xl font-black text-[#DAA520] tracking-wide">
                            {education.institution.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black light-text mb-2 line-clamp-2 tracking-tight leading-tight">
                          {t(`edu.${education.id}.degree`)}
                        </h3>
                        {education.website ? (
                          <Link 
                            href={education.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[#DAA520] hover:text-[#FFD700] font-semibold tracking-wide transition-colors duration-300 block"
                          >
                            {education.website.replace('https://', '').replace('http://', '')}
                          </Link>
                        ) : (
                          <p className="text-sm text-[#DAA520] font-semibold tracking-wide uppercase">{education.institution}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="mb-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[rgba(218,165,32,0.25)] to-[rgba(255,140,0,0.25)] dark:from-[rgba(218,165,32,0.2)] dark:to-[rgba(255,140,0,0.2)] border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.2)] light-text text-xs font-bold tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-60">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {education.startDate} - {education.endDate}
                      </span>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="flex-1 mb-6 flex flex-col justify-center">
                      <h4 className="text-sm font-black light-text mb-4 flex items-center border-b-2 border-[#DAA520] pb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] flex items-center justify-center mr-3 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <span className="tracking-wide">{t('education.skillsAcquired')}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {education.skills?.map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-2 text-xs bg-gradient-to-r from-[rgba(218,165,32,0.25)] to-[rgba(255,140,0,0.25)] dark:from-[rgba(218,165,32,0.2)] dark:to-[rgba(255,140,0,0.2)] text-[#B8860B] dark:text-[#DAA520] rounded-full border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.2)] font-semibold tracking-wide transition-all duration-300 hover:scale-105"
                          >
                            {t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) !== `skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}` ? t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) : skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Flip Indicator */}
                    <div className="mt-auto flex items-center justify-center text-[#DAA520] opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs mr-3 font-medium tracking-wide">{t('education.clickForDetails')}</span>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] flex items-center justify-center animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                }
                backContent={
                  <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(255,140,0,0.2)] to-[rgba(218,165,32,0.2)] dark:from-[rgba(255,255,255,0.15)] dark:to-[rgba(255,255,255,0.05)] border border-[rgba(255,140,0,0.3)] dark:border-[rgba(255,255,255,0.2)] cursor-pointer flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-black light-text mb-2 tracking-tight leading-tight">{t(`edu.${education.id}.degree`)}</h3>
                      <p className="text-sm text-[#DAA520] font-bold tracking-wider uppercase opacity-80">{education.institution}</p>
                    </div>
                    
                    {/* Detailed Description - Main Focus */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                      <h4 className="text-xl font-black light-text mb-6 flex items-center flex-shrink-0 border-b-2 border-[#DAA520] pb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] flex items-center justify-center mr-4 shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        </div>
                        <span className="tracking-wide">{t('education.courseDetails')}</span>
                      </h4>
                      <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        <p className="light-text text-sm leading-relaxed font-medium opacity-95">
                          {t(`edu.${education.id}.description`) !== `edu.${education.id}.description` 
                            ? t(`edu.${education.id}.description`) 
                            : education.description || education.field}
                        </p>
                      </div>
                    </div>
                    
                    {/* Back Indicator */}
                    <div className="mt-auto flex items-center justify-center text-[#DAA520] opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] flex items-center justify-center mr-3 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="1 4 1 10 7 10"></polyline>
                          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                        </svg>
                      </div>
                      <span className="text-xs font-medium tracking-wide">{t('education.clickForSkills')}</span>
                    </div>
                  </div>
                }
              />
            ))}
            </div>
          </div>

          {/* Certifications Section (if any) */}
          {certifications.length > 0 && (
            <>
              <div className="mt-32 text-center">
                <h2 className="text-4xl font-black light-text mb-4 tracking-tight">{t('education.certifications')}</h2>
                <p className="text-lg light-text opacity-80 max-w-2xl mx-auto">
                  {t('education.certificationsSubtitle')}
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {certifications.map((cert) => (
                  <div key={cert.id} className="backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(218,165,32,0.12)] to-[rgba(255,140,0,0.12)] border border-[rgba(218,165,32,0.3)] hover:border-[rgba(218,165,32,0.5)] transition-all duration-500">
                    <h3 className="text-xl font-black light-text mb-2">{cert.name}</h3>
                    <p className="text-[#DAA520] font-bold mb-4">{cert.issuer}</p>
                    <p className="light-text text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}