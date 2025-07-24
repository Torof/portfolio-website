'use client';

import Link from "next/link";
import { experiences } from "@/lib/data/experiences";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrollAnimation, getAnimationClass } from "@/lib/hooks/useScrollAnimation";
import AnimatedTitle from "./AnimatedTitle";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function ExperiencePreview() {
  const { t } = useLanguage();
  // Get recent experiences (latest 2)
  const recentExperiences = [...experiences].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  ).slice(0, 2);

  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  const card1Animation = useScrollAnimation({ threshold: 0.1, delay: 200 });
  const card2Animation = useScrollAnimation({ threshold: 0.1, delay: 400 });
  const buttonAnimation = useScrollAnimation({ threshold: 0.1, delay: 600 });

  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Handle scroll and mouse position
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress for parallax when section is in view
        if (top < viewportHeight && top + height > 0) {
          const scrollProgress = Math.max(0, Math.min(1, 1 - (top / (viewportHeight + height))));
          setScrollY(scrollProgress);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5, // -0.5 to 0.5
        y: (e.clientY / window.innerHeight) - 0.5 // -0.5 to 0.5
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial call
    handleScroll();
    handleResize();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Card hover states
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section 
      ref={sectionRef}
      className="section relative overflow-hidden"
      style={{ 
        minHeight: '80vh'
      }}
    >
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(2, 132, 199, 0.1) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
          backgroundPosition: `${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%`,
          transition: 'background-position 0.5s ease-out',
        }}
      />

      {/* Animated gradient shapes */}
      <motion.div
        className="absolute w-1/2 h-1/2 rounded-full blur-3xl opacity-10 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(56, 178, 248, 0.2) 0%, rgba(56, 178, 248, 0) 70%)',
          top: `${30 - scrollY * 10 - mousePosition.y * 5}%`,
          left: `${20 - scrollY * 5 + mousePosition.x * 10}%`,
          transition: 'top 0.3s ease-out, left 0.3s ease-out',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute w-1/3 h-1/3 rounded-full blur-3xl opacity-10 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0) 70%)',
          bottom: `${20 - scrollY * 10 + mousePosition.y * 5}%`,
          right: `${25 - scrollY * 5 - mousePosition.x * 10}%`,
          transition: 'bottom 0.3s ease-out, right 0.3s ease-out',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Grid pattern that reacts to scroll and mouse */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            )
          `,
          backgroundSize: `${40 + scrollY * 20}px ${40 + scrollY * 20}px`,
          backgroundPosition: `${mousePosition.x * 20}px ${mousePosition.y * 20}px`,
          transition: 'background-size 0.3s ease-out, background-position 0.3s ease-out',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="backdrop-blur-sm rounded-2xl p-8 glass-card">
          <div 
            ref={titleAnimation.ref}
            className={`text-center mb-14 ${getAnimationClass(titleAnimation.isVisible, 'fadeInUp')}`}
          >
            <AnimatedTitle 
              className="section-title text-5xl md:text-6xl font-black light-text tracking-tight"
              variant="neon"
            >
              {t('experience.recent')}
            </AnimatedTitle>
          </div>
        
        <div className="space-y-8">
          {recentExperiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              ref={index === 0 ? card1Animation.ref : card2Animation.ref}
              className={`
                relative overflow-hidden rounded-xl p-8 
                transition-all duration-500 
                border border-[rgba(255,255,255,0.08)]
                ${getAnimationClass(
                  index === 0 ? card1Animation.isVisible : card2Animation.isVisible, 
                  index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'
                )}
              `}
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(8px)',
                transform: `translateY(${
                  (index === 0 ? card1Animation.isVisible : card2Animation.isVisible) 
                    ? (-scrollY * 15 * (index + 1)) + 'px' 
                    : '20px'
                })`,
                opacity: (index === 0 ? card1Animation.isVisible : card2Animation.isVisible) ? 1 : 0,
                transition: 'transform 0.3s ease-out, opacity 0.5s ease-out, background 0.3s ease-out, box-shadow 0.3s ease-out',
                boxShadow: hoveredCard === exp.id 
                  ? '0 10px 30px rgba(2, 132, 199, 0.2)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Background gradient that reacts to hover */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  background: hoveredCard === exp.id
                    ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(56, 178, 248, 0.05))'
                    : 'linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.5))'
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Moving highlight border */}
              {hoveredCard === exp.id && (
                <motion.div
                  className="absolute inset-0 -z-5 rounded-xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(56, 178, 248, 0.1), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}

              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold light-text tracking-tight">{t(`exp.${exp.id}.position`)}</h3>
                  <p className="text-[var(--primary-400)] mb-2 text-lg font-medium">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.08)] text-[var(--dark-200)] text-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>
              
              <p className="mb-6 text-[var(--dark-200)] leading-relaxed text-base md:text-lg font-light">{t(`exp.${exp.id}.description`)}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.skills.slice(0, 5).map((skill) => (
                  <motion.span 
                    key={skill} 
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      background: 'rgba(2, 132, 199, 0.15)',
                      color: 'var(--primary-300)',
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      background: 'rgba(2, 132, 199, 0.25)',
                      color: 'white'
                    }}
                  >
                    {t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) !== `skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}` ? t(`skills.${skill.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`) : skill}
                  </motion.span>
                ))}
                {exp.skills.length > 5 && (
                  <motion.span 
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      background: 'rgba(124, 58, 237, 0.15)',
                      color: 'var(--secondary-300)',
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      background: 'rgba(124, 58, 237, 0.25)',
                      color: 'white'
                    }}
                  >
                    {t('experience.more', { count: exp.skills.length - 5 })}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div 
          ref={buttonAnimation.ref}
          className={`text-center mt-12 ${getAnimationClass(buttonAnimation.isVisible, 'fadeInUp')}`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/experience" 
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">{t('experience.viewFull')}</span>
              <motion.div
                className="absolute inset-0 -z-5"
                animate={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </Link>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}