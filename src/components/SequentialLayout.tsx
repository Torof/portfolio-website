'use client';

import EnhancedProjectsSection from './EnhancedProjectsSection';
import InteractiveTechStack from './InteractiveTechStack';
import FeaturedGitHubStats from './FeaturedGitHubStats';
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import { Project } from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';

interface SequentialLayoutProps {
  projects: Project[];
}

const SequentialLayout: React.FC<SequentialLayoutProps> = ({ projects }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const textAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const techStackAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });
  const projectsTitleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const projectsTextAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const projectsGridAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });

  return (
    <div>
      {/* Tech Stack Section */}
      <section className="section relative overflow-hidden" style={{ minHeight: '80vh' }}>
        
        <div className="container-custom relative z-10">
          <div
            ref={titleAnimation.ref}
            className={`mb-4 text-center relative overflow-hidden rounded-xl p-8 transition-all duration-300 backdrop-blur-sm glass-card ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
          >
            <h2 className="section-title text-5xl md:text-6xl font-black mb-6 light-text text-glow tracking-tight">{t('techStack.title')}</h2>
            <p 
              ref={textAnimation.ref}
              className={`light-text mt-4 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light ${getAnimationClass(textAnimation.isVisible, 'fadeInUp')}`}
            >
              {t('techStack.description')}
            </p>
          </div>
          
          {/* Tech Grid - Limited to max-width for readability */}
          <div 
            ref={techStackAnimation.ref}
            className={`w-full backdrop-blur-sm rounded-2xl p-8 glass-card ${getAnimationClass(techStackAnimation.isVisible, 'scaleIn')}`}
          >
            <InteractiveTechStack />
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section className={`relative overflow-hidden border-b ${
        theme === 'theme-light' 
          ? 'section-bg-secondary theme-light:border-warm-300' 
          : 'bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 border-gray-700'
      }`} style={{ 
        minHeight: '90vh', 
        backgroundColor: theme === 'theme-light' ? '#FFF8E1' : undefined 
      }}>
        {/* Ethereum Logo Columns Background */}
        <div className="absolute inset-0 opacity-100">
          <style jsx>{`
            @keyframes ethereumColorTransition {
              0% {
                /* Original grey colors */
              }
              50% {
                /* Colored version */
              }
              100% {
                /* Back to grey */
              }
            }
            
            .ethereum-logo polygon:nth-child(1) {
              animation: ethereumColor1 12s ease-in-out infinite;
            }
            .ethereum-logo polygon:nth-child(2) {
              animation: ethereumColor2 12s ease-in-out infinite;
            }
            .ethereum-logo polygon:nth-child(3) {
              animation: ethereumColor3 12s ease-in-out infinite;
            }
            .ethereum-logo polygon:nth-child(4) {
              animation: ethereumColor4 12s ease-in-out infinite;
            }
            .ethereum-logo polygon:nth-child(5) {
              animation: ethereumColor5 12s ease-in-out infinite;
            }
            .ethereum-logo polygon:nth-child(6) {
              animation: ethereumColor6 12s ease-in-out infinite;
            }
            
            @keyframes ethereumColor1 {
              0%, 100% { fill: #343434; }
              50% { fill: #F0CDC2; }
            }
            @keyframes ethereumColor2 {
              0%, 100% { fill: #8C8C8C; }
              50% { fill: #C9B3F5; }
            }
            @keyframes ethereumColor3 {
              0%, 100% { fill: #3C3C3B; }
              50% { fill: #88AAF1; }
            }
            @keyframes ethereumColor4 {
              0%, 100% { fill: #8C8C8C; }
              50% { fill: #C9B3F5; }
            }
            @keyframes ethereumColor5 {
              0%, 100% { fill: #141414; }
              50% { fill: #F0CDC2; }
            }
            @keyframes ethereumColor6 {
              0%, 100% { fill: #393939; }
              50% { fill: #B8FAF6; }
            }
          `}</style>
          {/* Column 1 */}
          <div className="absolute left-[10%] top-0 flex flex-col items-center space-y-16 ">
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 2 */}
          <div className="absolute left-[30%] top-20 flex flex-col items-center space-y-20 " style={{animationDelay: '0.5s'}}>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 3 */}
          <div className="absolute right-[30%] top-10 flex flex-col items-center space-y-24 " style={{animationDelay: '1s'}}>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 4 */}
          <div className="absolute right-[10%] top-16 flex flex-col items-center space-y-18 " style={{animationDelay: '1.5s'}}>
            <svg width="55" height="55" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="75" height="75" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="50" height="50" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="44" height="44" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="67" height="67" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="41" height="41" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Bottom columns - offset from top columns */}
          {/* Column 5 - Bottom */}
          <div className="absolute left-[20%] bottom-0 flex flex-col-reverse items-center space-y-reverse space-y-14 " style={{animationDelay: '2s'}}>
            <svg width="65" height="65" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="55" height="55" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="47" height="47" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="59" height="59" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="43" height="43" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 6 - Bottom */}
          <div className="absolute left-[40%] bottom-12 flex flex-col-reverse items-center space-y-reverse space-y-16 " style={{animationDelay: '2.5s'}}>
            <svg width="70" height="70" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="45" height="45" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="60" height="60" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="38" height="38" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="51" height="51" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="64" height="64" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 7 - Bottom */}
          <div className="absolute right-[40%] bottom-8 flex flex-col-reverse items-center space-y-reverse space-y-18 " style={{animationDelay: '3s'}}>
            <svg width="52" height="52" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="68" height="68" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="42" height="42" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="56" height="56" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="39" height="39" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="63" height="63" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
          
          {/* Column 8 - Bottom */}
          <div className="absolute right-[20%] bottom-16 flex flex-col-reverse items-center space-y-reverse space-y-20 " style={{animationDelay: '3.5s'}}>
            <svg width="58" height="58" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="46" height="46" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="72" height="72" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="41" height="41" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="65" height="65" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
            <svg width="49" height="49" viewBox="0 0 784.37 1277.39" className="ethereum-logo">
              <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </svg>
          </div>
        </div>
        
        <div className="container-custom relative z-10 pt-16 pb-16">
          <div
            ref={projectsTitleAnimation.ref}
            className={`mb-16 text-center backdrop-blur-sm rounded-2xl p-8 bg-gradient-to-br from-[rgba(59,130,246,0.2)] to-[rgba(147,51,234,0.2)] border border-[rgba(255,255,255,0.2)] ${getAnimationClass(projectsTitleAnimation.isVisible, 'fadeInUp')}`}
          >
            <h2 className="section-title text-5xl md:text-6xl font-black mb-6 light-text text-glow tracking-tight">{t('featuredProjects.title')}</h2>
            <p
              ref={projectsTextAnimation.ref}
              className={`light-text mt-4 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light ${getAnimationClass(projectsTextAnimation.isVisible, 'fadeInUp')}`}
            >
              {t('featuredProjects.description')}
            </p>
          </div>

          {/* GitHub Stats Preview */}
          <div className="max-w-4xl mx-auto mb-8">
            <FeaturedGitHubStats />
          </div>

          {/* Projects Grid - Full Width but with max-width for readability */}
          <div
            ref={projectsGridAnimation.ref}
            className={`max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-8 bg-gradient-to-br from-[rgba(59,130,246,0.3)] to-[rgba(147,51,234,0.3)] border border-[rgba(255,255,255,0.2)] ${getAnimationClass(projectsGridAnimation.isVisible, 'fadeInUp')}`}
          >
              <EnhancedProjectsSection projects={projects} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SequentialLayout;