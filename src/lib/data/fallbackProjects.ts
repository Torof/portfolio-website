import { Project } from '../types';

// Fallback projects in case GitHub API fails
export const fallbackProjects: Project[] = [
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description: "Full-stack NFT marketplace with custodial model",
    longDescription: "A complete NFT marketplace implementation using Solidity smart contracts with custodial features for enhanced security and user experience. Features include minting, trading, and collection management.",
    thumbnail: "/screenshots/solidity-default.svg",
    technologies: ["Solidity", "React", "Next.js", "TypeScript", "ERC721"],
    githubUrl: "https://github.com/Torof/NFT-Marketplace",
    featured: true
  },
  {
    id: "uniswap-v2-rebuild",
    title: "Uniswap V2 Rebuild", 
    description: "Modern Uniswap V2 implementation with Solidity 0.8.20",
    longDescription: "Updated version of Uniswap V2 using latest Solidity version, incorporating best practices, security improvements, and modern development standards.",
    thumbnail: "/screenshots/solidity-default.svg",
    technologies: ["Solidity", "DeFi", "Foundry", "Smart Contracts"],
    githubUrl: "https://github.com/Torof/uniswap-v2-rebuild",
    featured: true
  },
  {
    id: "erc721-research",
    title: "ERC721 Research",
    description: "Advanced ERC721 implementation with staking mechanics",
    longDescription: "Research project exploring ERC721 standards with integrated staking mechanisms. Includes gas optimizations and advanced token utility features.",
    thumbnail: "/screenshots/solidity-default.svg",
    technologies: ["Solidity", "ERC721", "NFT", "Staking"],
    githubUrl: "https://github.com/Torof/ERC721-research",
    featured: true
  },
  {
    id: "aatba-hackathon",
    title: "AATBA ETH Global Hackathon",
    description: "Profile verification app using NFTs and Token Bound Accounts",
    longDescription: "Innovative profile and credential verification application built for ETH Global hackathon. Uses NFTs and Token Bound Account (ERC-6551) for decentralized identity management.",
    thumbnail: "/screenshots/web-default.svg",
    technologies: ["TypeScript", "React", "Solidity", "ERC-6551", "NFT"],
    githubUrl: "https://github.com/Torof/AATBA-ETH-Global-Hackathon",
    featured: true
  }
];