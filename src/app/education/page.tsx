'use client';

import { educations, certifications } from '@/lib/data/education';
import Image from 'next/image';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import FlipCard from '@/components/FlipCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';

export default function EducationPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  return (
    <>
      {/* Floating Orbs for Visual Interest */}
      <FloatingOrbs />

      <div className="section">
        <div className="container-custom pt-4 pb-20">
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
                      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-[rgba(218,165,32,0.3)] to-[rgba(255,140,0,0.3)] dark:from-[rgba(218,165,32,0.2)] dark:to-[rgba(255,140,0,0.2)] border border-[rgba(218,165,32,0.3)] dark:border-[rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {education.logo ? (
                          <Image
                            src={education.logo}
                            alt={`${education.institution} logo`}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-3xl font-black text-slate-900 tracking-wide">
                            {education.institution.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black light-text mb-2 line-clamp-2 tracking-tight leading-tight">
                          {t(`edu.${education.id}.degree`)}
                        </h3>
                        <div className="flex items-center justify-between">
                          {education.website ? (
                            <Link
                              href={education.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm font-semibold tracking-wide transition-colors duration-300 truncate ${
                                theme === 'theme-light'
                                  ? 'text-slate-900 hover:text-blue-600'
                                  : 'text-white hover:text-blue-400'
                              }`}
                            >
                              {(() => {
                                const cleanUrl = education.website.replace('https://', '').replace('http://', '');
                                return cleanUrl.length > 25 ? cleanUrl.substring(0, 25) + '...' : cleanUrl;
                              })()}
                            </Link>
                          ) : (
                            <p className="text-sm text-[#DAA520] font-semibold tracking-wide uppercase">{education.institution}</p>
                          )}
                          <p className="light-text text-sm underline flex-shrink-0">
                            {education.startDate} - {education.endDate}
                          </p>
                        </div>
                      </div>
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
                            className={`px-3 py-2 text-xs bg-gradient-to-r rounded-full border-2 font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-sm ${
                              theme === 'theme-light'
                                ? 'from-[rgba(218,165,32,0.25)] to-[rgba(255,140,0,0.25)] text-[#6B5310] border-[rgba(218,165,32,0.6)]'
                                : 'from-[rgba(218,165,32,0.2)] to-[rgba(255,140,0,0.2)] text-white border-[rgba(218,165,32,0.5)]'
                            }`}
                          >
                            {t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) !== `skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}` ? t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) : skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Flip Indicator */}
                    <div className="mt-auto flex items-center justify-center light-text opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs mr-2 font-medium tracking-wide">{t('education.clickForDetails')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                }
                backContent={
                  <div className="h-full backdrop-blur-md rounded-xl p-6 bg-gradient-to-br from-[rgba(255,140,0,0.2)] to-[rgba(218,165,32,0.2)] dark:from-[rgba(255,255,255,0.15)] dark:to-[rgba(255,255,255,0.05)] border border-[rgba(255,140,0,0.3)] dark:border-[rgba(255,255,255,0.2)] cursor-pointer flex flex-col">

                    {/* Detailed Description - Main Focus */}
                    <div className="flex-1 overflow-hidden flex flex-col mb-6">
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
                        <p
                          className="light-text text-base leading-loose font-normal"
                          dangerouslySetInnerHTML={{
                            __html: t(`edu.${education.id}.description`) !== `edu.${education.id}.description`
                              ? t(`edu.${education.id}.description`)
                              : education.description || education.field
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Back Indicator */}
                    <div className="mt-auto flex items-center justify-center light-text opacity-60 group-hover:opacity-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
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