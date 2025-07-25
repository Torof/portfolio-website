import { educations } from '../education';
import { Education } from '../../types';

describe('education', () => {
  it('should be an array', () => {
    expect(Array.isArray(educations)).toBe(true);
  });

  it('should have education entries', () => {
    expect(educations.length).toBeGreaterThan(0);
  });

  it('should have valid Education structure', () => {
    educations.forEach((edu: Education) => {
      // Required fields
      expect(edu).toHaveProperty('id');
      expect(edu).toHaveProperty('institution');
      expect(edu).toHaveProperty('degree');
      expect(edu).toHaveProperty('field');
      expect(edu).toHaveProperty('startDate');
      expect(edu).toHaveProperty('endDate');

      // Type checks
      expect(typeof edu.id).toBe('string');
      expect(typeof edu.institution).toBe('string');
      expect(typeof edu.degree).toBe('string');
      expect(typeof edu.field).toBe('string');
      expect(typeof edu.startDate).toBe('string');
      expect(typeof edu.endDate).toBe('string');
    });
  });

  it('should have unique IDs', () => {
    const ids = educations.map(edu => edu.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have non-empty required fields', () => {
    educations.forEach((edu: Education) => {
      expect(edu.id.trim()).not.toBe('');
      expect(edu.institution.trim()).not.toBe('');
      expect(edu.degree.trim()).not.toBe('');
      expect(edu.field.trim()).not.toBe('');
      expect(edu.startDate.trim()).not.toBe('');
      expect(edu.endDate.trim()).not.toBe('');
    });
  });

  it('should have valid date formats', () => {
    const dateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$|^Present$|^\d{4}$/;
    
    educations.forEach((edu: Education) => {
      expect(dateRegex.test(edu.startDate)).toBe(true);
      expect(dateRegex.test(edu.endDate)).toBe(true);
    });
  });

  it('should have valid optional fields when present', () => {
    educations.forEach((edu: Education) => {
      if (edu.description) {
        expect(typeof edu.description).toBe('string');
        expect(edu.description.trim()).not.toBe('');
      }
      
      if (edu.skills) {
        expect(Array.isArray(edu.skills)).toBe(true);
        edu.skills.forEach(skill => {
          expect(typeof skill).toBe('string');
          expect(skill.trim()).not.toBe('');
        });
      }
      
      if (edu.logo) {
        expect(typeof edu.logo).toBe('string');
        expect(edu.logo).toMatch(/^\/.*\.(svg|png|jpg|jpeg|webp|ico)$/i);
      }
      
      if (edu.website) {
        expect(typeof edu.website).toBe('string');
        expect(() => new URL(edu.website!)).not.toThrow();
      }
    });
  });

  it('should include blockchain or technology-related education', () => {
    const hasBlockchainEducation = educations.some(edu => {
      const text = `${edu.degree} ${edu.field} ${edu.description || ''}`.toLowerCase();
      return text.includes('blockchain') || 
             text.includes('crypto') || 
             text.includes('technology') ||
             text.includes('computer') ||
             text.includes('software') ||
             text.includes('development');
    });
    
    expect(hasBlockchainEducation).toBe(true);
  });
});