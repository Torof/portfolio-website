export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  websiteUrl?: string;
  githubUrl: string;
  tags: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'project-1',
    title: 'DeFi Protocol',
    description: 'A decentralized finance protocol built on Ethereum, featuring automated market making and yield farming capabilities.',
    image: '/projects/defi-protocol.jpg',
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/defi-protocol',
    tags: ['Solidity', 'React', 'DeFi', 'Smart Contracts'],
  },
  {
    id: 'project-2',
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with minting, trading, and royalty distribution. Built with modern web3 technologies.',
    image: '/projects/nft-marketplace.jpg',
    githubUrl: 'https://github.com/yourusername/nft-marketplace',
    tags: ['Solidity', 'Next.js', 'NFT', 'ERC-721'],
  },
  {
    id: 'project-3',
    title: 'DAO Governance Platform',
    description: 'Decentralized autonomous organization platform with on-chain voting and proposal management.',
    image: '/projects/dao-platform.jpg',
    websiteUrl: 'https://example.com/dao',
    githubUrl: 'https://github.com/yourusername/dao-platform',
    tags: ['Solidity', 'TypeScript', 'DAO', 'Governance'],
  },
  {
    id: 'project-4',
    title: 'Cross-Chain Bridge',
    description: 'Secure cross-chain asset bridge enabling seamless transfers between Ethereum, Polygon, and Arbitrum networks.',
    image: '/projects/bridge.jpg',
    websiteUrl: 'https://example.com/bridge',
    githubUrl: 'https://github.com/yourusername/cross-chain-bridge',
    tags: ['Solidity', 'Web3', 'Cross-Chain', 'Layer2'],
  },
  {
    id: 'project-5',
    title: 'Staking Platform',
    description: 'A non-custodial staking platform with liquid staking derivatives and multi-token reward distribution.',
    image: '/projects/staking.jpg',
    websiteUrl: 'https://example.com/staking',
    githubUrl: 'https://github.com/yourusername/staking-platform',
    tags: ['Solidity', 'React', 'Staking', 'DeFi'],
  },
  {
    id: 'project-6',
    title: 'On-Chain Analytics',
    description: 'Real-time blockchain analytics dashboard with transaction monitoring, whale tracking, and protocol metrics.',
    image: '/projects/analytics.jpg',
    githubUrl: 'https://github.com/yourusername/onchain-analytics',
    tags: ['TypeScript', 'GraphQL', 'The Graph', 'Data'],
  },
];
