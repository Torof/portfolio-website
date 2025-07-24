"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import AnimatedTitle from "./AnimatedTitle";
import MatrixRain from "./MatrixRain";
import { useLanguage } from "@/lib/context/LanguageContext";

interface Skill {
  key: string;
  icon?: string;
}

interface SkillsData {
  hard: Skill[];
  soft: Skill[];
  mad: Skill[];
}

const skillsData: SkillsData = {
  hard: [
    { key: "skills.solidity", icon: "⚡" },
    { key: "skills.react", icon: "⚛️" },
    { key: "skills.typescript", icon: "📘" },
    { key: "skills.vibeCoding", icon: "💻" },
    { key: "skills.web3", icon: "🔗" },
    { key: "skills.nodejs", icon: "🟢" },
    { key: "skills.hardhat", icon: "🔨" },
    { key: "skills.git", icon: "📚" },
  ],
  soft: [
    { key: "skills.listening", icon: "👂" },
    { key: "skills.motivation", icon: "💪" },
    { key: "skills.leadership", icon: "🤲" },
    { key: "skills.problemSolving", icon: "🧩" },
    { key: "skills.collaboration", icon: "🤝" },
    { key: "skills.communication", icon: "💬" },
    { key: "skills.adaptability", icon: "🔄" },
    { key: "skills.criticalThinking", icon: "🤔" },
  ],
  mad: [
    { key: "skills.canyoning", icon: "🏔️" },
    { key: "skills.climbing", icon: "🧗" },
    { key: "skills.paragliding", icon: "🪂" },
    { key: "skills.hiking", icon: "🥾" },
    { key: "skills.lateNightCoding", icon: "🌙" },
    { key: "skills.hackathons", icon: "🏴‍☠️" },
    { key: "skills.auditing", icon: "🔍" },
    { key: "skills.gasOptimization", icon: "⛽" },
  ],
};

export default function SkillsTable() {
  const { t } = useLanguage();
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const tableAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section section-bg-primary relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      <div className="container-custom relative z-10">
        <div 
          ref={titleAnimation.ref}
          className={`flex justify-center mb-12 ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
        >
          <AnimatedTitle variant="glitch" className="text-4xl md:text-5xl text-center">
            {t('skills.matrix')}
          </AnimatedTitle>
        </div>

        <motion.div
          ref={tableAnimation.ref}
          variants={containerVariants}
          initial="hidden"
          animate={tableAnimation.isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Hard Skills */}
          <motion.div
            variants={columnVariants}
            className="relative p-6 rounded-xl bg-gradient-to-br from-[rgba(79,70,229,0.2)] to-[rgba(139,92,246,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] group hover:border-[rgba(79,70,229,0.4)] transition-all duration-300"
          >
            <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] rounded-full">
              <h3 className="text-lg font-semibold text-white pixel-font">{t('skills.hard').toUpperCase().replace(/ /g, '_')}</h3>
            </div>
            <div className="absolute top-4 right-4 text-3xl opacity-40 group-hover:opacity-70 transition-all duration-300 group-hover:scale-105">
              💪
            </div>
            <motion.ul className="space-y-3 mt-6">
              {skillsData.hard.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 group/item"
                >
                  <span className="text-xl mr-3 group-hover/item:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  {skill.key === "skills.vibeCoding" ? (
                    <Link
                      href="/vibe-coding"
                      className="text-sm light-text font-mono tracking-wide hover:text-[var(--primary-400)] transition-colors cursor-pointer"
                    >
                      {t(skill.key)}
                    </Link>
                  ) : (
                    <span className="text-sm light-text font-mono tracking-wide">{t(skill.key)}</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            variants={columnVariants}
            className="relative p-6 rounded-xl bg-gradient-to-br from-[rgba(139,92,246,0.2)] to-[rgba(6,182,212,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] group hover:border-[rgba(139,92,246,0.4)] transition-all duration-300"
          >
            <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-[var(--secondary-400)] to-[var(--secondary-500)] rounded-full">
              <h3 className="text-lg font-semibold text-white pixel-font">{t('skills.soft').toUpperCase().replace(/ /g, '_')}</h3>
            </div>
            <div className="absolute top-4 right-4 text-3xl opacity-40 group-hover:opacity-70 transition-all duration-300 group-hover:scale-105">
              🌟
            </div>
            <motion.ul className="space-y-3 mt-6">
              {skillsData.soft.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 group/item"
                >
                  <span className="text-xl mr-3 group-hover/item:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="text-sm light-text font-mono tracking-wide">{t(skill.key)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Mad Skills */}
          <motion.div
            variants={columnVariants}
            className="relative p-6 rounded-xl bg-gradient-to-br from-[rgba(6,182,212,0.2)] to-[rgba(236,72,153,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] group hover:border-[rgba(6,182,212,0.4)] transition-all duration-300"
          >
            <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-pink)] rounded-full">
              <h3 className="text-lg font-semibold text-white pixel-font">{t('skills.mad').toUpperCase().replace(/ /g, '_')}</h3>
            </div>
            <div className="absolute top-4 right-4 text-3xl opacity-40 group-hover:opacity-70 transition-all duration-300 group-hover:scale-105">
              🎯
            </div>
            <motion.ul className="space-y-3 mt-6">
              {skillsData.mad.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 group/item"
                >
                  <span className="text-xl mr-3 group-hover/item:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="text-sm light-text font-mono tracking-wide">{t(skill.key)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[var(--primary-400)] to-[var(--secondary-400)] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-pink)] rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
}