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