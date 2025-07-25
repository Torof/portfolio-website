import { experiences } from '../experiences';
import { Experience } from '../../types';

describe('experiences', () => {
  it('should be an array', () => {
    expect(Array.isArray(experiences)).toBe(true);
  });

  it('should have experience entries', () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it('should have valid Experience structure', () => {
    experiences.forEach((exp: Experience) => {
      // Required fields
      expect(exp).toHaveProperty('id');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('position');
      expect(exp).toHaveProperty('startDate');
      expect(exp).toHaveProperty('endDate');
      expect(exp).toHaveProperty('description');
      expect(exp).toHaveProperty('achievements');
      expect(exp).toHaveProperty('skills');

      // Type checks
      expect(typeof exp.id).toBe('string');
      expect(typeof exp.company).toBe('string');
      expect(typeof exp.position).toBe('string');
      expect(typeof exp.startDate).toBe('string');
      expect(typeof exp.endDate).toBe('string');
      expect(typeof exp.description).toBe('string');
      expect(Array.isArray(exp.achievements)).toBe(true);
      expect(Array.isArray(exp.skills)).toBe(true);
    });
  });

  it('should have unique IDs', () => {
    const ids = experiences.map(exp => exp.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have non-empty required fields', () => {
    experiences.forEach((exp: Experience) => {
      expect(exp.id.trim()).not.toBe('');
      expect(exp.company.trim()).not.toBe('');
      expect(exp.position.trim()).not.toBe('');
      expect(exp.startDate.trim()).not.toBe('');
      expect(exp.endDate.trim()).not.toBe('');
      expect(exp.description.trim()).not.toBe('');
    });
  });

  it('should have achievements and skills arrays with content', () => {
    experiences.forEach((exp: Experience) => {
      expect(exp.achievements.length).toBeGreaterThan(0);
      expect(exp.skills.length).toBeGreaterThan(0);
      
      exp.achievements.forEach(achievement => {
        expect(typeof achievement).toBe('string');
        expect(achievement.trim()).not.toBe('');
      });
      
      exp.skills.forEach(skill => {
        expect(typeof skill).toBe('string');
        expect(skill.trim()).not.toBe('');
      });
    });
  });

  it('should have valid date formats', () => {
    const dateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$|^Present$|^\d{4}$/;
    
    experiences.forEach((exp: Experience) => {
      expect(dateRegex.test(exp.startDate)).toBe(true);
      expect(dateRegex.test(exp.endDate)).toBe(true);
    });
  });

  it('should have valid optional fields when present', () => {
    experiences.forEach((exp: Experience) => {
      if (exp.logo) {
        expect(typeof exp.logo).toBe('string');
        expect(exp.logo).toMatch(/^\/.*\.(svg|png|jpg|jpeg|webp|ico)$/i);
      }
      
      if (exp.type) {
        expect(['work', 'hackathon']).toContain(exp.type);
      }
      
      if (exp.website) {
        expect(typeof exp.website).toBe('string');
        expect(() => new URL(exp.website!)).not.toThrow();
      }
    });
  });
});