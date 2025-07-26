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
    { name: 'Solidity', icon: '🔷', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/solidity.svg" },
    { name: 'Hardhat', icon: '🔨', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/hardhat.svg" },
    { name: 'Foundry', icon: '🛠️', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/foundry.svg" },
    { name: 'Ethereum', icon: '⚡', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/ethereum.svg" },
    { name: 'Solana', icon: '☀️', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/solana.svg" },
    { name: 'Polkadot', icon: '⚫', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/polkadot.svg" },
    { name: 'Rust', icon: '🦀', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/rust.svg" }
  ],
  frontend: [
    { name: 'React', icon: '⚛️', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/reactjs.svg" },
    { name: 'Next.js', icon: '⚡', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/nextjs.svg" },
    { name: 'Typescript', icon: '⚛️', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/typescript.svg" },
    { name: 'HTML', icon: '📄', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/html-5.svg" },
    { name: 'CSS', icon: '🎨', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/css-3.svg" },
    { name: 'TailwindCSS', icon: '🎨', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/tailwindcss.svg" }
  ],
  backend: [
    { name: 'Typescript', icon: '⚛️', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/typescript.svg" },
    { name: 'Node.js', icon: '🟢', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/nodejs.svg" },
    { name: 'Bash', icon: '💻', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/bash.svg" },
    { name: 'theGraph', icon: '📊', logo: "https://crimson-immediate-porcupine-844.mypinata.cloud/ipfs/bafybeiewatwvt7kahus3vvjs5medk64h5jp34awhyzhuyzouykudyqulaa/thegraph.svg" }
  ]
};