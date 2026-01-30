'use client';

// import Link from "next/link"; // Removed for IPFS compatibility
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import BlockchainRain from "@/components/BlockchainRain";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useTheme } from "@/lib/context/ThemeContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const textAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const buttonsAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });
  const profileAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 300 });

  return (
    <section
      className={`relative flex items-start pt-32 md:pt-40 pb-16 border-b ${
        theme === 'theme-light'
          ? 'border-[rgba(0,0,0,0.05)]'
          : 'border-[rgba(255,255,255,0.05)]'
      }`}
    >
      {/* Background that extends to top of screen */}
      <div
        className={`absolute -top-16 left-0 right-0 bottom-0 ${
          theme === 'theme-light'
            ? 'bg-gradient-to-b from-[#f3f4f6] to-[#e5e7eb]'
            : 'bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]'
        }`}
        style={{ zIndex: -1 }}
      />
      {/* Blockchain Rain Background */}
      <BlockchainRain theme={theme} />
      
      <div className="w-full relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`relative overflow-hidden rounded-xl p-8 transition-all duration-300 backdrop-blur-md ${
              theme === 'theme-light'
                ? 'bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(248,250,252,0.9)] border border-[rgba(0,0,0,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.2)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.15)]'
                : 'bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.35)] hover:shadow-[0_8px_48px_rgba(255,255,255,0.15)]'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
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

                {/* Developer Type Badges */}
                <div
                  ref={buttonsAnimation.ref}
                  className={`flex flex-wrap gap-3 justify-center md:justify-start ${getAnimationClass(buttonsAnimation.isVisible, 'fadeInUp')}`}
                >
                  <div
                    className={`py-2 px-6 rounded-full glass-vibrant text-base font-semibold tracking-wide ${
                      theme === 'theme-light'
                        ? 'text-blue-700 bg-blue-100 border border-blue-200'
                        : 'text-blue-300 bg-blue-900/30 border border-blue-700'
                    }`}
                  >
                    {t('hero.title')}
                  </div>
                  <div
                    className={`py-2 px-6 rounded-full glass-vibrant text-base font-semibold tracking-wide ${
                      theme === 'theme-light'
                        ? 'text-purple-700 bg-purple-100 border border-purple-200'
                        : 'text-purple-300 bg-purple-900/30 border border-purple-700'
                    }`}
                  >
                    Front End Developer
                  </div>
                  <div
                    className={`py-2 px-6 rounded-full glass-vibrant text-base font-semibold tracking-wide ${
                      theme === 'theme-light'
                        ? 'text-green-700 bg-green-100 border border-green-200'
                        : 'text-green-300 bg-green-900/30 border border-green-700'
                    }`}
                  >
                    App Developer
                  </div>
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
      
    </section>
  );
}