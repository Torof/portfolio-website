
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
    { name: 'Remix', icon: '🎛️', logo: '/logos/remix.ico' },
    { name: 'OpenZeppelin', icon: '🛡️', logo: '/logos/openzeppelin.svg' },
    { name: 'Slither', icon: '🐍', logo: '/logos/slither.png' },
    { name: 'Ethereum', icon: '⚡', logo: '/logos/ethereum.svg' },
    { name: 'Chainlink', icon: '🔗', logo: '/logos/chainlink.svg' },
    { name: 'Solana', icon: '☀️', logo: '/logos/solana.svg' },
    { name: 'Anchor', icon: '⚓', logo: '/logos/anchor.webp' },
    { name: 'Polkadot', icon: '⚫', logo: '/logos/polkadot.svg' },
    { name: 'Rust', icon: '🦀', logo: '/logos/rust.svg' }
  ],
  frontend: [
    { name: 'React', icon: '⚛️', logo: '/logos/reactjs.svg' },
    { name: 'Next.js', icon: '⚡', logo: '/logos/nextjs.svg' },
    { name: 'Vercel', icon: '▲', logo: '/logos/vercel.svg' },
    { name: 'Typescript', icon: '⚛️', logo: '/logos/typescript.svg' },
    { name: 'RainbowKit', icon: '🌈', logo: '/logos/rainbowkit.svg' },
    { name: 'HTML', icon: '📄', logo: '/logos/html-5.svg' },
    { name: 'CSS', icon: '🎨', logo: '/logos/css-3.svg' },
    { name: 'TailwindCSS', icon: '🎨', logo: '/logos/tailwindcss.svg' },
    { name: 'Claude', icon: '🧠', logo: '/logos/claude.svg' }
  ],
  backend: [
    { name: 'Typescript', icon: '⚛️', logo: '/logos/typescript.svg' },
    { name: 'Node.js', icon: '🟢', logo: '/logos/nodejs.svg' },
    { name: 'Git', icon: '🔀', logo: '/logos/git.svg' },
    { name: 'IPFS', icon: '🌐', logo: '/logos/ipfs-seeklogo.svg' },
    { name: 'Pinata', icon: '📌', logo: '/logos/pinata.svg' },
    { name: 'Yarn', icon: '🧶', logo: '/logos/yarn.svg' },
    { name: 'NPM', icon: '📦', logo: '/logos/npm.svg' },
    { name: 'Bash', icon: '💻', logo: '/logos/bash.svg' },
    { name: 'theGraph', icon: '📊', logo: '/logos/thegraph.svg' },
    { name: 'Claude', icon: '🧠', logo: '/logos/claude.svg' }
  ]
};