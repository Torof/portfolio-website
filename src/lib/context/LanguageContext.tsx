'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage or browser language
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Default to browser language if French, otherwise English
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('fr')) {
        setLanguage('fr');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    let text = (translations[language] as Record<string, string>)?.[key] || (translations.en as Record<string, string>)[key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object - we'll expand this
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.vibe-coding': 'Vibe Coding',
    'nav.contact': 'Contact',

    // Home page
    'hero.title': 'Blockchain Developer',
    'hero.subtitle': 'Experienced blockchain developer specializing in smart contracts, DeFi, and NFTs. Building the decentralized future, one line of code at a time.',
    'hero.cta': 'View Experience',
    'hero.projects': 'Explore Projects',
    'hero.contact': 'Get In Touch',
    'hero.experienceYears': 'Blockchain developer since {year}',
    'hero.tagline': 'Full Stack Web3 Developer',

    // About section
    'about.title': 'About Me',
    'about.description': 'Passionate blockchain developer with expertise in smart contracts, DeFi protocols, and decentralized applications. I combine technical excellence with creative problem-solving to deliver robust Web3 solutions.',
    'about.skills': 'Technical Skills',
    'about.interests.vibe': 'Vibe coding sessions with ambient music and flow states',
    'about.vibeButton': 'Vibe Coding',
    'about.whatIDo': 'What I Do',
    'about.card1.text': 'I\'m a passionate blockchain developer with expertise in smart contract development, having started my journey in {year}. With over {experience} years in the blockchain space, I\'ve gained deep experience in Solidity, EVM, DeFi, and NFTs.',
    'about.card2.text': 'I build fullstack Decentralized Applications (dApps) from conception to production, with a focus on security, efficiency, and user experience. My background includes working with various blockchain platforms and technologies, always staying at the cutting edge.',
    'about.card3.text': 'Currently expanding my expertise to include Rust, Solana, and Polkadot, I\'m constantly learning and adapting to the evolving blockchain landscape.',
    'about.item1': 'Design and develop secure, efficient smart contracts',
    'about.item2': 'Build full-stack dApps with modern frontend technologies',
    'about.item3': 'Audit and optimize existing blockchain projects',
    'about.item4': 'Create and implement token economies and NFT systems',

    // Skills section
    'skills.blockchain': 'Blockchain',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools & Others',
    'skills.hard': 'Hard Skills',
    'skills.soft': 'Soft Skills', 
    'skills.mad': 'Mad Skills',
    'skills.matrix': 'Skills Matrix',
    
    // Hard Skills
    'skills.solidity': 'Solidity & Smart Contracts',
    'skills.react': 'React & Next.js',
    'skills.typescript': 'TypeScript & JavaScript',
    'skills.vibeCoding': 'Vibe Coding',
    'skills.web3': 'Web3 & Blockchain',
    'skills.nodejs': 'Node.js & Express',
    'skills.hardhat': 'Hardhat & Foundry',
    'skills.git': 'Git & Version Control',
    
    // Soft Skills
    'skills.listening': 'Active Listening',
    'skills.motivation': 'Team Motivation',
    'skills.leadership': 'Supportive Leadership',
    'skills.problemSolving': 'Problem Solving',
    'skills.collaboration': 'Team Collaboration',
    'skills.communication': 'Communication',
    'skills.adaptability': 'Adaptability',
    'skills.criticalThinking': 'Critical Thinking',
    
    // Mad Skills
    'skills.canyoning': 'Canyoning',
    'skills.climbing': 'Rock Climbing',
    'skills.paragliding': 'Paragliding',
    'skills.hiking': 'Hiking & Trekking',
    'skills.lateNightCoding': 'Late Night Coding',
    'skills.hackathons': 'Hackathon Participation',
    'skills.auditing': 'Smart Contract Auditing',
    'skills.gasOptimization': 'Gas Optimization Obsession',
    
    // Experience page
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'My journey through the blockchain and web development landscape, building innovative solutions and growing expertise.',
    'experience.achievements': 'KEY ACHIEVEMENTS',
    'experience.clickForAchievements': 'CLICK FOR ACHIEVEMENTS',
    'experience.clickForDetails': 'CLICK TO GO BACK',
    'experience.recent': 'Recent Experience',
    'experience.viewFull': 'View Full Experience',
    'experience.more': '+{count} more',
    'experience.noAchievements': 'No specific achievements listed for this role.',
    'experience.present': 'PRESENT',

    // Education page
    'education.title': 'Education',
    'education.subtitle': 'My academic journey through blockchain technology, smart contract development, and decentralized systems.',
    'education.skillsAcquired': 'SKILLS ACQUIRED',
    'education.courseDetails': 'COURSE DETAILS',
    'education.clickForDetails': 'CLICK FOR DETAILS',
    'education.clickForSkills': 'CLICK FOR SKILLS',
    'education.certifications': 'Certifications',
    'education.certificationsSubtitle': 'Professional certifications and specialized training programs.',

    // Projects page
    'projects.title': 'My Projects',
    'projects.subtitle': 'A collection of blockchain projects, smart contracts, and DApps pulled directly from my GitHub repositories.',
    'projects.github': 'GitHub',
    'projects.demo': 'Live Demo',
    'projects.githubStats': 'GitHub Statistics',
    'projects.githubStatsSubtitle': 'Real-time metrics showcasing my development activity and language expertise',
    'projects.someOfMyProjects': 'Some of My Projects',
    'projects.metricsDescription': 'A showcase of my development activity, repository contributions, and programming language expertise.',
    'projects.loading': 'Projects Loading...',
    'projects.loadingDescription': 'Fetching the latest projects from GitHub. Please refresh if this takes too long.',
    'projects.noProjects': 'No Projects Found',
    'projects.noProjectsDescription': 'Unable to fetch projects from GitHub at this time.',

    // Contact page
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s discuss your next blockchain project.',
    'contact.buildTogether': 'Let\'s Build Together',
    'contact.vision': 'Ready to bring your blockchain vision to life? I specialize in creating robust smart contracts, innovative DeFi solutions, and seamless Web3 experiences.',
    'contact.innovate': 'Ready to Innovate?',
    'contact.discuss': 'From smart contract audits to full-stack dApp development, let\'s discuss how we can push the boundaries of what\'s possible in Web3.',
    'contact.startConversation': 'Start the Conversation',
    'contact.connect': 'Let\'s Connect',
    'contact.ready': 'Ready to collaborate on blockchain projects or discuss Web3 opportunities? Get in touch!',
    'contact.linkedin.description': 'Connect with me professionally and see my career journey in blockchain development.',
    'contact.linkedin.cta': 'Connect on LinkedIn',
    'contact.github.description': 'Explore my code repositories, contributions, and open-source blockchain projects.',
    'contact.github.cta': 'View my repositories',
    'contact.email.description': 'Reach out directly for project inquiries, collaborations, or business opportunities.',
    'contact.aboutMe': 'About Me',
    'contact.nationality': 'French Nationality',
    'contact.languages': 'Languages:',
    'contact.yearsExperience': '{years}+ Years Experience',
    'contact.projectsDelivered': '{count}+ Projects Delivered',
    'contact.responseTime': '{time}h Response Time',
    'contact.focusCore': 'Focus on Core Logic',
    'contact.focusCoreDescription': 'More time for smart contract optimization and security',

    // Vibe Coding page
    'vibe-coding.title': 'Vibe Coding',
    'vibe-coding.subtitle': 'Coding with AI-powered tools and ambient vibes.',
    'vibe-coding.description': 'The Future of Development',
    'vibe-coding.aiPowered': 'AI-Powered',
    'vibe-coding.productivity': 'Enhanced Productivity',
    'vibe-coding.workflow': 'Enhanced Workflow',
    'vibe-coding.blockchainDev': 'Blockchain Development',
    'vibe-coding.aiAcceleration': 'AI Acceleration',
    'vibe-coding.approach': 'is my approach to development where AI tools accelerate frontend and integration work, while I personally write, test, and audit all blockchain code without AI assistance.',
    'vibe-coding.whileIArchitect': 'I personally architect, write, optimize, and audit all smart contracts without any AI assistance. AI only accelerates non-blockchain tasks—building frontends, backends, and integrations at 10x speed. Every line of code is thoroughly tested and audited before production.',
    'vibe-coding.coreExpertise': 'Core Blockchain Expertise',
    'vibe-coding.aiArsenal': 'AI Arsenal',
    'vibe-coding.arsenalSubtitle': 'The powerful AI tools that ignite my development velocity',
    'vibe-coding.impactMetrics': 'Impact Metrics',
    'vibe-coding.fasterFrontend': 'Faster Frontend Development',
    'vibe-coding.fasterFrontendDesc': 'From weeks to days for complete dApp interfaces',
    'vibe-coding.reducedIntegration': 'Reduced Integration Time',
    'vibe-coding.reducedIntegrationDesc': 'Seamless Web3 connectivity and API development',
    'vibe-coding.result': 'Result: Complete dApp ecosystems delivered in record time. All blockchain code is handwritten, tested, and audited. AI is never used for smart contract development.',

    // Vibe Coding Core Expertise Items
    'vibe-coding.core.architecture': 'Smart Contract Architecture & Design (100% Handwritten)',
    'vibe-coding.core.solidity': 'Solidity Development & Optimization (No AI)',
    'vibe-coding.core.gas': 'Gas Efficiency & Security Patterns',
    'vibe-coding.core.deployment': 'Contract Deployment & Configuration',
    'vibe-coding.core.auditing': 'Security Auditing & Testing Before Production',
    'vibe-coding.core.defi': 'DeFi Protocol Logic & Tokenomics',

    // Vibe Coding AI-Powered Items
    'vibe-coding.ai.frontend': 'React/Next.js Frontend Development (Non-Blockchain)',
    'vibe-coding.ai.backend': 'Node.js Backend & API Creation (Off-Chain)',
    'vibe-coding.ai.web3': 'Ethers.js Web3 Integrations',
    'vibe-coding.ai.ui': 'UI/UX Design & Component Libraries',
    'vibe-coding.ai.testing': 'Testing Suites & Automation',
    'vibe-coding.ai.docs': 'Documentation & Deployment Scripts',

    // AI Tools
    'vibe-coding.tool.claude.name': 'Claude',
    'vibe-coding.tool.claude.desc': 'Accelerating my existing frontend skills to ship UIs faster, letting me focus on smart contracts and blockchain architecture',
    'vibe-coding.tool.cursor.name': 'Cursor IDE',
    'vibe-coding.tool.cursor.desc': 'AI-powered code completion and refactoring at lightning speed',
    'vibe-coding.tool.copilot.name': 'GitHub Copilot',
    'vibe-coding.tool.copilot.desc': 'Eliminating repetitive typing for patterns I know by heart, turning hours of boilerplate into minutes of review',
    'vibe-coding.tool.chatgpt.name': 'ChatGPT 4',
    'vibe-coding.tool.chatgpt.desc': 'Deep technical research and documentation assistant, condensing hours of searching into instant, comprehensive answers',
    'vibe-coding.tool.perplexity.name': 'Perplexity',
    'vibe-coding.tool.perplexity.desc': 'Real-time research and latest protocol documentation',
    'vibe-coding.tool.v0.name': 'v0 by Vercel',
    'vibe-coding.tool.v0.desc': 'Rapid UI prototyping and component generation',

    // Vibe Coding Disclaimer
    'vibe-coding.disclaimer.title': 'Important: AI Usage Disclaimer',
    'vibe-coding.disclaimer.text': 'AI tools are ONLY used for frontend development, UI/UX, and non-blockchain integrations. All smart contracts, DeFi protocols, and blockchain code are written 100% manually without any AI assistance.',
    'vibe-coding.disclaimer.testing': 'Every line of code—whether AI-assisted or handwritten—undergoes rigorous testing, security audits, and code review before production deployment.',
    'vibe-coding.disclaimer.blockchain': 'Blockchain Security First: No AI touches smart contract code. Ever.',

    // Tech Stack Section  
    'techStack.title': 'My Tech Stack',
    'techStack.description': 'Technologies and tools I use to bring blockchain projects to life. My expertise spans from smart contract development to frontend implementation and backend integration.',
    
    // Featured Projects Section
    'featuredProjects.title': 'Featured Projects',
    'featuredProjects.description': 'Explore my recent blockchain development work, including smart contracts, DeFi applications, and web3 integrations. Each project showcases different aspects of my technical skills.',

    // GitHub Stats
    'github.topLanguages': 'Top Languages',
    'github.viewProfile': 'View GitHub Profile',
    'github.repositories': 'Repositories',
    'github.followers': 'Followers',
    'github.following': 'Following',
    'github.stars': 'Stars',
    'github.commits': 'Commits',
    'github.contributions': 'Contributions',
    'github.thisYear': 'This Year',

    // Experience Data Translations
    'exp.ledgity.position': 'Blockchain Developer',
    'exp.ledgity.description': 'Solo blockchain developer responsible for smart contract development, integration, maintenance, and frontend modifications.',
    'exp.ledgity.achievement.1': 'Developed robust, secure smart contracts using Solidity on Ethereum L1 and L2.',
    'exp.ledgity.achievement.2': 'Conducted code reviews and audits to ensure high-quality, bug-free code before deployment.',
    'exp.ledgity.achievement.3': 'Integrated decentralized applications (dApps) with smart contracts to enhance user experience.',
    'exp.ledgity.achievement.4': 'Managed the deployment and maintenance of smart contracts on multiple blockchain networks.',
    'exp.ledgity.achievement.5': 'Developed user-friendly interfaces for complex blockchain functions to improve accessibility.',

    'exp.freelance.position': 'Freelance Smart Contract Developer',
    'exp.freelance.description': 'Provided blockchain development services to various clients, focusing on smart contract creation and dApp development.',
    'exp.freelance.achievement.1': 'Created a staking contract for NFTs that successfully minted over 21 million ERC20 tokens and currently holding 1400+ NFTs in staking.',
    'exp.freelance.achievement.2': 'Developed and deployed decentralized applications on EVM Blockchains using Solidity, React.js, Next.js.',
    'exp.freelance.achievement.3': 'Collaborated with clients to define project requirements and deliver scalable solutions.',
    'exp.freelance.achievement.4': 'Integrated oracles for real-time data feeds into smart contracts.',
    'exp.freelance.achievement.5': 'Created and managed ERC-20 and ERC-721 token standards for various projects.',
    'exp.freelance.achievement.6': 'Conducted thorough testing using frameworks like Foundry and Hardhat.',

    'exp.tasc.position': 'CEO',
    'exp.tasc.description': 'Founded and led a company developing a Play-to-Earn blockchain game.',
    'exp.tasc.achievement.1': 'Founded a company to build a P2E game and led a team of developers using Agile methodologies (SCRUM).',
    'exp.tasc.achievement.2': 'Developed and implemented strategic vision to drive company growth and profitability.',
    'exp.tasc.achievement.3': 'Managed crisis communications effectively to maintain brand integrity.',
    'exp.tasc.achievement.4': 'Developed smart contracts for in-game assets using Solidity.',
    'exp.tasc.achievement.5': 'Implemented an Ethereum-based token economy to enhance player engagement.',

    'exp.future-institution.position': 'Smart Contract Developer',
    'exp.future-institution.description': 'Led the development of smart contracts for a blockchain game.',
    'exp.future-institution.achievement.1': 'Led the development of smart contracts for a Blockchain game.',
    'exp.future-institution.achievement.2': 'Led the design and implementation of robust smart contracts on Ethereum.',
    'exp.future-institution.achievement.3': 'Implemented token standards, including ERC20 and ERC721, to facilitate token creation and management.',

    'exp.bitcoin-vietnam.position': 'Intern Web3 Developer',
    'exp.bitcoin-vietnam.description': 'Gained initial blockchain development experience through internship focused on Web3 technologies.',
    'exp.bitcoin-vietnam.achievement.1': 'Researched ERC20 tokens, and created an ERC20 token for the company.',
    'exp.bitcoin-vietnam.achievement.2': 'Collaborated with a team to develop decentralized applications (dApps) using Ethereum blockchain.',
    'exp.bitcoin-vietnam.achievement.3': 'Assisted in smart contract development using Solidity to automate processes and enhance security.',
    'exp.bitcoin-vietnam.achievement.4': 'Maintained the front-end of the website',

    'exp.alyra-jury.position': 'Technical Jury',
    'exp.alyra-jury.description': 'Evaluating and certifying the next generation of blockchain developers by assessing their final DApp projects, ensuring they meet industry standards for smart contract security, architecture, and innovation.',
    'exp.alyra-jury.achievement.1': 'September 2023 - Finney Jury - POAP: https://collectors.poap.xyz/token/6970868',
    'exp.alyra-jury.achievement.2': 'April 2024 - Lovelace Jury - POAP: https://collectors.poap.xyz/token/7112109',
    'exp.alyra-jury.achievement.3': 'July 2024 - Turing Jury - POAP: https://collectors.poap.xyz/token/7191799',
    'exp.alyra-jury.achievement.4': 'April 2025 - Galilée Jury - POAP: https://collectors.poap.xyz/token/7390138',
    'exp.alyra-jury.achievement.5': 'January 2025 - Hamilton Jury - POAP: https://collectors.poap.xyz/token/7390139',

    'exp.chiliz-hackathon.position': 'Hackathon Participant',
    'exp.chiliz-hackathon.description': 'Built "Chiliz Got Talent" - an innovative platform for sports talent discovery on Chiliz blockchain.',
    'exp.chiliz-hackathon.achievement.1': 'Developed full-stack dApp with React TypeScript frontend',
    'exp.chiliz-hackathon.achievement.2': 'Implemented smart contracts for talent verification and rewards',
    'exp.chiliz-hackathon.achievement.3': 'Created backend API with Handlebars templating',
    'exp.chiliz-hackathon.achievement.4': 'Delivered working prototype within hackathon timeframe',
    'exp.chiliz-hackathon.achievement.5': 'Team name: RedCodeChilizPeppers',

    'exp.eth-global-hackathon.position': 'Hackathon Participant',
    'exp.eth-global-hackathon.description': 'Built AATBA Profile - Trustless & Verifiable Profile with Security & Privacy, fully on-chain.',
    'exp.eth-global-hackathon.achievement.1': 'Developed on-chain identity management platform using Soul Bound Tokens (SBT)',
    'exp.eth-global-hackathon.achievement.2': 'Implemented Token Bound Accounts (TBA) with ERC6551 standard',
    'exp.eth-global-hackathon.achievement.3': 'Integrated Account Abstraction using ERC4337',
    'exp.eth-global-hackathon.achievement.4': 'Deployed across multiple testnets: Scroll Sepolia, Mantle, Mumbai Polygon',
    'exp.eth-global-hackathon.achievement.5': 'Created live demo at aatba.org',
    'exp.eth-global-hackathon.achievement.6': 'Collaborated with international team of 5 developers',

    'exp.careerzen-hackathon.position': 'Hackathon Participant',
    'exp.careerzen-hackathon.description': 'Built CareerZen - a blockchain-based career verification platform using NFTs to authenticate work history and enable anonymous professional networking.',
    'exp.careerzen-hackathon.achievement.1': 'Created career NFT system for verified work history and certifications',
    'exp.careerzen-hackathon.achievement.2': 'Implemented privacy-preserving profile sharing with approval mechanism',
    'exp.careerzen-hackathon.achievement.3': 'Built anonymous professional networking features for Asian job market needs',
    'exp.careerzen-hackathon.achievement.4': 'Tackled gasless transaction implementation with ecrecover signature verification',
    'exp.careerzen-hackathon.achievement.5': 'Enabled third-party career validation from mentors, hackathons, and instructors',

    // Education Data Translations
    'edu.rareskills.degree': 'Blockchain Development',
    'edu.rareskills.field': 'DeFi deepdive, NFT & ERC20, Testing & auditing, EVM deepdive: Yul/assembly/HUFF',
    'edu.rareskills.description': 'RareSkills is a premium blockchain education platform founded by Jeffrey Scholz, focusing on advanced smart contract security and optimization. This intensive program covers cutting-edge DeFi protocols, advanced ERC standards implementation, comprehensive testing methodologies, security auditing practices, and low-level EVM programming including Yul and assembly language. The curriculum is designed for experienced developers seeking expertise in blockchain security and gas optimization.',

    'edu.consensys.degree': 'Blockchain Development',
    'edu.consensys.field': 'Dapp, Ethereum, Solidity, React.js, Blockchain clients',
    'edu.consensys.description': 'ConsenSys Academy is the educational arm of ConsenSys, the leading Ethereum software company founded by Joseph Lubin. This comprehensive program provides enterprise-grade blockchain education, covering full-stack decentralized application development, Ethereum ecosystem architecture, advanced Solidity programming, React.js integration for Web3 frontends, and blockchain client implementation. The academy is recognized for producing industry-ready blockchain developers.',

    'edu.alyra.degree': 'Blockchain Development',
    'edu.alyra.field': 'Ethereum, Smart Contracts, Dapp Development',
    'edu.alyra.description': 'Alyra is France\'s leading blockchain school, offering comprehensive training programs in blockchain technology and smart contract development. This foundational program provides hands-on experience with Ethereum blockchain, smart contract architecture and deployment, decentralized application development, and blockchain fundamentals. Alyra is known for its practical approach to blockchain education and strong industry connections in the European blockchain ecosystem.',

    'edu.alyra-solana.degree': 'Solana Developer',
    'edu.alyra-solana.field': 'Solana blockchain, Rust programming, Anchor framework, SPL tokens',
    'edu.alyra-solana.description': 'Advanced Solana development program at Alyra focusing on high-performance blockchain development. This specialized course covers Solana\'s unique architecture, Rust programming for blockchain applications, the Anchor development framework, and SPL token creation. Students learn to build scalable decentralized applications on one of the fastest blockchains, mastering Solana\'s account model, program deployment, and integration with Web3 frontends.',

    'edu.udemy-rust-code.degree': 'Learn to Code with Rust',
    'edu.udemy-rust-code.field': 'Complete Rust programming course covering fundamentals, memory management, and systems programming',
    'edu.udemy-rust-code.description': 'A comprehensive Rust programming course that covers the language from fundamentals to advanced concepts. The course focuses on Rust\'s unique ownership system, memory safety without garbage collection, and systems programming capabilities. Students learn to build high-performance applications with zero-cost abstractions, concurrent programming, and robust error handling patterns that make Rust ideal for blockchain and systems development.',

    'edu.udemy-react-complete.degree': 'React - The Complete Guide',
    'edu.udemy-react-complete.field': 'Comprehensive React course including Redux, Hooks, Context API, and modern React patterns',
    'edu.udemy-react-complete.description': 'An in-depth React course covering modern React development patterns and best practices. The course includes advanced state management with Redux and Context API, modern React Hooks for functional programming, component lifecycle optimization, and performance techniques. Essential for building sophisticated Web3 frontends and decentralized applications with React.',

    'edu.udemy-nodejs-complete.degree': 'The Complete Node.js Developer Course',
    'edu.udemy-nodejs-complete.field': 'Full-stack Node.js development with Express, MongoDB, authentication, and API building',
    'edu.udemy-nodejs-complete.description': 'A comprehensive Node.js course covering server-side JavaScript development, RESTful API design, database integration with MongoDB, authentication systems, and deployment strategies. The course emphasizes building scalable backend services that can support blockchain applications and integrate with Web3 infrastructure for complete full-stack development.',

    'edu.udemy-react-zero-mastery.degree': 'Complete React Developer - Zero to Mastery',
    'edu.udemy-react-zero-mastery.field': 'Advanced React development including TypeScript, testing, performance optimization, and deployment',
    'edu.udemy-react-zero-mastery.description': 'An advanced React development course that takes students from beginner to expert level. Covers TypeScript integration for type-safe React applications, comprehensive testing strategies, performance optimization techniques, and production deployment workflows. Particularly valuable for building robust Web3 interfaces and decentralized application frontends with professional-grade code quality.',

    'edu.udemy-rust-crash.degree': 'Ultimate Rust Crash Course',
    'edu.udemy-rust-crash.field': 'Intensive Rust programming bootcamp focusing on practical applications and best practices',
    'edu.udemy-rust-crash.description': 'An intensive Rust programming bootcamp designed for rapid skill acquisition. The course focuses on Rust\'s unique ownership model, borrowing and lifetime concepts, trait system for code reuse, and concurrent programming patterns. Emphasizes practical applications and industry best practices, making it perfect for developers transitioning to blockchain development where performance and safety are critical.',

    'edu.udemy-linux-complete.degree': 'Complete Linux Training Course',
    'edu.udemy-linux-complete.field': 'Comprehensive Linux administration covering command line, system administration, and DevOps practices',
    'edu.udemy-linux-complete.description': 'A comprehensive Linux administration course covering command-line mastery, system administration, server management, and DevOps practices. The course includes shell scripting automation, network configuration, security hardening, and deployment strategies. Essential skills for managing blockchain node infrastructure and deploying decentralized applications in production environments.',

    'edu.udemy-solidity-advanced.degree': 'Advanced Solidity - Yul and Assembly',
    'edu.udemy-solidity-advanced.field': 'Deep dive into Solidity optimization using Yul intermediate language and EVM assembly programming',
    'edu.udemy-solidity-advanced.description': 'An advanced course focusing on low-level Solidity optimization techniques using Yul intermediate language and EVM assembly programming. Students learn to write highly optimized smart contracts, understand EVM internals, implement custom opcodes, and achieve significant gas savings. Critical knowledge for professional smart contract development and auditing in the DeFi space.',

    'edu.udemy-solidity-gas.degree': 'Advanced Solidity - Gas Optimization',
    'edu.udemy-solidity-gas.field': 'Advanced techniques for optimizing smart contract gas usage and understanding EVM internals',
    'edu.udemy-solidity-gas.description': 'A specialized course dedicated to smart contract gas optimization and EVM efficiency. Covers advanced techniques for reducing transaction costs, storage optimization patterns, function call efficiency, and EVM-level optimizations. Students learn to analyze gas consumption, implement cost-effective design patterns, and build economically sustainable smart contracts for production DeFi protocols.',

    // Skills Page
    'skills.advanced.title': 'Advanced Skills',
    'skills.advanced.subtitle': 'Deep technical expertise in blockchain development, smart contracts, and decentralized finance',
    'skills.whatCanDo.title': 'What I Can Do For You',
    'skills.whatCanDo.subtitle': 'From concept to production, I deliver complete blockchain solutions that drive real business value',
    'skills.service1.title': 'Complete Smart Contract Systems',
    'skills.service1.description': 'I architect and build entire smart contract ecosystems from scratch, handling everything from tokenomics design to complex DeFi mechanics.',
    'skills.service1.feature1': 'Custom token standards (ERC-20, ERC-721, ERC-1155)',
    'skills.service1.feature2': 'DeFi protocols (AMMs, lending, staking, yield farming)',
    'skills.service1.feature3': 'Governance systems and DAOs',
    'skills.service1.feature4': 'Multi-chain deployment strategies',
    'skills.service2.title': 'Optimization & Security Auditing',
    'skills.service2.description': 'I optimize existing contracts for gas efficiency and conduct thorough security reviews to ensure your protocols are bulletproof.',
    'skills.service2.feature1': 'Gas optimization using Yul and assembly',
    'skills.service2.feature2': 'Security vulnerability assessments',
    'skills.service2.feature3': 'Code refactoring for efficiency',
    'skills.service2.feature4': 'Best practices implementation',
    'skills.service3.title': 'End-to-End DApp Development',
    'skills.service3.description': 'I build complete decentralized applications with modern frontends, robust backends, and seamless blockchain integration.',
    'skills.service3.feature1': 'React/Next.js frontend development',
    'skills.service3.feature2': 'Web3 integration (ethers.js, wagmi)',
    'skills.service3.feature3': 'Backend APIs and indexing services',
    'skills.service3.feature4': 'IPFS integration and decentralized storage',
    'skills.whyChoose.title': 'Why I\'m the Right Choice',
    'skills.whyChoose.experience': '6+ Years Experience',
    'skills.whyChoose.experienceDesc': 'Battle-tested in production environments',
    'skills.whyChoose.security': 'Security First',
    'skills.whyChoose.securityDesc': 'Auditing mindset in every line of code',
    'skills.whyChoose.innovation': 'Innovation Driven',
    'skills.whyChoose.innovationDesc': 'Always exploring cutting-edge solutions',
    'skills.whyChoose.client': 'Client Focused',
    'skills.whyChoose.clientDesc': 'Your success is my priority',
    'skills.techStack.title': 'My Tech Stack',
    'skills.techStack.description': 'A flowing showcase of all the technologies I use to build amazing digital experiences',
    'skills.techStack.riverView': '🌊 Click to see River View',
    'skills.techStack.listView': '📋 Click to see List View',
    'skills.techStack.count': 'Technology Stack ({count} Technologies)',
    'skills.expertise.title': 'Technical Expertise',
    'skills.expertise.subtitle': 'Explore my specialized blockchain development skills through uniquely themed sections, each showcasing different aspects of my expertise.',

    // DeFi Section Dropdown
    'defi.dropdown.protocols': 'PROTOCOLS',
    'defi.dropdown.type': 'TYPE',
    'defi.dropdown.tvl': 'TVL',
    'defi.dropdown.24h': '24H',
    'defi.dropdown.status': 'STATUS',
    'defi.dropdown.expert': 'EXPERT',
    'defi.dropdown.active': 'ACTIVE',
    'defi.dropdown.expand': 'EXPAND',
    'defi.dropdown.collapse': 'COLLAPSE',

    // Layer2 Section
    'layer2.title': 'Layer 2 Network',
    'layer2.subtitle': 'Interconnected scaling ecosystem',
    'layer2.description': 'I architect multi-chain ecosystems where each Layer 2 serves specific purposes - from high-throughput gaming on Polygon to innovative DeFi on Arbitrum, all connected through secure bridge infrastructure.',
    'layer2.architecture.title': 'Multi-Chain Architecture',
    'layer2.architecture.intro': 'I specialize in building cross-chain applications that leverage the unique strengths of each Layer 2 network:',
    'layer2.architecture.arbitrum': 'DeFi protocols with complex logic and composability',
    'layer2.architecture.polygon': 'High-volume consumer applications and gaming',
    'layer2.architecture.zksync': 'Privacy-focused and ZK-powered applications',
    'layer2.architecture.gnosis': 'DAOs and innovative consensus mechanisms',
    'layer2.architecture.conclusion': 'My expertise includes implementing secure cross-chain messaging, unified liquidity management, and seamless user experiences across multiple networks.',

    // Layer2 Tooltips
    'layer2.tooltip.arbitrum': 'Optimistic rollup scaling solution',
    'layer2.tooltip.optimism': 'Optimistic rollup with fault proofs',
    'layer2.tooltip.polygon': 'Multi-chain scaling platform',
    'layer2.tooltip.gnosis': 'Community-owned EVM chain focused on stability and decentralization',
    'layer2.tooltip.zksync': 'EVM-compatible zkRollup with native account abstraction',
    'layer2.tooltip.scroll': 'Bytecode-level EVM-equivalent zkRollup for seamless migration',
    'layer2.tooltip.base': 'Coinbase L2 built on OP Stack for mainstream adoption',
    'layer2.tooltip.berachain': 'EVM-compatible chain with innovative PoL consensus',

    // Security Section
    'security.title': 'SMART CONTRACT SECURITY & AUDITING',
    'security.description.intro': 'Security is paramount in DeFi. Smart contracts handle billions in value and are immutable once deployed.',
    'security.description.vulnerability': 'A single vulnerability can lead to catastrophic losses, making thorough security analysis essential for any serious protocol.',
    'security.description.focus': 'I focus on common attack vectors like reentrancy, flash loan exploits, and access control flaws.',
    'security.description.watch': 'Watch real-time threat detection in action below • Hover on elements for detailed information •',
    'security.description.turrets': 'Turrets represent security skills defending against common vulnerabilities',
    'security.system.title': 'SECURITY DEFENSE SYSTEM',
    'security.system.status': 'AUTO-TARGETING: ENABLED | THREAT LEVEL: ACTIVE',
    'security.system.neutralized': 'THREATS NEUTRALIZED',
    'security.threat.monitor': 'THREAT MONITOR',
    'security.threat.active': 'ACTIVE INCOMING THREATS',
    'security.threat.none': 'No threats detected',
    'security.threat.detect': 'DETECT:',
    'security.threat.prevent': 'PREVENT:',
    'security.threat.fix': 'FIX:',
    'security.arsenal.title': 'SECURITY ARSENAL',
    'security.arsenal.subtitle': 'LEGENDARY WEAPONS & POWER-UPS FOR THE ULTIMATE SECURITY AUDIT',
    'security.arsenal.openzeppelin.short': '+50% Defense vs Access Control',
    'security.arsenal.slither.short': 'Auto-detects 90+ vulnerabilities',
    'security.arsenal.foundry.short': 'Unlimited fuzz testing power',
    'security.arsenal.echidna.short': 'Property-based fuzz testing',
    'security.arsenal.openzeppelin': 'Industry-standard library of secure, reusable smart contract components. Provides battle-tested implementations of ERC standards, access control, and security patterns used by thousands of projects.',
    'security.arsenal.slither': 'Static analysis framework for Solidity smart contracts. Detects vulnerabilities, optimization opportunities, and code quality issues. Essential tool for automated security scanning with 90+ built-in detectors.',
    'security.arsenal.foundry': 'Fast, portable and modular toolkit for Ethereum development. Features advanced testing with fuzzing, gas optimization, and deployment scripting. The gold standard for modern smart contract development and testing.',
    'security.arsenal.echidna': 'Property-based fuzzer for Ethereum smart contracts by Trail of Bits. Generates random inputs to test invariants and find edge cases. Specialized in discovering subtle bugs through automated property verification.',
    'security.master.title': 'MASTER AUDITOR STATUS: UNLOCKED',
    'security.master.description': 'All legendary security tools mastered • 100% vulnerability coverage',
    'security.status.online': 'SYSTEMS ONLINE',
    'security.status.scan': 'SCAN',
    'security.status.hoverElements': 'Hover on elements',
    'security.status.allClear': 'All Clear',
    'security.status.score': 'SCORE:',
    'security.status.detailedInfo': 'for detailed information',

    // ERC Standard Descriptions
    'erc.erc20.description': 'Standard for fungible tokens on Ethereum',
    'erc.erc721.description': 'Non-fungible token standard for unique digital assets',
    'erc.erc4626.description': 'Standard for yield-bearing vaults and asset management',
    'erc.erc2535.description': 'Modular smart contract system for upgradeable contracts',
    'erc.erc4337.description': 'Smart contract wallets without protocol changes',
    'erc.erc1155.description': 'Standard for contracts managing multiple token types',
    'erc.erc2981.description': 'Standardized royalty information for NFT marketplaces',
    'erc.erc6551.description': 'NFTs that can own assets and interact with applications',
    'erc.erc2612.description': 'Gasless token approvals using signatures',
    'erc.erc3156.description': 'Standardized interface for flash loan providers and receivers',
    'erc.erc4907.description': 'NFT rental standard for time-limited usage rights',
    'erc.erc5192.description': 'Non-transferable tokens for identity and credentials',
    'erc.erc165.description': 'Standard method to detect contract interfaces',
    'erc.erc1271.description': 'Standard for contract-based signature validation',
    'erc.erc1967.description': 'Standard proxy storage slots to avoid clashes',
    'erc.erc2767.description': 'Standard for on-chain governance and voting',
    'erc.erc5805.description': 'Standardized voting with delegation capabilities',
    'erc.proxy-patterns.description': 'Proxy patterns and upgrade mechanisms for smart contracts',
    'erc.access-control.description': 'Role-based access control and permission management',
    'erc.merkle-trees.description': 'Efficient data verification and whitelist mechanisms',

    // ERC Detail Cards UI
    'erc.detail.viewEIP': 'View EIP',
    'erc.detail.myExperience': 'My Experience',
    'erc.detail.useCases': 'Use Cases',
    
    // ERC Wheel Controls
    'erc.wheel.tryLuck': 'Try your luck! ↓',
    'erc.wheel.random': '🎲 RANDOM',
    'erc.wheel.spinning': '⚡ SPINNING...',
    'erc.wheel.spinTooltip': 'Spin the retro wheel to randomly select a standard',

    // Threat Types Process Descriptions (Names stay in English)
    'threat.reentrancy.description': 'Malicious contract calls back into vulnerable function before state updates complete',
    'threat.reentrancy.detect': 'Use static analysis tools (Slither) to identify external calls before state changes',
    'threat.reentrancy.prevent': 'Apply checks-effects-interactions pattern and use ReentrancyGuard modifier',
    'threat.reentrancy.fix': 'Move state updates before external calls, add mutex locks',
    
    'threat.overflow.description': 'Arithmetic operations exceed maximum values causing unexpected behavior',
    'threat.overflow.detect': 'Implement invariant testing with Foundry to catch arithmetic edge cases',
    'threat.overflow.prevent': 'Use SafeMath library or Solidity 0.8+ built-in overflow checks',
    'threat.overflow.fix': 'Replace unchecked arithmetic with safe operations and add bounds checking',
    
    'threat.flash-loan.description': 'Exploits using large uncollateralized loans to manipulate DeFi protocols',
    'threat.flash-loan.detect': 'Monitor for unusual transaction patterns and price oracle manipulations',
    'threat.flash-loan.prevent': 'Use time-weighted average prices (TWAP) and transaction delays',
    'threat.flash-loan.fix': 'Implement oracle validation, add slippage protection and pause mechanisms',
    
    'threat.access-control.description': 'Unauthorized users gain access to restricted functions or data',
    'threat.access-control.detect': 'Audit role assignments and use access control testing frameworks',
    'threat.access-control.prevent': 'Implement OpenZeppelin AccessControl with proper role hierarchies',
    'threat.access-control.fix': 'Add onlyRole modifiers and remove unused privileged functions',
    
    'threat.price-manip.description': 'Manipulation of price feeds to exploit DeFi lending and trading protocols',
    'threat.price-manip.detect': 'Monitor price deviations and use multiple oracle sources for validation',
    'threat.price-manip.prevent': 'Implement Chainlink oracles with heartbeat and deviation thresholds',
    'threat.price-manip.fix': 'Add circuit breakers, price sanity checks, and oracle aggregation',
    
    'threat.front-run.description': 'Malicious actors front-run transactions for profit extraction',
    'threat.front-run.detect': 'Analyze mempool for transaction ordering attacks and MEV patterns',
    'threat.front-run.prevent': 'Use commit-reveal schemes and private mempools (Flashbots)',
    'threat.front-run.fix': 'Implement batch auctions, time delays, and randomized execution',
    
    'threat.dos.description': 'Denial of service attacks that prevent normal contract operations',
    'threat.dos.detect': 'Monitor gas usage patterns and failed transaction spikes',
    'threat.dos.prevent': 'Implement rate limiting, gas limits, and withdrawal patterns',
    'threat.dos.fix': 'Add circuit breakers, emergency pauses, and external call limits',
    
    'threat.logic-bug.description': 'Flawed business logic that leads to unintended contract behavior',
    'threat.logic-bug.detect': 'Use formal verification tools and comprehensive property testing',
    'threat.logic-bug.prevent': 'Write detailed specifications and use property-based testing',
    'threat.logic-bug.fix': 'Refactor business logic, add invariant checks, and emergency controls',
    
    'threat.sandwich-attack.description': 'MEV bots front-run and back-run user transactions for profit',
    'threat.sandwich-attack.detect': 'Monitor for transaction ordering patterns and slippage exploitation',
    'threat.sandwich-attack.prevent': 'Implement dynamic slippage protection and private mempools',
    'threat.sandwich-attack.fix': 'Add MEV protection mechanisms and fair ordering systems',
    
    'threat.governance-attack.description': 'Malicious proposals or flash loan voting to hijack protocol control',
    'threat.governance-attack.detect': 'Monitor voting patterns and token concentration for unusual activity',
    'threat.governance-attack.prevent': 'Implement timelock delays and voting power caps',
    'threat.governance-attack.fix': 'Add emergency vetoes, snapshot voting, and delegation limits',
    
    'threat.storage-collision.description': 'Proxy storage slots overwriting implementation storage',
    'threat.storage-collision.detect': 'Use storage layout analysis tools and automated slot collision detection',
    'threat.storage-collision.prevent': 'Follow OpenZeppelin proxy patterns with unstructured storage',
    'threat.storage-collision.fix': 'Reorganize storage slots using ERC-1967 standard locations',
    
    'threat.unchecked-return.description': 'Failed external calls going unnoticed leading to state corruption',
    'threat.unchecked-return.detect': 'Use static analysis to find unchecked low-level calls',
    'threat.unchecked-return.prevent': 'Always check return values and use SafeERC20 for token calls',
    'threat.unchecked-return.fix': 'Add explicit success checks and revert on failed external calls',
    
    'threat.centralization-risk.description': 'Single points of failure through admin keys or privileged roles',
    'threat.centralization-risk.detect': 'Audit admin functions and single points of control in governance',
    'threat.centralization-risk.prevent': 'Use multi-sig wallets, timelock controllers, and decentralized governance',
    'threat.centralization-risk.fix': 'Implement progressive decentralization and remove unnecessary admin powers',

    // Security Skills Descriptions
    'security.skill.auditing': 'I perform line-by-line code reviews to identify vulnerabilities before deployment. My audits combine manual analysis with automated tools.',
    'security.skill.attack-vectors': 'I analyze how vulnerabilities chain together in real exploits - flash loans combined with oracle manipulation, governance attacks, and cross-protocol interactions. By thinking like an attacker and studying past hacks, I identify non-obvious attack paths before malicious actors find them.',
    'security.skill.invariant-testing': 'I recognize and prevent well-known attack patterns like reentrancy, integer overflows, and unchecked returns that have caused millions in losses.',
    'security.skill.formal-verification': 'This catches subtle bugs that testing and auditing miss - critical for high-value protocols where failure isn\'t an option.',
    'security.skill.mev-protection': 'I protect users from sandwich attacks and front-running by implementing commit-reveal schemes, TWAP oracles, and private mempool strategies.',

    // Security Additional Content
    'security.subtitle': 'Protecting decentralized applications from vulnerabilities and exploits',
    'security.approach': 'My approach combines automated tools (Slither, Foundry fuzzing), manual code review, and formal verification techniques to identify vulnerabilities before they can be exploited.',
    'security.skill.auditing.focus': 'Focus areas: access control flaws, reentrancy risks, fund management issues, and business logic errors that could lead to exploits.',
    'security.skill.invariant-testing.approach': 'My approach: implement checks-effects-interactions, use SafeMath, validate all external calls, and apply defensive programming patterns.',
    'security.skill.formal-verification.math': 'I use mathematical proofs to guarantee contract behavior. By defining invariants and using symbolic execution, I ensure code works correctly in all scenarios.',
    'security.skill.mev-protection.design': 'My MEV-resistant designs ensure fair trading and prevent value extraction that hurts user experience in DeFi protocols.',

    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.viewAll': 'View All',
    'common.showLess': 'Show less',
    'common.viewMore': 'View {count} more {type} technologies',
    'common.viewAllProjects': 'View All Projects',
    'common.active': 'Active',
    'common.clickToView': 'Click to view',

    // Community Contributions section
    'community.title': 'Community Contributions',
    'community.subtitle': 'Sharing knowledge and helping developers solve complex blockchain challenges on Stack Exchange',
    'community.liveData': 'LIVE DATA',
    'community.loadingData': 'Loading live data...',
    'community.stackExchangeContributor': 'Ethereum Stack Exchange Contributor',
    'community.reputation': 'Reputation',
    'community.gold': 'Gold',
    'community.silver': 'Silver',
    'community.bronze': 'Bronze',
    'community.featuredContributions': 'Featured Contributions',
    'community.question': 'QUESTION:',
    'community.myAnswer': 'MY ANSWER:',
    'community.viewProfile': 'View My Full Stack Exchange Profile',

    // DeFi Protocol Descriptions
    'defi.amm.description': 'DEX protocols using algorithmic pricing',
    'defi.lending.description': 'Collateralized lending protocols',
    'defi.yield-farming.description': 'Liquidity incentive mechanisms and reward distribution',
    'defi.oracles.description': 'External data integration and price feeds',
    'defi.flash-loans.description': 'Uncollateralized loans within single transactions',
    'defi.vaults.description': 'Automated yield generation and vault management',
    'defi.derivatives.description': 'Options, futures, and synthetic assets',
    'defi.liquidations.description': 'Collateral liquidation and auction systems',
    'defi.tokenomics.description': 'Token economics and incentive mechanisms',

    // DeFi Usage Descriptions
    'defi.usage.dex': 'I architect and optimize automated market maker (AMM) systems, implementing custom trading strategies and liquidity pool integrations. My expertise includes MEV protection, arbitrage mechanisms, and cross-chain bridge development for seamless asset transfers.',
    'defi.usage.lending': 'I design sophisticated lending and borrowing protocols with dynamic interest rate models and advanced collateral management systems. My work focuses on risk assessment algorithms, liquidation mechanisms, and yield optimization strategies.',
    'defi.usage.yieldFarming': 'I create auto-compounding yield farming strategies and implement complex reward distribution mechanisms. My expertise covers liquidity mining protocols, governance token economics, and sustainable yield generation models.',
    'defi.usage.derivatives': 'I build advanced derivatives platforms with options, futures, and perpetual contracts. My implementations include synthetic asset protocols, prediction markets, and automated settlement systems.',
    'defi.usage.default': 'I integrate this protocol into comprehensive DeFi ecosystems, focusing on interoperability, gas optimization, and security best practices. My implementations emphasize user experience and robust smart contract architecture.',

    // DeFi Section Headers
    'defi.section.protocolOverview': 'PROTOCOL_OVERVIEW',
    'defi.section.howIUseIt': 'HOW_I_USE_IT',
    'defi.section.keyFeatures': 'KEY_FEATURES',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.experience': 'Expérience',
    'nav.education': 'Éducation',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.vibe-coding': 'Vibe Coding',
    'nav.contact': 'Contact',

    // Home page
    'hero.title': 'Développeur Blockchain',
    'hero.subtitle': 'Développeur blockchain expérimenté spécialisé dans les smart contracts, la DeFi et les NFTs. Construisant l\'avenir décentralisé, une ligne de code à la fois.',
    'hero.cta': 'Voir l\'Expérience',
    'hero.projects': 'Explorer les Projets',
    'hero.contact': 'Me Contacter',
    'hero.experienceYears': 'Développeur blockchain depuis {year}',
    'hero.tagline': 'Développeur Web3 Full Stack',

    // About section
    'about.title': 'À Propos de Moi',
    'about.description': 'Développeur blockchain passionné avec une expertise en smart contracts, protocoles DeFi et applications décentralisées. Je combine l\'excellence technique avec la résolution créative de problèmes pour livrer des solutions Web3 robustes.',
    'about.skills': 'Compétences Techniques',
    'about.interests.vibe': 'Sessions de vibe coding avec musique ambiante et états de flow',
    'about.vibeButton': 'Vibe Coding',
    'about.whatIDo': 'Ce Que Je Fais',
    'about.card1.text': 'Je suis un développeur blockchain passionné avec une expertise en développement de smart contracts, ayant commencé mon parcours en {year}. Avec plus de {experience} années dans l\'espace blockchain, j\'ai acquis une expérience approfondie en Solidity, EVM, DeFi et NFTs.',
    'about.card2.text': 'Je construis des Applications Décentralisées (dApps) complètes de la conception à la production, en mettant l\'accent sur la sécurité, l\'efficacité et l\'expérience utilisateur. Mon expérience inclut le travail avec diverses plateformes et technologies blockchain, restant toujours à la pointe.',
    'about.card3.text': 'Élargissant actuellement mon expertise pour inclure Rust, Solana et Polkadot, j\'apprends et m\'adapte constamment au paysage blockchain en évolution.',
    'about.item1': 'Concevoir et développer des smart contracts sécurisés et efficaces',
    'about.item2': 'Construire des dApps complètes avec des technologies frontend modernes',
    'about.item3': 'Auditer et optimiser les projets blockchain existants',
    'about.item4': 'Créer et implémenter des économies de tokens et systèmes NFT',

    // Skills section
    'skills.blockchain': 'Blockchain',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Outils & Autres',
    'skills.hard': 'Hard Skills',
    'skills.soft': 'Soft Skills',
    'skills.mad': 'Mad Skills',
    'skills.matrix': 'Skills Matrix',
    
    // Hard Skills
    'skills.solidity': 'Solidity & Smart Contracts',
    'skills.react': 'React & Next.js',
    'skills.typescript': 'TypeScript & JavaScript',
    'skills.vibeCoding': 'Vibe Coding',
    'skills.web3': 'Web3 & Blockchain',
    'skills.nodejs': 'Node.js & Express',
    'skills.hardhat': 'Hardhat & Foundry',
    'skills.git': 'Git & Contrôle de Version',
    
    // Soft Skills
    'skills.listening': 'Écoute Active',
    'skills.motivation': 'Motivation d\'Équipe',
    'skills.leadership': 'Leadership Bienveillant',
    'skills.problemSolving': 'Résolution de Problèmes',
    'skills.collaboration': 'Collaboration d\'Équipe',
    'skills.communication': 'Communication',
    'skills.adaptability': 'Adaptabilité',
    'skills.criticalThinking': 'Pensée Critique',
    
    // Mad Skills
    'skills.canyoning': 'Canyoning',
    'skills.climbing': 'Escalade',
    'skills.paragliding': 'Parapente',
    'skills.hiking': 'Randonnée & Trekking',
    'skills.lateNightCoding': 'Codage Nocturne',
    'skills.hackathons': 'Participation aux Hackathons',
    'skills.auditing': 'Audit de Smart Contracts',
    'skills.gasOptimization': 'Obsession d\'Optimisation du Gas',
    
    // Experience page
    'experience.title': 'Expérience Professionnelle',
    'experience.subtitle': 'Mon parcours dans le développement blockchain et web, construisant des solutions innovantes et développant mon expertise.',
    'experience.achievements': 'RÉALISATIONS CLÉS',
    'experience.clickForAchievements': 'CLIQUER POUR RÉALISATIONS',
    'experience.clickForDetails': 'CLIQUER POUR RETOUR',
    'experience.recent': 'Expérience Récente',
    'experience.viewFull': 'Voir l\'Expérience Complète',
    'experience.more': '+{count} de plus',
    'experience.noAchievements': 'Aucune réalisation spécifique listée pour ce poste.',
    'experience.present': 'PRÉSENT',

    // Education page
    'education.title': 'Éducation',
    'education.subtitle': 'Mon parcours académique à travers la technologie blockchain, le développement de smart contracts et les systèmes décentralisés.',
    'education.skillsAcquired': 'COMPÉTENCES ACQUISES',
    'education.courseDetails': 'DÉTAILS DU COURS',
    'education.clickForDetails': 'CLIQUER POUR DÉTAILS',
    'education.clickForSkills': 'CLIQUER POUR COMPÉTENCES',
    'education.certifications': 'Certifications',
    'education.certificationsSubtitle': 'Certifications professionnelles et programmes de formation spécialisés.',

    // Projects page
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Une collection de projets blockchain, smart contracts et DApps récupérés directement de mes référentiels GitHub.',
    'projects.github': 'GitHub',
    'projects.demo': 'Démo Live',
    'projects.githubStats': 'Statistiques GitHub',
    'projects.githubStatsSubtitle': 'Métriques en temps réel montrant mon activité de développement et expertise en langages',
    'projects.someOfMyProjects': 'Quelques-uns de Mes Projets',
    'projects.metricsDescription': 'Une vitrine de mon activité de développement, mes contributions aux dépôts et mon expertise en langages de programmation.',
    'projects.loading': 'Chargement des Projets...',
    'projects.loadingDescription': 'Récupération des derniers projets depuis GitHub. Veuillez actualiser si cela prend trop de temps.',
    'projects.noProjects': 'Aucun Projet Trouvé',
    'projects.noProjectsDescription': 'Impossible de récupérer les projets depuis GitHub pour le moment.',

    // Contact page
    'contact.title': 'Me Contacter',
    'contact.subtitle': 'Discutons de votre prochain projet blockchain.',
    'contact.buildTogether': 'Construisons Ensemble',
    'contact.vision': 'Prêt à donner vie à votre vision blockchain ? Je me spécialise dans la création de smart contracts robustes, de solutions DeFi innovantes et d\'expériences Web3 transparentes.',
    'contact.innovate': 'Prêt à Innover ?',
    'contact.discuss': 'Des audits de smart contracts au développement complet de dApps, discutons de la façon dont nous pouvons repousser les limites du possible dans le Web3.',
    'contact.startConversation': 'Commencer la Conversation',
    'contact.connect': 'Connectons-nous',
    'contact.ready': 'Prêt à collaborer sur des projets blockchain ou discuter d\'opportunités Web3 ? Contactez-moi !',
    'contact.linkedin.description': 'Connectez-vous avec moi professionnellement et découvrez mon parcours dans le développement blockchain.',
    'contact.linkedin.cta': 'Se connecter sur LinkedIn',
    'contact.github.description': 'Explorez mes référentiels de code, contributions et projets blockchain open-source.',
    'contact.github.cta': 'Voir mes référentiels',
    'contact.email.description': 'Contactez-moi directement pour des demandes de projets, collaborations ou opportunités d\'affaires.',
    'contact.aboutMe': 'À Propos de Moi',
    'contact.nationality': 'Nationalité Française',
    'contact.languages': 'Langues :',
    'contact.yearsExperience': '{years}+ Années d\'Expérience',
    'contact.projectsDelivered': '{count}+ Projets Livrés',
    'contact.responseTime': '{time}h Temps de Réponse',
    'contact.focusCore': 'Focus sur la Logique Cœur',
    'contact.focusCoreDescription': 'Plus de temps pour l\'optimisation et la sécurité des smart contracts',

    // Vibe Coding page
    'vibe-coding.title': 'Vibe Coding',
    'vibe-coding.subtitle': 'Développement avec des outils alimentés par IA et des ambiances zen.',
    'vibe-coding.description': 'L\'Avenir du Développement',
    'vibe-coding.aiPowered': 'Alimenté par IA',
    'vibe-coding.productivity': 'Productivité Améliorée',
    'vibe-coding.workflow': 'Développement Accéléré',
    'vibe-coding.blockchainDev': 'Développement Blockchain',
    'vibe-coding.aiAcceleration': 'Accélération IA',
    'vibe-coding.approach': 'est mon approche du développement où les outils IA accélèrent le travail frontend et d\'intégration, tandis que j\'écris, teste et audite personnellement tout le code blockchain sans assistance IA.',
    'vibe-coding.whileIArchitect': 'J\'architecture, écris, optimise et audite personnellement tous les smart contracts sans aucune assistance IA. L\'IA accélère uniquement les tâches non-blockchain—construire les frontends, backends et intégrations à une vitesse 10x. Chaque ligne de code est minutieusement testée et auditée avant la production.',
    'vibe-coding.coreExpertise': 'Expertise Blockchain Fondamentale',
    'vibe-coding.aiArsenal': 'Arsenal IA',
    'vibe-coding.arsenalSubtitle': 'Les puissants outils IA qui enflamment ma vélocité de développement',
    'vibe-coding.impactMetrics': 'Métriques d\'Impact',
    'vibe-coding.fasterFrontend': 'Développement Frontend Plus Rapide',
    'vibe-coding.fasterFrontendDesc': 'De semaines à jours pour des interfaces dApp complètes',
    'vibe-coding.reducedIntegration': 'Temps d\'Intégration Réduit',
    'vibe-coding.reducedIntegrationDesc': 'Connectivité Web3 et développement API transparents',
    'vibe-coding.result': 'Résultat : Écosystèmes dApp complets livrés en temps record. Tout le code blockchain est écrit à la main, testé et audité. L\'IA n\'est jamais utilisée pour le développement de smart contracts.',
    // Vibe Coding Core Expertise Items
    'vibe-coding.core.architecture': 'Architecture et Conception de Smart Contracts (100% Écrit à la Main)',
    'vibe-coding.core.solidity': 'Développement et Optimisation Solidity (Sans IA)',
    'vibe-coding.core.gas': 'Efficacité Gas et Patterns de Sécurité',
    'vibe-coding.core.deployment': 'Déploiement et Configuration de Contrats',
    'vibe-coding.core.auditing': 'Audit de Sécurité et Tests Avant Production',
    'vibe-coding.core.defi': 'Logique de Protocole DeFi et Tokenomics',
    // Vibe Coding AI-Powered Items
    'vibe-coding.ai.frontend': 'Développement Frontend React/Next.js (Non-Blockchain)',
    'vibe-coding.ai.backend': 'Création Backend Node.js et API (Hors-Chaîne)',
    'vibe-coding.ai.web3': 'Intégrations Web3 Ethers.js',
    'vibe-coding.ai.ui': 'Design UI/UX et Bibliothèques de Composants',
    'vibe-coding.ai.testing': 'Suites de Tests et Automatisation',
    'vibe-coding.ai.docs': 'Documentation et Scripts de Déploiement',
    // AI Tools
    'vibe-coding.tool.claude.name': 'Claude',
    'vibe-coding.tool.claude.desc': 'Accélérer mes compétences frontend existantes pour livrer des interfaces plus rapidement, me permettant de me concentrer sur les smart contracts et l\'architecture blockchain',
    'vibe-coding.tool.cursor.name': 'Cursor IDE',
    'vibe-coding.tool.cursor.desc': 'Complétion de code et refactoring alimentés par IA à la vitesse de l\'éclair',
    'vibe-coding.tool.copilot.name': 'GitHub Copilot',
    'vibe-coding.tool.copilot.desc': 'Éliminer la frappe répétitive pour les patterns que je connais par cœur, transformant des heures de code boilerplate en minutes de révision',
    'vibe-coding.tool.chatgpt.name': 'ChatGPT 4',
    'vibe-coding.tool.chatgpt.desc': 'Assistant de recherche technique approfondie et documentation, condensant des heures de recherche en réponses instantanées et complètes',
    'vibe-coding.tool.perplexity.name': 'Perplexity',
    'vibe-coding.tool.perplexity.desc': 'Recherche en temps réel et documentation de protocoles récents',
    'vibe-coding.tool.v0.name': 'v0 by Vercel',
    'vibe-coding.tool.v0.desc': 'Prototypage UI rapide et génération de composants',

    // Vibe Coding Disclaimer
    'vibe-coding.disclaimer.title': 'Important : Avertissement sur l\'Utilisation de l\'IA',
    'vibe-coding.disclaimer.text': 'Les outils IA sont UNIQUEMENT utilisés pour le développement frontend, UI/UX, et les intégrations non-blockchain. Tous les smart contracts, protocoles DeFi, et code blockchain sont écrits 100% manuellement sans aucune assistance IA.',
    'vibe-coding.disclaimer.testing': 'Chaque ligne de code—qu\'elle soit assistée par IA ou écrite à la main—subit des tests rigoureux, des audits de sécurité, et une revue de code avant le déploiement en production.',
    'vibe-coding.disclaimer.blockchain': 'Sécurité Blockchain Avant Tout : Aucune IA ne touche au code des smart contracts. Jamais.',

    // Tech Stack Section  
    'techStack.title': 'Ma Stack Technique',
    'techStack.description': 'Technologies et outils que j\'utilise pour donner vie aux projets blockchain. Mon expertise s\'étend du développement de smart contracts à l\'implémentation frontend et l\'intégration backend.',
    
    // Featured Projects Section
    'featuredProjects.title': 'Projets En Vedette',
    'featuredProjects.description': 'Explorez mon travail récent de développement blockchain, incluant smart contracts, applications DeFi, et intégrations web3. Chaque projet met en valeur différents aspects de mes compétences techniques.',

    // GitHub Stats
    'github.topLanguages': 'Langages Principaux',
    'github.viewProfile': 'Voir le Profil GitHub',
    'github.repositories': 'Référentiels',
    'github.followers': 'Abonnés',
    'github.following': 'Abonnements',
    'github.stars': 'Étoiles',
    'github.commits': 'Commits',
    'github.contributions': 'Contributions',
    'github.thisYear': 'Cette Année',

    // Experience Data Translations
    'exp.ledgity.position': 'Développeur Blockchain',
    'exp.ledgity.description': 'Développeur blockchain solo responsable du développement de smart contracts, de l\'intégration, de la maintenance et des modifications frontend.',
    'exp.ledgity.achievement.1': 'Développé des smart contracts robustes et sécurisés utilisant Solidity sur Ethereum L1 et L2.',
    'exp.ledgity.achievement.2': 'Effectué des révisions de code et audits pour garantir un code de haute qualité, sans bugs avant le déploiement.',
    'exp.ledgity.achievement.3': 'Intégré des applications décentralisées (dApps) avec des smart contracts pour améliorer l\'expérience utilisateur.',
    'exp.ledgity.achievement.4': 'Géré le déploiement et la maintenance de smart contracts sur plusieurs réseaux blockchain.',
    'exp.ledgity.achievement.5': 'Développé des interfaces conviviales pour des fonctions blockchain complexes afin d\'améliorer l\'accessibilité.',

    'exp.freelance.position': 'Développeur Smart Contract Freelance',
    'exp.freelance.description': 'Fourni des services de développement blockchain à divers clients, en me concentrant sur la création de smart contracts et le développement de dApps.',
    'exp.freelance.achievement.1': 'Créé un contrat de staking pour les NFTs qui a avec succès minté plus de 21 millions de tokens ERC20 et détient actuellement plus de 1400 NFTs en staking.',
    'exp.freelance.achievement.2': 'Développé et déployé des applications décentralisées sur les blockchains EVM utilisant Solidity, React.js, Next.js.',
    'exp.freelance.achievement.3': 'Collaboré avec les clients pour définir les exigences du projet et livrer des solutions évolutives.',
    'exp.freelance.achievement.4': 'Intégré des oracles pour les flux de données en temps réel dans les smart contracts.',
    'exp.freelance.achievement.5': 'Créé et géré les standards de tokens ERC-20 et ERC-721 pour divers projets.',
    'exp.freelance.achievement.6': 'Effectué des tests approfondis utilisant des frameworks comme Foundry et Hardhat.',

    'exp.tasc.position': 'PDG',
    'exp.tasc.description': 'Fondé et dirigé une entreprise développant un jeu blockchain Play-to-Earn.',
    'exp.tasc.achievement.1': 'Fondé une entreprise pour construire un jeu P2E et dirigé une équipe de développeurs utilisant les méthodologies Agiles (SCRUM).',
    'exp.tasc.achievement.2': 'Développé et implémenté une vision stratégique pour stimuler la croissance et la rentabilité de l\'entreprise.',
    'exp.tasc.achievement.3': 'Géré efficacement les communications de crise pour maintenir l\'intégrité de la marque.',
    'exp.tasc.achievement.4': 'Développé des smart contracts pour les actifs du jeu utilisant Solidity.',
    'exp.tasc.achievement.5': 'Implémenté une économie de tokens basée sur Ethereum pour améliorer l\'engagement des joueurs.',

    'exp.future-institution.position': 'Développeur Smart Contract',
    'exp.future-institution.description': 'Dirigé le développement de smart contracts pour un jeu blockchain.',
    'exp.future-institution.achievement.1': 'Dirigé le développement de smart contracts pour un jeu Blockchain.',
    'exp.future-institution.achievement.2': 'Dirigé la conception et l\'implémentation de smart contracts robustes sur Ethereum.',
    'exp.future-institution.achievement.3': 'Implémenté les standards de tokens, incluant ERC20 et ERC721, pour faciliter la création et la gestion de tokens.',

    'exp.bitcoin-vietnam.position': 'Stagiaire Développeur Web3',
    'exp.bitcoin-vietnam.description': 'Acquis une expérience initiale de développement blockchain grâce à un stage axé sur les technologies Web3.',
    'exp.bitcoin-vietnam.achievement.1': 'Recherché les tokens ERC20, et créé un token ERC20 pour l\'entreprise.',
    'exp.bitcoin-vietnam.achievement.2': 'Collaboré avec une équipe pour développer des applications décentralisées (dApps) utilisant la blockchain Ethereum.',
    'exp.bitcoin-vietnam.achievement.3': 'Assisté dans le développement de smart contracts utilisant Solidity pour automatiser les processus et améliorer la sécurité.',
    'exp.bitcoin-vietnam.achievement.4': 'Maintenu le front-end du site web',

    'exp.alyra-jury.position': 'Jury Technique',
    'exp.alyra-jury.description': 'Évaluation et certification de la prochaine génération de développeurs blockchain en évaluant leurs projets DApp finaux, s\'assurant qu\'ils respectent les standards de l\'industrie pour la sécurité, l\'architecture et l\'innovation des smart contracts.',
    'exp.alyra-jury.achievement.1': 'Septembre 2023 - Jury Finney - POAP : https://collectors.poap.xyz/token/6970868',
    'exp.alyra-jury.achievement.2': 'Avril 2024 - Jury Lovelace - POAP : https://collectors.poap.xyz/token/7112109',
    'exp.alyra-jury.achievement.3': 'Juillet 2024 - Jury Turing - POAP : https://collectors.poap.xyz/token/7191799',
    'exp.alyra-jury.achievement.4': 'Avril 2025 - Jury Galilée - POAP : https://collectors.poap.xyz/token/7390138',
    'exp.alyra-jury.achievement.5': 'Janvier 2025 - Jury Hamilton - POAP : https://collectors.poap.xyz/token/7390139',

    'exp.chiliz-hackathon.position': 'Participant Hackathon',
    'exp.chiliz-hackathon.description': 'Construit Chiliz Got Talent - une plateforme innovante pour la découverte de talents sportifs sur la blockchain Chiliz.',
    'exp.chiliz-hackathon.achievement.1': 'Développé une dApp full-stack avec un frontend React TypeScript',
    'exp.chiliz-hackathon.achievement.2': 'Implémenté des smart contracts pour la vérification des talents et les récompenses',
    'exp.chiliz-hackathon.achievement.3': 'Créé une API backend avec le templating Handlebars',
    'exp.chiliz-hackathon.achievement.4': 'Livré un prototype fonctionnel dans les délais du hackathon',
    'exp.chiliz-hackathon.achievement.5': 'Nom d\'équipe : RedCodeChilizPeppers',

    'exp.eth-global-hackathon.position': 'Participant Hackathon',
    'exp.eth-global-hackathon.description': 'Construit AATBA Profile - Profil Sans Confiance et Vérifiable avec Sécurité et Confidentialité, entièrement on-chain.',
    'exp.eth-global-hackathon.achievement.1': 'Développé une plateforme de gestion d\'identité on-chain utilisant les Soul Bound Tokens (SBT)',
    'exp.eth-global-hackathon.achievement.2': 'Implémenté les Token Bound Accounts (TBA) avec le standard ERC6551',
    'exp.eth-global-hackathon.achievement.3': 'Intégré l\'Account Abstraction utilisant ERC4337',
    'exp.eth-global-hackathon.achievement.4': 'Déployé sur plusieurs testnets : Scroll Sepolia, Mantle, Mumbai Polygon',
    'exp.eth-global-hackathon.achievement.5': 'Créé une démo live sur aatba.org',
    'exp.eth-global-hackathon.achievement.6': 'Collaboré avec une équipe internationale de 5 développeurs',

    'exp.careerzen-hackathon.position': 'Participant Hackathon',
    'exp.careerzen-hackathon.description': 'Construit CareerZen - une plateforme de vérification de carrière basée sur la blockchain utilisant des NFTs pour authentifier l\'historique professionnel et permettre le réseautage professionnel anonyme.',
    'exp.careerzen-hackathon.achievement.1': 'Créé un système de NFT de carrière pour l\'historique professionnel et les certifications vérifiés',
    'exp.careerzen-hackathon.achievement.2': 'Implémenté le partage de profil préservant la confidentialité avec mécanisme d\'approbation',
    'exp.careerzen-hackathon.achievement.3': 'Construit des fonctionnalités de réseautage professionnel anonyme pour les besoins du marché asiatique',
    'exp.careerzen-hackathon.achievement.4': 'Abordé l\'implémentation de transactions sans gas avec vérification de signature ecrecover',
    'exp.careerzen-hackathon.achievement.5': 'Permis la validation de carrière par des tiers : mentors, hackathons et instructeurs',

    // Education Data Translations
    'edu.rareskills.degree': 'Développement Blockchain',
    'edu.rareskills.field': 'Plongée DeFi, NFT & ERC20, Tests & audits, Plongée EVM : Yul/assembly/HUFF',
    'edu.rareskills.description': 'RareSkills est une plateforme d\'éducation blockchain premium fondée par Jeffrey Scholz, axée sur la sécurité avancée et l\'optimisation des smart contracts. Ce programme intensif couvre les protocoles DeFi de pointe, l\'implémentation avancée des standards ERC, les méthodologies de test complètes, les pratiques d\'audit de sécurité, et la programmation EVM de bas niveau incluant Yul et le langage assembly. Le programme est conçu pour les développeurs expérimentés cherchant une expertise en sécurité blockchain et optimisation gas.',

    'edu.consensys.degree': 'Développement Blockchain',
    'edu.consensys.field': 'Dapp, Ethereum, Solidity, React.js, Clients blockchain',
    'edu.consensys.description': 'ConsenSys Academy est la branche éducative de ConsenSys, la principale société de logiciels Ethereum fondée par Joseph Lubin. Ce programme complet fournit une éducation blockchain de niveau entreprise, couvrant le développement d\'applications décentralisées full-stack, l\'architecture de l\'écosystème Ethereum, la programmation Solidity avancée, l\'intégration React.js pour les frontends Web3, et l\'implémentation de clients blockchain. L\'académie est reconnue pour produire des développeurs blockchain prêts pour l\'industrie.',

    'edu.alyra.degree': 'Développement Blockchain',
    'edu.alyra.field': 'Ethereum, Smart Contracts, Développement Dapp',
    'edu.alyra.description': 'Alyra est la principale école blockchain de France, offrant des programmes de formation complets en technologie blockchain et développement de smart contracts. Ce programme fondamental fournit une expérience pratique avec la blockchain Ethereum, l\'architecture et le déploiement de smart contracts, le développement d\'applications décentralisées, et les fondamentaux blockchain. Alyra est connue pour son approche pratique de l\'éducation blockchain et ses fortes connexions industrielles dans l\'écosystème blockchain européen.',

    'edu.alyra-solana.degree': 'Développeur Solana',
    'edu.alyra-solana.field': 'Blockchain Solana, programmation Rust, framework Anchor, tokens SPL',
    'edu.alyra-solana.description': 'Programme de développement Solana avancé chez Alyra axé sur le développement blockchain haute performance. Ce cours spécialisé couvre l\'architecture unique de Solana, la programmation Rust pour les applications blockchain, le framework de développement Anchor, et la création de tokens SPL. Les étudiants apprennent à construire des applications décentralisées évolutives sur l\'une des blockchains les plus rapides, maîtrisant le modèle de compte de Solana, le déploiement de programmes, et l\'intégration avec les frontends Web3.',

    'edu.udemy-rust-code.degree': 'Apprendre à Coder avec Rust',
    'edu.udemy-rust-code.field': 'Cours complet de programmation Rust couvrant les fondamentaux, la gestion mémoire, et la programmation système',
    'edu.udemy-rust-code.description': 'Un cours de programmation Rust complet qui couvre le langage des fondamentaux aux concepts avancés. Le cours se concentre sur le système de propriété unique de Rust, la sécurité mémoire sans garbage collection, et les capacités de programmation système. Les étudiants apprennent à construire des applications haute performance avec des abstractions à coût zéro, la programmation concurrente, et des patterns de gestion d\'erreurs robustes qui rendent Rust idéal pour le développement blockchain et système.',

    'edu.udemy-react-complete.degree': 'React - Le Guide Complet',
    'edu.udemy-react-complete.field': 'Cours React complet incluant Redux, Hooks, Context API, et patterns React modernes',
    'edu.udemy-react-complete.description': 'Un cours React approfondi couvrant les patterns de développement React modernes et les meilleures pratiques. Le cours inclut la gestion d\'état avancée avec Redux et Context API, les React Hooks modernes pour la programmation fonctionnelle, l\'optimisation du cycle de vie des composants, et les techniques de performance. Essentiel pour construire des frontends Web3 sophistiqués et des applications décentralisées avec React.',

    'edu.udemy-nodejs-complete.degree': 'Le Cours Complet Développeur Node.js',
    'edu.udemy-nodejs-complete.field': 'Développement Node.js full-stack avec Express, MongoDB, authentification, et construction d\'API',
    'edu.udemy-nodejs-complete.description': 'Un cours Node.js complet couvrant le développement JavaScript côté serveur, la conception d\'API RESTful, l\'intégration de base de données avec MongoDB, les systèmes d\'authentification, et les stratégies de déploiement. Le cours met l\'accent sur la construction de services backend évolutifs pouvant supporter les applications blockchain et s\'intégrer avec l\'infrastructure Web3 pour un développement full-stack complet.',

    'edu.udemy-react-zero-mastery.degree': 'Développeur React Complet - Zéro vers Maîtrise',
    'edu.udemy-react-zero-mastery.field': 'Développement React avancé incluant TypeScript, tests, optimisation performance, et déploiement',
    'edu.udemy-react-zero-mastery.description': 'Un cours de développement React avancé qui emmène les étudiants du niveau débutant à expert. Couvre l\'intégration TypeScript pour les applications React type-safe, les stratégies de test complètes, les techniques d\'optimisation performance, et les workflows de déploiement production. Particulièrement précieux pour construire des interfaces Web3 robustes et des frontends d\'applications décentralisées avec une qualité de code de niveau professionnel.',

    'edu.udemy-rust-crash.degree': 'Cours Accéléré Rust Ultime',
    'edu.udemy-rust-crash.field': 'Bootcamp intensif programmation Rust axé sur les applications pratiques et meilleures pratiques',
    'edu.udemy-rust-crash.description': 'Un bootcamp de programmation Rust intensif conçu pour l\'acquisition rapide de compétences. Le cours se concentre sur le modèle de propriété unique de Rust, les concepts d\'emprunt et de durée de vie, le système de traits pour la réutilisation de code, et les patterns de programmation concurrente. Met l\'accent sur les applications pratiques et les meilleures pratiques industrielles, parfait pour les développeurs transitionnant vers le développement blockchain où la performance et la sécurité sont critiques.',

    'edu.udemy-linux-complete.degree': 'Cours de Formation Linux Complet',
    'edu.udemy-linux-complete.field': 'Administration Linux complète couvrant ligne de commande, administration système, et pratiques DevOps',
    'edu.udemy-linux-complete.description': 'Un cours d\'administration Linux complet couvrant la maîtrise de la ligne de commande, l\'administration système, la gestion de serveurs, et les pratiques DevOps. Le cours inclut l\'automatisation par scripts shell, la configuration réseau, le durcissement sécuritaire, et les stratégies de déploiement. Compétences essentielles pour gérer l\'infrastructure de nœuds blockchain et déployer des applications décentralisées dans des environnements de production.',

    'edu.udemy-solidity-advanced.degree': 'Solidity Avancé - Yul et Assembly',
    'edu.udemy-solidity-advanced.field': 'Plongée profonde dans l\'optimisation Solidity utilisant le langage intermédiaire Yul et la programmation assembly EVM',
    'edu.udemy-solidity-advanced.description': 'Un cours avancé axé sur les techniques d\'optimisation Solidity de bas niveau utilisant le langage intermédiaire Yul et la programmation assembly EVM. Les étudiants apprennent à écrire des smart contracts hautement optimisés, comprendre les internals EVM, implémenter des opcodes personnalisés, et réaliser des économies de gas significatives. Connaissance critique pour le développement professionnel de smart contracts et l\'audit dans l\'espace DeFi.',

    'edu.udemy-solidity-gas.degree': 'Solidity Avancé - Optimisation Gas',
    'edu.udemy-solidity-gas.field': 'Techniques avancées pour optimiser l\'usage gas des smart contracts et comprendre les internals EVM',
    'edu.udemy-solidity-gas.description': 'Un cours spécialisé dédié à l\'optimisation gas des smart contracts et à l\'efficacité EVM. Couvre les techniques avancées pour réduire les coûts de transaction, les patterns d\'optimisation stockage, l\'efficacité des appels de fonction, et les optimisations niveau EVM. Les étudiants apprennent à analyser la consommation gas, implémenter des patterns de design rentables, et construire des smart contracts économiquement durables pour les protocoles DeFi de production.',

    // Skills Page
    'skills.advanced.title': 'Compétences Avancées',
    'skills.advanced.subtitle': 'Expertise technique approfondie en développement blockchain, smart contracts et finance décentralisée',
    'skills.whatCanDo.title': 'Ce Que Je Peux Faire Pour Vous',
    'skills.whatCanDo.subtitle': 'Du concept à la production, je livre des solutions blockchain complètes qui génèrent une réelle valeur business',
    'skills.service1.title': 'Systèmes de Smart Contracts Complets',
    'skills.service1.description': 'J\'architecture et construis des écosystèmes de smart contracts entiers de zéro, gérant tout depuis la conception de tokenomics jusqu\'aux mécaniques DeFi complexes.',
    'skills.service1.feature1': 'Standards de tokens personnalisés (ERC-20, ERC-721, ERC-1155)',
    'skills.service1.feature2': 'Protocoles DeFi (AMMs, prêts, staking, yield farming)',
    'skills.service1.feature3': 'Systèmes de gouvernance et DAOs',
    'skills.service1.feature4': 'Stratégies de déploiement multi-chaînes',
    'skills.service2.title': 'Optimisation & Audit de Sécurité',
    'skills.service2.description': 'J\'optimise les contrats existants pour l\'efficacité gas et conduis des revues de sécurité approfondies pour assurer que vos protocoles sont blindés.',
    'skills.service2.feature1': 'Optimisation gas utilisant Yul et assembly',
    'skills.service2.feature2': 'Évaluations de vulnérabilités de sécurité',
    'skills.service2.feature3': 'Refactorisation de code pour l\'efficacité',
    'skills.service2.feature4': 'Implémentation des meilleures pratiques',
    'skills.service3.title': 'Développement DApp de Bout en Bout',
    'skills.service3.description': 'Je construis des applications décentralisées complètes avec des frontends modernes, des backends robustes, et une intégration blockchain transparente.',
    'skills.service3.feature1': 'Développement frontend React/Next.js',
    'skills.service3.feature2': 'Intégration Web3 (ethers.js, wagmi)',
    'skills.service3.feature3': 'APIs backend et services d\'indexation',
    'skills.service3.feature4': 'Intégration IPFS et stockage décentralisé',
    'skills.whyChoose.title': 'Pourquoi Je Suis le Bon Choix',
    'skills.whyChoose.experience': '6+ Années d\'Expérience',
    'skills.whyChoose.experienceDesc': 'Testé au combat dans des environnements de production',
    'skills.whyChoose.security': 'Sécurité d\'Abord',
    'skills.whyChoose.securityDesc': 'Mentalité d\'audit dans chaque ligne de code',
    'skills.whyChoose.innovation': 'Orienté Innovation',
    'skills.whyChoose.innovationDesc': 'Toujours en exploration de solutions de pointe',
    'skills.whyChoose.client': 'Centré Client',
    'skills.whyChoose.clientDesc': 'Votre succès est ma priorité',
    'skills.techStack.title': 'Ma Stack Technique',
    'skills.techStack.description': 'Une vitrine fluide de toutes les technologies que j\'utilise pour construire des expériences numériques extraordinaires',
    'skills.techStack.riverView': '🌊 Cliquer pour voir la Vue Rivière',
    'skills.techStack.listView': '📋 Cliquer pour voir la Vue Liste',
    'skills.techStack.count': 'Stack Technologique ({count} Technologies)',
    'skills.expertise.title': 'Expertise Technique',
    'skills.expertise.subtitle': 'Explorez mes compétences spécialisées en développement blockchain à travers des sections à thèmes uniques, chacune présentant différents aspects de mon expertise.',

    // DeFi Section Dropdown
    'defi.dropdown.protocols': 'PROTOCOLES',
    'defi.dropdown.type': 'TYPE',
    'defi.dropdown.tvl': 'TVL',
    'defi.dropdown.24h': '24H',
    'defi.dropdown.status': 'STATUT',
    'defi.dropdown.expert': 'EXPERT',
    'defi.dropdown.active': 'ACTIF',
    'defi.dropdown.expand': 'DÉVELOPPER',
    'defi.dropdown.collapse': 'RÉDUIRE',

    // Layer2 Section
    'layer2.title': 'Réseau Layer 2',
    'layer2.subtitle': 'Écosystème de mise à l\'échelle interconnecté',
    'layer2.description': 'J\'architecture des écosystèmes multi-chaînes où chaque Layer 2 sert des objectifs spécifiques - du gaming haute performance sur Polygon à la DeFi innovante sur Arbitrum, le tout connecté via une infrastructure de bridges sécurisée.',
    'layer2.architecture.title': 'Architecture Multi-Chaînes',
    'layer2.architecture.intro': 'Je me spécialise dans la construction d\'applications cross-chain qui exploitent les forces uniques de chaque réseau Layer 2 :',
    'layer2.architecture.arbitrum': 'Protocoles DeFi avec logique complexe et composabilité',
    'layer2.architecture.polygon': 'Applications consommateur et gaming haute volume',
    'layer2.architecture.zksync': 'Applications axées sur la confidentialité et alimentées par ZK',
    'layer2.architecture.gnosis': 'DAOs et mécanismes de consensus innovants',
    'layer2.architecture.conclusion': 'Mon expertise inclut l\'implémentation de messagerie cross-chain sécurisée, la gestion unifiée de liquidité, et des expériences utilisateur transparentes à travers plusieurs réseaux.',

    // Layer2 Tooltips
    'layer2.tooltip.arbitrum': 'Solution de mise à l\'échelle par rollup optimiste',
    'layer2.tooltip.optimism': 'Rollup optimiste avec preuves de faute',
    'layer2.tooltip.polygon': 'Plateforme de mise à l\'échelle multi-chaînes',
    'layer2.tooltip.gnosis': 'Chaîne EVM communautaire axée sur la stabilité et la décentralisation',
    'layer2.tooltip.zksync': 'zkRollup compatible EVM avec abstraction de compte native',
    'layer2.tooltip.scroll': 'zkRollup équivalent EVM au niveau bytecode pour migration transparente',
    'layer2.tooltip.base': 'L2 Coinbase construit sur OP Stack pour adoption grand public',
    'layer2.tooltip.berachain': 'Chaîne compatible EVM avec consensus PoL innovant',

    // Security Section
    'security.title': 'SÉCURITÉ & AUDIT DE CONTRATS INTELLIGENTS',
    'security.description.intro': 'La sécurité est primordiale en DeFi. Les smart contracts gèrent des milliards en valeur et sont immuables une fois déployés.',
    'security.description.vulnerability': 'Une seule vulnérabilité peut conduire à des pertes catastrophiques, rendant l\'analyse de sécurité approfondie essentielle pour tout protocole sérieux.',
    'security.description.focus': 'Je me concentre sur les vecteurs d\'attaque courants comme la reentrancy, les exploits de flash loans, et les failles de contrôle d\'accès.',
    'security.description.watch': 'Observez la détection de menaces en temps réel ci-dessous • Survolez les éléments pour des informations détaillées •',
    'security.description.turrets': 'Les tourelles représentent les compétences de sécurité défendant contre les vulnérabilités communes',
    'security.system.title': 'SYSTÈME DE DÉFENSE SÉCURISÉ',
    'security.system.status': 'CIBLAGE AUTO: ACTIVÉ | NIVEAU DE MENACE: ACTIF',
    'security.system.neutralized': 'MENACES NEUTRALISÉES',
    'security.threat.monitor': 'MONITEUR DE MENACES',
    'security.threat.active': 'MENACES ENTRANTES ACTIVES',
    'security.threat.none': 'Aucune menace détectée',
    'security.threat.detect': 'DÉTECTER:',
    'security.threat.prevent': 'PRÉVENIR:',
    'security.threat.fix': 'CORRIGER:',
    'security.arsenal.title': 'ARSENAL DE SÉCURITÉ',
    'security.arsenal.subtitle': 'ARMES LÉGENDAIRES & POWER-UPS POUR L\'AUDIT DE SÉCURITÉ ULTIME',
    'security.arsenal.openzeppelin.short': '+50% Défense vs Contrôle d\'Accès',
    'security.arsenal.slither.short': 'Auto-détecte 90+ vulnérabilités',
    'security.arsenal.foundry.short': 'Puissance de fuzz testing illimitée',
    'security.arsenal.echidna.short': 'Fuzz testing basé sur propriétés',
    'security.arsenal.openzeppelin': 'Bibliothèque standard de l\'industrie de composants de smart contracts sécurisés et réutilisables. Fournit des implémentations éprouvées des standards ERC, contrôle d\'accès, et patterns de sécurité utilisés par des milliers de projets.',
    'security.arsenal.slither': 'Framework d\'analyse statique pour smart contracts Solidity. Détecte les vulnérabilités, opportunités d\'optimisation, et problèmes de qualité de code. Outil essentiel pour le scan de sécurité automatisé avec 90+ détecteurs intégrés.',
    'security.arsenal.foundry': 'Boîte à outils rapide, portable et modulaire pour le développement Ethereum. Propose des tests avancés avec fuzzing, optimisation de gas, et scripting de déploiement. L\'étalon-or pour le développement et test modernes de smart contracts.',
    'security.arsenal.echidna': 'Fuzzer basé sur les propriétés pour smart contracts Ethereum par Trail of Bits. Génère des entrées aléatoires pour tester les invariants et trouver les cas limites. Spécialisé dans la découverte de bugs subtils via vérification automatisée de propriétés.',
    'security.master.title': 'STATUT AUDITEUR MAÎTRE: DÉBLOQUÉ',
    'security.master.description': 'Tous les outils de sécurité légendaires maîtrisés • 100% de couverture des vulnérabilités',
    'security.status.online': 'SYSTÈMES EN LIGNE',
    'security.status.scan': 'SCAN',
    'security.status.hoverElements': 'Survolez les éléments',
    'security.status.allClear': 'Tout va bien',
    'security.status.score': 'SCORE:',
    'security.status.detailedInfo': 'pour des informations détaillées',

    // ERC Standard Descriptions
    'erc.erc20.description': 'Standard pour les tokens fongibles sur Ethereum',
    'erc.erc721.description': 'Standard de token non-fongible pour actifs numériques uniques',
    'erc.erc4626.description': 'Standard pour les coffres générateurs de rendement et gestion d\'actifs',
    'erc.erc2535.description': 'Système de contrat intelligent modulaire pour contrats évolutifs',
    'erc.erc4337.description': 'Portefeuilles de smart contracts sans changements de protocole',
    'erc.erc1155.description': 'Standard pour contrats gérant plusieurs types de tokens',
    'erc.erc2981.description': 'Informations de royalties standardisées pour marchés NFT',
    'erc.erc6551.description': 'NFTs pouvant posséder des actifs et interagir avec applications',
    'erc.erc2612.description': 'Approbations de tokens sans gas utilisant des signatures',
    'erc.erc3156.description': 'Interface standardisée pour fournisseurs et receveurs de flash loans',
    'erc.erc4907.description': 'Standard de location NFT pour droits d\'usage à durée limitée',
    'erc.erc5192.description': 'Tokens non-transférables pour identité et identifiants',
    'erc.erc165.description': 'Méthode standard pour détecter les interfaces de contrat',
    'erc.erc1271.description': 'Standard pour validation de signatures basée sur contrat',
    'erc.erc1967.description': 'Slots de stockage proxy standardisés pour éviter les conflits',
    'erc.erc2767.description': 'Standard pour gouvernance et vote on-chain',
    'erc.erc5805.description': 'Vote standardisé avec capacités de délégation',
    'erc.proxy-patterns.description': 'Patterns de proxy et mécanismes de mise à niveau pour smart contracts',
    'erc.access-control.description': 'Contrôle d\'accès basé sur rôles et gestion des permissions',
    'erc.merkle-trees.description': 'Mécanismes de vérification de données efficaces et listes blanches',

    // ERC Detail Cards UI
    'erc.detail.viewEIP': 'Voir EIP',
    'erc.detail.myExperience': 'Mon Expérience',
    'erc.detail.useCases': 'Cas d\'Usage',
    
    // ERC Wheel Controls
    'erc.wheel.tryLuck': 'Tentez votre chance ! ↓',
    'erc.wheel.random': '🎲 ALÉATOIRE',
    'erc.wheel.spinning': '⚡ ROTATION...',
    'erc.wheel.spinTooltip': 'Faites tourner la roue rétro pour sélectionner un standard au hasard',

    // Threat Types Process Descriptions (Names stay in English)
    'threat.reentrancy.description': 'Un contrat malveillant rappelle une fonction vulnérable avant que les mises à jour d\'état ne soient terminées',
    'threat.reentrancy.detect': 'Utiliser des outils d\'analyse statique (Slither) pour identifier les appels externes avant les changements d\'état',
    'threat.reentrancy.prevent': 'Appliquer le pattern checks-effects-interactions et utiliser le modificateur ReentrancyGuard',
    'threat.reentrancy.fix': 'Déplacer les mises à jour d\'état avant les appels externes, ajouter des verrous mutex',
    
    'threat.overflow.description': 'Les opérations arithmétiques dépassent les valeurs maximales causant un comportement inattendu',
    'threat.overflow.detect': 'Implémenter des tests d\'invariants avec Foundry pour capturer les cas limites arithmétiques',
    'threat.overflow.prevent': 'Utiliser la bibliothèque SafeMath ou les vérifications intégrées de Solidity 0.8+',
    'threat.overflow.fix': 'Remplacer l\'arithmétique non vérifiée par des opérations sûres et ajouter des vérifications de limites',
    
    'threat.flash-loan.description': 'Exploits utilisant de gros prêts sans garantie pour manipuler les protocoles DeFi',
    'threat.flash-loan.detect': 'Surveiller les patterns de transactions inhabituels et les manipulations d\'oracle de prix',
    'threat.flash-loan.prevent': 'Utiliser des prix moyens pondérés dans le temps (TWAP) et des délais de transaction',
    'threat.flash-loan.fix': 'Implémenter la validation d\'oracle, ajouter une protection contre le slippage et des mécanismes de pause',
    
    'threat.access-control.description': 'Des utilisateurs non autorisés accèdent à des fonctions ou données restreintes',
    'threat.access-control.detect': 'Auditer les assignations de rôles et utiliser des frameworks de test de contrôle d\'accès',
    'threat.access-control.prevent': 'Implémenter OpenZeppelin AccessControl avec des hiérarchies de rôles appropriées',
    'threat.access-control.fix': 'Ajouter des modificateurs onlyRole et supprimer les fonctions privilégiées inutilisées',
    
    'threat.price-manip.description': 'Manipulation des flux de prix pour exploiter les protocoles de prêt et trading DeFi',
    'threat.price-manip.detect': 'Surveiller les déviations de prix et utiliser plusieurs sources d\'oracle pour validation',
    'threat.price-manip.prevent': 'Implémenter les oracles Chainlink avec seuils de battement de cœur et de déviation',
    'threat.price-manip.fix': 'Ajouter des disjoncteurs, vérifications de cohérence des prix, et agrégation d\'oracles',
    
    'threat.front-run.description': 'Des acteurs malveillants devancent les transactions pour extraire des profits',
    'threat.front-run.detect': 'Analyser la mempool pour les attaques d\'ordonnancement de transactions et patterns MEV',
    'threat.front-run.prevent': 'Utiliser des schémas commit-reveal et mempools privées (Flashbots)',
    'threat.front-run.fix': 'Implémenter des enchères par lots, délais temporels, et exécution randomisée',
    
    'threat.dos.description': 'Attaques de déni de service qui empêchent les opérations normales du contrat',
    'threat.dos.detect': 'Surveiller les patterns d\'utilisation de gas et pics de transactions échouées',
    'threat.dos.prevent': 'Implémenter limitation de débit, limites de gas, et patterns de retrait',
    'threat.dos.fix': 'Ajouter des disjoncteurs, pauses d\'urgence, et limites d\'appels externes',
    
    'threat.logic-bug.description': 'Logique métier défaillante qui mène à un comportement de contrat non intentionnel',
    'threat.logic-bug.detect': 'Utiliser des outils de vérification formelle et tests de propriétés compréhensifs',
    'threat.logic-bug.prevent': 'Écrire des spécifications détaillées et utiliser des tests basés sur les propriétés',
    'threat.logic-bug.fix': 'Refactoriser la logique métier, ajouter des vérifications d\'invariants, et contrôles d\'urgence',
    
    'threat.sandwich-attack.description': 'Des bots MEV devancent et suivent les transactions utilisateur pour profit',
    'threat.sandwich-attack.detect': 'Surveiller les patterns d\'ordonnancement de transactions et exploitation de slippage',
    'threat.sandwich-attack.prevent': 'Implémenter protection dynamique contre le slippage et mempools privées',
    'threat.sandwich-attack.fix': 'Ajouter des mécanismes de protection MEV et systèmes d\'ordonnancement équitable',
    
    'threat.governance-attack.description': 'Propositions malveillantes ou votes par flash loan pour détourner le contrôle du protocole',
    'threat.governance-attack.detect': 'Surveiller les patterns de vote et concentration de tokens pour activité inhabituelle',
    'threat.governance-attack.prevent': 'Implémenter des délais timelock et plafonds de pouvoir de vote',
    'threat.governance-attack.fix': 'Ajouter des vetos d\'urgence, vote par snapshot, et limites de délégation',
    
    'threat.storage-collision.description': 'Les slots de stockage proxy écrasent le stockage d\'implémentation',
    'threat.storage-collision.detect': 'Utiliser des outils d\'analyse de layout de stockage et détection automatique de collision de slots',
    'threat.storage-collision.prevent': 'Suivre les patterns de proxy OpenZeppelin avec stockage non structuré',
    'threat.storage-collision.fix': 'Réorganiser les slots de stockage en utilisant les emplacements standards ERC-1967',
    
    'threat.unchecked-return.description': 'Les appels externes échoués passent inaperçus menant à la corruption d\'état',
    'threat.unchecked-return.detect': 'Utiliser l\'analyse statique pour trouver les appels de bas niveau non vérifiés',
    'threat.unchecked-return.prevent': 'Toujours vérifier les valeurs de retour et utiliser SafeERC20 pour les appels de tokens',
    'threat.unchecked-return.fix': 'Ajouter des vérifications de succès explicites et revert sur les appels externes échoués',
    
    'threat.centralization-risk.description': 'Points de défaillance uniques via clés admin ou rôles privilégiés',
    'threat.centralization-risk.detect': 'Auditer les fonctions admin et points de contrôle uniques dans la gouvernance',
    'threat.centralization-risk.prevent': 'Utiliser des portefeuilles multi-sig, contrôleurs timelock, et gouvernance décentralisée',
    'threat.centralization-risk.fix': 'Implémenter décentralisation progressive et supprimer les pouvoirs admin inutiles',

    // Security Skills Descriptions
    'security.skill.auditing': 'J\'effectue des revues de code ligne par ligne pour identifier les vulnérabilités avant le déploiement. Mes audits combinent analyse manuelle et outils automatisés.',
    'security.skill.attack-vectors': 'J\'analyse comment les vulnérabilités s\'enchaînent dans les exploits réels - flash loans combinés avec manipulation d\'oracle, attaques de gouvernance, et interactions cross-protocole. En pensant comme un attaquant et en étudiant les hacks passés, j\'identifie les chemins d\'attaque non-évidents avant que les acteurs malveillants ne les trouvent.',
    'security.skill.invariant-testing': 'Je reconnais et préviens les patterns d\'attaque bien connus comme la reentrancy, les débordements d\'entiers, et les retours non vérifiés qui ont causé des millions de pertes.',
    'security.skill.formal-verification': 'Cela capture les bugs subtils que les tests et audits ratent - critique pour les protocoles haute valeur où l\'échec n\'est pas une option.',
    'security.skill.mev-protection': 'Je protège les utilisateurs des attaques sandwich et front-running en implémentant des schémas commit-reveal, oracles TWAP, et stratégies de mempool privées.',

    // Security Additional Content
    'security.subtitle': 'Protection des applications décentralisées contre les vulnérabilités et exploits',
    'security.approach': 'Mon approche combine outils automatisés (Slither, fuzzing Foundry), revue de code manuelle, et techniques de vérification formelle pour identifier les vulnérabilités avant qu\'elles puissent être exploitées.',
    'security.skill.auditing.focus': 'Domaines d\'expertise : failles de contrôle d\'accès, risques de reentrancy, problèmes de gestion de fonds, et erreurs de logique métier pouvant mener à des exploits.',
    'security.skill.invariant-testing.approach': 'Mon approche : implémenter checks-effects-interactions, utiliser SafeMath, valider tous les appels externes, et appliquer des patterns de programmation défensive.',
    'security.skill.formal-verification.math': 'J\'utilise des preuves mathématiques pour garantir le comportement des contrats. En définissant des invariants et utilisant l\'exécution symbolique, j\'assure que le code fonctionne correctement dans tous les scénarios.',
    'security.skill.mev-protection.design': 'Mes conceptions résistantes au MEV assurent un trading équitable et empêchent l\'extraction de valeur qui nuit à l\'expérience utilisateur dans les protocoles DeFi.',

    // Common
    'common.learnMore': 'En Savoir Plus',
    'common.getStarted': 'Commencer',
    'common.viewAll': 'Voir Tout',
    'common.showLess': 'Voir moins',
    'common.viewMore': 'Voir {count} technologies {type} de plus',
    'common.viewAllProjects': 'Voir Tous les Projets',
    'common.active': 'Actif',
    'common.clickToView': 'Cliquer pour voir',

    // Community Contributions section
    'community.title': 'Contributions Communautaires',
    'community.subtitle': 'Partager des connaissances et aider les développeurs à résoudre des défis blockchain complexes sur Stack Exchange',
    'community.liveData': 'DONNÉES LIVE',
    'community.loadingData': 'Chargement des données live...',
    'community.stackExchangeContributor': 'Contributeur Ethereum Stack Exchange',
    'community.reputation': 'Réputation',
    'community.gold': 'Or',
    'community.silver': 'Argent',
    'community.bronze': 'Bronze',
    'community.featuredContributions': 'Contributions Sélectionnées',
    'community.question': 'QUESTION :',
    'community.myAnswer': 'MA RÉPONSE :',
    'community.viewProfile': 'Voir Mon Profil Stack Exchange Complet',

    // DeFi Protocol Descriptions
    'defi.amm.description': 'Protocoles DEX utilisant la tarification algorithmique',
    'defi.lending.description': 'Protocoles de prêt collatéralisé',
    'defi.yield-farming.description': 'Mécanismes d\'incitation à la liquidité et distribution de récompenses',
    'defi.oracles.description': 'Intégration de données externes et flux de prix',
    'defi.flash-loans.description': 'Prêts non collatéralisés au sein de transactions uniques',
    'defi.vaults.description': 'Génération automatisée de rendement et gestion de coffres',
    'defi.derivatives.description': 'Options, futures et actifs synthétiques',
    'defi.liquidations.description': 'Systèmes de liquidation de collatéral et d\'enchères',
    'defi.tokenomics.description': 'Économie des tokens et mécanismes d\'incitation',

    // DeFi Usage Descriptions
    'defi.usage.dex': 'J\'architecte et optimise des systèmes de market maker automatisés (AMM), en implémentant des stratégies de trading personnalisées et des intégrations de pools de liquidité. Mon expertise inclut la protection MEV, les mécanismes d\'arbitrage et le développement de bridges cross-chain pour des transferts d\'actifs fluides.',
    'defi.usage.lending': 'Je conçois des protocoles de prêt et d\'emprunt sophistiqués avec des modèles de taux d\'intérêt dynamiques et des systèmes avancés de gestion de collatéral. Mon travail se concentre sur les algorithmes d\'évaluation des risques, les mécanismes de liquidation et les stratégies d\'optimisation de rendement.',
    'defi.usage.yieldFarming': 'Je crée des stratégies de yield farming auto-composées et implémente des mécanismes complexes de distribution de récompenses. Mon expertise couvre les protocoles de liquidity mining, l\'économie des tokens de gouvernance et les modèles de génération de rendement durable.',
    'defi.usage.derivatives': 'Je construis des plateformes de dérivés avancées avec options, futures et contrats perpétuels. Mes implémentations incluent des protocoles d\'actifs synthétiques, des marchés de prédiction et des systèmes de règlement automatisés.',
    'defi.usage.default': 'J\'intègre ce protocole dans des écosystèmes DeFi complets, en me concentrant sur l\'interopérabilité, l\'optimisation du gas et les meilleures pratiques de sécurité. Mes implémentations mettent l\'accent sur l\'expérience utilisateur et une architecture de smart contracts robuste.',

    // DeFi Section Headers
    'defi.section.protocolOverview': 'APERÇU_PROTOCOLE',
    'defi.section.howIUseIt': 'COMMENT_JE_L\'UTILISE',
    'defi.section.keyFeatures': 'FONCTIONNALITÉS_CLÉS',
  }
};