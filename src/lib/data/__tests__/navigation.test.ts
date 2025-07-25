import { navLinks } from '../navigation';
import { NavLink } from '../../types';

describe('navLinks', () => {
  it('should be an array', () => {
    expect(Array.isArray(navLinks)).toBe(true);
  });

  it('should have navigation items', () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have valid NavLink structure', () => {
    navLinks.forEach((link: NavLink) => {
      expect(link).toHaveProperty('name');
      expect(link).toHaveProperty('path');
      
      expect(typeof link.name).toBe('string');
      expect(typeof link.path).toBe('string');
    });
  });

  it('should have valid paths', () => {
    navLinks.forEach((link: NavLink) => {
      expect(link.path).toMatch(/^\/[a-z-]*$/);
    });
  });

  it('should have unique paths', () => {
    const paths = navLinks.map(link => link.path);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(paths.length);
  });

  it('should have non-empty names', () => {
    navLinks.forEach((link: NavLink) => {
      expect(link.name.trim()).not.toBe('');
    });
  });

  it('should include common navigation items', () => {
    const paths = navLinks.map(link => link.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/experience');
    expect(paths).toContain('/projects');
  });
});