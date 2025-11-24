'use client';

import { personalInfo } from "@/lib/data";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useTheme } from "@/lib/context/ThemeContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const text1Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 100 });
  const text2Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const text3Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 300 });
  const cardAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });
  const item1Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 500 });
  const item2Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 600 });
  const item3Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 700 });
  const item4Animation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 800 });


  return (
    <div className="py-4">
      <div className="relative z-10">
        <div 
          ref={titleAnimation.ref} 
          className={`flex justify-center ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
        >
          <AnimatedTitle 
            variant="split" 
            className="text-4xl md:text-5xl mb-6 text-center"
          >
            {t('about.title')}
          </AnimatedTitle>
        </div>

        <div className="space-y-6">
          <div 
            ref={text1Animation.ref}
            className={`relative p-6 rounded-xl backdrop-blur-md group transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-gradient-to-r from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.15)] border border-[rgba(0,0,0,0.1)] hover:border-[rgba(59,130,246,0.4)]'
                : 'bg-gradient-to-r from-[rgba(59,130,246,0.25)] to-[rgba(147,51,234,0.25)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(59,130,246,0.4)]'
            } ${getAnimationClass(text1Animation.isVisible, 'fadeInLeft')}`}
          >
            <div className="absolute top-4 left-4 text-2xl opacity-50 group-hover:opacity-70 transition-opacity">
              🎯
            </div>
            <p className="text-lg light-text leading-relaxed pl-8">
              {t('about.card1.text', {
                year: personalInfo.startedBlockchain,
                experience: new Date().getFullYear() - parseInt(personalInfo.startedBlockchain)
              })}
            </p>
          </div>
          
          <div 
            ref={text2Animation.ref}
            className={`relative p-6 rounded-xl backdrop-blur-md group transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-gradient-to-r from-[rgba(236,72,153,0.15)] to-[rgba(239,68,68,0.15)] border border-[rgba(0,0,0,0.1)] hover:border-[rgba(236,72,153,0.4)]'
                : 'bg-gradient-to-r from-[rgba(236,72,153,0.25)] to-[rgba(239,68,68,0.25)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(236,72,153,0.4)]'
            } ${getAnimationClass(text2Animation.isVisible, 'fadeInRight')}`}
          >
            <div className="absolute top-4 left-4 text-2xl opacity-50 group-hover:opacity-70 transition-opacity">
              ⚡
            </div>
            <p className="text-lg light-text leading-relaxed pl-8">
              {t('about.card2.text')}
            </p>
          </div>
          
          <div
            ref={text3Animation.ref}
            className={`relative p-6 rounded-xl backdrop-blur-md group transition-all duration-300 ${
              theme === 'theme-light'
                ? 'bg-gradient-to-r from-[rgba(34,197,94,0.15)] to-[rgba(59,130,246,0.15)] border border-[rgba(0,0,0,0.1)] hover:border-[rgba(34,197,94,0.4)]'
                : 'bg-gradient-to-r from-[rgba(34,197,94,0.25)] to-[rgba(59,130,246,0.25)] border border-[rgba(255,255,255,0.2)] hover:border-[rgba(34,197,94,0.4)]'
            } ${getAnimationClass(text3Animation.isVisible, 'fadeInLeft')}`}
          >
            <div className="absolute top-4 left-4 text-2xl opacity-50 group-hover:opacity-70 transition-opacity">
              💻
            </div>
            <p className="text-lg light-text leading-relaxed pl-8">
              {t('about.card3.text')}
            </p>
          </div>
        </div>
        
        <div 
          ref={cardAnimation.ref}
          className={`mt-8 backdrop-blur-md rounded-xl p-6 shadow-lg ${
            theme === 'theme-light'
              ? 'bg-gradient-to-br from-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.1)]'
              : 'bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)]'
          } ${getAnimationClass(cardAnimation.isVisible, 'scaleIn')}`}
        >
          <h3 className="text-xl font-medium mb-5 flex items-center light-text">
            <span className="inline-block w-8 h-8 mr-3 rounded-full bg-[var(--primary-400)] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-400)]">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4M12 16h.01"></path>
              </svg>
            </span>
            {t('about.whatIDo')}
          </h3>

          <div className="space-y-4 light-text">
            <div 
              ref={item1Animation.ref}
              className={`flex items-start p-3 rounded-lg transition-all duration-300 group ${
                theme === 'theme-light'
                  ? 'hover:bg-[rgba(0,0,0,0.05)]'
                  : 'hover:bg-[rgba(255,255,255,0.05)]'
              } ${getAnimationClass(item1Animation.isVisible, 'fadeInRight')}`}
            >
              <span className="text-2xl mr-3 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                🔒
              </span>
              <span className="leading-tight">{t('about.item1')}</span>
            </div>
            <div 
              ref={item2Animation.ref}
              className={`flex items-start p-3 rounded-lg transition-all duration-300 group ${theme === 'theme-light' ? 'hover:bg-[rgba(0,0,0,0.05)]' : 'hover:bg-[rgba(255,255,255,0.05)]'} ${getAnimationClass(item2Animation.isVisible, 'fadeInLeft')}`}
            >
              <span className="text-2xl mr-3 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                🚀
              </span>
              <span className="leading-tight">{t('about.item2')}</span>
            </div>
            <div 
              ref={item3Animation.ref}
              className={`flex items-start p-3 rounded-lg transition-all duration-300 group ${theme === 'theme-light' ? 'hover:bg-[rgba(0,0,0,0.05)]' : 'hover:bg-[rgba(255,255,255,0.05)]'} ${getAnimationClass(item3Animation.isVisible, 'fadeInRight')}`}
            >
              <span className="text-2xl mr-3 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                🔍
              </span>
              <span className="leading-tight">{t('about.item3')}</span>
            </div>
            <div 
              ref={item4Animation.ref}
              className={`flex items-start p-3 rounded-lg transition-all duration-300 group ${theme === 'theme-light' ? 'hover:bg-[rgba(0,0,0,0.05)]' : 'hover:bg-[rgba(255,255,255,0.05)]'} ${getAnimationClass(item4Animation.isVisible, 'fadeInLeft')}`}
            >
              <span className="text-2xl mr-3 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                💎
              </span>
              <span className="leading-tight">{t('about.item4')}</span>
            </div>
            <div className={`flex items-start p-3 rounded-lg transition-all duration-300 group ${theme === 'theme-light' ? 'hover:bg-[rgba(0,0,0,0.05)]' : 'hover:bg-[rgba(255,255,255,0.05)]'}`}>
              <span className="text-2xl mr-3 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                🌐
              </span>
              <span className="leading-tight">{t('about.item5')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}