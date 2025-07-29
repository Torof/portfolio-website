export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    skills: string[];
    logo?: string;
    type?: 'work' | 'hackathon';
    website?: string;
  }
  
  export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description?: string;
    skills?: string[];
    logo?: string;
    website?: string;
  }
  
  export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    description?: string;
    skills?: string[];
    url?: string;
    logo?: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    thumbnail: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
  }
  
  export interface Skill {
    name: string;
    level: number; // 1-5
    category: 'blockchain' | 'frontend' | 'backend' | 'languages' | 'tools' | 'other';
    icon?: string;
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
  }
  
  export interface NavLink {
    name: string;
    path: string;
  }

  export interface TechItem {
    name: string;
    logo: string;
  }
  
  export interface TechStack {
    blockchain: TechItem[];
    frontend: TechItem[];
    backend: TechItem[];
  }

  // Extended Skills for comprehensive skills page
  export interface AdvancedSkill {
    id: string;
    name: string;
    description: string;
    level: 1 | 2 | 3 | 4 | 5; // Expert level
    category: 'smart-contracts' | 'defi' | 'layer2' | 'security' | 'development' | 'auditing';
    subcategory?: string;
    icon?: string;
    examples?: string[];
    projects?: string[];
  }

  export interface SkillCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    skills: AdvancedSkill[];
    color: string;
  }

  // Stack Overflow Integration
  export interface StackOverflowProfile {
    userId: string;
    displayName: string;
    profileImage: string;
    reputation: number;
    badges: {
      gold: number;
      silver: number;
      bronze: number;
    };
    topTags: string[];
    profileUrl: string;
  }

  export interface StackOverflowAnswer {
    id: string;
    questionTitle: string;
    questionUrl: string;
    answerUrl: string;
    score: number;
    isAccepted: boolean;
    excerpt: string;
    tags: string[];
  }