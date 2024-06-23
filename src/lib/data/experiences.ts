import { Experience } from '../types';

export const experiences: Experience[] = [
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
    logo: "/logos/ledgity.png"
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
    logo: "/logos/freelance.png"
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
    logo: "/logos/tasc.png"
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
    logo: "/logos/future-institution.png"
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
    logo: "/logos/bitcoin-vietnam.png"
  }
];