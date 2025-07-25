import { skills } from '../skills';
import { Skill } from '../../types';

describe('skills', () => {
  it('should be an array', () => {
    expect(Array.isArray(skills)).toBe(true);
  });

  it('should have skill entries', () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it('should have valid Skill structure', () => {
    skills.forEach((skill: Skill) => {
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('level');
      expect(skill).toHaveProperty('category');

      expect(typeof skill.name).toBe('string');
      expect(typeof skill.level).toBe('number');
      expect(typeof skill.category).toBe('string');
    });
  });

  it('should have valid skill levels (1-5)', () => {
    skills.forEach((skill: Skill) => {
      expect(skill.level).toBeGreaterThanOrEqual(1);
      expect(skill.level).toBeLessThanOrEqual(5);
    });
  });

  it('should have valid categories', () => {
    const validCategories = ['blockchain', 'frontend', 'backend', 'languages', 'tools', 'other'];
    
    skills.forEach((skill: Skill) => {
      expect(validCategories).toContain(skill.category);
    });
  });

  it('should have non-empty skill names', () => {
    skills.forEach((skill: Skill) => {
      expect(skill.name.trim()).not.toBe('');
    });
  });

  it('should have blockchain skills as the highest category representation', () => {
    const blockchainSkills = skills.filter(skill => skill.category === 'blockchain');
    expect(blockchainSkills.length).toBeGreaterThan(0);
    
    // Should have core blockchain skills
    const skillNames = blockchainSkills.map(skill => skill.name.toLowerCase());
    expect(skillNames.some(name => name.includes('solidity'))).toBe(true);
  });

  it('should have diverse skill levels', () => {
    const levels = skills.map(skill => skill.level);
    const uniqueLevels = new Set(levels);
    
    // Should have more than just one skill level
    expect(uniqueLevels.size).toBeGreaterThan(1);
  });

  it('should include essential web development skills', () => {
    const skillNames = skills.map(skill => skill.name.toLowerCase());
    
    // Should include common frontend/backend technologies
    const hasJavaScript = skillNames.some(name => name.includes('javascript'));
    const hasTypeScript = skillNames.some(name => name.includes('typescript'));
    const hasReact = skillNames.some(name => name.includes('react'));
    
    expect(hasJavaScript || hasTypeScript).toBe(true);
    expect(hasReact).toBe(true);
  });

  it('should have optional icon field when present', () => {
    skills.forEach((skill: Skill) => {
      if (skill.icon) {
        expect(typeof skill.icon).toBe('string');
        expect(skill.icon.trim()).not.toBe('');
      }
    });
  });
});