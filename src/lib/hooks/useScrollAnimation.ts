'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0
}: UseScrollAnimationProps = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If delay is specified, wait before showing the element
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Once we've seen it, no need to keep observing
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}

export const getAnimationClass = (isVisible: boolean, animation: string): string => {
  return isVisible ? `animate-${animation}` : 'animate-on-scroll';
};