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
    { name: 'Solidity', icon: '🔷', logo: '/logos/solidity.svg' },
    { name: 'Hardhat', icon: '🔨', logo: '/logos/hardhat.svg' },
    { name: 'Foundry', icon: '🛠️', logo: '/logos/foundry.svg' },
    { name: 'Ethereum', icon: '⚡', logo: '/logos/ethereum.svg' },
    { name: 'Solana', icon: '☀️', logo: '/logos/solana.svg' },
    { name: 'Polkadot', icon: '⚫', logo: '/logos/polkadot.svg' },
    { name: 'Rust', icon: '🦀', logo: '/logos/rust.svg' }
  ],
  frontend: [
    { name: 'React', icon: '⚛️', logo: '/logos/reactjs.svg' },
    { name: 'Next.js', icon: '⚡', logo: '/logos/nextjs.svg' },
    { name: 'Typescript', icon: '⚛️', logo: '/logos/typescript.svg' },
    { name: 'HTML', icon: '📄', logo: '/logos/html-5.svg' },
    { name: 'CSS', icon: '🎨', logo: '/logos/css-3.svg' },
    { name: 'TailwindCSS', icon: '🎨', logo: '/logos/tailwindcss.svg' }
  ],
  backend: [
    { name: 'Typescript', icon: '⚛️', logo: '/logos/typescript.svg' },
    { name: 'Node.js', icon: '🟢', logo: '/logos/nodejs.svg' },
    { name: 'Bash', icon: '💻', logo: '/logos/bash.svg' },
    { name: 'theGraph', icon: '📊', logo: '/logos/thegraph.svg' }
  ]
};