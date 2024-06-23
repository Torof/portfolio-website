import { Education, Certification } from '../types';

export const educations: Education[] = [
  {
    id: "rareskills",
    institution: "RareSkills",
    degree: "Blockchain Development",
    field: "DeFi deepdive, NFT & ERC20, Testing & auditing, EVM deepdive: Yul/assembly/HUFF",
    startDate: "Aug 2023",
    endDate: "Mar 2024",
    skills: ["DeFi", "NFT", "ERC20", "Testing", "Auditing", "EVM", "Yul", "Assembly", "HUFF"],
    logo: "/logos/rareskills.png"
  },
  {
    id: "consensys",
    institution: "ConSenSys Academy",
    degree: "Blockchain Development",
    field: "Dapp, Ethereum, Solidity, React.js, Blockchain clients",
    startDate: "Sep 2021",
    endDate: "Feb 2022",
    skills: ["Dapp", "Ethereum", "Solidity", "React.js", "Blockchain"],
    logo: "/logos/consensys.png"
  },
  {
    id: "alyra",
    institution: "Alyra Blockchain School",
    degree: "Blockchain Development",
    field: "Ethereum, Smart Contracts, Dapp Development",
    startDate: "Sep 2020",
    endDate: "Jan 2021",
    skills: ["Ethereum", "Smart Contracts", "Dapp"],
    logo: "/logos/alyra.png"
  }
];

export const certifications: Certification[] = [
  // You can add certifications here when needed
  // Example:
  // {
  //   id: "certification-1",
  //   name: "Certified Blockchain Developer",
  //   issuer: "Blockchain Council",
  //   date: "Jan 2022",
  //   description: "Comprehensive certification covering blockchain fundamentals and development practices.",
  //   skills: ["Blockchain", "Smart Contracts", "DApps"],
  //   url: "https://example.com/certification",
  //   logo: "/logos/blockchain-council.png"
  // }
];