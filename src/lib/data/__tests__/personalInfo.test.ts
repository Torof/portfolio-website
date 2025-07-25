import { personalInfo, socialLinks } from '../personalInfo';
import { SocialLink } from '../../types';

describe('personalInfo', () => {
  it('should have all required fields', () => {
    expect(personalInfo).toHaveProperty('name');
    expect(personalInfo).toHaveProperty('title');
    expect(personalInfo).toHaveProperty('email');
    expect(personalInfo).toHaveProperty('location');
    expect(personalInfo).toHaveProperty('bio');
    expect(personalInfo).toHaveProperty('profileImage');
    expect(personalInfo).toHaveProperty('startedBlockchain');
  });

  it('should have valid data types', () => {
    expect(typeof personalInfo.name).toBe('string');
    expect(typeof personalInfo.title).toBe('string');
    expect(typeof personalInfo.email).toBe('string');
    expect(typeof personalInfo.location).toBe('string');
    expect(typeof personalInfo.bio).toBe('string');
    expect(typeof personalInfo.profileImage).toBe('string');
    expect(typeof personalInfo.startedBlockchain).toBe('string');
  });

  it('should have valid email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(personalInfo.email)).toBe(true);
  });

  it('should have valid profile image path', () => {
    expect(personalInfo.profileImage).toMatch(/^\/.*\.(jpg|jpeg|png|webp)$/i);
  });

  it('should have a valid blockchain start year', () => {
    const year = parseInt(personalInfo.startedBlockchain);
    expect(year).toBeGreaterThan(2000);
    expect(year).toBeLessThanOrEqual(new Date().getFullYear());
  });
});

describe('socialLinks', () => {
  it('should be an array', () => {
    expect(Array.isArray(socialLinks)).toBe(true);
  });

  it('should have at least one social link', () => {
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should have valid SocialLink structure', () => {
    socialLinks.forEach((link: SocialLink) => {
      expect(link).toHaveProperty('platform');
      expect(link).toHaveProperty('url');
      expect(link).toHaveProperty('icon');
      
      expect(typeof link.platform).toBe('string');
      expect(typeof link.url).toBe('string');
      expect(typeof link.icon).toBe('string');
    });
  });

  it('should have valid URLs', () => {
    socialLinks.forEach((link: SocialLink) => {
      expect(() => new URL(link.url)).not.toThrow();
    });
  });

  it('should include common platforms', () => {
    const platforms = socialLinks.map(link => link.platform.toLowerCase());
    expect(platforms).toContain('github');
    expect(platforms).toContain('linkedin');
  });
});