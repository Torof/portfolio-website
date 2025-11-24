import { SkillCategory, StackOverflowProfile, StackOverflowAnswer } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'smart-contracts',
    name: 'Smart Contract Standards',
    description: 'Advanced knowledge of ERC standards and contract patterns',
    icon: '📜',
    color: 'from-blue-500 to-purple-600',
    skills: [
      {
        id: 'erc20',
        name: 'ERC-20 (Fungible Tokens)',
        description: 'Standard for fungible tokens on Ethereum',
        level: 5,
        category: 'smart-contracts',
        subcategory: 'Token Standards',
        icon: '🪙',
        examples: ['Custom token implementations', 'Token with advanced features', 'Governance tokens'],
        projects: ['Multiple ERC-20 tokens deployed', 'Custom taxation mechanisms', 'Dividend distribution tokens']
      },
      {
        id: 'erc721',
        name: 'ERC-721 (NFTs)',
        description: 'Non-fungible token standard for unique digital assets',
        level: 5,
        category: 'smart-contracts',
        subcategory: 'Token Standards',
        icon: '🎨',
        examples: ['NFT collections', 'Metadata management', 'Royalty mechanisms'],
        projects: ['NFT marketplaces', 'Gaming NFTs', 'Utility NFTs with staking']
      },
      {
        id: 'erc4626',
        name: 'ERC-4626 (Tokenized Vaults)',
        description: 'Standard for yield-bearing vaults and asset management',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'DeFi Standards',
        icon: '🏦',
        examples: ['Yield farming vaults', 'Asset management protocols', 'Automated strategies'],
        projects: ['DeFi vault implementations', 'Multi-asset strategies', 'Risk management systems']
      },
      {
        id: 'erc2535',
        name: 'ERC-2535 (Diamond Proxy)',
        description: 'Modular smart contract system for upgradeable contracts',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Proxy Patterns',
        icon: '💎',
        examples: ['Modular contract architecture', 'Facet-based upgrades', 'Large-scale protocols'],
        projects: ['Complex DeFi protocols', 'Upgradeable contract systems', 'Modular dApp architecture']
      },
      {
        id: 'erc4337',
        name: 'ERC-4337 (Account Abstraction)',
        description: 'Smart contract wallets without protocol changes',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'Account Abstraction',
        icon: '👤',
        examples: ['Smart wallets', 'Gasless transactions', 'Social recovery'],
        projects: ['Account abstraction implementations', 'Paymaster contracts', 'Bundler integration']
      },
      {
        id: 'erc1155',
        name: 'ERC-1155 (Multi-Token)',
        description: 'Standard for contracts managing multiple token types',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Token Standards',
        icon: '🎯',
        examples: ['Gaming assets', 'Mixed token collections', 'Batch operations'],
        projects: ['Gaming ecosystems', 'Multi-asset platforms', 'Efficient batch transfers']
      },
      {
        id: 'erc2981',
        name: 'ERC-2981 (NFT Royalties)',
        description: 'Standardized royalty information for NFT marketplaces',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Token Standards',
        icon: '💰',
        examples: ['Artist royalties', 'Creator fees', 'Marketplace integration'],
        projects: ['NFT collections with built-in royalties', 'Creator economy platforms', 'Automated royalty distribution']
      },
      {
        id: 'erc6551',
        name: 'ERC-6551 (Token Bound Accounts)',
        description: 'NFTs that can own assets and interact with applications',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'Advanced Standards',
        icon: '🎭',
        examples: ['NFT wallets', 'Character inventories', 'Autonomous NFTs'],
        projects: ['Gaming character systems', 'NFT identity solutions', 'Composable NFT ecosystems']
      },
      {
        id: 'erc2612',
        name: 'ERC-2612 (Permit)',
        description: 'Gasless token approvals using signatures',
        level: 5,
        category: 'smart-contracts',
        subcategory: 'Token Standards',
        icon: '✍️',
        examples: ['Gasless approvals', 'Meta-transactions', 'UX improvements'],
        projects: ['Permit-enabled tokens', 'Gasless DEX integrations', 'Enhanced token UX']
      },
      {
        id: 'erc3156',
        name: 'ERC-3156 (Flash Loans)',
        description: 'Standardized interface for flash loan providers and receivers',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'DeFi Standards',
        icon: '⚡',
        examples: ['Flash loan arbitrage', 'Collateral swapping', 'Liquidation protection'],
        projects: ['Flash loan providers', 'Arbitrage bots', 'DeFi aggregators']
      },
      {
        id: 'erc4907',
        name: 'ERC-4907 (Rental NFTs)',
        description: 'NFT rental standard for time-limited usage rights',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'NFT Standards',
        icon: '🔑',
        examples: ['Gaming asset rentals', 'Metaverse land leasing', 'Subscription NFTs'],
        projects: ['NFT rental marketplaces', 'Time-based access systems', 'Rental gaming assets']
      },
      {
        id: 'erc5192',
        name: 'ERC-5192 (Soulbound Tokens)',
        description: 'Non-transferable tokens for identity and credentials',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'Identity Standards',
        icon: '🆔',
        examples: ['On-chain credentials', 'Achievement badges', 'Identity verification'],
        projects: ['Credential systems', 'Reputation protocols', 'Non-transferable achievements']
      },
      {
        id: 'erc165',
        name: 'ERC-165 (Interface Detection)',
        description: 'Standard method to detect contract interfaces',
        level: 5,
        category: 'smart-contracts',
        subcategory: 'Infrastructure',
        icon: '🔍',
        examples: ['Interface detection', 'Contract introspection', 'Compatibility checks'],
        projects: ['Smart contract libraries', 'Protocol integrations', 'Dynamic contract interactions']
      },
      {
        id: 'erc1271',
        name: 'ERC-1271 (Signature Validation)',
        description: 'Standard for contract-based signature validation',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Infrastructure',
        icon: '📝',
        examples: ['Smart wallet signatures', 'Multi-sig validation', 'Contract wallets'],
        projects: ['Smart contract wallets', 'DAO voting systems', 'Signature verification']
      },
      {
        id: 'erc1967',
        name: 'ERC-1967 (Proxy Storage)',
        description: 'Standard proxy storage slots to avoid clashes',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Proxy Patterns',
        icon: '📦',
        examples: ['Proxy implementations', 'Storage collision prevention', 'Upgrade patterns'],
        projects: ['Upgradeable contracts', 'Proxy factories', 'Protocol upgrade systems']
      },
      {
        id: 'erc2767',
        name: 'ERC-2767 (Governance)',
        description: 'Standard for on-chain governance and voting',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'Governance',
        icon: '🗳️',
        examples: ['DAO governance', 'Proposal systems', 'Voting mechanisms'],
        projects: ['DAO frameworks', 'Governance tokens', 'Voting protocols']
      },
      {
        id: 'erc5805',
        name: 'ERC-5805 (Voting Delegation)',
        description: 'Standardized voting with delegation capabilities',
        level: 3,
        category: 'smart-contracts',
        subcategory: 'Governance',
        icon: '🏛️',
        examples: ['Delegated voting', 'Liquid democracy', 'Vote tracking'],
        projects: ['Advanced governance systems', 'Delegation protocols', 'Voting aggregation']
      },
      {
        id: 'upgradeable-contracts',
        name: 'Upgradeable Contracts',
        description: 'Proxy patterns and upgrade mechanisms for smart contracts',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Architecture Patterns',
        icon: '🔄',
        examples: ['Transparent proxy', 'UUPS pattern', 'Beacon proxy'],
        projects: ['Protocol upgrade systems', 'Versioned contracts', 'Emergency pause mechanisms']
      },
      {
        id: 'access-control',
        name: 'Access Control & Permissions',
        description: 'Role-based access control and permission management',
        level: 5,
        category: 'smart-contracts',
        subcategory: 'Security Patterns',
        icon: '🔐',
        examples: ['Role-based access', 'Multi-sig controls', 'Time-locked functions'],
        projects: ['DAO governance systems', 'Admin panels', 'Permission hierarchies']
      },
      {
        id: 'merkle-trees',
        name: 'Merkle Trees & Proofs',
        description: 'Efficient data verification and whitelist mechanisms',
        level: 4,
        category: 'smart-contracts',
        subcategory: 'Data Structures',
        icon: '🌳',
        examples: ['Airdrop claims', 'Whitelist verification', 'State proofs'],
        projects: ['Efficient airdrops', 'Merkle-based allowlists', 'Cross-chain state verification']
      }
    ]
  },
  {
    id: 'defi',
    name: 'DeFi Protocols',
    description: 'Deep understanding of decentralized finance mechanisms',
    icon: '🏛️',
    color: 'from-green-500 to-blue-600',
    skills: [
      {
        id: 'amm',
        name: 'Automated Market Makers',
        description: 'DEX protocols using algorithmic pricing',
        level: 5,
        category: 'defi',
        subcategory: 'Trading',
        icon: '📈',
        examples: ['Uniswap V2/V3', 'Curve Finance', 'Balancer'],
        projects: ['Custom AMM implementations', 'Liquidity mining protocols', 'MEV-resistant designs']
      },
      {
        id: 'lending',
        name: 'Lending & Borrowing',
        description: 'Collateralized lending protocols',
        level: 4,
        category: 'defi',
        subcategory: 'Credit',
        icon: '🏦',
        examples: ['Compound-style protocols', 'Overcollateralized loans', 'Flash loans'],
        projects: ['Lending protocol forks', 'Risk management systems', 'Liquidation mechanisms']
      },
      {
        id: 'yield-farming',
        name: 'Yield Farming',
        description: 'Liquidity incentive mechanisms and reward distribution',
        level: 5,
        category: 'defi',
        subcategory: 'Incentives',
        icon: '🌾',
        examples: ['Masterchef contracts', 'Staking rewards', 'Liquidity mining'],
        projects: ['Custom farming protocols', 'Multi-pool strategies', 'Emission schedules']
      },
      {
        id: 'oracles',
        name: 'Price Oracles',
        description: 'External data integration and price feeds',
        level: 4,
        category: 'defi',
        subcategory: 'Infrastructure',
        icon: '🔮',
        examples: ['Chainlink integration', 'TWAP oracles', 'Oracle security'],
        projects: ['Custom oracle implementations', 'Price feed aggregators', 'Oracle manipulation protection']
      },
      {
        id: 'flash-loans',
        name: 'Flash Loans',
        description: 'Uncollateralized loans within single transactions',
        level: 4,
        category: 'defi',
        subcategory: 'Advanced DeFi',
        icon: '⚡',
        examples: ['Arbitrage bots', 'Liquidation protocols', 'Collateral swapping'],
        projects: ['Flash loan arbitrage systems', 'Liquidation bots', 'DeFi position migration tools']
      },
      {
        id: 'vaults',
        name: 'Yield Vaults & Strategies',
        description: 'Automated yield generation and vault management',
        level: 5,
        category: 'defi',
        subcategory: 'Yield Generation',
        icon: '🏦',
        examples: ['Auto-compounding', 'Strategy routing', 'Risk management'],
        projects: ['Yield aggregators', 'Strategy vaults', 'Multi-protocol optimizers']
      },
      {
        id: 'derivatives',
        name: 'DeFi Derivatives',
        description: 'Options, futures, and synthetic assets',
        level: 3,
        category: 'defi',
        subcategory: 'Advanced DeFi',
        icon: '📊',
        examples: ['Options protocols', 'Perpetual futures', 'Synthetic assets'],
        projects: ['Options AMMs', 'Derivatives platforms', 'Structured products']
      },
      {
        id: 'liquidations',
        name: 'Liquidation Mechanisms',
        description: 'Collateral liquidation and auction systems',
        level: 4,
        category: 'defi',
        subcategory: 'Risk Management',
        icon: '🔨',
        examples: ['Dutch auctions', 'Fixed spread liquidations', 'MEV protection'],
        projects: ['Liquidation engines', 'Keeper bots', 'Bad debt management']
      },
      {
        id: 'tokenomics',
        name: 'Tokenomics Design',
        description: 'Token economics and incentive mechanisms',
        level: 5,
        category: 'defi',
        subcategory: 'Protocol Design',
        icon: '💎',
        examples: ['Emission schedules', 'Staking mechanisms', 'Vote-escrowed tokens'],
        projects: ['Token distribution systems', 'Incentive modeling', 'Economic security design']
      }
    ]
  },
  {
    id: 'layer2',
    name: 'Layer 2 Solutions',
    description: 'Scaling solutions and alternative blockchains',
    icon: '⚡',
    color: 'from-purple-500 to-pink-600',
    skills: [
      {
        id: 'arbitrum',
        name: 'Arbitrum',
        description: 'Optimistic rollup scaling solution',
        level: 4,
        category: 'layer2',
        subcategory: 'Rollups',
        icon: '🌀',
        examples: ['Cross-chain bridges', 'L2 deployments', 'Gas optimization'],
        projects: ['Multi-chain protocols', 'L1-L2 communication', 'Bridge contracts']
      },
      {
        id: 'optimism',
        name: 'Optimism',
        description: 'Optimistic rollup with fault proofs',
        level: 3,
        category: 'layer2',
        subcategory: 'Rollups',
        icon: '🔴',
        examples: ['OP Stack', 'Retro funding', 'Superchain'],
        projects: ['L2 native dApps', 'Cross-rollup communication', 'Sequencer interactions']
      },
      {
        id: 'polygon',
        name: 'Polygon',
        description: 'Multi-chain scaling platform',
        level: 4,
        category: 'layer2',
        subcategory: 'Sidechains',
        icon: '🟣',
        examples: ['Polygon PoS', 'Polygon zkEVM', 'Multi-chain deployment'],
        projects: ['Cross-chain protocols', 'Polygon-native dApps', 'Bridge integrations']
      },
      {
        id: 'gnosis',
        name: 'Gnosis Chain',
        description: 'Community-owned EVM chain focused on stability and decentralization',
        level: 4,
        category: 'layer2',
        subcategory: 'Sidechains',
        icon: '🦉',
        examples: ['xDAI payments', 'DAO infrastructure', 'Prediction markets'],
        projects: ['Payment applications', 'Governance systems', 'Stable-fee transactions']
      },
      {
        id: 'zksync-era',
        name: 'zkSync Era',
        description: 'EVM-compatible zkRollup with native account abstraction',
        level: 4,
        category: 'layer2',
        subcategory: 'ZK Rollups',
        icon: '⚡',
        examples: ['Account abstraction', 'Paymaster contracts', 'ZK proofs'],
        projects: ['Gas-efficient dApps', 'Smart wallets', 'Cross-chain protocols']
      },
      {
        id: 'scroll',
        name: 'Scroll',
        description: 'Bytecode-level EVM-equivalent zkRollup for seamless migration',
        level: 3,
        category: 'layer2',
        subcategory: 'ZK Rollups',
        icon: '📜',
        examples: ['EVM equivalence', 'zkEVM circuits', 'Developer tooling'],
        projects: ['Direct ports from Ethereum', 'DeFi protocols', 'NFT marketplaces']
      },
      {
        id: 'base',
        name: 'Base',
        description: 'Coinbase L2 built on OP Stack for mainstream adoption',
        level: 4,
        category: 'layer2',
        subcategory: 'Rollups',
        icon: '🔵',
        examples: ['Consumer apps', 'Fiat onramps', 'Social tokens'],
        projects: ['Consumer-facing dApps', 'Fiat-to-crypto bridges', 'Social finance protocols']
      },
      {
        id: 'berachain',
        name: 'Berachain',
        description: 'EVM-compatible chain with innovative PoL consensus',
        level: 3,
        category: 'layer2',
        subcategory: 'Alt L1',
        icon: '🐻',
        examples: ['Proof of Liquidity', 'Native yield', 'Consensus rewards'],
        projects: ['PoL-optimized protocols', 'Validator incentive systems', 'Liquidity-driven applications']
      }
    ]
  },
  {
    id: 'security',
    name: 'Security & Auditing',
    description: 'Smart contract security analysis and best practices',
    icon: '🛡️',
    color: 'from-red-500 to-orange-600',
    skills: [
      {
        id: 'auditing',
        name: 'Audit & Security Analysis',
        description: 'Security analysis and vulnerability assessment',
        level: 4,
        category: 'security',
        subcategory: 'Auditing',
        icon: '🔍',
        examples: ['Static analysis', 'Manual review', 'Formal verification'],
        projects: ['Protocol audits', 'Security assessments', 'Vulnerability reports']
      },
      {
        id: 'common-vulnerabilities',
        name: 'Common Vulnerabilities',
        description: 'Understanding of smart contract attack vectors',
        level: 5,
        category: 'security',
        subcategory: 'Vulnerabilities',
        icon: '⚠️',
        examples: ['Reentrancy', 'Integer overflow', 'Flash loan attacks', 'MEV exploitation'],
        projects: ['Security hardening', 'Attack simulation', 'Mitigation strategies']
      },
      {
        id: 'formal-verification',
        name: 'Formal Verification',
        description: 'Mathematical proofs of contract correctness',
        level: 3,
        category: 'security',
        subcategory: 'Verification',
        icon: '📐',
        examples: ['Symbolic execution', 'Property-based testing', 'Invariant checking'],
        projects: ['Critical protocol verification', 'Correctness proofs', 'Property specifications']
      },
      {
        id: 'mev-protection',
        name: 'MEV Protection',
        description: 'Maximal Extractable Value mitigation strategies',
        level: 4,
        category: 'security',
        subcategory: 'MEV',
        icon: '🛡️',
        examples: ['Commit-reveal schemes', 'Time-weighted pricing', 'Private mempools'],
        projects: ['MEV-resistant protocols', 'Fair ordering systems', 'Flashbot integration']
      },
      {
        id: 'invariant-testing',
        name: 'Invariant & Fuzz Testing',
        description: 'Property-based testing and fuzzing strategies',
        level: 5,
        category: 'security',
        subcategory: 'Testing',
        icon: '🧪',
        examples: ['Stateful fuzzing', 'Invariant definitions', 'Edge case discovery'],
        projects: ['Comprehensive test suites', 'Fuzzing campaigns', 'Property verification']
      },
      {
        id: 'attack-vectors',
        name: 'Attack Vector Analysis',
        description: 'Comprehensive understanding of DeFi attack patterns',
        level: 5,
        category: 'security',
        subcategory: 'Security Analysis',
        icon: '🎯',
        examples: ['Price manipulation', 'Governance attacks', 'Cross-function reentrancy'],
        projects: ['Attack simulations', 'Vulnerability assessments', 'Security frameworks']
      }
    ]
  },
  {
    id: 'development',
    name: 'Development Tools',
    description: 'Advanced development and testing frameworks',
    icon: '🛠️',
    color: 'from-cyan-500 to-blue-600',
    skills: [
      {
        id: 'foundry',
        name: 'Foundry',
        description: 'Fast, portable and modular toolkit for Ethereum',
        level: 5,
        category: 'development',
        subcategory: 'Testing',
        icon: '⚒️',
        examples: ['Fuzzing', 'Gas optimization', 'Deployment scripts'],
        projects: ['Test suites', 'CI/CD pipelines', 'Gas benchmarking']
      },
      {
        id: 'hardhat',
        name: 'Hardhat',
        description: 'Ethereum development environment',
        level: 5,
        category: 'development',
        subcategory: 'Development',
        icon: '🎩',
        examples: ['Plugin ecosystem', 'Local networks', 'Deployment automation'],
        projects: ['Development workflows', 'Custom tasks', 'Testing frameworks']
      },
      {
        id: 'yul-assembly',
        name: 'Yul & Assembly',
        description: 'Low-level EVM programming for gas optimization',
        level: 4,
        category: 'development',
        subcategory: 'Optimization',
        icon: '⚙️',
        examples: ['Gas optimization', 'Custom opcodes', 'Library implementations'],
        projects: ['Highly optimized contracts', 'Gas-efficient algorithms', 'Low-level integrations']
      },
      {
        id: 'ethersjs',
        name: 'Ethers.js & Web3.js',
        description: 'JavaScript libraries for Ethereum interaction',
        level: 5,
        category: 'development',
        subcategory: 'Frontend Integration',
        icon: '🌐',
        examples: ['Contract interactions', 'Wallet connections', 'Event listening'],
        projects: ['dApp frontends', 'Web3 integrations', 'Transaction management']
      },
      {
        id: 'wagmi-viem',
        name: 'Wagmi & Viem',
        description: 'Modern React hooks and TypeScript libraries for Ethereum',
        level: 4,
        category: 'development',
        subcategory: 'Frontend Integration',
        icon: '🪝',
        examples: ['React hooks', 'Type-safe contracts', 'Wallet management'],
        projects: ['Modern dApp interfaces', 'Type-safe integrations', 'React Web3 apps']
      },
      {
        id: 'graph-protocol',
        name: 'The Graph Protocol',
        description: 'Decentralized indexing and querying for blockchain data',
        level: 4,
        category: 'development',
        subcategory: 'Data Indexing',
        icon: '📊',
        examples: ['Subgraph development', 'GraphQL APIs', 'Event indexing'],
        projects: ['Custom subgraphs', 'Data analytics platforms', 'Real-time dashboards']
      },
      {
        id: 'ipfs',
        name: 'IPFS & Decentralized Storage',
        description: 'InterPlanetary File System for decentralized content',
        level: 4,
        category: 'development',
        subcategory: 'Storage',
        icon: '🌍',
        examples: ['NFT metadata', 'dApp assets', 'Decentralized hosting'],
        projects: ['IPFS integrations', 'Pinning services', 'Content-addressed storage']
      },
      {
        id: 'testing-frameworks',
        name: 'Testing Frameworks',
        description: 'Comprehensive testing with Foundry, Hardhat, and more',
        level: 5,
        category: 'development',
        subcategory: 'Testing',
        icon: '🧪',
        examples: ['Unit tests', 'Integration tests', 'Fork testing'],
        projects: ['Test suites', 'CI/CD pipelines', 'Coverage analysis']
      },
      {
        id: 'pinata',
        name: 'Pinata IPFS',
        description: 'IPFS pinning service for reliable decentralized storage',
        level: 4,
        category: 'development',
        subcategory: 'Storage Services',
        icon: '📌',
        examples: ['NFT metadata hosting', 'Asset pinning', 'API integration'],
        projects: ['NFT collection hosting', 'Decentralized file storage', 'Metadata management systems']
      },
      {
        id: 'fleek',
        name: 'Fleek',
        description: 'Web3 deployment and hosting platform',
        level: 4,
        category: 'development',
        subcategory: 'Deployment',
        icon: '🚀',
        examples: ['IPFS deployment', 'ENS domains', 'CDN hosting'],
        projects: ['Decentralized website hosting', 'Web3 portfolio deployment', 'Static site hosting']
      },
      {
        id: 'vercel',
        name: 'Vercel',
        description: 'Modern deployment platform for frontend frameworks',
        level: 5,
        category: 'development',
        subcategory: 'Deployment',
        icon: '▲',
        examples: ['Next.js deployment', 'Edge functions', 'Preview deployments'],
        projects: ['Production dApp frontends', 'Serverless functions', 'Continuous deployment']
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        description: 'Version control and collaborative development',
        level: 5,
        category: 'development',
        subcategory: 'Version Control',
        icon: '🐙',
        examples: ['Repository management', 'Pull requests', 'CI/CD workflows'],
        projects: ['Open source contributions', 'Team collaboration', 'Automated workflows']
      },
      {
        id: 'claude-ai',
        name: 'Claude AI & Claude Code',
        description: 'AI-powered development and code assistance',
        level: 5,
        category: 'development',
        subcategory: 'AI Tools',
        icon: '🤖',
        examples: ['Code generation', 'Smart contract analysis', 'Documentation'],
        projects: ['AI-assisted development', 'Code reviews', 'Technical writing']
      },
      {
        id: 'slither',
        name: 'Slither',
        description: 'Static analysis framework for Solidity smart contracts',
        level: 4,
        category: 'development',
        subcategory: 'Security Analysis',
        icon: '🐍',
        examples: ['Vulnerability detection', 'Code quality analysis', 'Security best practices'],
        projects: ['Smart contract audits', 'Automated security scanning', 'CI/CD integration']
      }
    ]
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web development with modern technologies',
    icon: '🌐',
    color: 'from-green-500 to-teal-600',
    skills: [
      {
        id: 'ecommerce',
        name: 'E-Commerce Platforms',
        description: 'Complete online stores with payment integration',
        level: 5,
        category: 'web-development',
        subcategory: 'Full-Stack Applications',
        icon: '🛒',
        examples: ['Payment gateways', 'Shopping carts', 'Inventory management'],
        projects: ['Stripe integration', 'PayPal checkout', 'Product catalogs with admin panels']
      },
      {
        id: 'user-auth',
        name: 'User Authentication Systems',
        description: 'Secure login and registration with database management',
        level: 5,
        category: 'web-development',
        subcategory: 'Backend Development',
        icon: '🔐',
        examples: ['JWT authentication', 'OAuth integration', 'Session management'],
        projects: ['User dashboards', 'Role-based access control', 'Password reset flows']
      },
      {
        id: 'databases',
        name: 'Database Management',
        description: 'SQL and NoSQL database design and optimization',
        level: 5,
        category: 'web-development',
        subcategory: 'Backend Development',
        icon: '💾',
        examples: ['PostgreSQL', 'MongoDB', 'Database migrations'],
        projects: ['User data storage', 'Real-time data sync', 'Complex queries and indexing']
      },
      {
        id: 'responsive-design',
        name: 'Responsive Web Design',
        description: 'Mobile-first, cross-browser compatible websites',
        level: 5,
        category: 'web-development',
        subcategory: 'Frontend Development',
        icon: '📱',
        examples: ['Mobile optimization', 'CSS frameworks', 'Progressive web apps'],
        projects: ['Responsive portfolios', 'Mobile-friendly dashboards', 'Cross-device compatibility']
      },
      {
        id: 'api-development',
        name: 'RESTful APIs',
        description: 'Backend API design and implementation',
        level: 5,
        category: 'web-development',
        subcategory: 'Backend Development',
        icon: '🔌',
        examples: ['REST endpoints', 'API documentation', 'Rate limiting'],
        projects: ['Third-party integrations', 'Microservices', 'GraphQL APIs']
      }
    ]
  }
];

