'use client';

import Image from "next/image";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useTheme } from "@/lib/context/ThemeContext";

export default function VibeCodingPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const heroAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const workflowAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 100 });
  const toolsAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 100 });
  const productivityAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 100 });

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'theme-light'
        ? 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50'
        : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
    }`}>
      {/* Flame Curves on Left Side */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
        {/* Left flame curve extending to bottom */}
        <div className="absolute top-0 left-8 w-12 h-full bg-gradient-to-b from-orange-500/70 via-orange-500/40 via-orange-400/20 to-transparent transform rotate-12 blur-lg"></div>
        
        {/* Right flame curve extending to bottom */}
        <div className="absolute top-0 right-12 w-16 h-full bg-gradient-to-b from-red-500/60 via-red-500/35 via-red-400/15 to-transparent transform -rotate-8 blur-lg"></div>
        
        {/* Inner curve for depth */}
        <div className="absolute top-0 left-16 w-10 h-full bg-gradient-to-b from-yellow-500/50 via-yellow-500/25 via-orange-400/10 to-transparent transform rotate-6 blur-md"></div>
        
        {/* Outer curve for width */}
        <div className="absolute top-0 right-6 w-14 h-full bg-gradient-to-b from-red-600/40 via-orange-500/20 via-orange-300/8 to-transparent transform -rotate-15 blur-xl"></div>
        
        {/* Smooth transition gradient extending further right */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-400/15 via-red-400/8 via-orange-300/4 to-transparent blur-2xl"></div>
        
        {/* Additional smooth transition extending to background */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-orange-300/6 via-red-300/3 to-transparent blur-3xl"></div>
        
        {/* Ember particles floating */}
        <div className="absolute top-20 left-16 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-24 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-60 left-12 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-80 left-20 w-1 h-1 bg-orange-300 rounded-full animate-pulse delay-1500"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-12 flex items-start justify-center">
          <div className="container-custom text-center">
            <div 
              ref={titleAnimation.ref}
              className={`mb-8 ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
            >
              <AnimatedTitle variant="glitch" className="text-5xl md:text-7xl mb-6">
                {t('vibe-coding.title')}
              </AnimatedTitle>
              <div className="flex items-center justify-center space-x-4 text-2xl md:text-3xl font-bold">
                <span className="text-orange-300">{t('vibe-coding.blockchainDev')}</span>
                <span className={theme === 'theme-light' ? 'text-gray-700' : 'text-white'}>×</span>
                <span className="text-red-300">{t('vibe-coding.aiAcceleration')}</span>
              </div>
            </div>

            <div 
              ref={heroAnimation.ref}
              className={`max-w-4xl mx-auto ${getAnimationClass(heroAnimation.isVisible, 'fadeInUp')}`}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-orange-500/20 via-red-500/15 to-yellow-600/20 backdrop-blur-md border border-orange-300/30 shadow-2xl">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
                  <span className="text-white font-semibold">🔥 {t('vibe-coding.description')}</span>
                </div>
                <div className="mt-4 space-y-6">
                  <p className={`text-xl leading-relaxed ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>
                    <strong>{t('vibe-coding.title')}</strong> {t('vibe-coding.approach')}
                  </p>
                  <p className={`text-lg leading-relaxed ${theme === 'theme-light' ? 'text-gray-700' : 'text-gray-100'}`}>
                    {t('vibe-coding.whileIArchitect')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Enhancement Section */}
        <section className="py-12 relative">
          {/* Flame accent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="container-custom">
            <div 
              ref={workflowAnimation.ref}
              className={`mb-16 ${getAnimationClass(workflowAnimation.isVisible, 'fadeInUp')}`}
            >
              <AnimatedTitle variant="gradient" className="text-4xl md:text-5xl text-center mb-8">
                🔥 {t('vibe-coding.workflow')}
              </AnimatedTitle>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What I Do Myself */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-orange-500/25 via-red-500/15 to-yellow-500/20 backdrop-blur-sm border border-orange-400/30 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>{t('vibe-coding.coreExpertise')}</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "vibe-coding.core.architecture",
                    "vibe-coding.core.solidity",
                    "vibe-coding.core.gas",
                    "vibe-coding.core.deployment",
                    "vibe-coding.core.auditing",
                    "vibe-coding.core.defi"
                  ].map((key, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-400 mr-3 mt-1">🔥</span>
                      <span className={theme === 'theme-light' ? 'text-gray-700' : 'text-gray-100'}>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What AI Accelerates */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-red-500/25 via-orange-500/15 to-pink-500/20 backdrop-blur-sm border border-red-400/30 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>{t('vibe-coding.aiPowered')} Development</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "vibe-coding.ai.frontend",
                    "vibe-coding.ai.backend", 
                    "vibe-coding.ai.web3",
                    "vibe-coding.ai.ui",
                    "vibe-coding.ai.testing",
                    "vibe-coding.ai.docs"
                  ].map((key, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">⚡</span>
                      <span className={theme === 'theme-light' ? 'text-gray-700' : 'text-gray-100'}>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tools Showcase */}
        <section className="py-12 relative">
          {/* Flame divider */}
          <div className="absolute top-0 left-1/4 w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
          <div className="absolute top-0 right-1/4 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
          
          <div className="container-custom">
            <div 
              ref={toolsAnimation.ref}
              className={`mb-16 ${getAnimationClass(toolsAnimation.isVisible, 'fadeInUp')}`}
            >
              <AnimatedTitle variant="gradient" className="text-4xl md:text-5xl text-center mb-8">
                🔥 {t('vibe-coding.aiArsenal')}
              </AnimatedTitle>
              <p className={`text-center text-xl max-w-3xl mx-auto ${theme === 'theme-light' ? 'text-gray-600' : 'text-gray-200'}`}>
                {t('vibe-coding.arsenalSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  nameKey: "vibe-coding.tool.claude.name",
                  logo: "/logos/claude.svg",
                  descKey: "vibe-coding.tool.claude.desc",
                  color: "from-orange-500 to-red-500"
                },
                {
                  nameKey: "vibe-coding.tool.copilot.name",
                  logo: "/logos/github-copilot.svg",
                  descKey: "vibe-coding.tool.copilot.desc",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  nameKey: "vibe-coding.tool.chatgpt.name",
                  logo: "/logos/chatgpt.svg",
                  descKey: "vibe-coding.tool.chatgpt.desc",
                  color: "from-orange-500 to-yellow-500"
                }
              ].map((tool, index) => (
                <div key={index} className="relative p-6 rounded-xl bg-gradient-to-br from-orange-500/10 via-red-500/5 to-yellow-500/10 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 group shadow-lg">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg p-3`}>
                    <Image
                      src={tool.logo}
                      alt={t(tool.nameKey)}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain filter brightness-110"
                    />
                  </div>
                  <h4 className={`text-xl font-semibold mb-3 ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>{t(tool.nameKey)}</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'theme-light' ? 'text-gray-600' : 'text-gray-200'}`}>{t(tool.descKey)}</p>
                  {/* Flame accent */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent group-hover:via-orange-500 transition-all"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="py-12 relative">
          <div className="container-custom">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-red-600/30 to-orange-600/30 backdrop-blur-md border-2 border-red-500/50 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-8 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full shadow-lg">
                <span className="text-white font-bold text-lg">⚠️ {t('vibe-coding.disclaimer.title')}</span>
              </div>
              <div className="mt-6 space-y-6">
                <p className={`text-lg font-semibold leading-relaxed ${theme === 'theme-light' ? 'text-gray-900' : 'text-white'}`}>
                  🔒 {t('vibe-coding.disclaimer.text')}
                </p>
                <p className={`text-lg leading-relaxed ${theme === 'theme-light' ? 'text-gray-800' : 'text-gray-100'}`}>
                  ✅ {t('vibe-coding.disclaimer.testing')}
                </p>
                <p className={`text-xl font-bold text-center ${theme === 'theme-light' ? 'text-red-700' : 'text-red-300'}`}>
                  🛡️ {t('vibe-coding.disclaimer.blockchain')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Productivity Impact */}
        <section className="py-12 relative">
          {/* Flame background accent */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          
          <div className="container-custom">
            <div 
              ref={productivityAnimation.ref}
              className={`mb-16 ${getAnimationClass(productivityAnimation.isVisible, 'fadeInUp')}`}
            >
              <AnimatedTitle variant="gradient" className="text-4xl md:text-5xl text-center mb-8">
                🔥 {t('vibe-coding.impactMetrics')}
              </AnimatedTitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(() => {
                const stats = [
                  {
                    metric: "10x",
                    label: t('vibe-coding.fasterFrontend'),
                    description: t('vibe-coding.fasterFrontendDesc'),
                    icon: "⚡",
                    gradient: "from-yellow-500/20 to-orange-500/20"
                  },
                  {
                    metric: "5x",
                    label: t('vibe-coding.reducedIntegration'),
                    description: t('vibe-coding.reducedIntegrationDesc'),
                    icon: "🔗",
                    gradient: "from-orange-500/20 to-red-500/20"
                  },
                  {
                    metric: "100%",
                    label: t('contact.focusCore'),
                    description: t('contact.focusCoreDescription'),
                    icon: "🎯",
                    gradient: "from-red-500/20 to-pink-500/20"
                  }
                ];
                return stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 shadow-xl`}>
                    <div className="text-6xl mb-4">{stat.icon}</div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                      {stat.metric}
                    </div>
                    <h4 className={`text-xl font-semibold mb-3 ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>{stat.label}</h4>
                    <p className={`text-sm ${theme === 'theme-light' ? 'text-gray-600' : 'text-gray-200'}`}>{stat.description}</p>
                    {/* Flame glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                ));
              })()}
            </div>

            <div className="mt-16 text-center">
              <div className={`inline-block p-6 rounded-xl backdrop-blur-sm shadow-xl ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-r from-orange-100 via-red-100 to-yellow-100 border border-orange-300'
                  : 'bg-gradient-to-r from-orange-500/25 via-red-500/20 to-yellow-500/25 border border-orange-400/40'
              }`}>
                <p className={`text-2xl ${theme === 'theme-light' ? 'text-gray-800' : 'text-white'}`}>
                  <span className={`font-semibold ${
                    theme === 'theme-light' ? 'text-orange-600' : 'text-orange-300'
                  }`}>🔥 {t('vibe-coding.result')}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}