import { getAssetUrl } from '../utils/assetLoader';

export interface TechItem {
  name: string;
  icon: string;
  logo: string;
}

export interface TechStackData {
  blockchain: TechItem[];
  frontend: TechItem[];
  backend: TechItem[];
}

export const techStack: TechStackData = {
  blockchain: [
    { name: 'Solidity', icon: '🔷', logo: getAssetUrl('/logos/solidity.svg') },
    { name: 'Hardhat', icon: '🔨', logo: getAssetUrl('/logos/hardhat.svg') },
    { name: 'Foundry', icon: '🛠️', logo: getAssetUrl('/logos/foundry.svg') },
    { name: 'Ethereum', icon: '⚡', logo: getAssetUrl('/logos/ethereum.svg') },
    { name: 'Solana', icon: '☀️', logo: getAssetUrl('/logos/solana.svg') },
    { name: 'Polkadot', icon: '⚫', logo: getAssetUrl('/logos/polkadot.svg') },
    { name: 'Rust', icon: '🦀', logo: getAssetUrl('/logos/rust.svg') }
  ],
  frontend: [
    { name: 'React', icon: '⚛️', logo: getAssetUrl('/logos/reactjs.svg') },
    { name: 'Next.js', icon: '⚡', logo: getAssetUrl('/logos/nextjs.svg') },
    { name: 'Typescript', icon: '⚛️', logo: getAssetUrl('/logos/typescript.svg') },
    { name: 'HTML', icon: '📄', logo: getAssetUrl('/logos/html-5.svg') },
    { name: 'CSS', icon: '🎨', logo: getAssetUrl('/logos/css-3.svg') },
    { name: 'TailwindCSS', icon: '🎨', logo: getAssetUrl('/logos/tailwindcss.svg') }
  ],
  backend: [
    { name: 'Typescript', icon: '⚛️', logo: getAssetUrl('/logos/typescript.svg') },
    { name: 'Node.js', icon: '🟢', logo: getAssetUrl('/logos/nodejs.svg') },
    { name: 'Bash', icon: '💻', logo: getAssetUrl('/logos/bash.svg') },
    { name: 'theGraph', icon: '📊', logo: getAssetUrl('/logos/thegraph.svg') }
  ]
};