'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, getAnimationClass } from '@/lib/hooks/useScrollAnimation';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { skillCategories } from '@/lib/data/advancedSkills';
import AnimatedTitle from '@/components/AnimatedTitle';
import BlockchainNetwork from '@/components/BlockchainNetwork';
import PremiumSkillSections from '@/components/PremiumSkillSections';
import TechRiver from '@/components/TechRiver';
import LiveStackExchangeCard from '@/components/LiveStackExchangeCard';
import SkillsTable from '@/components/SkillsTable';



export default function SkillsPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="min-h-screen relative">
      {/* Blockchain Network Background - Fixed positioning to cover full page */}
      <div className="fixed inset-0 z-0">
        <BlockchainNetwork />
      </div>

      {/* Corridor Section 1: Title */}
      <div className="relative z-10 flex justify-center pt-16 pb-8">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-900 border-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.15)]'
        }`}>
          <div className="px-8 md:px-12 py-16">
            <div
              ref={titleAnimation.ref}
              className={`text-center ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
            >
              <AnimatedTitle variant="glitch" className="text-5xl md:text-6xl mb-6">
                {t('skills.advanced.title')}
              </AnimatedTitle>
              <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
                {t('skills.advanced.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corridor Section 2: What I Can Do For You + Why Choose Me */}
      <div className="relative z-10 flex justify-center py-8">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-900 border-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.15)]'
        }`}>
          <div className="px-8 md:px-12 py-16">
            {/* What I Can Do For You Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
              {t('skills.whatCanDo.title')}
            </h2>
            <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
              {t('skills.whatCanDo.subtitle')}
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full System Architecture */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300 hover:border-purple-400'
                  : 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-600/60 hover:border-purple-500/70'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">🏗️</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  {t('skills.service1.title')}
                </h3>
                <p className="light-text opacity-80 mb-6">
                  {t('skills.service1.description')}
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service1.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service1.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service1.feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service1.feature4')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Optimization & Security */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 hover:border-emerald-400'
                  : 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-600/60 hover:border-emerald-500/70'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  {t('skills.service2.title')}
                </h3>
                <p className="light-text opacity-80 mb-6">
                  {t('skills.service2.description')}
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service2.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service2.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service2.feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service2.feature4')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Full DApp Development */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-300 hover:border-red-400'
                  : 'bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-600/60 hover:border-red-500/70'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  {t('skills.service3.title')}
                </h3>
                <p className="light-text opacity-80 mb-6">
                  {t('skills.service3.description')}
                </p>
                <ul className="space-y-3 light-text">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service3.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service3.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service3.feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{t('skills.service3.feature4')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Me */}
          <motion.div
            className={`relative p-10 rounded-2xl border backdrop-blur-md text-center mt-16 ${
              theme === 'theme-light'
                ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-purple-300'
                : 'bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 border-purple-600/60'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold light-text mb-6">
              {t('skills.whyChoose.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="text-lg font-semibold light-text mb-2">{t('skills.whyChoose.experience')}</h4>
                <p className="text-sm light-text opacity-80">{t('skills.whyChoose.experienceDesc')}</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="text-lg font-semibold light-text mb-2">{t('skills.whyChoose.security')}</h4>
                <p className="text-sm light-text opacity-80">{t('skills.whyChoose.securityDesc')}</p>
              </div>
              <div>
                <div className="text-4xl mb-3">💡</div>
                <h4 className="text-lg font-semibold light-text mb-2">{t('skills.whyChoose.innovation')}</h4>
                <p className="text-sm light-text opacity-80">{t('skills.whyChoose.innovationDesc')}</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-lg font-semibold light-text mb-2">{t('skills.whyChoose.client')}</h4>
                <p className="text-sm light-text opacity-80">{t('skills.whyChoose.clientDesc')}</p>
              </div>
            </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Corridor Section 3: Skills Matrix */}
      <div className="relative z-10 flex justify-center py-8">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-900 border-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.15)]'
        }`}>
          <div className="px-8 md:px-12 py-12">
            <SkillsTable />
          </div>
        </div>
      </div>

      {/* Corridor Section 4: My Tech Stack */}
      <div className="relative z-10 flex justify-center py-8">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-900 border-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.15)]'
        }`}>
          <div className="px-8 md:px-12 py-12">
            <TechRiver />
          </div>
        </div>
      </div>

      {/* Corridor Section 5: Technical Expertise + Community Contributions */}
      <div className="relative z-10 flex justify-center pt-8 pb-16">
        <div className={`w-full max-w-6xl mx-4 rounded-2xl shadow-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-white border-gray-300'
            : 'bg-slate-900 border-slate-500 shadow-[0_0_30px_rgba(148,163,184,0.15)]'
        }`}>
          <div className="px-8 md:px-12 py-16">
            {/* Themed Skills Sections */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
                  {t('skills.expertise.title')}
                </h2>
                <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
                  {t('skills.expertise.subtitle')}
                </p>
              </div>

              <PremiumSkillSections categories={[
                skillCategories.find(cat => cat.id === 'web-development')!,
                skillCategories.find(cat => cat.id === 'smart-contracts')!,
                skillCategories.find(cat => cat.id === 'security')!,
                skillCategories.find(cat => cat.id === 'defi')!,
                skillCategories.find(cat => cat.id === 'layer2')!
              ]} />
            </div>

            {/* Community Contributions Section */}
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold light-text mb-6">
                  {t('community.title')}
                </h2>
                <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
                  {t('community.subtitle')}
                </p>
              </div>

              <LiveStackExchangeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}