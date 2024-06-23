import { Skill } from '../types';

export const skills: Skill[] = [
  // Blockchain
  { name: "Solidity", level: 5, category: "blockchain" },
  { name: "Smart Contracts", level: 5, category: "blockchain" },
  { name: "EVM", level: 4, category: "blockchain" },
  { name: "DeFi", level: 4, category: "blockchain" },
  { name: "NFT", level: 5, category: "blockchain" },
  { name: "Foundry/Hardhat", level: 4, category: "blockchain" },
  { name: "opcodes", level: 3, category: "blockchain" },
  { name: "Rust", level: 2, category: "blockchain" },
  { name: "Solana", level: 2, category: "blockchain" },
  { name: "Polkadot", level: 2, category: "blockchain" },
  
  // Frontend
  { name: "Next.js", level: 4, category: "frontend" },
  { name: "React.js", level: 4, category: "frontend" },
  { name: "TypeScript", level: 4, category: "frontend" },
  { name: "JavaScript", level: 4, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 3, category: "backend" },
  
  // Tools
  { name: "Linux/Shell", level: 3, category: "tools" },
  { name: "Auditing", level: 4, category: "tools" },
  { name: "AI", level: 3, category: "tools" },
  
  // Languages
  { name: "English", level: 5, category: "languages" },
  { name: "French", level: 5, category: "languages" },
  { name: "Spanish", level: 4, category: "languages" }
];

// Learning in progress - not yet on CV
export const learning = [
  {
    name: "Rust",
    progress: 40, // percentage
    startedDate: "Jan 2025"
  },
  {
    name: "Solana",
    progress: 30,
    startedDate: "Feb 2025"
  },
  {
    name: "Polkadot",
    progress: 25,
    startedDate: "Mar 2025"
  }
];