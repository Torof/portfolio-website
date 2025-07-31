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
    { name: 'Remix', icon: '🎛️', logo: getAssetUrl('/logos/remix.ico') },
    { name: 'OpenZeppelin', icon: '🛡️', logo: getAssetUrl('/logos/openzeppelin.svg') },
    { name: 'Slither', icon: '🐍', logo: getAssetUrl('/logos/slither.png') },
    { name: 'Ethereum', icon: '⚡', logo: getAssetUrl('/logos/ethereum.svg') },
    { name: 'Chainlink', icon: '🔗', logo: getAssetUrl('/logos/chainlink.svg') },
    { name: 'Solana', icon: '☀️', logo: getAssetUrl('/logos/solana.svg') },
    { name: 'Anchor', icon: '⚓', logo: getAssetUrl('/logos/anchor.webp') },
    { name: 'Polkadot', icon: '⚫', logo: getAssetUrl('/logos/polkadot.svg') },
    { name: 'Rust', icon: '🦀', logo: getAssetUrl('/logos/rust.svg') }
  ],
  frontend: [
    { name: 'React', icon: '⚛️', logo: getAssetUrl('/logos/reactjs.svg') },
    { name: 'Next.js', icon: '⚡', logo: getAssetUrl('/logos/nextjs.svg') },
    { name: 'Vercel', icon: '▲', logo: getAssetUrl('/logos/vercel.svg') },
    { name: 'Typescript', icon: '⚛️', logo: getAssetUrl('/logos/typescript.svg') },
    { name: 'RainbowKit', icon: '🌈', logo: getAssetUrl('/logos/rainbowkit.svg') },
    { name: 'HTML', icon: '📄', logo: getAssetUrl('/logos/html-5.svg') },
    { name: 'CSS', icon: '🎨', logo: getAssetUrl('/logos/css-3.svg') },
    { name: 'TailwindCSS', icon: '🎨', logo: getAssetUrl('/logos/tailwindcss.svg') },
    { name: 'Claude', icon: '🧠', logo: getAssetUrl('/logos/claude.svg') }
  ],
  backend: [
    { name: 'Typescript', icon: '⚛️', logo: getAssetUrl('/logos/typescript.svg') },
    { name: 'Node.js', icon: '🟢', logo: getAssetUrl('/logos/nodejs.svg') },
    { name: 'Git', icon: '🔀', logo: getAssetUrl('/logos/git.svg') },
    { name: 'IPFS', icon: '🌐', logo: getAssetUrl('/logos/ipfs-seeklogo.svg') },
    { name: 'Pinata', icon: '📌', logo: getAssetUrl('/logos/pinata.svg') },
    { name: 'Yarn', icon: '🧶', logo: getAssetUrl('/logos/yarn.svg') },
    { name: 'NPM', icon: '📦', logo: getAssetUrl('/logos/npm.svg') },
    { name: 'Bash', icon: '💻', logo: getAssetUrl('/logos/bash.svg') },
    { name: 'theGraph', icon: '📊', logo: getAssetUrl('/logos/thegraph.svg') },
    { name: 'Claude', icon: '🧠', logo: getAssetUrl('/logos/claude.svg') }
  ]
};