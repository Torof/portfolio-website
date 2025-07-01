import { Project } from '../types';
import { GitHubRepository, fetchGitHubRepositories, fetchRepositoryLanguages } from './github';
import { fallbackProjects } from '../data/fallbackProjects';

/**
 * Technology mapping for better display names
 */
const TECH_MAPPING: Record<string, string> = {
  'TypeScript': 'TypeScript',
  'JavaScript': 'JavaScript',
  'Solidity': 'Solidity',
  'Rust': 'Rust',
  'Python': 'Python',
  'Go': 'Go',
  'HTML': 'HTML',
  'CSS': 'CSS',
  'SCSS': 'SCSS',
  'Vue': 'Vue.js',
  'Svelte': 'Svelte',
  'Shell': 'Shell',
  'Dockerfile': 'Docker',
  'HCL': 'Terraform',
  'Makefile': 'Make'
};

/**
 * Featured repositories (pinned or high priority)
 */
const FEATURED_REPOS = [
  'NFT-Marketplace',
  'ERC721-research',
  'Uniswap_V2_rebuild', 
  'AATBA-ETH-Global-Hackathon',
  'rareskills-challenges',
  'solidity-riddles',
  'SolTix'
];

/**
 * Generate thumbnail path based on repository data
 */
function generateThumbnail(repo: GitHubRepository): string {
  // Use repository-specific screenshots if available
  const screenshotMap: Record<string, string> = {
    'NFT-Marketplace': '/screenshots/nft-marketplace.png',
    'Uniswap_V2_rebuild': '/screenshots/uniswap-v2.png',
    'AATBA-ETH-Global-Hackathon': '/screenshots/aatba.png'
  };
  
  if (screenshotMap[repo.name]) {
    return screenshotMap[repo.name];
  }
  
  // Default based on primary language or topics
  const language = repo.language?.toLowerCase();
  const topics = repo.topics.join(' ').toLowerCase();
  
  if (language === 'solidity' || topics.includes('solidity') || topics.includes('smart-contract')) {
    return '/screenshots/solidity-default.svg';
  } else if (language === 'typescript' || language === 'javascript' || topics.includes('react') || topics.includes('nextjs')) {
    return '/screenshots/web-default.svg';
  } else if (language === 'rust') {
    return '/screenshots/rust-default.svg';
  } else if (language === 'python') {
    return '/screenshots/python-default.svg';
  }
  
  return '/screenshots/code-default.svg';
}

/**
 * Generate enhanced description for specific repositories
 */
function generateDescription(repo: GitHubRepository, language: string = 'en'): { description: string; longDescription?: string } {
  const baseDescription = repo.description || (language === 'fr' ? 'Aucune description disponible' : 'No description available');
  
  // Enhanced descriptions for key repositories
  const enhancedDescriptions: Record<string, { 
    en: { description: string; longDescription: string },
    fr: { description: string; longDescription: string }
  }> = {
    'NFT-Marketplace': {
      en: {
        description: 'Full-stack NFT marketplace with custodial model',
        longDescription: 'A complete NFT marketplace implementation using Solidity smart contracts with custodial features for enhanced security and user experience. Features include minting, trading, and collection management.'
      },
      fr: {
        description: 'Marketplace NFT complet avec modèle de garde',
        longDescription: 'Une implémentation complète de marketplace NFT utilisant des smart contracts Solidity avec des fonctionnalités de garde pour une sécurité et une expérience utilisateur améliorées. Inclut le minting, le trading et la gestion de collections.'
      }
    },
    'ERC721-research': {
      en: {
        description: 'Advanced ERC721 implementation with staking mechanics',
        longDescription: 'Research project exploring ERC721 standards with integrated staking mechanisms. Includes gas optimizations and advanced token utility features.'
      },
      fr: {
        description: 'Implémentation ERC721 avancée avec mécaniques de staking',
        longDescription: 'Projet de recherche explorant les standards ERC721 avec des mécanismes de staking intégrés. Inclut des optimisations de gas et des fonctionnalités utilitaires de token avancées.'
      }
    },
    'Uniswap_V2_rebuild': {
      en: {
        description: 'Modern Uniswap V2 implementation with Solidity 0.8.20',
        longDescription: 'Updated version of Uniswap V2 using latest Solidity version, incorporating best practices, security improvements, and modern development standards.'
      },
      fr: {
        description: 'Implémentation moderne d\'Uniswap V2 avec Solidity 0.8.20',
        longDescription: 'Version mise à jour d\'Uniswap V2 utilisant la dernière version de Solidity, incorporant les meilleures pratiques, améliorations de sécurité et standards de développement modernes.'
      }
    },
    'AATBA-ETH-Global-Hackathon': {
      en: {
        description: 'Profile verification app using NFTs and Token Bound Accounts',
        longDescription: 'Innovative profile and credential verification application built for ETH Global hackathon. Uses NFTs and Token Bound Account (ERC-6551) for decentralized identity management.'
      },
      fr: {
        description: 'App de vérification de profil avec NFTs et Token Bound Accounts',
        longDescription: 'Application innovante de vérification de profil et de credentials construite pour le hackathon ETH Global. Utilise les NFTs et Token Bound Account (ERC-6551) pour la gestion d\'identité décentralisée.'
      }
    },
    'rareskills-challenges': {
      en: {
        description: 'Advanced Solidity challenges and solutions',
        longDescription: 'Collection of advanced Solidity programming challenges covering DeFi protocols, gas optimizations, security patterns, and complex smart contract architectures.'
      },
      fr: {
        description: 'Défis Solidity avancés et solutions',
        longDescription: 'Collection de défis de programmation Solidity avancés couvrant les protocoles DeFi, optimisations de gas, patterns de sécurité et architectures de smart contracts complexes.'
      }
    },
    'SolTix': {
      en: {
        description: 'Blockchain-based ticketing and event management system',
        longDescription: 'Decentralized ticketing platform built with Solidity smart contracts, enabling secure ticket creation, transfer, and validation with anti-fraud mechanisms and NFT integration.'
      },
      fr: {
        description: 'Système de billetterie et gestion d\'événements blockchain',
        longDescription: 'Plateforme de billetterie décentralisée construite avec des smart contracts Solidity, permettant la création, le transfert et la validation sécurisés de tickets avec mécanismes anti-fraude et intégration NFT.'
      }
    }
  };
  
  if (enhancedDescriptions[repo.name]) {
    const langDescriptions = enhancedDescriptions[repo.name][language as 'en' | 'fr'] || enhancedDescriptions[repo.name].en;
    return langDescriptions;
  }
  
  return { description: baseDescription };
}

