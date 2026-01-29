import { Education, Certification } from '../types';

export const educations: Education[] = [
  {
    id: "rareskills",
    institution: "RareSkills",
    degree: "Blockchain Development",
    field: "DeFi deepdive, NFT & ERC20, Testing & auditing, EVM deepdive: Yul/assembly/HUFF",
    startDate: "Aug 2023",
    endDate: "Mar 2024",
    description: "RareSkills is a premium blockchain education platform founded by Jeffrey Scholz, focusing on advanced smart contract security and optimization. This intensive program covers cutting-edge DeFi protocols, advanced ERC standards implementation, comprehensive testing methodologies, security auditing practices, and low-level EVM programming including Yul and assembly language. The curriculum is designed for experienced developers seeking expertise in blockchain security and gas optimization.",
    skills: ["DeFi", "NFT", "ERC20", "Testing", "Auditing", "EVM", "Yul", "Assembly", "HUFF"],
    logo: '/logos/rareskills.svg',
    website: "https://rareskills.io"
  },
  {
    id: "consensys",
    institution: "ConSenSys Academy",
    degree: "Blockchain Development",
    field: "Dapp, Ethereum, Solidity, React.js, Blockchain clients",
    startDate: "Sep 2021",
    endDate: "Feb 2022",
    description: "ConsenSys Academy is the educational arm of ConsenSys, the leading Ethereum software company founded by Joseph Lubin. This comprehensive program provides enterprise-grade blockchain education, covering full-stack decentralized application development, Ethereum ecosystem architecture, advanced Solidity programming, React.js integration for Web3 frontends, and blockchain client implementation. The academy is recognized for producing industry-ready blockchain developers.",
    skills: ["Dapp", "Ethereum", "Solidity", "React.js", "Blockchain"],
    logo: '/logos/consensys.svg',
    website: "https://consensys.net/academy"
  },
  {
    id: "alyra",
    institution: "Alyra Blockchain School",
    degree: "Blockchain Development",
    field: "Ethereum, Smart Contracts, Dapp Development",
    startDate: "Sep 2020",
    endDate: "Jan 2021",
    description: "Alyra is France's leading blockchain school, offering comprehensive training programs in blockchain technology and smart contract development. This foundational program provides hands-on experience with Ethereum blockchain, smart contract architecture and deployment, decentralized application development, and blockchain fundamentals. Alyra is known for its practical approach to blockchain education and strong industry connections in the European blockchain ecosystem.",
    skills: ["Ethereum", "Smart Contracts", "Dapp"],
    logo: '/logos/alyra.png',
    website: "https://alyra.fr"
  },
  {
    id: "alyra-solana",
    institution: "Alyra Blockchain School",
    degree: "Solana Developer",
    field: "Solana blockchain, Rust programming, Anchor framework, SPL tokens",
    startDate: "Apr 2025",
    endDate: "Apr 2025",
    description: "Advanced Solana development program at Alyra focusing on high-performance blockchain development. This specialized course covers Solana's unique architecture, Rust programming for blockchain applications, the Anchor development framework, and SPL token creation. Students learn to build scalable decentralized applications on one of the fastest blockchains, mastering Solana's account model, program deployment, and integration with Web3 frontends.",
    skills: ["Solana", "Rust", "Anchor", "SPL Tokens", "Program Development", "Web3"],
    logo: '/logos/alyra.png',
    website: "https://alyra.fr"
  },
  {
    id: "udemy-solidity-advanced",
    institution: "Udemy",
    degree: "Advanced Solidity - Yul and Assembly",
    field: "Deep dive into Solidity optimization using Yul intermediate language and EVM assembly programming",
    startDate: "May 2023",
    endDate: "Jun 2023",
    description: "An advanced course focusing on low-level Solidity optimization techniques using Yul intermediate language and EVM assembly programming. Students learn to write highly optimized smart contracts, understand EVM internals, implement custom opcodes, and achieve significant gas savings. Critical knowledge for professional smart contract development and auditing in the DeFi space.",
    skills: ["Solidity", "Yul", "Assembly", "EVM", "Gas Optimization", "Low-level Programming"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/advanced-solidity-yul-and-assembly/"
  },
  {
    id: "udemy-solidity-gas",
    institution: "Udemy", 
    degree: "Advanced Solidity - Gas Optimization",
    field: "Advanced techniques for optimizing smart contract gas usage and understanding EVM internals",
    startDate: "May 2023",
    endDate: "Jun 2023",
    description: "A specialized course dedicated to smart contract gas optimization and EVM efficiency. Covers advanced techniques for reducing transaction costs, storage optimization patterns, function call efficiency, and EVM-level optimizations. Students learn to analyze gas consumption, implement cost-effective design patterns, and build economically sustainable smart contracts for production DeFi protocols.",
    skills: ["Solidity", "Gas Optimization", "EVM Internals", "Smart Contracts", "Efficiency", "Cost Reduction"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/advanced-solidity-understanding-and-optimizing-gas-costs/"
  },
  {
    id: "udemy-rust-code",
    institution: "Udemy",
    degree: "Learn to Code with Rust",
    field: "Complete Rust programming course covering fundamentals, memory management, and systems programming",
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    description: "A comprehensive Rust programming course that covers the language from fundamentals to advanced concepts. The course focuses on Rust's unique ownership system, memory safety without garbage collection, and systems programming capabilities. Students learn to build high-performance applications with zero-cost abstractions, concurrent programming, and robust error handling patterns that make Rust ideal for blockchain and systems development.",
    skills: ["Rust", "Systems Programming", "Memory Management", "Cargo", "Error Handling"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/rust-coding-for-beginners/"
  },
  {
    id: "udemy-rust-crash",
    institution: "Udemy",
    degree: "Ultimate Rust Crash Course",
    field: "Intensive Rust programming bootcamp focusing on practical applications and best practices",
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    description: "An intensive Rust programming bootcamp designed for rapid skill acquisition. The course focuses on Rust's unique ownership model, borrowing and lifetime concepts, trait system for code reuse, and concurrent programming patterns. Emphasizes practical applications and industry best practices, making it perfect for developers transitioning to blockchain development where performance and safety are critical.",
    skills: ["Rust", "Ownership", "Borrowing", "Lifetimes", "Traits", "Concurrency"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/ultimate-rust-crash-course/"
  },
  {
    id: "udemy-react-complete",
    institution: "Udemy", 
    degree: "React - The Complete Guide",
    field: "Comprehensive React course including Redux, Hooks, Context API, and modern React patterns",
    startDate: "2022",
    endDate: "2022",
    description: "An in-depth React course covering modern React development patterns and best practices. The course includes advanced state management with Redux and Context API, modern React Hooks for functional programming, component lifecycle optimization, and performance techniques. Essential for building sophisticated Web3 frontends and decentralized applications with React.",
    skills: ["React", "Redux", "Hooks", "Context API", "JSX", "State Management"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
  },
  {
    id: "udemy-nodejs-complete",
    institution: "Udemy",
    degree: "The Complete Node.js Developer Course",
    field: "Full-stack Node.js development with Express, MongoDB, authentication, and API building",
    startDate: "2021", 
    endDate: "2021",
    description: "A comprehensive Node.js course covering server-side JavaScript development, RESTful API design, database integration with MongoDB, authentication systems, and deployment strategies. The course emphasizes building scalable backend services that can support blockchain applications and integrate with Web3 infrastructure for complete full-stack development.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication", "NPM"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/"
  },
  {
    id: "udemy-react-zero-mastery",
    institution: "Udemy",
    degree: "Complete React Developer - Zero to Mastery",
    field: "Advanced React development including TypeScript, testing, performance optimization, and deployment",
    startDate: "2022",
    endDate: "2022", 
    description: "An advanced React development course that takes students from beginner to expert level. Covers TypeScript integration for type-safe React applications, comprehensive testing strategies, performance optimization techniques, and production deployment workflows. Particularly valuable for building robust Web3 interfaces and decentralized application frontends with professional-grade code quality.",
    skills: ["React", "TypeScript", "Testing", "Performance", "Deployment", "Modern React"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/complete-react-developer-zero-to-mastery/"
  },
  {
    id: "udemy-linux-complete",
    institution: "Udemy",
    degree: "Complete Linux Training Course",
    field: "Comprehensive Linux administration covering command line, system administration, and DevOps practices",
    startDate: "2020",
    endDate: "2020",
    description: "A comprehensive Linux administration course covering command-line mastery, system administration, server management, and DevOps practices. The course includes shell scripting automation, network configuration, security hardening, and deployment strategies. Essential skills for managing blockchain node infrastructure and deploying decentralized applications in production environments.",
    skills: ["Linux", "Bash", "System Administration", "DevOps", "Shell Scripting", "Networking"],
    logo: '/logos/Udemy_Logo_0.svg',
    website: "https://www.udemy.com/course/complete-linux-training-course-to-get-your-dream-it-job/"
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