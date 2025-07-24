'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useTheme } from "@/lib/context/ThemeContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const textAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 100 });
  const centralCardAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const buttonAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });

  return (
    <section className={`relative overflow-hidden border-b ${
      theme === 'theme-light'
        ? 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border-slate-300'
        : 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] border-slate-700'
    }`} style={{ minHeight: '90vh' }}>
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => {
          // Create predictable values based on index to avoid hydration mismatch
          const seed = i * 137.5; // Use golden ratio for good distribution
          const left = (seed % 100);
          const top = ((seed * 1.618) % 100);
          const duration = 2 + (i % 3);
          const delay = (i * 0.04) % 2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>
      
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container-custom relative z-10 max-w-5xl py-24 flex flex-col justify-center min-h-screen">
        {/* Header */}
        <motion.div
          ref={titleAnimation.ref}
          className={`text-center mb-12 ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
        >
          <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] via-[var(--secondary-400)] to-[var(--primary-400)]">
              {t('contact.buildTogether')}
            </span>
          </h2>
        </motion.div>
        
        <motion.div
          ref={textAnimation.ref} 
          className={`text-center mb-16 ${getAnimationClass(textAnimation.isVisible, 'fadeInUp')}`}
        >
          <p className="text-xl md:text-2xl light-text max-w-4xl mx-auto leading-relaxed font-light">
            {t('contact.vision')}
          </p>
        </motion.div>

        {/* Engaging Central Card */}
        <motion.div
          ref={centralCardAnimation.ref}
          className={`${getAnimationClass(centralCardAnimation.isVisible, 'scaleIn')}`}
        >
          <motion.div 
            className="relative overflow-hidden rounded-2xl p-8 md:p-12 backdrop-blur-md bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(147,51,234,0.1)] border border-[rgba(255,255,255,0.1)] transition-all duration-500 group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 25px 50px rgba(59, 130, 246, 0.15)',
            }}
            initial={{ 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' 
            }}
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(59,130,246,0.2), transparent, rgba(147,51,234,0.2), transparent)',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative z-10 text-center">
              {/* Icon cluster */}
              <div className="flex justify-center items-center mb-8 space-x-4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--secondary-500)] flex items-center justify-center"
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                </motion.div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black mb-6 light-text tracking-tight">
                {t('contact.innovate')}
              </h3>
              
              <p className="text-lg md:text-xl light-text mb-8 leading-relaxed max-w-2xl mx-auto opacity-90">
                {t('contact.discuss')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--primary-400)] mb-2">6+</div>
                  <div className="text-sm light-text opacity-75">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--secondary-400)] mb-2">50+</div>
                  <div className="text-sm light-text opacity-75">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">24h</div>
                  <div className="text-sm light-text opacity-75">Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <div 
          ref={buttonAnimation.ref}
          className={`text-center mt-12 ${getAnimationClass(buttonAnimation.isVisible, 'fadeInUp')}`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/contact" 
              className="relative inline-flex items-center px-12 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                {t('contact.startConversation')}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 -z-5 opacity-0 group-hover:opacity-100"
                animate={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}