/**
 * Extract technologies from repository
 */
async function extractTechnologies(repo: GitHubRepository): Promise<string[]> {
  const technologies: Set<string> = new Set();
  
  // Add primary language
  if (repo.language && TECH_MAPPING[repo.language]) {
    technologies.add(TECH_MAPPING[repo.language]);
  }
  
  // Add from topics
  repo.topics.forEach(topic => {
    const normalizedTopic = topic.toLowerCase();
    if (normalizedTopic.includes('react')) technologies.add('React');
    if (normalizedTopic.includes('nextjs') || normalizedTopic.includes('next-js')) technologies.add('Next.js');
    if (normalizedTopic.includes('tailwind')) technologies.add('TailwindCSS');
    if (normalizedTopic.includes('solidity')) technologies.add('Solidity');
    if (normalizedTopic.includes('ethereum')) technologies.add('Ethereum');
    if (normalizedTopic.includes('defi')) technologies.add('DeFi');
    if (normalizedTopic.includes('nft')) technologies.add('NFT');
    if (normalizedTopic.includes('erc721')) technologies.add('ERC721');
    if (normalizedTopic.includes('erc20')) technologies.add('ERC20');
    if (normalizedTopic.includes('hardhat')) technologies.add('Hardhat');
    if (normalizedTopic.includes('foundry')) technologies.add('Foundry');
    if (normalizedTopic.includes('wagmi')) technologies.add('wagmi');
    if (normalizedTopic.includes('ethers')) technologies.add('ethers.js');
  });
  
  // Try to fetch additional languages
  try {
    const languages = await fetchRepositoryLanguages(repo.name);
    Object.keys(languages).forEach(lang => {
      if (TECH_MAPPING[lang]) {
        technologies.add(TECH_MAPPING[lang]);
      }
    });
  } catch (error) {
    console.warn(`Could not fetch languages for ${repo.name}:`, error);
  }
  
  return Array.from(technologies).slice(0, 8); // Limit to 8 technologies
}

/**
 * URL mapping for repositories where API name differs from actual GitHub URL
 */
const REPO_URL_MAPPING: Record<string, string> = {
  'uniswap-v2-rebuild': 'https://github.com/Torof/Uniswap_V2_rebuild',
  'nft-marketplace': 'https://github.com/Torof/NFT_Marketplace'
};

/**
 * Transform GitHub repository to Project
 */
async function transformRepositoryToProject(repo: GitHubRepository, language: string = 'en'): Promise<Project> {
  const { description, longDescription } = generateDescription(repo, language);
  const technologies = await extractTechnologies(repo);
  
  // Use custom URL mapping if it exists, otherwise use the API's html_url
  const githubUrl = REPO_URL_MAPPING[repo.name.toLowerCase()] || repo.html_url;
  
  return {
    id: `github-${repo.id}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description,
    longDescription,
    thumbnail: generateThumbnail(repo),
    technologies,
    githubUrl,
    liveUrl: repo.homepage || undefined,
    featured: FEATURED_REPOS.includes(repo.name)
  };
}

/**
 * Fetch and transform all GitHub repositories to projects
 */
export async function fetchProjectsFromGitHub(language: string = 'en'): Promise<Project[]> {
  try {
    console.log('Fetching projects from GitHub...');
    const repositories = await fetchGitHubRepositories();
    
    if (repositories.length === 0) {
      console.warn('No repositories found, using fallback data');
      return fallbackProjects;
    }
    
    console.log(`Found ${repositories.length} repositories`);
    
    // Transform repositories to projects
    const projects = await Promise.all(
      repositories.map(repo => transformRepositoryToProject(repo, language))
    );
    
    // Sort by featured first, then by stars, then by update date
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // For repositories, we'd need to access the original repo data for sorting
      // For now, just keep the GitHub API order (sorted by updated)
      return 0;
    });
    
  } catch (error) {
    console.error('Error fetching projects from GitHub:', error);
    console.log('Using fallback projects');
    return fallbackProjects;
  }
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(language: string = 'en'): Promise<Project[]> {
  // Use the exact same function as the project page - no filtering
  return await fetchProjectsFromGitHub(language);
}