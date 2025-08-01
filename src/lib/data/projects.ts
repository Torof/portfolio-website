import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "project-1",
    title: "NFT Staking Platform",
    description: "A platform for staking NFTs to earn ERC20 tokens",
    longDescription: "Developed a smart contract for staking NFTs that has successfully minted over 21 million ERC20 tokens and currently holding 1400+ NFTs in staking.",
    thumbnail: '/projects/nft-staking.jpg',
    technologies: ["Solidity", "ERC721", "ERC20", "React", "Hardhat"],
    githubUrl: "https://github.com/Torof/nft-staking",
    featured: true
  },
  {
    id: "project-2", 
    title: "DeFi Yield Aggregator",
    description: "A DeFi application that optimizes yield farming across multiple protocols",
    longDescription: "Built a smart contract system that automatically allocates funds across different DeFi protocols to maximize yields while minimizing gas costs and risks.",
    thumbnail: '/projects/defi-yield.jpg',
    technologies: ["Solidity", "DeFi", "Foundry", "Next.js", "TypeScript"],
    githubUrl: "https://github.com/Torof/defi-yield",
    featured: true
  },
  {
    id: "project-3",
    title: "P2E Blockchain Game",
    description: "Play-to-Earn blockchain game with NFT characters and token rewards",
    longDescription: "Developed the smart contract infrastructure for a blockchain game that allows players to earn tokens by competing with NFT characters.",
    thumbnail: '/projects/p2e-game.jpg',
    technologies: ["Solidity", "ERC721", "ERC20", "Unity", "React"],
    githubUrl: "https://github.com/Torof/p2e-game",
    featured: true
  }
];