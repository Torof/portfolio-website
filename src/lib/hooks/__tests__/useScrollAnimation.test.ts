import { renderHook } from '@testing-library/react';
import { useScrollAnimation, getAnimationClass } from '../useScrollAnimation';

describe('useScrollAnimation', () => {
  it('should return ref and isVisible state', () => {
    const { result } = renderHook(() => useScrollAnimation<HTMLDivElement>());

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isVisible).toBe('boolean');
    expect(result.current.isVisible).toBe(false);
  });

  it('should accept options with default values', () => {
    const { result } = renderHook(() => 
      useScrollAnimation<HTMLDivElement>({ threshold: 0.5, delay: 200 })
    );

    expect(result.current.ref).toBeDefined();
    expect(result.current.isVisible).toBe(false);
  });

  it('should work without options', () => {
    const { result } = renderHook(() => useScrollAnimation<HTMLDivElement>());

    expect(result.current.ref).toBeDefined();
    expect(result.current.isVisible).toBe(false);
  });
});

describe('getAnimationClass', () => {
  it('should return default class when not visible', () => {
    const result = getAnimationClass(false, 'fadeIn');
    expect(result).toBe('animate-on-scroll');
  });

  it('should return animation class when visible', () => {
    const result = getAnimationClass(true, 'fadeIn');
    expect(result).toBe('animate-fadeIn');
  });

  it('should handle different animation names', () => {
    expect(getAnimationClass(true, 'slideUp')).toBe('animate-slideUp');
    expect(getAnimationClass(true, 'zoomIn')).toBe('animate-zoomIn');
    expect(getAnimationClass(true, 'fadeInLeft')).toBe('animate-fadeInLeft');
  });
});