// Stack Overflow Integration Data
export const stackOverflowProfile: StackOverflowProfile = {
  userId: '52251',
  displayName: 'Torof',
  profileImage: '/logos/ethereum_stackexchange_profile_pic.png',
  reputation: 836,
  badges: {
    gold: 0,
    silver: 5,
    bronze: 19
  },
  topTags: ['solidity', 'evm', 'nft', 'ethereum', 'smart-contracts'],
  profileUrl: 'https://ethereum.stackexchange.com/users/52251/torof'
};

// Real featured answers from Stack Exchange profile
export const featuredAnswers: StackOverflowAnswer[] = [
  {
    id: 'answer-1',
    questionTitle: 'Any materials to study EVM?',
    questionUrl: 'https://ethereum.stackexchange.com/questions/153250/any-materials-to-study-evm',
    answerUrl: 'https://ethereum.stackexchange.com/questions/153250/any-materials-to-study-evm/153289#153289',
    score: 2,
    isAccepted: true,
    excerpt: 'Learning the same thing at the moment, I\'ll be glad to share some amazing resources I found: A awesome list of great EVM learning resources, EVM handbook, playground tools, and deep dive explanations.',
    tags: ['evm']
  },
  {
    id: 'answer-2',
    questionTitle: 'Transfer Ownership of a Contract from one address to another problem',
    questionUrl: 'https://ethereum.stackexchange.com/questions/153870/transfer-ownership-of-a-contract-from-one-adress-to-another-problem',
    answerUrl: 'https://ethereum.stackexchange.com/questions/153870/transfer-ownership-of-a-contract-from-one-adress-to-another-problem/153872#153872',
    score: 2,
    isAccepted: true,
    excerpt: 'The answer to your question lies in the contract. Which you did not provide. Logically, according the proper functioning of ERC721, if he gave you ownership then normally he cannot get the ownership back unless you willingly give it to him.',
    tags: ['solidity', 'contract-development', 'transactions', 'nft']
  },
  {
    id: 'answer-3',
    questionTitle: 'Why can\'t I send eth to contract?',
    questionUrl: 'https://ethereum.stackexchange.com/questions/154048/why-cant-i-send-eth-to-contract',
    answerUrl: 'https://ethereum.stackexchange.com/questions/154048/why-cant-i-send-eth-to-contract/154050#154050',
    score: 2,
    isAccepted: true,
    excerpt: 'If you want to send ether to a contract through a function you need to define this function as payable and simply forward ether with your transaction using msg.value.',
    tags: ['solidity']
  },
  {
    id: 'answer-4',
    questionTitle: 'Risk in using Singleton Call forwarding',
    questionUrl: 'https://ethereum.stackexchange.com/questions/163258/risk-in-using-singleton-call-forwarding',
    answerUrl: 'https://ethereum.stackexchange.com/questions/163258/risk-in-using-singleton-call-forwarding/163261#163261',
    score: 2,
    isAccepted: true,
    excerpt: 'Access control is indeed very important. If the access controls are not implemented in the contract itself, anyone can just call the contract directly without restrictions.',
    tags: ['solidity', 'contract-invocation']
  }
];