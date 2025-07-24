'use client';

import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import BlockchainRain from "@/components/BlockchainRain";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const textAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const buttonsAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });
  const infoAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 600 });
  const profileAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 300 });

  return (
    <section 
      className="relative flex items-start pt-32 md:pt-40 pb-16 overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-b border-[rgba(255,255,255,0.05)]"
    >
      {/* Blockchain Rain Background */}
      <BlockchainRain />
      
      <div className="w-full relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-xl p-8 transition-all duration-300 backdrop-blur-md bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.35)] hover:shadow-[0_8px_48px_rgba(255,255,255,0.15)]"
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div 
                  ref={titleAnimation.ref}
                  className={`mb-4 inline-block py-2 px-6 rounded-full glass-vibrant text-base text-[var(--primary-300)] font-semibold tracking-wide uppercase ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
                >
                  {t('hero.title')}
                </div>
                
                <h1 
                  ref={titleAnimation.ref}
                  className={`text-5xl md:text-7xl font-black mb-8 light-text tracking-tight ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {personalInfo.name}
                </h1>
                
                <p 
                  ref={textAnimation.ref}
                  className={`text-xl md:text-2xl mb-10 light-text leading-relaxed font-light max-w-2xl ${getAnimationClass(textAnimation.isVisible, 'fadeInLeft')}`}
                >
                  {t('hero.subtitle')}
                </p>
                
                <div 
                  ref={buttonsAnimation.ref}
                  className={`flex flex-wrap gap-4 justify-center md:justify-start ${getAnimationClass(buttonsAnimation.isVisible, 'fadeInUp')}`}
                >
                  <Link href="/experience" className="btn-primary">
                    {t('hero.cta')}
                  </Link>
                  <Link href="/projects" className="btn-outline">
                    {t('hero.projects')}
                  </Link>
                </div>
                
                <div 
                  ref={infoAnimation.ref}
                  className={`mt-8 flex items-center gap-2 justify-center md:justify-start ${getAnimationClass(infoAnimation.isVisible, 'fadeInLeft')}`}
                >
                  <div className="w-12 h-0.5 bg-[var(--primary-400)]"></div>
                  <p className="light-text text-base font-medium tracking-wide">{t('hero.experienceYears', { year: personalInfo.startedBlockchain })}</p>
                </div>
              </div>
              
              {/* Profile Picture */}
              <div 
                ref={profileAnimation.ref}
                className={`flex-shrink-0 ${getAnimationClass(profileAnimation.isVisible, 'scaleIn')}`}
              >
                <div className="relative">
                  {/* Glowing effect behind profile */}
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] opacity-75 blur-xl"></div>
                  
                  {/* Circular profile frame */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] glow-effect">
                    {/* Profile Image */}
                    {personalInfo.profileImage ? (
                      <Image 
                        src={personalInfo.profileImage}
                        alt={`${personalInfo.name} profile photo`}
                        className="w-full h-full object-cover"
                        width={192}
                        height={192}
                        priority={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                        <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
                          SD
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add ScrollIndicator component */}
      <ScrollIndicator />
    </section>
  );
}