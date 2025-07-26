import { Experience } from '../types';
import { getAssetUrl } from '../utils/assetLoader';

export const experiences: Experience[] = [
  // Work Experiences
  {
    id: "ledgity",
    company: "Ledgity",
    position: "Lead Blockchain Developer",
    startDate: "Jun 2024",
    endDate: "Dec 2024",
    description: "Led the blockchain development team in creating secure, efficient smart contracts and dApps.",
    achievements: [
      "Developed robust, secure smart contracts using Solidity on Ethereum L1 and L2.",
      "Conducted code reviews and audits to ensure high-quality, bug-free code before deployment.",
      "Integrated decentralized applications (dApps) with smart contracts to enhance user experience.",
      "Managed the deployment and maintenance of smart contracts on multiple blockchain networks.",
      "Developed user-friendly interfaces for complex blockchain functions to improve accessibility."
    ],
    skills: ["Solidity", "Smart Contracts", "Ethereum", "L2", "Code Auditing", "dApps"],
    logo: getAssetUrl('/logos/ledgity-logo.svg'),
    type: "work",
    website: "https://ledgity.finance/"
  },
  {
    id: "freelance",
    company: "Freelance",
    position: "Freelance Smart Contract Developer",
    startDate: "Dec 2021",
    endDate: "Mar 2023",
    description: "Provided blockchain development services to various clients, focusing on smart contract creation and dApp development.",
    achievements: [
      "Created a staking contract for NFTs that successfully minted over 21 million ERC20 tokens and currently holding 1400+ NFTs in staking.",
      "Developed and deployed decentralized applications on EVM Blockchains using Solidity, React.js, Next.js.",
      "Collaborated with clients to define project requirements and deliver scalable solutions.",
      "Integrated oracles for real-time data feeds into smart contracts.",
      "Created and managed ERC-20 and ERC-721 token standards for various projects.",
      "Conducted thorough testing using frameworks like Foundry and Hardhat."
    ],
    skills: ["Solidity", "Smart Contracts", "NFT", "ERC20", "ERC721", "React.js", "Next.js", "Foundry", "Hardhat"],
    logo: getAssetUrl('/logos/freelance.svg'),
    type: "work"
  },
  {
    id: "tasc",
    company: "TASC Studio",
    position: "CEO",
    startDate: "Jan 2021",
    endDate: "Jan 2022",
    description: "Founded and led a company developing a Play-to-Earn blockchain game.",
    achievements: [
      "Founded a company to build a P2E game and led a team of developers using Agile methodologies (SCRUM).",
      "Developed and implemented strategic vision to drive company growth and profitability.",
      "Managed crisis communications effectively to maintain brand integrity.",
      "Developed smart contracts for in-game assets using Solidity.",
      "Implemented an Ethereum-based token economy to enhance player engagement."
    ],
    skills: ["Leadership", "Solidity", "Smart Contracts", "P2E", "Game Development", "Ethereum", "Agile"],
    logo: getAssetUrl('/logos/tasc.svg'),
    type: "work"
  },
  {
    id: "future-institution",
    company: "Future Institution",
    position: "Lead Smart Contract Developer",
    startDate: "Feb 2019",
    endDate: "May 2019",
    description: "Led the development of smart contracts for a blockchain game.",
    achievements: [
      "Led the development of smart contracts for a Blockchain game.",
      "Led the design and implementation of robust smart contracts on Ethereum.",
      "Implemented token standards, including ERC20 and ERC721, to facilitate token creation and management."
    ],
    skills: ["Solidity", "Smart Contracts", "Ethereum", "ERC20", "ERC721", "Game Development"],
    logo: getAssetUrl('/logos/future-institution.jpeg'),
    type: "work",
    website: "https://www.linkedin.com/company/future-institution/"
  },
  {
    id: "bitcoin-vietnam",
    company: "Bitcoin Vietnam",
    position: "Intern Web3 Developer",
    startDate: "Jul 2018",
    endDate: "Nov 2018",
    description: "Gained initial blockchain development experience through internship focused on Web3 technologies.",
    achievements: [
      "Researched ERC20 tokens, and created an ERC20 token for the company.",
      "Collaborated with a team to develop decentralized applications (dApps) using Ethereum blockchain.",
      "Assisted in smart contract development using Solidity to automate processes and enhance security.",
      "Maintained the front-end of the website"
    ],
    skills: ["Solidity", "Web3", "ERC20", "dApps", "Ethereum", "Frontend Development"],
    logo: getAssetUrl('/logos/bitcoin-vietnam-logo.png'),
    type: "work",
    website: "https://bitcoinvn.io/"
  },

  // Hackathons
  {
    id: "chiliz-hackathon",
    company: "Chiliz",
    position: "Hackathon Participant",
    startDate: "2023",
    endDate: "2023",
    description: "Built 'Chiliz Got Talent' - an innovative platform for sports talent discovery on Chiliz blockchain.",
    achievements: [
      "Developed full-stack dApp with React TypeScript frontend",
      "Implemented smart contracts for talent verification and rewards",
      "Created backend API with Handlebars templating",
      "Delivered working prototype within hackathon timeframe",
      "Team name: RedCodeChilizPeppers"
    ],
    skills: ["Solidity", "Smart Contracts", "Chiliz Blockchain", "Full-Stack Development"],
    logo: getAssetUrl('/logos/chiliz.png'),
    type: "hackathon",
    website: "https://www.chiliz.com/hacking-paris/"
  },
  {
    id: "eth-global-hackathon",
    company: "ETH Global",
    position: "Hackathon Participant",
    startDate: "2023",
    endDate: "2023",
    description: "Built AATBA Profile - Trustless & Verifiable Profile with Security & Privacy, fully on-chain.",
    achievements: [
      "Developed on-chain identity management platform using Soul Bound Tokens (SBT)",
      "Implemented Token Bound Accounts (TBA) with ERC6551 standard",
      "Integrated Account Abstraction using ERC4337",
      "Deployed across multiple testnets: Scroll Sepolia, Mantle, Mumbai Polygon",
      "Created live demo at aatba.org",
      "Collaborated with international team of 5 developers"
    ],
    skills: ["Solidity", "Next.js", "React", "Thirdweb", "Hardhat", "ERC6551", "ERC4337", "Soul Bound Tokens"],
    logo: getAssetUrl('/logos/eth-global.ico'),
    type: "hackathon",
    website: "https://ethglobal.com/events/ethonline2023"
  },
  {
    id: "careerzen-hackathon",
    company: "ETHCon Korea",
    position: "Hackathon Participant",
    startDate: "2024",
    endDate: "2024",
    description: "Built CareerZen - a blockchain-based career verification platform using NFTs to authenticate work history and enable anonymous professional networking.",
    achievements: [
      "Created career NFT system for verified work history and certifications",
      "Implemented privacy-preserving profile sharing with approval mechanism",
      "Built anonymous professional networking features for Asian job market needs",
      "Tackled gasless transaction implementation with ecrecover signature verification",
      "Enabled third-party career validation from mentors, hackathons, and instructors"
    ],
    skills: ["Solidity", "NFT", "Smart Contracts", "Privacy Solutions"],
    logo: getAssetUrl('/logos/ethcon-korea.png'),
    type: "hackathon",
    website: "https://devfolio.co/projects/careerzen-c34f"
  }
];